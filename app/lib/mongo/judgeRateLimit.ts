import { getDB } from "./db";

// Fixed-window per-user rate limit for code submissions. Each submission fans
// out to Piston once per test case, so it's the most resource-intensive judge
// action — this caps how many a single user can fire per minute. Mirrors the
// atomic guarded-$inc pattern in `aiUsage.ts` so concurrent requests can't
// overshoot the limit. Stored in Mongo (Vercel serverless is stateless, so an
// in-process counter wouldn't hold across instances).

const WINDOW_MS = 60_000; // 1 minute

/** Max submissions per user per window. Override with JUDGE_SUBMIT_LIMIT_PER_MIN. */
export const DEFAULT_SUBMIT_LIMIT = Number(
	process.env.JUDGE_SUBMIT_LIMIT_PER_MIN ?? 20
);

interface RateDoc {
	userId: string; // student _id as string (unique)
	window: number; // Math.floor(now / WINDOW_MS) the count belongs to
	count: number; // submissions consumed in the current window
	updatedAt: Date;
}

async function col() {
	const db = await getDB();
	return db.collection<RateDoc>("judgeRateLimit");
}

let indexEnsured = false;

async function ensureIndex() {
	if (indexEnsured) return;
	const c = await col();
	await c.createIndex({ userId: 1 }, { unique: true });
	indexEnsured = true;
}

export type SubmitRateResult =
	| { allowed: true; remaining: number; limit: number }
	| { allowed: false; retryAfterSec: number; limit: number };

/**
 * Atomically consume one submission slot for a user in the current minute
 * window. The guarded `$inc` (`count < limit`) only increments when under the
 * limit, so racing requests can't exceed it. Returns whether the submission is
 * allowed and, if not, how long until the window resets.
 */
export async function consumeSubmitRate(
	userId: string,
	limit = DEFAULT_SUBMIT_LIMIT
): Promise<SubmitRateResult> {
	await ensureIndex();
	const c = await col();
	const now = Date.now();
	const window = Math.floor(now / WINDOW_MS);

	// Ensure a doc exists before the guarded $inc.
	await c.updateOne(
		{ userId },
		{ $setOnInsert: { userId, window, count: 0, updatedAt: new Date(now) } },
		{ upsert: true }
	);

	// Roll the counter over at the start of a new window. The `window: { $ne }`
	// filter makes this race-safe: only the first writer of the window resets it.
	await c.updateOne(
		{ userId, window: { $ne: window } },
		{ $set: { window, count: 0, updatedAt: new Date(now) } }
	);

	const updated = await c.findOneAndUpdate(
		{ userId, window, count: { $lt: limit } },
		{ $inc: { count: 1 }, $set: { updatedAt: new Date(now) } },
		{ returnDocument: "after" }
	);

	if (updated) {
		return { allowed: true, remaining: limit - updated.count, limit };
	}

	// Over the limit — report seconds until this window ends.
	const retryAfterSec = Math.max(1, Math.ceil(((window + 1) * WINDOW_MS - now) / 1000));
	return { allowed: false, retryAfterSec, limit };
}
