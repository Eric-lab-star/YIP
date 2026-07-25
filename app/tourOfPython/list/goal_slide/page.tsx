"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역이라(CLAUDE.md) 슬라이드에도 이모지를
// 쓰지 않는다. 강조는 번호·화살표·박스 문자로만 한다.
const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script:
			"안녕하세요, 여러분. 지금까지는 숫자 하나, 글자 하나만 다뤘습니다. 오늘은 여러 값을 한 번에 담는 가방, 리스트를 배우겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					[a, b, c]
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					리스트 list
				</h1>
				<p className="text-2xl text-gray-500 mt-2">여러 값을 담는 가방</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, 대괄호로 리스트를 만들고 번호로 값을 꺼낼 수 있어야 합니다. 둘째, 슬라이싱으로 원하는 구간만 잘라낼 수 있어야 합니다. 셋째, append, sort, pop 같은 메소드를 골라 쓸 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "대괄호로 리스트를 만들고 번호로 꺼낼 수 있다" },
					{ num: "2", text: "슬라이싱으로 원하는 구간만 잘라낼 수 있다" },
					{ num: "3", text: "append, sort, pop 메소드를 골라 쓸 수 있다" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
					>
						<span className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
							{item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "왜 리스트가 필요한가",
		bg: "from-green-50 to-emerald-50",
		script:
			"홀수 다섯 개를 담으려고 변수를 다섯 개 만들면 값이 늘어날 때마다 변수도 늘어납니다. 리스트를 쓰면 가방 하나에 전부 담깁니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">변수 여러 개</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>a = 1, b = 3, c = 5 ...</li>
						<li>값이 늘면 변수도 늘어남</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">리스트 하나</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>numbers = [1, 3, 5, 7, 9]</li>
						<li>가방 하나에 전부</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "번호는 0부터",
		bg: "from-cyan-50 to-blue-50",
		script:
			"리스트의 값에는 번호가 붙습니다. 중요한 것은 0번부터 시작한다는 점입니다. 음수를 쓰면 뒤에서부터 셉니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`fruits = ["사과", "바나나", "딸기"]
print(fruits[0])   # 사과
print(fruits[-1])  # 딸기`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						사람은 1부터, 파이썬은 0부터 센다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "슬라이싱 — 끝은 포함하지 않는다",
		bg: "from-purple-50 to-pink-50",
		script:
			"리스트 대괄호 시작 콜론 끝으로 구간을 자릅니다. 여기서 끝 번호는 포함하지 않습니다. 시작이나 끝을 비우면 각각 처음부터, 끝까지라는 뜻입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`numbers = [1, 2, 3, 4, 5]
numbers[1:3]  # [2, 3]
numbers[:3]   # [1, 2, 3]
numbers[2:]   # [3, 4, 5]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						1:3 → 1번과 2번까지. 3번은 빠진다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "자주 쓰는 메소드",
		bg: "from-teal-50 to-cyan-50",
		script:
			"맨 끝에 추가할 때는 append, 원하는 자리에 끼워넣을 때는 insert, 값으로 지울 때는 remove를 씁니다. pop은 지우면서 그 값을 돌려줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`colors.append('purple')     # 맨 끝에 추가
colors.insert(1, 'green')   # 자리 지정 삽입
colors.remove('red')        # 값으로 지우기
last = colors.pop()         # 지우면서 돌려줌`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						pop 만 지운 값을 돌려준다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. 대괄호로 리스트를 만들고, 번호로 꺼내고, 슬라이싱으로 자르고, 메소드로 바꿉니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "대괄호로 리스트 만들기", c: "bg-green-50" },
					{ t: "번호로 꺼내기 (0부터, 음수는 뒤에서)", c: "bg-blue-50" },
					{ t: "슬라이싱 [시작:끝] — 끝은 제외", c: "bg-purple-50" },
					{ t: "append / insert / remove / pop", c: "bg-amber-50" },
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
		bg: "from-blue-50 to-indigo-50",
		script:
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 손으로 풀어봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">[ ]</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 리스트 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function ListGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
