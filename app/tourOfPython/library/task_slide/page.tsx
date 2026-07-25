"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// 이모지 금지 구역(app/tourOfPython, CLAUDE.md) — 번호와 화살표로만 강조한다.
const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script:
			"안녕하세요, 여러분. 오늘은 미리 만들어진 도구들을 직접 꺼내 써보겠습니다. 네 가지 미션을 약 35분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					len() max()
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					내장함수 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">
					꺼내 쓰고, 바꿔 쓰고, 가져와 쓰기
				</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 35분</p>
			</div>
		),
	},
	{
		title: "미션 1: 개념 확인하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 객관식 네 문제로 개념을 확인합니다. 헷갈리는 문제가 있으면 개념 강의로 돌아가서 다시 봐도 좋습니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">
						문자열 길이 · max 의 결과 · range(5) 의 범위 · 라이브러리를 가져오는
						키워드
					</p>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						3번을 가장 많이 틀린다 — range(5) 는 0부터 4까지
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: input 과 int 로 계산기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 두 숫자를 입력받아 더하는 계산기를 만듭니다. input 이 준 값은 문자열이라 그대로 더하면 12와 3이 123이 되어 버립니다. 빈칸을 지우고 한 번 실행해서 직접 확인해 보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`a = ____(input("첫 번째 숫자: "))
b = ____(input("두 번째 숫자: "))

print(a + b)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: int → 안 바꾸면 12 + 3 이 123 이 된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: len, max, min 써보기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 숫자 리스트에서 가장 작은 값, 가장 큰 값, 개수를 구하고, 입력받은 이름이 몇 글자인지도 세어 봅니다. len 은 리스트의 개수와 문자열의 글자 수를 모두 알려 줍니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`numbers = [4, 8, 2, 9, 5]

print(____(numbers))   # 가장 작은 값
print(____(numbers))   # 가장 큰 값
print(____(numbers))   # 개수`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: min / max / len → 2, 9, 5
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: random 으로 주사위 만들기 (10~12분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 표준 라이브러리를 가져와서 진짜 주사위를 만듭니다. randint 는 range 와 달리 끝 숫자를 포함합니다. 그래서 1부터 6까지 나오게 하려면 randint 괄호 일 콤마 육 이라고 씁니다. 실행할 때마다 숫자가 달라지는지 확인하세요. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`____ random

def roll():
    return random.____(1, 6)

print(roll())`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: import / randint → randint 는 끝 숫자를 포함한다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 개념을 확인하고, 형을 바꿔 계산하고, len 과 max, min 을 쓰고, 라이브러리를 가져와 주사위를 만들었습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "개념 확인하기", color: "bg-rose-100" },
					{
						num: "2",
						text: "input 과 int 로 계산기 만들기",
						color: "bg-violet-100",
					},
					{ num: "3", text: "len, max, min 써보기", color: "bg-teal-100" },
					{
						num: "4",
						text: "random 으로 주사위 만들기",
						color: "bg-emerald-100",
					},
				].map((item) => (
					<div
						key={item.num}
						className={`${item.color} rounded-xl p-4 flex items-center gap-4`}
					>
						<span className="text-lg font-bold text-gray-500">
							미션 {item.num}
						</span>
						<p className="text-lg text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script:
			"오늘 실습을 마치겠습니다. 오늘 배운 random 은 다음 시간에 만들 숫자 맞추기 게임의 핵심 재료입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					[ ok ]
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">
					다음 시간: 숫자 맞추기 게임 만들기
				</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function LibraryTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
