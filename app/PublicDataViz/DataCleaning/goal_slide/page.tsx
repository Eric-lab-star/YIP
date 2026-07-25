"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 groupby로 데이터를 그룹으로 묶어서 요약했습니다. 오늘은 실제 공공데이터에 흔히 숨어있는 빈 값과 중복된 행을 깨끗하게 청소하는 법을 배우겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🧹</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					데이터 클리닝
				</h1>
				<p className="text-2xl text-gray-500 mt-2">빈 값과 중복 정리하기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, isna로 빈 값이 어디에 있는지 찾을 수 있어야 합니다. 둘째, dropna와 fillna로 빈 값을 처리할 수 있어야 합니다. 셋째, drop_duplicates로 중복된 행을 제거할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "isna()로 빈 값(결측치)이 어디에 있는지 찾을 수 있다" },
					{ num: "2", text: "dropna()와 fillna()로 빈 값을 처리할 수 있다" },
					{ num: "3", text: "drop_duplicates()로 중복된 행을 제거할 수 있다" },
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
		title: "빈 값 찾아내기",
		bg: "from-green-50 to-emerald-50",
		script: "공공데이터에는 측정 장비 고장이나 입력 누락으로 값이 비어있는 경우가 흔합니다. pandas에서 빈 값은 NaN으로 표시됩니다. isna는 각 칸이 빈 값이면 True를 돌려주고, sum을 붙이면 개수를 셀 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print(df.isna())
print(df["미세먼지"].isna().sum())`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">NaN = 빈 값, isna() = True/False로 표시</p>
				</div>
			</div>
		),
	},
	{
		title: "빈 값 처리하기",
		bg: "from-cyan-50 to-blue-50",
		script: "빈 값을 발견했다면 버릴지, 다른 값으로 채울지 결정해야 합니다. dropna는 빈 값이 있는 행을 통째로 삭제하고, fillna는 원하는 값으로 채웁니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">🗑️ dropna() — 버리기</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>빈 값이 있는 행을 통째로 삭제</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">🩹 fillna() — 채우기</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>빈 값을 평균, 0 등으로 대체</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "빈 값 처리 코드",
		bg: "from-purple-50 to-pink-50",
		script: "코드로 확인해보겠습니다. dropna로 통째로 지우거나, fillna로 평균값을 채울 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`평균값 = df["미세먼지"].mean()

정리된_df = df.dropna()
채워진_df = df.fillna({"미세먼지": 평균값})`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 빈 값이 적으면 dropna, 데이터가 귀하면 fillna</p>
				</div>
			</div>
		),
	},
	{
		title: "중복된 행 제거하기",
		bg: "from-teal-50 to-cyan-50",
		script: "같은 데이터를 두 번 내려받아 합치다 보면 완전히 똑같은 행이 중복으로 들어가는 경우가 있습니다. drop_duplicates를 쓰면 처음 것만 남기고 나머지를 제거합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`중복확인 = df2.duplicated()
중복제거 = df2.drop_duplicates()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">duplicated() = True/False 표시, drop_duplicates() = 실제 제거</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. isna로 빈 값을 찾습니다. dropna와 fillna로 처리합니다. drop_duplicates로 중복을 제거합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ isna().sum()으로 빈 값 개수 세기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ dropna() / fillna()로 빈 값 처리</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ drop_duplicates()로 중복 행 제거</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 지저분한 공공데이터도 이제 두렵지 않습니다. 다음 시간에는 정리한 데이터를 그래프로 그려보는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: matplotlib으로 그래프 그리기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function DataCleaningGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
