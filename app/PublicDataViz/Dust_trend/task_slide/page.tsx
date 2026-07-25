"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 미세먼지 날짜 데이터를 정리하고 추이를 그리겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 2 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">미세먼지 추이 직접 그리기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas와 matplotlib 패키지가 필요합니다. 데이터 출처는 에어코리아, 공공누리 제1유형입니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas, matplotlib 패키지 설치 확인" },
						{ text: "출처: 에어코리아(예시), 공공누리 제1유형" },
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
		title: "미션 1: 날짜를 datetime으로 바꾸기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 문자열 날짜를 진짜 날짜 타입으로 바꿉니다. 문자열을 날짜 타입으로 바꾸는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`df["날짜"] = pd.____(df["날짜"])  # to_datetime`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: to_datetime</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 날짜순으로 정렬하기 (7~8분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 날짜 순서대로 데이터를 정렬합니다. 값을 기준으로 정렬하는 함수 이름을 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`정렬됨 = df.____("날짜")  # sort_values`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: sort_values</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 추이 선 그래프 그리기 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 정렬한 데이터로 미세먼지 추이를 그립니다. 선 그래프를 그리는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`plt.rcParams["font.family"] = "Malgun Gothic"

plt.____(정렬됨["날짜"], 정렬됨["미세먼지"])  # plot`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: plot</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 날짜를 datetime으로 바꾸고, 정렬하고, 추이 그래프를 그렸습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "날짜를 datetime으로 바꾸기", color: "bg-rose-100" },
						{ num: "2", text: "날짜순으로 정렬하기", color: "bg-violet-100" },
						{ num: "3", text: "추이 선 그래프 그리기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 날짜가 있는 데이터도 자신 있게 다룰 수 있게 되었습니다. 다음 시간에는 여러 지역의 미세먼지를 비교하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 미세먼지 지역 비교</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function DustTrendTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
