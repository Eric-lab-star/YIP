import { createHash } from "crypto";
import { getDB } from "./db";
import { AI_PERSONA_VERSION } from "../ai/persona";

// Voyage AI embedding model. voyage-3.5-lite outputs 1024-dim vectors and has
// a generous free tier; embedding a chat question costs a handful of tokens.
const EMBED_MODEL = "voyage-3.5-lite";
const EMBED_DIMS = 1024;
const VECTOR_INDEX = "ai_cache_vector_index";

// Entries idle for this long are reaped by MongoDB's TTL monitor (see
// ensureAiCacheIndex). Expiry is keyed on `lastUsedAt`, which every cache hit
// refreshes, so a question that keeps being asked never expires — only genuinely
// unused entries are removed. Changing this value is picked up automatically on
// the next ensureAiCacheIndex() call.
const CACHE_TTL_DAYS = 30;
const CACHE_TTL_SECONDS = CACHE_TTL_DAYS * 24 * 60 * 60;
const TTL_INDEX = "lastUsedAt_ttl";

// Atlas returns a normalized cosine score in [0, 1] where score = (1 + cos)/2.
// Empirically (voyage-3.5-lite, Korean), rephrasings of the *same* question
// score ~0.93–0.98 while unrelated questions sit far lower, so 0.97 was too
// strict — real paraphrases missed the cache. 0.92 catches genuine rewordings
// with a wide margin above unrelated text. Tune cautiously while watching for
// wrong reuse. NOTE: both stored and lookup embeddings use input_type "query"
// (see embedQuestion) — that symmetric setup is what keeps these scores high;
// switching the stored side to "document" drops same-question scores to ~0.80.
const SIMILARITY_THRESHOLD = 0.90;

export interface AiCacheEntry {
  _id?: string;
  roomId: string;
  questionHash: string;
  question: string;
  answer: string;
  embedding?: number[];
  // AI_PERSONA_VERSION at the time the answer was generated. Entries written
  // under an older persona are never reused (see hashQuestion/findSimilarAnswer).
  persona?: number;
  hits: number;
  createdAt: Date;
  lastUsedAt: Date;
}

async function col() {
  const db = await getDB();
  return db.collection<AiCacheEntry>("aiResponseCache");
}

let indexEnsured = false;

/**
 * Create (or retune) the TTL index that expires idle cache entries.
 *
 * `createIndex` will not alter the options of an index that already exists — if
 * CACHE_TTL_DAYS changes it rejects with IndexOptionsConflict (85) rather than
 * quietly leaving the old expiry in place, so the change has to be applied
 * explicitly. The usual tool for that is `collMod`, but that requires dbAdmin
 * and the Atlas application user only has readWrite ("user is not allowed to do
 * action [collMod]"). Dropping and recreating stays inside readWrite; the gap
 * with no TTL index lasts milliseconds and costs nothing but a delayed reap.
 */
async function ensureTtlIndex() {
  const c = await col();
  const spec = { name: TTL_INDEX, expireAfterSeconds: CACHE_TTL_SECONDS };
  try {
    await c.createIndex({ lastUsedAt: 1 }, spec);
  } catch (err) {
    if ((err as { code?: number }).code !== 85) throw err;
    await c.dropIndex(TTL_INDEX);
    await c.createIndex({ lastUsedAt: 1 }, spec);
  }
}

/**
 * Ensure all three indexes exist:
 *  - a unique B-tree on `questionHash` (concurrency-safe upsert + fast exact hit)
 *  - a TTL index on `lastUsedAt` that expires idle entries (see CACHE_TTL_DAYS)
 *  - an Atlas Vector Search index on `embedding` for semantic lookup
 * All calls are idempotent; the in-process guard avoids re-issuing them. The
 * vector index is Atlas-only and builds asynchronously — failures (e.g. running
 * against a non-Atlas server) are logged, not thrown, so chat still works.
 */
export async function ensureAiCacheIndex() {
  if (indexEnsured) return;
  const c = await col();
  await c.createIndex({ questionHash: 1 }, { unique: true });

  // Expiry is an optimization, not a correctness requirement — a permissions or
  // connectivity failure here must not take down the chat-room list that calls
  // this. Logged, not thrown, same as the vector index below.
  try {
    await ensureTtlIndex();
  } catch (err) {
    console.error("aiCache: TTL index setup skipped:", err);
  }

  try {
    const existing = await c.listSearchIndexes().toArray();
    if (!existing.some((i) => i.name === VECTOR_INDEX)) {
      await c.createSearchIndex({
        name: VECTOR_INDEX,
        type: "vectorSearch",
        definition: {
          fields: [
            {
              type: "vector",
              path: "embedding",
              numDimensions: EMBED_DIMS,
              similarity: "cosine",
            },
            // Lets $vectorSearch scope matches to a single room.
            { type: "filter", path: "roomId" },
          ],
        },
      });
    }
  } catch (err) {
    console.error("aiCache: vector index setup skipped:", err);
  }

  indexEnsured = true;
}

/**
 * Normalize a question so trivially-different phrasings of the same text
 * collapse to one cache key (lowercase, trim, collapse internal whitespace,
 * drop trailing punctuation).
 */
function normalize(question: string): string {
  return question
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[?!.\s]+$/g, "");
}

// Fold roomId into the key so the unique index stays valid when the same
// question is asked in different (per-user) AI rooms. The persona version is
// folded in too, so bumping it retires every existing entry at once instead of
// serving answers written in the previous voice.
export function hashQuestion(roomId: string, question: string): string {
  return createHash("sha256")
    .update(`${roomId} p${AI_PERSONA_VERSION} ${normalize(question)}`)
    .digest("hex");
}

/**
 * Embed a question with Voyage AI. Returns null on any failure (missing key,
 * network error, bad response) so the caller can fall back to a live model call
 * instead of erroring out.
 */
export async function embedQuestion(question: string): Promise<number[] | null> {
  const key = process.env.VOYAGE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.voyageai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        input: [normalize(question)],
        model: EMBED_MODEL,
        input_type: "query",
      }),
    });
    if (!res.ok) {
      console.error("aiCache: Voyage embed failed:", res.status);
      return null;
    }
    const data = await res.json();
    const embedding = data?.data?.[0]?.embedding;
    return Array.isArray(embedding) ? embedding : null;
  } catch (err) {
    console.error("aiCache: Voyage embed error:", err);
    return null;
  }
}

/** Returns the cached answer for an exact (normalized) question in a room. */
export async function getCachedAnswer(
  roomId: string,
  question: string
): Promise<string | null> {
  const c = await col();
  const hit = await c.findOneAndUpdate(
    { questionHash: hashQuestion(roomId, question) },
    { $inc: { hits: 1 }, $set: { lastUsedAt: new Date() } },
    { returnDocument: "after" }
  );
  return hit?.answer ?? null;
}

/**
 * Semantic lookup: find the most similar previously-answered question via Atlas
 * Vector Search and return its answer if the similarity clears the threshold.
 * Bumps the hit counter on a match. Returns null on no match or any failure.
 *
 * Entries stored under an older AI_PERSONA_VERSION are skipped, so a persona
 * change can't leak answers written in the previous voice. The vector index only
 * filters on roomId, so this is a post-filter — hence pulling a few candidates
 * rather than one, to avoid a stale top hit masking a usable current-persona one.
 */
export async function findSimilarAnswer(
  roomId: string,
  embedding: number[]
): Promise<string | null> {
  const c = await col();
  try {
    const candidates = await c
      .aggregate<{ _id: string; answer: string; score: number; persona?: number }>([
        {
          $vectorSearch: {
            index: VECTOR_INDEX,
            path: "embedding",
            queryVector: embedding,
            filter: { roomId },
            numCandidates: 50,
            limit: 5,
          },
        },
        {
          $project: {
            answer: 1,
            persona: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
      ])
      .toArray();

    // Candidates come back best-first, so the first survivor is the best match.
    const hit = candidates.find(
      (h) => h.persona === AI_PERSONA_VERSION && h.score >= SIMILARITY_THRESHOLD
    );
    if (!hit) return null;

    await c.updateOne(
      { _id: hit._id },
      { $inc: { hits: 1 }, $set: { lastUsedAt: new Date() } }
    );
    return hit.answer;
  } catch (err) {
    console.error("aiCache: vector search error:", err);
    return null;
  }
}

/** Stores a question/answer pair (with its embedding). No-op on empty answer. */
export async function setCachedAnswer(
  roomId: string,
  question: string,
  answer: string,
  embedding?: number[] | null
) {
  if (!answer.trim()) return;
  const c = await col();
  const now = new Date();
  await c.updateOne(
    { questionHash: hashQuestion(roomId, question) },
    {
      $setOnInsert: {
        roomId,
        questionHash: hashQuestion(roomId, question),
        question,
        ...(embedding ? { embedding } : {}),
        answer,
        persona: AI_PERSONA_VERSION,
        hits: 0,
        createdAt: now,
      },
      $set: { lastUsedAt: now },
    },
    { upsert: true }
  );
}
