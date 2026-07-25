"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-teal-50 to-cyan-50",
		script: "안녕하세요, 여러분. 오늘은 진짜 CSV 파일을 내려받아 파이썬으로 읽고, 인코딩 문제를 직접 해결하는 실습을 진행하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">CSV 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">지하철 데이터 직접 읽어보기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. pandas 패키지와 공공데이터포털 계정이 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "pandas 패키지 설치 (pip install pandas)" },
						{ text: "공공데이터포털 계정 (로그인 상태)" },
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
		title: "미션 1: 지하철 CSV 파일 내려받기 (7~8분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 서울교통공사 지하철호선별 역별 승하차 인원 정보로 검색해서 CSV 파일을 내려받습니다. 내려받은 파일을 코드 파일과 같은 폴더에 저장합니다. 7~8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`서울교통공사_지하철호선별 역별 승하차 인원 정보`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">파일을 코드 파일과 같은 폴더에 저장하세요.</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: CSV 읽고 인코딩 해결하기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 먼저 기본값으로 읽어보고, 한글이 깨지면 encoding 옵션을 추가해서 다시 읽습니다. 빈칸에는 한국 공공기관 CSV에 자주 쓰이는 인코딩, cp949를 넣으면 됩니다. UnicodeDecodeError가 뜨면 인코딩이 맞지 않다는 신호입니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`# 1) 기본값으로 읽어보기
df = pd.read_csv("파일 이름.csv")

# 2) 한글이 깨진다면 encoding 옵션 추가
df = pd.read_csv("파일 이름.csv", encoding=____)
print(df.head())`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;cp949&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 불러온 데이터 살펴보기 (8~10분)",
		bg: "from-teal-50 to-emerald-50",
		script: "세 번째 미션입니다. DataFrame의 기본 정보를 확인합니다. shape으로 행과 열의 개수를, columns로 열 이름을 확인합니다. 몇 행 몇 열인지, 어떤 정보가 담겨 있는지 살펴봅니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print("행과 열의 개수:", df.shape)
print("열 이름:", df.columns.tolist())
print(df.head(3))`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">df.shape = (행 개수, 열 개수) / df.columns = 열 이름들</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 지하철 CSV 파일을 내려받고, pandas로 읽으면서 인코딩 문제를 해결했으며, DataFrame의 기본 정보를 살펴보았습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "지하철 승하차 CSV 파일 내려받기", color: "bg-rose-100" },
						{ num: "2", text: "pandas로 읽고 인코딩 문제 해결하기", color: "bg-violet-100" },
						{ num: "3", text: "DataFrame 기본 정보 살펴보기", color: "bg-teal-100" },
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
		bg: "from-teal-50 to-cyan-50",
		script: "오늘 실습을 마치겠습니다. 공공데이터포털의 파일 데이터를 자유자재로 읽을 수 있게 되었습니다. 다음 시간부터는 pandas를 본격적으로 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: pandas 기초 (1) DataFrame과 Series</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function CSVEncodingTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
