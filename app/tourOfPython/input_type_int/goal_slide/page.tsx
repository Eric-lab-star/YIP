"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-indigo-50 to-blue-50",
		script: "안녕하세요, 여러분. 지금까지는 값을 우리가 직접 코드에 써넣었습니다. 오늘은 사용자에게 물어보고 답을 받는 법을 배웁니다. 그런데 여기에 꼭 알아야 할 함정이 하나 숨어 있습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-indigo-600">input()</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">input type int</h1>
				<p className="text-2xl text-gray-500 mt-2">사용자와 대화하기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-indigo-50 to-blue-50",
		script: "오늘의 학습 목표입니다. 첫째, input 으로 사용자에게 값을 받을 수 있어야 합니다. 둘째, type 으로 자료형을 확인하고 input 이 항상 문자열을 준다는 것을 알아야 합니다. 셋째, int 로 형을 바꾸고 try except 로 오류를 잡을 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "input() 으로 사용자에게 값을 받을 수 있다" },
					{ num: "2", text: "input() 이 항상 문자열을 준다는 걸 안다" },
					{ num: "3", text: "int() 와 try..except 를 쓸 수 있다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-indigo-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "input() — 물어보기",
		bg: "from-indigo-50 to-blue-50",
		script: "input 은 질문을 보여주고 사용자가 답할 때까지 기다립니다. 그리고 답을 변수에 저장해줍니다. print 처럼 파이썬에 미리 들어 있는 built-in 함수입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = input("몇 살이에요")
phonenumber = input("전화번호 뭐에요")`}</CodeBlock>
			</div>
		),
	},
	{
		title: "오늘의 함정",
		bg: "from-indigo-50 to-blue-50",
		script: "자료형은 동그라미 세모 네모 같은 모양이라고 생각하면 쉽습니다. 그런데 숫자를 입력해도 int 가 아니라 str 이 나옵니다. input 은 무엇을 입력하든 항상 문자열을 돌려주기 때문입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = type(20)
print(age)          # int

age = input("age?: ")
print(type(age))    # str  ← 숫자를 넣어도!`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">input() 은 언제나 문자열을 준다</p>
				</div>
			</div>
		),
	},
	{
		title: "int() — 모양 바꾸기",
		bg: "from-indigo-50 to-blue-50",
		script: "계산에 쓰려면 int 로 감싸야 합니다. 하지만 hello 같은 글자는 바꿀 수 없어서 ValueError 를 내고 프로그램이 그냥 종료됩니다. 이것은 프로그램에 아주 치명적입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = int(input("age? :"))
print(type(age))    # int

# 사용자가 "hello" 를 넣으면
# ValueError → 프로그램 종료`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">바꿀 수 없는 값이 들어오면 죽는다</p>
				</div>
			</div>
		),
	},
	{
		title: "try..except — 오류 잡기",
		bg: "from-indigo-50 to-blue-50",
		script: "try 에는 오류가 생길 수도 있는 코드를 넣고, except 에는 오류가 생겼을 때 대신 실행할 코드를 넣습니다. except 뒤의 ValueError 는 그 종류일 때만 실행하라는 뜻입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`try:
    age = int(input("age? :"))
    print(type(age))
except ValueError:
    print("숫자를 입력하세요")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">try = 위험한 코드 · except = 대신 할 일</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-indigo-50 to-blue-50",
		script: "오늘 강의를 마치겠습니다. 이제 만드는 프로그램이 훨씬 살아있게 느껴질 것입니다. 실습 페이지에서 직접 물어봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-slate-400">input</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음: input 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function InputTypeIntGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
