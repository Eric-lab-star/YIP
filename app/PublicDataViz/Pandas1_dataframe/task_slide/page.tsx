"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 직접 DataFrame을 만들고 열과 행을 꺼내는 연습을 하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">pandas 실습 (1)</h1>
				<p className="text-2xl text-gray-500 mt-2">나만의 표 만들기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas 패키지가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas 패키지 설치 확인" },
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
		title: "미션 1: 딕셔너리로 DataFrame 만들기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 미세먼지 측정소 데이터를 직접 만들어봅니다. 빈칸에는 초미세먼지라는 열 이름을 넣습니다. 3행 3열의 표가 잘 출력되는지 확인합니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`data = {
    "측정소": ["중구", "강남구", "종로구"],
    "미세먼지": [30, 42, 25],
    ____: [15, 21, 12],
}
df = pd.DataFrame(data)
print(df)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;초미세먼지&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 열 꺼내보기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 미세먼지 열만 꺼내보고, 측정소와 미세먼지 두 열을 함께 꺼내봅니다. 대괄호 한 번은 Series, 대괄호 두 번은 DataFrame이 나옵니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`미세먼지_열 = df[____]        # "미세먼지"
두열 = df[["측정소", ____]]  # "미세먼지"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">대괄호 한 번 = Series, 두 번(리스트) = DataFrame</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 행 꺼내보기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 특정 측정소의 데이터를 행 단위로 꺼내봅니다. iloc의 번호는 0부터 시작합니다. 첫 번째는 0, 세 번째는 2입니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`첫번째 = df.iloc[____]  # 0
세번째 = df.iloc[____]  # 2`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">iloc은 0부터 시작합니다!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 딕셔너리로 나만의 DataFrame을 만들고, 열을 꺼내보고, iloc으로 행을 꺼냈습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "딕셔너리로 DataFrame 만들기", color: "bg-rose-100" },
						{ num: "2", text: "열 하나/여러 개 꺼내보기", color: "bg-violet-100" },
						{ num: "3", text: "iloc으로 행 꺼내보기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 표를 자유자재로 다루는 첫걸음을 뗐습니다. 다음 시간에는 조건으로 원하는 데이터만 걸러내는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: pandas 기초 (2) 조건 필터링과 정렬</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function Pandas1DataFrameTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
