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
		script: "안녕하세요, 여러분. 파이썬을 배우기 전에 먼저 정할 것이 있습니다. 코드를 어디에 쓸 것인가입니다. 개발자들은 코딩을 도와주는 전용 도구를 씁니다. 그것을 IDE 라고 부릅니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-slate-600">&lt;/&gt;</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">파이썬 Editor</h1>
				<p className="text-2xl text-gray-500 mt-2">코드를 쓰는 도구</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-slate-50 to-gray-100",
		script: "오늘의 학습 목표입니다. 첫째, IDE 가 무엇이고 왜 쓰는지 설명할 수 있어야 합니다. 둘째, VSCode 와 PyCharm 의 차이를 알아야 합니다. 셋째, VSCode 로 폴더를 만들고 파이썬 파일을 실행할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "IDE 가 무엇이고 왜 쓰는지 설명할 수 있다" },
					{ num: "2", text: "VSCode 와 PyCharm 의 차이를 안다" },
					{ num: "3", text: "VSCode 로 폴더를 만들고 파일을 실행할 수 있다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-slate-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "IDE 가 대신 해주는 일",
		bg: "from-slate-50 to-gray-100",
		script: "IDE 는 네 가지를 대신 해줍니다. 앞 글자만 쳐도 나머지를 제안하는 자동완성, 실행 전에 잘못된 곳을 짚어주는 오류표시, 명령어와 문자열을 구분해주는 색깔구분, 그리고 버튼 하나로 돌려보는 바로실행입니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "자동완성 — 앞 글자만 쳐도 제안", c: "bg-blue-50" },
					{ t: "오류표시 — 실행 전에 밑줄로 알려줌", c: "bg-rose-50" },
					{ t: "색깔구분 — 명령어와 문자열을 다른 색으로", c: "bg-amber-50" },
					{ t: "바로실행 — 버튼 하나로 실행", c: "bg-green-50" },
				].map((item) => (
					<div key={item.t} className={`${item.c} rounded-xl p-4`}>
						<p className="text-lg text-gray-700">{item.t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "VSCode 와 PyCharm",
		bg: "from-slate-50 to-gray-100",
		script: "이 수업에서는 VSCode 를 씁니다. 무료이고 가볍고 빨라서 처음 배우기에 좋습니다. PyCharm 은 분석과 디버깅이 강력해서 큰 프로젝트에 어울립니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "VSCode — 무료 · 가볍고 빠름 · 확장 프로그램", c: "bg-blue-50" },
					{ t: "VSCode — 실시간 협업 가능", c: "bg-blue-50" },
					{ t: "PyCharm — 강력한 분석과 자동완성", c: "bg-purple-50" },
					{ t: "PyCharm — 실행 중 변수값 실시간 확인", c: "bg-purple-50" },
				].map((item) => (
					<div key={item.t} className={`${item.c} rounded-xl p-4`}>
						<p className="text-lg text-gray-700">{item.t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "첫 파일 실행까지의 순서",
		bg: "from-slate-50 to-gray-100",
		script: "바탕화면에서 새 폴더를 만들고, 이름을 바꾸고, VSCode 에서 그 폴더를 엽니다. 그리고 점 py 로 끝나는 파일을 만들어 코드를 쓰고 실행 버튼을 누릅니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "1. 바탕화면 우클릭 → 새 폴더", c: "bg-slate-50" },
					{ t: "2. 폴더 이름 바꾸기", c: "bg-slate-50" },
					{ t: "3. VSCode 에서 폴더 열기", c: "bg-slate-50" },
					{ t: "4. .py 로 끝나는 파일 만들기", c: "bg-amber-50" },
					{ t: "5. 코드를 쓰고 실행 버튼", c: "bg-green-50" },
				].map((item) => (
					<div key={item.t} className={`${item.c} rounded-xl p-4`}>
						<p className="text-lg text-gray-700">{item.t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "파일 이름이 중요하다",
		bg: "from-slate-50 to-gray-100",
		script: "파일 이름은 반드시 점 py 로 끝나야 합니다. 파이썬에게 이것은 파이썬 코드라고 알려주는 표시입니다. 점 txt 로 만들면 실행되지 않습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`hello.py    # 실행된다
hello.txt   # 실행되지 않는다`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">.py 가 있어야 파이썬 코드로 인식된다</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-slate-50 to-gray-100",
		script: "오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 폴더를 만들고 첫 코드를 실행해봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-slate-400">&lt;/&gt;</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 편집기 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function HelloworldGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
