"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 지하철 데이터를 깨끗하게 정리했습니다. 오늘은 출근 시간엔 얼마나 붐빌지 알아보기 위해 시간대별 분석을 해보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">⏰</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 1 — 지하철
				</h1>
				<p className="text-2xl text-gray-500 mt-2">시간대별 분석</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 시간대별로 나뉜 여러 열을 melt로 하나의 열로 모을 수 있어야 합니다. 둘째, 시간대별 평균 승차인원을 groupby로 구할 수 있어야 합니다. 셋째, idxmax로 가장 혼잡한 시간대를 찾을 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "melt()로 시간대별 여러 열을 하나로 모을 수 있다" },
					{ num: "2", text: "groupby()로 시간대별 평균을 구할 수 있다" },
					{ num: "3", text: "idxmax()로 가장 혼잡한 시간대를 찾을 수 있다" },
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
		title: "시간대별 데이터의 모양",
		bg: "from-green-50 to-emerald-50",
		script: "실제 지하철 시간대별 데이터는 시간대마다 열이 따로따로 나뉘어 있는 경우가 많습니다. 이런 모양을 옆으로 넓은 wide 형태라고 부릅니다. 이 상태로는 시간대별 평균을 구하기 어렵습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`역명 | 07-08시_승차 | 08-09시_승차 | 18-19시_승차
강남 |     8200     |    15200     |    9800`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">시간대가 행이 아니라 열로 흩어져 있음</p>
				</div>
			</div>
		),
	},
	{
		title: "wide vs long",
		bg: "from-cyan-50 to-blue-50",
		script: "melt는 옆으로 넓은 데이터를 세로로 긴 형태로 바꿔줍니다. 시간대라는 열 하나에 값을 모으는 것입니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">↔️ wide (넓은 형태)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>시간대마다 열이 따로 있음</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">↕️ long (긴 형태)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>시간대가 한 열에 모임</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "melt 코드로 확인하기",
		bg: "from-purple-50 to-pink-50",
		script: "id_vars는 그대로 유지할 열, value_vars는 모을 열들입니다. var_name, value_name으로 새로 생길 두 열의 이름을 정합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`길게 = pd.melt(df, id_vars=["역명"],
    value_vars=["07-08시_승차", "08-09시_승차"],
    var_name="시간대", value_name="승차인원")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 id_vars=유지할 열, value_vars=모을 열</p>
				</div>
			</div>
		),
	},
	{
		title: "가장 붐비는 시간대 찾기",
		bg: "from-teal-50 to-cyan-50",
		script: "세로로 긴 형태가 됐으니 groupby로 시간대별 평균을 구하고, idxmax로 가장 큰 값의 시간대를 찾습니다. max는 값을, idxmax는 그 값을 가진 행의 이름을 알려줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`시간대평균 = 길게.groupby("시간대")["승차인원"].mean()
가장붐비는시간대 = 시간대평균.idxmax()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">idxmax() = &quot;가장 큰 값을 가진 이름&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. melt로 데이터를 세로로 펼칩니다. groupby로 시간대별 평균을 구합니다. idxmax로 가장 붐비는 시간대를 찾습니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ pd.melt()로 wide → long 변환</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ groupby(&quot;시간대&quot;).mean()으로 평균 구하기</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ idxmax()로 가장 혼잡한 시간대 찾기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 진짜 데이터에서 패턴을 찾아낼 수 있게 되었습니다. 다음 시간에는 오늘 분석한 결과를 그래프로 예쁘게 시각화하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 지하철 데이터 시각화</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function SubwayTimeAnalysisGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
