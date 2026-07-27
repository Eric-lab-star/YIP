"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-violet-50",
    script:
      "지난 시간에 배운 상속을 드디어 써먹습니다. 파이게임이 이미 만들어둔 Sprite 클래스를 물려받아 우주선을 다시 만듭니다. 지금은 우주선 하나뿐이라 별로 좋아 보이지 않을 수 있습니다. 하지만 운석이 수십 개 날아다니기 시작하면 이게 없으면 감당이 안 된다는 점을 미리 말해주세요.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          <span className="text-violet-500">Sprite</span> 클래스
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 7강 · 명함 양식과 명함첩
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 세 가지입니다. Sprite와 Group이 각각 무엇인지 설명할 수 있어야 하고, Sprite가 반드시 가져야 하는 image와 rect를 말할 수 있어야 하며, group.update와 group.draw가 무슨 일을 하는지 설명할 수 있어야 합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· Sprite와 Group이 무엇인지</li>
        <li>· 약속된 이름 image와 rect</li>
        <li>· group.update() / group.draw()</li>
      </ul>
    ),
  },
  {
    title: "지금 코드의 문제",
    bg: "from-white to-red-50",
    script:
      "먼저 문제를 느끼게 해야 합니다. 지금 우주선 하나를 관리하는 데 변수가 네 개고 루프 안에 코드가 여러 줄입니다. 여기에 미사일과 운석이 수십 개 추가되면 어떻게 될까요. meteor_surf1, meteor_rect1, meteor_surf2 이런 식으로는 갈 수 없습니다. 6강에서 배운 대로 클래스로 묶어야 하는데, 파이게임은 아예 게임용 클래스를 미리 만들어뒀습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`player_surf = ...     # 이미지
player_rect = ...     # 위치
direction = ...       # 방향
speed = 200           # 속도

# 운석이 30개라면?
# meteor_surf1, meteor_rect1, meteor_surf2 ...`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "명함 양식과 명함첩",
    bg: "from-white to-violet-50",
    script:
      "핵심 비유입니다. Sprite는 회사의 직원 명함 양식입니다. 게임에 등장하는 물체 하나하나의 틀입니다. Group은 그 명함들을 전부 꽂아두는 명함첩입니다. 명함첩을 흔들면 모든 명함이 한꺼번에 움직입니다. 그게 group.update와 group.draw입니다. 이 비유를 계속 반복해 주세요.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-violet-400 bg-white p-6 text-center">
          <h3 className="text-2xl font-bold text-violet-600">Sprite</h3>
          <p className="mt-4 text-lg text-gray-700">
            직원 명함 양식
            <br />
            물체 하나의 틀
          </p>
        </div>
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6 text-center">
          <h3 className="text-2xl font-bold text-sky-600">Group</h3>
          <p className="mt-4 text-lg text-gray-700">
            명함첩
            <br />
            흔들면 전부 함께 움직인다
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "태어나면서 그룹에 등록",
    bg: "from-white to-blue-50",
    script:
      "6강에서 배운 super를 여기서 씁니다. 부모인 Sprite의 초기화를 부르면서 그룹까지 같이 넘깁니다. 이 한 줄 덕분에 객체가 만들어지는 순간 자동으로 그 그룹에 들어갑니다. 그래서 실습에서 Player 괄호 all_sprites라고만 쓰고 변수에 담지 않습니다. 학생들이 이걸 이상하게 생각하니 미리 설명해 주세요. 변수가 없어도 그룹이 붙잡고 있습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Player(pygame.sprite.Sprite):
    def __init__(self, group):
        super().__init__(group)    # 태어나자마자 그룹에 등록

# 변수에 안 담아도 된다
Player(all_sprite_group)`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "image와 rect — 약속된 이름",
    bg: "from-white to-purple-50",
    script:
      "여기가 오늘 가장 중요한 부분입니다. Group이 스프라이트들을 자동으로 그려주려면 그림은 어디 있고 위치는 어디인지 알아야 합니다. 그래서 파이게임은 이름을 딱 정해뒀습니다. self.image는 그릴 그림이고 self.rect는 그릴 위치입니다. self.player_image나 self.position 같은 다른 이름을 쓰면 아무것도 안 그려지거나 오류가 납니다. 이건 우리가 정하는 게 아니라 파이게임과의 약속이라고 강조해 주세요.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="font-mono text-2xl font-bold text-sky-600">
            self.image
          </h3>
          <p className="mt-3 text-lg text-gray-700">그릴 그림 (Surface)</p>
        </div>
        <div className="rounded-xl border-2 border-purple-400 bg-white p-6">
          <h3 className="font-mono text-2xl font-bold text-purple-600">
            self.rect
          </h3>
          <p className="mt-3 text-lg text-gray-700">그릴 위치 (FRect)</p>
        </div>
        <div className="rounded-xl border-2 border-red-300 bg-white p-5 text-center text-lg text-gray-700 md:col-span-2">
          다른 이름을 쓰면 안 그려지거나 오류 — 파이게임과의 약속
        </div>
      </div>
    ),
  },
  {
    title: "update() — 시계 초침",
    bg: "from-white to-emerald-50",
    script:
      "Sprite에는 update라는 또 하나의 약속된 이름이 있습니다. 시계 초침이라고 생각하면 됩니다. 게임 루프가 한 바퀴 돌 때마다 저절로 한 번씩 불립니다. 우리가 직접 부르는 게 아닙니다. 실습에서 학생들이 update를 한 번도 직접 부르지 않았는데 실행되는 걸 보고 신기해합니다. 그때 누가 부르고 있는지 물어보면 좋은 질문이 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def update(self, dt):
    self.rect.y -= 40 * dt     # 매 프레임 자동 실행

# 부르는 쪽
all_sprites.update(dt)         # 그룹이 대신 불러준다`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "update와 draw의 역할 분담",
    bg: "from-white to-teal-50",
    script:
      "두 메서드의 역할이 다릅니다. update는 상태를 바꿉니다. 위치를 옮기고 키 입력을 확인하고 애니메이션을 넘깁니다. 계산만 하는 단계입니다. draw는 화면에 그립니다. 각 스프라이트의 image를 rect 위치에 blit 해줍니다. 우리가 blit을 직접 부를 필요가 없어집니다. 그리고 update에 넘긴 dt는 그룹이 그대로 각 스프라이트에 전달해 줍니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6">
          <h3 className="font-mono text-xl font-bold text-emerald-600">
            update(dt)
          </h3>
          <p className="mt-2 text-lg text-gray-700">
            상태를 바꾼다 — 위치, 입력, 애니메이션 (계산만)
          </p>
        </div>
        <div className="rounded-xl border-2 border-teal-400 bg-white p-6">
          <h3 className="font-mono text-xl font-bold text-teal-600">
            draw(화면)
          </h3>
          <p className="mt-2 text-lg text-gray-700">
            image를 rect 위치에 그린다 (blit을 대신해준다)
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "이게 왜 좋은가",
    bg: "from-violet-50 to-blue-50",
    script:
      "마지막으로 왜 이걸 배우는지 정리합니다. 지금까지는 물체마다 변수가 여러 개였고 루프 안에서 하나씩 위치를 갱신하고 하나씩 blit 했습니다. 운석이 30개면 코드가 폭발합니다. Sprite와 Group을 쓰면 물체마다 클래스 하나, 그리고 메인 루프는 update 한 줄과 draw 한 줄입니다. 물체가 몇 개로 늘어나든 이 두 줄은 그대로입니다. 이게 오늘 Sprite를 배우는 이유입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# 물체가 1개든 100개든 메인 루프는 이 두 줄
all_sprite_group.update(dt)
all_sprite_group.draw(display_surface)`}</CodeBlock>
        <p className="mt-6 text-center text-xl font-bold text-violet-600">
          개수가 늘어나도 루프는 그대로
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
