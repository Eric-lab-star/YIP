import { getDB } from "./db";

// Brute-force protection for login. Credentials here are a name + phone number
// (no password), so an unthrottled endpoint lets an attacker who knows a
// student's name walk the phone-number space. This caps that.
//
// Only *failed* attempts are counted and a success clears the counter, so a
// legitimate user typing their details correctly is never affected — and an
// attacker hammering one name can't lock that student out for long.
//
// Two independent keys are checked per attempt:
//   ip:<addr>   — stops one host trying many accounts
//   name:<name> — stops a distributed attempt against one account
// Mirrors the fixed-window guarded-counter pattern in `judgeRateLimit.ts`;
// stored in Mongo because Vercel serverless has no shared in-process state.

const WINDOW_MS = 10 * 60_000; // 10 minutes

/** Max failed attempts per IP per window. Override with LOGIN_MAX_ATTEMPTS_PER_IP. */
export const MAX_ATTEMPTS_PER_IP = Number(
	process.env.LOGIN_MAX_ATTEMPTS_PER_IP ?? 20
);

/** Max failed attempts per account name per window. Override with LOGIN_MAX_ATTEMPTS_PER_NAME. */
export const MAX_ATTEMPTS_PER_NAME = Number(
	process.env.LOGIN_MAX_ATTEMPTS_PER_NAME ?? 10
);

const COLLECTION = "loginAttempts";

interface AttemptDoc {
	key: string; // "ip:1.2.3.4" or "name:홍길동"
	window: number; // Math.floor(now / WINDOW_MS) the count belongs to
	count: number; // failed attempts in the current window
	updatedAt: Date;
}

async function col() {
	const db = await getDB();
	return db.collection<AttemptDoc>(COLLECTION);
}

let indexEnsured = false;

async function ensureIndex() {
	if (indexEnsured) return;
	const c = await col();
	await c.createIndex({ key: 1 }, { unique: true });
	// Keyed partly by IP, so the collection would otherwise grow without bound.
	// Expire a doc an hour after its last write — well past the 10m window.
	await c.createIndex({ updatedAt: 1 }, { expireAfterSeconds: 3600 });
	indexEnsured = true;
}

export interface LoginGateResult {
	blocked: boolean;
	retryAfterSec: number;
}

/** Build the keys an attempt is counted against. */
export function loginKeys(ip: string, name: string): string[] {
	return [`ip:${ip}`, `name:${name.trim().toLowerCase()}`];
}

/**
 * Whether this attempt should be refused outright. Read-only: it does not
 * consume anything, so a legitimate login costs nothing.
 */
export async function isLoginBlocked(
	ip: string,
	name: string
): Promise<LoginGateResult> {
	try {
		await ensureIndex();
		const c = await col();
		const now = Date.now();
		const window = Math.floor(now / WINDOW_MS);
		const [ipKey, nameKey] = loginKeys(ip, name);

		const docs = await c
			.find({ key: { $in: [ipKey, nameKey] }, window })
			.toArray();

		const over = docs.some((d) =>
			d.key === ipKey
				? d.count >= MAX_ATTEMPTS_PER_IP
				: d.count >= MAX_ATTEMPTS_PER_NAME
		);

		if (!over) return { blocked: false, retryAfterSec: 0 };

		const retryAfterSec = Math.max(
			1,
			Math.ceil(((window + 1) * WINDOW_MS - now) / 1000)
		);
		return { blocked: true, retryAfterSec };
	} catch (e) {
		// Never let a limiter outage block logins entirely — fail open, but say so.
		console.error("login rate limit check failed:", e);
		return { blocked: false, retryAfterSec: 0 };
	}
}

/** Record a failed attempt against both keys. */
export async function recordLoginFailure(ip: string, name: string) {
	try {
		await ensureIndex();
		const c = await col();
		const now = Date.now();
		const window = Math.floor(now / WINDOW_MS);

		await Promise.all(
			loginKeys(ip, name).map(async (key) => {
				// Roll the counter over at the start of a new window. The
				// `window: { $ne }` filter makes this race-safe.
				await c.updateOne(
					{ key, window: { $ne: window } },
					{ $set: { window, count: 0, updatedAt: new Date(now) } }
				);
				await c.updateOne(
					{ key },
					{
						$inc: { count: 1 },
						$set: { updatedAt: new Date(now) },
						$setOnInsert: { key, window },
					},
					{ upsert: true }
				);
			})
		);
	} catch (e) {
		console.error("login failure record failed:", e);
	}
}

/** Clear counters after a successful login so a real user is never locked out. */
export async function clearLoginAttempts(ip: string, name: string) {
	try {
		const c = await col();
		await c.deleteMany({ key: { $in: loginKeys(ip, name) } });
	} catch (e) {
		console.error("login attempt clear failed:", e);
	}
}
