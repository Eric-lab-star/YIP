"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-rose-50",
    script:
      "지금까지 만든 main.py가 꽤 길어졌습니다. 우주선 하나 관리하는 데도 변수가 여러 개인데, 앞으로 미사일과 운석까지 나오면 변수가 수십 개로 불어납니다. 오늘 배우는 클래스가 그 문제를 푸는 열쇠입니다. 그리고 다음 시간에 파이게임의 Sprite를 상속받으려면 오늘 내용이 반드시 필요합니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          <span className="text-rose-500">클래스</span> 개념
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 6강 · 붕어빵 틀과 붕어빵
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 네 가지입니다. 클래스와 인스턴스의 관계를 비유로 설명할 수 있어야 하고, __init__과 self가 각각 무엇인지 말할 수 있어야 하며, 인스턴스 변수와 클래스 변수의 차이를 알아야 하고, 상속과 super가 왜 필요한지 설명할 수 있어야 합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· 클래스와 인스턴스의 관계</li>
        <li>· __init__ 과 self</li>
        <li>· 인스턴스 변수 vs 클래스 변수</li>
        <li>· 상속과 super()</li>
      </ul>
    ),
  },
  {
    title: "왜 클래스가 필요할까",
    bg: "from-white to-amber-50",
    script:
      "먼저 필요성부터 느끼게 해야 합니다. 플레이어 두 명을 변수로 관리한다고 해봅시다. 이름, 체력, 속도를 각각 따로 만들면 두 명에 여섯 개입니다. 열 명이면 서른 개입니다. 이름 짓기도 힘들고 실수하기도 쉽습니다. 클래스를 쓰면 Player를 한 번 정의하고 열 번 부르면 끝입니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6">
          <h3 className="mb-3 text-xl font-bold text-gray-500">클래스 없이</h3>
          <pre className="font-mono text-sm text-gray-600">{`player1_name = "Alice"
player1_hp = 100
player2_name = "Bob"
player2_hp = 80
...`}</pre>
          <p className="mt-3 text-base text-red-500">10명이면 변수 30개</p>
        </div>
        <div className="rounded-xl border-2 border-rose-400 bg-white p-6">
          <h3 className="mb-3 text-xl font-bold text-rose-500">클래스로</h3>
          <pre className="font-mono text-sm text-gray-700">{`class Player: ...

p1 = Player("Alice", 100)
p2 = Player("Bob", 80)`}</pre>
          <p className="mt-3 text-base text-rose-500">10명이어도 10줄</p>
        </div>
      </div>
    ),
  },
  {
    title: "붕어빵 틀과 붕어빵",
    bg: "from-white to-rose-50",
    script:
      "핵심 비유입니다. 클래스는 붕어빵 틀이고, 인스턴스는 그 틀로 찍어낸 붕어빵입니다. 틀 하나로 팥 붕어빵과 슈크림 붕어빵을 여러 개 찍어낼 수 있습니다. 모양은 같지만 속은 다릅니다. 설계도는 하나지만 결과물은 여러 개고, 각자 고유한 데이터를 갖습니다. 이 비유를 계속 반복해서 써 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Player:                    # 붕어빵 틀
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

player1 = Player("Alice", 100)   # 붕어빵 1
player2 = Player("Bob", 80)      # 붕어빵 2`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          틀은 하나 · 붕어빵은 여러 개 · 속은 각자 다르다
        </p>
      </div>
    ),
  },
  {
    title: "__init__ — 태어날 때 자동 실행",
    bg: "from-white to-blue-50",
    script:
      "__init__은 객체가 태어날 때 자동으로 실행되는 함수입니다. Player 괄호 Alice라고 쓰는 순간 저절로 불립니다. 붕어빵 틀에 반죽과 팥을 넣는 순간이라고 생각하면 됩니다. 여기서 그 객체의 처음 값들을 정해줍니다. 학생들이 이걸 직접 부르려고 하는 경우가 있는데, 부르는 게 아니라 저절로 불린다는 점을 강조해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`player1 = Player("Alice", 100)
#        ↑ 이 순간 __init__ 이 저절로 실행된다`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          붕어빵 틀에 반죽을 붓는 순간
        </p>
      </div>
    ),
  },
  {
    title: "self — 나 자신",
    bg: "from-white to-purple-50",
    script:
      "self는 나 자신이라는 뜻입니다. self.name에 값을 넣는 것은 내 이름표에 이 값을 붙이라는 뜻입니다. 중요한 것은 self를 붙인 것만 그 객체의 것으로 남는다는 점입니다. self 없이 그냥 name이라고 쓰면 함수가 끝나는 순간 사라지는 임시 변수일 뿐입니다. 이건 학생들이 정말 자주 틀리는 부분이니 여러 번 강조해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def __init__(self, name, hp):
    self.name = name    # 내 이름표에 붙는다 → 남는다
    hp = hp             # 그냥 임시 변수 → 사라진다`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-purple-300 bg-white p-5 text-lg text-gray-700">
          self를 붙인 것만 그 객체의 데이터가 된다
        </div>
      </div>
    ),
  },
  {
    title: "self는 왜 안 넘길까",
    bg: "from-white to-slate-50",
    script:
      "여기서 꼭 나오는 질문이 있습니다. 메서드를 정의할 때는 self를 첫 번째 자리에 쓰는데, 부를 때는 왜 안 넘기냐는 것입니다. 답은 파이썬이 알아서 넣어주기 때문입니다. player1 점 take_damage 30이라고 부르면, 파이썬이 누가 불렀는지를 보고 player1을 self 자리에 넣어줍니다. 그래서 정의는 인자 두 개, 호출은 인자 한 개가 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def take_damage(self, damage):   # 정의: 인자 2개
    ...

player1.take_damage(30)          # 호출: 인자 1개
#  ↑ 파이썬이 player1을 self에 넣어준다`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "게시판과 사물함",
    bg: "from-white to-emerald-50",
    script:
      "다음은 클래스 변수와 인스턴스 변수의 차이입니다. 클래스 변수는 교실 게시판입니다. 모든 학생이 같은 것을 봅니다. 인스턴스 변수는 각자의 사물함입니다. 사람마다 내용이 다릅니다. 읽는 방법도 다릅니다. 클래스 변수는 클래스 이름으로, 인스턴스 변수는 객체 이름으로 접근합니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6">
          <h3 className="text-xl font-bold text-emerald-600">
            클래스 변수 = 게시판
          </h3>
          <pre className="mt-3 font-mono text-base text-gray-700">{`max_players = 4
Player.max_players`}</pre>
        </div>
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="text-xl font-bold text-sky-600">
            인스턴스 변수 = 사물함
          </h3>
          <pre className="mt-3 font-mono text-base text-gray-700">{`self.name = name
player1.name`}</pre>
        </div>
      </div>
    ),
  },
  {
    title: "상속 — 스마트폰과 전화기",
    bg: "from-white to-indigo-50",
    script:
      "마지막은 상속입니다. 이미 만든 클래스의 기능을 물려받아 새 클래스를 만드는 것입니다. 스마트폰은 전화기를 상속받았습니다. 통화 기능은 그대로 물려받고 거기에 카메라와 인터넷을 더했습니다. 코드에서는 클래스 이름 뒤 괄호에 부모를 넣습니다. 그러면 부모의 모든 기능을 그대로 가져옵니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Warrior(Player):        # Player를 물려받는다
    def __init__(self, name, hp, sword):
        super().__init__(name, hp)   # 부모 초기화 재사용
        self.sword = sword           # 전사만의 데이터

    def slash(self):                 # 전사만의 기능
        ...`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "super()와 오버라이딩",
    bg: "from-white to-teal-50",
    script:
      "상속에서 두 가지만 기억하면 됩니다. 첫째, super 점 __init__은 부모가 이미 써둔 초기화 코드를 재사용합니다. 이게 없으면 self.name 같은 줄을 자식에 또 써야 합니다. 둘째, 부모와 같은 이름의 메서드를 자식에서 다시 쓰면 자식 것이 이깁니다. 이걸 오버라이딩이라고 합니다. 그리고 왜 지금 상속을 배우는지 꼭 말해주세요. 다음 시간에 파이게임의 Sprite 클래스를 상속받게 됩니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-teal-600">super()</h3>
          <p className="mt-2 text-lg text-gray-700">
            부모의 초기화 코드를 재사용 — 같은 코드를 두 번 쓰지 않는다
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-teal-600">오버라이딩</h3>
          <p className="mt-2 text-lg text-gray-700">
            같은 이름의 메서드를 자식에서 다시 쓰면 자식 것이 이긴다
          </p>
        </div>
        <div className="rounded-xl border-2 border-indigo-400 bg-white p-5 text-lg font-bold text-indigo-600">
          다음 시간: class Player(pygame.sprite.Sprite)
        </div>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
