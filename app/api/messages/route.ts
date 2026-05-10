import { pusherServer } from "@/app/lib/pusher/pusher_server";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
export async function POST(req: Request) {
  const { message, user } = await req.json();
  await pusherServer.trigger("chat-room", "new-message", {
    id: randomUUID(),
    message,
    user,
    timestamp: new Date().toISOString(),
  });
  return NextResponse.json({ success: true });
}
