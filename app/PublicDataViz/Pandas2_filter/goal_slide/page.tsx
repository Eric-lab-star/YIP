"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 표에서 열과 행을 꺼내는 법을 배웠습니다. 오늘은 한 단계 더 나아가서, 원하는 조건에 맞는 데이터만 골라내는 법과 순서대로 줄 세우는 법을 배우겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🔍</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					pandas 기초 (2)
				</h1>
				<p className="text-2xl text-gray-500 mt-2">조건 필터링과 정렬</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 조건(불리언 마스크)으로 원하는 행만 걸러낼 수 있어야 합니다. 둘째, 여러 조건을 & 와 | 로 조합할 수 있어야 합니다. 셋째, sort_values로 데이터를 크기 순서로 정렬할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "조건(불리언 마스크)으로 원하는 행만 걸러낼 수 있다" },
					{ num: "2", text: "여러 조건을 &, |로 조합할 수 있다" },
					{ num: "3", text: "sort_values()로 데이터를 크기 순서로 정렬할 수 있다" },
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
		title: "조건으로 데이터 걸러내기",
		bg: "from-green-50 to-emerald-50",
		script: "미세먼지가 30보다 심한 측정소만 보고 싶다면 어떻게 할까요? 바로 조건 필터링을 쓰면 됩니다. df 대괄호 미세먼지 초과 30은 각 행이 조건을 만족하는지 True, False로 알려주는 Series를 만듭니다. 이걸 df 대괄호 안에 넣으면 True인 행만 골라냅니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`심한곳 = df[df["미세먼지"] > 30]
print(심한곳)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">조건 → True/False Series → df[조건]으로 True인 행만 추출</p>
				</div>
			</div>
		),
	},
	{
		title: "여러 조건 한꺼번에",
		bg: "from-cyan-50 to-blue-50",
		script: "조건을 두 개 이상 동시에 쓰고 싶을 때는 & 그리고와 | 또는를 씁니다. &는 두 조건을 모두 만족해야 하고, |는 둘 중 하나만 만족해도 됩니다. 각 조건은 꼭 괄호로 감싸야 합니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">➕ & (그리고, AND)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>두 조건을 모두 만족해야 함</li>
						<li>예: 미세먼지 30 초과 AND 45 이하</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">↔️ | (또는, OR)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>둘 중 하나만 만족해도 됨</li>
						<li>예: 측정소가 중구 OR 마포구</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "조건 조합 코드",
		bg: "from-purple-50 to-pink-50",
		script: "코드로 확인해보겠습니다. 각 조건을 괄호로 감싼 뒤 & 나 | 로 연결합니다. 괄호를 빠뜨리면 에러가 나기 쉬우니 꼭 기억해두세요.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`중간 = df[(df["미세먼지"] > 30) & (df["미세먼지"] <= 45)]
특정지역 = df[(df["측정소"] == "중구") | (df["측정소"] == "마포구")]`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 각 조건은 반드시 괄호로 감싸기!</p>
				</div>
			</div>
		),
	},
	{
		title: "순서대로 줄 세우기",
		bg: "from-teal-50 to-cyan-50",
		script: "이번엔 데이터를 순서대로 정렬해봅니다. sort_values를 쓰면 됩니다. 열 이름만 넣으면 오름차순, ascending=False를 추가하면 내림차순으로 정렬됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`오름차순 = df.sort_values("미세먼지")
내림차순 = df.sort_values("미세먼지", ascending=False)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">ascending=False → &quot;오름차순이 아니다&quot; → 내림차순</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. df 조건으로 원하는 행을 걸러냅니다. &와 |로 여러 조건을 조합합니다. sort_values로 순서대로 정렬합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ df[조건]으로 원하는 행만 걸러내기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ (조건1) &amp; (조건2), (조건1) | (조건2)로 조합</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ sort_values(&quot;열&quot;, ascending=False)로 정렬</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 표에서 원하는 데이터만 쏙쏙 찾아낼 수 있게 되었습니다. 다음 시간에는 데이터를 그룹으로 묶어서 한눈에 요약하는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: pandas 기초 (3) 그룹으로 묶어 요약하기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function Pandas2FilterGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
