"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지금까지 matplotlib과 seaborn으로 그래프를 그려봤습니다. 그런데 그 그래프들은 그림 파일처럼 고정되어 있습니다. 오늘 배울 plotly는 마우스를 올리면 값이 뜨고, 확대도 되는 살아있는 그래프를 만들어줍니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🖱️</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					plotly
				</h1>
				<p className="text-2xl text-gray-500 mt-2">마우스로 만지는 인터랙티브 그래프</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, plotly.express로 인터랙티브 막대 그래프를 그릴 수 있어야 합니다. 둘째, 인터랙티브 선 그래프를 그릴 수 있어야 합니다. 셋째, hover_data로 마우스를 올렸을 때 보이는 정보를 추가할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "plotly.express로 인터랙티브 막대 그래프를 그릴 수 있다" },
					{ num: "2", text: "plotly.express로 인터랙티브 선 그래프를 그릴 수 있다" },
					{ num: "3", text: "hover_data로 마우스 오버 정보를 추가할 수 있다" },
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
		title: "plotly로 막대 그래프 그리기",
		bg: "from-green-50 to-emerald-50",
		script: "plotly는 보통 plotly.express를 px라는 이름으로 줄여서 불러옵니다. 사용법은 seaborn과 비슷합니다. fig.show로 그래프를 열면 마우스를 올렸을 때 값이 말풍선으로 뜹니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`fig = px.bar(df, x="구", y="미세먼지", title="구별 미세먼지 농도")
fig.show()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">마우스 오버 시 값 표시, 휠로 확대·축소</p>
				</div>
			</div>
		),
	},
	{
		title: "고정 그래프 vs 인터랙티브 그래프",
		bg: "from-cyan-50 to-blue-50",
		script: "matplotlib과 seaborn은 고정된 이미지처럼 보여주지만, plotly는 마우스를 올리면 값이 바로 뜨고 확대·축소, 특정 항목 숨기기가 가능합니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📷 matplotlib / seaborn</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>고정된 이미지처럼 보여줌</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">🖱️ plotly</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>마우스 오버·확대·축소 가능</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "plotly로 선 그래프",
		bg: "from-purple-50 to-pink-50",
		script: "선 그래프도 마찬가지로 px.line을 쓰면 됩니다. bar와 사용법이 똑같습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`fig2 = px.line(df2, x="요일", y="승차인원", title="요일별 지하철 승차인원")
fig2.show()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 px.bar()와 px.line() 사용법이 동일</p>
				</div>
			</div>
		),
	},
	{
		title: "hover_data로 정보 추가하기",
		bg: "from-teal-50 to-cyan-50",
		script: "마우스를 올렸을 때 다른 열의 정보도 함께 보여주고 싶을 땐 hover_data를 씁니다. 리스트로 열 이름을 나열하면 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`fig3 = px.bar(df3, x="구", y="미세먼지",
    hover_data=["초미세먼지"])`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">hover_data=[&quot;열&quot;]로 마우스 오버 정보 추가</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. px.bar로 인터랙티브 막대 그래프를 그립니다. px.line으로 선 그래프를 그립니다. hover_data로 정보를 추가합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ px.bar(df, x=, y=)로 막대 그래프</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ px.line(df, x=, y=)로 선 그래프</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ hover_data=[&quot;열&quot;]로 정보 추가</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 마우스로 직접 만질 수 있는 그래프를 만들 수 있게 되었습니다. 다음 시간에는 지도 위에 데이터를 그려보는 지도 시각화를 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: folium으로 지도 시각화</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function PlotlyInteractiveGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
