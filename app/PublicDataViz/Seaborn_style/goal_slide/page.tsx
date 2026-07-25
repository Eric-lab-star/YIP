"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 matplotlib으로 선 그래프와 막대 그래프를 그려봤습니다. 오늘 배울 seaborn은 matplotlib 위에서 동작하는 라이브러리인데, 훨씬 적은 코드로 더 예쁜 그래프를 그릴 수 있습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎨</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					seaborn
				</h1>
				<p className="text-2xl text-gray-500 mt-2">더 예쁜 그래프 그리기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, set_theme으로 그래프 전체 스타일을 예쁘게 바꿀 수 있어야 합니다. 둘째, barplot으로 막대 그래프를 그릴 수 있어야 합니다. 셋째, scatterplot으로 두 값 사이의 관계를 살펴볼 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "sns.set_theme()으로 그래프 스타일을 예쁘게 바꿀 수 있다" },
					{ num: "2", text: "sns.barplot()으로 막대 그래프를 그릴 수 있다" },
					{ num: "3", text: "sns.scatterplot()으로 두 값 사이 관계를 살펴볼 수 있다" },
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
		title: "테마 한 방에 바꾸기",
		bg: "from-green-50 to-emerald-50",
		script: "seaborn을 불러오고 set_theme 한 줄만 실행하면, 앞으로 그릴 모든 그래프가 자동으로 예쁘게 바뀝니다. matplotlib 그래프에도 함께 적용됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`import seaborn as sns

sns.set_theme(style="whitegrid")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">set_theme() 한 줄로 이후 모든 그래프에 적용</p>
				</div>
			</div>
		),
	},
	{
		title: "seaborn으로 막대 그래프",
		bg: "from-cyan-50 to-blue-50",
		script: "seaborn의 barplot은 matplotlib의 bar와 비슷하지만, 색상 팔레트가 자동으로 예쁘게 적용된다는 차이가 있습니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">📊 plt.bar()</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>색상을 직접 지정해야 함</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">🎨 sns.barplot()</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>팔레트가 자동으로 예쁘게 적용</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "barplot 코드",
		bg: "from-purple-50 to-pink-50",
		script: "코드로 확인해보겠습니다. data에 DataFrame을 넣고, x와 y에 열 이름을 지정하면 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.barplot(data=df, x="구", y="미세먼지")
plt.title("구별 미세먼지 농도")
plt.show()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 data=df, x=&quot;열&quot;, y=&quot;열&quot; 형태로 사용</p>
				</div>
			</div>
		),
	},
	{
		title: "두 값의 관계 살펴보기",
		bg: "from-teal-50 to-cyan-50",
		script: "미세먼지가 심한 날은 초미세먼지도 심할까요? 두 값 사이의 관계를 보고 싶을 땐 산점도가 딱입니다. 오른쪽 위로 올라가는 모양이면 양의 상관관계가 있다는 뜻입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.scatterplot(data=df2, x="미세먼지", y="초미세먼지")
plt.show()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">점 하나 = 관측값 하나, 흩어진 모양으로 관계 파악</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. set_theme로 스타일을 바꿉니다. barplot으로 막대 그래프를 그립니다. scatterplot으로 관계를 살펴봅니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ sns.set_theme()으로 스타일 바꾸기</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ sns.barplot(data=df, x=, y=)로 막대 그래프</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ sns.scatterplot()으로 두 값의 관계 살펴보기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 이제 훨씬 예쁜 그래프를 그릴 수 있게 되었습니다. 다음 시간에는 마우스로 확대하고 클릭할 수 있는 인터랙티브 그래프를 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: plotly로 인터랙티브 그래프 만들기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function SeabornStyleGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
