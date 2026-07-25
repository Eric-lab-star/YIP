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
			"안녕하세요, 여러분. 지난 시간에 만든 코드를 열어주세요. 오늘은 suggest 함수를 만들어 앱을 완성하겠습니다. 네 가지 미션과 도전 미션을 약 45분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-sky-600">
					suggest()
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					추천 앱 실습 2
				</h1>
				<p className="text-2xl text-gray-500 mt-2">
					조립하고, 완성하고, 바꿔보기
				</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 45분</p>
			</div>
		),
	},
	{
		title: "미션 1: f-string 으로 안내 문구 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. suggest 함수를 만들고 모은 정보로 문장을 만듭니다. 문자열 앞에 글자 하나를 붙여야 중괄호가 변수로 인식됩니다. 그 글자를 빼고도 실행해서 결과를 비교해보세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def suggest(animal, color, size):
    print(____"너에게 알맞는 {size} {color} {animal}는")

suggest("고양이", "검정색", "소형")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						출력: 너에게 알맞는 소형 검정색 고양이는
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 동물부터 나누기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. 세 가지 정보 중 먼저 동물부터 갈라봅니다. 첫 갈래는 if, 다음 갈래는 elif 입니다. 문자열을 비교할 때는 등호를 두 개 쓴다는 것도 잊지 마세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def suggest(animal, color, size):
    print(f"너에게 알맞는 {size} {color} {animal}는")
    ____ animal == "고양이":
        print("고양이 선택")
    ____ animal == "강아지":
        print("강아지 선택")`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						등호 하나는 값을 넣는 것, 두 개가 비교
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 색과 크기까지 중첩 (12~15분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 색으로 한 번 더, 크기로 또 한 번 더 좁힙니다. 고양이 쪽을 채우면 흰색 쪽과 강아지 쪽은 같은 모양으로 만들 수 있습니다. 들여쓰기가 한 칸씩 깊어지는 것에 주의하세요. 12분에서 15분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`동물          색            크기
고양이  ┬─ 검정색 ┬─ 소형 → 봄베이 ...
        │         ├─ 중형 → 버미즈 ...
        │         └─ 대형 → 메인쿤 ...
        └─ 흰색   → ...
강아지  ┬─ 검정색 → ...
        └─ 흰색   → ...`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						품종은 내가 아는 것으로 바꿔도 좋다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: 전부 연결하고 실행하기 (8~10분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. start 안에서 suggest 를 부르고 프로그램을 실행합니다. 맨 아랫줄에서 start 를 불러야 프로그램이 돌아갑니다. 아무 일도 안 일어난다면 이것을 빠뜨린 것입니다. 여섯 가지 조합을 골고루 넣어 전부 나오는지 확인하세요. 8분에서 10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()
    color = black_or_white()
    size = small_medium_large()
    ____(animal, color, size)

____`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						고양이 · 검정색 · 소형 → 봄베이가 나오는지 확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "도전: 나만의 추천 앱으로 (선택)",
		bg: "from-indigo-50 to-blue-50",
		script:
			"프로그램을 완성했다면 나만의 앱으로 바꿔봅시다. 품종을 내가 아는 동물로 바꾸거나, 색깔 선택지에 갈색을 하나 더 추가하거나, 마지막에 인사말을 출력해보세요. 정해진 정답은 없습니다. 과감하게 바꿔보세요.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					"추천 품종을 내가 아는 다른 동물로 바꾸기",
					"색깔 선택지에 갈색 추가하기 (black_or_white 함수)",
					"마지막에 좋은 선택이에요 같은 인사말 출력하기",
				].map((t) => (
					<div key={t} className="bg-white/70 rounded-xl p-5">
						<p className="text-lg text-gray-700">{t}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. f-string 으로 문구를 만들고, 동물로 갈래를 나누고, 색과 크기까지 중첩하고, 전부 연결해 앱을 완성했습니다. 지금 여러분은 직접 완성한 프로그램을 하나 가지고 있습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "f-string 안내 문구", color: "bg-rose-100" },
					{ num: "2", text: "동물부터 갈래 나누기", color: "bg-violet-100" },
					{ num: "3", text: "색과 크기 중첩하기", color: "bg-teal-100" },
					{ num: "4", text: "전부 연결해 완성하기", color: "bg-emerald-100" },
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
			"오늘 실습을 마치겠습니다. 직접 기획하고 완성한 프로그램을 하나 갖게 된 것은 정말 대단한 일입니다. 다음 시간에는 같은 일을 여러 번 시키는 반복문을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-sky-400">
					start()
				</span>
				<h1 className="text-5xl font-bold text-gray-800">앱을 완성했습니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 반복문 loop</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function CatOrDog2TaskSlidePage() {
	return <SlideShell slides={slides} />;
}
