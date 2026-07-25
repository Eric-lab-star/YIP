"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 seaborn으로 테마를 바꾸고 그래프를 그리겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">seaborn 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">예쁜 그래프 직접 그리기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. seaborn, matplotlib, pandas 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "seaborn, matplotlib, pandas 패키지 설치 확인" },
					].map((item, i) => (
						<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
							<p className="text-xl text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "미션 1: 테마 설정하기 (5~7분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 그래프를 그리기 전에 seaborn 테마부터 설정합니다. 테마를 설정하는 함수 이름을 빈칸에 넣습니다. 5~7분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.____(style="whitegrid")  # set_theme
plt.rcParams["font.family"] = "Malgun Gothic"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: set_theme</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: seaborn 막대 그래프 그리기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 구별 미세먼지 데이터를 seaborn 막대 그래프로 그립니다. 방금 만든 DataFrame 변수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.barplot(data=____, x="구", y="미세먼지")  # df`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: df</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 산점도로 관계 살펴보기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 미세먼지와 초미세먼지 사이의 관계를 산점도로 살펴봅니다. 산점도를 그리는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.____(data=df2, x="미세먼지", y="초미세먼지")  # scatterplot`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">오른쪽 위로 올라가는 모양 = 양의 상관관계</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 테마를 설정하고, 막대 그래프와 산점도를 그렸습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "테마 설정하기", color: "bg-rose-100" },
						{ num: "2", text: "barplot으로 막대 그래프 그리기", color: "bg-violet-100" },
						{ num: "3", text: "scatterplot으로 관계 살펴보기", color: "bg-teal-100" },
					].map((item) => (
						<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
							<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
							<p className="text-lg text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 실습을 마치겠습니다. 이제 훨씬 예쁜 그래프를 그릴 수 있게 되었습니다. 다음 시간에는 인터랙티브 그래프를 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: plotly로 인터랙티브 그래프 만들기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function SeabornStyleTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
