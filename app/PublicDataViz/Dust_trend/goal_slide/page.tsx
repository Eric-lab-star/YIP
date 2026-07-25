"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지하철 프로젝트를 완주한 것을 축하합니다. 두 번째 프로젝트는 미세먼지 데이터입니다. 오늘은 날짜별 미세먼지 값을 시간 순서로 정리하고, 시간에 따른 변화를 살펴보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🌫️</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 2 — 미세먼지
				</h1>
				<p className="text-2xl text-gray-500 mt-2">추이 분석</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 데이터의 출처와 라이선스를 확인할 수 있어야 합니다. 둘째, 문자열 날짜를 datetime 타입으로 바꿀 수 있어야 합니다. 셋째, 날짜순 정렬로 미세먼지 추이를 선 그래프로 그릴 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "미세먼지 데이터의 출처와 라이선스를 확인할 수 있다" },
					{ num: "2", text: "문자열 날짜를 datetime 타입으로 바꿀 수 있다" },
					{ num: "3", text: "날짜순 정렬로 미세먼지 추이를 선 그래프로 그릴 수 있다" },
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
		title: "미세먼지 데이터 출처",
		bg: "from-green-50 to-emerald-50",
		script: "이번 프로젝트 데이터는 에어코리아 또는 서울열린데이터광장에서 제공하며 공공누리 제1유형입니다. 미세먼지 데이터는 보통 날짜와 측정소별 수치가 함께 들어있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">📍 제공처: 에어코리아 / 서울열린데이터광장</p>
					<p className="text-lg text-gray-700 mt-2">📄 라이선스: 공공누리 제1유형</p>
				</div>
			</div>
		),
	},
	{
		title: "날짜를 진짜 날짜로 바꾸기",
		bg: "from-cyan-50 to-blue-50",
		script: "CSV에서 날짜를 읽으면 파이썬은 그걸 그냥 문자열로 취급합니다. to_datetime으로 진짜 날짜 시간 타입으로 바꿔줘야 정렬이나 필터링이 정확해집니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`df["날짜"] = pd.to_datetime(df["날짜"])
print(df["날짜"].dtype)  # datetime64`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">문자열 날짜 → pd.to_datetime() → datetime64</p>
				</div>
			</div>
		),
	},
	{
		title: "문자열 날짜 vs datetime 날짜",
		bg: "from-purple-50 to-pink-50",
		script: "문자열 날짜는 글자 순서로 비교되어 틀린 결과가 나올 수 있지만, datetime 날짜는 진짜 날짜로 비교되고 정렬됩니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📄 문자열 날짜</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>글자 순서로 비교되어 오류 가능</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">📅 datetime 날짜</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>진짜 날짜로 정확히 비교·정렬</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "정렬하고 추이 그리기",
		bg: "from-teal-50 to-cyan-50",
		script: "날짜 타입으로 바꿨다면 sort_values로 날짜순 정렬을 하고 선 그래프로 추이를 그립니다. 선 그래프는 x축이 순서대로 있을 때 의미가 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`정렬됨 = df.sort_values("날짜")
plt.plot(정렬됨["날짜"], 정렬됨["미세먼지"])`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 정렬 → plt.plot() 순서를 꼭 지키기</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 데이터 출처를 확인합니다. to_datetime으로 날짜 타입을 바꿉니다. sort_values와 plot으로 추이를 그립니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 데이터 출처·라이선스 확인하기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ pd.to_datetime()으로 날짜 타입 변환</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ sort_values() + plt.plot()으로 추이 그리기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 날짜가 있는 데이터도 자신 있게 다룰 수 있게 되었습니다. 다음 시간에는 여러 지역의 미세먼지를 비교하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 미세먼지 지역 비교</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function DustTrendGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
