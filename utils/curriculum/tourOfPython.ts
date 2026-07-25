/**
 * Tour of Python 커리큘럼.
 *
 * AIDeveloper / PublicDataViz 와 같은 평면 `Lesson[]` 구조를 쓴다. 챕터 하나는
 * `goal`(개념) · `goal_slide` · `task`(실습) · `task_slide` 네 개 라우트로
 * 이루어지고, 사이드바 트리는 `utils/sideBarTree/tourOfPythonTree.ts` 에서
 * 이 배열로부터 기계적으로 만들어진다.
 *
 * 원래는 챕터마다 `page.mdx` 한 장이었고 사이드바에는 페이지 안 앵커까지 손으로
 * 나열돼 있었다. 그 32개 페이지를 개념/연습 짝을 기준으로 15챕터로 묶었고,
 * 옛 페이지들은 모두 제거했다 (git 이력에 남아 있다).
 */
export interface Lesson {
	/** Sidebar display name */
	name: string;
	/** Folder name under app/tourOfPython/ */
	slug: string;
	/** Short description shown in metadata */
	description: string;
	/**
	 * 아직 4종 구조를 갖추지 못한 챕터가 임시로 가리킬 페이지들. 지금은 쓰는
	 * 챕터가 없다 — 15챕터 전환이 모두 끝났기 때문이다. 새 챕터를 단계적으로
	 * 추가할 때 다시 쓸 수 있도록 남겨둔다. 채워두면 사이드바가 4종 링크 대신
	 * 이 페이지들을 보여주므로, 없는 라우트로 링크해 404가 나는 일을 막는다.
	 *
	 *   legacyPages: [{ name: "함수 연습하기", url: "/tourOfPython/functionExcercise" }]
	 */
	legacyPages?: { name: string; url: string }[];
}

export const tourOfPythonCurriculum: Lesson[] = [
	{
		name: "편집기",
		slug: "helloworld",
		description:
			"파이썬 코드를 어디에 쓰고 어떻게 실행하는지, 편집기 사용법부터 익혀보자냥!",
	},
	{
		name: "변수, 문자열, 불리언",
		slug: "variable_string_boolean",
		description:
			"값을 담아두는 변수와, 가장 많이 쓰는 자료형인 문자열·불리언을 익혀보자냥!",
	},
	{
		name: "파이썬 함수",
		slug: "functions",
		description:
			"반복되는 코드를 함수로 묶어서, 이름 하나로 불러 쓰는 법을 배워보자냥!",
	},
	{
		name: "input, type, int, try..except",
		slug: "input_type_int",
		description:
			"사용자에게 입력을 받고, 자료형을 확인하고, 잘못된 입력을 안전하게 넘겨보자냥!",
	},
	{
		name: "if, else, elif",
		slug: "if",
		description:
			"조건에 따라 다른 코드를 실행하는 if·else·elif를 익히고 직접 연습해보자냥!",
	},
	{
		name: "and, or, not",
		slug: "and_or_not",
		description:
			"조건 여러 개를 and·or·not으로 엮어서 더 똑똑한 판단을 만들어보자냥!",
	},
	{
		name: "강아지와 고양이 1",
		slug: "cat_or_dog",
		description:
			"배운 조건문으로, 질문에 답하면 반려동물을 추천해주는 CLI 앱을 만들어보자냥!",
	},
	{
		name: "강아지와 고양이 2",
		slug: "cat_or_dog2",
		description:
			"추천 앱을 더 다듬으면서, 코드를 정리하고 기능을 넓히는 법을 배워보자냥!",
	},
	{
		name: "반복문 loop",
		slug: "loop",
		description:
			"같은 일을 여러 번 시키는 for·while 반복문으로 코드를 짧게 만들어보자냥!",
	},
	{
		name: "파이썬 표준 라이브러리",
		slug: "library",
		description:
			"파이썬이 기본으로 주는 내장 함수와 표준 라이브러리를 꺼내 써보자냥!",
	},
	{
		name: "숫자 맞추기 게임 만들기",
		slug: "numberGuessingGame",
		description:
			"반복문과 조건문을 합쳐서, 정답을 맞힐 때까지 물어보는 게임을 만들어보자냥!",
	},
	{
		name: "리스트 list",
		slug: "list",
		description:
			"여러 값을 순서대로 담는 리스트를 익히고, 단계별 문제로 손에 붙여보자냥!",
	},
	{
		name: "튜플 tuple",
		slug: "tuple",
		description:
			"한 번 만들면 바뀌지 않는 튜플이 왜 필요한지 알아보고 직접 다뤄보자냥!",
	},
	{
		name: "딕셔너리 dictionary",
		slug: "dictionary",
		description:
			"이름표(키)로 값을 꺼내는 딕셔너리를 익히고, 단계별 문제로 연습해보자냥!",
	},
	{
		name: "Todo App 만들기",
		slug: "todo",
		description:
			"지금까지 배운 걸 모두 모아서, 할 일을 관리하는 To-Do 앱을 완성해보자냥!",
	},
];

/** Look up a lesson by slug. Useful in MDX metadata. */
export function getLesson(slug: string): Lesson | undefined {
	return tourOfPythonCurriculum.find((l) => l.slug === slug);
}
