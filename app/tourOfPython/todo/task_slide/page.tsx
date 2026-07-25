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
			"안녕하세요, 여러분. 오늘은 To-Do 앱을 처음부터 끝까지 직접 만들겠습니다. 네 가지 미션을 약 50분에 걸쳐 수행합니다. 코드가 길어 보이지만 작은 함수를 하나씩 쌓아 올릴 뿐입니다. 한 번에 다 이해하지 못해도 괜찮습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-500">
					[ todo ]
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
					To-Do App 실습
				</h1>
				<p className="text-2xl text-gray-500 mt-2">앱 하나를 끝까지 완성하기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 50분</p>
			</div>
		),
	},
	{
		title: "미션 1: 배너와 표 뼈대 (12~15분)",
		bg: "from-rose-50 to-orange-50",
		script:
			"첫 번째 미션입니다. 앱의 얼굴인 배너부터 만듭니다. WIDTH와 PADDING 같은 값은 맨 위에 변수로 빼둡니다. 나중에 표 폭을 바꿀 때 한 줄만 고치면 되기 때문입니다. 12분에서 15분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`WIDTH = 100
PADDING = (WIDTH - INDEX_ROW_PADDING) // ____(heading)

def banner(message=""):
    print("=".center(WIDTH, "="))
    print(f"|{message.center(WIDTH - 2)}|")
    print("=".center(WIDTH, "="))`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: len — 배너 문구가 가운데 정렬돼 나오는지 확인
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 목록을 표로 보여주기 (12~15분)",
		bg: "from-violet-50 to-purple-50",
		script:
			"두 번째 미션입니다. show_list와 format_item으로 목록을 표에 찍습니다. enumerate로 번호와 값을 함께 꺼내고, 사람에게 보여줄 때는 1부터 세도록 1을 더합니다. 목록이 비었을 때 No items가 나오는지도 확인합니다. 12분에서 15분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`if len(todos) ____ 0:
    print("No items")
else:
    for i, item in ____(todos):
        format_item(i, item["title"], item["____"])

n = str(index + ____).center(INDEX_ROW_PADDING)`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: &lt;= / enumerate / state / 1
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 추가·삭제·완료 표시 (12~15분)",
		bg: "from-teal-50 to-cyan-50",
		script:
			"세 번째 미션입니다. 데이터를 바꾸는 함수 네 개를 만듭니다. 삭제는 제목이 다른 것만 남긴다는 뜻이라 느낌표 등호를 씁니다. 이 네 함수는 print를 하나도 쓰지 않는다는 점에 주의하십시오. 보여주는 일은 table에게 맡깁니다. 12분에서 15분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`def create_item(title):
    return {"title": title, "____": "todo"}

def add_item(todos, item):
    todos.____(item)

def delete_item(todos, title):
    return [item for item in todos if item["title"] ____ title]`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: state / append / != — 네 함수 모두 print 없음
					</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 4: parser 와 main 루프 (15~18분)",
		bg: "from-emerald-50 to-green-50",
		script:
			"네 번째 미션입니다. 명령어를 읽어 알맞은 함수를 부르고, 끝없이 반복하게 만들면 앱이 완성됩니다. delete는 결과를 다시 받아야 한다는 점을 잊지 마십시오. 다 만들면 add, mark, delete를 차례로 넣어 표가 매번 바뀌는지 확인합니다. 15분에서 18분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`prompt_list = prompt.strip().split(" ", ____)

elif command == "delete" and title != "":
    todos = ____(todos, title)

if __name__ == "____":
    main()`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">
						빈칸: 1 / delete_item / __main__ — 종료는 Ctrl + C
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 네 가지 미션을 모두 수행했습니다. 배너와 표를 만들고, 목록을 표로 보여주고, 데이터를 바꾸는 함수를 만들고, 명령어 루프로 앱을 완성했습니다.",
		content: (
			<div className="flex flex-col gap-3">
				{[
					{ num: "1", text: "배너와 표 뼈대 만들기", color: "bg-rose-100" },
					{ num: "2", text: "목록을 표로 보여주기", color: "bg-violet-100" },
					{ num: "3", text: "추가·삭제·완료 표시 만들기", color: "bg-teal-100" },
					{ num: "4", text: "parser 와 main 루프로 완성", color: "bg-emerald-100" },
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
			"이것으로 파이썬 여행 전체를 마칩니다. 처음에는 print 한 줄에서 시작했는데, 이제는 함수 열다섯 개짜리 프로그램을 직접 만들어냈습니다. 앞으로 무엇을 만들든 오늘처럼 작게 나누고, 하나씩 만들고, 자주 실행해 보시기 바랍니다. 그동안 정말 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-blue-400">
					[ done ]
				</span>
				<h1 className="text-5xl font-bold text-gray-800">
					파이썬 여행을 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">
					작게 나누고, 하나씩 만들고, 자주 실행하기
				</p>
				<p className="text-2xl text-gray-500 mt-4">그동안 수고하셨습니다</p>
			</div>
		),
	},
];

export default function TodoTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
