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
			"안녕하세요, 여러분. 오늘은 지금까지 배운 것을 전부 모아서 진짜 게임을 하나 만들겠습니다. 컴퓨터가 정한 숫자를 세 번 안에 맞히는 숫자 맞히기 게임입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					1 ~ 10
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					숫자 맞히기 게임
				</h1>
				<p className="text-2xl text-gray-500 mt-2">
					배운 것을 조립해서 만드는 첫 프로그램
				</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, 게임을 규칙과 재료로 먼저 설계할 수 있어야 합니다. 둘째, random, while, if elif else, try except를 한 프로그램 안에서 합쳐 쓸 수 있어야 합니다. 셋째, 역할이 다른 코드를 함수로 나눌 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "규칙 → 재료 → 코드 순서로 설계할 수 있다" },
					{
						num: "2",
						text: "random, while, if elif else, try except 를 합쳐 쓸 수 있다",
					},
					{ num: "3", text: "역할별로 함수를 나눠 읽기 쉽게 만들 수 있다" },
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
		title: "게임 규칙부터 정한다",
		bg: "from-green-50 to-emerald-50",
		script:
			"코드를 바로 쓰기 전에 무엇을 만들 것인지 말로 먼저 정하면 훨씬 빠릅니다. 제목을 보여주고, 컴퓨터가 숫자를 정하고, 사람에게 물어보고, 힌트를 주고, 세 번을 다 쓰면 끝냅니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					"1. 게임 제목을 보여준다",
					"2. 컴퓨터가 1~10 중 하나를 몰래 정한다",
					"3. 사람에게 숫자를 물어본다",
					"4. 크면 작은 수, 작으면 큰 수라고 알려준다",
					"5. 맞히면 끝, 틀리면 시도 횟수 +1",
					"6. 3번을 다 쓰면 you lose",
				].map((t) => (
					<div key={t} className="bg-white/70 rounded-xl p-4">
						<p className="text-lg text-gray-700">{t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "while 로 기회를 센다",
		bg: "from-cyan-50 to-blue-50",
		script:
			"코드가 한 번만 실행되면 게임이 되지 않습니다. while로 반복하되, 무한히 돌면 안 되니 끝나는 조건이 필요합니다. chances는 총 기회, attempts는 시도 횟수입니다. attempts가 3이 되면 조건이 거짓이 되어 else의 you lose가 실행됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`chances = 3
attempts = 0
while attempts < chances:
    input("guess my number: ")
    attempts += 1
else:
    print("you lose")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						while 의 else 는 조건이 거짓이 되어 끝났을 때만 실행된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "random 으로 정답 만들기",
		bg: "from-purple-50 to-pink-50",
		script:
			"랜덤 숫자를 만들려면 import random으로 라이브러리를 가져옵니다. randint 1 콤마 11은 1에서 10 사이의 숫자를 하나 뽑아줍니다. 그리고 input이 주는 값은 언제나 문자열이므로 int로 바꿔야 숫자와 비교할 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`import random

answer = random.randint(1, 11)   # 1~10 중 하나
user_input = int(input("guess my number: "))`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						input 은 언제나 문자열 → int 로 바꿔야 비교할 수 있다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "try...except 로 프로그램 지키기",
		bg: "from-rose-50 to-orange-50",
		script:
			"int는 문자열을 숫자로 바꿔주지만, 안녕 같은 글자는 바꿀 수 없습니다. 이때 파이썬은 예외를 던지고, 아무도 받지 않으면 프로그램이 종료됩니다. try 안에서 예외가 나면 흐름이 except로 넘어가고, 반복을 끝내지 않으면 다시 처음으로 돌아갑니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`try:
    user_input = int(input("guess my number: "))
    attempts += 1
except ValueError:
    print("Invalid input. Only numbers are allowed")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						예외를 잡지 않으면 → 프로그램이 그대로 종료된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "함수로 역할 나누기",
		bg: "from-teal-50 to-cyan-50",
		script:
			"정답 판정은 isCorrect 함수에게 맡깁니다. 맞으면 True, 틀리면 False를 돌려줍니다. 모든 코드를 한곳에 몰아 쓰면 흐름을 알 수 없는 스파게티 코드가 됩니다. 하나의 함수에는 한 가지 역할만 주고, 길어지면 함수로 나눕니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def isCorrect(answer, user_input):
    if user_input > answer:
        print("더 작은 수입니다.")
        return False
    elif user_input < answer:
        print("더 큰 수입니다.")
        return False
    elif user_input == answer:
        print("정답입니다.")
        return True`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						main 은 게임 흐름만, isCorrect 는 정답 판정만
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. 규칙을 먼저 정하고, while로 기회를 세고, random으로 정답을 만들고, try except로 프로그램을 지키고, 함수로 역할을 나눴습니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "규칙을 먼저 말로 정한다", c: "bg-green-50" },
					{ t: "while + attempts 로 기회 세기", c: "bg-blue-50" },
					{ t: "random.randint 로 정답 만들기", c: "bg-purple-50" },
					{ t: "try...except 로 잘못된 입력 막기", c: "bg-amber-50" },
					{ t: "isCorrect 로 역할 나누기", c: "bg-rose-50" },
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
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 게임을 처음부터 끝까지 직접 만들어봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					1 ~ 10
				</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 숫자 맞히기 게임 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function NumberGuessingGameGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
