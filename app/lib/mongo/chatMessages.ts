import { ObjectId } from "mongodb";
import { getDB } from "./db";

export interface ChatMessage {
  _id?: ObjectId;
  roomId: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: Date;
}

let indexEnsured = false;

async function col() {
  const db = await getDB();
  const c = db.collection<ChatMessage>("chatMessages");
  // Supports the per-room, time-ordered reads below and the delete-by-room path.
  if (!indexEnsured) {
    await c.createIndex({ roomId: 1, createdAt: 1 });
    indexEnsured = true;
  }
  return c;
}

export async function createChatMessage(msg: Omit<ChatMessage, "_id">) {
  const c = await col();
  return c.insertOne(msg as ChatMessage);
}

export async function getMessagesByRoom(roomId: string, limit = 100) {
  const c = await col();
  // Fetch the most recent `limit` messages, then return them oldest-first so
  // callers (AI history window, chat UI) always see the latest turns.
  const recent = await c
    .find({ roomId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return recent.reverse();
}

export async function deleteMessagesByRoom(roomId: string) {
  const c = await col();
  return c.deleteMany({ roomId });
}

export async function deleteMessagesByRoomAndUser(
  roomId: string,
  userId: string
) {
  const c = await col();
  return c.deleteMany({ roomId, userId });
}

export async function findMessageById(id: string) {
  const c = await col();
  return c.findOne({ _id: new ObjectId(id) });
}

export async function deleteMessageById(id: string) {
  const c = await col();
  return c.deleteOne({ _id: new ObjectId(id) });
}
