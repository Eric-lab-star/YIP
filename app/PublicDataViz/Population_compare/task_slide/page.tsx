"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 연령대별 남녀 인구를 직접 비교하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">프로젝트 5 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">연령대별 남녀 인구 비교하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas, seaborn, matplotlib 패키지가 필요합니다. 데이터 출처는 행정안전부 주민등록인구현황, 공공누리 제1유형입니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas, seaborn, matplotlib 패키지 설치 확인" },
						{ text: "출처: 행정안전부 주민등록인구현황(예시), 공공누리 제1유형" },
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
		title: "미션 1: melt로 성별 열 만들기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 남자, 여자 열을 하나의 성별 열로 모읍니다. 모으고 싶은 열들을 리스트로 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`길게 = pd.melt(df, id_vars=["연령대"], value_vars=____,
    var_name="성별", value_name="인구수")  # ["남자", "여자"]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: [&quot;남자&quot;, &quot;여자&quot;]</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 그룹 막대 그래프 그리기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. hue를 활용해서 연령대별 남녀 인구를 비교합니다. 그룹을 나눌 기준 열 이름을 빈칸에 넣습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`sns.barplot(data=길게, x="연령대", y="인구수", hue=____)
# "성별"`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;성별&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 연령대별 남녀 차이 계산하기 (5~7분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 20대의 남녀 인구 차이를 계산합니다. Series를 순수 숫자 배열로 바꾸는 속성 이름을 빈칸에 넣습니다. 5~7분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`여자20대 = df[df["연령대"]=="20대"]["여자"].____[0]
# values`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: values</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 성별 열을 만들고, 그룹 막대 그래프를 그리고, 남녀 차이를 계산했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "melt로 성별 열 만들기", color: "bg-rose-100" },
						{ num: "2", text: "그룹 막대 그래프 그리기", color: "bg-violet-100" },
						{ num: "3", text: "연령대별 남녀 차이 계산하기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 연령대별 남녀 인구를 한눈에 비교할 수 있게 되었습니다. 다음 시간에는 인구 피라미드를 그리겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 인구 피라미드 그리기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function PopulationCompareTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
