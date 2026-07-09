import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type ModelMessage } from "ai";
import { validateToken } from "@/app/lib/auth/login";
import { consumeAiQuota, ensureAiUsageIndex } from "@/app/lib/mongo/aiUsage";

// Upper bounds on client-controlled input so a single request can't inflate
// token spend without limit.
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 8000;

// 에디터 옆 AI 글쓰기 도우미용 스트리밍 채팅 엔드포인트.
// 채팅방(Pusher/DB 저장)에 묶이지 않는 가벼운 대화이며, 현재 작성 중인
// 글 내용을 문맥으로 함께 받아 글쓰기를 이어서 돕는다.
export async function POST(req: Request) {
  const auth = await validateToken();
  if (!auth.success) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages, document } = (await req.json()) as {
    messages?: { role: "user" | "assistant"; content: string }[];
    document?: string;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Missing messages", { status: 400 });
  }

  if (
    messages.length > MAX_MESSAGES ||
    messages.some((m) => (m?.content?.length ?? 0) > MAX_MESSAGE_LENGTH)
  ) {
    return new Response("Payload too large", { status: 413 });
  }

  // Count this request against the same per-user daily AI quota as the chat
  // room, and honour the admin kill-switch. Admins are exempt.
  if (auth.role !== "admin") {
    await ensureAiUsageIndex();
    const quota = await consumeAiQuota(auth.id);
    if (!quota.allowed) {
      const msg =
        quota.reason === "disabled"
          ? "AI 사용이 비활성화되어 있습니다."
          : "오늘의 AI 사용 한도를 모두 사용했습니다.";
      return new Response(msg, { status: 429 });
    }
  }

  // 토큰 비용을 줄이기 위해 현재 글 내용은 앞부분 일부만 문맥으로 쓴다.
  const docContext = (document ?? "").slice(0, 6000).trim();

  const modelMessages = messages
    // Anthropic은 빈 텍스트 블록을 거부하므로 빈 메시지는 제외한다.
    .filter((m) => m.content?.trim())
    .map((m): ModelMessage => ({ role: m.role, content: m.content }));

  if (modelMessages.length === 0) {
    return new Response("Missing messages", { status: 400 });
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: `당신은 에디터 옆 패널에서 사용자를 돕는 유능한 한국어 AI 어시스턴트입니다.
사용자는 글을 쓰면서 당신과 대화합니다. 글쓰기 지원은 물론, 폭넓은 주제의 질문에 답할 수 있습니다.

답변 범위:
- 프로그래밍·소프트웨어(코드 작성, 디버깅, 설명, 개념), 수학, 과학, 공학, 인문·사회, 예술 등 모든 학술 분야의 질문에 답하세요.
- 글쓰기 지원: 초안 작성, 개요 잡기, 문장 다듬기, 표현 제안, 요약, 번역, 자료 아이디어 등.
- 질문 주제를 임의로 좁히거나 "글쓰기 관련만 답한다"는 식으로 거절하지 마세요. 아는 범위에서 최선을 다해 도우세요.

규칙:
- 항상 한국어로 답하세요. (단, 코드·수식·전문 용어·고유명사는 원문 그대로 사용하세요.)
- 답변은 정확하고 명확하며 간결하게 작성하세요. 필요하면 단계별 설명이나 예시를 들어도 좋습니다.
- 코드는 언어를 명시한 코드블록으로 제시하세요.
- 사용자가 글에 바로 넣을 문장·문단을 요청하면, 설명이나 머리말 없이 본문 텍스트만 제시하세요.
- 확실하지 않은 내용은 추측이라고 밝히세요. 이모티콘은 사용하지 마세요.

${
  docContext
    ? `참고로 아래는 사용자가 현재 작성 중인 글의 내용입니다. 질문의 맥락으로 활용하되, 질문이 글과 무관하면 무시하세요.\n"""\n${docContext}\n"""`
    : "사용자는 아직 글을 작성하지 않았습니다."
}`,
    messages: modelMessages,
  });

  let full = "";
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.textStream) {
          full += chunk;
          controller.enqueue(new TextEncoder().encode(chunk));
        }
      } catch (err) {
        console.error("editor chat error:", err);
        if (!full) {
          controller.enqueue(
            new TextEncoder().encode(
              "AI 응답을 가져오지 못했습니다. 다시 시도해주세요.",
            ),
          );
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
