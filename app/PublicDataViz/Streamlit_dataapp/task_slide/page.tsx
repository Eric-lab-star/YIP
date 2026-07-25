"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 기초 과정의 마지막 실습으로 나만의 데이터 앱을 완성하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">streamlit 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">나만의 데이터 앱 완성하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. streamlit과 pandas 패키지가 필요합니다. 코드는 app.py 파일로 저장하고, streamlit run app.py로 실행합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "streamlit, pandas 패키지 설치 확인" },
						{ text: "streamlit run app.py로 실행하기" },
					].map((item, i) => (
						<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
							<p className="text-xl text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "미션 1: 앱 제목과 표 보여주기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 앱의 제목을 달고 미세먼지 데이터를 표로 보여줍니다. 제목을 보여주는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`st.____("우리 동네 미세먼지 앱")  # title
st.dataframe(df)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: title</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 막대 그래프 보여주기 (7~8분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 표 아래에 막대 그래프도 함께 보여줍니다. 막대 그래프를 그리는 함수 이름을 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`st.____(df, x="구", y="미세먼지")  # bar_chart`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: bar_chart</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 선택창으로 필터링하기 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 사용자가 구를 골라서 그 구의 미세먼지만 볼 수 있게 만듭니다. 선택창을 만드는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`선택한구 = st.____("구를 선택하세요", df["구"])  # selectbox`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">선택할 때마다 화면이 자동으로 업데이트됩니다</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 앱 제목과 표를 보여주고, 그래프를 그리고, 선택창으로 필터링했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "앱 제목과 표 보여주기", color: "bg-rose-100" },
						{ num: "2", text: "bar_chart로 그래프 보여주기", color: "bg-violet-100" },
						{ num: "3", text: "selectbox로 필터링하기", color: "bg-teal-100" },
					].map((item) => (
						<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
							<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
							<p className="text-lg text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 실습을 마치겠습니다. 축하합니다. 공공데이터 분석·시각화 기초 과정을 모두 마쳤습니다. 다음 단계인 프로젝트 과정에서 또 만나겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">기초 과정을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 단계: 공공데이터 프로젝트 과정</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function StreamlitDataAppTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
