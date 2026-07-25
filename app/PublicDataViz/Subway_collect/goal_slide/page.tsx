"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 기초 과정을 전부 마친 것을 축하합니다. 이제부터는 진짜 공공데이터 하나를 끝까지 파헤치는 프로젝트를 시작합니다. 첫 번째 프로젝트는 서울시 지하철 승하차 데이터입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 1 — 지하철
				</h1>
				<p className="text-2xl text-gray-500 mt-2">승하차 데이터 수집·정제</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 데이터의 출처와 라이선스를 확인할 수 있어야 합니다. 둘째, 필요한 열만 골라내고 이해하기 쉬운 이름으로 바꿀 수 있어야 합니다. 셋째, 결측치와 이상치를 점검해서 데이터를 정리할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "데이터의 출처와 라이선스를 확인할 수 있다" },
					{ num: "2", text: "필요한 열만 골라내고 이름을 바꿀 수 있다" },
					{ num: "3", text: "결측치와 이상치를 점검해서 정리할 수 있다" },
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
		title: "데이터 출처 확인하기",
		bg: "from-green-50 to-emerald-50",
		script: "데이터를 다루기 전에 이 데이터가 어디서 왔고 어떻게 써도 되는지 꼭 확인해야 합니다. 이번 프로젝트 데이터는 서울열린데이터광장에서 제공하며 공공누리 제1유형입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">제공처: 서울열린데이터광장 (data.seoul.go.kr)</p>
					<p className="text-lg text-gray-700 mt-2">라이선스: 공공누리 제1유형</p>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">실제 파일 대신 같은 구조의 작은 예시 데이터로 연습합니다</p>
				</div>
			</div>
		),
	},
	{
		title: "원본 데이터의 현실",
		bg: "from-cyan-50 to-blue-50",
		script: "실제 공공데이터는 지금까지 연습한 깔끔한 예시와 달리, 열 이름이 길고 결측치나 이상한 값이 섞여 있는 경우가 흔합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`승차총승객수: [452300, 298100, 187600, -1]   # -1은 이상치
하차총승객수: [447800, 301200, None, 96200]  # None은 결측치`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">긴 열 이름 + 결측치 + 이상치 = 실전 데이터</p>
				</div>
			</div>
		),
	},
	{
		title: "필요한 열만 골라 이름 정리하기",
		bg: "from-purple-50 to-pink-50",
		script: "당장 필요 없는 열은 빼두고, 다루기 쉬운 이름으로 바꿉니다. df 대괄호 대괄호로 먼저 필요한 열만 고른 뒤, rename으로 이름을 바꿉니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`정리 = df[["호선명", "역명", "승차총승객수", "하차총승객수"]].rename(
    columns={"승차총승객수": "승차", "하차총승객수": "하차"}
)`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">rename(columns={`{"기존이름": "새이름"}`})</p>
				</div>
			</div>
		),
	},
	{
		title: "결측치와 이상치 점검하기",
		bg: "from-teal-50 to-cyan-50",
		script: "결측치는 isna로, 이상치는 조건 필터링으로 찾습니다. 찾은 문제는 fillna로 채우거나 조건으로 제거합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`이상치 = 정리[정리["승차"] < 0]
정리["하차"] = 정리["하차"].fillna(0)
정리 = 정리[정리["승차"] >= 0]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">열 고르기 → 결측치 확인 → 이상치 확인 → 처리하기</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 데이터 출처를 확인합니다. rename으로 열 이름을 정리합니다. isna와 조건 필터링으로 결측치와 이상치를 처리합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">데이터 출처·라이선스 확인하기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">rename(columns=...)으로 열 이름 정리</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">결측치·이상치 점검하고 정리하기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 지저분한 지하철 데이터도 깨끗하게 다룰 수 있게 되었습니다. 다음 시간에는 이 데이터로 출퇴근 시간대를 분석하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 지하철 시간대별 분석</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function SubwayCollectGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
