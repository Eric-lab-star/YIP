"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-emerald-50 to-teal-50",
		script: "안녕하세요, 여러분. 지난 시간에는 공공데이터포털을 둘러보았습니다. 오늘은 데이터를 쓰기 전에 꼭 확인해야 할 것, 공공누리 라이선스와 출처 표시에 대해 알아보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					공공누리 라이선스와 출처 표시
				</h1>
				<p className="text-2xl text-gray-500 mt-2">데이터를 책임감 있게 쓰는 법</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 공공누리가 무엇인지 설명할 수 있어야 합니다. 둘째, 공공누리 제1유형의 의미를 이해해야 합니다. 셋째, 데이터를 활용할 때 출처를 표시하는 방법을 알아야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "공공누리(KOGL)가 무엇인지 설명할 수 있다" },
					{ num: "2", text: "공공누리 제1유형의 의미를 이해한다" },
					{ num: "3", text: "출처 표시하는 방법을 안다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-emerald-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "공공누리란 무엇이냥?",
		bg: "from-blue-50 to-indigo-50",
		script: "공공데이터도 저작권이 있습니다. 다만 공공기관은 국민이 낸 세금으로 데이터를 만들었기 때문에, 대부분 아주 널널한 조건으로 자유롭게 쓸 수 있도록 허락해뒀습니다. 이 허락의 기준이 되는 것이 공공누리, KOGL입니다. 공공기관이 만든 저작물을 국민이 자유롭게 이용할 수 있도록 국가가 만든 표준 이용 허락 표시입니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="bg-white/60 rounded-xl p-6">
					<p className="text-xl text-gray-700">
						<strong>공공누리(KOGL)</strong> = 공공기관 저작물을 자유롭게 쓰도록 만든 <strong>표준 이용 허락 표시</strong>
					</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-600">데이터마다 &quot;공공누리 제몇 유형&quot; 마크가 붙어있습니다.</p>
				</div>
			</div>
		),
	},
	{
		title: "공공누리 4가지 유형",
		bg: "from-green-50 to-emerald-50",
		script: "공공누리는 유형에 따라 지켜야 할 규칙이 다릅니다. 제1유형은 출처만 표시하면 상업적 이용까지 자유롭습니다. 제2유형은 출처 표시에 더해 상업적 이용이 금지됩니다. 제3유형은 출처 표시에 더해 내용 변경이 금지됩니다. 제4유형이 가장 엄격해서 상업적 이용과 변경이 모두 금지됩니다. 공공데이터포털의 데이터 대부분은 제1유형입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="overflow-x-auto">
					<table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
						<thead>
							<tr className="bg-gray-800 text-white">
								<th className="p-4 text-left">유형</th>
								<th className="p-4 text-left">지켜야 할 것</th>
							</tr>
						</thead>
						<tbody className="text-gray-700">
							{[
								["제1유형", "출처표시만 하면 자유 이용 (상업적 이용 OK)"],
								["제2유형", "출처표시 + 상업적 이용금지"],
								["제3유형", "출처표시 + 변경금지"],
								["제4유형", "출처표시 + 상업적 이용금지 + 변경금지"],
							].map(([type, rule], i) => (
								<tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
									<td className="p-4 font-semibold">{type}</td>
									<td className="p-4">{rule}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">공공데이터포털 데이터 대부분은 제1유형입니다!</p>
				</div>
			</div>
		),
	},
	{
		title: "출처는 어떻게 표시하냥?",
		bg: "from-cyan-50 to-blue-50",
		script: "출처 표시는 세 가지만 적으면 됩니다. 자료의 출처, 즉 어떤 데이터인지, 제공 기관, 즉 누가 만들었는지, 그리고 공공누리 유형입니다. 예를 들어 보고서 맨 아래에 서울교통공사에서 개방한 지하철 승하차 인원 데이터를 공공누리 제1유형에 따라 이용했다고 적으면 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`본 자료는 서울교통공사에서 개방한
「지하철 승하차 인원」 데이터를
공공누리 제1유형에 따라 이용하였습니다.
(출처: 공공데이터포털)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">자료의 출처 + 제공 기관 + 공공누리 유형, 이 세 가지만 기억하세요!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 공공누리는 공공기관 저작물을 자유롭게 쓰도록 만든 표준 이용 허락 표시입니다. 제1유형은 출처만 표시하면 상업적 이용까지 자유롭습니다. 출처 표시에는 자료 출처, 제공 기관, 공공누리 유형 세 가지를 적습니다. 라이선스 유형은 데이터셋 상세 페이지에서 확인할 수 있습니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">공공누리 = 표준 이용 허락 표시</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">제1유형 = 출처표시만 하면 자유 이용</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">출처 표시 = 자료 출처 + 제공 기관 + 유형</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-emerald-50 to-teal-50",
		script: "오늘 강의를 마치겠습니다. 데이터를 마음대로가 아니라 약속을 지키며 쓰는 법을 배웠습니다. 다음 시간에는 드디어 진짜 열쇠, 오픈 API 인증키를 발급받아보겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: Open API 인증키 발급받기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function OpenLicenseSourceGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
