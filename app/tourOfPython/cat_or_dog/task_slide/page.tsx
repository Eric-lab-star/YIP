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
			"안녕하세요, 여러분. 오늘은 반려동물 추천 앱의 뼈대를 직접 만들어보겠습니다. 네 가지 미션을 약 40분에 걸쳐 수행합니다. 오늘 만든 코드는 다음 시간에 이어서 쓰니 반드시 저장해두세요.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					CLI app
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					추천 앱 실습 1
				</h1>
				<p className="text-2xl text-gray-500 mt-2">묻고, 받고, 걸러내기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 40분</p>
			</div>
		),
	},
	{
		title: "미션 1: start() 만들고 실행하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 프로그램의 뼈대인 start 함수를 만들고 실행합니다. 함수는 만들기만 하면 실행되지 않으니, 마지막 줄에서 불러줘야 합니다. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`____ start():
    print("반려견 또는 반려묘를 추천해 드려요.")

____`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: def / start() — 출력창에 문장이 나오는지 확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: cat_or_dog() 로 분리하기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 사용자에게 물어보는 부분을 별도의 함수로 분리하고, 그 답을 start 로 돌려줍니다. return 을 쓰지 않으면 None 이 나옵니다. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = ____()
    print(animal)

def cat_or_dog():
    cat_dog = ____("고양이 또는 강아지 입력: ")
    ____ cat_dog.strip()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						앞에 공백을 넣고 입력해도 공백 없이 나오는지 확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 잘못된 입력 막기 (10~12분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 지금은 코끼리를 입력해도 통과됩니다. or 로 두 경우를 묶고 not 으로 뒤집은 뒤, raise 로 에러를 냅니다. 다 만들면 일부러 코끼리를 입력해서 프로그램이 멈추는지 확인해보세요. 10분에서 12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def cat_or_dog():
    cat_dog = input("고양이 또는 강아지 입력: ").____()
    if ____ (cat_dog == "고양이" ____ cat_dog == "강아지"):
        ____ ValueError("오류!!!!!")
    return cat_dog`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						실험: not 을 빼면 고양이를 넣어도 에러가 난다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: 색과 크기 함수 직접 만들기 (12~15분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 앞에서 만든 방식 그대로 색과 크기 함수를 직접 만듭니다. 크기는 선택지가 셋이니 or 를 하나 더 이어붙이면 됩니다. 마지막에 세 값을 한 줄로 출력해서 잘 모였는지 확인하세요. 12분에서 15분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700 mb-2">통과 조건</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>1. black_or_white() — 검정색 / 흰색 만</li>
						<li>2. small_medium_large() — 소형 / 중형 / 대형 만</li>
						<li>3. .strip() 과 raise ValueError() 사용</li>
						<li>4. start() 에서 세 함수를 차례로 호출</li>
					</ul>
				</div>
				<CodeBlock>{`    animal = cat_or_dog()
    color = ____
    size = ____
    print(animal, color, size)`}</CodeBlock>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 뼈대를 세우고, 입력을 분리하고, 잘못된 입력을 막고, 색과 크기 함수를 직접 만들었습니다. 이제 사용자에게서 세 가지 정보를 안전하게 모을 수 있습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "start() 로 뼈대 세우기", color: "bg-rose-100" },
					{
						num: "2",
						text: "cat_or_dog() 로 입력 분리하기",
						color: "bg-violet-100",
					},
					{ num: "3", text: "not·or·raise 로 막기", color: "bg-teal-100" },
					{
						num: "4",
						text: "색과 크기 함수 직접 만들기",
						color: "bg-emerald-100",
					},
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
			"오늘 실습을 마치겠습니다. 다음 시간에는 오늘 모은 세 가지 정보로 진짜 품종을 추천해주는 suggest 함수를 만들겠습니다. 코드를 꼭 저장하세요. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">raise</span>
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">
					다음 시간: 강아지와 고양이 2
				</p>
				<p className="text-lg text-gray-500 mt-2">
					오늘 코드는 꼭 저장해두세요
				</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function CatOrDogTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
