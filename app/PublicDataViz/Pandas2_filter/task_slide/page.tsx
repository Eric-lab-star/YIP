"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script: "안녕하세요, 여러분. 오늘은 조건 필터링과 정렬을 직접 연습하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🔍</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">pandas 실습 (2)</h1>
				<p className="text-2xl text-gray-500 mt-2">조건으로 걸러내고 줄 세우기</p>
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
						{ icon: "📦", text: "pandas 패키지 설치 확인" },
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
		title: "미션 1: 조건으로 역 걸러내기 (10~12분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 지하철역 데이터에서 승차인원이 12000보다 많은 역만 걸러봅니다. 강남과 삼성만 결과에 나오는지 확인합니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`data = {
    "역명": ["강남", "역삼", "선릉", "삼성"],
    "승차인원": [15230, 9820, 11400, 13500],
}
df = pd.DataFrame(data)

붐비는역 = df[df["승차인원"] > ____]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 빈칸: 12000</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 두 조건 함께 걸기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 승차인원이 10000 이상 14000 이하인 역만 걸러봅니다. 각 조건을 괄호로 감싸고 &로 묶습니다. 선릉과 삼성만 결과에 나옵니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`중간역 = df[____]
# (df["승차인원"] >= 10000) & (df["승차인원"] <= 14000)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 괄호를 빠뜨리면 에러가 납니다!</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 승차인원 순서로 줄 세우기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 전체 데이터를 승차인원이 많은 순서로 정렬합니다. ascending에 False를 넣어야 큰 값부터 나옵니다. 강남이 맨 위에 나오는지 확인합니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`정렬결과 = df.sort_values("승차인원", ascending=____)  # False`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">💡 sort_values는 새 결과를 돌려줄 뿐, 원래 df는 그대로!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 조건으로 역을 걸러내고, 두 조건을 함께 걸고, 승차인원 순서로 정렬했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "조건으로 역 걸러내기", color: "bg-rose-100" },
						{ num: "2", text: "& 로 두 조건 함께 걸기", color: "bg-violet-100" },
						{ num: "3", text: "sort_values로 순서대로 줄 세우기", color: "bg-teal-100" },
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
		script: "오늘 실습을 마치겠습니다. 이제 표에서 원하는 데이터만 쏙쏙 찾아낼 수 있게 되었습니다. 다음 시간에는 데이터를 그룹으로 묶어서 요약하는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🎉</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: pandas 기초 (3) 그룹으로 묶어 요약하기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function Pandas2FilterTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
