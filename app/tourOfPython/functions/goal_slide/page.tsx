"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md) — 코드 기호와 번호로만 강조한다.
const slides: Slide[] = [
	{
		title: "",
		bg: "from-amber-50 to-orange-50",
		script:
			"안녕하세요, 여러분. 오늘은 함수를 배우겠습니다. 함수는 믹서기라고 생각하면 쉽습니다. 사과를 넣으면 사과주스가 나오죠. 사실 지금까지 쓴 print 도 함수였습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-amber-600">
					def name():
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					함수 Function
				</h1>
				<p className="text-2xl text-gray-500 mt-2">코드를 담는 믹서기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, def 로 함수를 정의하고 이름으로 실행할 수 있어야 합니다. 둘째, 공백으로 함수의 안과 밖을 구분할 수 있어야 합니다. 셋째, 매개변수로 값을 받고 return 으로 값을 돌려줄 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "def 로 정의하고 이름으로 실행할 수 있다" },
					{ num: "2", text: "공백으로 함수의 안과 밖을 구분할 수 있다" },
					{ num: "3", text: "매개변수로 받고 return 으로 돌려줄 수 있다" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
					>
						<span className="bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
							{item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "함수 만드는 순서",
		bg: "from-green-50 to-emerald-50",
		script:
			"def 를 쓰고, 한 칸 띄우고 이름을 쓰고, 괄호와 콜론을 씁니다. 다음 줄에서 탭을 한 번 눌러 들여쓰고 실행할 코드를 씁니다. 실행할 때는 이름 뒤에 괄호가 반드시 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def game_over():
    print("You are dead. Game over")

game_over()   # 괄호가 있어야 실행된다`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						괄호를 빼면 믹서기를 쳐다보기만 한 셈
					</p>
				</div>
			</div>
		),
	},
	{
		title: "함수는 왜 만드는가",
		bg: "from-cyan-50 to-blue-50",
		script:
			"긴 코드를 필요할 때마다 다시 쓰면 고칠 일이 생겼을 때 전부 고쳐야 합니다. 함수로 묶으면 이름 하나로 몇 번이든 부르고, 고칠 때는 한 곳만 고치면 됩니다. 이것을 추상화라고 부릅니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">함수 없이</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>필요할 때마다 다시 씀</li>
						<li>고칠 때 전부 고쳐야 함</li>
					</ul>
				</div>
				<div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-400">
					<p className="text-lg font-bold text-amber-700 mb-2">함수로 묶으면</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>이름 하나로 몇 번이든</li>
						<li>고칠 때 한 곳만</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "안과 밖은 공백으로 나뉜다",
		bg: "from-teal-50 to-cyan-50",
		script:
			"믹서기의 안과 밖은 플라스틱으로 나뉩니다. 파이썬에서 함수의 안과 밖은 공백으로 나뉩니다. 파이썬은 공백에 아주 민감한 언어입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def mixer():
    print("start")   # 공백 있음 → 함수 안

print("end")         # 공백 없음 → 함수 밖`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						비워두면 오류 → 비울 때는 pass
					</p>
				</div>
			</div>
		),
	},
	{
		title: "매개변수와 인수",
		bg: "from-violet-50 to-purple-50",
		script:
			"함수를 만들 때 괄호 안에 두는 빈 자리를 매개변수라고 합니다. 함수를 부를 때 실제로 넣는 값을 인수라고 합니다. 매개변수 이름은 자유롭게 지어도 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def plus_one(number):   # number = 매개변수
    print(number + 1)

plus_one(5)             # 5 = 인수`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						만들 때 = 빈 자리 · 부를 때 = 실제 값
					</p>
				</div>
			</div>
		),
	},
	{
		title: "return — 값을 돌려주기",
		bg: "from-rose-50 to-orange-50",
		script:
			"print 는 화면에 보여주기만 하고, return 은 값을 돌려줘서 다시 쓸 수 있게 합니다. 믹서기가 주스를 컵에 담아주는 것이 return 입니다. 그리고 return 은 함수를 끝내기도 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def add_two(x):
    return x + 2

결과 = add_two(5)
print(결과)   # 7`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						return 뒤의 코드는 실행되지 않는다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-amber-50 to-orange-50",
		script:
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 함수를 만들어봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-amber-400">
					def ( )
				</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 함수 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function FunctionsGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
