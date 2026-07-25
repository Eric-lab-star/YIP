"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// 이모지 금지 구역(app/tourOfPython, CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-emerald-50 to-teal-50",
		script:
			"안녕하세요, 여러분. 오늘은 딕셔너리를 직접 다뤄보겠습니다. 네 가지 미션을 약 30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-emerald-600">
					&#123;키: 값&#125;
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					딕셔너리 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">찾고, 세고, 정리하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 30분</p>
			</div>
		),
	},
	{
		title: "미션 1: 개념 확인하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 객관식 열 문제로 개념을 확인합니다. 4번과 5번을 나란히 보세요. 같은 없는 키인데 결과가 다릅니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">
						만들기 · 꺼내기 · 수정 · 없는 키 · get · keys · del · in ·
						추가 · values 합계
					</p>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						d[&quot;c&quot;] 는 에러, d.get(&quot;c&quot;, 0) 은 0
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 성적표 만들기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 과목을 하나 추가하고, 값만 모아 합계와 평균을 구합니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`scores["과학"] = ____
합계 = sum(scores.____())
평균 = 합계 / ____(scores)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: 85 / values / len → 합계 355, 평균 88.75
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 편의점 재고 관리 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. items 로 상품과 개수를 함께 꺼내서, 품절인 상품을 표시합니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`for 상품, 개수 in 재고.____():
    if 개수 == 0:
        print(상품, "품절!")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: items → &quot;사이다 품절!&quot; 이 나오는지 확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: 단어 빈도 분석기 (10~12분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 딕셔너리가 가장 빛나는 순간입니다. 무엇이 몇 번 나왔는지 셉니다. 처음 보는 단어는 아직 키가 없으니 get 으로 0부터 시작해야 합니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`세기 = {}
for w in words:
    세기[w] = 세기.____(w, 0) + 1`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: get → &#123;&apos;사과&apos;: 3, &apos;바나나&apos;: 2, &apos;딸기&apos;: 1&#125;
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 개념을 확인하고, 합계를 내고, 재고를 관리하고, 단어를 세어봤습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "개념 확인하기", color: "bg-rose-100" },
					{ num: "2", text: "성적표 만들기", color: "bg-violet-100" },
					{ num: "3", text: "편의점 재고 관리", color: "bg-teal-100" },
					{ num: "4", text: "단어 빈도 분석기", color: "bg-emerald-100" },
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
		bg: "from-emerald-50 to-teal-50",
		script:
			"오늘 실습을 마치겠습니다. get 키 콤마 0 패턴은 앞으로도 정말 자주 쓰게 됩니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-emerald-400">
					&#123; ok &#125;
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: Todo App 만들기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function DictionaryTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
