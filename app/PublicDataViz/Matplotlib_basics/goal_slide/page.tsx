"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지금까지 데이터를 표로 다루고 깨끗하게 정리하는 법을 배웠습니다. 오늘부터는 그 데이터를 그래프로 그려서 눈으로 한눈에 보는 법을 배우겠습니다. 오늘의 주인공은 matplotlib입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📈</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					matplotlib 기초
				</h1>
				<p className="text-2xl text-gray-500 mt-2">첫 그래프 그리기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, plt.plot으로 선 그래프를 그릴 수 있어야 합니다. 둘째, plt.bar로 막대 그래프를 그릴 수 있어야 합니다. 셋째, 그래프에서 한글이 깨지지 않게 폰트를 설정할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "plt.plot()으로 선 그래프를 그릴 수 있다" },
					{ num: "2", text: "plt.bar()로 막대 그래프를 그릴 수 있다" },
					{ num: "3", text: "그래프에서 한글이 깨지지 않게 폰트를 설정할 수 있다" },
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
		title: "선 그래프 그리기",
		bg: "from-green-50 to-emerald-50",
		script: "시간에 따라 변하는 데이터, 예를 들어 요일별 지하철 승차인원처럼 변화의 흐름을 보고 싶을 땐 선 그래프가 딱입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`plt.plot(요일, 승차인원)
plt.title("요일별 지하철 승차인원")
plt.xlabel("요일")
plt.ylabel("승차인원")
plt.show()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">plt.plot(x, y) — 첫 리스트 x축, 둘째 리스트 y축</p>
				</div>
			</div>
		),
	},
	{
		title: "막대 그래프 그리기",
		bg: "from-cyan-50 to-blue-50",
		script: "변화의 흐름이 아니라 항목끼리 크기를 비교하고 싶을 땐 막대 그래프가 더 좋습니다. 구별 미세먼지를 비교할 때처럼 말입니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📈 plt.plot() — 선 그래프</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>시간에 따른 변화(추세)</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">📊 plt.bar() — 막대 그래프</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>항목 간 크기 비교</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "막대 그래프 코드",
		bg: "from-purple-50 to-pink-50",
		script: "코드로 확인해보겠습니다. plt.bar에 구 리스트와 미세먼지 리스트를 넣으면 됩니다. plot과 사용법이 거의 똑같습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`plt.bar(구, 미세먼지)
plt.title("구별 미세먼지 농도")
plt.show()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 plot ↔ bar, title/xlabel/ylabel/show는 그대로!</p>
				</div>
			</div>
		),
	},
	{
		title: "한글 깨짐 방지하기",
		bg: "from-teal-50 to-cyan-50",
		script: "matplotlib은 기본적으로 한글 폰트를 지원하지 않아서 한글이 네모로 깨져 보일 수 있습니다. 코드 맨 앞에 폰트 설정을 한 줄 추가하면 해결됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`plt.rcParams["font.family"] = "Malgun Gothic"
plt.rcParams["axes.unicode_minus"] = False`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">Windows: Malgun Gothic, macOS: AppleGothic</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. plot으로 선 그래프를 그립니다. bar로 막대 그래프를 그립니다. rcParams로 한글 폰트를 설정합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ plt.plot(x, y)로 선 그래프</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ plt.bar(x, y)로 막대 그래프</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ rcParams[&quot;font.family&quot;]로 한글 폰트 설정</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 데이터를 눈으로 보이게 그릴 수 있게 되었습니다. 다음 시간에는 seaborn으로 훨씬 더 예쁜 그래프를 그려보겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: seaborn으로 예쁜 그래프 그리기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function MatplotlibBasicsGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
