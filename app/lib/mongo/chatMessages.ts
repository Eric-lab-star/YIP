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

async function col() {
  const db = await getDB();
  return db.collection<ChatMessage>("chatMessages");
}

export async function createChatMessage(msg: Omit<ChatMessage, "_id">) {
  const c = await col();
  return c.insertOne(msg as ChatMessage);
}

export async function getMessagesByRoom(roomId: string, limit = 100) {
  const c = await col();
  return c
    .find({ roomId })
    .sort({ createdAt: 1 })
    .limit(limit)
    .toArray();
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
