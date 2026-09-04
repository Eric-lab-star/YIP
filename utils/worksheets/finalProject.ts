import type { WorksheetField } from "@/components/mdx/Worksheet";

/**
 * AIDeveloper 최종 프로젝트 활동지의 문항 정의.
 *
 * 레슨 페이지와 교사 화면이 **같은 배열을 읽는다.** 문항을 `.mdx` 안에 직접
 * 적으면 교사 화면은 필드 id 만 보게 되고("1c-a: 급식 봇"), 라벨을 맞추려면
 * 같은 목록을 두 벌 관리해야 한다. 한쪽만 고쳐지는 건 시간문제다.
 *
 * **필드 id 는 불변이다.** 학생 답안이 이 키로 저장돼 있어서, 바꾸면 이미 쓴
 * 답이 화면에서 사라진다(데이터는 남지만 아무도 못 본다). 문항 문구는
 * 얼마든지 고쳐도 되고, 필요 없어진 문항은 지우기보다 배열에서 빼는 편이
 * 안전하다.
 */

export const FINAL_PROJECT_PAGE_ID = "AIDeveloper/FinalProject_guide";

export interface WorksheetBlockDef {
	/** 레슨에서 부르는 이름. `<WorksheetBlock block="1-C" />` 의 그 값. */
	id: string;
	title: string;
	fields: WorksheetField[];
}

export const FINAL_PROJECT_BLOCKS: WorksheetBlockDef[] = [
	{
		id: "1-A",
		title: "1-A · AI에게 건넬 내 재료 3줄",
		fields: [
			{
				id: "1a-trouble",
				label: "재료 1 — 평소에 불편하거나 시간이 오래 걸리는 일",
				hint: "예: 매일 뭘 먹을지 고르는 데 시간을 너무 많이 쓴다",
				multiline: true,
				rows: 2,
			},
			{
				id: "1a-interest",
				label: "재료 2 — 내가 관심 있는 분야/주제",
				hint: "예: 요리, 게임, 반려동물, 축구, 그림",
			},
			{
				id: "1a-who",
				label: "재료 3 — 이 앱으로 도와주고 싶은 사람",
				hint: "예: 나 자신 / 우리 반 친구들 / 우리 가족 / 후배들",
			},
		],
	},
	{
		id: "1-C",
		title: "1-C · 필터를 통과한 후보 3개",
		fields: [
			{ id: "1c-a", label: "후보 A" },
			{ id: "1c-a-why", label: "후보 A를 남긴 이유" },
			{ id: "1c-b", label: "후보 B" },
			{ id: "1c-b-why", label: "후보 B를 남긴 이유" },
			{ id: "1c-c", label: "후보 C" },
			{ id: "1c-c-why", label: "후보 C를 남긴 이유" },
			{
				id: "1c-dropped",
				label: "지운 아이디어 중 하나",
				hint: "발표에서 \"왜 이걸 골랐냐\"는 질문의 답이 여기서 나온다냥",
			},
			{ id: "1c-dropped-why", label: "그것을 지운 이유", multiline: true, rows: 2 },
		],
	},
	{
		id: "1-E",
		title: "1-E · 결정 — 도장은 내가 찍기",
		fields: [
			{ id: "1e-topic", label: "내가 고른 주제" },
			{
				id: "1e-reason",
				label: "고른 이유 (한 문장으로, 내 말로)",
				multiline: true,
				rows: 2,
			},
			{
				id: "1e-ai-diff",
				label: "AI의 추천과 내 선택이 달랐냥? 달랐다면 왜 내 쪽을 택했냥?",
				multiline: true,
				rows: 2,
			},
			{ id: "1e-peer-good", label: "짝이 보기에 가장 흥미로운 점" },
			{ id: "1e-peer-worry", label: "짝이 걱정된다고 한 점" },
		],
	},
	{
		id: "2-A",
		title: "2-A · 한 줄 설명 초안",
		fields: [
			{
				id: "2a-draft",
				label: "한 줄 설명 초안",
				hint: "이 앱은 ______ 을(를) 위한 앱입니다",
				multiline: true,
				rows: 2,
			},
		],
	},
	{
		// AI 프롬프트를 사이에 두고 초안과 갈라진다 — 되묻기를 받기 전에는
		// 채울 수 없는 칸들이라 순서를 지킨다.
		id: "2-A-answers",
		title: "2-A · AI의 되묻기에 답하고 다시 쓰기",
		fields: [
			{ id: "2a-q1", label: "AI가 던진 질문 1" },
			{ id: "2a-a1", label: "내 대답 1", multiline: true, rows: 2 },
			{ id: "2a-q2", label: "AI가 던진 질문 2" },
			{ id: "2a-a2", label: "내 대답 2", multiline: true, rows: 2 },
			{ id: "2a-q3", label: "AI가 던진 질문 3" },
			{ id: "2a-a3", label: "내 대답 3", multiline: true, rows: 2 },
			{
				id: "2a-final",
				label: "고쳐 쓴 한 줄 설명",
				multiline: true,
				rows: 2,
			},
		],
	},
	{
		id: "2-B",
		title: "2-B · 핵심 기능 정하기",
		fields: [
			{ id: "2b-p1", label: "1순위 (대표 메뉴)" },
			{ id: "2b-p2", label: "2순위" },
			{ id: "2b-p3", label: "3순위" },
			{ id: "2b-dropped", label: "이번엔 포기한 기능" },
			{ id: "2b-dropped-why", label: "포기한 이유", multiline: true, rows: 2 },
		],
	},
	{
		id: "2-D",
		title: "2-D · 화면 흐름 — 입력 → 처리 → 출력",
		fields: [
			{
				id: "2d-input",
				label: "입력 — 사용자가 화면에서 무엇을 넣냥?",
				hint: "예: 오늘 기분을 한 문장으로 입력한다 / 사진 파일을 올린다",
				multiline: true,
				rows: 2,
			},
			{
				id: "2d-process",
				label: "처리 — 그걸 받아서 AI가 무슨 일을 하냥?",
				hint: "예: 프롬프트에 담아 제미나이에게 보내고 답을 받는다",
				multiline: true,
				rows: 2,
			},
			{
				id: "2d-output",
				label: "출력 — 사용자에게 무엇을 보여주냥?",
				hint: "예: 추천 메뉴 3개를 목록으로 보여준다",
				multiline: true,
				rows: 2,
			},
			{
				id: "2d-sketch",
				label: "화면 스케치 설명 (손으로 그렸다면 무엇을 그렸는지)",
				multiline: true,
				rows: 2,
			},
		],
	},
	{
		id: "2-E",
		title: "2-E · 예상되는 어려움과 대비책",
		fields: [
			{ id: "2e-risk1", label: "어려움 1" },
			{ id: "2e-plan1", label: "→ 대비책 1" },
			{ id: "2e-risk2", label: "어려움 2" },
			{ id: "2e-plan2", label: "→ 대비책 2" },
			{ id: "2e-risk3", label: "어려움 3" },
			{ id: "2e-plan3", label: "→ 대비책 3" },
		],
	},
	{
		id: "2-F",
		title: "2-F · 기획서 최종본 (내 말로 다시 쓰기)",
		fields: [
			{ id: "2f-name", label: "앱 이름" },
			{ id: "2f-oneliner", label: "한 줄 설명", multiline: true, rows: 2 },
			{ id: "2f-users", label: "주요 사용자" },
			{ id: "2f-feature1", label: "핵심 기능 1순위" },
			{ id: "2f-feature2", label: "핵심 기능 2순위" },
			{ id: "2f-feature3", label: "핵심 기능 3순위" },
			{
				id: "2f-stack",
				label: "사용할 기술 스택",
				hint: "제미나이 API / 이미지 인식·생성 / LangChain / RAG / Streamlit / 텔레그램 봇 중에서",
				multiline: true,
				rows: 2,
			},
			{
				id: "2f-flow",
				label: "화면 흐름 (입력 → 처리 → 출력)",
				multiline: true,
				rows: 2,
			},
			{
				id: "2f-risks",
				label: "예상되는 어려움과 대비책",
				multiline: true,
				rows: 3,
			},
			{
				id: "2f-ai-tool",
				label: "기획에 쓴 AI",
				hint: "19차시 윤리 — 숨기지 말고 솔직하게 적자냥",
			},
			{
				id: "2f-ai-tasks",
				label: "AI에게 시킨 일",
				hint: "예: 아이디어 발산, 기능 분류, 위험 점검",
				multiline: true,
				rows: 2,
			},
			{
				id: "2f-ai-rejected",
				label: "AI 의견 중 내가 따르지 않은 것과 그 이유",
				multiline: true,
				rows: 2,
			},
		],
	},
	{
		id: "M6",
		title: "미션 6 · 동료 피드백 시트",
		fields: [
			{ id: "m6-app", label: "평가한 앱 이름" },
			{ id: "m6-good", label: "좋았던 점", multiline: true, rows: 2 },
			{ id: "m6-improve", label: "더 좋아지면 좋을 점", multiline: true, rows: 2 },
			{ id: "m6-question", label: "궁금한 점 / 질문", multiline: true, rows: 2 },
			{
				id: "m6-apply",
				label: "내가 받은 피드백 중 반영하고 싶은 것",
				multiline: true,
				rows: 2,
			},
		],
	},
	{
		id: "M8",
		title: "미션 8 · 발표 구성 시트",
		fields: [
			{
				id: "m8-problem",
				label: "1. 어떤 문제를 해결하고 싶었나요? (30초)",
				multiline: true,
				rows: 2,
			},
			{
				id: "m8-how",
				label: "2. 어떻게 만들었나요? (사용한 기술, 1분)",
				multiline: true,
				rows: 2,
			},
			{ id: "m8-demo-input", label: "3. 시연에서 보여줄 입력값/예시" },
			{ id: "m8-demo-order", label: "3. 시연 순서", multiline: true, rows: 2 },
			{
				id: "m8-learned",
				label: "4. 배운 점 / 어려웠던 점 (1분)",
				multiline: true,
				rows: 2,
			},
			{ id: "m8-q", label: "예상 질문" },
			{ id: "m8-a", label: "그 답변", multiline: true, rows: 2 },
		],
	},
	{
		id: "RETRO",
		title: "회고 · 긴 여정 되돌아보기",
		fields: [
			{
				id: "retro-memorable",
				label: "가장 기억에 남는 수업은? 왜 그런가요?",
				multiline: true,
				rows: 3,
			},
			{
				id: "retro-best",
				label: "이번 프로젝트에서 가장 잘했다고 생각하는 부분은?",
				multiline: true,
				rows: 2,
			},
			{
				id: "retro-more",
				label: "더 시간이 있었다면 추가하고 싶은 기능은?",
				multiline: true,
				rows: 2,
			},
			{
				id: "retro-future",
				label: "앞으로 AI를 어떻게 활용해보고 싶나요?",
				multiline: true,
				rows: 2,
			},
			{
				id: "retro-message",
				label: "선생님/친구들에게 하고 싶은 말",
				multiline: true,
				rows: 2,
			},
		],
	},
];

/**
 * 빈칸을 그 자리에서 채우는 AI 프롬프트.
 *
 * 템플릿의 `{{필드id}}` 자리에 입력칸이 들어간다. 재료 세 칸은 **1-A 와 같은
 * 필드 id** 를 쓴다 — 학생이 같은 내용을 두 번 쓰지 않게 하려는 것이고, 1-A 를
 * 채우면 이 프롬프트에도 그대로 나타난다.
 */
export interface PromptDef {
	id: string;
	title: string;
	template: string;
	fields: WorksheetField[];
}

export const FINAL_PROJECT_PROMPTS: PromptDef[] = [
	{
		id: '1-B',
		title: '1-B · 발산 프롬프트 — 빈칸을 채우고 복사해서 AI에게 보내자냥',
		fields: [
			{ id: '1b-time', label: '쓸 수 있는 시간' },
			{ id: '1a-trouble', label: '평소에 불편했던 일' },
			{ id: '1a-interest', label: '관심 있는 분야' },
			{ id: '1a-who', label: '도와주고 싶은 사람' },
		],
		template: [
			'[역할] 너는 코딩을 처음 배우는 사람을 오래 가르쳐 온 선생님이야.',
			'',
			'[맥락] 나는 파이썬으로 아래 기술만 배웠어.',
			'- 제미나이 API로 텍스트 생성하기',
			'- 이미지 인식 / 이미지 생성',
			'- Streamlit으로 웹 화면 만들기',
			'- LangChain으로 도구 연결하기',
			'- RAG(내가 가진 문서를 검색해서 답하기)',
			'- 텔레그램 봇으로 메시지 보내기',
			'',
			'이 프로젝트에 쓸 수 있는 시간: {{1b-time}}',
			'',
			'내가 평소에 불편했던 일: {{1a-trouble}}',
			'내가 관심 있는 분야: {{1a-interest}}',
			'도와주고 싶은 사람: {{1a-who}}',
			'',
			'[지시] 위 재료를 조합해서 AI 앱 아이디어를 10개 제안해줘.',
			'- 10개 중 절반 이상은 내가 적은 "불편했던 일"을 해결하는 것으로 해줘.',
			'- 아주 흔한 아이디어(단순 번역기, 단순 계산기, 단순 챗봇)는 빼줘.',
			'- 위에 적은 기술 목록 밖의 기술이 필요한 아이디어는 제안하지 마.',
			'',
			'[형식] 표로 만들어줘. 열은 [번호 | 앱 이름 | 한 줄 설명 | 필요한 기술].',
		].join("\n"),
	},
];

export function getPrompt(id: string): PromptDef | undefined {
	return FINAL_PROJECT_PROMPTS.find((p) => p.id === id);
}

export function getWorksheetBlock(id: string): WorksheetBlockDef | undefined {
	return FINAL_PROJECT_BLOCKS.find((b) => b.id === id);
}
