"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 평형대를 나누고 지역별 표를 직접 만들겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 3 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">평형·지역별 표 직접 만들기</p>
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
		title: "미션 1: 평형대 나누기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 전용면적을 소형, 중형, 대형으로 나눕니다. 숫자를 구간별로 나누는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`df["평형대"] = pd.____(df["전용면적"],
    bins=[0, 60, 85, 200], labels=[...])  # cut`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: cut</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 두 기준으로 그룹 묶기 (7~8분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 지역과 평형대, 두 기준으로 평균 가격을 구합니다. 지역과 평형대를 리스트로 묶어 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`df.groupby(____, observed=True)["거래금액"].mean()
# ["지역", "평형대"]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: [&quot;지역&quot;, &quot;평형대&quot;]</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 피벗 테이블 만들기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 지역을 행, 평형대를 열로 하는 표를 만듭니다. 표의 가로 기준이 될 열 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`pd.pivot_table(df, values="거래금액",
    index="지역", columns=____)  # "평형대"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;평형대&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 평형대를 나누고, 두 기준으로 묶고, 피벗 테이블을 만들었습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "평형대 나누기", color: "bg-rose-100" },
						{ num: "2", text: "두 기준으로 그룹 묶기", color: "bg-violet-100" },
						{ num: "3", text: "피벗 테이블 만들기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 여러 기준을 조합해서 데이터를 분석할 수 있게 되었습니다. 다음 시간에는 이 분석 결과를 그래프로 시각화하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 아파트 데이터 시각화</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function ApartSizeAreaTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
