"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md) — 코드 기호와 번호로만 강조한다.
const slides: Slide[] = [
	{
		title: "",
		bg: "from-purple-50 to-pink-50",
		script:
			"안녕하세요, 여러분. 지난 시간에 배운 리스트 기억나시죠. 오늘 배울 튜플은 리스트와 아주 비슷하지만, 한 번 만들면 값을 바꿀 수 없다는 점이 다릅니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-purple-500">
					(a, b, c)
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					튜플 tuple
				</h1>
				<p className="text-2xl text-gray-500 mt-2">봉인한 택배 상자</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, 소괄호로 튜플을 만들고 리스트와 무엇이 다른지 설명할 수 있어야 합니다. 둘째, 번호와 슬라이싱으로 값을 읽을 수 있어야 합니다. 셋째, 언패킹으로 값을 여러 변수에 나눠 담을 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "소괄호로 튜플을 만들고 리스트와 구분할 수 있다" },
					{ num: "2", text: "번호와 슬라이싱으로 값을 읽을 수 있다" },
					{ num: "3", text: "언패킹으로 여러 변수에 나눠 담을 수 있다" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
					>
						<span className="bg-purple-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
							{item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "리스트와 무엇이 다른가",
		bg: "from-cyan-50 to-blue-50",
		script:
			"리스트는 대괄호로 만들고 나중에 값을 바꿀 수 있습니다. 튜플은 소괄호로 만들고 한 번 만들면 바꿀 수 없습니다. 장바구니와 봉인한 택배 상자의 차이라고 생각하면 됩니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">리스트 [ ]</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>대괄호로 만든다</li>
						<li>값을 바꿀 수 있다</li>
						<li>장바구니</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">튜플 ( )</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>소괄호로 만든다</li>
						<li>한 번 만들면 못 바꾼다</li>
						<li>봉인한 택배 상자</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "못 바꾸는 게 왜 좋은가",
		bg: "from-green-50 to-emerald-50",
		script:
			"바뀌면 안 되는 값을 담을 때 안전하기 때문입니다. 생년월일이나 좌표처럼 도중에 실수로 바뀌면 곤란한 값은 튜플에 담아두면 파이썬이 대신 지켜줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`student = ("Alice", 15, 95.5)
student[0] = "Bob"   # 에러! 바꿀 수 없다`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						실수로 바뀌면 곤란한 값 → 튜플에 담아 지킨다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "읽기는 리스트와 똑같다",
		bg: "from-teal-50 to-cyan-50",
		script:
			"읽는 방법은 리스트와 완전히 같습니다. 번호는 0부터, 음수는 뒤에서부터, 슬라이싱도 그대로 됩니다. 더하기와 곱하기, 길이 구하기도 똑같습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`movie = ("인터스텔라", 2014, "SF")
movie[0]    # 인터스텔라
movie[-1]   # SF
movie[0:2]  # ('인터스텔라', 2014)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						안 되는 것: 값 바꾸기 · append · remove
					</p>
				</div>
			</div>
		),
	},
	{
		title: "언패킹 — 상자 풀기",
		bg: "from-violet-50 to-purple-50",
		script:
			"튜플의 진짜 매력은 언패킹입니다. 값을 한 번에 여러 변수로 나눠 담을 수 있습니다. 왼쪽 변수 개수와 값 개수가 똑같아야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`student = ("Alice", 15, 95.5)
name, age, score = student
print(name)   # Alice`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						변수 개수 ≠ 값 개수 이면 에러
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. 소괄호로 만들고, 못 바꾸고, 읽기는 리스트와 같고, 언패킹으로 나눠 담습니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "소괄호 ( ) 로 만든다", c: "bg-purple-50" },
					{ t: "한 번 만들면 값을 못 바꾼다", c: "bg-blue-50" },
					{ t: "읽기·슬라이싱·len 은 리스트와 동일", c: "bg-green-50" },
					{ t: "언패킹으로 여러 변수에 나눠 담기", c: "bg-amber-50" },
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
		bg: "from-purple-50 to-pink-50",
		script:
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 다뤄봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-purple-400">( )</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 튜플 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function TupleGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
