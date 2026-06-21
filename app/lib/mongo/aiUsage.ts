import { ObjectId } from "mongodb";
import { getDB } from "./db";

// Default number of AI chat messages a user may send per day. The count resets
// automatically at the start of each (Asia/Seoul) day. Admins can disable a
// user entirely (independent of this count) via `setAiEnabled`.
export const DEFAULT_AI_MESSAGE_LIMIT = 50;

export interface AiUsage {
  _id?: ObjectId;
  userId: string; // student _id as string (unique)
  used: number; // AI messages the user has sent in the current day
  day: string; // YYYY-MM-DD (Asia/Seoul) the `used` count belongs to
  enabled: boolean; // admin toggle; false blocks AI chat regardless of `used`
  createdAt: Date;
  updatedAt: Date;
}

/** Current calendar day in Asia/Seoul as a YYYY-MM-DD key. */
export function todayKey(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
}

async function col() {
  const db = await getDB();
  return db.collection<AiUsage>("aiUsage");
}

let indexEnsured = false;

/** Unique index on `userId` so the per-user upsert is concurrency-safe. */
export async function ensureAiUsageIndex() {
  if (indexEnsured) return;
  const c = await col();
  await c.createIndex({ userId: 1 }, { unique: true });
  indexEnsured = true;
}

export type QuotaResult =
  | { allowed: true; enabled: true; used: number; limit: number }
  | {
      allowed: false;
      enabled: boolean;
      used: number;
      limit: number;
      reason: "disabled" | "limit";
    };

/**
 * Atomically consume one unit of a user's AI-message quota. Increments `used`
 * only when the user is enabled AND under the limit, so concurrent requests
 * can't overshoot. Returns whether the message is allowed and, if not, why.
 */
export async function consumeAiQuota(
  userId: string,
  limit = DEFAULT_AI_MESSAGE_LIMIT
): Promise<QuotaResult> {
  const c = await col();
  const now = new Date();
  const day = todayKey();

  // Make sure a usage doc exists (enabled by default) before the guarded $inc.
  await c.updateOne(
    { userId },
    {
      $setOnInsert: {
        userId,
        used: 0,
        day,
        enabled: true,
        createdAt: now,
        updatedAt: now,
      },
    },
    { upsert: true }
  );

  // Roll the counter over at the start of a new day. The `day: { $ne }` filter
  // makes this race-safe: only the first writer of the day resets the count.
  await c.updateOne(
    { userId, day: { $ne: day } },
    { $set: { used: 0, day, updatedAt: now } }
  );

  const updated = await c.findOneAndUpdate(
    { userId, enabled: true, used: { $lt: limit } },
    { $inc: { used: 1 }, $set: { updatedAt: now } },
    { returnDocument: "after" }
  );

  if (updated) {
    return { allowed: true, enabled: true, used: updated.used, limit };
  }

  // Blocked: report whether it was the admin toggle or the limit.
  const doc = await c.findOne({ userId });
  const enabled = doc?.enabled ?? true;
  return {
    allowed: false,
    enabled,
    used: doc?.used ?? 0,
    limit,
    reason: enabled ? "limit" : "disabled",
  };
}

/** Admin: enable or disable AI chat for a single user. */
export async function setAiEnabled(userId: string, enabled: boolean) {
  const c = await col();
  const now = new Date();
  await c.updateOne(
    { userId },
    {
      $set: { enabled, updatedAt: now },
      $setOnInsert: { userId, used: 0, day: todayKey(), createdAt: now },
    },
    { upsert: true }
  );
}

/** Admin: enable or disable AI chat for many users at once (bulk upsert). */
export async function setAiEnabledForUsers(
  userIds: string[],
  enabled: boolean
) {
  if (userIds.length === 0) return;
  const c = await col();
  const now = new Date();
  const day = todayKey();
  await c.bulkWrite(
    userIds.map((userId) => ({
      updateOne: {
        filter: { userId },
        update: {
          $set: { enabled, updatedAt: now },
          $setOnInsert: { userId, used: 0, day, createdAt: now },
        },
        upsert: true,
      },
    }))
  );
}

/** Admin: reset a user's usage count for the current day back to zero. */
export async function resetAiUsage(userId: string) {
  const c = await col();
  const now = new Date();
  await c.updateOne(
    { userId },
    {
      $set: { used: 0, day: todayKey(), updatedAt: now },
      $setOnInsert: { userId, enabled: true, createdAt: now },
    },
    { upsert: true }
  );
}

/** Admin: read the usage/enabled record for every user that has one. */
export async function listAiUsage() {
  const c = await col();
  return c.find({}).toArray();
}
