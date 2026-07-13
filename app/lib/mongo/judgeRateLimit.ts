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

/** Max AI-hint requests per user per window. Override with JUDGE_HINT_LIMIT_PER_MIN. */
export const DEFAULT_HINT_LIMIT = Number(
	process.env.JUDGE_HINT_LIMIT_PER_MIN ?? 10
);

interface RateDoc {
	userId: string; // student _id as string (unique)
	window: number; // Math.floor(now / WINDOW_MS) the count belongs to
	count: number; // actions consumed in the current window
	updatedAt: Date;
}

async function col(name: string) {
	const db = await getDB();
	return db.collection<RateDoc>(name);
}

// Track which collections have had their unique index ensured (one per limiter).
const indexEnsured = new Set<string>();

async function ensureIndex(name: string) {
	if (indexEnsured.has(name)) return;
	const c = await col(name);
	await c.createIndex({ userId: 1 }, { unique: true });
	indexEnsured.add(name);
}

export type SubmitRateResult =
	| { allowed: true; remaining: number; limit: number }
	| { allowed: false; retryAfterSec: number; limit: number };

/**
 * Atomically consume one slot for a user in the current minute window against a
 * named limiter collection. The guarded `$inc` (`count < limit`) only increments
 * when under the limit, so racing requests can't exceed it. Returns whether the
 * action is allowed and, if not, how long until the window resets.
 */
async function consumeRate(
	collection: string,
	userId: string,
	limit: number
): Promise<SubmitRateResult> {
	await ensureIndex(collection);
	const c = await col(collection);
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

/** Rate-limit code submissions (the heaviest judge action — one Piston run per case). */
export function consumeSubmitRate(
	userId: string,
	limit = DEFAULT_SUBMIT_LIMIT
): Promise<SubmitRateResult> {
	return consumeRate("judgeRateLimit", userId, limit);
}

/** Rate-limit AI-hint requests (each one calls the model — cap spend/abuse). */
export function consumeHintRate(
	userId: string,
	limit = DEFAULT_HINT_LIMIT
): Promise<SubmitRateResult> {
	return consumeRate("hintRateLimit", userId, limit);
}
