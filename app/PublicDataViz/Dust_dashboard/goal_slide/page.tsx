"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 두 시간 동안 미세먼지 추이와 지역 비교를 분석했습니다. 오늘은 그걸 전부 모아서 streamlit 대시보드로 완성하겠습니다. 프로젝트 2의 마지막 시간입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🖥️</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 2 — 미세먼지
				</h1>
				<p className="text-2xl text-gray-500 mt-2">대시보드 만들기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, line_chart로 추이 그래프를 대시보드에 넣을 수 있어야 합니다. 둘째, selectbox로 지역을 선택해 필터링할 수 있어야 합니다. 셋째, slider로 기준치를 조절할 수 있는 위젯을 만들 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "st.line_chart()로 추이 그래프를 넣을 수 있다" },
					{ num: "2", text: "st.selectbox()로 지역을 선택해 필터링할 수 있다" },
					{ num: "3", text: "st.slider()로 기준치를 조절하는 위젯을 만들 수 있다" },
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
		title: "추이 그래프 넣기",
		bg: "from-green-50 to-emerald-50",
		script: "line_chart는 bar_chart와 사용법이 똑같습니다. DataFrame과 x, y 열 이름만 넣으면 별도의 matplotlib 코드 없이 바로 추이 그래프가 나타납니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`st.title("우리 동네 미세먼지 대시보드")
st.line_chart(df, x="날짜", y="미세먼지")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">line_chart ↔ bar_chart, 사용법 동일</p>
				</div>
			</div>
		),
	},
	{
		title: "정적 분석 vs 대시보드",
		bg: "from-cyan-50 to-blue-50",
		script: "지금까지는 코드를 고쳐야 다른 지역을 볼 수 있었지만, 대시보드는 버튼 클릭만으로 지역을 바꿔볼 수 있고 앱 주소만 알면 누구나 써볼 수 있습니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📋 정적인 분석</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>코드를 고쳐야 다른 지역을 봄</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">🖱️ 대시보드</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>클릭만으로 지역을 바꿔볼 수 있음</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "지역 선택 필터",
		bg: "from-purple-50 to-pink-50",
		script: "selectbox로 지역을 고를 수 있게 만듭니다. 실제로는 데이터에서 지역 목록을 직접 뽑아서 넣으면, 지역이 늘어나도 코드를 고칠 필요가 없습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`선택지역 = st.selectbox("지역을 선택하세요", 전체지역)
st.write(f"선택한 지역: {선택지역}")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 df[&quot;지역&quot;].unique()로 목록을 직접 뽑기도 함</p>
				</div>
			</div>
		),
	},
	{
		title: "기준치 슬라이더 넣기",
		bg: "from-teal-50 to-cyan-50",
		script: "지난 시간에 기준치를 코드로 직접 정했다면, 오늘은 사용자가 슬라이더로 직접 조절하게 만듭니다. min_value, max_value, value 세 가지를 정해줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`기준치 = st.slider("위험 기준치", min_value=0, max_value=100, value=35)
if df["미세먼지"].mean() > 기준치:
    st.write("⚠️ 기준치를 넘었습니다!")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">슬라이더 값이 실시간으로 조건문에 반영됨</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. line_chart로 추이를 보여줍니다. selectbox로 지역을 고릅니다. slider로 기준치를 조절합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ st.line_chart(df, x=, y=)로 추이 표시</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ st.selectbox()로 지역 선택</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ st.slider()로 기준치 조절</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이걸로 프로젝트 2, 미세먼지 데이터 분석을 완주했습니다. 다음 프로젝트는 아파트 실거래가 데이터입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🏁</span>
				<h1 className="text-5xl font-bold text-gray-800">프로젝트 2를 완주했습니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 프로젝트: 아파트 실거래가 데이터</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function DustDashboardGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
