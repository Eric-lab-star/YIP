import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { validateToken } from "@/app/lib/auth/login";
import { findProblemBySlug } from "@/app/lib/mongo/problems";
import { getLanguage } from "@/app/lib/judge0/languages";
import { consumeHintRate } from "@/app/lib/mongo/judgeRateLimit";
import { hintSchema } from "@/app/lib/zod/judgeSchema";

// AI tutor hints for a problem. Two modes:
//   hint     — a progressive nudge that escalates with `level` (1→3) but never
//              hands over a full solution.
//   diagnose — explains why a failed submission is wrong (no fix handed over).
// This never runs user code, so it doesn't need Piston — only ANTHROPIC_API_KEY
// (always configured). The problem statement is fetched server-side; the client
// never supplies it, so a user can't rewrite the task to extract a free answer.

// The one non-negotiable: the model must not spit out a complete solution.
const SYSTEM = `당신은 코딩 교육 플랫폼의 AI 튜터입니다. 학생이 스스로 문제를 풀도록 돕는 것이 목표입니다.

반드시 지킬 규칙:
- 완전한 정답 코드를 절대 제공하지 마세요. 코드 조각이 필요하더라도 핵심 로직은 학생이 직접 채우도록 비워두세요.
- 정답을 그대로 알려주지 말고, 학생이 다음 단계를 스스로 떠올리도록 유도하세요.
- 중학생도 이해할 수 있도록 쉽고 친절한 한국어로 설명하세요.
- 짧고 간결하게 답하세요. 이모티콘은 사용하지 마세요.`;

// Per-level instruction for hint mode — each level reveals a little more, but
// none of them reveal working code.
const LEVEL_INSTRUCTIONS: Record<number, string> = {
	1: "접근 방향만 알려주세요. 어떤 개념이나 자료구조를 떠올려야 할지 한두 문장으로만 힌트를 주세요. 알고리즘 이름을 곧바로 말하기보다 생각할 방향을 제시하세요.",
	2: "핵심 아이디어를 알려주세요. 문제를 푸는 결정적 통찰이나 사용할 자료구조/알고리즘을 설명하되, 구현은 학생이 직접 하도록 남겨두세요.",
	3: "구현 순서를 단계별 의사코드(말로 설명하는 순서)로 안내하세요. 실제 완성 코드는 주지 말고, 각 단계에서 무엇을 해야 하는지 설명하세요.",
};

export async function POST(req: Request) {
	const auth = await validateToken();
	if (!auth.success) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// Rate-limit before the model call (admins exempt, like the chat quota).
	if (auth.role !== "admin") {
		const rate = await consumeHintRate(auth.id);
		if (!rate.allowed) {
			return NextResponse.json(
				{ error: "AI 힌트 요청이 너무 잦습니다. 잠시 후 다시 시도해주세요." },
				{ status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
			);
		}
	}

	const parsed = hintSchema.safeParse(await req.json().catch(() => null));
	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}
	const { problemSlug, language, code, mode, level, failure } = parsed.data;

	const lang = getLanguage(language);
	if (!lang) {
		return NextResponse.json({ error: "지원하지 않는 언어입니다." }, { status: 400 });
	}

	const problem = await findProblemBySlug(problemSlug);
	if (!problem) {
		return NextResponse.json({ error: "문제를 찾을 수 없습니다." }, { status: 404 });
	}

	// Only sample (non-hidden) cases may ever reach the model — hidden judging
	// cases stay secret so a hint can't leak them.
	const samples = problem.testcases
		.filter((t) => !t.hidden)
		.slice(0, 2)
		.map((t, i) => `예시 ${i + 1}\n입력:\n${t.stdin}\n기대 출력:\n${t.expectedOutput}`)
		.join("\n\n");

	const codeBlock = code.trim()
		? `학생의 현재 코드 (${lang.label}):\n\`\`\`\n${code}\n\`\`\``
		: "학생은 아직 코드를 작성하지 않았습니다.";

	const task =
		mode === "diagnose"
			? `학생의 제출이 틀렸습니다. 아래 실패 정보와 코드를 보고 무엇이 잘못됐는지 원인을 진단하세요. 정답 코드는 주지 말고, 어떤 부분을 어떻게 점검해야 할지 방향을 알려주세요.\n\n실패 정보:\n${failure ?? "(제출이 일부 테스트를 통과하지 못했습니다.)"}`
			: (LEVEL_INSTRUCTIONS[level] ?? LEVEL_INSTRUCTIONS[1]);

	const prompt = `문제: ${problem.title}

${problem.description}

${samples ? `${samples}\n\n` : ""}${codeBlock}

요청: ${task}`;

	const result = streamText({
		model: anthropic("claude-sonnet-4-6"),
		system: SYSTEM,
		prompt,
		// Hints are meant to be short; cap output to keep them terse and cheap.
		maxOutputTokens: 700,
	});

	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder();
			let wrote = false;
			try {
				for await (const chunk of result.textStream) {
					wrote = true;
					controller.enqueue(encoder.encode(chunk));
				}
			} catch (err) {
				console.error("AI hint stream error:", err);
				if (!wrote) {
					controller.enqueue(
						encoder.encode("AI 힌트를 가져오지 못했습니다. 다시 시도해주세요.")
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
