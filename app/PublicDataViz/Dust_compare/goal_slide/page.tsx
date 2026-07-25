"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 미세먼지 추이를 시간 순서로 살펴봤습니다. 오늘은 어느 지역이 다른 지역보다 더 심할지 알아보기 위해 지역별로 미세먼지를 비교하겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 2 — 미세먼지
				</h1>
				<p className="text-2xl text-gray-500 mt-2">지역 비교</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 지역별 평균 미세먼지를 막대 그래프로 비교할 수 있어야 합니다. 둘째, 상자그림으로 지역별 분포를 비교할 수 있어야 합니다. 셋째, 조건 필터링으로 기준치를 넘는 지역을 찾을 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "지역별 평균 미세먼지를 막대 그래프로 비교할 수 있다" },
					{ num: "2", text: "상자그림(boxplot)으로 지역별 분포를 비교할 수 있다" },
					{ num: "3", text: "조건 필터링으로 기준치를 넘는 지역을 찾을 수 있다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "지역별 평균 비교하기",
		bg: "from-green-50 to-emerald-50",
		script: "groupby와 barplot 조합으로 여러 지역을 비교합니다. 하지만 평균만 보면 매일 비슷하게 심한지, 어떤 날만 유독 심한지는 알 수 없습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`지역평균 = df.groupby("지역")["미세먼지"].mean().reset_index()
sns.barplot(data=지역평균, x="지역", y="미세먼지")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">평균만으로는 &quot;들쭉날쭉함&quot;을 알 수 없음</p>
				</div>
			</div>
		),
	},
	{
		title: "막대 그래프 vs 상자그림",
		bg: "from-cyan-50 to-blue-50",
		script: "상자그림은 평균 대신 데이터가 어떻게 흩어져 있는지를 한눈에 보여줍니다. 최솟값, 중앙값, 최댓값까지 알 수 있습니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">막대 그래프</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>평균 하나만 보여줌</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">상자그림 (boxplot)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>최솟값~최댓값까지 분포를 보여줌</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "상자그림 읽는 법",
		bg: "from-purple-50 to-pink-50",
		script: "상자 가운데 선은 중앙값, 상자의 위아래 끝은 데이터의 중간 50%가 몰린 범위, 상자 밖 점은 이상치일 수 있는 값입니다. 상자가 길면 값이 들쭉날쭉하고, 짧으면 일정합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.boxplot(data=df, x="지역", y="미세먼지")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">상자 길이 = 값이 들쭉날쭉한 정도</p>
				</div>
			</div>
		),
	},
	{
		title: "기준치를 넘는 지역 찾기",
		bg: "from-teal-50 to-cyan-50",
		script: "조건 필터링을 다시 활용해서 평균이 기준치를 넘는 지역만 골라냅니다. 기초 과정에서 배운 필터링을 groupby 결과에도 똑같이 쓸 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`기준치 = 35
위험지역 = 지역평균[지역평균["미세먼지"] > 기준치]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">배운 것을 조합하는 것이 프로젝트의 핵심</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. barplot으로 평균을 비교합니다. boxplot으로 분포를 비교합니다. 조건 필터링으로 위험 지역을 찾습니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">sns.barplot()으로 지역별 평균 비교</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">sns.boxplot()으로 분포 비교</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">조건 필터링으로 위험 지역 찾기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 여러 지역을 다양한 방법으로 비교할 수 있게 되었습니다. 다음 시간에는 미세먼지 대시보드를 만들겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 미세먼지 대시보드 만들기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function DustCompareGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
