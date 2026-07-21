import {
	createCipheriv,
	createDecipheriv,
	createHmac,
	randomBytes,
} from "node:crypto";

// Reversible protection for the student phone number, which is PII stored at
// rest and also the login secret. Two pieces work together:
//
//   - AES-256-GCM ciphertext (random IV per write) is what we store and can
//     decrypt to show an admin the real number. A DB leak exposes only
//     ciphertext.
//   - A blind index — HMAC-SHA256 of the normalized number — is a deterministic
//     value we CAN equality-query, so login still works. (GCM ciphertext is
//     non-deterministic and therefore unsearchable; the index fills that gap
//     without revealing the number, since HMAC is one-way.)
//
// This is OPTIONAL, mirroring the app's other opt-in integrations: with the
// keys unset the functions pass the number through in plaintext and no index is
// produced, so deploying the code changes nothing until the keys are set and
// the existing rows are migrated. See scripts/migrate-phone-encryption.ts.
//
// Enabling requires BOTH:
//   PHONE_ENC_KEY    — 32 bytes as base64 or hex (AES-256 key)
//   PHONE_INDEX_KEY  — any non-empty secret (HMAC key)

const ENC_PREFIX = "enc:v1:";

function readEncKey(): Buffer | null {
	const raw = process.env.PHONE_ENC_KEY;
	if (!raw) return null;
	// Accept base64 or hex; must decode to exactly 32 bytes for AES-256.
	let key: Buffer;
	if (/^[0-9a-fA-F]{64}$/.test(raw)) {
		key = Buffer.from(raw, "hex");
	} else {
		key = Buffer.from(raw, "base64");
	}
	if (key.length !== 32) {
		throw new Error(
			"PHONE_ENC_KEY must decode to 32 bytes (base64 or 64 hex chars)"
		);
	}
	return key;
}

const encKey = readEncKey();
const indexKey = process.env.PHONE_INDEX_KEY || null;

/** Whether reversible phone encryption is fully configured. */
export function isPhoneCryptoConfigured(): boolean {
	return encKey !== null && indexKey !== null;
}

/** Digits only — the canonical form both the index and ciphertext are built on. */
export function normalizePhone(raw: string): string {
	return raw.replace(/\D/g, "");
}

/** True if a stored value is one of our ciphertexts (vs. legacy plaintext). */
export function isEncrypted(stored: string): boolean {
	return stored.startsWith(ENC_PREFIX);
}

/**
 * Encrypt a phone number for storage. Returns `enc:v1:<iv>:<tag>:<ct>` (all
 * base64). With no key configured, returns the normalized number unchanged, so
 * writes keep working in the un-migrated / opt-out state.
 */
export function encryptPhone(raw: string): string {
	const normalized = normalizePhone(raw);
	if (!encKey) return normalized;
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", encKey, iv);
	const ct = Buffer.concat([cipher.update(normalized, "utf8"), cipher.final()]);
	const tag = cipher.getAuthTag();
	return `${ENC_PREFIX}${iv.toString("base64")}:${tag.toString(
		"base64"
	)}:${ct.toString("base64")}`;
}

/**
 * Decrypt a stored phone value for display. A legacy plaintext value (no
 * prefix) is returned as-is, so reads work throughout the migration. Throws
 * only if a value is tagged encrypted but the key is missing or the data is
 * tampered (GCM auth failure) — a real error worth surfacing.
 */
export function decryptPhone(stored: string): string {
	if (!isEncrypted(stored)) return stored;
	if (!encKey) {
		throw new Error("Encrypted phone present but PHONE_ENC_KEY is not set");
	}
	const [, , ivB64, tagB64, ctB64] = stored.split(":");
	const iv = Buffer.from(ivB64, "base64");
	const tag = Buffer.from(tagB64, "base64");
	const ct = Buffer.from(ctB64, "base64");
	const decipher = createDecipheriv("aes-256-gcm", encKey, iv);
	decipher.setAuthTag(tag);
	return Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
}

/**
 * Deterministic blind index for equality lookup at login. Returns null when no
 * index key is configured (callers then fall back to plaintext matching).
 */
export function phoneIndex(raw: string): string | null {
	if (!indexKey) return null;
	return createHmac("sha256", indexKey)
		.update(normalizePhone(raw))
		.digest("hex");
}
