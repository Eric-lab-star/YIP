"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 전체 가격 분포를 살펴봤습니다. 오늘은 한 걸음 더 들어가서 평형과 지역에 따라 가격이 어떻게 달라지는지 분석하겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📐</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 3 — 아파트
				</h1>
				<p className="text-2xl text-gray-500 mt-2">평형·지역별 분석</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, pd.cut으로 숫자 데이터를 구간별 카테고리로 나눌 수 있어야 합니다. 둘째, 두 개의 기준으로 groupby를 할 수 있어야 합니다. 셋째, pivot_table로 지역×평형대 표를 만들 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "pd.cut()으로 숫자를 구간별 카테고리로 나눌 수 있다" },
					{ num: "2", text: "두 개의 기준으로 groupby()를 할 수 있다" },
					{ num: "3", text: "pivot_table()로 지역×평형대 표를 만들 수 있다" },
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
		title: "전용면적을 평형대로 나누기",
		bg: "from-green-50 to-emerald-50",
		script: "숫자로만 되어있으면 비교하기 번거롭습니다. pd.cut은 숫자를 구간으로 나눠서 이름표를 붙여줍니다. bins로 구간 경계를, labels로 이름을 정합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`df["평형대"] = pd.cut(
    df["전용면적"], bins=[0, 60, 85, 200],
    labels=["소형", "중형", "대형"])`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">bins = 구간 경계, labels = 구간 이름</p>
				</div>
			</div>
		),
	},
	{
		title: "그룹 묶기: 기준 1개 vs 2개",
		bg: "from-cyan-50 to-blue-50",
		script: "groupby에 리스트로 여러 열을 넣으면 두 가지 기준으로 동시에 묶을 수 있습니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">1️⃣ 기준 1개</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>groupby(&quot;지역&quot;)</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">2️⃣ 기준 2개</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>groupby([&quot;지역&quot;, &quot;평형대&quot;])</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "두 기준 groupby 코드",
		bg: "from-purple-50 to-pink-50",
		script: "observed=True는 pd.cut으로 만든 카테고리 중 실제로 데이터에 존재하는 조합만 보여주는 옵션입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`지역평형평균 = df.groupby(["지역", "평형대"], observed=True)["거래금액"].mean()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 observed=True로 실제 존재하는 조합만 표시</p>
				</div>
			</div>
		),
	},
	{
		title: "pivot_table로 표 정리하기",
		bg: "from-teal-50 to-cyan-50",
		script: "pivot_table을 쓰면 지역을 행, 평형대를 열로 놓은 깔끔한 표를 만들 수 있습니다. 엑셀의 피벗 테이블과 똑같은 역할을 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`표 = pd.pivot_table(df, values="거래금액",
    index="지역", columns="평형대", aggfunc="mean")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">values, index, columns, aggfunc 4가지 재료</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. pd.cut으로 구간을 나눕니다. groupby 리스트로 두 기준을 묶습니다. pivot_table로 표를 만듭니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ pd.cut(bins=, labels=)로 구간 나누기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ groupby([&quot;열1&quot;,&quot;열2&quot;])로 두 기준 묶기</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ pivot_table()로 지역×평형 표 만들기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 여러 기준을 조합해서 데이터를 분석할 수 있게 되었습니다. 다음 시간에는 이 분석 결과를 그래프로 시각화하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 아파트 데이터 시각화</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function ApartSizeAreaGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
