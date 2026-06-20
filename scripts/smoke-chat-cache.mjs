// Integration smoke test for the per-room AI cache + per-user AI room logic.
// Mirrors the exact logic in app/lib/mongo/aiCache.ts and chatRooms.ts, runs it
// against the real DB + Voyage, and cleans up its own test data.
//
//   node scripts/smoke-chat-cache.mjs
//
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { MongoClient } from "mongodb";

// --- load .env.local (no dotenv dependency) ---
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) {
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const EMBED_MODEL = "voyage-3.5-lite";
const EMBED_DIMS = 1024;
const VECTOR_INDEX = "ai_cache_vector_index";
const SIMILARITY_THRESHOLD = 0.97;

let pass = 0;
let fail = 0;
function check(name, cond) {
  if (cond) {
    pass++;
    console.log(`  ✅ ${name}`);
  } else {
    fail++;
    console.log(`  ❌ ${name}`);
  }
}

const normalize = (q) =>
  q.toLowerCase().trim().replace(/\s+/g, " ").replace(/[?!.\s]+$/g, "");
const hashQuestion = (roomId, q) =>
  createHash("sha256").update(`${roomId} ${normalize(q)}`).digest("hex");

async function embedQuestion(question) {
  const key = process.env.VOYAGE_API_KEY;
  if (!key) return null;
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
    console.log("    voyage status", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  const e = data?.data?.[0]?.embedding;
  return Array.isArray(e) ? e : null;
}

const TEST_PREFIX = "smoketest-";
const roomA = `${TEST_PREFIX}roomA-${Date.now()}`;
const roomB = `${TEST_PREFIX}roomB-${Date.now()}`;
const testUser = `${TEST_PREFIX}user-${Date.now()}`;

const client = new MongoClient(process.env.YIPDB_MONGODB_URI);

try {
  await client.connect();
  const db = client.db("yipDB");
  const cache = db.collection("aiResponseCache");
  const rooms = db.collection("chatRooms");

  // --- 1. ensureAiCacheIndex: unique + vector index ---
  console.log("\n[1] index setup");
  await cache.createIndex({ questionHash: 1 }, { unique: true });
  const idxNames = (await cache.indexes()).map((i) => i.name);
  check("unique questionHash index exists", idxNames.includes("questionHash_1"));

  let searchIdx = [];
  try {
    searchIdx = await cache.listSearchIndexes().toArray();
  } catch (e) {
    console.log("    listSearchIndexes:", e.message);
  }
  const vIdx = searchIdx.find((i) => i.name === VECTOR_INDEX);
  check("vector search index exists", !!vIdx);
  if (vIdx) {
    const fields = vIdx.latestDefinition?.fields ?? [];
    check(
      "vector index has 1024-dim cosine vector field",
      fields.some(
        (f) =>
          f.type === "vector" &&
          f.path === "embedding" &&
          f.numDimensions === EMBED_DIMS &&
          f.similarity === "cosine"
      )
    );
    check(
      "vector index has roomId filter field",
      fields.some((f) => f.type === "filter" && f.path === "roomId")
    );
    check("vector index is queryable", vIdx.queryable === true);
  }

  // --- 2. Voyage embedding ---
  console.log("\n[2] Voyage embedding");
  const emb1 = await embedQuestion("파이썬에서 리스트란 무엇인가요?");
  check("embedQuestion returns array", Array.isArray(emb1));
  check("embedding has 1024 dims", emb1?.length === EMBED_DIMS);

  // --- 3. setCachedAnswer + getCachedAnswer (exact, per-room) ---
  console.log("\n[3] exact-match cache (per-room)");
  const qA = "파이썬 리스트란?";
  const ansA = "리스트는 순서가 있는 가변 컬렉션입니다.";
  const now = new Date();
  await cache.updateOne(
    { questionHash: hashQuestion(roomA, qA) },
    {
      $setOnInsert: {
        roomId: roomA,
        questionHash: hashQuestion(roomA, qA),
        question: qA,
        embedding: emb1,
        answer: ansA,
        hits: 0,
        createdAt: now,
      },
      $set: { lastUsedAt: now },
    },
    { upsert: true }
  );

  // exact hit in roomA (note trailing-space variant normalizes the same)
  const hitA = await cache.findOneAndUpdate(
    { questionHash: hashQuestion(roomA, "  파이썬   리스트란  ") },
    { $inc: { hits: 1 }, $set: { lastUsedAt: new Date() } },
    { returnDocument: "after" }
  );
  check("normalized exact hit in same room", hitA?.answer === ansA);
  check("hit increments hits counter", hitA?.hits === 1);

  // same question, different room → miss (per-room isolation on exact key)
  const hitB = await cache.findOne({
    questionHash: hashQuestion(roomB, qA),
  });
  check("exact key is room-scoped (miss in other room)", hitB === null);

  // --- 4. findSimilarAnswer (semantic, per-room filter) ---
  console.log("\n[4] semantic cache (vector search + room filter)");
  if (vIdx?.queryable) {
    const embSimilar = await embedQuestion("리스트가 파이썬에서 뭐예요?");

    const runSearch = (roomId, queryVector) =>
      cache
        .aggregate([
          {
            $vectorSearch: {
              index: VECTOR_INDEX,
              path: "embedding",
              queryVector,
              filter: { roomId },
              numCandidates: 50,
              limit: 1,
            },
          },
          { $project: { answer: 1, score: { $meta: "vectorSearchScore" } } },
        ])
        .toArray();

    const [simA] = await runSearch(roomA, embSimilar);
    console.log("    similar-question score:", simA?.score?.toFixed(4));
    check(
      "similar question clears threshold in same room",
      !!simA && simA.score >= SIMILARITY_THRESHOLD && simA.answer === ansA
    );

    const [simB] = await runSearch(roomB, embSimilar);
    check("vector search room filter isolates other room", !simB);

    const embUnrelated = await embedQuestion("오늘 날씨 어때?");
    const [unrelated] = await runSearch(roomA, embUnrelated);
    check(
      "unrelated question is below threshold",
      !unrelated || unrelated.score < SIMILARITY_THRESHOLD
    );
  } else {
    console.log("    (vector index not queryable yet — skipping search tests)");
  }

  // --- 5. ensureUserAiRoom: create + idempotent ---
  console.log("\n[5] per-user AI room");
  async function ensureUserAiRoom(userId) {
    const existing = await rooms.findOne({ type: "ai", createdBy: userId });
    if (existing) return existing;
    const room = {
      name: "AI 도우미",
      type: "ai",
      createdBy: userId,
      members: [userId],
      inviteCode: "",
      createdAt: new Date(),
    };
    const r = await rooms.insertOne(room);
    return { ...room, _id: r.insertedId };
  }
  const r1 = await ensureUserAiRoom(testUser);
  const r2 = await ensureUserAiRoom(testUser);
  check("creates an AI room for the user", r1.type === "ai");
  check("room is owned by + member of the user", r1.createdBy === testUser && r1.members.includes(testUser));
  check("idempotent (same room id on 2nd call)", String(r1._id) === String(r2._id));
  const aiCount = await rooms.countDocuments({ type: "ai", createdBy: testUser });
  check("exactly one AI room per user", aiCount === 1);

  // --- 6. listChatRoomsForUser scoping ---
  console.log("\n[6] room listing scope");
  const otherUser = `${TEST_PREFIX}other-${Date.now()}`;
  await ensureUserAiRoom(otherUser);
  const listed = await rooms
    .find({
      $or: [
        { type: "public" },
        { type: "ai", createdBy: testUser },
        { members: testUser },
      ],
    })
    .toArray();
  check(
    "listing includes the user's own AI room",
    listed.some((r) => String(r._id) === String(r1._id))
  );
  check(
    "listing excludes other users' AI rooms",
    !listed.some((r) => r.type === "ai" && r.createdBy === otherUser)
  );

  // --- cleanup ---
  console.log("\n[cleanup]");
  const delCache = await cache.deleteMany({ roomId: { $in: [roomA, roomB] } });
  const delRooms = await rooms.deleteMany({ createdBy: { $regex: `^${TEST_PREFIX}` } });
  console.log(`  removed ${delCache.deletedCount} cache rows, ${delRooms.deletedCount} rooms`);

  console.log(`\n=== ${pass} passed, ${fail} failed ===`);
  process.exitCode = fail === 0 ? 0 : 1;
} finally {
  await client.close();
}
