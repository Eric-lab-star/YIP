"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 상가 데이터를 깨끗하게 정리했습니다. 오늘은 그 데이터를 진짜 지도 위에 마커로 찍어보겠습니다. 기초 과정에서 배운 folium을 다시 활용합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					프로젝트 4 — 상가
				</h1>
				<p className="text-2xl text-gray-500 mt-2">folium 마커 시각화</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 정리한 상가 데이터를 지도에 마커로 찍을 수 있어야 합니다. 둘째, 마커의 아이콘 색을 업종별로 다르게 지정할 수 있어야 합니다. 셋째, MarkerCluster로 많은 마커를 묶어서 표시할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "정리한 상가 데이터를 지도에 마커로 찍을 수 있다" },
					{ num: "2", text: "마커 아이콘 색을 업종별로 다르게 지정할 수 있다" },
					{ num: "3", text: "MarkerCluster로 많은 마커를 묶어서 표시할 수 있다" },
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
		title: "상가 마커 찍기",
		bg: "from-green-50 to-emerald-50",
		script: "기초 과정에서 배운 iterrows와 Marker를 다시 씁니다. location은 지도의 중심, zoom_start는 확대 정도, for 반복문으로 각 행마다 마커를 찍습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`for i, row in df.iterrows():
    folium.Marker(
        location=[row["위도"], row["경도"]],
        popup=row["상호명"],
    ).add_to(m)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">배운 패턴을 그대로 재사용!</p>
				</div>
			</div>
		),
	},
	{
		title: "업종별 아이콘 색 입히기",
		bg: "from-cyan-50 to-blue-50",
		script: "카페는 파란색, 치킨집은 빨간색처럼 업종마다 아이콘 색을 다르게 하면 지도만 봐도 어떤 가게인지 바로 알 수 있습니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">기본 마커</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>모든 마커가 같은 색</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">색이 다른 마커</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>업종마다 다른 색 아이콘</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "아이콘 색 코드",
		bg: "from-purple-50 to-pink-50",
		script: "색상표 딕셔너리의 get 메서드는 값을 찾되 없으면 기본값을 씁니다. 혹시 새로운 업종이 나와도 에러 없이 회색으로 표시됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`색상표 = {"카페": "blue", "치킨": "red", "분식": "green"}
icon=folium.Icon(color=색상표.get(row["업종"], "gray"))`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">딕셔너리.get(키, 기본값)</p>
				</div>
			</div>
		),
	},
	{
		title: "MarkerCluster로 마커 묶기",
		bg: "from-teal-50 to-cyan-50",
		script: "실제 상가 데이터는 마커가 수백, 수천 개가 될 수도 있습니다. MarkerCluster를 쓰면 가까운 마커끼리 숫자로 묶어서 보여줍니다. 마커를 지도가 아니라 클러스터에 붙입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`클러스터 = MarkerCluster().add_to(m2)
folium.Marker(...).add_to(클러스터)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">확대하면 클러스터가 자동으로 풀림</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. iterrows와 Marker로 지도를 만듭니다. Icon color로 색을 입힙니다. MarkerCluster로 마커를 묶습니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">iterrows + Marker로 상가 지도 만들기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">folium.Icon(color=)로 업종별 색 구분</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">MarkerCluster로 많은 마커 묶기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 진짜 지도 위에 상가 데이터를 예쁘게 시각화할 수 있게 되었습니다. 다음 시간에는 히트맵으로 상가 밀집도를 보여주겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 상가 밀집도 히트맵</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function StoreFoliumMarkerGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
