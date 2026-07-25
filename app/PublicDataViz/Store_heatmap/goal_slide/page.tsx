"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 마커와 클러스터로 지도를 만들었습니다. 오늘은 색깔의 진하기로 밀집도를 보여주는 히트맵을 만들겠습니다. 프로젝트 4의 마지막 시간입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🔥</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 4 — 상가
				</h1>
				<p className="text-2xl text-gray-500 mt-2">밀집도 히트맵</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, HeatMap이 무엇이고 마커와 어떻게 다른지 알아야 합니다. 둘째, 좌표 목록으로 히트맵을 그릴 수 있어야 합니다. 셋째, 분석 결과를 결론 문장으로 정리할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "HeatMap이 마커와 어떻게 다른지 안다" },
					{ num: "2", text: "좌표 목록으로 히트맵을 그릴 수 있다" },
					{ num: "3", text: "분석 결과를 결론 문장으로 정리할 수 있다" },
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
		title: "히트맵이란?",
		bg: "from-green-50 to-emerald-50",
		script: "마커는 가게 하나하나의 위치를 정확히 표시하지만, 히트맵은 근처에 가게가 얼마나 몰려있는지를 색깔로 보여줍니다. 가게가 많이 몰린 곳일수록 빨갛고 진하게 표시됩니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📍 마커 (지난 시간)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>가게 하나하나의 정확한 위치</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">🔥 히트맵 (오늘)</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>밀집 정도를 색깔로 표현</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "히트맵 그리기",
		bg: "from-cyan-50 to-blue-50",
		script: "히트맵은 folium.plugins의 HeatMap을 씁니다. 마커처럼 하나씩 반복문을 돌 필요 없이 좌표 목록을 통째로 넘기면 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`좌표목록 = df[["위도", "경도"]].values.tolist()
HeatMap(좌표목록).add_to(m)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">values.tolist()로 [[위도,경도], ...] 형태 변환</p>
				</div>
			</div>
		),
	},
	{
		title: "결론 정리하기",
		bg: "from-purple-50 to-pink-50",
		script: "groupby를 다시 활용해서 어느 동네에 상가가 가장 많은지 숫자로도 확인하고 결론을 내립니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`동별개수 = df2["동"].value_counts()
가장많은동 = 동별개수.idxmax()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 히트맵(그림) + value_counts(숫자) 함께 보여주기</p>
				</div>
			</div>
		),
	},
	{
		title: "히트맵과 숫자, 둘 다 보여주기",
		bg: "from-teal-50 to-cyan-50",
		script: "히트맵은 지도 위에서 시각적으로 밀집도를 직관적으로 파악하게 해주고, value_counts는 정확한 숫자로 확인하게 해줍니다. 그림만 있으면 근거가 부족하고, 숫자만 있으면 감이 잘 안 옵니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">🔥 히트맵 = 직관적 파악</p>
				</div>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">🔢 value_counts() = 정확한 근거</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 히트맵과 마커의 차이를 이해합니다. values.tolist()로 좌표 목록을 만듭니다. HeatMap과 value_counts로 결론을 정리합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 히트맵 vs 마커의 차이 이해하기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ values.tolist()로 좌표 목록 만들기</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ HeatMap + value_counts로 결론 정리</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이걸로 프로젝트 4, 상가 정보 데이터 분석을 완주했습니다. 다음 프로젝트는 인구 통계 데이터입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🏁</span>
				<h1 className="text-5xl font-bold text-gray-800">프로젝트 4를 완주했습니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 프로젝트: 인구 통계 데이터</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function StoreHeatmapGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
