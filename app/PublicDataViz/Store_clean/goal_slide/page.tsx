"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 아파트 프로젝트를 완주한 것을 축하합니다. 네 번째 프로젝트는 상가 정보 데이터입니다. 우리 동네에 어떤 가게가 있는지 지도로 그려볼 건데, 먼저 데이터를 깨끗하게 정리해야 합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🏪</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 4 — 상가
				</h1>
				<p className="text-2xl text-gray-500 mt-2">정보 정제</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 데이터의 출처와 라이선스를 확인할 수 있어야 합니다. 둘째, 원하는 업종만 조건 필터링으로 골라낼 수 있어야 합니다. 셋째, 지도에 꼭 필요한 위도·경도 결측치를 제거할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "상가 정보 데이터의 출처와 라이선스를 확인할 수 있다" },
					{ num: "2", text: "원하는 업종만 조건 필터링으로 골라낼 수 있다" },
					{ num: "3", text: "위도·경도 결측치를 제거할 수 있다" },
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
		title: "상가 정보 데이터 출처",
		bg: "from-green-50 to-emerald-50",
		script: "이번 프로젝트 데이터는 소상공인시장진흥공단 상가정보에서 제공하며 공공누리 제1유형입니다. 상가 정보는 보통 수십만 개 행이 넘는 큰 데이터입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700">📍 제공처: 소상공인시장진흥공단 상가(상권)정보</p>
					<p className="text-lg text-gray-700 mt-2">📄 라이선스: 공공누리 제1유형</p>
				</div>
			</div>
		),
	},
	{
		title: "원하는 업종만 골라내기",
		bg: "from-cyan-50 to-blue-50",
		script: "조건 필터링을 다시 활용해서 카페만 골라봅니다. ==은 같다는 뜻의 비교 연산자입니다. 업종이 정확히 카페인 행만 골라집니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`카페만 = df[df["업종"] == "카페"]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">df[df[&quot;열&quot;] == &quot;값&quot;]로 정확히 일치하는 행만 골라내기</p>
				</div>
			</div>
		),
	},
	{
		title: "전체 데이터 vs 필터링된 데이터",
		bg: "from-purple-50 to-pink-50",
		script: "전체 상가 데이터는 여러 업종이 섞여있어 한눈에 보기 어렵지만, 카페만 필터링하면 관심 있는 업종만 남아 분석이 훨씬 쉬워집니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📋 전체 상가 데이터</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>여러 업종이 섞여 있음</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">☕ 카페만 필터링</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>관심 있는 업종만 남김</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "위도·경도 결측치 제거하기",
		bg: "from-teal-50 to-cyan-50",
		script: "다음 시간에 folium으로 지도에 마커를 찍을 건데, 좌표가 없으면 지도에 찍을 수 없습니다. subset으로 위도, 경도 열만 확인해서 결측치를 제거합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`지도용 = 카페만.dropna(subset=["위도", "경도"])`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 subset 지정 = 필요한 열의 결측치만 확인</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 데이터 출처를 확인합니다. 조건 필터링으로 업종을 고릅니다. dropna subset으로 좌표 결측치를 제거합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 데이터 출처·라이선스 확인하기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ df[df[&quot;열&quot;] == &quot;값&quot;]로 업종 필터링</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ dropna(subset=[...])로 좌표 결측치 제거</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 지도에 찍을 준비가 된 깨끗한 상가 데이터를 만들 수 있게 되었습니다. 다음 시간에는 진짜 지도에 마커를 찍겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 상가 정보 folium 마커 시각화</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function StoreCleanGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
