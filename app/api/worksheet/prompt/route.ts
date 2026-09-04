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

/** 모든 레시피가 공유하는 규칙. 학생 글을 고쳐 쓰지 않는 것이 핵심이다. */
const COMMON_RULES = `- 학생이 쓴 내용과 의도를 바꾸지 마라. 없는 조건을 새로 만들지 마라.
- 비어 있거나 대충 쓴 칸은 지어내서 채우지 말고, 자연스럽게 빼거나 학생이 쓴 만큼만 반영해라.
- [역할] [맥락] [지시] [형식] 네 구획을 유지해라. 학생이 이 네 가지를 배우는 중이다.
- 맥락에는 "배운 기술 목록 밖의 기술은 추천하지 마"라는 제약을 반드시 포함해라.
- 존댓말/반말은 학생이 쓴 말투를 따라라.
- 설명, 머리말, 코드펜스를 붙이지 마라. 프롬프트 본문만 출력해라.`;

/**
 * 레시피마다 다른 부분.
 *
 * `extra` 는 모델에게 주는 추가 규칙이고, `instruction`/`format` 은 AI 호출이
 * 실패했을 때 쓰는 조립본의 문구다. 둘을 나란히 두는 이유는, 하나만 고치고
 * 다른 하나를 잊으면 AI 결과와 대체 결과가 서로 다른 걸 시키게 되기 때문이다.
 */
interface RecipeSpec {
	role: string;
	extra: string;
	instruction: string;
	format: string;
}

const SPECS: Record<string, RecipeSpec> = {
	"1-B": {
		role: "너는 코딩을 처음 배우는 사람을 오래 가르쳐 온 선생님이야.",
		extra: "- 학생이 [역할]과 [지시]와 [형식]을 직접 썼다면 그 뜻을 살려 다듬어라.",
		instruction: "",
		format: "",
	},
	"1-D": {
		role: "너는 코딩을 처음 배우는 사람을 오래 가르쳐 온 선생님이야.",
		extra: `- 새 아이디어를 달라고 하는 프롬프트가 아니다. 학생이 이미 고른 후보를 저울질해 달라는 프롬프트다. 후보를 늘리거나 바꾸지 마라.
- [지시]에는 다음이 들어가야 한다: 각 후보에 필요한 기술, 주어진 시간 안에 끝낼 수 있는지의 판정과 이유, 각 후보에서 가장 막히기 쉬운 지점, 마지막에 추천 하나와 그 이유.`,
		instruction: `후보들을 비교해줘.
- 각각 어떤 기술이 필요한지 알려줘.
- 주어진 시간 안에 끝낼 수 있는지 "쉬움/보통/어려움"으로 판정하고 이유를 붙여줘.
- 각각에서 내가 막힐 가능성이 가장 큰 지점을 하나씩 짚어줘.
- 마지막에 네가 추천하는 하나와 그 이유를 알려줘.`,
		format: "먼저 표로 비교하고, 그 아래에 추천과 이유를 3줄로 써줘.",
	},
	"2-A": {
		role: "너는 기획서를 꼼꼼히 검토하는 선생님이야.",
		extra: `- **답을 주는 프롬프트가 아니다.** AI가 학생 대신 설명을 고쳐 쓰지 말고, 애매한 곳을 되묻게 해라.
- [지시]에 "답을 대신 써주지는 마. 질문만 해줘"가 반드시 들어가야 한다.`,
		instruction: `이 설명만 봐서는 알 수 없는, 애매한 부분을 질문 3개로 되물어줘.
답을 대신 써주지는 마. 질문만 해줘.`,
		format: "번호를 붙인 질문 3개.",
	},
	"2-B": {
		role: "너는 코딩을 처음 배우는 사람을 가르치는 선생님이야.",
		extra:
			"- [지시]는 기능을 모두 꺼낸 뒤 '없으면 앱이 성립하지 않는 것'과 '있으면 더 좋은 것'으로 나누고, 각 기능에 난이도를 붙이게 해라.",
		instruction: `이 앱을 만들려면 필요한 기능을 모두 나열한 다음,
"없으면 앱이 아예 성립하지 않는 기능"과 "있으면 더 좋은 기능"으로 나눠줘.
그리고 각 기능마다 만드는 난이도를 쉬움/보통/어려움으로 알려줘.`,
		format: "두 개의 목록으로 나눠서, 각 줄 끝에 (난이도)를 괄호로 붙여줘.",
	},
	"2-C": {
		role: "너는 코딩을 처음 배우는 사람을 가르치는 선생님이야.",
		extra: `- 이 프롬프트의 핵심은 울타리다. [맥락]에 "이 목록 밖의 기술, 라이브러리, 서비스는 절대 추천하지 마. 목록 안에서 안 되면 안 된다고 솔직하게 말해줘"를 반드시 넣어라.
- [지시]는 각 핵심 기능에 기술을 짝지어 주고 고른 이유를 붙이게 해라.`,
		instruction: `각 핵심 기능에 어떤 기술을 쓰면 좋을지 짝지어주고,
그렇게 고른 이유를 한 줄씩 붙여줘.`,
		format: "표로. 열은 [기능 | 사용할 기술 | 고른 이유].",
	},
	"2-E": {
		role: "너는 코딩 프로젝트를 많이 지도해본 선생님이야.",
		extra:
			"- [지시]에 '겁주지 말고, 실제로 자주 일어나는 것만 말해줘'를 넣어라. 위험은 3가지로 제한하고 각각 대비책을 붙이게 해라.",
		instruction: `이 계획대로 갔을 때 주어진 시간 안에 못 끝낼 위험을 3가지 짚어주고,
각각에 대해 "미리 이렇게 준비하면 된다"는 대비책을 한 줄씩 알려줘.
겁주지 말고, 실제로 자주 일어나는 것만 말해줘.`,
		format: "표로. 열은 [예상되는 어려움 | 대비책].",
	},
};

function systemFor(recipe: PromptRecipe): string {
	const spec = SPECS[recipe.id];
	return `너는 프롬프트를 다듬어 주는 조수다. 학생이 활동지에 쓴 메모를 받아서, 구글 제미나이에게 그대로 보낼 수 있는 프롬프트 하나로 만들어라.

${COMMON_RULES}
${spec.extra}`;
}

/**
 * 학생이 쓴 그대로 이어 붙인 프롬프트.
 *
 * AI 합성이 실패해도 학생은 쓸 게 있어야 한다 — 이 저장소의 다른 기능들처럼
 * 서비스가 죽으면 조용히 한 단계 낮은 결과로 내려간다. 이 결과도 그 자체로
 * 멀쩡한 프롬프트이고, 다만 학생 문장을 다듬지 않을 뿐이다.
 *
 * 레시피마다 함수를 따로 두지 않는다 — 읽는 칸은 레시피가, 지시·형식 문구는
 * `SPECS` 가 이미 알고 있어서, 여기서는 그 둘을 네 구획에 끼우기만 하면 된다.
 */
function assemble(recipe: PromptRecipe, v: Record<string, string>): string {
	const spec = SPECS[recipe.id];

	// 1-B 는 네 구획을 학생이 직접 썼다. 그 글을 그대로 쓴다.
	const role = (recipe.id === "1-B" && v["1b-role"]?.trim()) || spec.role;
	const instruction =
		(recipe.id === "1-B" && v["1b-instruction"]?.trim()) || spec.instruction;
	const format = (recipe.id === "1-B" && v["1b-format"]?.trim()) || spec.format;

	// 맥락 = 학생이 쓴 상황 + 배운 기술 울타리 + 이 레시피가 읽는 칸들.
	const written = recipeFields(recipe)
		.filter(
			(f) =>
				(v[f.id] ?? "").trim() !== "" &&
				!["1b-role", "1b-instruction", "1b-format", "1b-context"].includes(f.id)
		)
		.map((f) => `- ${f.label}: ${v[f.id].trim()}`)
		.join("\n");

	return [
		`[역할] ${role}`,
		"",
		"[맥락]",
		v["1b-context"]?.trim() ?? "",
		"",
		"내가 배운 기술은 아래가 전부야. 이 목록 밖의 기술은 추천하지 마.",
		LEARNED_LINES,
		written && `\n${written}`,
		"",
		`[지시] ${instruction}`,
		"",
		`[형식] ${format}`,
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
	if (!recipe || !SPECS[recipe.id]) {
		return Response.json({ error: "알 수 없는 프롬프트입니다." }, { status: 400 });
	}

	const answers = await getWorksheet(auth.id, FINAL_PROJECT_PAGE_ID);

	if (!recipe.requiredAnyOf.some((id) => (answers[id] ?? "").trim() !== "")) {
		return Response.json({ error: recipe.requiredMessage }, { status: 400 });
	}

	const fallback = assemble(recipe, answers);

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
			system: systemFor(recipe),
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
