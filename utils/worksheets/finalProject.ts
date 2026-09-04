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
		// 6차시의 역할·맥락·지시·형식을 학생이 직접 쓴다. 완성된 프롬프트를
		// 주고 빈칸만 채우게 하면 네 요소를 "봤다" 로 끝나는데, 직접 쓰면
		// 그게 연습이 된다. 합치는 일은 아래 프롬프트 생성기가 맡는다.
		id: "1-B",
		title: "1-B · 프롬프트의 네 요소 직접 쓰기",
		fields: [
			{
				id: "1b-role",
				label: "역할 — AI를 누구라고 부를까냥?",
				hint: "예: 너는 코딩을 처음 배우는 사람을 오래 가르쳐 온 선생님이야",
				multiline: true,
				rows: 2,
			},
			{
				id: "1b-context",
				label: "맥락 — AI가 알아야 할 내 상황은?",
				hint: "내가 배운 기술, 쓸 수 있는 시간처럼 답이 달라지는 조건을 적자냥",
				multiline: true,
				rows: 4,
			},
			{
				id: "1b-instruction",
				label: "지시 — 무엇을 어떻게 해달라고 할까냥?",
				hint: "예: 아이디어를 10개 제안해줘 / 흔한 아이디어는 빼줘",
				multiline: true,
				rows: 3,
			},
			{
				id: "1b-format",
				label: "형식 — 어떤 모양으로 받고 싶냥?",
				hint: "예: 표로. 열은 [번호 | 앱 이름 | 한 줄 설명 | 필요한 기술]",
				multiline: true,
				rows: 2,
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
				// 답 세 개를 한 문장으로 압축하는 건 초안을 쓰는 것보다 어렵다 —
				// 요약은 상위 기술이다. 빈칸만 두면 여기서 막히므로 틀을 준다.
				// 2-B 가 위의 답변을 직접 읽으니, 이 줄이 거칠어도 뒤가 무너지지
				// 않는다는 점도 함께 알려서 부담을 덜어준다.
				id: "2a-final",
				label: "고쳐 쓴 한 줄 설명",
				hint: "틀에 끼워보자냥 — [누가] [무엇을 넣으면] [무엇을 받는] 앱. 답 세 개에서 중요한 낱말만 골라 넣으면 된다냥. 매끄럽지 않아도 괜찮다냥!",
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
		// AI 가 짝지어 준 것을 적어 둘 자리다. 이 칸이 없으면 2-E(위험 점검)와
		// 2-F(기획서)가 "무슨 기술을 쓰기로 했는지"를 알 수 없어서, 학생이
		// 채팅창을 다시 뒤져 옮겨 적어야 한다.
		id: "2-C",
		title: "2-C · 기능에 짝지은 기술 적어두기",
		fields: [
			{
				id: "2c-stack",
				label: "기능별로 쓰기로 한 기술",
				hint: "예: 목차 만들기 → 제미나이 API / 화면 → Streamlit. AI 답을 그대로 베끼지 말고 내가 정한 것만 적자냥",
				multiline: true,
				rows: 3,
			},
			{
				id: "2c-rejected",
				label: "AI가 추천했지만 쓰지 않기로 한 것 (있다면)",
				hint: "배운 목록에 없어서 뺐다면 그것도 적어두면 발표에서 쓸 수 있다냥",
				multiline: true,
				rows: 2,
			},
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
				hint: "2-C에서 정한 것을 옮겨 적자냥",
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
 * 프롬프트 생성 레시피.
 *
 * 학생이 활동지에 쓴 칸을 읽어 AI 에게 보낼 프롬프트 하나로 합친다. 어떤 칸을
 * 읽는지·무엇이 최소 조건인지·결과를 어디에 저장하는지를 한곳에 모아, 화면과
 * 서버가 같은 정의를 본다. 서버가 라벨까지 읽어야 학생이 무슨 뜻으로 쓴 칸인지
 * 알 수 있으므로 라벨도 여기서 나온다.
 *
 * 말투와 지시문(system)은 서버에만 둔다 — 화면이 알 필요가 없고, 바꿔 보낼
 * 여지도 남기지 않는다.
 */
export interface PromptRecipe {
	id: string;
	/**
	 * 만들어 내는 것의 성격.
	 *
	 * `prompt` 는 학생이 복사해서 AI 채팅에 붙여넣을 글이고, `document` 는
	 * 학생이 읽을 결과물 그 자체다(2-F 의 기획서 정리본). 화면의 말과 서버의
	 * 지시문이 둘 사이에서 완전히 달라지므로 타입으로 구분한다 — 기획서를
	 * "완성된 프롬프트"라고 부르면 학생은 그걸 채팅창에 붙여넣는다.
	 */
	kind: "prompt" | "document";
	/** 생성기 카드의 제목. */
	title: string;
	/** 카드 설명 한 줄. */
	description: string;
	/** 합칠 때 읽는 칸. 순서대로 모델에 실린다. */
	sourceFieldIds: string[];
	/** 이 중 하나도 안 차 있으면 AI 를 부르지 않는다. */
	requiredAnyOf: string[];
	/** 위 조건을 못 채웠을 때 학생에게 보여줄 말. */
	requiredMessage: string;
	/** 결과를 저장하는 칸. 다시 들어와도 만든 프롬프트가 남아 있게 한다. */
	generatedFieldId: string;
}

export const PROMPT_RECIPES: PromptRecipe[] = [
	{
		id: "1-B",
		kind: "prompt",
		title: "1-A와 1-B를 합쳐 프롬프트 만들기",
		description:
			"위에 쓴 재료(1-A)와 네 요소(1-B)를 읽어서, 제미나이가 알아듣기 좋은 프롬프트 하나로 만들어 준다냥. 마음에 안 들면 위를 고치고 다시 누르면 된다냥!",
		sourceFieldIds: [
			"1a-trouble",
			"1a-interest",
			"1a-who",
			"1b-role",
			"1b-context",
			"1b-instruction",
			"1b-format",
		],
		requiredAnyOf: ["1b-role", "1b-context", "1b-instruction", "1b-format"],
		requiredMessage: "1-B의 역할·맥락·지시·형식 중 최소 한 칸은 먼저 채워 주세요.",
		generatedFieldId: "1b-generated",
	},
	{
		id: "2-A",
		kind: "prompt",
		title: "내 한 줄 설명을 AI가 되묻게 하는 프롬프트 만들기",
		description:
			"위에 쓴 한 줄 설명을 읽어서, AI가 **답 대신 질문 3개**를 던지게 하는 프롬프트를 만들어 준다냥. 그 질문에 내가 답해야 내 기획서가 된다냥!",
		sourceFieldIds: ["2a-draft"],
		requiredAnyOf: ["2a-draft"],
		requiredMessage: "2-A에 한 줄 설명 초안을 먼저 적어 주세요.",
		generatedFieldId: "2a-generated",
	},
	{
		id: "2-B",
		kind: "prompt",
		title: "기능을 쪼개 달라고 하는 프롬프트 만들기",
		description:
			"2-A에서 다듬은 한 줄 설명과 **AI의 질문에 내가 답한 내용**까지 읽어서, 필요한 기능을 전부 꺼낸 뒤 필수/선택으로 나눠 달라는 프롬프트를 만들어 준다냥.",
		// 질문·답 여섯 칸이 여기 들어가는 이유가 있다. 2-A 의 요점은 한 줄
		// 설명이 말하지 않은 것을 질문으로 끄집어내는 것인데, 그 답을 다시 한
		// 줄로 압축하면 방금 건진 구체적인 내용이 떨어져 나간다. 한 줄만
		// 넘기면 학생이 2-A 에서 한 일이 기능 목록에 반영되지 않는다.
		sourceFieldIds: [
			"2a-final",
			"2a-draft",
			"2a-q1",
			"2a-a1",
			"2a-q2",
			"2a-a2",
			"2a-q3",
			"2a-a3",
			"1a-who",
			"1b-context",
		],
		requiredAnyOf: ["2a-final", "2a-draft"],
		requiredMessage: "2-A의 한 줄 설명을 먼저 적어 주세요.",
		generatedFieldId: "2b-generated",
	},
	{
		id: "2-C",
		kind: "prompt",
		title: "핵심 기능에 기술을 짝지어 달라는 프롬프트 만들기",
		description:
			"2-B에서 정한 핵심 기능을 읽어서, 배운 기술 안에서만 짝지어 달라는 프롬프트를 만들어 준다냥. 울타리는 자동으로 들어간다냥!",
		sourceFieldIds: ["2a-final", "2b-p1", "2b-p2", "2b-p3", "1b-context"],
		requiredAnyOf: ["2b-p1", "2b-p2", "2b-p3"],
		requiredMessage: "2-B에 핵심 기능을 먼저 적어 주세요.",
		generatedFieldId: "2c-generated",
	},
	{
		id: "2-E",
		kind: "prompt",
		title: "내 계획의 위험을 짚어 달라는 프롬프트 만들기",
		description:
			"지금까지 쓴 앱·기능·기술·상황을 읽어서, 어디서 넘어질지 미리 짚어 달라는 프롬프트를 만들어 준다냥.",
		sourceFieldIds: [
			"2a-final",
			"2b-p1",
			"2b-p2",
			"2b-p3",
			"2c-stack",
			"2d-input",
			"2d-process",
			"2d-output",
			"1b-context",
		],
		requiredAnyOf: ["2a-final", "2b-p1"],
		requiredMessage:
			"2-A의 한 줄 설명이나 2-B의 핵심 기능을 먼저 적어 주세요.",
		generatedFieldId: "2e-generated",
	},
	{
		id: "2-D",
		kind: "prompt",
		title: "내 화면 흐름을 검토해 달라는 프롬프트 만들기",
		description:
			"입력 → 처리 → 출력 세 칸을 읽어서, 빠진 단계가 없는지 AI에게 봐 달라는 프롬프트를 만들어 준다냥.",
		sourceFieldIds: [
			"2a-final",
			"2d-input",
			"2d-process",
			"2d-output",
			"2b-p1",
			"1b-context",
		],
		requiredAnyOf: ["2d-input", "2d-process", "2d-output"],
		requiredMessage: "2-D의 입력·처리·출력 중 최소 한 칸은 먼저 채워 주세요.",
		generatedFieldId: "2d-generated",
	},
	{
		// 유일한 document 레시피다. 여기서 나오는 건 채팅창에 붙여넣을 글이
		// 아니라, 학생이 1-A~2-E 에 흩어 쓴 것을 한자리에 모아 보여주는
		// 정리본이다. 새로 지어내지 않는 것이 이 레시피의 전부다.
		id: "2-F",
		kind: "document",
		title: "지금까지 쓴 것을 기획서 한 장으로 모으기",
		description:
			"1-A부터 2-E까지 쓴 내용을 기획서 모양으로 정리해 준다냥. **새로 지어내지 않고 내가 쓴 것만** 모은다냥 — 빠진 항목은 비었다고 알려주니, 그걸 보고 아래 칸을 내 말로 채우면 된다냥!",
		sourceFieldIds: [
			"1e-topic",
			"1e-reason",
			"2a-final",
			"1a-who",
			"2b-p1",
			"2b-p2",
			"2b-p3",
			"2b-dropped",
			"2b-dropped-why",
			"2c-stack",
			"2c-rejected",
			"2d-input",
			"2d-process",
			"2d-output",
			"2e-risk1",
			"2e-plan1",
			"2e-risk2",
			"2e-plan2",
			"2e-risk3",
			"2e-plan3",
			"1b-instruction",
		],
		requiredAnyOf: ["1e-topic", "2a-final", "2b-p1"],
		requiredMessage:
			"1-E의 주제나 2-A의 한 줄 설명, 2-B의 핵심 기능 중 하나는 먼저 적어 주세요.",
		generatedFieldId: "2f-generated",
	},
	{
		id: "1-D",
		kind: "prompt",
		title: "1-C의 후보 3개로 비교 프롬프트 만들기",
		description:
			"1-C에 남긴 후보와 이유를 읽어서, AI에게 셋을 저울질해 달라고 부탁하는 프롬프트를 만들어 준다냥. 1-B에 쓴 내 상황(맥락)도 같이 넣어준다냥!",
		sourceFieldIds: [
			"1c-a",
			"1c-a-why",
			"1c-b",
			"1c-b-why",
			"1c-c",
			"1c-c-why",
			"1b-context",
		],
		requiredAnyOf: ["1c-a", "1c-b", "1c-c"],
		requiredMessage: "1-C에 후보를 최소 하나는 먼저 적어 주세요.",
		generatedFieldId: "1d-generated",
	},
];

export function getRecipe(id: string): PromptRecipe | undefined {
	return PROMPT_RECIPES.find((r) => r.id === id);
}

/** 레시피가 읽는 칸들의 라벨. 서버 프롬프트에 그대로 실린다. */
export function recipeFields(recipe: PromptRecipe): WorksheetField[] {
	const all = FINAL_PROJECT_BLOCKS.flatMap((b) => b.fields);
	return recipe.sourceFieldIds.map(
		(id) => all.find((f) => f.id === id) ?? { id, label: id }
	);
}

export function getWorksheetBlock(id: string): WorksheetBlockDef | undefined {
	return FINAL_PROJECT_BLOCKS.find((b) => b.id === id);
}
