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
			"안녕하세요, 여러분. 지난 시간에 우리는 사용자에게서 세 가지 정보를 안전하게 모으는 데까지 성공했습니다. 그런데 아직 추천은 하지 않고 있습니다. 오늘은 진짜 품종을 추천해주는 suggest 함수를 만들어 앱을 완성하겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					suggest()
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					강아지와 고양이 2
				</h1>
				<p className="text-2xl text-gray-500 mt-2">추천 앱 완성하기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, f-string 으로 문자열 안에 변수를 넣어 문장을 만들 수 있어야 합니다. 둘째, 조건문을 중첩해서 여러 정보를 차례로 좁혀나갈 수 있어야 합니다. 셋째, 함수들을 하나로 연결해 프로그램을 완성할 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "f-string 으로 문장에 변수 넣기" },
					{ num: "2", text: "조건문을 중첩해 정보를 좁혀나가기" },
					{ num: "3", text: "함수를 연결해 프로그램 완성하기" },
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
		title: "지금 우리가 알고 있는 것",
		bg: "from-green-50 to-emerald-50",
		script:
			"지난 시간 마지막 부분에서 코드를 이어서 작성하겠습니다. 코드가 사라졌다면 다시 입력하세요. 우리가 알고 있는 정보는 모두 세 가지입니다. 어떤 동물을 원하는지, 어떤 색을 원하는지, 어떤 크기를 원하는지입니다. 이제 모은 정보로 추천만 해주면 됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()
    color = black_or_white()
    size = small_medium_large()`}</CodeBlock>
				<div className="grid grid-cols-3 gap-3">
					{["동물", "색", "크기"].map((t) => (
						<div key={t} className="bg-white/70 rounded-xl p-4 text-center">
							<p className="text-lg font-bold text-gray-700">{t}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "f-string — 문장에 변수 넣기",
		bg: "from-cyan-50 to-blue-50",
		script:
			"문자열 앞에 f 를 붙인 것이 보이시나요. 이것은 문자열 안에 변수를 넣을 수 있게 만들어주는 코드입니다. f 를 쓰면 중괄호로 감싼 부분은 글자가 아니라 변수로 인식됩니다. 즉 실행될 때 실제 값인 고양이 또는 강아지로 바뀝니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def suggest(animal, color, size):
    print(f"너에게 알맞는 {size} {color} {animal}는")

# 출력 예: 너에게 알맞는 소형 검정색 고양이는`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						f 를 빼면 중괄호가 그대로 글자로 출력된다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "동물부터 나누기",
		bg: "from-violet-50 to-purple-50",
		script:
			"세 가지 조건 중 우선 강아지와 고양이 중 무엇을 선택했는지 구별해야 합니다. if 로 animal 값을 판별해줍니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def suggest(animal, color, size):
    print(f"너에게 알맞는 {size} {color} {animal}는")
    if animal == "고양이":
        print("고양이 선택")
    elif animal == "강아지":
        print("강아지 선택")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						두 갈래지만 elif 를 쓴 이유 — 의미가 분명하고 나중에 늘리기 쉽다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "색과 크기까지 — 세 겹 중첩",
		bg: "from-teal-50 to-cyan-50",
		script:
			"동물로 한 번, 색으로 한 번, 크기로 한 번. 세 번 좁히면 딱 하나의 추천 목록에 도착합니다. 들여쓰기가 한 칸씩 깊어지는 것에 주의하세요. 들여쓰기를 틀리면 엉뚱한 갈래로 들어갑니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`동물          색            크기
고양이  ┬─ 검정색 ┬─ 소형 → 봄베이 ...
        │         ├─ 중형 → 버미즈 ...
        │         └─ 대형 → 메인쿤 ...
        └─ 흰색   → ...
강아지  ┬─ 검정색 → ...
        └─ 흰색   → ...`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						세 번 좁히면 추천 목록이 하나로 정해진다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "크기 갈래 채우기",
		bg: "from-rose-50 to-orange-50",
		script:
			"크기를 판단하는 조건식을 넣고 각각 알맞은 품종을 적어줍니다. 같은 방식으로 흰색 쪽과 강아지 쪽도 만들면 프로그램이 완성됩니다. 참고로 정해진 정답은 없습니다. 품종은 여러분이 아는 것으로 바꿔도 좋습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if color == "검정색":
    if size == "소형":
        print("1. 봄베이")
        print("2. 아메리칸 쇼트헤어")
        print("3. 코니시 렉스")
    elif size == "중형":
        print("1. 버미즈")
        ...
    elif size == "대형":
        print("1. 메인쿤")
        ...`}</CodeBlock>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. f-string 으로 문장에 변수를 넣고, 조건문을 세 겹으로 중첩해 정보를 좁히고, start 안에서 suggest 를 불러 앱을 완성했습니다. 그리고 맨 마지막 줄의 start 호출을 잊지 마세요. 함수는 만들어두기만 하면 실행되지 않습니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "f 를 붙이면 중괄호 안이 변수가 된다", c: "bg-sky-50" },
					{ t: "동물 → 색 → 크기 순으로 세 번 좁힌다", c: "bg-blue-50" },
					{ t: "start() 안에서 suggest() 를 부른다", c: "bg-violet-50" },
					{ t: "맨 아래 start() 호출을 잊지 말 것", c: "bg-amber-50" },
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
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 조립하고, 나만의 앱으로 바꿔봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">
					f&quot;...&quot;
				</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 추천 앱 실습 2</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function CatOrDog2GoalSlidePage() {
	return <SlideShell slides={slides} />;
}
