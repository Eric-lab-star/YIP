"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지금까지 표와 그래프로 데이터를 봤습니다. 위치 정보가 있는 데이터는 진짜 지도 위에 그려보면 훨씬 더 잘 와닿습니다. 오늘 배울 folium으로 지도를 그려보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					folium
				</h1>
				<p className="text-2xl text-gray-500 mt-2">지도 위에 데이터 그리기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, folium.Map으로 기본 지도를 만들 수 있어야 합니다. 둘째, folium.Marker로 지도에 위치 표시를 찍을 수 있어야 합니다. 셋째, 여러 개의 마커를 반복문으로 한 번에 찍을 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "folium.Map()으로 기본 지도를 만들 수 있다" },
					{ num: "2", text: "folium.Marker()로 지도에 위치 표시를 찍을 수 있다" },
					{ num: "3", text: "여러 개의 마커를 반복문으로 한 번에 찍을 수 있다" },
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
		title: "지도 만들기",
		bg: "from-green-50 to-emerald-50",
		script: "folium 지도를 만들려면 지도의 중심 위치와 확대 정도를 정해줘야 합니다. location은 위도 경도로 중심점을, zoom_start는 확대 정도를 정합니다. save로 저장하면 브라우저에서 열어볼 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`m = folium.Map(location=[37.5665, 126.9780], zoom_start=12)
m.save("map.html")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">location=[위도, 경도], zoom_start=확대 정도</p>
				</div>
			</div>
		),
	},
	{
		title: "지도와 마커의 역할",
		bg: "from-cyan-50 to-blue-50",
		script: "folium.Map은 지도의 바탕을 만들고, folium.Marker는 지도 위 특정 위치에 핀을 꽂습니다. popup으로 클릭 시 보일 설명을 넣습니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">folium.Map()</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>지도의 바탕을 만듦</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">folium.Marker()</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>특정 위치에 핀을 꽂음</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "마커 찍기 코드",
		bg: "from-purple-50 to-pink-50",
		script: "popup은 마커를 클릭했을 때 뜨는 설명이고, tooltip은 마우스를 올렸을 때 미리 보이는 안내문입니다. 마지막에 add_to로 마커를 지도에 붙여줘야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`folium.Marker(
    location=[37.5665, 126.9780],
    popup="서울시청",
).add_to(m)`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">.add_to(m)을 빠뜨리면 마커가 안 보여요!</p>
				</div>
			</div>
		),
	},
	{
		title: "여러 마커 한 번에 찍기",
		bg: "from-teal-50 to-cyan-50",
		script: "측정소가 여러 개라면 하나하나 마커 코드를 쓰긴 힘듭니다. df.iterrows로 DataFrame을 한 행씩 꺼내며 반복문으로 마커를 찍습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`for i, row in df.iterrows():
    folium.Marker(
        location=[row["위도"], row["경도"]],
    ).add_to(m)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">df.iterrows() = 한 행씩 꺼내는 반복문</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. Map으로 지도를 만듭니다. Marker로 위치 표시를 찍습니다. iterrows로 여러 마커를 한 번에 찍습니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">folium.Map(location=, zoom_start=)</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">folium.Marker(...).add_to(m)</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">df.iterrows()로 여러 마커 반복 추가</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 위치 데이터를 진짜 지도 위에 그릴 수 있게 되었습니다. 다음 시간은 지금까지 배운 걸 모두 모아서 데이터 앱을 만드는 마지막 시간입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: streamlit으로 나만의 데이터 앱 만들기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function FoliumMapGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
