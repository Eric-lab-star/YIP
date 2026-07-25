"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 지역별 미세먼지를 직접 비교하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 2 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">지역별 미세먼지 비교하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas, seaborn, matplotlib 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas, seaborn, matplotlib 패키지 설치 확인" },
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
		title: "미션 1: 지역별 평균 막대 그래프 그리기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 지역별 평균 미세먼지를 막대 그래프로 비교합니다. 막대 그래프를 그리는 seaborn 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.____(data=지역평균, x="지역", y="미세먼지")  # barplot`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: barplot</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 상자그림으로 분포 비교하기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 상자그림으로 지역별 분포를 살펴봅니다. 상자그림을 그리는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.____(data=df, x="지역", y="미세먼지")  # boxplot`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">상자가 길수록 들쭉날쭉!</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 기준치를 넘는 지역 찾기 (7~8분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 평균이 35를 넘는 위험 지역만 골라냅니다. 기준치 변수 이름을 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`위험지역 = 지역평균[지역평균["미세먼지"] > ____]  # 기준치`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: 기준치</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 막대 그래프와 상자그림으로 비교하고, 위험 지역을 찾았습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "지역별 평균 막대 그래프 그리기", color: "bg-rose-100" },
						{ num: "2", text: "상자그림으로 분포 비교하기", color: "bg-violet-100" },
						{ num: "3", text: "기준치를 넘는 지역 찾기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 여러 지역을 다양한 방법으로 비교할 수 있게 되었습니다. 다음 시간에는 미세먼지 대시보드를 만들겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 미세먼지 대시보드 만들기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function DustCompareTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
