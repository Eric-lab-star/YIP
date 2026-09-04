import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { validateToken } from "@/app/lib/auth/login";
import { getWorksheet, saveWorksheetFields } from "@/app/lib/mongo/worksheets";
import { consumeAiQuota, refundAiQuota } from "@/app/lib/mongo/aiUsage";
import {
	FINAL_PROJECT_PAGE_ID,
	getRecipe,
	recipeFields,
	type PromptRecipe,
} from "@/utils/worksheets/finalProject";

/** 학생이 배운 기술 — 프롬프트에 울타리로 넣는다. 개념 페이지 4단계와 같은 목록. */
const LEARNED = [
	"제미나이 API로 텍스트 생성하기",
	"이미지 인식 / 이미지 생성",
	"Streamlit으로 웹 화면 만들기",
	"LangChain으로 도구 연결하기",
	"RAG(내가 가진 문서를 검색해서 답하기)",
	"텔레그램 봇으로 메시지 보내기",
];

const LEARNED_LINES = LEARNED.map((t) => `- ${t}`).join("\n");

/** 두 레시피가 공유하는 규칙. 학생 글을 고쳐 쓰지 않는 것이 핵심이다. */
const COMMON_RULES = `- 학생이 쓴 내용과 의도를 바꾸지 마라. 없는 조건을 새로 만들지 마라.
- 비어 있거나 대충 쓴 칸은 지어내서 채우지 말고, 자연스럽게 빼거나 학생이 쓴 만큼만 반영해라.
- 맥락에는 "배운 기술 목록 밖의 기술은 추천하지 마"라는 제약을 반드시 포함해라.
- 존댓말/반말은 학생이 쓴 말투를 따라라.
- 설명, 머리말, 코드펜스를 붙이지 마라. 프롬프트 본문만 출력해라.`;

const SYSTEM: Record<string, string> = {
	"1-B": `너는 프롬프트를 다듬어 주는 조수다. 학생이 AI 앱 아이디어를 얻으려고 쓴 메모를 받아서, 구글 제미나이에게 그대로 보낼 수 있는 프롬프트 하나로 만들어라.

${COMMON_RULES}
- [역할] [맥락] [지시] [형식] 네 구획을 그대로 유지해라. 학생이 이 네 가지를 배우는 중이다.`,

	"1-D": `너는 프롬프트를 다듬어 주는 조수다. 학생이 최종 프로젝트 주제로 좁혀 둔 후보 몇 개와 그것을 남긴 이유를 받는다. 그 후보들을 AI에게 **비교·평가**해 달라고 부탁하는 프롬프트 하나로 만들어라.

${COMMON_RULES}
- [역할] [맥락] [지시] [형식] 네 구획을 유지해라.
- 새 아이디어를 달라고 하는 프롬프트가 아니다. 학생이 이미 고른 후보를 저울질해 달라는 프롬프트다. 후보를 늘리거나 바꾸지 마라.
- [지시]에는 다음이 들어가야 한다: 각 후보에 필요한 기술, 주어진 시간 안에 끝낼 수 있는지의 판정과 이유, 각 후보에서 가장 막히기 쉬운 지점, 마지막에 추천 하나와 그 이유.
- [형식]은 표로 비교한 뒤 추천을 몇 줄로 적게 해라.`,
};

/**
 * 학생이 쓴 그대로 이어 붙인 프롬프트.
 *
 * AI 합성이 실패해도 학생은 쓸 게 있어야 한다 — 이 저장소의 다른 기능들처럼
 * 서비스가 죽으면 조용히 한 단계 낮은 결과로 내려간다. 이 결과도 그 자체로
 * 멀쩡한 프롬프트이고, 다만 학생 문장을 다듬지 않을 뿐이다.
 */
function assemble(recipeId: string, v: Record<string, string>): string {
	const 맥락 = [
		v["1b-context"] || "",
		"",
		"내가 배운 기술은 아래가 전부야. 이 목록 밖의 기술은 추천하지 마.",
		LEARNED_LINES,
	].join("\n");

	if (recipeId === "1-D") {
		const 후보 = (
			[
				["A", v["1c-a"], v["1c-a-why"]],
				["B", v["1c-b"], v["1c-b-why"]],
				["C", v["1c-c"], v["1c-c-why"]],
			] as const
		)
			.filter(([, name]) => (name ?? "").trim() !== "")
			.map(
				([k, name, why]) =>
					`- 후보 ${k}: ${name}${why?.trim() ? ` (내가 남긴 이유: ${why})` : ""}`
			)
			.join("\n");

		return [
			"[역할] 너는 코딩을 처음 배우는 사람을 오래 가르쳐 온 선생님이야.",
			"",
			"[맥락]",
			맥락,
			"",
			"아래 후보 중 하나를 골라 최종 프로젝트로 만들 거야.",
			후보,
			"",
			"[지시] 후보들을 비교해줘.",
			"- 각각 어떤 기술이 필요한지 알려줘.",
			'- 주어진 시간 안에 끝낼 수 있는지 "쉬움/보통/어려움"으로 판정하고 이유를 붙여줘.',
			"- 각각에서 내가 막힐 가능성이 가장 큰 지점을 하나씩 짚어줘.",
			"- 마지막에 네가 추천하는 하나와 그 이유를 알려줘.",
			"",
			"[형식] 먼저 표로 비교하고, 그 아래에 추천과 이유를 3줄로 써줘.",
		]
			.join("\n")
			.replace(/\n{3,}/g, "\n\n")
			.trim();
	}

	const 재료 = [
		v["1a-trouble"] && `- 내가 평소에 불편했던 일: ${v["1a-trouble"]}`,
		v["1a-interest"] && `- 내가 관심 있는 분야: ${v["1a-interest"]}`,
		v["1a-who"] && `- 도와주고 싶은 사람: ${v["1a-who"]}`,
	]
		.filter(Boolean)
		.join("\n");

	return [
		`[역할] ${v["1b-role"] || "너는 코딩을 처음 배우는 사람을 오래 가르쳐 온 선생님이야."}`,
		"",
		"[맥락]",
		맥락,
		재료 && `\n내 재료:\n${재료}`,
		"",
		`[지시] ${v["1b-instruction"] || ""}`,
		"",
		`[형식] ${v["1b-format"] || ""}`,
	]
		.filter(Boolean)
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

export async function POST(req: Request) {
	const auth = await validateToken();
	if (!auth.success) {
		return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
	}

	let recipe: PromptRecipe | undefined;
	try {
		const body = (await req.json()) as { recipe?: string };
		recipe = getRecipe(body?.recipe ?? "");
	} catch {
		recipe = undefined;
	}
	if (!recipe) {
		return Response.json({ error: "알 수 없는 프롬프트입니다." }, { status: 400 });
	}

	const answers = await getWorksheet(auth.id, FINAL_PROJECT_PAGE_ID);

	if (!recipe.requiredAnyOf.some((id) => (answers[id] ?? "").trim() !== "")) {
		return Response.json({ error: recipe.requiredMessage }, { status: 400 });
	}

	const fallback = assemble(recipe.id, answers);

	// 하루 AI 사용량은 채팅과 같은 통을 쓴다. 생성 버튼을 계속 눌러도
	// 학생 한 명이 무제한으로 모델을 부를 수 없다.
	const quota = await consumeAiQuota(auth.id);
	if (!quota.allowed) {
		return Response.json({
			prompt: fallback,
			source: "fallback",
			note:
				quota.reason === "limit"
					? "오늘 AI 사용량을 다 썼습니다. 아래는 쓴 내용을 그대로 이어 붙인 프롬프트입니다."
					: "AI 사용이 꺼져 있습니다. 아래는 쓴 내용을 그대로 이어 붙인 프롬프트입니다.",
		});
	}

	const memo = recipeFields(recipe)
		.filter((f) => (answers[f.id] ?? "").trim() !== "")
		.map((f) => `${f.label}\n${answers[f.id].trim()}`)
		.join("\n\n");

	try {
		const { text } = await generateText({
			model: anthropic("claude-sonnet-4-6"),
			system: SYSTEM[recipe.id],
			prompt: `학생이 쓴 메모다.\n\n${memo}\n\n학생이 배운 기술 목록:\n${LEARNED_LINES}`,
		});
		const prompt = text.trim();
		if (!prompt) throw new Error("empty");

		// 만든 프롬프트도 활동지에 저장한다 — 다시 들어와도 남아 있게.
		await saveWorksheetFields(auth.id, auth.name, FINAL_PROJECT_PAGE_ID, {
			[recipe.generatedFieldId]: prompt,
		});

		return Response.json({ prompt, source: "ai" });
	} catch {
		// 모델 호출이 실패했으면 쓴 만큼을 돌려주지 않는다 — 학생 잘못이 아니다.
		await refundAiQuota(auth.id);
		return Response.json({
			prompt: fallback,
			source: "fallback",
			note: "AI를 부르지 못했습니다. 아래는 쓴 내용을 그대로 이어 붙인 프롬프트입니다.",
		});
	}
}
