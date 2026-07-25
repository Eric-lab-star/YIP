"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 melt와 groupby로 혼잡 시간대를 직접 찾겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">⏰</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 1 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">혼잡 시간대 찾기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas 패키지 설치 확인" },
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
		title: "미션 1: melt로 세로로 펼치기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 시간대별로 흩어진 열을 하나로 모읍니다. 넓은 형태를 긴 형태로 바꾸는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`길게 = pd.____(df, id_vars=["역명"], ...)  # melt`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: melt</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 시간대별 평균 구하기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. groupby로 시간대별 평균 승차인원을 구합니다. 그룹으로 묶을 기준 열 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`시간대평균 = 길게.groupby(____)["승차인원"].mean()  # "시간대"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;시간대&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 가장 붐비는 시간대 찾기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 가장 혼잡한 시간대의 이름을 찾습니다. 가장 큰 값을 가진 이름을 찾는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`가장붐비는시간대 = 시간대평균.____()  # idxmax`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">max()는 값, idxmax()는 이름!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. melt로 펼치고, 시간대별 평균을 구하고, 가장 붐비는 시간대를 찾았습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "melt로 세로로 펼치기", color: "bg-rose-100" },
						{ num: "2", text: "groupby로 시간대별 평균 구하기", color: "bg-violet-100" },
						{ num: "3", text: "idxmax로 가장 붐비는 시간대 찾기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 진짜 데이터에서 패턴을 찾아낼 수 있게 되었습니다. 다음 시간에는 결과를 그래프로 시각화하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 지하철 데이터 시각화</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function SubwayTimeAnalysisTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
