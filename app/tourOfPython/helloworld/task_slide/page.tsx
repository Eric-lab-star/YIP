"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-slate-50 to-gray-100",
		script: "안녕하세요, 여러분. 오늘은 코드를 많이 쓰지 않습니다. 대신 앞으로 계속 쓸 작업 환경을 손에 익히는 시간입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-slate-600">&lt;/&gt;</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">편집기 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">첫 코드를 실행해보기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25분</p>
			</div>
		),
	},
	{
		title: "미션 1: 작업 폴더 만들기 (7~8분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 바탕화면에 폴더를 만들고 VSCode 에서 엽니다. 폴더 이름에 띄어쓰기와 한글은 피하세요. 나중에 문제가 될 수 있습니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "1. 바탕화면 우클릭 → 새 폴더", c: "bg-white/70" },
					{ t: "2. 이름을 python_study 로", c: "bg-white/70" },
					{ t: "3. VSCode → 파일 → 폴더 열기", c: "bg-white/70" },
					{ t: "띄어쓰기와 한글은 피할 것", c: "bg-amber-50" },
				].map((item) => (
					<div key={item.t} className={`${item.c} rounded-xl p-4`}>
						<p className="text-lg text-gray-700">{item.t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "미션 2: 첫 파일 만들기 (7~8분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 점 py 로 끝나는 파일을 만들고 코드를 직접 타이핑합니다. 복사 붙여넣기는 하지 마세요. print 와 문자열의 색깔이 다르게 보이는지도 확인하세요.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print("hello world")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">파일 이름은 hello.py — 색깔이 다르게 보이는지 확인</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 오류를 일부러 만들기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 닫는 괄호를 일부러 빼봅니다. 실행하기 전에 이미 빨간 밑줄이 그어지는지 보세요. 그것이 오류표시 기능입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`print("hello world"     # 닫는 괄호를 빼보자`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">오류는 무서운 게 아니라 알려주는 신호</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 폴더를 만들고, 첫 코드를 실행하고, 오류를 직접 만들어봤습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "작업 폴더 만들기", color: "bg-rose-100" },
					{ num: "2", text: "첫 파일 만들고 실행하기", color: "bg-violet-100" },
					{ num: "3", text: "오류를 일부러 만들어보기", color: "bg-teal-100" },
				].map((item) => (
					<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
						<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
						<p className="text-lg text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "",
		bg: "from-slate-50 to-gray-100",
		script: "오늘 실습을 마치겠습니다. 앞으로 오류는 아주 자주 만납니다. 겁먹지 말고 메시지를 읽는 습관을 들입시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-slate-400">run</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 변수, 문자열, 불리언</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function HelloworldTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
