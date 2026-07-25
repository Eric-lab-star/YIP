"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 상가 지도를 직접 만들겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📍</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 4 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">상가 지도 직접 만들기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. folium과 pandas 패키지가 필요합니다. 만든 지도는 html로 저장해서 브라우저로 열어봅니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ icon: "📦", text: "folium, pandas 패키지 설치 확인" },
						{ icon: "🌐", text: ".html 파일을 브라우저로 열어보기" },
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
		title: "미션 1: 상가 마커 찍기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 상가 데이터를 지도에 마커로 찍습니다. DataFrame을 한 행씩 꺼내는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`for i, row in df.____():  # iterrows
    folium.Marker(...).add_to(m)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: iterrows</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 업종별 아이콘 색 입히기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 업종에 따라 마커 색을 다르게 지정합니다. 딕셔너리에서 값을 찾되 없으면 기본값을 쓰는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`icon=folium.Icon(color=색상표.____(row["업종"], "gray"))
# get`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: get</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: MarkerCluster로 묶기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 마커를 클러스터로 묶어서 표시합니다. 클러스터를 지도에 붙이는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`클러스터 = MarkerCluster().____(m2)  # add_to`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 마커는 지도가 아니라 클러스터에!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 상가 마커를 찍고, 색을 입히고, 클러스터로 묶었습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "상가 마커 찍기", color: "bg-rose-100" },
						{ num: "2", text: "업종별 아이콘 색 입히기", color: "bg-violet-100" },
						{ num: "3", text: "MarkerCluster로 묶기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 진짜 지도 위에 상가 데이터를 예쁘게 시각화할 수 있게 되었습니다. 다음 시간에는 히트맵으로 상가 밀집도를 보여주겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎉</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 상가 밀집도 히트맵</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function StoreFoliumMarkerTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
