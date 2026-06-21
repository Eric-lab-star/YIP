"use server";

import { validateToken } from "@/app/lib/auth/login";
import {
  createChatRoom,
  findChatRoomById,
  findChatRoomByInviteCode,
  addMemberToRoom,
  removeMemberFromRoom,
  deleteChatRoom,
  listChatRoomsForUser,
  ensureDefaultRooms,
  ensureUserAiRoom,
} from "@/app/lib/mongo/chatRooms";
import {
  deleteMessagesByRoom,
  deleteMessagesByRoomAndUser,
  findMessageById,
  deleteMessageById,
} from "@/app/lib/mongo/chatMessages";
import { pusherServer } from "@/app/lib/pusher/pusher_server";
import { ensureAiCacheIndex } from "@/app/lib/mongo/aiCache";
import {
  ensureAiUsageIndex,
  listAiUsage,
  setAiEnabled,
  setAiEnabledForUsers,
  resetAiUsage,
  todayKey,
  DEFAULT_AI_MESSAGE_LIMIT,
} from "@/app/lib/mongo/aiUsage";
import { readManyStudentFlat } from "@/app/lib/mongo/students";
import { randomBytes } from "crypto";

export async function getChatRoomsAction() {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const };

  await ensureDefaultRooms();
  await ensureUserAiRoom(auth.id);
  await ensureAiCacheIndex();
  await ensureAiUsageIndex();
  const rooms = await listChatRoomsForUser(auth.id);
  const serialized = rooms.map((r) => ({
    ...r,
    _id: r._id!.toString(),
    createdAt: r.createdAt.toISOString(),
  }));
  return { success: true as const, rooms: serialized };
}

export async function createChatRoomAction(name: string) {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const };

  const inviteCode = randomBytes(6).toString("hex");
  const result = await createChatRoom({
    name,
    type: "private",
    createdBy: auth.id,
    members: [auth.id],
    inviteCode,
    createdAt: new Date(),
  });

  return {
    success: true as const,
    roomId: result.insertedId.toString(),
    inviteCode,
  };
}

export async function joinRoomByCodeAction(code: string) {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const, error: "로그인이 필요합니다." };

  const room = await findChatRoomByInviteCode(code.trim());
  if (!room) return { success: false as const, error: "초대 코드가 유효하지 않습니다." };

  await addMemberToRoom(room._id!.toString(), auth.id);
  return { success: true as const, roomId: room._id!.toString() };
}

/**
 * Leave a private room (removes the caller from `members`). Only private rooms
 * can be left; the owner should delete instead. No-op-safe if not a member.
 */
export async function leaveRoomAction(roomId: string) {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const, error: "로그인이 필요합니다." };

  const room = await findChatRoomById(roomId).catch(() => null);
  if (!room) return { success: false as const, error: "채팅방을 찾을 수 없습니다." };
  if (room.type !== "private") {
    return { success: false as const, error: "나갈 수 없는 채팅방입니다." };
  }

  await removeMemberFromRoom(roomId, auth.id);
  return { success: true as const };
}

/**
 * Delete a private room and all of its messages. Restricted to the room's
 * creator.
 */
export async function deleteRoomAction(roomId: string) {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const, error: "로그인이 필요합니다." };

  const room = await findChatRoomById(roomId).catch(() => null);
  if (!room) return { success: false as const, error: "채팅방을 찾을 수 없습니다." };
  if (room.type !== "private" || room.createdBy !== auth.id) {
    return { success: false as const, error: "삭제 권한이 없습니다." };
  }

  await deleteChatRoom(roomId);
  await deleteMessagesByRoom(roomId);
  return { success: true as const };
}

/**
 * Clear ALL messages in a room. Allowed for an admin in a public room, or the
 * owner of an AI room. Private rooms cannot be bulk-cleared — members use
 * clearMyRoomMessagesAction to remove only their own messages.
 */
export async function clearRoomMessagesAction(roomId: string) {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const, error: "로그인이 필요합니다." };

  const room = await findChatRoomById(roomId).catch(() => null);
  if (!room) return { success: false as const, error: "채팅방을 찾을 수 없습니다." };

  const allowed =
    (room.type === "public" && auth.role === "admin") ||
    (room.type === "ai" && room.createdBy === auth.id);
  if (!allowed) {
    return { success: false as const, error: "전체 초기화 권한이 없습니다." };
  }

  await deleteMessagesByRoom(roomId);
  await pusherServer.trigger(`chat-${roomId}`, "messages-cleared", {
    scope: "all",
  });
  return { success: true as const };
}

/**
 * Delete a single message. Restricted to its author — used by the per-message
 * right-click delete. Broadcasts so every viewer drops the message live.
 */
export async function deleteMessageAction(messageId: string) {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const, error: "로그인이 필요합니다." };

  const msg = await findMessageById(messageId).catch(() => null);
  if (!msg) return { success: false as const, error: "메시지를 찾을 수 없습니다." };
  if (msg.userId !== auth.id) {
    return { success: false as const, error: "본인 메시지만 삭제할 수 있습니다." };
  }

  await deleteMessageById(messageId);
  await pusherServer.trigger(`chat-${msg.roomId}`, "message-deleted", {
    id: messageId,
  });
  return { success: true as const };
}

/**
 * Remove only the caller's own messages in a room. Available to any participant
 * (public room, or a member/owner of a private/AI room).
 */
export async function clearMyRoomMessagesAction(roomId: string) {
  const auth = await validateToken();
  if (!auth.success) return { success: false as const, error: "로그인이 필요합니다." };

  const room = await findChatRoomById(roomId).catch(() => null);
  if (!room) return { success: false as const, error: "채팅방을 찾을 수 없습니다." };

  const isParticipant =
    room.type === "public" ||
    room.createdBy === auth.id ||
    room.members.includes(auth.id);
  if (!isParticipant) {
    return { success: false as const, error: "권한이 없습니다." };
  }

  await deleteMessagesByRoomAndUser(roomId, auth.id);
  await pusherServer.trigger(`chat-${roomId}`, "messages-cleared", {
    scope: "user",
    userId: auth.id,
  });
  return { success: true as const };
}

/**
 * Admin: list every user alongside their AI usage / enabled state. Users with
 * no usage doc yet are reported as enabled with 0 used (the default).
 */
export async function getAiUsersAction() {
  const auth = await validateToken();
  if (!auth.success || auth.role !== "admin") {
    return { success: false as const };
  }

  await ensureAiUsageIndex();
  const [students, usage] = await Promise.all([
    readManyStudentFlat(),
    listAiUsage(),
  ]);
  const usageByUser = new Map(usage.map((u) => [u.userId, u]));
  const today = todayKey();

  const users = students.map((s) => {
    const u = usageByUser.get(s._id);
    // A count from a previous day has effectively reset to 0.
    const used = u && u.day === today ? u.used : 0;
    return {
      userId: s._id,
      name: s.name,
      role: s.role,
      used,
      enabled: u?.enabled ?? true,
      // Admins are not subject to the daily limit.
      unlimited: s.role === "admin",
    };
  });

  return { success: true as const, users, limit: DEFAULT_AI_MESSAGE_LIMIT };
}

/** Admin: enable or disable AI chat for a single user. */
export async function setUserAiEnabledAction(userId: string, enabled: boolean) {
  const auth = await validateToken();
  if (!auth.success || auth.role !== "admin") {
    return { success: false as const, error: "권한이 없습니다." };
  }

  await setAiEnabled(userId, enabled);
  return { success: true as const };
}

/**
 * Admin: enable or disable AI chat for all non-admin users at once. Admins are
 * exempt from the limit anyway, so they're excluded from the bulk toggle.
 */
export async function setAllUsersAiEnabledAction(enabled: boolean) {
  const auth = await validateToken();
  if (!auth.success || auth.role !== "admin") {
    return { success: false as const, error: "권한이 없습니다." };
  }

  const students = await readManyStudentFlat();
  const ids = students.filter((s) => s.role !== "admin").map((s) => s._id);
  await setAiEnabledForUsers(ids, enabled);
  return { success: true as const };
}

/** Admin: reset a user's daily AI usage count back to zero. */
export async function resetUserAiUsageAction(userId: string) {
  const auth = await validateToken();
  if (!auth.success || auth.role !== "admin") {
    return { success: false as const, error: "권한이 없습니다." };
  }

  await resetAiUsage(userId);
  return { success: true as const };
}
