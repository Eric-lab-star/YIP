"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 상가 데이터를 직접 정제하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🏪</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 4 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">상가 데이터 직접 정제하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas와 numpy 패키지가 필요합니다. 데이터 출처는 소상공인시장진흥공단, 공공누리 제1유형입니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ icon: "📦", text: "pandas, numpy 패키지 설치 확인" },
						{ icon: "📄", text: "출처: 소상공인시장진흥공단 상가정보(예시), 공공누리 제1유형" },
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
		title: "미션 1: 원하는 업종만 골라내기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 전체 상가 데이터에서 카페만 골라냅니다. 찾고 싶은 업종 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`카페만 = df[df["업종"] == ____]  # "카페"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: &quot;카페&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 좌표 결측치 확인하기 (7~8분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 카페 데이터 중 좌표가 빠진 곳이 있는지 확인합니다. 빈 값을 표시하는 함수 이름을 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`빈좌표 = 카페만[카페만.____().any(axis=1)]  # isna`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: isna</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 좌표 결측치 제거하기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 지도에 찍을 수 있도록 좌표가 있는 데이터만 남깁니다. 확인할 열들을 리스트로 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`지도용 = 카페만.dropna(subset=____)  # ["위도", "경도"]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: [&quot;위도&quot;, &quot;경도&quot;]</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 업종을 골라내고, 좌표 결측치를 확인하고, 제거했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "원하는 업종만 골라내기", color: "bg-rose-100" },
						{ num: "2", text: "좌표 결측치 확인하기", color: "bg-violet-100" },
						{ num: "3", text: "좌표 결측치 제거하기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 지도에 찍을 준비가 된 깨끗한 상가 데이터를 만들 수 있게 되었습니다. 다음 시간에는 진짜 지도에 마커를 찍겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎉</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 상가 정보 folium 마커 시각화</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function StoreCleanTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
