"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 드디어 기초 과정의 마지막 시간입니다. 지금까지 데이터를 표로 다루고, 정리하고, 그래프와 지도로 그려봤습니다. 오늘은 그걸 전부 모아서 버튼과 목록을 눌러가며 쓸 수 있는 진짜 웹 앱을 만들어보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					streamlit
				</h1>
				<p className="text-2xl text-gray-500 mt-2">나만의 데이터 앱 만들기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, streamlit이 무엇이고 어떻게 실행하는지 알아야 합니다. 둘째, dataframe과 bar_chart로 표와 그래프를 앱에 보여줄 수 있어야 합니다. 셋째, selectbox로 사용자가 직접 고를 수 있는 필터를 만들 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "streamlit이 무엇이고 어떻게 실행하는지 안다" },
					{ num: "2", text: "st.dataframe(), st.bar_chart()로 표와 그래프를 보여줄 수 있다" },
					{ num: "3", text: "st.selectbox()로 사용자가 고를 수 있는 필터를 만들 수 있다" },
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
		title: "streamlit이란?",
		bg: "from-green-50 to-emerald-50",
		script: "streamlit은 파이썬 코드만으로 버튼, 목록, 슬라이더가 있는 웹페이지를 만들어주는 도구입니다. streamlit run 파일이름 점 py로 실행하면 브라우저가 자동으로 열립니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`st.title("나의 첫 데이터 앱")
st.write("공공데이터를 브라우저에서 바로 살펴보자냥!")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">터미널에서 streamlit run 파일이름.py 로 실행</p>
				</div>
			</div>
		),
	},
	{
		title: "표와 그래프 보여주기",
		bg: "from-cyan-50 to-blue-50",
		script: "지금까지 배운 DataFrame과 그래프를 streamlit 함수 한 줄이면 그대로 웹페이지에 띄울 수 있습니다. dataframe은 표로, bar_chart는 막대 그래프로 바로 보여줍니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">st.dataframe(df)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>DataFrame을 표로 보여줌</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">st.bar_chart(df)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>DataFrame을 막대 그래프로 바로 그림</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "표/그래프 코드",
		bg: "from-purple-50 to-pink-50",
		script: "코드로 확인해보겠습니다. st.dataframe에 df를 넣으면 표가, st.bar_chart에 x와 y를 지정하면 막대 그래프가 바로 나타납니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`st.dataframe(df)
st.bar_chart(df, x="구", y="미세먼지")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">plt.show() 없이 바로 화면에 보입니다</p>
				</div>
			</div>
		),
	},
	{
		title: "사용자가 고를 수 있게 만들기",
		bg: "from-teal-50 to-cyan-50",
		script: "진짜 앱답게 사용자가 직접 구를 골라서 그 구의 데이터만 보게 만들어봅니다. selectbox가 돌려주는 값은 사용자가 지금 고른 값이 담기고, 화면이 실시간으로 업데이트됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`선택한구 = st.selectbox("구를 선택하세요", df["구"])
필터된_df = df[df["구"] == 선택한구]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">selectbox 반환값 = 사용자가 지금 고른 값</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. streamlit run으로 앱을 실행합니다. dataframe과 bar_chart로 표와 그래프를 보여줍니다. selectbox로 사용자 필터를 만듭니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">streamlit run 파일이름.py로 실행</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">st.dataframe() / st.bar_chart()로 표·그래프</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">st.selectbox()로 사용자 필터 만들기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 축하합니다. 공공데이터 분석·시각화 기초 과정을 모두 마쳤습니다. 다음 단계인 프로젝트 과정에서 또 만나겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">기초 과정을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 단계: 공공데이터 프로젝트 과정</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function StreamlitDataAppGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
