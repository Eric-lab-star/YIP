"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// 이모지 금지 구역(app/tourOfPython, CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-purple-50 to-pink-50",
		script:
			"안녕하세요, 여러분. 오늘은 튜플을 직접 다뤄보겠습니다. 네 가지 미션을 약 30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-purple-500">
					(a, b, c)
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					튜플 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">묶고, 읽고, 풀어보기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 30분</p>
			</div>
		),
	},
	{
		title: "미션 1: 개념 확인하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 객관식 열 문제로 개념을 확인합니다. 2번 문제가 가장 많이 틀리니 주의해서 보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">
						만들기 · 요소 하나 튜플 · 인덱싱 · 수정 불가 · 슬라이싱 ·
						언패킹 · count · type · 리스트와 차이 · 더하기
					</p>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						(1) 은 그냥 숫자, (1,) 이라야 튜플 — 쉼표가 튜플을 만든다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 읽고 언패킹하기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 튜플에서 값을 읽고, 세 변수에 나눠 담아봅니다. 변수 개수와 값 개수가 같아야 한다는 점을 확인하세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`info = ("김철수", 15, "대전")
print(info[____])       # 대전
name, age, city = ____  # 언패킹`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: 2 또는 -1 / info</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 좌표 거리 계산기 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 좌표처럼 바뀌면 안 되는 값이야말로 튜플이 어울립니다. 두 점을 언패킹해서 거리를 구합니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`a = (1, 2)
b = (4, 6)
x1, y1 = ____
x2, y2 = ____
거리 = ((x2-x1)**2 + (y2-y1)**2) ** 0.5`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">거리가 5.0 으로 나오는지 확인</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: 카페 주문 영수증 (10~12분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 튜플을 리스트에 담아 주문 내역을 정리합니다. 반복문이 튜플을 자동으로 언패킹해준다는 점이 핵심입니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`주문 = [("아메리카노", 4000), ("케이크", 6500)]
for 이름, 가격 in 주문:
    총액 = 총액 + ____`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: 가격 → 총액 15000 (라떼 포함)
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 개념을 확인하고, 언패킹하고, 좌표 거리를 구하고, 영수증을 만들었습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "개념 확인하기", color: "bg-rose-100" },
					{ num: "2", text: "읽고 언패킹하기", color: "bg-violet-100" },
					{ num: "3", text: "좌표 거리 계산기", color: "bg-teal-100" },
					{ num: "4", text: "카페 주문 영수증", color: "bg-emerald-100" },
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
		bg: "from-purple-50 to-pink-50",
		script:
			"오늘 실습을 마치겠습니다. 다음 시간에는 이름표로 값을 꺼내는 딕셔너리를 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-purple-400">
					( ok )
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 딕셔너리 dictionary</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function TupleTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
