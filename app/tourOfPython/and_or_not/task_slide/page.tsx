"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// 이모지 금지 구역(app/tourOfPython, CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-sky-50 to-blue-50",
		script:
			"안녕하세요, 여러분. 오늘은 조건을 직접 엮어보겠습니다. 다섯 가지 미션을 약 40분에 걸쳐 수행합니다. and 는 모두 참일 때, or 는 하나라도 참일 때라는 것만 기억하고 시작합시다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					and / or / not
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					논리 연산자 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">엮고, 넓히고, 뒤집기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 40분</p>
			</div>
		),
	},
	{
		title: "미션 1: 개념 확인하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 네 개의 객관식 문제를 스스로 풀어봅니다. 답을 고르기 전에 왜 그런지 먼저 생각해보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ num: "1", text: "and 는 언제 참이 되는가" },
					{ num: "2", text: "나이와 회원 여부를 and 로 묶은 코드의 결과" },
					{ num: "3", text: "비 또는 눈을 or 로 묶은 코드의 결과" },
					{ num: "4", text: "not True 의 값" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-4 flex items-center gap-4"
					>
						<span className="text-lg font-bold text-gray-500">
							{item.num}번
						</span>
						<p className="text-lg text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "미션 2: VIP 손님 판별하기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 그대로 실행하면 welcome 이 나오는 코드입니다. 값을 고쳐서 VIP 가 나오게 만드세요. and 로 이어져 있으니 세 조건이 전부 참이어야 합니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = 20
visited_number = 20
duration = ____

if age >= 19 and visited_number >= 12 and duration >= 2:
    print("you are VIP")
else:
    print("welcome!")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						고친 뒤 age 를 18로 바꾸면 다시 welcome 이 나오는지 확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: RGB 색 계산기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 함수를 실행시켜서 green 이 나오게 만드세요. 그 다음에는 조건에서 and 를 빼고 r 이 1인지만 검사하도록 바꿔서, 흰색을 넣었을 때 무엇이 나오는지 확인해보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def rgb(r, g, b):
    if r == 1 and g == 1 and b == 1:  print("white")
    elif r == 1 and g == 0 and b == 0: print("red")
    elif r == 0 and g == 1 and b == 0: print("green")
    elif r == 0 and g == 0 and b == 1: print("blue")
    else: print("mixed color")

rgb(____, ____, ____)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						실험: and 를 빼면 흰색이 red 로 나온다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: or 와 not 써보기 (8~10분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 빈칸을 채워 두 함수를 완성합니다. 비 또는 눈이면 안 좋은 날씨입니다. 그리고 not 은 값을 뒤집으니, please login 이 나오려면 무엇을 넣어야 하는지 생각해보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def rain_or_snow(rain, snow):
    if rain ____ snow:
        print("날씨가 좋지 않습니다.")
    else:
        print("날씨가 좋습니다.")

def not_loggedIn(loggedIn):
    if ____ loggedIn:
        print("please login")

not_loggedIn(____)`}</CodeBlock>
			</div>
		),
	},
	{
		title: "미션 5: 놀이기구 탑승 판별기 (10~12분)",
		bg: "from-indigo-50 to-blue-50",
		script:
			"다섯 번째 미션입니다. 나이가 14세 이상이고 키가 140 이상이면 탑승 가능, 아니면 탑승 불가를 출력합니다. input 은 문자열을 주므로 int 로 바꿔야 합니다. 경계값인 14세와 140센티미터를 꼭 넣어서 확인하세요. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`나이 = ____(input("나이를 입력하세요: "))
키 = ____(input("키를 입력하세요: "))

if 나이 >= ____ ____ 키 >= ____:
    print("놀이기구 탑승 가능")
else:
    print("탑승 불가")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						경계값 확인: 나이 14 · 키 140 → 탑승 가능
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 다섯 가지 미션을 모두 수행했습니다. 개념을 확인하고, and 로 조건을 좁히고, or 로 넓히고, not 으로 뒤집고, 마지막에는 직접 판별기를 만들었습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "개념 확인하기", color: "bg-rose-100" },
					{ num: "2", text: "VIP 손님 판별하기", color: "bg-violet-100" },
					{ num: "3", text: "RGB 색 계산기", color: "bg-teal-100" },
					{ num: "4", text: "or 와 not 써보기", color: "bg-emerald-100" },
					{ num: "5", text: "놀이기구 탑승 판별기", color: "bg-indigo-100" },
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
		bg: "from-sky-50 to-blue-50",
		script:
			"오늘 실습을 마치겠습니다. 다음 시간에는 오늘 배운 or 와 not 을 그대로 써서 반려동물 추천 앱을 만들어보겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">
					or / not
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">
					다음 시간: 강아지와 고양이 1
				</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function AndOrNotTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
