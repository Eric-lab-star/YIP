"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-sky-50 to-blue-50",
		script: "안녕하세요, 여러분. 오늘부터 대한민국 곳곳의 공공데이터를 파이썬으로 수집하고, 분석하고, 지도와 그래프로 그려보는 여행을 시작합니다. 첫 시간인 오늘은 공공데이터가 무엇인지부터 알아보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🗂️</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					공공데이터가 뭐냥?
				</h1>
				<p className="text-2xl text-gray-500 mt-2">
					공공데이터 분석·시각화 첫 시간
				</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표를 확인하겠습니다. 첫째, 공공데이터가 무엇인지 설명할 수 있어야 합니다. 둘째, 공공데이터로 어떤 일을 할 수 있는지 예시를 들 수 있어야 합니다. 셋째, 공공데이터포털이 어떤 사이트인지 이해하고 둘러볼 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "공공데이터가 무엇인지 설명할 수 있다" },
					{ num: "2", text: "공공데이터로 할 수 있는 일을 예시로 들 수 있다" },
					{ num: "3", text: "공공데이터포털이 어떤 사이트인지 이해한다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-sky-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "나라가 공짜로 열어준 데이터 창고",
		bg: "from-blue-50 to-indigo-50",
		script: "우리 동네 지하철역에는 하루에 몇 명이 타고 내릴까요? 우리 동네 미세먼지는 다른 동네보다 심할까요? 놀랍게도 이런 질문의 답은 이미 누군가 조사해서 데이터로 만들어뒀습니다. 바로 정부와 지방자치단체, 공공기관들입니다. 공공데이터란, 공공기관이 만들거나 관리하는 데이터 중에서 국민 누구나 쓸 수 있도록 공개한 데이터를 말합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="bg-white/60 rounded-xl p-6">
					<p className="text-xl text-gray-700">
						<strong>공공데이터</strong> = 공공기관이 조사해서 <strong>국민 누구나 쓸 수 있도록</strong> 공개한 데이터
					</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-600">지하철 승하차 인원, 대기오염 측정값, 아파트 실거래가, 인구 통계... 우리 생활과 밀접한 정보가 가득합니다!</p>
				</div>
			</div>
		),
	},
	{
		title: "공공데이터로 뭘 할 수 있냥?",
		bg: "from-purple-50 to-pink-50",
		script: "공공데이터는 그냥 숫자 덩어리가 아닙니다. 지하철 승하차 데이터로 가장 붐비는 역과 시간대를 찾을 수 있고, 미세먼지 데이터로 우리 동네 공기질을 실시간으로 확인할 수 있습니다. 이번 학기 동안 지하철, 미세먼지, 아파트 실거래가, 상가 정보, 인구 통계까지 다섯 가지 공공데이터를 직접 다뤄보고, 마지막에는 여러분이 직접 고른 주제로 캡스톤 프로젝트도 만들어봅니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
						<p className="text-lg font-bold text-blue-700 mb-2">🚇 지하철 승하차 데이터</p>
						<ul className="text-base text-gray-600 space-y-1">
							<li>가장 붐비는 역과 시간대 찾기</li>
							<li>출퇴근 시간 혼잡도 비교하기</li>
						</ul>
					</div>
					<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
						<p className="text-lg font-bold text-purple-700 mb-2">🌫️ 미세먼지 데이터</p>
						<ul className="text-base text-gray-600 space-y-1">
							<li>우리 동네 공기질 실시간 확인</li>
							<li>지역별 대기오염 지도 만들기</li>
						</ul>
					</div>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">이번 학기: 지하철 · 미세먼지 · 아파트 실거래가 · 상가 정보 · 인구 통계 + 나만의 캡스톤 프로젝트!</p>
				</div>
			</div>
		),
	},
	{
		title: "공공데이터포털이 뭐냥?",
		bg: "from-green-50 to-emerald-50",
		script: "이 귀한 데이터들은 어디서 구할 수 있을까요? 바로 공공데이터포털, data.go.kr 입니다. 행정안전부가 운영하며, 파일 데이터와 오픈 API 형태로 수만 건의 데이터가 올라와 있습니다. 대부분 회원가입만 하면 무료로 쓸 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`www.data.go.kr
운영: 행정안전부(대한민국 정부)
비용: 대부분 무료 (회원가입만 하면 충분)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">파일 데이터(CSV·엑셀) + Open API(실시간 데이터), 두 가지 형태로 제공됩니다.</p>
				</div>
			</div>
		),
	},
	{
		title: "파일 데이터 vs Open API",
		bg: "from-cyan-50 to-blue-50",
		script: "공공데이터포털에는 크게 두 가지 방식으로 데이터가 올라와 있습니다. 파일 데이터는 CSV나 엑셀 파일을 통째로 내려받는 방식으로, 보통 어제까지의 과거 기록입니다. 오픈 API는 인증키로 요청하면 실시간으로 데이터를 주는 방식으로, 미세먼지처럼 지금 이 순간의 데이터에 어울립니다. 오픈 API는 인증키라는 열쇠가 필요한데, 그건 3차시에서 발급받는 법을 배웁니다.",
		content: (
			<div className="overflow-x-auto">
				<table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
					<thead>
						<tr className="bg-gray-800 text-white">
							<th className="p-4 text-left"></th>
							<th className="p-4 text-left">파일 데이터 📁</th>
							<th className="p-4 text-left">Open API 🔌</th>
						</tr>
					</thead>
					<tbody className="text-gray-700">
						{[
							["받는 방법", "CSV·엑셀 통째로 다운로드", "인증키로 코드에서 요청"],
							["특징", "한 번 받으면 끝", "요청할 때마다 최신 데이터"],
							["어울리는 데이터", "과거 기록 (실거래가 등)", "실시간 데이터 (미세먼지 등)"],
						].map(([label, file, api], i) => (
							<tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
								<td className="p-4 font-semibold">{label}</td>
								<td className="p-4">{file}</td>
								<td className="p-4">{api}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 공공데이터는 공공기관이 국민 누구나 쓸 수 있도록 공개한 데이터입니다. 공공데이터포털은 data.go.kr이며 행정안전부가 운영합니다. 데이터는 파일 데이터와 오픈 API, 두 가지 방식으로 제공됩니다. 이번 학기에는 지하철, 미세먼지, 아파트, 상가, 인구 통계를 다루고 캡스톤 프로젝트로 마무리합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 공공데이터 = 공공기관이 공개한, 누구나 쓸 수 있는 데이터</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 공공데이터포털(data.go.kr) = 행정안전부 운영</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 파일 데이터(다운로드) vs Open API(인증키 필요)</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-sky-50 to-blue-50",
		script: "오늘 강의를 마치겠습니다. 공공데이터가 무엇인지, 어디서 구할 수 있는지 감을 잡았습니다. 다음 시간에는 이 데이터를 마음대로 써도 되는지, 쓸 때 무엇을 지켜야 하는지 알아보겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 공공누리 라이선스와 출처 표시</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function PublicDataIntroGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
