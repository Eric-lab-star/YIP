"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-teal-50 to-cyan-50",
		script: "안녕하세요, 여러분. 오늘은 공공데이터포털의 파일 데이터, CSV를 다뤄보겠습니다. CSV 파일을 열었을 때 한글이 깨지는 이유도 함께 알아보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📄</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					CSV 파일과 인코딩 문제
				</h1>
				<p className="text-2xl text-gray-500 mt-2">한글이 깨지지 않게 읽는 법</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, CSV 파일이 무엇인지 설명할 수 있어야 합니다. 둘째, pandas의 read_csv로 CSV 파일을 불러올 수 있어야 합니다. 셋째, 한글이 깨지는 인코딩 문제의 원인과 해결법을 알아야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "CSV 파일이 무엇인지 설명할 수 있다" },
					{ num: "2", text: "read_csv()로 CSV 파일을 불러올 수 있다" },
					{ num: "3", text: "인코딩 문제의 원인과 해결법을 안다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-teal-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "CSV 파일이 뭐냥?",
		bg: "from-blue-50 to-indigo-50",
		script: "CSV는 Comma-Separated Values의 줄임말입니다. 쉼표로 값을 구분해서 적어놓은 단순한 표 형식의 텍스트 파일입니다. 엑셀로 열면 표처럼 보이지만 사실은 글자로만 이루어진 텍스트 파일이며, 공공데이터포털 파일 데이터 대부분이 이 형식입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`역명,승차인원,하차인원
강남,15230,14800
역삼,9820,9500`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">CSV = 쉼표로 값을 구분한 단순한 텍스트 표</p>
				</div>
			</div>
		),
	},
	{
		title: "pandas로 CSV 읽기",
		bg: "from-green-50 to-emerald-50",
		script: "이 CSV 파일을 파이썬으로 읽어보겠습니다. pandas 라이브러리를 쓰면 CSV를 표 형태인 DataFrame으로 순식간에 불러올 수 있습니다. read_csv 한 줄이면 충분합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`import pandas as pd

df = pd.read_csv("subway.csv")
print(df)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">read_csv() 한 줄로 CSV 전체가 표(DataFrame)로 변신합니다!</p>
				</div>
			</div>
		),
	},
	{
		title: "한글이 깨져요! 인코딩이 뭐냥?",
		bg: "from-purple-50 to-pink-50",
		script: "컴퓨터는 글자를 숫자로 바꿔서 저장합니다. 이때 어떤 규칙으로 숫자로 바꿀지 정하는 것이 인코딩입니다. UTF-8은 전 세계 표준이자 pandas의 기본값이고, CP949는 한국 윈도우에서 많이 쓰던 인코딩으로 공공데이터포털 CSV 파일에 아직 많이 남아있습니다. 서로 규칙이 다르다 보니 CP949 파일을 UTF-8로 읽으면 한글이 깨집니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">🌏 UTF-8</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>전 세계 표준 인코딩</li>
						<li>pandas의 기본값</li>
					</ul>
				</div>
				<div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-400">
					<p className="text-lg font-bold text-orange-700 mb-2">🇰🇷 CP949</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>옛 한국 윈도우 인코딩</li>
						<li>공공데이터 CSV에 아직 많음</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "인코딩 문제 해결하기",
		bg: "from-cyan-50 to-blue-50",
		script: "해결법은 간단합니다. read_csv에 encoding 옵션을 정확히 알려주면 됩니다. 먼저 옵션 없이 읽어보고, 한글이 깨지면 encoding을 cp949로 지정해서 다시 읽어봅니다. 그래도 안 되면 euc-kr을 시도해봅니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`# 한글이 깨진다면 cp949로 다시 시도
df = pd.read_csv("subway.csv", encoding="cp949")
print(df)`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 순서: 기본값 → cp949 → euc-kr</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. CSV는 쉼표로 구분된 텍스트 표입니다. pandas의 read_csv로 CSV를 DataFrame으로 불러올 수 있습니다. 한글이 깨지면 encoding 옵션을 cp949로 지정하면 대부분 해결됩니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ CSV = 쉼표로 구분된 텍스트 표</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ pd.read_csv(&quot;파일명&quot;)으로 불러오기</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 한글 깨짐 → encoding=&quot;cp949&quot; 시도</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-teal-50 to-cyan-50",
		script: "오늘 강의를 마치겠습니다. CSV 파일을 읽는 법과 인코딩 문제 해결법을 배웠습니다. 다음 시간부터는 pandas를 본격적으로 배워보겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: pandas 기초 (1) DataFrame과 Series</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function CSVEncodingGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
