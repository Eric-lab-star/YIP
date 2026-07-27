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
      "지금 미사일이 운석을 그냥 뚫고 지나갑니다. 당연합니다. 화면에 그려진 그림일 뿐이지 진짜 물체가 아니니까요. 부딪혔는지는 우리가 코드로 계산해서 알려줘야 합니다. 오늘은 그 방법과, 그러기 위해 필요한 그룹 나누기를 배웁니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          <span className="text-rose-500">충돌</span> 처리하기
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 11강 · 그룹을 나누고 부딪히게 하기
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 네 가지입니다. 파이게임이 충돌을 어떻게 판단하는지, 스프라이트를 여러 그룹에 동시에 넣는 이유, spritecollide와 groupcollide의 차이, 그리고 dokill 인자가 무엇을 하는지입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· 충돌은 어떻게 판단되나</li>
        <li>· 왜 여러 그룹에 동시에 넣나</li>
        <li>· spritecollide vs groupcollide</li>
        <li>· dokill 인자</li>
      </ul>
    ),
  },
  {
    title: "충돌 = 사각형 겹침",
    bg: "from-white to-blue-50",
    script:
      "파이게임의 스프라이트는 진짜 물체가 아닙니다. 그냥 그림입니다. 그래서 부딪혔다는 건 물리가 아니라 계산입니다. 각 스프라이트의 rect, 3강에서 배운 그 사각형이 겹치는지를 봅니다. 여기서 재미있는 점을 하나 알려주세요. 그림이 동그래도 판정은 네모로 됩니다. 그래서 운석 모서리 근처에서 안 맞은 것 같은데 맞았다는 일이 생깁니다.",
    content: (
      <div className="mx-auto max-w-2xl">
        <CodeBlock>{`  ┌────────┐
  │ 운석   │
  │   ┌────┼────┐
  └───┼────┘    │   ← 사각형이 겹치면 충돌
      │ 미사일 │
      └────────┘`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          그림이 동그래도 판정은 네모
        </p>
      </div>
    ),
  },
  {
    title: "그룹을 나눠야 하는 이유",
    bg: "from-white to-amber-50",
    script:
      "지금은 모든 것이 all_sprite_group 하나에 들어 있습니다. 배경도 우주선도 미사일도 운석도 전부입니다. 그런데 충돌을 확인하려면 우주선이 운석들과 부딪혔냐고 물어야 합니다. all_sprite_group에 물어보면 배경이랑도 부딪혔다고 나옵니다. 그래서 운석만 모아둔 그룹이 따로 필요합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-amber-400 bg-white p-8 text-xl text-gray-700">
          <p className="font-bold text-amber-600">
            all_sprite_group에 물어보면?
          </p>
          <p className="mt-4">배경 · 우주선 · 미사일 · 운석이 전부 들어 있다</p>
          <p className="mt-4">→ &ldquo;배경이랑도 부딪혔다&rdquo;고 나온다</p>
        </div>
      </div>
    ),
  },
  {
    title: "명함첩 두 개에 꽂기",
    bg: "from-white to-violet-50",
    script:
      "핵심은 한 스프라이트가 여러 그룹에 동시에 들어갈 수 있다는 것입니다. 운석은 all_sprite_group에 그려지기 위해 들어가고, meteor_sprite_group에 충돌 판정을 위해 들어갑니다. 7강의 명함첩 비유를 다시 쓰면, 명함을 두 개의 명함첩에 꽂아두는 것입니다. Sprite의 초기화는 그룹을 여러 개 받을 수 있어서 괄호로 묶어 튜플로 넘기면 전부 등록됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`super().__init__((all_sprite_group, meteor_sprite_group))
#                └──── 튜플로 묶어서 넘긴다

# all_sprite_group     → 그려지기 위해
# meteor_sprite_group  → 충돌 판정을 위해`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "두 가지 충돌 함수",
    bg: "from-white to-purple-50",
    script:
      "충돌 함수는 두 가지입니다. spritecollide는 하나 대 그룹입니다. 우주선 하나가 운석들과 부딪혔냐를 물을 때 씁니다. 부딪힌 운석들의 리스트를 돌려줍니다. groupcollide는 그룹 대 그룹입니다. 미사일들과 운석들이 부딪혔냐를 물을 때 씁니다. 미사일 10발과 운석 30개를 일일이 짝지어 비교할 필요 없이 한 줄로 끝납니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="font-mono text-lg font-bold text-sky-600">
            spritecollide
          </h3>
          <p className="mt-3 text-lg text-gray-700">
            하나 vs 그룹
            <br />
            우주선 ↔ 운석들
            <br />
            <span className="text-base text-gray-500">리스트를 돌려준다</span>
          </p>
        </div>
        <div className="rounded-xl border-2 border-purple-400 bg-white p-6">
          <h3 className="font-mono text-lg font-bold text-purple-600">
            groupcollide
          </h3>
          <p className="mt-3 text-lg text-gray-700">
            그룹 vs 그룹
            <br />
            미사일들 ↔ 운석들
            <br />
            <span className="text-base text-gray-500">모든 짝을 한 번에</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "빈 리스트는 False",
    bg: "from-white to-emerald-50",
    script:
      "spritecollide는 리스트를 돌려줍니다. 파이썬에서 빈 리스트는 False 취급이라 if collision이라고만 써도 부딪힌 게 있으면이 됩니다. 이건 파이썬의 유용한 성질이니 짚고 넘어가면 좋습니다. 실습에서는 먼저 print로 리스트를 출력해서 눈으로 확인한 뒤에 조건문으로 바꿉니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`collision = pygame.sprite.spritecollide(player, meteor_group, False)

# 안 부딪히면  []           → False 취급
# 부딪히면    [<Meteor>]   → True 취급

if pygame.sprite.spritecollide(player, meteor_group, False):
    running = False`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "dokill — 부딪히면 없앨까?",
    bg: "from-white to-red-50",
    script:
      "두 함수 모두 dokill이라는 참거짓 인자를 받습니다. False면 부딪혀도 그대로 둡니다. 우주선과 운석에 씁니다. 운석은 계속 날아가고 우리는 게임을 끝낼 뿐입니다. True면 부딪히는 순간 kill해서 없앱니다. 미사일과 운석에 씁니다. 9강에서 배운 kill을 파이게임이 대신 불러주는 것입니다. groupcollide는 양쪽 다 정할 수 있어서 인자가 두 개입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`spritecollide(player, meteor_group, False)
#                                  └ 운석을 없앨까? 아니오

groupcollide(meteor_group, missile_group, True, True)
#                                         └운석  └미사일`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          True, False로 하면? → 관통 미사일!
        </p>
      </div>
    ),
  },
  {
    title: "그룹 전달 지옥",
    bg: "from-white to-orange-50",
    script:
      "여기서 문제가 생깁니다. 미사일도 missile_sprite_group에 넣어야 하는데, 미사일을 만드는 건 우주선입니다. 그래서 main이 그룹을 만들어 Player에게 넘기고, Player가 그걸 들고 있다가 Missile에게 다시 넘겨야 합니다. 그룹이 세 개가 되면 인자가 줄줄이 늘어납니다. 택배를 받을 때마다 옆집을 거쳐서 받는 것과 같습니다. 옆집은 아무 상관도 없는데 계속 짐을 들고 있어야 합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-orange-400 bg-white p-8 text-xl text-gray-700">
          <p>main.py가 그룹을 만들고</p>
          <p className="mt-2 pl-6">→ Player에게 넘기고</p>
          <p className="mt-2 pl-12">→ Player가 들고 있다가</p>
          <p className="mt-2 pl-16">→ Missile에게 다시 넘긴다</p>
          <p className="mt-6 font-bold text-orange-600">
            그룹이 3개면? 인자가 줄줄이
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "해결 — 그룹도 settings.py로",
    bg: "from-white to-teal-50",
    script:
      "해결책은 10강에서 display_surface를 옮긴 것과 같습니다. 그룹들을 settings.py에 두고 필요한 클래스가 직접 가져다 씁니다. 그러면 Missile의 __init__에서 group 인자가 아예 사라집니다. main.py도 짧아집니다. Background 괄호 열고 닫고, Player 괄호 열고 닫고, Meteor.spawn 3처럼 깔끔해집니다. 여러 곳에서 함께 쓰는 것은 한곳에 두고 필요한 쪽이 직접 가져가는 게 깔끔하다는 원칙입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# settings.py
all_sprite_group = pygame.sprite.Group()
meteor_sprite_group = pygame.sprite.Group()
missile_sprite_group = pygame.sprite.Group()

# entity/missile.py
def __init__(self, pos):          # group 인자가 사라졌다
    super().__init__((all_sprite_group, missile_sprite_group))`}</CodeBlock>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
