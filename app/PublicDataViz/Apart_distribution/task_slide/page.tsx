"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 아파트 가격 분포를 직접 살펴보겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 3 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">아파트 가격 분포 직접 살펴보기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas, seaborn, matplotlib 패키지가 필요합니다. 데이터 출처는 국토교통부 실거래가 공개시스템, 공공누리 제1유형입니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas, seaborn, matplotlib 패키지 설치 확인" },
						{ text: "출처: 국토교통부 실거래가 공개시스템(예시), 공공누리 제1유형" },
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
		title: "미션 1: 기본 통계 확인하기 (7~8분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 거래금액의 기본 통계를 확인합니다. 평균, 중앙값 등을 한 번에 보여주는 함수 이름을 빈칸에 넣습니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print(df["거래금액"].____())  # describe`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: describe</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 히스토그램으로 분포 그리기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 가격 분포를 히스토그램으로 그립니다. 히스토그램을 그리는 함수 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.____(data=df, x="거래금액", bins=5)  # histplot`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: histplot</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 가격대별 건수 세기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 저가, 중가, 고가 아파트가 각각 몇 건인지 셉니다. 행의 개수를 세는 함수 이름을 빈칸에 넣습니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print(f"저가: {____(저가)}건")  # len`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: len</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 기본 통계를 확인하고, 히스토그램을 그리고, 가격대별 건수를 세었습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "기본 통계 확인하기", color: "bg-rose-100" },
						{ num: "2", text: "히스토그램으로 분포 그리기", color: "bg-violet-100" },
						{ num: "3", text: "가격대별 건수 세기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 아파트 가격이 대략 어떻게 퍼져있는지 파악할 수 있게 되었습니다. 다음 시간에는 평형과 지역별 분석을 하겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 아파트 평형·지역별 분석</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function ApartDistributionTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
