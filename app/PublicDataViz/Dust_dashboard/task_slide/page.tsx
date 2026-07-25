"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 미세먼지 대시보드를 완성하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 2 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">미세먼지 대시보드 완성하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. streamlit과 pandas 패키지가 필요합니다. app.py로 저장하고 streamlit run app.py로 실행합니다.",
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
		title: "미션 1: 추이 그래프 넣기 (7~8분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 앱 제목을 달고 미세먼지 추이 그래프를 넣습니다. 추이 그래프를 그리는 함수 이름을 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`st.____(df, x="날짜", y="미세먼지")  # line_chart`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: line_chart</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 지역 선택 필터 넣기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 사용자가 지역을 고를 수 있게 만듭니다. 목록에서 하나를 고르는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`선택지역 = st.____("지역을 선택하세요", 전체지역)  # selectbox`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: selectbox</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 기준치 슬라이더 넣기 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 사용자가 기준치를 직접 조절할 수 있게 만듭니다. 숫자를 조절하는 슬라이더 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`기준치 = st.____("위험 기준치", min_value=0, max_value=100, value=35)  # slider`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: slider</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 추이 그래프, 지역 선택, 기준치 슬라이더를 넣었습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "추이 그래프 넣기", color: "bg-rose-100" },
						{ num: "2", text: "지역 선택 필터 넣기", color: "bg-violet-100" },
						{ num: "3", text: "기준치 슬라이더 넣기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이걸로 프로젝트 2, 미세먼지 데이터 분석을 완주했습니다. 다음 프로젝트는 아파트 실거래가 데이터입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">프로젝트 2를 완주했습니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 프로젝트: 아파트 실거래가 데이터</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function DustDashboardTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
