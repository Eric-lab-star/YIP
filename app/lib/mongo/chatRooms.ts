import { ObjectId } from "mongodb";
import { getDB } from "./db";

export interface ChatRoom {
  _id?: ObjectId;
  name: string;
  type: "public" | "ai" | "private";
  createdBy: string;
  members: string[];
  inviteCode: string;
  createdAt: Date;
}

async function col() {
  const db = await getDB();
  return db.collection<ChatRoom>("chatRooms");
}

export async function createChatRoom(room: Omit<ChatRoom, "_id">) {
  const c = await col();
  return c.insertOne(room as ChatRoom);
}

export async function findChatRoomById(id: string) {
  const c = await col();
  return c.findOne({ _id: new ObjectId(id) });
}

/**
 * Whether `userId` may read a room's live feed: public rooms are open to any
 * signed-in user; AI/private rooms require ownership or membership. Shared by
 * the messages API and the Pusher channel-auth endpoint. Never throws.
 */
export async function canAccessRoom(
  roomId: string,
  userId: string
): Promise<boolean> {
  const room = await findChatRoomById(roomId).catch(() => null);
  if (!room) return false;
  return (
    room.type === "public" ||
    room.createdBy === userId ||
    room.members.includes(userId)
  );
}

export async function findChatRoomByInviteCode(code: string) {
  const c = await col();
  return c.findOne({ inviteCode: code });
}

export async function listChatRoomsForUser(userId: string) {
  const c = await col();
  return c
    .find({
      $or: [
        { type: "public" },
        // AI rooms are per-user — only return the caller's own.
        { type: "ai", createdBy: userId },
        { members: userId },
      ],
    })
    .sort({ createdAt: 1 })
    .toArray();
}

/** Ensures the calling user has their own private AI chat room; returns it. */
export async function ensureUserAiRoom(userId: string) {
  const c = await col();
  const existing = await c.findOne({ type: "ai", createdBy: userId });
  if (existing) return existing;

  const room: ChatRoom = {
    name: "AI 도우미",
    type: "ai",
    createdBy: userId,
    members: [userId],
    inviteCode: "",
    createdAt: new Date(),
  };
  const result = await c.insertOne(room);
  return { ...room, _id: result.insertedId };
}

export async function addMemberToRoom(roomId: string, userId: string) {
  const c = await col();
  return c.updateOne(
    { _id: new ObjectId(roomId) },
    { $addToSet: { members: userId } }
  );
}

export async function removeMemberFromRoom(roomId: string, userId: string) {
  const c = await col();
  return c.updateOne(
    { _id: new ObjectId(roomId) },
    { $pull: { members: userId } }
  );
}

export async function deleteChatRoom(roomId: string) {
  const c = await col();
  return c.deleteOne({ _id: new ObjectId(roomId) });
}

export async function ensureDefaultRooms() {
  const c = await col();
  const publicRoom = await c.findOne({ type: "public" });
  if (!publicRoom) {
    await c.insertOne({
      name: "공개 채팅방",
      type: "public",
      createdBy: "system",
      members: [],
      inviteCode: "",
      createdAt: new Date(),
    } as ChatRoom);
  }
  // AI rooms are created per-user via ensureUserAiRoom, not globally.
}
