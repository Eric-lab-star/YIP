"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md).
const slides: Slide[] = [
	{
		title: "",
		bg: "from-indigo-50 to-blue-50",
		script: "안녕하세요, 여러분. 오늘은 사용자와 대화하는 프로그램을 만들어보겠습니다. 네 가지 미션을 약 30분에 걸쳐 수행합니다. 오늘의 핵심은 하나입니다. input 은 언제나 문자열을 줍니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-indigo-600">input()</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">input 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">묻고, 바꾸고, 지키기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 30분</p>
			</div>
		),
	},
	{
		title: "미션 1: 물어보고 대답 받기 (6~8분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 이름을 물어보고 인사합니다. 실행하면 프로그램이 멈춰서 기다리는데 그것이 정상입니다. 6분에서 8분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`name = ____("이름이 뭐예요? ")
print(name + "님, 반갑습니다!")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">빈칸: input</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 함정 확인하기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 오늘의 핵심 함정을 직접 눈으로 확인합니다. 숫자를 입력했는데도 str 이 나오고, 더하기를 하면 오류가 납니다. 오류 메시지를 소리내어 읽어보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = input("나이가 몇이에요? ")
print(type(age))   # 무엇이 나오나?
print(age + 1)     # 어떤 오류가?`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">오류 메시지를 소리내어 읽어볼 것</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 형 바꿔서 계산 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. int 로 감싸서 함정을 피합니다. 다 되면 hello 를 입력해보세요. 프로그램이 어떻게 되는지 확인합니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`age = ____(input("나이가 몇이에요? "))
print("내년에는", age + 1, "살이네요!")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">빈칸: int — 그다음 hello 를 넣어볼 것</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: try..except 로 지키기 (10~12분)",
		bg: "from-emerald-50 to-green-50",
		script: "네 번째 미션입니다. 방금 hello 를 넣었을 때 프로그램이 죽었습니다. try except 로 막습니다. 이번에는 죽지 않고 안내 문구가 나오는지 확인하세요. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`____:
    age = int(input("나이? "))
    print(age + 1)
____ ValueError:
    print("숫자를 입력하세요")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">빈칸: try / except</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 네 가지 미션을 모두 수행했습니다. 물어보고, 함정을 확인하고, 형을 바꾸고, 오류를 잡았습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "물어보고 대답 받기", color: "bg-rose-100" },
					{ num: "2", text: "함정 확인하기", color: "bg-violet-100" },
					{ num: "3", text: "형 바꿔서 계산하기", color: "bg-teal-100" },
					{ num: "4", text: "try..except 로 지키기", color: "bg-emerald-100" },
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
		bg: "from-indigo-50 to-blue-50",
		script: "오늘 실습을 마치겠습니다. 오류 메시지를 직접 읽어봤다면 오늘은 대성공입니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-slate-400">try</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: if, else, elif</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function InputTypeIntTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
