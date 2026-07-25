"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 미세먼지 프로젝트를 완주한 것을 축하합니다. 세 번째 프로젝트는 아파트 실거래가 데이터입니다. 오늘은 전체 가격이 대략 어떻게 분포되어 있는지 파악해보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 3 — 아파트
				</h1>
				<p className="text-2xl text-gray-500 mt-2">실거래가 분포</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 데이터의 출처와 라이선스를 확인할 수 있어야 합니다. 둘째, describe로 가격의 기본 통계를 한 번에 볼 수 있어야 합니다. 셋째, 히스토그램으로 가격이 어느 구간에 몰려있는지 파악할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "아파트 실거래가 데이터의 출처와 라이선스를 확인할 수 있다" },
					{ num: "2", text: "describe()로 가격의 기본 통계를 볼 수 있다" },
					{ num: "3", text: "히스토그램으로 가격 분포를 파악할 수 있다" },
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
		title: "데이터 출처와 기본 통계",
		bg: "from-green-50 to-emerald-50",
		script: "이번 프로젝트 데이터는 국토교통부 실거래가 공개시스템에서 제공하며 공공누리 제1유형입니다. describe는 개수, 평균, 표준편차, 최솟값, 중앙값, 최댓값을 한 번에 보여줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print(df["거래금액"].describe())
# count, mean, std, min, 25%, 50%, 75%, max`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">출처: 국토교통부 실거래가 공개시스템, 공공누리 제1유형</p>
				</div>
			</div>
		),
	},
	{
		title: "boxplot vs histogram",
		bg: "from-cyan-50 to-blue-50",
		script: "상자그림은 중앙값과 사분위수를 요약해서 보여주고, 히스토그램은 가격대별로 몇 건이 있는지 막대로 보여줍니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">상자그림</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>중앙값, 사분위수를 요약</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">히스토그램</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>가격대별 건수를 막대로 표시</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "히스토그램 그리기",
		bg: "from-purple-50 to-pink-50",
		script: "bins은 가격 구간을 몇 개로 나눌지 정하는 옵션입니다. bins가 5면 가장 낮은 가격부터 가장 높은 가격까지를 5개 구간으로 나눠서 보여줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.histplot(data=df, x="거래금액", bins=5)
plt.title("아파트 거래금액 분포")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">bins = 가격 구간의 개수</p>
				</div>
			</div>
		),
	},
	{
		title: "가격대별 건수 세어보기",
		bg: "from-teal-50 to-cyan-50",
		script: "조건 필터링을 활용해서 저가, 중가, 고가 아파트가 각각 몇 건인지 셉니다. len으로 걸러낸 결과의 행 개수를 셉니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`저가 = df[df["거래금액"] < 70000]
print(f"저가: {len(저가)}건")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">len(df[조건]) = 조건을 만족하는 행의 개수</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. describe로 기본 통계를 봅니다. histplot으로 분포를 그립니다. len과 조건 필터링으로 건수를 셉니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">describe()로 기본 통계 확인</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">sns.histplot(bins=)으로 분포 그리기</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">len(df[조건])으로 건수 세기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 아파트 가격이 대략 어떻게 퍼져있는지 파악할 수 있게 되었습니다. 다음 시간에는 평형과 지역에 따라 가격이 어떻게 달라지는지 분석하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 아파트 평형·지역별 분석</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function ApartDistributionGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
