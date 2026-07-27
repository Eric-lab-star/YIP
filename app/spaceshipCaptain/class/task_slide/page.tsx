"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-emerald-50",
    script:
      "오늘 실습은 게임 코드를 건드리지 않습니다. 클래스는 눈으로 봐서는 절대 익지 않기 때문에, 오늘은 순수하게 문제만 풉니다. Level 1은 코드를 읽고 결과를 맞히는 퀴즈, Level 2는 직접 짜보는 기본 문제 15개, Level 3은 실제로 쓸 법한 종합 문제 10개입니다. Level 2까지만 해도 게임을 만드는 데는 충분하다고 미리 말해주세요.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">클래스 연습</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          Level 1 퀴즈 → Level 2 기본 → Level 3 종합
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 진행",
    bg: "from-white to-slate-50",
    script:
      "진행 계획입니다. Level 1 퀴즈 10문항을 15분, Level 2 기본 문제 15개를 40분 정도 잡습니다. Level 3은 수업 시간에 다 못 풀어도 괜찮습니다. 숙제로 가져가거나 게임을 다 만든 뒤에 돌아와서 풀어도 됩니다. 진도에 쫓겨서 Level 3까지 억지로 끌고 가지 마세요.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-5 text-xl">
        <div className="rounded-xl border-2 border-sky-400 bg-white p-5">
          <span className="font-bold text-sky-600">Level 1 · 15분</span>
          <span className="ml-3 text-gray-600">
            코드 읽고 결과 맞히기 (10문항)
          </span>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-5">
          <span className="font-bold text-emerald-600">Level 2 · 40분</span>
          <span className="ml-3 text-gray-600">직접 짜보기 (15문제)</span>
        </div>
        <div className="rounded-xl border-2 border-gray-300 bg-white p-5">
          <span className="font-bold text-gray-500">Level 3 · 숙제</span>
          <span className="ml-3 text-gray-600">종합 설계 (10문제)</span>
        </div>
      </div>
    ),
  },
  {
    title: "Level 1 · 먼저 머리로",
    bg: "from-white to-blue-50",
    script:
      "Level 1을 시작하기 전에 규칙을 하나 정해 주세요. 실행해보기 전에 먼저 머리로 답을 정하고 나서 선택지를 고르는 것입니다. 실행부터 해버리면 아무것도 남지 않습니다. 특히 6번 문제, Counter의 count 문제는 클래스 변수와 self의 관계를 묻는 함정 문제라 정답률이 낮습니다. 틀린 학생이 많으면 그 자리에서 같이 짚어주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Counter:
    count = 0

    def add(self):
        self.count += 1

c = Counter()
c.add()
c.add()
print(c.count)      # 답은?`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          6번 — 클래스 변수와 self의 관계를 묻는 함정
        </p>
      </div>
    ),
  },
  {
    title: "Level 2 · 어디까지 왔나 확인",
    bg: "from-white to-emerald-50",
    script:
      "Level 2는 15문제입니다. 문제 1부터 8까지가 기본기입니다. 클래스 만들기, 메서드 추가, 여러 객체 만들기, 속성 수정, 계산 메서드, 누적 기능입니다. 여기까지는 전원이 풀어야 합니다. 9번 __str__부터는 조금 새롭습니다. 12번 클래스 변수, 15번 종합 문제는 시간이 걸리니 여유를 두세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ul className="flex flex-col gap-4 text-xl text-gray-700">
          <li>
            <span className="font-bold text-emerald-600">1~8번</span> · 기본기 —
            전원 통과 목표
          </li>
          <li>
            <span className="font-bold text-sky-600">9~11번</span> · __str__,
            객체 리스트, 조건 메서드
          </li>
          <li>
            <span className="font-bold text-purple-600">12~15번</span> · 클래스
            변수, 객체 비교, 종합
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "자주 나오는 실수",
    bg: "from-white to-red-50",
    script:
      "Level 2에서 나오는 대표적인 실수 세 가지를 미리 알려드립니다. 첫째, 메서드 정의에 self를 빠뜨리는 것입니다. 둘째, self 없이 그냥 변수에 넣어서 나중에 못 찾는 것입니다. 셋째, 메서드 안에서 print만 하고 return을 안 해서, 반환값을 쓰는 문제에서 None이 나오는 것입니다. 특히 세 번째가 많습니다. 문제에 반환한다고 적혀 있으면 return이 필요하다고 짚어주세요.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="rounded-xl border-2 border-red-300 bg-white p-5 text-lg">
          <p className="font-bold text-red-600">def bark(): 로 시작</p>
          <p className="mt-1 text-gray-700">→ self를 빠뜨림</p>
        </div>
        <div className="rounded-xl border-2 border-red-300 bg-white p-5 text-lg">
          <p className="font-bold text-red-600">name = name</p>
          <p className="mt-1 text-gray-700">→ self.name = name 이어야 함</p>
        </div>
        <div className="rounded-xl border-2 border-amber-400 bg-white p-5 text-lg">
          <p className="font-bold text-amber-600">print만 하고 return 없음</p>
          <p className="mt-1 text-gray-700">→ &ldquo;반환한다&rdquo;면 return</p>
        </div>
      </div>
    ),
  },
  {
    title: "Level 3 · 설계를 연습한다",
    bg: "from-white to-purple-50",
    script:
      "Level 3은 성격이 다릅니다. 문법이 아니라 설계를 연습하는 문제입니다. 성적 관리, 재고 관리, 카페 주문, 출석 통계, RPG 상점 같은 실제로 쓸 법한 프로그램을 클래스로 만듭니다. 여기서는 정답 코드를 알려주기보다, 어떤 속성이 필요하고 어떤 메서드가 필요한지를 먼저 종이에 적어보게 하는 게 훨씬 도움이 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-purple-400 bg-white p-6 text-xl text-gray-700">
          <p className="font-bold text-purple-600">코드부터 쓰지 말고</p>
          <p className="mt-4">① 어떤 데이터가 필요한가 → 속성</p>
          <p className="mt-2">② 어떤 동작이 필요한가 → 메서드</p>
          <p className="mt-2">③ 그다음에 코드로 옮긴다</p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-rose-50",
    script:
      "오늘 한 일을 정리하겠습니다. Level 1 퀴즈로 클래스와 self와 클래스 변수의 동작을 확인했고, Level 2에서 클래스를 직접 15개 짜봤고, Level 3에서 실제로 쓸 법한 프로그램을 설계해봤습니다. 다음 시간에는 드디어 이 클래스를 게임에 씁니다. 파이게임이 만들어둔 Sprite 클래스를 상속받아 우주선을 다시 만듭니다. 오늘 배운 상속이 바로 그때 쓰입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· Level 1 — 클래스 동작 확인 퀴즈</li>
        <li>· Level 2 — 클래스 직접 15개 작성</li>
        <li>· Level 3 — 실전 프로그램 설계</li>
        <li className="mt-4 text-rose-500">
          다음 시간 — Sprite를 상속받아 우주선 다시 만들기
        </li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
