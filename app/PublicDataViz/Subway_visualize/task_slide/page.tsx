"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 지하철 분석 결과를 그래프로 그리겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 1 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">지하철 분석 결과 시각화하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas, seaborn, matplotlib, plotly 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas, seaborn, matplotlib, plotly 패키지 설치 확인" },
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
		title: "미션 1: 시간대별 평균 막대 그래프 그리기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 시간대평균을 seaborn 막대 그래프로 그립니다. 인덱스를 다시 열로 되돌리는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`시간대평균 = 길게.groupby("시간대")["승차인원"].mean().____()  # reset_index`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: reset_index</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 역별 변화 선 그래프 그리기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. plotly로 역별 시간대 변화를 비교합니다. 역마다 다른 색 선으로 구분해줄 열 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`fig = px.line(길게, x="시간대", y="승차인원", color=____)  # "역명"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;역명&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 결론 문장 작성하기 (5~7분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 분석 결과를 한 문장으로 정리합니다. 방금 구한 변수 이름을 빈칸에 넣습니다. 5~7분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print(f"결론: {____}에 승차인원이 가장 많다.")  # 가장붐비는시간대`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: 가장붐비는시간대</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 막대 그래프와 선 그래프를 그리고, 결론 문장을 작성했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "시간대별 평균 막대 그래프 그리기", color: "bg-rose-100" },
						{ num: "2", text: "역별 변화 선 그래프 그리기", color: "bg-violet-100" },
						{ num: "3", text: "결론 문장 작성하기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이걸로 프로젝트 1, 지하철 승하차 데이터 분석을 완주했습니다. 다음 프로젝트는 미세먼지 데이터입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">프로젝트 1을 완주했습니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 프로젝트: 미세먼지 데이터</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function SubwayVisualizeTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
