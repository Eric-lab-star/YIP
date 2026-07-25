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
		script: "안녕하세요, 여러분. 오늘은 변수를 직접 다뤄보겠습니다. 네 가지 미션을 약 30분에 걸쳐 수행합니다. 오류를 일부러 만들어보는 미션도 있습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-lime-600">a = 2</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">변수 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">담고, 바꾸고, 구분하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 30분</p>
			</div>
		),
	},
	{
		title: "미션 1: 변수 만들고 계산하기 (7~8분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 두 값을 더해서 5를 만듭니다. 7분에서 8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`a = 2
b = 3
c = a ____ b
print(c)   # 5`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">빈칸: 더하기 기호</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 실행 순서 실험 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. a 를 바꾸는 줄의 위치만 옮겨서 결과가 5와 6으로 갈리는 것을 직접 확인합니다. 왜 그런지 옆 친구에게 설명할 수 있으면 완전히 이해한 것입니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`# 실험 1
c = a + b
a = 3
print(c)   # 5

# 실험 2 — a = 3 을 위로
a = 3
c = a + b
print(c)   # 6`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">결과가 갈리는 이유를 말로 설명해볼 것</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 이름 규칙 확인 (7~8분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 다섯 줄을 직접 써보고 어느 줄에서 오류가 나는지 확인합니다. 세 개가 오류입니다. 규칙에 맞게 고쳐도 봅시다. 7분에서 8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`my age = 30
my_age = 30
10_age = 20
age_10 = 10
@age_10 = 10`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">오류는 세 줄 — 고쳐서 다시 써볼 것</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: 문자열과 불리언 (8~10분)",
		bg: "from-emerald-50 to-green-50",
		script: "네 번째 미션입니다. 따옴표가 있느냐 없느냐로 완전히 달라집니다. year 더하기 년 이 왜 계산이 아니라 이어붙이기가 되는지 생각해보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`food = ____      # apple
year = "2026"
dead = ____      # 거짓

print(year + "년")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">빈칸: 따옴표로 감싼 apple / False</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 네 가지 미션을 모두 수행했습니다. 변수를 만들고, 실행 순서를 실험하고, 이름 규칙을 확인하고, 문자열과 불리언을 구분했습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "변수 만들고 계산하기", color: "bg-rose-100" },
					{ num: "2", text: "실행 순서 실험하기", color: "bg-violet-100" },
					{ num: "3", text: "이름 규칙 확인하기", color: "bg-teal-100" },
					{ num: "4", text: "문자열과 불리언 구분", color: "bg-emerald-100" },
				].map((item) => (
					<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
						<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
						<p className="text-lg text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "",
		bg: "from-lime-50 to-green-50",
		script: "오늘 실습을 마치겠습니다. 5와 6이 갈리는 이유를 설명할 수 있다면 오늘은 대성공입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-slate-400">a = 2</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 파이썬 함수</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function VariableTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
