"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 groupby와 value_counts를 직접 연습하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📦</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">pandas 실습 (3)</h1>
				<p className="text-2xl text-gray-500 mt-2">구별로 요약하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ icon: "📦", text: "pandas 패키지 설치 확인" },
					].map((item, i) => (
						<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
							<span className="text-3xl">{item.icon}</span>
							<p className="text-xl text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "미션 1: 구별 미세먼지 평균 구하기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 미세먼지 측정소 데이터에서 구별 평균 미세먼지를 구해봅니다. 그룹으로 묶을 기준 열은 구입니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`data = {
    "구": ["중구", "중구", "강남구", "강남구", "마포구"],
    "미세먼지": [30, 34, 42, 38, 25],
}
df = pd.DataFrame(data)

구별평균 = df.groupby(____)["미세먼지"].mean()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: &quot;구&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 평균과 최댓값 함께 보기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 평균과 최댓값을 agg로 함께 구합니다. 평균을 뜻하는 통계 이름을 빈칸에 넣습니다. 강남구의 최댓값이 42로 나옵니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`요약 = df.groupby("구")["미세먼지"].agg([____, "max"])`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: &quot;mean&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 구별 측정소 개수 세기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 각 구에 측정소가 몇 개씩 있는지 세어봅니다. value_counts를 쓸 열 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`구별개수 = df[____].value_counts()  # "구"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 중구·강남구 2개, 마포구 1개</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 구별로 평균을 구하고, 여러 통계를 함께 보고, 개수를 세었습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "groupby로 구별 평균 구하기", color: "bg-rose-100" },
						{ num: "2", text: "agg로 평균·최댓값 함께 보기", color: "bg-violet-100" },
						{ num: "3", text: "value_counts로 개수 세기", color: "bg-teal-100" },
					].map((item) => (
						<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
							<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
							<p className="text-lg text-gray-700">{item.text} ✅</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 실습을 마치겠습니다. 흩어진 데이터를 그룹으로 묶어 요약할 수 있게 되었습니다. 다음 시간에는 빈 값과 이상한 값을 정리하는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎉</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 빈 값과 이상한 값 정리하기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function Pandas3GroupbyTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
