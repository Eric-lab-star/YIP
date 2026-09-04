import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { validateToken } from "@/app/lib/auth/login";
import { getWorksheet, saveWorksheetFields } from "@/app/lib/mongo/worksheets";
import { consumeAiQuota, refundAiQuota } from "@/app/lib/mongo/aiUsage";
import {
	FINAL_PROJECT_PAGE_ID,
	GENERATED_PROMPT_FIELD_ID,
	promptSourceFields,
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

/**
 * 학생이 쓴 그대로 이어 붙인 프롬프트.
 *
 * AI 합성이 실패해도 학생은 쓸 게 있어야 한다 — 이 저장소의 다른 기능들처럼
 * 서비스가 죽으면 조용히 한 단계 낮은 결과로 내려간다. 이 결과도 그 자체로
 * 멀쩡한 프롬프트이고, 다만 학생 문장을 다듬지 않을 뿐이다.
 */
function assemble(v: Record<string, string>): string {
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
		v["1b-context"] || "",
		"",
		"내가 배운 기술은 아래가 전부야. 이 목록 밖의 기술은 추천하지 마.",
		LEARNED.map((t) => `- ${t}`).join("\n"),
		재료 && `\n내 재료:\n${재료}`,
		"",
		`[지시] ${v["1b-instruction"] || ""}`,
		"",
		`[형식] ${v["1b-format"] || ""}`,
	]
		.filter((line) => line !== null && line !== undefined)
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

const SYSTEM = `너는 프롬프트를 다듬어 주는 조수다. 한국 중고등학생이 AI 앱 아이디어를 얻으려고 쓴 메모를 받아서, 구글 제미나이에게 그대로 보낼 수 있는 프롬프트 하나로 만들어라.

지켜야 할 것:
- 학생이 쓴 내용과 의도를 바꾸지 마라. 없는 조건을 새로 만들지 마라.
- 비어 있거나 대충 쓴 칸은 지어내서 채우지 말고, 자연스럽게 빼거나 학생이 쓴 만큼만 반영해라.
- [역할] [맥락] [지시] [형식] 네 구획을 그대로 유지해라. 학생이 이 네 가지를 배우는 중이다.
- 맥락에는 "배운 기술 목록 밖의 기술은 추천하지 마"라는 제약을 반드시 포함해라.
- 존댓말/반말은 학생이 쓴 말투를 따라라.
- 설명, 머리말, 코드펜스를 붙이지 마라. 프롬프트 본문만 출력해라.`;

export async function POST() {
	const auth = await validateToken();
	if (!auth.success) {
		return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
	}

	const answers = await getWorksheet(auth.id, FINAL_PROJECT_PAGE_ID);
	const fields = promptSourceFields();
	const filled = fields.filter((f) => (answers[f.id] ?? "").trim() !== "");

	// 네 요소가 하나도 없으면 합성할 게 없다. AI 를 부르기 전에 막는다.
	const core = ["1b-role", "1b-context", "1b-instruction", "1b-format"];
	if (!core.some((id) => (answers[id] ?? "").trim() !== "")) {
		return Response.json(
			{ error: "1-B의 역할·맥락·지시·형식 중 최소 한 칸은 먼저 채워 주세요." },
			{ status: 400 }
		);
	}

	const fallback = assemble(answers);

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

	const memo = filled
		.map((f) => `${f.label}\n${answers[f.id].trim()}`)
		.join("\n\n");

	try {
		const { text } = await generateText({
			model: anthropic("claude-sonnet-4-6"),
			system: SYSTEM,
			prompt: `학생이 쓴 메모다.\n\n${memo}\n\n학생이 배운 기술 목록:\n${LEARNED.map(
				(t) => `- ${t}`
			).join("\n")}`,
		});
		const prompt = text.trim();
		if (!prompt) throw new Error("empty");

		// 만든 프롬프트도 활동지에 저장한다 — 다시 들어와도 남아 있게.
		await saveWorksheetFields(auth.id, auth.name, FINAL_PROJECT_PAGE_ID, {
			[GENERATED_PROMPT_FIELD_ID]: prompt,
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
