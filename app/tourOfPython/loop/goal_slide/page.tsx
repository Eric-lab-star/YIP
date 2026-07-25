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
			"안녕하세요, 여러분. 오늘은 여러분이 농부가 되었다고 상상해봅시다. 당근 한 개를 심는 순서는 구멍을 파고, 씨앗을 심고, 물을 주는 세 단계입니다. 아주 간단하지요. 그런데 심어야 할 당근이 이백오십육 개라면 어떻게 할까요? 사람은 오늘 안에 끝낼 수 없지만 컴퓨터는 이런 반복 작업을 아주 잘합니다. 오늘은 그 반복을 시키는 반복문을 배우겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					while / for
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					반복문 loop
				</h1>
				<p className="text-2xl text-gray-500 mt-2">같은 일을 여러 번 시키기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, while 로 조건이 참인 동안 같은 코드를 반복할 수 있어야 합니다. 둘째, for in range 로 정해진 횟수만큼 반복할 수 있어야 합니다. 셋째, break 로 멈추고 continue 로 건너뛸 수 있어야 하고, 무한루프가 무엇인지 알아야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "while 로 조건이 참인 동안 반복할 수 있다" },
					{ num: "2", text: "for ... in range() 로 정해진 횟수만큼 반복한다" },
					{ num: "3", text: "break 로 멈추고 continue 로 건너뛸 수 있다" },
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
		title: "왜 반복문이 필요한가",
		bg: "from-green-50 to-emerald-50",
		script:
			"반복문이 없다면 당근 심는 코드를 이백오십육 번 복사해서 붙여넣어야 합니다. 개수가 바뀌면 코드를 전부 다시 고쳐야 합니다. 반복문을 쓰면 심는 코드는 한 번만 쓰고, 개수는 숫자 하나만 바꾸면 됩니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">반복문 없이</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>같은 코드를 256번 붙여넣기</li>
						<li>개수가 바뀌면 전부 수정</li>
					</ul>
				</div>
				<div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
					<p className="text-lg font-bold text-purple-700 mb-2">반복문으로</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>코드는 딱 한 번만</li>
						<li>숫자 하나만 고치면 끝</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "while — 조건이 참인 동안",
		bg: "from-cyan-50 to-blue-50",
		script:
			"while 다음에는 조건을 씁니다. 조건이 참이면 안쪽 코드를 실행하고 다시 조건을 확인하러 올라갑니다. 조건이 거짓이 되면 그때 반복이 끝납니다. 여기서 가장 중요한 줄은 count 를 줄여주는 줄입니다. 그 줄이 없으면 반복이 영원히 끝나지 않습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`count = 3
while count > 0:
    print(count)
    count = count - 1`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						3 → 2 → 1 출력 후 count 가 0이 되면 종료
					</p>
				</div>
			</div>
		),
	},
	{
		title: "for ... in — 정해진 범위만큼",
		bg: "from-purple-50 to-pink-50",
		script:
			"두 번째 반복문은 for in 입니다. range 는 숫자의 범위를 만들어 줍니다. for i in range 괄호 영 콤마 사 는, 영에서 사 사이의 값을 하나씩 i 에 넣으면서 반복하라는 뜻입니다. 여기서도 끝 숫자는 포함되지 않습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`for i in range(0, 4):
    print(i)      # 0 1 2 3

range(5)      # 0 1 2 3 4
range(1, 11)  # 1 ... 10`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						끝 숫자는 포함하지 않는다 → range(1, 11) 이 1부터 10
					</p>
				</div>
			</div>
		),
	},
	{
		title: "break 와 continue",
		bg: "from-teal-50 to-cyan-50",
		script:
			"당근을 심다가 금이 나오면 멈춰야 합니다. 그럴 때 break 를 씁니다. break 는 반복문을 통째로 끝냅니다. continue 는 다릅니다. 이번 회차만 건너뛰고 다음 회차는 그대로 진행합니다. 예를 들어 짝수일 때 continue 를 하면 홀수만 출력됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`while seeds > 0:
    print("seed")
    seeds = seeds - 1
    if gold:
        break      # 반복 자체를 종료

for i in range(1, 11):
    if i % 2 == 0:
        continue   # 이번 회차만 건너뜀
    print(i)       # 1 3 5 7 9`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						break → 통째로 종료 / continue → 이번 회차만 건너뜀
					</p>
				</div>
			</div>
		),
	},
	{
		title: "무한루프",
		bg: "from-indigo-50 to-violet-50",
		script:
			"조건 자리에 True 를 넣으면 조건이 영원히 참이라 반복이 끝나지 않습니다. 이것을 무한루프라고 합니다. 실수로 만들면 곤란하지만 일부러 만들 때도 많습니다. 게임은 화면을 그리고 키 입력을 받는 일을 끝없이 반복해야 하니까요. 멈추고 싶으면 안에서 break 를 쓰면 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`while True:
    print("ping")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						게임 루프가 대표적 — 빠져나올 때는 안에서 break
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. while 은 조건이 참인 동안, for in range 는 정해진 횟수만큼 반복합니다. break 는 반복을 끝내고, continue 는 이번 회차만 건너뜁니다. 조건이 늘 참이면 무한루프가 됩니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "while 조건: — 조건이 참인 동안 반복", c: "bg-green-50" },
					{ t: "for i in range(a, b): — 끝 숫자는 제외", c: "bg-blue-50" },
					{ t: "break — 반복문을 통째로 종료", c: "bg-purple-50" },
					{ t: "continue — 이번 회차만 건너뜀", c: "bg-amber-50" },
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
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 반복시켜 봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					{"while ->"}
				</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 반복문 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function LoopGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
