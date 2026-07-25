"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 빈 값과 중복을 직접 청소하는 연습을 하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🧹</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">데이터 클리닝 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">지저분한 데이터 청소하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas와 numpy 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ icon: "📦", text: "pandas, numpy 패키지 설치 확인" },
					].map((item, i) => (
						<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
							<span className="text-3xl">{item.icon}</span>
							<p className="text-xl text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "미션 1: 빈 값 개수 세어보기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 미세먼지 열의 빈 값이 몇 개인지 세어봅니다. isna로 True/False를 만들고 sum으로 개수를 셉니다. 결과가 2로 나오는지 확인합니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`빈값개수 = df["미세먼지"].____().sum()  # isna`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: isna</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 빈 값을 평균으로 채우기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 빈 값을 버리지 않고 평균값으로 채웁니다. 빈 값을 채우는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`채워진_df = df.____({"미세먼지": 평균값})  # fillna`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 df.fillna(...)는 원본을 바꾸지 않고 새 결과를 돌려줍니다</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 중복된 행 제거하기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 중복으로 들어간 측정소 데이터를 정리합니다. 중복 행을 제거하는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`정리됨 = df2.____()  # drop_duplicates`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 모든 열의 값이 전부 같은 행만 중복으로 인식합니다</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 빈 값 개수를 세고, 평균으로 채우고, 중복 행을 제거했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "isna로 빈 값 개수 세기", color: "bg-rose-100" },
						{ num: "2", text: "fillna로 빈 값 채우기", color: "bg-violet-100" },
						{ num: "3", text: "drop_duplicates로 중복 제거", color: "bg-teal-100" },
					].map((item) => (
						<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
							<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
							<p className="text-lg text-gray-700">{item.text} ✅</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 실습을 마치겠습니다. 지저분한 공공데이터도 이제 깨끗하게 정리할 수 있게 되었습니다. 다음 시간에는 정리한 데이터를 그래프로 그려보는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎉</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: matplotlib으로 그래프 그리기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function DataCleaningTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
