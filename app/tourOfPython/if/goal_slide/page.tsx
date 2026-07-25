"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-sky-50 to-blue-50",
		script:
			"안녕하세요, 여러분. 지금까지 쓴 코드는 위에서 아래로 무조건 실행됐습니다. 오늘은 상황에 따라 다르게 행동하도록 조건을 알려주는 if 를 배우겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					if / else
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					조건문
				</h1>
				<p className="text-2xl text-gray-500 mt-2">프로그램에 판단을 넣기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, if 로 조건이 참일 때만 실행되는 코드를 쓸 수 있어야 합니다. 둘째, else 로 거짓일 때의 코드를 쓸 수 있어야 합니다. 셋째, elif 로 여러 갈래를 나누고 위에서부터 검사된다는 것을 알아야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "if 로 참일 때만 실행되는 코드를 쓸 수 있다" },
					{ num: "2", text: "else 로 거짓일 때의 코드를 쓸 수 있다" },
					{ num: "3", text: "elif 로 여러 갈래를 나눌 수 있다" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
					>
						<span className="bg-sky-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
							{item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "if — 콜론과 들여쓰기",
		bg: "from-green-50 to-emerald-50",
		script:
			"if 를 쓰고 한 칸 띄운 뒤 조건을 쓰고 콜론을 찍습니다. 다음 줄은 들여씁니다. 함수에서와 똑같이 콜론과 들여쓰기가 핵심입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if 조건:
    # 참일 때 실행될 코드

# 들여쓰기를 풀면 항상 실행되는 코드`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						들여쓴 줄까지가 &quot;조건이 참일 때&quot;의 범위
					</p>
				</div>
			</div>
		),
	},
	{
		title: "else — 그 밖의 모든 경우",
		bg: "from-cyan-50 to-blue-50",
		script:
			"신분증 검사처럼 두 갈래로 나뉠 때 else 를 씁니다. else 에는 조건을 쓰지 않습니다. 그 밖의 모든 경우라는 뜻이기 때문입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if age < 19:
    print("당신은 미성년자입니다.")
else:
    print("당신은 어른입니다.")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						둘 중 하나는 반드시 실행된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "elif — 여러 갈래",
		bg: "from-violet-50 to-purple-50",
		script:
			"세상이 늘 두 갈래는 아닙니다. 성적을 A B C D 로 나누려면 elif 가 필요합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("D")`}</CodeBlock>
			</div>
		),
	},
	{
		title: "순서가 아주 중요하다",
		bg: "from-rose-50 to-orange-50",
		script:
			"위에서부터 검사하고, 참을 하나 만나면 거기서 끝납니다. 아래 조건은 아예 보지도 않습니다. 그래서 좁은 조건부터 넓은 조건 순으로 써야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if score >= 70:
    print("C")
elif score >= 90:
    print("A")

# 95점을 넣어도 "C" 가 나온다`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						좁은 조건 → 넓은 조건 순으로
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. 콜론과 들여쓰기, else 는 그 밖의 모든 경우, elif 는 여러 갈래, 그리고 순서가 결과를 바꿉니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "if 조건: 다음 줄은 들여쓰기", c: "bg-sky-50" },
					{ t: "else 에는 조건을 쓰지 않는다", c: "bg-blue-50" },
					{ t: "elif 로 갈래를 늘린다", c: "bg-violet-50" },
					{ t: "위에서부터 검사 — 순서가 결과를 바꾼다", c: "bg-amber-50" },
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
		bg: "from-sky-50 to-blue-50",
		script:
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 조건을 나눠봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">if :</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 조건문 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function IfGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
