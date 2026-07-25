"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// 이모지 금지 구역(app/tourOfPython, CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-amber-50 to-orange-50",
		script:
			"안녕하세요, 여러분. 오늘은 함수를 직접 만들어보겠습니다. 네 가지 미션을 약 30분에 걸쳐 수행합니다. 함수는 손으로 써봐야 익습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-amber-600">
					def name():
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					함수 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">만들고, 받고, 돌려주기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 30분</p>
			</div>
		),
	},
	{
		title: "미션 1: 개념 확인하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 객관식 네 문제로 함수 이름과 실행 방법을 확인합니다. 매개변수가 몇 개인지 세어보면 답이 보입니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">
						함수 이름 찾기 · 실행 방법 고르기 · 매개변수 개수 맞추기
					</p>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						기본값이 있는 매개변수는 넣지 않아도 실행된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 매개변수 없는 함수 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 인사 함수, 상자 함수, 하트 함수를 손으로 씁니다. 복사 붙여넣기 하지 말고 한 땀 한 땀 써보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def say_hello():
    print("안녕하세요.")

say_hello()   # 괄호를 빼면 어떻게 될까?`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						괄호 없이 이름만 써보고 결과를 확인해볼 것
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 매개변수가 있는 함수 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 값을 받는 함수를 만듭니다. 함수 안에서 쓰는 이름과 매개변수 이름을 맞춰야 합니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def add(____, ____):
    print(x + y)

add(3, 5)     # 8
add(3)        # 어떤 에러가 날까?`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: x, y — 에러 메시지도 읽어볼 것</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: return 으로 돌려받기 (10~12분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. print 하는 함수와 return 하는 함수를 나란히 만들어 차이를 확인합니다. print 하는 함수의 결과를 변수에 담으면 None 이 나옵니다. 왜 그런지 생각해보세요. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def add_return(x, y):
    ____ x + y

a = add_print(3, 5)    # a 에는 무엇이?
b = add_return(3, 5)   # b 에는 무엇이?`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: return — a 는 None, b 는 8
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 개념을 확인하고, 함수를 만들고, 값을 받고, 값을 돌려받았습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "개념 확인하기", color: "bg-rose-100" },
					{ num: "2", text: "매개변수 없는 함수 만들기", color: "bg-violet-100" },
					{ num: "3", text: "매개변수가 있는 함수", color: "bg-teal-100" },
					{ num: "4", text: "return 으로 값 돌려받기", color: "bg-emerald-100" },
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
		bg: "from-amber-50 to-orange-50",
		script:
			"오늘 실습을 마치겠습니다. print 와 return 의 차이를 몸으로 느꼈다면 오늘은 대성공입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-amber-400">
					return
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">
					다음 시간: input, type, int, try..except
				</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function FunctionsTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
