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
			"안녕하세요, 여러분. 지금까지 변수, 함수, input, if, elif, 그리고 and or not 까지 배웠습니다. 이만큼 배웠으면 이제 하나하나 조립해서 진짜 프로그램을 만들 준비가 됐습니다. 오늘부터 두 시간에 걸쳐 반려동물 추천 앱을 만들겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					CLI app
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					강아지와 고양이 1
				</h1>
				<p className="text-2xl text-gray-500 mt-2">
					배운 것을 조립해 앱 만들기
				</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, input 으로 사용자의 입력을 받아 처리할 수 있어야 합니다. 둘째, 잘못된 입력을 not 과 or 로 걸러내고 raise 로 막을 수 있어야 합니다. 셋째, 기능마다 함수로 나눠서 코드를 정리할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "input() 으로 사용자 입력 처리하기" },
					{ num: "2", text: "not 과 or, raise 로 잘못된 입력 막기" },
					{ num: "3", text: "기능마다 함수로 나눠 코드 정리하기" },
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
		title: "CLI 앱이란",
		bg: "from-green-50 to-emerald-50",
		script:
			"문자로만 되어 있는 프로그램을 CLI 앱이라고 합니다. 커맨드 라인 인터페이스의 약자로, 그림 화면인 GUI 와 대비되는 앱입니다. 우리가 만들 앱은 사용자에게 세 가지 질문을 하고 답에 맞는 품종을 추천해 줍니다. 완벽한 앱이 아니라 완성한 앱이 실력을 만듭니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-lg text-gray-700 mb-3">사용자에게 물어볼 3가지</p>
					<ul className="text-lg text-gray-600 space-y-2">
						<li>1. 고양이가 좋아 강아지가 좋아?</li>
						<li>2. 검은색이 좋아 흰색이 좋아?</li>
						<li>3. 원하는 크기 있어?</li>
					</ul>
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						목표는 완벽한 앱이 아니라 파이썬에 익숙해지는 것
					</p>
				</div>
			</div>
		),
	},
	{
		title: "start() — 프로그램의 시작점",
		bg: "from-cyan-50 to-blue-50",
		script:
			"우리 프로그램의 모든 코드는 start 함수가 실행될 때 실행되도록 만들겠습니다. 먼저 이 함수를 쓰고 실행해서, 출력창에 안내 문장이 나오는지 확인해보세요.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def start():
    print("반려견 또는 반려묘를 추천해 드려요.")

start()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						함수는 만들기만 하면 실행되지 않는다 — 불러줘야 한다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "입력을 함수로 분리하기",
		bg: "from-violet-50 to-purple-50",
		script:
			"input 으로 무엇을 원하는지 물어볼 수 있습니다. 그런데 기능을 넣을수록 start 함수가 길어집니다. 이럴 때는 새 함수로 분리하는 것이 좋습니다. 그러면 start 는 짧게 유지되고, 고칠 일이 있을 때 cat_or_dog 함수만 손대면 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()

def cat_or_dog():
    cat_dog = input("고양이가 좋아 강아지가 좋아?\\n 고양이 또는 강아지 입력: ")
    return cat_dog.strip()`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						start() 는 짧게 → 고칠 곳은 한 군데로
					</p>
				</div>
			</div>
		),
	},
	{
		title: "잘못된 입력 걸러내기",
		bg: "from-rose-50 to-orange-50",
		script:
			"사용자가 코끼리를 입력해도 막을 방법이 없었습니다. 세 가지 코드를 넣어 막겠습니다. strip 은 앞뒤 공백을 지웁니다. 공백도 글자라서 공백이 있는 단어와 없는 단어는 다른 값입니다. or 로 고양이와 강아지를 묶고, 앞에 not 을 붙여 뒤집으면 둘 다 아닐 때 참이 됩니다. 그때 raise 로 일부러 에러를 내서 프로그램을 중단시킵니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def cat_or_dog():
    cat_dog = input("고양이 또는 강아지 입력: ").strip()
    if not (cat_dog == "고양이" or cat_dog == "강아지"):
        raise ValueError("오류!!!!!")
    return cat_dog`}</CodeBlock>
				<div className="grid grid-cols-3 gap-3">
					<div className="bg-white/70 rounded-xl p-3">
						<p className="text-base font-bold text-gray-700">.strip()</p>
						<p className="text-sm text-gray-600">앞뒤 공백 제거</p>
					</div>
					<div className="bg-white/70 rounded-xl p-3">
						<p className="text-base font-bold text-gray-700">not (A or B)</p>
						<p className="text-sm text-gray-600">둘 다 아닐 때</p>
					</div>
					<div className="bg-white/70 rounded-xl p-3">
						<p className="text-base font-bold text-gray-700">raise</p>
						<p className="text-sm text-gray-600">일부러 에러 내기</p>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "색과 크기도 같은 방식으로",
		bg: "from-teal-50 to-cyan-50",
		script:
			"색과 크기도 똑같은 방식으로 만듭니다. 색은 검정색과 흰색만, 크기는 소형 중형 대형만 받습니다. 선택지가 셋이면 or 를 하나 더 이어붙이면 됩니다. 여기까지 하면 사용자에게서 세 가지 정보를 안전하게 모을 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def small_medium_large():
    size = input("소형 또는 중형 또는 대형 입력: ").strip()
    if not (size == "소형" or size == "중형" or size == "대형"):
        raise ValueError("오류!!!!")
    return size

def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()
    color = black_or_white()
    size = small_medium_large()`}</CodeBlock>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. start 로 시작점을 만들고, 기능마다 함수로 나누고, strip 으로 공백을 지우고, not 과 or 와 raise 로 잘못된 입력을 막았습니다. 아직 추천은 하지 않습니다. 정보를 모으는 단계까지 온 것입니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "start() 하나로 프로그램을 시작한다", c: "bg-sky-50" },
					{ t: "기능마다 함수로 나눠 짧게 유지한다", c: "bg-blue-50" },
					{ t: ".strip() 으로 앞뒤 공백을 지운다", c: "bg-violet-50" },
					{ t: "not (A or B) + raise 로 잘못된 입력을 막는다", c: "bg-amber-50" },
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
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 앱의 뼈대를 만들어봅시다. 오늘 만든 코드는 다음 시간에 이어서 쓰니 꼭 저장하세요. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">
					start()
				</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 추천 앱 실습 1</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function CatOrDogGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
