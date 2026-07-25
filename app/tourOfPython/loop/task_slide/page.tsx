"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// 이모지 금지 구역(app/tourOfPython, CLAUDE.md) — 번호와 화살표로만 강조한다.
const slides: Slide[] = [
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script:
			"안녕하세요, 여러분. 오늘은 반복문을 직접 돌려보겠습니다. 다섯 가지 미션을 약 40분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					while / for
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					반복문 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">세고, 멈추고, 건너뛰기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 40분</p>
			</div>
		),
	},
	{
		title: "미션 1: while 로 1부터 10까지 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. while 로 1부터 10까지 출력합니다. 시작 값은 1이고, 10까지 포함해야 하므로 부등호에 등호가 붙습니다. 안쪽에서 n 을 늘려주지 않으면 무한루프가 되니 조심하세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`n = ____
while n ____ 10:
    print(n)
    n = n ____ 1`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						빈칸: 1 / &lt;= / + — 0이 나오면 안 된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: for 로 같은 일 해보기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 같은 결과를 for in range 로 만들어 봅니다. range 의 끝 숫자는 포함되지 않으므로 10을 출력하려면 11을 넣어야 합니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`for i in range(____, ____):
    print(i)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: 1 / 11 → 끝 숫자는 포함되지 않는다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 1부터 100까지의 합 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 숫자를 출력만 하지 말고 더해서 모아봅니다. 더하기를 시작하기 전 total 은 반드시 0이어야 합니다. 결과가 오천오십으로 나오는지 확인하세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`total = ____
for i in range(1, 101):
    total = total ____ i

print(total)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: 0 / + → 결과는 5050</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: break 와 continue (8~10분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 씨앗을 심다가 금을 발견하면 즉시 멈추고, 1부터 10까지 중 홀수만 출력합니다. 통째로 멈추는 것은 break, 이번 회차만 건너뛰는 것은 continue 입니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if gold:
    ____          # 반복 자체를 종료

for i in range(1, 11):
    if i % 2 == ____:
        ____      # 이번 회차만 건너뛰기
    print(i)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: break / 0 / continue → 1 3 5 7 9
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 5: 모래시계 그리기 (10~12분)",
		bg: "from-sky-50 to-blue-50",
		script:
			"다섯 번째 미션입니다. 주어진 코드를 그대로 실행하면 피라미드가 나옵니다. 이 피라미드를 뒤집어 붙여서 모래시계 모양이 나오게 고쳐 봅니다. 반복문을 하나 더 붙여서 두 번째는 k 를 줄여가며 돌리면 됩니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`k = 1
while k < 6:
    print(f"{' . ' * k:░>19}", end="")
    print(f"{' . ' * k:░<19}", )
    k += 1`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						힌트: 두 번째 반복문은 while k &gt; 0 과 k -= 1
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 다섯 가지 미션을 모두 수행했습니다. while 로 세고, for 로 같은 일을 하고, 합을 구하고, break 와 continue 로 흐름을 조종하고, 모래시계까지 그렸습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "while 로 1부터 10까지 세기", color: "bg-rose-100" },
					{ num: "2", text: "for 로 같은 일 해보기", color: "bg-violet-100" },
					{ num: "3", text: "1부터 100까지의 합 구하기", color: "bg-teal-100" },
					{
						num: "4",
						text: "break 와 continue 로 흐름 조종",
						color: "bg-emerald-100",
					},
					{ num: "5", text: "반복문으로 모래시계 그리기", color: "bg-sky-100" },
				].map((item) => (
					<div
						key={item.num}
						className={`${item.color} rounded-xl p-4 flex items-center gap-4`}
					>
						<span className="text-lg font-bold text-gray-500">
							미션 {item.num}
						</span>
						<p className="text-lg text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "",
		bg: "from-blue-50 to-indigo-50",
		script:
			"오늘 실습을 마치겠습니다. 반복문은 앞으로 만들 게임과 앱에서 매번 등장합니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					[ ok ]
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">
					다음 시간: 파이썬 표준 라이브러리
				</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function LoopTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
