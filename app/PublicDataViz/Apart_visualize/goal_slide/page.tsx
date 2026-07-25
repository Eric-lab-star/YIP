"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 지역×평형 피벗 테이블을 만들었습니다. 오늘은 그 표를 그림으로 바꿔서 한눈에 보이게 만들고, 면적과 가격의 관계도 살펴보겠습니다. 프로젝트 3의 마지막 시간입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🔥</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 3 — 아파트
				</h1>
				<p className="text-2xl text-gray-500 mt-2">데이터 시각화</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, heatmap으로 피벗 테이블을 색깔 있는 표로 시각화할 수 있어야 합니다. 둘째, plotly 산점도로 면적과 가격의 관계를 살펴볼 수 있어야 합니다. 셋째, 분석 결과를 결론 문장으로 정리할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "sns.heatmap()으로 피벗 테이블을 시각화할 수 있다" },
					{ num: "2", text: "plotly 산점도로 면적과 가격의 관계를 살펴볼 수 있다" },
					{ num: "3", text: "분석 결과를 결론 문장으로 정리할 수 있다" },
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
		title: "피벗 테이블을 히트맵으로",
		bg: "from-green-50 to-emerald-50",
		script: "숫자로 가득한 표는 한눈에 비교하기 어렵습니다. 히트맵은 숫자 크기에 따라 색깔을 다르게 칠해줘서 어디가 높고 낮은지 한눈에 보여줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.heatmap(표, annot=True, fmt=".0f", cmap="YlOrRd")
plt.title("지역×평형대 평균 거래금액")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">annot=True로 숫자, cmap으로 색 팔레트 지정</p>
				</div>
			</div>
		),
	},
	{
		title: "히트맵 vs 산점도",
		bg: "from-cyan-50 to-blue-50",
		script: "히트맵은 지역x평형 요약값을 색으로 비교하고, 산점도는 아파트 하나하나의 면적과 가격 관계를 보여줍니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📦 히트맵</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>요약값을 색으로 한눈에 비교</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">🖱️ 산점도</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>개별 아파트의 면적·가격 관계</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "면적과 가격의 관계",
		bg: "from-purple-50 to-pink-50",
		script: "면적이 넓을수록 가격도 비쌀지 산점도로 확인합니다. 점들이 오른쪽 위로 올라가는 모양이면 양의 상관관계가 있다는 뜻입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`fig = px.scatter(df, x="전용면적", y="거래금액",
    color="지역", hover_data=["단지명"])`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 오른쪽 위로 올라가는 모양 = 양의 상관관계</p>
				</div>
			</div>
		),
	},
	{
		title: "결론 정리하기",
		bg: "from-teal-50 to-cyan-50",
		script: "stack으로 피벗 테이블을 다시 세로로 긴 형태로 만들면, idxmax로 가장 비싼 지역-평형 조합을 한 번에 찾을 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`가장비싼조합 = 표.stack().idxmax()
print(f"결론: {가장비싼조합[0]} {가장비싼조합[1]}이 가장 비싸다.")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">stack() = melt()와 비슷하게 넓은 표를 세로로</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. heatmap으로 피벗 테이블을 시각화합니다. scatter로 관계를 봅니다. stack과 idxmax로 결론을 정리합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ sns.heatmap(annot=, cmap=)으로 표 시각화</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ px.scatter(color=)로 관계 살펴보기</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ stack() + idxmax()로 결론 정리</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이걸로 프로젝트 3, 아파트 실거래가 데이터 분석을 완주했습니다. 다음 프로젝트는 상가 정보 데이터입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🏁</span>
				<h1 className="text-5xl font-bold text-gray-800">프로젝트 3을 완주했습니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 프로젝트: 상가 정보 데이터</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function ApartVisualizeGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
