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
			"안녕하세요, 여러분. 그림을 그리려는데 연필부터 직접 만들어야 한다면 어떨까요? 나무를 깎고 흑연을 넣고, 상상만 해도 끔찍합니다. 연필은 이미 만들어진 것을 사서 쓰고 그림에만 집중하는 편이 훨씬 현명합니다. 오늘 배울 내장함수가 바로 그 잘 만들어진 연필입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					len() max()
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					내장함수와 표준 라이브러리
				</h1>
				<p className="text-2xl text-gray-500 mt-2">미리 만들어진 도구 꺼내 쓰기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, input 과 int, float 로 사용자 입력을 원하는 자료형으로 바꿀 수 있어야 합니다. 둘째, len, range, max, min 을 상황에 맞게 골라 쓸 수 있어야 합니다. 셋째, import 로 표준 라이브러리를 가져와 그 안의 함수를 쓸 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "input, int, float 로 입력을 받고 형을 바꾼다" },
					{ num: "2", text: "len, range, max, min 을 골라 쓸 수 있다" },
					{ num: "3", text: "import 로 표준 라이브러리를 가져와 쓴다" },
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
		title: "내장함수란 무엇인가",
		bg: "from-green-50 to-emerald-50",
		script:
			"내장함수는 파이썬을 설치할 때 함께 설치되는, 미리 만들어진 함수들입니다. 잘 만들어진 바퀴나 연필 같은 것이라고 생각하면 됩니다. 우리가 할 일은 그것을 가져다 쓰는 것뿐입니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">직접 만들면</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>연필부터 깎아야 한다</li>
						<li>정작 그림 그릴 시간이 없다</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">내장함수를 쓰면</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>이미 만들어진 것을 가져다 쓴다</li>
						<li>내가 만들 것에만 집중한다</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "input — 저장되는 값은 언제나 문자열",
		bg: "from-cyan-50 to-blue-50",
		script:
			"지금까지 계속 써 온 input 이 대표적인 내장함수입니다. 괄호 안의 글자는 입력 안내 문구입니다. 여기서 꼭 기억할 것은 세 가지입니다. 안내 문구는 입력값이 아니고, 엔터를 눌러도 줄바꿈 기호는 저장되지 않으며, 저장되는 값은 언제나 문자열이라는 점입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`name = input("what is your name ")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						1. 괄호 안은 안내 문구 2. 줄바꿈은 저장 안 됨 3. 값은 항상 문자열
					</p>
				</div>
			</div>
		),
	},
	{
		title: "int, float — 형을 바꿔야 계산된다",
		bg: "from-purple-50 to-pink-50",
		script:
			"int 는 문자열 12를 정수 12로, float 은 문자열 3.14를 실수 3.14로 바꿔 줍니다. 형을 바꾸지 않으면 올바른 계산을 할 수 없습니다. 문자열 12 더하기 문자열 3은 15가 아니라 123이 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = int("12")
pi = float("3.14")

"12" + "3"           # "123"  글자 이어붙이기
int("12") + int("3") # 15     제대로 계산`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						input 으로 받은 값은 반드시 형을 바꾸고 계산한다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "len, range, max, min",
		bg: "from-teal-50 to-cyan-50",
		script:
			"len 은 문자열의 길이나 리스트의 개수를 알려줍니다. range 는 for 반복문에서 숫자 범위를 만들어 주며, 끝 숫자는 포함하지 않습니다. max 는 가장 큰 값을, min 은 가장 작은 값을 찾아 줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`len("hello")       # 5
range(5)           # 0 1 2 3 4
max(3, 10, 7)      # 10
min(5, 2, 9)       # 2`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						range 의 끝 숫자는 포함하지 않는다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "표준 라이브러리 — import 로 꺼내 쓴다",
		bg: "from-indigo-50 to-violet-50",
		script:
			"표준 라이브러리도 파이썬을 설치할 때 함께 깔립니다. 다만 종류가 너무 많아서 필요한 것만 골라 꺼내 쓰도록 되어 있습니다. 도서관에서 읽고 싶은 책만 뽑아오는 것과 같습니다. 맨 위에서 import 로 가져오고, 이름 뒤에 점을 찍어 안의 함수를 씁니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`import random

def get_rnd():
    return random.randint(0, 10)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						1. import 로 가져온다 → 2. 이름 뒤에 점을 찍고 함수를 쓴다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. 내장함수는 미리 만들어진 함수이고, input 이 준 값은 언제나 문자열이라 int 나 float 으로 바꿔야 합니다. len, range, max, min 을 상황에 맞게 쓰고, 표준 라이브러리는 import 로 가져옵니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "내장함수 — 설치할 때 함께 오는 도구", c: "bg-green-50" },
					{ t: "input 의 결과는 항상 문자열 → int / float", c: "bg-blue-50" },
					{ t: "len / range / max / min", c: "bg-purple-50" },
					{ t: "import 라이브러리 → 라이브러리.함수()", c: "bg-amber-50" },
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
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 꺼내 써 봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					import
				</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 내장함수 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function LibraryGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
