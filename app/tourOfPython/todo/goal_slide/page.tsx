"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역이라(CLAUDE.md) 슬라이드에도 이모지를
// 쓰지 않는다. 강조는 번호·화살표·박스 문자로만 한다.
const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script:
			"안녕하세요, 여러분. 드디어 마지막 시간입니다. 오늘은 명령어로 할 일을 추가하고 지우고 완료 표시하는 To-Do 앱을 만들겠습니다. 지금까지 배운 것을 전부 모은 총정리 과제입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					[ todo ]
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					To-Do App 만들기
				</h1>
				<p className="text-2xl text-gray-500 mt-2">
					배운 것을 모두 모은 마지막 과제
				</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, 큰 프로그램을 화면을 그리는 함수와 데이터를 바꾸는 함수로 나눠 설계할 수 있어야 합니다. 둘째, 리스트와 딕셔너리를 겹쳐 목록 데이터를 표현할 수 있어야 합니다. 셋째, 명령어를 읽어 알맞은 함수를 부르는 반복 루프를 만들 수 있어야 합니다. 한 번에 다 이해하지 못해도 괜찮습니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "화면 그리는 함수 / 데이터 바꾸는 함수로 나눈다" },
					{ num: "2", text: "리스트 안에 딕셔너리로 목록을 표현한다" },
					{ num: "3", text: "명령어를 읽어 함수를 부르는 루프를 만든다" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
					>
						<span className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
							{item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "앱이 알아듣는 명령어 네 가지",
		bg: "from-green-50 to-emerald-50",
		script:
			"앱을 실행하면 표가 뜨고 아래에서 명령어를 입력합니다. add는 추가, delete는 삭제, mark는 완료와 미완료를 번갈아 바꾸고, show는 목록을 다시 보여줍니다. 명령어는 앞 단어 하나와 나머지 전부로 나눕니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ cmd: "add 할일", desc: "새 할 일을 목록에 추가", c: "bg-blue-50" },
					{ cmd: "delete 할일", desc: "같은 이름의 할 일을 삭제", c: "bg-rose-50" },
					{ cmd: "mark 할일", desc: "todo 와 done 을 번갈아 전환", c: "bg-amber-50" },
					{ cmd: "show", desc: "지금 목록을 다시 보여주기", c: "bg-green-50" },
				].map((item) => (
					<div
						key={item.cmd}
						className={`${item.c} rounded-xl p-4 flex items-center gap-4`}
					>
						<span className="font-mono font-bold text-lg text-gray-700 w-40 shrink-0">
							{item.cmd}
						</span>
						<p className="text-lg text-gray-600">{item.desc}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "할 일 하나를 어떻게 담는가",
		bg: "from-cyan-50 to-blue-50",
		script:
			"할 일 하나에는 제목과 상태 두 정보가 필요합니다. 이름표를 붙여 담는 것은 딕셔너리가 가장 잘합니다. 그리고 할 일이 여러 개이므로 리스트 안에 딕셔너리를 여러 개 담아 목록을 만듭니다. 리스트는 순서를, 딕셔너리는 내용을 맡습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`todos = [
    {"title": "파이썬 복습", "state": "todo"},
    {"title": "물 주기",     "state": "done"},
]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						리스트 → 순서를 지킨다 / 딕셔너리 → 내용을 담는다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "처음 보는 문법 다섯 가지",
		bg: "from-purple-50 to-pink-50",
		script:
			"오늘 코드에는 아직 배우지 않은 것이 몇 개 나옵니다. enumerate는 번호와 값을 함께 꺼내주고, 리스트 컴프리헨션은 조건에 맞는 것만 골라 새 리스트를 만듭니다. global은 함수 밖 변수를 쓰겠다는 표시, center는 가운데 정렬, 마지막 줄은 이 파일을 직접 실행할 때만 main을 부르는 관용구입니다. 지금은 이런 게 있구나 정도만 알면 충분합니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ k: "enumerate(리스트)", v: "번호와 값을 함께 꺼낸다" },
					{ k: "[x for x in 리스트 if ...]", v: "조건에 맞는 것만 새 리스트로" },
					{ k: "global todos", v: "함수 밖 변수를 쓰겠다는 표시" },
					{ k: '"=".center(폭, "=")', v: "가운데 정렬하며 양옆 채우기" },
					{ k: 'if __name__ == "__main__":', v: "직접 실행할 때만 main()" },
				].map((item) => (
					<div key={item.k} className="bg-white/70 rounded-xl p-4">
						<p className="font-mono text-base text-blue-700">{item.k}</p>
						<p className="text-lg text-gray-600 mt-1">{item.v}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "화면을 그리는 함수 / 데이터를 바꾸는 함수",
		bg: "from-teal-50 to-cyan-50",
		script:
			"큰 프로그램일수록 역할을 나눠야 합니다. 왼쪽은 화면을 그리는 함수들로, 데이터를 절대 바꾸지 않고 받은 대로 보여주기만 합니다. 오른쪽은 데이터를 바꾸는 함수들로, 화면에 아무것도 찍지 않고 todos만 고칩니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">화면을 그린다</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>banner / table</li>
						<li>show_list / format_item</li>
						<li>데이터를 바꾸지 않는다</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">
						데이터를 바꾼다
					</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>create_item / add_item</li>
						<li>delete_item / mark_item</li>
						<li>화면에 찍지 않는다</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "parser — 명령어를 쪼개서 나눠주기",
		bg: "from-rose-50 to-orange-50",
		script:
			"parser는 사용자가 친 한 줄을 명령어와 제목으로 쪼개서 알맞은 함수를 부르는 교통정리 담당입니다. split 스페이스 콤마 1의 1은 딱 한 번만 쪼개라는 뜻이라, 제목에 띄어쓰기가 있어도 통째로 남습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`prompt_list = prompt.strip().split(" ", 1)
command = prompt_list[0]
title = prompt_list[1] if len(prompt_list) > 1 else ""

if command == "add" and title != "":
    add_item(todos, create_item(title))`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						split(&quot; &quot;, 1) → 앞 단어 하나 + 나머지 전부
					</p>
				</div>
			</div>
		),
	},
	{
		title: "main — 끝없이 도는 루프",
		bg: "from-violet-50 to-purple-50",
		script:
			"main은 표를 그리고, 명령을 받고, 목록을 갱신하고, 화면을 지우는 일을 끝없이 반복합니다. while True는 스스로 멈추지 않으므로 종료는 컨트롤 씨로 합니다. 그러면 KeyboardInterrupt 예외가 발생하고 except가 그것을 잡아 bye를 찍고 곱게 끝납니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`try:
    while True:
        table(todos)
        prompt = input("...")
        todos = parser(todos, prompt)
        clear()
except KeyboardInterrupt:
    print("bye")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						표 그리기 → 입력 받기 → 갱신 → 화면 지우기 → 다시 처음으로
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. 리스트 안에 딕셔너리로 목록을 담고, 화면과 데이터를 함수로 나누고, parser로 명령을 처리하고, while True 루프로 앱을 굴렸습니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "리스트 안에 딕셔너리 → 할 일 목록", c: "bg-green-50" },
					{ t: "화면 그리기 / 데이터 바꾸기 분리", c: "bg-blue-50" },
					{ t: "parser 로 명령어와 제목 나누기", c: "bg-purple-50" },
					{ t: "while True + KeyboardInterrupt 로 종료", c: "bg-amber-50" },
				].map((item) => (
					<div key={item.t} className={`${item.c} rounded-xl p-4`}>
						<p className="text-lg text-gray-700">{item.t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script:
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 이 앱을 직접 완성해 봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					[ todo ]
				</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음: To-Do App 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function TodoGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
