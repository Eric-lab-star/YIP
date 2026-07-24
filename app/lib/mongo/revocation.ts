import { getDB } from "./db";

// Token revocation list. A JWT is stateless — once signed it is valid until it
// expires, so deleting or disabling a student can't take effect until their
// token lapses. This records, per user, a `notBefore` cutoff (unix seconds):
// any token whose `iat` (issued-at) predates the cutoff is treated as invalid.
//
// Enforced in `validateToken` (Node runtime, server components / API routes /
// actions), which already touches Mongo. `proxy.ts` stays signature-only — it
// runs on the Edge runtime and can't reach Mongo cheaply, and the server-side
// gate behind it is what actually blocks a revoked session from reading data.

interface RevocationDoc {
	userId: string; // student _id as string (unique)
	notBefore: number; // unix seconds; tokens issued before this are invalid
	updatedAt: Date;
}

async function col() {
	const db = await getDB();
	return db.collection<RevocationDoc>("tokenRevocations");
}

let indexEnsured = false;

async function ensureIndex() {
	if (indexEnsured) return;
	const c = await col();
	await c.createIndex({ userId: 1 }, { unique: true });
	indexEnsured = true;
}

/**
 * Revoke every token currently held by a user — call when the account is
 * deleted or disabled. Sets the cutoff to now, so any already-issued token
 * fails its next `validateToken`. New logins mint tokens with a later `iat`
 * and are unaffected.
 */
export async function revokeUserTokens(userId: string): Promise<void> {
	try {
		await ensureIndex();
		const c = await col();
		const now = Math.floor(Date.now() / 1000);
		await c.updateOne(
			{ userId },
			{ $set: { notBefore: now, updatedAt: new Date() } },
			{ upsert: true }
		);
	} catch (e) {
		// A revocation write failing is security-relevant — surface it loudly.
		console.error("revokeUserTokens failed for", userId, e);
		throw e;
	}
}

/**
 * Whether a token with the given issued-at is revoked for this user. A token
 * with no `iat` is treated as revoked (can't prove it post-dates a cutoff).
 * Fails safe on a DB error: a lookup outage must not silently accept a token
 * that may have been revoked, so this reports "revoked" and the caller denies.
 */
export async function isTokenRevoked(
	userId: string,
	iat: number | undefined
): Promise<boolean> {
	if (typeof iat !== "number") return true;
	try {
		const c = await col();
		const doc = await c.findOne({ userId });
		if (!doc) return false; // nothing revoked for this user
		return iat < doc.notBefore;
	} catch (e) {
		console.error("isTokenRevoked lookup failed for", userId, e);
		return true; // fail closed
	}
}
