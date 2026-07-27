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
      "실습을 시작합니다. 오늘 실습은 이미 되던 것을 다시 만드는 작업입니다. 화면에 보이는 결과는 지난 시간과 똑같습니다. 그런데 코드 구조가 완전히 달라집니다. 다 하고 나면 main 함수가 훨씬 짧아진 걸 볼 수 있습니다. 결과가 같다는 걸 미리 말해주지 않으면 학생들이 뭘 잘못했나 생각합니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">Player 클래스</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          결과는 같고 구조는 완전히 다르게
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 클래스 껍데기",
    bg: "from-white to-violet-50",
    script:
      "첫 미션은 클래스 껍데기를 만드는 것입니다. display_surface 아래, main 함수 위에 Player 클래스를 만듭니다. 빈칸은 Sprite입니다. 이 단계에서는 아직 아무것도 안 보입니다. 껍데기만 만든 것이라고 말해주세요. super.__init__ 괄호 group이 하는 일을 다시 확인시켜 주면 좋습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Player(pygame.sprite.______):
    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)

    def update(self):
        pass`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 2 · image와 rect",
    bg: "from-white to-purple-50",
    script:
      "두 번째 미션에서 그림과 위치를 넣습니다. 이름을 정확히 지켜야 합니다. 여기서 아주 좋은 실험이 하나 있습니다. 일부러 self.player_image 같은 다른 이름으로 바꿔서 실행해보게 하세요. 아무것도 안 그려집니다. 왜 그런지 스스로 설명하게 하면 약속된 이름이라는 개념이 확실히 박힙니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`self.______ = pygame.image.load(Player.path).convert_alpha()
self.______ = self.image.get_frect(
    center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
)`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-amber-400 bg-white p-5 text-lg text-gray-700">
          <span className="font-bold text-amber-600">해보게 하기:</span> 이름을
          바꾸면? → 아무것도 안 그려진다
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · Group과 두 줄 루프",
    bg: "from-white to-blue-50",
    script:
      "세 번째 미션에서 main 함수를 크게 바꿉니다. 그룹을 만들고 Player를 하나 넣은 뒤, 기존의 키 입력과 위치 갱신과 blit 코드를 전부 지우고 update와 draw 두 줄로 바꿉니다. 여기서 학생들이 코드를 지우기를 무서워합니다. 지워도 된다고 확실히 말해주세요. 이 단계에서는 우주선이 가만히 떠 있는 게 정상입니다. update가 아직 pass니까요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`all_sprite_group = pygame.sprite.______()
Player(all_sprite_group)

# 루프 안 — 기존 코드를 전부 지우고
all_sprite_group.______(dt)
all_sprite_group.______(display_surface)`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          아직 안 움직이는 게 정상 — update가 pass
        </p>
      </div>
    ),
  },
  {
    title: "미션 4 · 자주 나오는 에러",
    bg: "from-white to-red-50",
    script:
      "네 번째 미션에서 update에 이동 코드를 넣습니다. 여기서 거의 모든 학생이 같은 에러를 만납니다. update takes 1 positional argument but 2 were given입니다. update 괄호 self만 있고 dt를 받을 자리를 안 만들었기 때문입니다. group.update 괄호 dt가 dt를 넘겨주니 받을 자리가 있어야 한다고 설명해 주세요. 이 에러는 미리 슬라이드로 보여주면 학생들이 스스로 해결합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-red-300 bg-white p-6">
          <p className="font-mono text-lg text-red-600">
            TypeError: update() takes 1 positional
            <br />
            argument but 2 were given
          </p>
          <p className="mt-5 text-xl text-gray-700">
            → <span className="font-mono">def update(self, dt: float):</span> 로
            고치기
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 5 · 조종을 클래스 안으로",
    bg: "from-white to-emerald-50",
    script:
      "마지막 미션입니다. 5강에서 main에 있던 조종 코드를 클래스 안으로 옮깁니다. 코드는 거의 같은데 self가 붙습니다. 그리고 옮기고 나면 main에 남아 있는 direction 변수와 그 if 문은 아무도 안 씁니다. 지우라고 안내해 주세요. 쓰지 않는 코드를 남겨두면 나중에 읽을 때 헷갈린다는 것도 같이 알려주면 좋은 습관이 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def update(self, dt: float):
    keys = pygame.key.get_pressed()
    self.velocity.x = int(keys[K_d]) - int(keys[K_a])
    self.velocity.y = int(keys[K_s]) - int(keys[K_w])
    if self.velocity.length() > 0:
        self.velocity.____________()
    self.rect.center += self.velocity * Player.speed * dt
    self.rect.________(pygame.Rect(0, 0, W, H))`}</CodeBlock>
        <div className="mt-5 rounded-xl bg-white p-4 text-lg text-gray-700 shadow-sm">
          main에 남은 direction 변수는 이제 안 쓰인다 → 지우기
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-violet-50",
    script:
      "오늘 한 일을 정리하겠습니다. Sprite를 상속받아 Player 클래스를 만들었고, 약속된 이름 image와 rect를 지켰고, Group을 만들어 update와 draw 두 줄로 루프를 정리했고, 키보드 조종을 클래스 안으로 옮겼습니다. 게임 루프를 다시 보게 하세요. 이제 물체가 몇 개로 늘어나도 저 두 줄 그대로입니다. 그런데 main.py 자체는 여전히 깁니다. 다음 시간에는 이 파일을 여러 파일로 쪼갭니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· Sprite를 상속받은 Player 클래스</li>
        <li>· 약속된 이름 image / rect</li>
        <li>· Group으로 루프를 두 줄로</li>
        <li>· 조종 코드를 클래스 안으로</li>
        <li className="mt-4 text-violet-600">
          다음 시간 — main.py를 여러 파일로 쪼개기
        </li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
