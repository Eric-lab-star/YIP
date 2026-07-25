"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-lime-50 to-green-50",
		script: "안녕하세요, 여러분. 오늘은 변수를 배웁니다. 변수는 데이터를 저장해두는 이름표입니다. 그리고 자주 쓰는 두 자료형인 문자열과 불리언도 함께 익히겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-lime-600">a = 2</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">변수, 문자열, 불리안</h1>
				<p className="text-2xl text-gray-500 mt-2">값을 담는 이름표</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-lime-50 to-green-50",
		script: "오늘의 학습 목표입니다. 첫째, 변수를 만들고 코드가 위에서 아래로 실행된다는 것을 알아야 합니다. 둘째, snake_case 규칙에 맞게 이름을 지을 수 있어야 합니다. 셋째, 문자열은 따옴표로 감싸야 한다는 것을 알고 불리언을 쓸 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "변수를 만들고 실행 순서를 이해한다" },
					{ num: "2", text: "snake_case 로 이름을 지을 수 있다" },
					{ num: "3", text: "문자열과 불리언을 구분해 쓸 수 있다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-lime-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "코드는 위에서 아래로",
		bg: "from-lime-50 to-green-50",
		script: "파이썬은 위에서 아래로 실행합니다. c 는 계산되는 그 순간의 a 와 b 값으로 정해지고, 그 뒤에 a 가 바뀌어도 되돌아가지 않습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`a = 2
b = 3
c = a + b   # 여기서 c 는 5
a = 3       # a 를 바꿔도
print(c)    # c 는 그대로 5`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">a = 3 을 위로 옮기면 6이 된다 — 직접 확인</p>
				</div>
			</div>
		),
	},
	{
		title: "변수 이름 규칙",
		bg: "from-lime-50 to-green-50",
		script: "이름에 공백은 넣을 수 없습니다. 대신 밑줄을 씁니다. 숫자로 시작할 수 없고 특수문자도 안 됩니다. 밑줄로 잇는 방식을 snake_case 라고 부르며 파이썬 개발자들의 약속입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`my age = 30    # 불가능 — 공백
my_age = 30    # 가능
10_age = 20    # 불가능 — 숫자로 시작
age_10 = 10    # 가능
@age_10 = 10   # 불가능 — 특수문자`}</CodeBlock>
			</div>
		),
	},
	{
		title: "문자열 — 따옴표가 핵심",
		bg: "from-lime-50 to-green-50",
		script: "따옴표 없이 쓰면 파이썬이 변수 이름으로 착각해서 NameError 가 납니다. 오류 메시지는 개발자를 도와주는 도구입니다. 겁먹지 말고 읽어봅시다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`food = apple     # NameError!
food = "apple"   # 따옴표로 감싸면 문자열`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">오류 메시지는 친절한 안내문</p>
				</div>
			</div>
		),
	},
	{
		title: "불리언 — 참과 거짓",
		bg: "from-lime-50 to-green-50",
		script: "불리언은 참 혹은 거짓 두 가지뿐인 값입니다. 주의할 점은 두 가지입니다. 첫 글자는 반드시 대문자, 그리고 따옴표로 감싸면 문자열이 되어버립니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "dead = False — 올바른 불리언", c: "bg-green-50" },
					{ t: "dead = false — 오류, 대문자여야 함", c: "bg-rose-50" },
					{ t: "dead = &quot;False&quot; — 불리언이 아니라 문자열", c: "bg-amber-50" },
				].map((item) => (
					<div key={item.t} className={`${item.c} rounded-xl p-4`}>
						<p className="text-lg text-gray-700">{item.t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "",
		bg: "from-lime-50 to-green-50",
		script: "오늘 강의를 마치겠습니다. 앞으로 쓸 모든 코드의 기초가 되는 것들입니다. 실습 페이지에서 직접 만들어봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-slate-400">a = 2</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 변수 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function VariableGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
