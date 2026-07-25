"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 melt와 groupby로 가장 붐비는 시간대를 찾아냈습니다. 오늘은 그 결과를 그래프로 그려서 한눈에 보이게 만들겠습니다. 첫 프로젝트의 마지막 시간입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📈</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 1 — 지하철
				</h1>
				<p className="text-2xl text-gray-500 mt-2">데이터 시각화</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, seaborn으로 시간대별 평균을 막대 그래프로 그릴 수 있어야 합니다. 둘째, plotly로 역별 변화를 인터랙티브 선 그래프로 그릴 수 있어야 합니다. 셋째, color 옵션으로 여러 역을 한 그래프에서 비교할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "seaborn으로 시간대별 평균을 막대 그래프로 그릴 수 있다" },
					{ num: "2", text: "plotly로 역별 변화를 인터랙티브 선 그래프로 그릴 수 있다" },
					{ num: "3", text: "color 옵션으로 여러 역을 한 그래프에서 비교할 수 있다" },
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
		title: "시간대별 평균 막대 그래프",
		bg: "from-green-50 to-emerald-50",
		script: "지난 시간에 구한 시간대평균을 seaborn 막대 그래프로 그려봅니다. groupby mean 결과는 시간대가 인덱스로 들어간 상태라, reset_index로 다시 평범한 열로 되돌려야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.set_theme(style="whitegrid")
plt.rcParams["font.family"] = "Malgun Gothic"

시간대평균 = 길게.groupby("시간대")["승차인원"].mean().reset_index()
sns.barplot(data=시간대평균, x="시간대", y="승차인원")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">reset_index()로 인덱스를 다시 열로!</p>
				</div>
			</div>
		),
	},
	{
		title: "barplot vs plotly line",
		bg: "from-cyan-50 to-blue-50",
		script: "seaborn barplot은 요약된 값을 빠르게 보여주고, plotly line에 color를 더하면 역마다 다른 선으로 비교할 수 있습니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📊 seaborn barplot</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>전체 평균 흐름 파악</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">🖱️ plotly line + color</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>역마다 선을 다르게 비교</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "plotly로 역별 비교하기",
		bg: "from-purple-50 to-pink-50",
		script: "color에 역명을 넣으면 역마다 다른 색깔의 선으로 자동 구분해서 그려줍니다. 범례를 클릭하면 특정 역의 선만 숨기거나 보이게 할 수도 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`fig = px.line(길게, x="시간대", y="승차인원", color="역명")
fig.show()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 color=&quot;열&quot;로 자동 색 구분 + 범례 클릭 필터</p>
				</div>
			</div>
		),
	},
	{
		title: "그래프로 결론 내리기",
		bg: "from-teal-50 to-cyan-50",
		script: "그래프를 그렸다면 그래서 무엇을 알게 됐는지 한 문장으로 정리하는 습관을 들이면 좋습니다. 분석, 시각화, 결론 순서를 기억합시다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`가장붐비는시간대 = 길게.groupby("시간대")["승차인원"].mean().idxmax()
print(f"결론: {가장붐비는시간대}에 승차인원이 가장 많다.")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">분석 → 시각화 → 결론 문장</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. reset_index로 그룹 결과를 정리합니다. barplot과 line + color로 시각화합니다. 결론 문장으로 마무리합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ reset_index()로 groupby 결과 정리</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ sns.barplot() / px.line(color=)로 시각화</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 결론 문장으로 분석 마무리하기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이걸로 첫 번째 프로젝트, 지하철 승하차 데이터 분석을 완주했습니다. 다음 프로젝트는 미세먼지 데이터입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🏁</span>
				<h1 className="text-5xl font-bold text-gray-800">프로젝트 1을 완주했습니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 프로젝트: 미세먼지 데이터</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function SubwayVisualizeGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
