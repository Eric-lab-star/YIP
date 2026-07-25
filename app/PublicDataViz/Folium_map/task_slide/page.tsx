"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 folium으로 지도를 만들고 마커를 찍겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🗺️</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">folium 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">나만의 지도 만들기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. folium과 pandas 패키지가 필요합니다. 만든 지도는 map.html로 저장해서 브라우저로 열어봅니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ icon: "📦", text: "folium, pandas 패키지 설치 확인" },
						{ icon: "🌐", text: "map.html을 브라우저로 열어보기" },
					].map((item, i) => (
						<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
							<span className="text-3xl">{item.icon}</span>
							<p className="text-xl text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "미션 1: 서울 지도 만들기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 서울시청을 중심으로 지도를 만듭니다. 지도를 만드는 클래스 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`m = folium.____(location=[37.5665, 126.9780], zoom_start=12)  # Map`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: Map</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 마커 하나 찍어보기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 서울시청 위치에 마커를 찍습니다. 클릭했을 때 보일 설명을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`folium.Marker(
    location=[37.5665, 126.9780],
    popup=____,  # "서울시청"
).add_to(m)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 .add_to(m)을 꼭 붙이세요!</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 반복문으로 여러 마커 찍기 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 미세먼지 측정소 3곳에 마커를 한 번에 찍습니다. DataFrame을 한 행씩 꺼내는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`for i, row in df.____():  # iterrows
    folium.Marker(
        location=[row["위도"], row["경도"]],
    ).add_to(m)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: iterrows</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 지도를 만들고, 마커를 하나 찍고, 여러 마커를 반복문으로 찍었습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "folium.Map으로 서울 지도 만들기", color: "bg-rose-100" },
						{ num: "2", text: "folium.Marker로 마커 하나 찍기", color: "bg-violet-100" },
						{ num: "3", text: "iterrows로 여러 마커 한 번에 찍기", color: "bg-teal-100" },
					].map((item) => (
						<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
							<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
							<p className="text-lg text-gray-700">{item.text} ✅</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 실습을 마치겠습니다. 위치 데이터를 진짜 지도 위에 그릴 수 있게 되었습니다. 다음 시간은 지금까지 배운 걸 모두 모아 데이터 앱을 만드는 마지막 시간입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎉</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: streamlit으로 나만의 데이터 앱 만들기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function FoliumMapTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
