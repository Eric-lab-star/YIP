import { pusherServer } from "@/app/lib/pusher/pusher_server";
import { validateToken } from "@/app/lib/auth/login";
import { createChatMessage } from "@/app/lib/mongo/chatMessages";
import { getMessagesByRoom } from "@/app/lib/mongo/chatMessages";
import { findChatRoomById } from "@/app/lib/mongo/chatRooms";
import { NextRequest, NextResponse } from "next/server";

// Authorize a user against a room: public rooms are open to any signed-in user;
// AI/private rooms require membership (or ownership). Returns the room when
// allowed, or a NextResponse to short-circuit with when not.
async function authorizeRoom(roomId: string, userId: string) {
  const room = await findChatRoomById(roomId).catch(() => null);
  if (!room) {
    return { error: NextResponse.json({ error: "Room not found" }, { status: 404 }) };
  }
  if (
    room.type !== "public" &&
    room.createdBy !== userId &&
    !room.members.includes(userId)
  ) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { room };
}

export async function POST(req: NextRequest) {
  const auth = await validateToken();
  if (!auth.success) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, roomId } = await req.json();
  if (!message || !roomId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const authz = await authorizeRoom(roomId, auth.id);
  if (authz.error) return authz.error;

  const chatMsg = {
    roomId,
    userId: auth.id,
    userName: auth.name,
    message,
    createdAt: new Date(),
  };
  const inserted = await createChatMessage(chatMsg);

  await pusherServer.trigger(`chat-${roomId}`, "new-message", {
    id: inserted.insertedId.toString(),
    userId: auth.id,
    userName: auth.name,
    message,
    createdAt: chatMsg.createdAt.toISOString(),
  });

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const auth = await validateToken();
  if (!auth.success) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const roomId = req.nextUrl.searchParams.get("roomId");
  if (!roomId) {
    return NextResponse.json({ error: "Missing roomId" }, { status: 400 });
  }

  const authz = await authorizeRoom(roomId, auth.id);
  if (authz.error) return authz.error;

  const messages = await getMessagesByRoom(roomId);
  const serialized = messages.map((m) => ({
    id: m._id!.toString(),
    userId: m.userId,
    userName: m.userName,
    message: m.message,
    createdAt: m.createdAt.toISOString(),
  }));

  return NextResponse.json(serialized);
}
