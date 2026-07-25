"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 지난 시간에 CSV를 표처럼 불러왔습니다. 오늘은 그 표의 정체, DataFrame과 Series를 제대로 파헤쳐보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					pandas 기초 (1)
				</h1>
				<p className="text-2xl text-gray-500 mt-2">DataFrame과 Series</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, DataFrame과 Series가 무엇이고 어떻게 다른지 설명할 수 있어야 합니다. 둘째, 딕셔너리로부터 직접 DataFrame을 만들 수 있어야 합니다. 셋째, 열과 행에 각각 접근하는 방법을 알아야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "DataFrame과 Series의 차이를 설명할 수 있다" },
					{ num: "2", text: "딕셔너리로 DataFrame을 만들 수 있다" },
					{ num: "3", text: "열과 행에 접근하는 방법을 안다" },
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
		title: "DataFrame은 엑셀 표다냥",
		bg: "from-green-50 to-emerald-50",
		script: "DataFrame은 쉽게 말해 행과 열로 이루어진 표입니다. 엑셀 시트를 떠올리면 딱 맞습니다. 그 표에서 열 하나만 떼어내면 그것이 바로 Series입니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">DataFrame</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>행과 열로 이루어진 표 전체</li>
						<li>엑셀 시트 하나와 같음</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">Series</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>DataFrame에서 열 하나만 뽑은 것</li>
						<li>엑셀의 세로줄 하나와 같음</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "딕셔너리로 DataFrame 만들기",
		bg: "from-cyan-50 to-blue-50",
		script: "CSV 파일이 없어도 파이썬 딕셔너리만으로 직접 DataFrame을 만들 수 있습니다. 딕셔너리의 키는 열 이름이 되고, 값의 리스트는 그 열의 데이터가 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`data = {
    "역명": ["강남", "역삼", "선릉"],
    "승차인원": [15230, 9820, 11400],
}
df = pd.DataFrame(data)
print(df)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">키 = 열 이름, 값(리스트) = 그 열의 데이터</p>
				</div>
			</div>
		),
	},
	{
		title: "열(Column) 접근하기",
		bg: "from-purple-50 to-pink-50",
		script: "표에서 원하는 열만 꺼내봅니다. 대괄호 안에 열 이름을 적으면 됩니다. df 대괄호 열이름으로 꺼낸 결과는 Series입니다. 여러 열을 꺼내려면 대괄호를 두 번 겹쳐 리스트로 넣으면 DataFrame이 나옵니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`승차 = df["승차인원"]       # Series
일부 = df[["역명", "승차인원"]]  # DataFrame`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">대괄호 한 번 = Series, 대괄호 두 번(리스트) = DataFrame</p>
				</div>
			</div>
		),
	},
	{
		title: "행(Row) 접근하기",
		bg: "from-teal-50 to-cyan-50",
		script: "이번엔 특정 행을 꺼내봅니다. iloc을 쓰면 위치 번호로 행을 꺼낼 수 있습니다. 0번부터 시작하며, iloc 0은 첫 번째 행입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`첫줄 = df.iloc[0]
print(첫줄)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">df.iloc[번호] = 숫자로 몇 번째 줄인지 꺼내기 (0부터 시작)</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. DataFrame은 표 전체, Series는 열 하나입니다. 딕셔너리로 DataFrame을 만들 수 있습니다. 대괄호 한 번은 Series, 두 번은 DataFrame을 만듭니다. iloc으로 행에 접근합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">DataFrame = 표 전체, Series = 열 하나</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">df[&quot;열&quot;] = Series, df[[&quot;열1&quot;,&quot;열2&quot;]] = DataFrame</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">df.iloc[번호]로 행 접근</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "오늘 강의를 마치겠습니다. 표를 자유자재로 다루는 첫걸음을 뗐습니다. 다음 시간에는 조건을 걸어서 원하는 데이터만 걸러내는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: pandas 기초 (2) 조건 필터링과 정렬</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function Pandas1DataFrameGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
