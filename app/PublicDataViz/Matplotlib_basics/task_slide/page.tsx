"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 직접 선 그래프와 막대 그래프를 그리겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📈</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">matplotlib 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">나만의 그래프 그리기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. matplotlib 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ icon: "📦", text: "matplotlib 패키지 설치 확인" },
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
		title: "미션 1: 한글 폰트 설정하기 (5~7분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 그래프를 그리기 전에 한글이 깨지지 않도록 폰트부터 설정합니다. 윈도우용 한글 폰트 이름을 빈칸에 넣습니다. 5~7분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`plt.rcParams["font.family"] = ____  # "Malgun Gothic"
plt.rcParams["axes.unicode_minus"] = False`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 Mac은 &quot;AppleGothic&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 선 그래프 그리기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 요일별 지하철 승차인원 변화를 선 그래프로 그립니다. 선 그래프를 그리는 함수 이름을 빈칸에 넣습니다. 금요일에 가장 높게 올라가는지 확인합니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`plt.____(요일, 승차인원)  # plot
plt.title("요일별 지하철 승차인원")
plt.show()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: plot</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 막대 그래프 그리기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 구별 미세먼지를 막대 그래프로 비교합니다. 막대 그래프를 그리는 함수 이름을 빈칸에 넣습니다. 강남구가 가장 높게 나오는지 확인합니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`plt.____(구, 미세먼지)  # bar
plt.title("구별 미세먼지 농도")
plt.show()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: bar</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 한글 폰트를 설정하고, 선 그래프와 막대 그래프를 그렸습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "한글 폰트 설정하기", color: "bg-rose-100" },
						{ num: "2", text: "plt.plot으로 선 그래프 그리기", color: "bg-violet-100" },
						{ num: "3", text: "plt.bar로 막대 그래프 그리기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 데이터를 눈으로 보이게 그릴 수 있게 되었습니다. 다음 시간에는 seaborn으로 더 예쁜 그래프를 그려보겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎉</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: seaborn으로 예쁜 그래프 그리기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function MatplotlibBasicsTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
