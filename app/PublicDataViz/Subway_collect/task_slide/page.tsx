"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 지하철 데이터를 직접 정리하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 1 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">지하철 데이터 직접 정리하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas 패키지가 필요합니다. 데이터 출처는 서울열린데이터광장, 공공누리 제1유형입니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas 패키지 설치 확인" },
						{ text: "출처: 서울열린데이터광장, 공공누리 제1유형" },
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
		title: "미션 1: 필요한 열만 골라 이름 정리하기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 원본 데이터에서 필요한 열만 고르고 이름을 정리합니다. 승차총승객수를 바꿀 새 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`정리 = df[[...]].rename(
    columns={"승차총승객수": ____, "하차총승객수": "하차"}
)  # "승차"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;승차&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 결측치와 이상치 찾아보기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 빈 값과 이상한 값이 섞인 데이터를 점검합니다. 빈 값을 표시하는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`빈값 = df2.____().sum()  # isna
이상치 = df2[df2["승차"] < 0]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: isna</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 결측치·이상치 처리하기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 찾아낸 문제를 실제로 고칩니다. 빈 값을 채울 숫자와, 승차 인원의 최소 허용값을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`df2["하차"] = df2["하차"].fillna(____)  # 0
df2 = df2[df2["승차"] >= ____]  # 0`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸 모두: 0</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 열을 골라 이름을 정리하고, 결측치·이상치를 찾고, 처리했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "열 골라 이름 정리하기", color: "bg-rose-100" },
						{ num: "2", text: "결측치·이상치 찾아보기", color: "bg-violet-100" },
						{ num: "3", text: "fillna·조건으로 처리하기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 지저분한 지하철 데이터도 깨끗하게 다룰 수 있게 되었습니다. 다음 시간에는 출퇴근 시간대를 분석하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 지하철 시간대별 분석</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function SubwayCollectTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
