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
			"안녕하세요, 여러분. 오늘은 리스트를 직접 다뤄보겠습니다. 네 가지 미션을 약 30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					[a, b, c]
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					리스트 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">만들고, 꺼내고, 바꿔보기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 30분</p>
			</div>
		),
	},
	{
		title: "미션 1: 개념 확인하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 객관식 아홉 문제로 개념을 확인합니다. 헷갈리는 문제가 있으면 개념 강의로 돌아가서 다시 봐도 좋습니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">
						빈 리스트 · 인덱싱 · 음수 번호 · append · 슬라이싱 · sort ·
						참조 · 삭제 · 더하기
					</p>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						7번(b = a)이 가장 많이 틀린다 — 복사가 아니라 이름표 추가
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 손으로 다뤄보기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 장바구니 리스트에서 값을 꺼내고, 추가하고, 끼워넣고, 지워봅니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`cart = ["빵", "우유", "계란", "치즈"]
print(cart[____])    # 우유
cart.____("사과")     # 맨 뒤 추가
cart.____(1, "버터")  # 자리 지정
cart.____("계란")     # 값으로 삭제`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: 1 / append / insert / remove
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 정렬하고 최댓값 찾기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 점수 리스트를 정렬하고 최댓값, 최솟값, 평균을 구합니다. 평균은 합계를 개수로 나눕니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`scores = [88, 95, 70, 100, 64]
scores.____()              # sort
print(____(scores))        # max
print(sum(scores) / ____(scores))  # len`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">평균이 83.4 로 나오는지 확인</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: 합격자 명단 만들기 (10~12분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 리스트와 반복문을 합쳐서 70점 이상인 학생만 골라 명단을 만듭니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`합격자 = []
for i in range(len(students)):
    if scores[i] >= ____:
        합격자.____(students[i])`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: 70 / append → [&apos;가온&apos;, &apos;다온&apos;, &apos;라온&apos;]
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 개념을 확인하고, 메소드로 다루고, 정렬하고, 반복문과 합쳐 명단을 만들었습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "개념 확인하기", color: "bg-rose-100" },
					{ num: "2", text: "손으로 다뤄보기", color: "bg-violet-100" },
					{ num: "3", text: "정렬하고 최댓값 찾기", color: "bg-teal-100" },
					{ num: "4", text: "합격자 명단 만들기", color: "bg-emerald-100" },
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
			"오늘 실습을 마치겠습니다. 리스트는 앞으로 배울 튜플과 딕셔너리의 기초가 됩니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					[ ok ]
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 튜플 tuple</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function ListTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
