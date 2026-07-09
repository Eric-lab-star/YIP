import { validateToken } from "@/app/lib/auth/login";
import { canAccessRoom } from "@/app/lib/mongo/chatRooms";
import { pusherServer } from "@/app/lib/pusher/pusher_server";
import { NextRequest, NextResponse } from "next/server";

// Pusher channel-authorization endpoint. Called by pusher-js before it may
// subscribe to a `private-` channel. We authenticate the session (JWT cookie),
// derive the roomId from the channel name, and only sign the subscription when
// the user is actually allowed to read that room. This is what stops anyone
// with the public app key from eavesdropping on other users' rooms.
const CHANNEL_PREFIX = "private-chat-";

export async function POST(req: NextRequest) {
  const auth = await validateToken();
  if (!auth.success) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // pusher-js sends these as application/x-www-form-urlencoded.
  const form = await req.formData();
  const socketId = form.get("socket_id");
  const channelName = form.get("channel_name");

  if (typeof socketId !== "string" || typeof channelName !== "string") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!channelName.startsWith(CHANNEL_PREFIX)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const roomId = channelName.slice(CHANNEL_PREFIX.length);
  if (!(await canAccessRoom(roomId, auth.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const authResponse = pusherServer.authorizeChannel(socketId, channelName);
  return NextResponse.json(authResponse);
}
