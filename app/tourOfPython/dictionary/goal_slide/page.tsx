"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

// app/tourOfPython 은 이모지 금지 구역(CLAUDE.md) — 코드 기호와 번호로만 강조한다.
const slides: Slide[] = [
	{
		title: "",
		bg: "from-emerald-50 to-teal-50",
		script:
			"안녕하세요, 여러분. 오늘 배울 딕셔너리는 사전과 똑같습니다. 사전에서 사과를 찾으면 애플이 나오죠. 딕셔너리도 이름표와 값이 짝으로 되어 있습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-5xl font-mono font-bold text-emerald-600">
					&#123;키: 값&#125;
				</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					딕셔너리 dictionary
				</h1>
				<p className="text-2xl text-gray-500 mt-2">이름표로 찾는 사전</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script:
			"오늘의 학습 목표입니다. 첫째, 중괄호로 딕셔너리를 만들고 키로 값을 꺼낼 수 있어야 합니다. 둘째, 키를 추가하고 수정하고 삭제할 수 있어야 합니다. 셋째, keys, values, items, get 을 상황에 맞게 골라 쓸 수 있어야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "중괄호로 만들고 키로 값을 꺼낼 수 있다" },
					{ num: "2", text: "키를 추가·수정·삭제할 수 있다" },
					{ num: "3", text: "keys / values / items / get 을 골라 쓸 수 있다" },
				].map((item) => (
					<div
						key={item.num}
						className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
					>
						<span className="bg-emerald-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
							{item.num}
						</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "번호 대신 이름표로",
		bg: "from-cyan-50 to-blue-50",
		script:
			"리스트는 몇 번째인지 알아야 꺼낼 수 있습니다. 딕셔너리는 이름만 알면 바로 꺼냅니다. 훨씬 직관적입니다.",
		content: (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
					<p className="text-lg font-bold text-blue-700 mb-2">리스트 — 번호로</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>fruits[0]</li>
						<li>몇 번째인지 외워야 함</li>
					</ul>
				</div>
				<div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-400">
					<p className="text-lg font-bold text-emerald-700 mb-2">
						딕셔너리 — 이름으로
					</p>
					<ul className="text-base text-gray-600 space-y-1">
						<li>fruits[&quot;사과&quot;]</li>
						<li>이름만 알면 바로 꺼냄</li>
					</ul>
				</div>
			</div>
		),
	},
	{
		title: "추가와 수정은 문법이 같다",
		bg: "from-green-50 to-emerald-50",
		script:
			"없던 키에 넣으면 추가되고, 있던 키에 넣으면 값이 덮어써집니다. 문법이 같으니 실수로 기존 값을 지우지 않게 조심해야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`person["나이"] = 15      # 없던 키 → 추가
person["이름"] = "Bob"   # 있던 키 → 덮어쓰기
del person["나이"]       # 키로 삭제`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						같은 문법, 다른 결과 — 키가 있느냐 없느냐로 갈린다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "keys · values · items",
		bg: "from-teal-50 to-cyan-50",
		script:
			"과목 이름만 필요하면 keys, 점수만 모아 합계를 내려면 values, 과목과 점수를 함께 출력하려면 items 를 씁니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`scores = {"수학": 90, "영어": 85}
scores.keys()          # 이름만
sum(scores.values())   # 175
for k, v in scores.items():
    print(k, v)`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						무엇을 꺼내고 싶은지에 따라 고른다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "없는 키를 안전하게",
		bg: "from-violet-50 to-purple-50",
		script:
			"대괄호로 꺼내면 없는 키일 때 프로그램이 멈춥니다. get 은 대신 None 이나 정해둔 기본값을 돌려줘서 안전합니다. 이것이 가장 자주 만나는 함정입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`student["grade"]              # 에러!
student.get("grade")          # None
student.get("grade", "없음")   # 없음
"name" in student             # True`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">
						대괄호는 멈춘다 → get 은 기본값을 준다
					</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script:
			"오늘 배운 내용을 정리하겠습니다. 중괄호로 만들고, 이름표로 꺼내고, 추가와 수정은 문법이 같고, 없는 키는 get 으로 안전하게 다룹니다.",
		content: (
			<div className="flex flex-col gap-4">
				{[
					{ t: "중괄호 { } 에 키: 값 으로 만든다", c: "bg-emerald-50" },
					{ t: "번호가 아니라 이름표(키)로 꺼낸다", c: "bg-blue-50" },
					{ t: "추가와 수정은 문법이 같다", c: "bg-green-50" },
					{ t: "없는 키는 get(키, 기본값) 으로", c: "bg-amber-50" },
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
		bg: "from-emerald-50 to-teal-50",
		script:
			"오늘 강의를 마치겠습니다. 이제 실습 페이지에서 직접 만들어봅시다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-6xl font-mono font-bold text-emerald-400">
					&#123; &#125;
				</span>
				<h1 className="text-5xl font-bold text-gray-800">
					개념 강의를 마칩니다
				</h1>
				<p className="text-xl text-gray-600 mt-4">다음: 딕셔너리 실습</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다</p>
			</div>
		),
	},
];

export default function DictionaryGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
