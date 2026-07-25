"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 상가 정보 프로젝트를 완주한 것을 축하합니다. 마지막 다섯 번째 프로젝트는 인구 통계 데이터입니다. 오늘은 연령대별로 남녀 인구가 어떻게 다른지 비교하겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 5 — 인구
				</h1>
				<p className="text-2xl text-gray-500 mt-2">통계 비교 그래프</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 데이터의 출처와 라이선스를 확인할 수 있어야 합니다. 둘째, 남녀로 나뉜 열을 melt로 하나의 열로 모을 수 있어야 합니다. 셋째, hue 옵션으로 연령대별 남녀 인구를 그룹 막대 그래프로 비교할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "인구 통계 데이터의 출처와 라이선스를 확인할 수 있다" },
					{ num: "2", text: "남녀로 나뉜 열을 melt()로 모을 수 있다" },
					{ num: "3", text: "hue로 연령대별 남녀 인구를 비교할 수 있다" },
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
		title: "인구 데이터 출처와 형태",
		bg: "from-green-50 to-emerald-50",
		script: "이번 프로젝트 데이터는 행정안전부 주민등록인구현황에서 제공하며 공공누리 제1유형입니다. 이 데이터는 남자와 여자가 각각 다른 열로 나뉘어 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">제공처: 행정안전부 주민등록인구현황</p>
					<p className="text-lg text-gray-700 mt-2">라이선스: 공공누리 제1유형</p>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">&quot;남자&quot;, &quot;여자&quot;가 각각 다른 열</p>
				</div>
			</div>
		),
	},
	{
		title: "펼치기 전 vs 펼친 후",
		bg: "from-cyan-50 to-blue-50",
		script: "남자, 여자 열을 성별이라는 하나의 열로 모으면 hue로 비교할 수 있게 됩니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">펼치기 전</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>연령대 | 남자 | 여자</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">펼친 후</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>연령대 | 성별 | 인구수</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "melt로 성별 열 만들기",
		bg: "from-purple-50 to-pink-50",
		script: "프로젝트 1에서 배운 melt를 그대로 씁니다. id_vars, value_vars, var_name, value_name 패턴은 동일합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`길게 = pd.melt(df, id_vars=["연령대"],
    value_vars=["남자", "여자"],
    var_name="성별", value_name="인구수")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">프로젝트 1과 똑같은 melt 패턴 재사용</p>
				</div>
			</div>
		),
	},
	{
		title: "hue로 그룹 막대 그래프",
		bg: "from-teal-50 to-cyan-50",
		script: "x는 가로축에 늘어설 큰 그룹, hue는 그 안에서 다시 나뉘는 작은 그룹입니다. 연령대 하나에 남자, 여자 막대가 나란히 붙어서 비교하기 쉬워집니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.barplot(data=길게, x="연령대", y="인구수", hue="성별")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">x=큰 그룹, hue=그 안의 작은 그룹</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 데이터 출처를 확인합니다. melt로 성별 열을 만듭니다. hue로 그룹 막대 그래프를 그립니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">데이터 출처·라이선스 확인하기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">pd.melt()로 성별 열 만들기</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">sns.barplot(hue=)로 그룹 비교</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 연령대별 남녀 인구를 한눈에 비교할 수 있게 되었습니다. 다음 시간에는 인구 구조를 한눈에 보여주는 인구 피라미드를 그리겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 인구 피라미드 그리기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function PopulationCompareGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
