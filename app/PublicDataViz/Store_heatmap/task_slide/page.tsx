"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 상가 히트맵을 직접 만들겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🔥</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 4 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">상가 히트맵 직접 만들기</p>
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
		title: "미션 1: 좌표 목록 만들기 (7~8분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. DataFrame에서 위도, 경도만 뽑아 좌표 목록을 만듭니다. 순수 숫자 배열로 바꾸는 속성 이름을 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`좌표목록 = df[["위도", "경도"]].____.tolist()  # values`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: values</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 히트맵 그리기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 좌표 목록으로 히트맵을 그립니다. 히트맵을 만드는 클래스 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`____(좌표목록).add_to(m)  # HeatMap`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: HeatMap</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 동별 상가 개수로 결론 정리하기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 어느 동에 상가가 가장 많은지 확인합니다. 가장 큰 값을 가진 이름을 찾는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`가장많은동 = 동별개수.____()  # idxmax`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: idxmax</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 좌표 목록을 만들고, 히트맵을 그리고, 결론을 정리했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "좌표 목록 만들기", color: "bg-rose-100" },
						{ num: "2", text: "히트맵 그리기", color: "bg-violet-100" },
						{ num: "3", text: "동별 상가 개수로 결론 정리하기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이걸로 프로젝트 4, 상가 정보 데이터 분석을 완주했습니다. 다음 프로젝트는 인구 통계 데이터입니다. 수고하셨습니다.",
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

export default function StoreHeatmapTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
