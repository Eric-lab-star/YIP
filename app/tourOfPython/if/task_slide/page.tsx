"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// 이모지 금지 구역(app/tourOfPython, CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-sky-50 to-blue-50",
		script:
			"안녕하세요, 여러분. 오늘은 조건문을 직접 써보겠습니다. 네 가지 미션을 약 35분에 걸쳐 수행합니다. 마지막은 자유 주제입니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					if / else
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					조건문 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">나누고, 판단하고, 만들기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 35분</p>
			</div>
		),
	},
	{
		title: "미션 1: 미성년자 판별 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 나이를 입력받아 미성년자인지 판별합니다. input 은 언제나 문자열을 주므로 int 로 바꿔야 합니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = ____(input("나이를 입력하세요: "))
if age ____ 19:
    print("당신은 미성년자입니다.")
____:
    print("당신은 어른입니다.")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: int / &lt; / else — 19를 넣으면 &quot;어른&quot;
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 성적 등급 매기기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. elif 로 네 갈래를 나눕니다. 다 만든 뒤에는 조건 순서를 일부러 뒤집어보고 결과가 어떻게 달라지는지 확인해보세요. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if score >= 90:
    print("A")
____ score >= 80:
    print("B")
____:
    print("D")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						순서를 뒤집으면 95점이 C 가 된다 — 직접 확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 기온으로 옷차림 정하기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 기온에 따라 네 갈래로 안내합니다. 30, 20, 10, 0 을 차례로 넣어서 모든 갈래가 나오는지 확인하세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if temp >= 28:  print("덥다냥")
elif temp >= 15: print("선선하다냥")
elif temp >= 5:  print("쌀쌀하다냥")
else:            print("____")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						마지막 문구는 직접 지어볼 것
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: 자유 주제 (12~15분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 직접 기획한 프로그램을 만듭니다. 통과 조건은 두 가지입니다. 조건문을 쓸 것, 그리고 input 으로 값을 받을 것입니다. 12분에서 15분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700 mb-2">통과 조건</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>1. if..elif..else 사용</li>
						<li>2. input() 으로 값 받기</li>
					</ul>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						주제 예시: 단어 맞추기 · 수학 퀴즈 · 간단 MBTI · 저녁 메뉴 추천
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 두 갈래를 나누고, 네 갈래로 늘리고, 순서의 중요성을 확인하고, 나만의 프로그램을 만들었습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "미성년자 판별하기", color: "bg-rose-100" },
					{ num: "2", text: "성적 등급 매기기", color: "bg-violet-100" },
					{ num: "3", text: "기온으로 옷차림 정하기", color: "bg-teal-100" },
					{ num: "4", text: "자유 주제 프로그램", color: "bg-emerald-100" },
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
		bg: "from-sky-50 to-blue-50",
		script:
			"오늘 실습을 마치겠습니다. 순서를 뒤집어보고 결과가 달라지는 것을 확인했다면 오늘은 대성공입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">
					elif
				</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: and, or, not</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function IfTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
