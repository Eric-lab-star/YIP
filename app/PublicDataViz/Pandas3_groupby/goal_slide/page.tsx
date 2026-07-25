"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 조건으로 데이터를 걸러내고 정렬하는 법을 배웠습니다. 오늘은 비슷한 것끼리 묶어서 한눈에 요약하는 법을 배우겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					pandas 기초 (3)
				</h1>
				<p className="text-2xl text-gray-500 mt-2">그룹으로 묶어 요약하기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, groupby로 데이터를 그룹으로 묶을 수 있어야 합니다. 둘째, 그룹별 평균, 합계 등을 한 번에 구할 수 있어야 합니다. 셋째, value_counts로 값의 개수를 세어볼 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "groupby()로 데이터를 그룹으로 묶을 수 있다" },
					{ num: "2", text: "그룹별 평균, 합계 등을 한 번에 구할 수 있다" },
					{ num: "3", text: "value_counts()로 값의 개수를 세어볼 수 있다" },
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
		title: "groupby로 묶어보기",
		bg: "from-green-50 to-emerald-50",
		script: "구별로 지하철역 승차인원의 평균이 얼마나 될지 궁금할 때 groupby를 씁니다. groupby 구는 구 열의 같은 값끼리 묶겠다는 뜻입니다. 그 뒤에 승차인원 mean을 붙이면 그룹마다 평균을 계산해줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`구별평균 = df.groupby("구")["승차인원"].mean()
print(구별평균)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">groupby(&quot;열&quot;) = 같은 값끼리 묶기</p>
				</div>
			</div>
		),
	},
	{
		title: "여러 통계를 한 번에",
		bg: "from-cyan-50 to-blue-50",
		script: "평균만 궁금한 게 아니라 합계, 개수도 같이 보고 싶을 땐 agg를 씁니다. 리스트 안에 원하는 통계 함수 이름을 문자열로 나열하면 됩니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">.mean() 처럼 하나만</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>그룹별 평균 딱 하나만 계산</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">.agg([...]) 로 여러 개</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>평균, 합계, 개수를 한 번에</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "agg 코드로 확인하기",
		bg: "from-purple-50 to-pink-50",
		script: "코드로 확인해보겠습니다. mean, sum, count를 리스트로 넣으면 그룹별로 세 가지 통계를 한 번에 표로 보여줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`요약 = df.groupby("구")["승차인원"].agg(["mean", "sum", "count"])
print(요약)`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">&quot;mean&quot;, &quot;sum&quot;, &quot;count&quot;, &quot;max&quot;, &quot;min&quot; 등을 조합</p>
				</div>
			</div>
		),
	},
	{
		title: "value_counts로 개수 세기",
		bg: "from-teal-50 to-cyan-50",
		script: "각 구에 지하철역이 몇 개씩 있는지처럼, 값이 몇 번씩 나오는지 세고 싶을 땐 value_counts를 씁니다. 기본적으로 개수가 많은 순서로 결과를 보여줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`구별역개수 = df["구"].value_counts()
print(구별역개수)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">groupby(다른 열 통계) vs value_counts(그 열 자체 개수)</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. groupby로 그룹을 묶습니다. agg로 여러 통계를 한 번에 구합니다. value_counts로 값의 개수를 셉니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">groupby(&quot;열&quot;)로 그룹 묶기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">agg([&quot;mean&quot;,&quot;sum&quot;,&quot;count&quot;])로 여러 통계</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">value_counts()로 값의 개수 세기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 흩어진 데이터를 그룹으로 묶어 한눈에 요약할 수 있게 되었습니다. 다음 시간에는 데이터에 숨어있는 빈 값과 이상한 값을 정리하는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 빈 값과 이상한 값 정리하기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function Pandas3GroupbyGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
