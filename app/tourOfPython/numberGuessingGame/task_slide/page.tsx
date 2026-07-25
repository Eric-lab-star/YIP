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
			"안녕하세요, 여러분. 오늘은 숫자 맞히기 게임을 처음부터 끝까지 직접 만들겠습니다. 네 가지 미션을 약 40분에 걸쳐 수행합니다. 한 미션이 끝날 때마다 꼭 실행해 보시기 바랍니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					1 ~ 10
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					숫자 맞히기 게임 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">직접 만들어보기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 40분</p>
			</div>
		),
	},
	{
		title: "미션 1: 타이틀과 뼈대 만들기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. main 함수를 만들고 게임 제목을 출력합니다. 함수는 만들기만 해서는 실행되지 않습니다. 마지막 줄에서 반드시 호출해야 합니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`____ main():
    print("=====================")
    print("____")
    print("=====================")

____()   # 호출하기`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: def / 게임 제목 / main
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: while 로 기회 3번 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. chances에 3, attempts에 0을 담고, 시도할 때마다 1씩 더합니다. attempts가 chances보다 작을 동안 반복합니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`chances = ____
attempts = ____
while attempts ____ chances:
    input("guess my number: ")
    attempts ____ 1
else:
    print("you lose")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: 3 / 0 / &lt; / += — attempts 를 안 늘리면 무한 루프
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 랜덤 정답과 예외 처리 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. import random으로 라이브러리를 가져오고, randint로 정답을 뽑습니다. 그리고 try except로 감싸서 숫자가 아닌 입력이 들어와도 게임이 꺼지지 않게 만듭니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`____ random

answer = random.____(1, 11)
____:
    user_input = ____(input("guess my number: "))
    attempts += 1
____ ValueError:
    print("Invalid input. Only numbers are allowed")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: import / randint / try / int / except
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: isCorrect 로 게임 완성 (12~15분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 정답을 판정하는 isCorrect 함수를 만들고 main과 이어붙입니다. 정답이면 break로 반복을 즉시 끝냅니다. break로 빠져나오면 you lose가 나오지 않습니다. 12분에서 15분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def isCorrect(answer, user_input):
    if user_input ____ answer:
        return ____
    ...

if isCorrect(answer, user_input):
    ____              # 반복 끝내기
else:
    attempts += 1`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: &gt; / False / break — 정답인데 you lose 가 나오면 break 자리를
						확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 뼈대를 만들고, 기회를 세고, 정답을 만들고 예외를 막고, 함수로 정답을 판정했습니다. 배운 문법 여섯 가지를 한 프로그램에서 전부 써봤습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "타이틀과 뼈대 만들기", color: "bg-rose-100" },
					{ num: "2", text: "while 로 기회 3번 세기", color: "bg-violet-100" },
					{ num: "3", text: "랜덤 정답과 예외 처리", color: "bg-teal-100" },
					{ num: "4", text: "isCorrect 로 게임 완성", color: "bg-emerald-100" },
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
			"오늘 실습을 마치겠습니다. 시간이 남는 사람은 기회를 다섯 번으로 늘리거나 정답 범위를 1에서 100으로 바꿔 나만의 게임으로 만들어 보시기 바랍니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					[ ok ]
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 리스트 list</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function NumberGuessingGameTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
