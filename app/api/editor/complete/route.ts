import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { validateToken } from "@/app/lib/auth/login";

// Copilot 스타일 인라인 자동완성: 커서 앞 문맥(before)과 뒤 문맥(after)을
// 받아 "이어서 쓸 짧은 텍스트"만 생성해 돌려준다. 새 응답을 만들어내는
// 챗봇과 달리, 글쓴이의 문장을 자연스럽게 이어가는 것이 목표다.
export async function POST(req: Request) {
  const auth = await validateToken();
  if (!auth.success) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { before, after } = (await req.json()) as {
    before?: string;
    after?: string;
  };

  // 앞 문맥이 너무 짧으면 제안하지 않는다 (노이즈 방지).
  if (!before || before.trim().length < 3) {
    return Response.json({ suggestion: "" });
  }

  // 토큰 비용을 줄이기 위해 문맥은 끝/앞부분 일부만 사용한다.
  const trimmedBefore = before.slice(-1500);
  const trimmedAfter = (after ?? "").slice(0, 500);

  try {
    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      maxOutputTokens: 60,
      temperature: 0.3,
      system: `당신은 글쓰기 자동완성 엔진입니다. 사용자가 작성 중인 한국어 글의 "다음에 이어질 내용"만 생성합니다.

규칙:
- 커서 위치(<CURSOR/>)에 자연스럽게 이어질 짧은 텍스트만 출력하세요.
- 앞 문장을 반복하지 말고, 이어질 부분만 출력하세요.
- 보통 한 문장 이내로 짧게 제안하세요.
- 설명, 따옴표, 코드블록, 머리말 없이 이어질 본문 텍스트만 출력하세요.
- 이미 문장이 자연스럽게 끝났다면 빈 문자열을 출력하세요.`,
      prompt: `${trimmedBefore}<CURSOR/>${trimmedAfter}`,
    });

    // 모델이 따옴표로 감싸는 경우 정리한다.
    const suggestion = text
      .replace(/^["'`]+|["'`]+$/g, "")
      .replace(/\n{3,}/g, "\n\n");

    return Response.json({ suggestion });
  } catch (err) {
    console.error("editor complete error:", err);
    return Response.json({ suggestion: "" }, { status: 200 });
  }
}
