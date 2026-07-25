"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-sky-50 to-blue-50",
		script:
			"안녕하세요, 여러분. 지난 시간에는 if 로 조건 하나를 판단해봤습니다. 그런데 세상은 조건 하나로 끝나지 않습니다. 오늘은 조건을 여러 개 엮는 and, or, not 을 배우겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					and / or / not
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					논리 연산자
				</h1>
				<p className="text-2xl text-gray-500 mt-2">조건 여러 개를 엮기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, and 로 모두 참일 때만 실행되는 조건을 쓸 수 있어야 합니다. 둘째, or 로 하나라도 참이면 실행되는 조건을 쓸 수 있어야 합니다. 셋째, not 으로 조건을 뒤집고 중첩된 if 대신 논리 연산자를 골라 쓸 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "and 로 모두 참일 때만 실행되는 조건 쓰기" },
					{ num: "2", text: "or 로 하나라도 참이면 실행되는 조건 쓰기" },
					{ num: "3", text: "not 으로 조건을 뒤집기" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
					>
						<span className="bg-sky-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
							{item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "상황: 호텔 VIP 손님 판별하기",
		bg: "from-green-50 to-emerald-50",
		script:
			"호텔에 오신 손님이 VIP 인지 확인하는 프로그램을 만든다고 해봅시다. VIP 가 되려면 세 가지를 모두 만족해야 합니다. 만 19세 이상, 1년에 12번 이상 방문, 회원권 등록 후 2년 이상입니다. 이것을 if 안에 if 를 겹겹이 쌓아 확인할 수도 있지만, 중첩된 if 는 읽기 어렵고 금방 복잡해집니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ num: "1", text: "만 19세 이상" },
					{ num: "2", text: "1년에 12번 이상 방문한 손님" },
					{ num: "3", text: "회원권 등록 후 2년 이상인 손님" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-center gap-4"
					>
						<span className="text-lg font-bold text-gray-500">
							조건 {item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						중첩된 if 는 피하자 → and 로 한 줄에
					</p>
				</div>
			</div>
		),
	},
	{
		title: "and — 모두 참일 때만",
		bg: "from-cyan-50 to-blue-50",
		script:
			"and 로 이었기 때문에 세 조건 중 하나라도 거짓이면 VIP 문장은 실행되지 않고 welcome 이 실행됩니다. 이 코드는 회원 기간이 1년이라 welcome 이 나옵니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = 20             # 만 나이
visited_number = 20  # 방문 횟수
duration = 1         # 회원 기간

if age >= 19 and visited_number >= 12 and duration >= 2:
    print("you are VIP")
else:
    print("welcome!")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						하나라도 거짓이면 전체가 거짓
					</p>
				</div>
			</div>
		),
	},
	{
		title: "RGB 색 계산기 — and 로 정확히 집어내기",
		bg: "from-violet-50 to-purple-50",
		script:
			"빛의 3원색을 판별하는 함수입니다. 빨간불이 켜지면 r 이 1이 됩니다. 그런데 빨간색을 r 이 1인지만 검사하면 틀립니다. 흰색도, 노란색도, 마젠타색도 빨간불이 켜진 상태이기 때문입니다. 빨간불만 켜진 상태를 정확히 집어내려면 and 로 세 값을 모두 확인해야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def rgb(r, g, b):
    if r == 1 and g == 1 and b == 1:
        print("white")
    elif r == 1 and g == 0 and b == 0:
        print("red")
    elif r == 0 and g == 1 and b == 0:
        print("green")
    elif r == 0 and g == 0 and b == 1:
        print("blue")
    else:
        print("mixed color")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						r == 1 만 보면 흰색·노란색까지 red 가 된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "or — 하나라도 참이면",
		bg: "from-teal-50 to-cyan-50",
		script:
			"and 가 모두 참일 때 참이었다면, or 는 둘 중 하나라도 참이면 참이 됩니다. 비가 오거나 눈이 오면 날씨가 좋지 않다고 알려주는 코드입니다. rain 과 snow 중 하나라도 True 면 첫 번째 문장이 실행됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def rain_or_snow(rain, snow):
    if rain or snow:
        print("날씨가 좋지 않습니다.")
    else:
        print("날씨가 좋습니다.")`}</CodeBlock>
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-white/70 rounded-xl p-4">
						<p className="text-lg font-bold text-gray-700 mb-1">and</p>
						<p className="text-base text-gray-600">모두 참일 때만 참</p>
					</div>
					<div className="bg-white/70 rounded-xl p-4">
						<p className="text-lg font-bold text-gray-700 mb-1">or</p>
						<p className="text-base text-gray-600">하나라도 참이면 참</p>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "not — 뒤집기",
		bg: "from-rose-50 to-orange-50",
		script:
			"not 은 값을 반전시킵니다. 참은 거짓으로, 거짓은 참으로 바꿔줍니다. 위 코드에 True 를 넣으면 not True 는 거짓이라 아무것도 출력되지 않습니다. False 를 넣어야 please login 이 나옵니다. 괄호와 함께 쓰면 더 강력합니다. 다음 시간 추천 앱에서 바로 써먹겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def not_loggedIn(loggedIn):
    if not loggedIn:
        print("please login")

not_loggedIn(True)   # 아무것도 안 나온다`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						not (a == &quot;고양이&quot; or a == &quot;강아지&quot;) → 둘 다
						아닐 때 참
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. and 는 모두 참일 때, or 는 하나라도 참일 때, not 은 뒤집기입니다. 그리고 이 셋을 쓰면 중첩된 if 없이도 복잡한 판단을 깔끔하게 쓸 수 있습니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "and — 양쪽이 모두 참일 때만 참", c: "bg-sky-50" },
					{ t: "or — 하나라도 참이면 참", c: "bg-blue-50" },
					{ t: "not — 참과 거짓을 뒤집는다", c: "bg-violet-50" },
					{ t: "중첩된 if 대신 논리 연산자로 깔끔하게", c: "bg-amber-50" },
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
		bg: "from-sky-50 to-blue-50",
		script:
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 조건을 엮어봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">and</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: and, or, not 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function AndOrNotGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
