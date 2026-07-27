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
      "실습을 시작합니다. 오늘 실습은 중간에 리팩토링이 한 번 들어갑니다. 미션 1부터 3까지로 우주선 충돌까지 만들고, 미션 4에서 구조를 정리한 뒤, 미션 5에서 미사일 충돌을 붙입니다. 리팩토링을 먼저 하지 않으면 그룹을 계속 넘기느라 코드가 감당이 안 됩니다. 순서를 지켜주세요.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">충돌</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          그룹 나누기 → 감지 → 종료 → 리팩토링 → 미사일 충돌
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 운석 전용 그룹",
    bg: "from-white to-violet-50",
    script:
      "첫 미션에서 운석 전용 그룹을 만듭니다. 여기서 중요한 것이 하나 있습니다. Player를 변수에 담아야 합니다. 지금까지는 Player 괄호 group만 쓰고 변수에 안 담았는데, 나중에 이 우주선이 부딪혔냐를 물어보려면 변수가 필요합니다. 그리고 meteor.py가 튜플을 받도록 고칩니다. 이 미션을 마쳐도 화면은 안 바뀝니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`meteor_sprite_group = pygame.sprite.Group()
______ = Player(all_sprite_group)      # 변수에 담아야 한다!

Meteor.spawn((all_sprite_group, meteor_sprite_group), 3)`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          화면은 안 바뀐다 — 그룹에만 추가된 것
        </p>
      </div>
    ),
  },
  {
    title: "미션 2 · 먼저 눈으로 확인",
    bg: "from-white to-blue-50",
    script:
      "두 번째 미션에서 충돌을 감지하는데, 바로 게임을 끝내지 않고 먼저 print로 출력해서 눈으로 보게 합니다. 우주선을 운석 쪽으로 몰고 가면 터미널에 리스트가 찍힙니다. 안 부딪혔을 때는 빈 대괄호가 나오고 부딪히면 Meteor 객체가 담겨 나옵니다. 운석 두 개에 동시에 부딪히면 두 개가 나온다는 것도 확인시켜 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`collision = pygame.sprite.____________(
    player, meteor_sprite_group, False
)
print(collision)

# 안 부딪히면  []
# 부딪히면    [<Meteor Sprite...>]`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 3 · 조건문으로 끝내기",
    bg: "from-white to-emerald-50",
    script:
      "세 번째 미션은 간단합니다. 빈 리스트가 False 취급이라는 성질을 이용해 조건문에 바로 넣습니다. running을 False로 만들면 게임 루프가 끝납니다. print 줄은 지우게 하세요. 그리고 세 번째 인자가 False인 것을 짚어주세요. True로 하면 부딪힌 운석이 사라집니다. 지금은 어차피 게임이 끝나니 상관없어 보이지만 나중에 목숨 개념을 넣으면 달라집니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`if pygame.sprite.spritecollide(player, meteor_sprite_group, False):
    running = ______`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          세 번째 인자 False — 목숨 개념을 넣으면 달라진다
        </p>
      </div>
    ),
  },
  {
    title: "미션 4 · 리팩토링 (핵심)",
    bg: "from-white to-orange-50",
    script:
      "네 번째 미션이 오늘 가장 중요합니다. 미사일 충돌을 붙이기 전에 구조를 정리합니다. settings.py에 그룹 세 개를 모으고, 각 클래스가 직접 가져다 쓰게 고칩니다. bg.py, player.py, meteor.py, missile.py 네 파일 모두에서 group 인자를 없앱니다. player.py의 self.group도 이제 필요 없습니다. 미사일이 알아서 자기 그룹을 찾아가니까요. 파일이 많아서 헷갈릴 수 있으니 한 파일씩 고치고 실행해서 확인하게 하세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# settings.py 맨 아래
all_sprite_group = pygame.sprite.Group()
meteor_sprite_group = pygame.sprite.Group()
missile_sprite_group = pygame.sprite.Group()

# 각 클래스에서 group 인자 삭제
def __init__(self):
    super().__init__((all_sprite_group, meteor_sprite_group))`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          한 파일씩 고치고 실행해서 확인하기
        </p>
      </div>
    ),
  },
  {
    title: "리팩토링 후 main.py",
    bg: "from-white to-teal-50",
    script:
      "리팩토링이 끝나면 main.py가 이렇게 짧아집니다. Background 괄호 열고 닫고, Player 괄호 열고 닫고, Meteor.spawn 3입니다. 그룹을 하나도 안 넘깁니다. 학생들에게 리팩토링 전후를 나란히 보여주면 왜 했는지가 확 와닿습니다. 그리고 게임은 똑같이 돌아가야 한다는 점, 리팩토링이니까 당연하다는 점을 다시 확인시켜 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def main():
    running = True
    Background()          # 인자 없음
    player = Player()     # 인자 없음
    ...
        if event.type == meteor_event:
            Meteor.spawn(3)   # 그룹 없이 개수만`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 5 · 한 줄로 완성",
    bg: "from-white to-rose-50",
    script:
      "마지막 미션은 한 줄입니다. groupcollide로 운석 그룹과 미사일 그룹을 검사하고 양쪽 다 True로 줍니다. 미사일이 운석에 맞으면 둘 다 사라집니다. 리팩토링을 해뒀기 때문에 이게 한 줄로 끝난다는 걸 강조해 주세요. 그리고 실험을 시키세요. True, False로 바꾸면 운석만 터지고 미사일은 계속 날아갑니다. 관통 미사일입니다. 어떤 게 더 재미있는지 각자 정하게 하세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`pygame.sprite.____________(
    meteor_sprite_group, missile_sprite_group, ____, ____
)`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-rose-300 bg-white p-5 text-lg text-gray-700">
          <span className="font-bold text-rose-500">실험:</span> True, False로
          바꾸면? → 관통 미사일
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-rose-50",
    script:
      "오늘 한 일을 정리하겠습니다. 운석 전용 그룹을 만들어 스프라이트를 여러 그룹에 동시 등록했고, spritecollide로 우주선과 운석의 충돌을 감지해 게임을 끝냈고, 그룹을 settings.py로 옮겨 전달 지옥을 없앴고, groupcollide로 미사일과 운석이 서로 터지게 했습니다. 이제 게임의 규칙이 다 생겼습니다. 그런데 부딪히면 창이 그냥 꺼져버립니다. 다음 시간에는 게임 오버 화면과 재시작을 만들어 게임을 완성합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· 운석 전용 그룹, 여러 그룹 동시 등록</li>
        <li>· spritecollide로 게임 오버</li>
        <li>· 그룹을 settings.py로 (전달 지옥 해결)</li>
        <li>· groupcollide로 운석 터뜨리기</li>
        <li className="mt-4 text-rose-500">
          다음 시간 — 게임 오버 화면과 재시작
        </li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
