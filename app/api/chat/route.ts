import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type ModelMessage } from "ai";
import { NextResponse } from "next/server";
import { validateToken } from "@/app/lib/auth/login";
import { createChatMessage } from "@/app/lib/mongo/chatMessages";
import { getMessagesByRoom } from "@/app/lib/mongo/chatMessages";
import { findChatRoomById } from "@/app/lib/mongo/chatRooms";
import {
  getCachedAnswer,
  findSimilarAnswer,
  embedQuestion,
  setCachedAnswer,
} from "@/app/lib/mongo/aiCache";
import { consumeAiQuota } from "@/app/lib/mongo/aiUsage";
import { pusherServer } from "@/app/lib/pusher/pusher_server";

// Persist the AI reply and broadcast it over Pusher. Skips empty replies,
// which would otherwise poison the history for the next request.
async function persistAiReply(roomId: string, text: string) {
  if (!text.trim()) return;
  const createdAt = new Date();
  const inserted = await createChatMessage({
    roomId,
    userId: "ai",
    userName: "AI 도우미",
    message: text,
    createdAt,
  });
  await pusherServer.trigger(`chat-${roomId}`, "new-message", {
    id: inserted.insertedId.toString(),
    userId: "ai",
    userName: "AI 도우미",
    message: text,
    createdAt: createdAt.toISOString(),
  });
}

// Stream a fixed string back to the client in small chunks so a cache hit
// renders with the same incremental UX as a live model response.
function textToStream(text: string): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      const size = 24;
      for (let i = 0; i < text.length; i += size) {
        controller.enqueue(encoder.encode(text.slice(i, i + size)));
      }
      controller.close();
    },
  });
}

export async function POST(req: Request) {
  const auth = await validateToken();
  if (!auth.success) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { message, roomId } = await req.json();
  if (!message?.trim() || !roomId) {
    return new Response("Missing fields", { status: 400 });
  }

  // Authorize: public rooms are open to any signed-in user; AI/private rooms
  // require membership (or ownership). Prevents posting to someone else's room.
  const room = await findChatRoomById(roomId).catch(() => null);
  if (!room) {
    return new Response("Room not found", { status: 404 });
  }
  if (
    room.type !== "public" &&
    room.createdBy !== auth.id &&
    !room.members.includes(auth.id)
  ) {
    return new Response("Forbidden", { status: 403 });
  }

  // Enforce per-user daily AI quota / admin disable before doing any work. This
  // is the only gate that consumes the quota, so a blocked request costs
  // nothing. Admins are exempt from the limit entirely.
  if (auth.role !== "admin") {
    const quota = await consumeAiQuota(auth.id);
    if (!quota.allowed) {
      const error =
        quota.reason === "disabled"
          ? "관리자가 AI 채팅을 비활성화했습니다."
          : `오늘 AI 채팅 사용 한도(${quota.limit}회)에 도달했습니다. 내일 다시 시도해주세요.`;
      return NextResponse.json(
        { error, reason: quota.reason, used: quota.used, limit: quota.limit },
        { status: 403 }
      );
    }
  }

  const userCreatedAt = new Date();
  const insertedUser = await createChatMessage({
    roomId,
    userId: auth.id,
    userName: auth.name,
    message,
    createdAt: userCreatedAt,
  });

  await pusherServer.trigger(`chat-${roomId}`, "new-message", {
    id: insertedUser.insertedId.toString(),
    userId: auth.id,
    userName: auth.name,
    message,
    createdAt: userCreatedAt.toISOString(),
  });

  // 1) Exact-match cache: a normalized-identical question that was answered
  //    before is served straight from MongoDB — no model call, no token cost.
  const cached = await getCachedAnswer(roomId, message);
  if (cached) {
    await persistAiReply(roomId, cached);
    return new Response(textToStream(cached), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-AI-Cache": "exact",
      },
    });
  }

  // 2) Semantic cache: embed the question and reuse a previously-answered,
  //    sufficiently-similar question's answer via Atlas Vector Search. The
  //    embedding is reused below when storing a fresh answer, so it's computed
  //    at most once per request. Embedding failures fall through to the model.
  const embedding = await embedQuestion(message);
  if (embedding) {
    const similar = await findSimilarAnswer(roomId, embedding);
    if (similar) {
      await persistAiReply(roomId, similar);
      return new Response(textToStream(similar), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-AI-Cache": "semantic",
        },
      });
    }
  }

  const history = await getMessagesByRoom(roomId, 50);
  const messages = history
    // Anthropic rejects empty text blocks, so drop any blank messages
    // (e.g. an AI reply persisted from a previously failed stream).
    .filter((m) => m.message.trim().length > 0)
    .map(
      (m): ModelMessage =>
        m.userId === "ai"
          ? { role: "assistant", content: m.message }
          : { role: "user", content: `${m.userName}: ${m.message}` }
    );

  // 2) Anthropic prompt caching: mark the conversation prefix (everything up
  //    to the latest turn) as cacheable. On Sonnet 4.6 the cache only kicks in
  //    once the prefix exceeds ~2048 tokens, so this pays off as history grows;
  //    cache reads cost ~10% of normal input tokens.
  if (messages.length > 1) {
    messages[messages.length - 2].providerOptions = {
      anthropic: { cacheControl: { type: "ephemeral" } },
    };
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system:
      "당신은 YIP 코딩 교육 플랫폼의 AI 도우미입니다. 한국어로 대답하세요. 프로그래밍 질문에 친절하게 답변해주세요.",
    messages,
  });

  let fullResponse = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const textStream = result.textStream;
        for await (const chunk of textStream) {
          fullResponse += chunk;
          controller.enqueue(new TextEncoder().encode(chunk));
        }
      } catch (err) {
        console.error("AI stream error:", err);
        if (!fullResponse) {
          controller.enqueue(
            new TextEncoder().encode("AI 응답을 가져오지 못했습니다. 다시 시도해주세요.")
          );
        }
      }

      // Persist/broadcast the reply, and store it in the exact-match cache so
      // the next identical question is served without a model call.
      if (fullResponse.trim()) {
        await persistAiReply(roomId, fullResponse);
        await setCachedAnswer(roomId, message, fullResponse, embedding);
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-AI-Cache": "miss",
    },
  });
}
