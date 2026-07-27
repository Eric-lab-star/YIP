"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-indigo-50",
    script:
      "드디어 마지막 시간입니다. 지금은 운석에 부딪히면 창이 그냥 꺼져버립니다. 게임이라면 게임 오버를 보여주고 다시 할 기회를 줘야 합니다. 오늘 이걸 만들면 게임이 완성됩니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          게임 오버와 <span className="text-indigo-500">재시작</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 12강 · 마지막 시간
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 네 가지입니다. 상태 변수로 게임의 흐름을 나누는 방법, 글자를 화면에 그리려면 왜 Surface로 바꿔야 하는지, empty와 add로 그룹을 비우고 되돌리는 법, 그리고 재시작이 무엇을 되돌리는 일인지입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· 상태 변수로 흐름 나누기</li>
        <li>· 글자를 Surface로 굽기</li>
        <li>· empty()와 add()</li>
        <li>· 재시작 = 되돌리기</li>
      </ul>
    ),
  },
  {
    title: "TV 채널 비유",
    bg: "from-white to-blue-50",
    script:
      "지금 코드는 부딪히면 running을 False로 만들어 게임 자체를 끝냅니다. 그런데 진짜 게임은 끝나도 창은 살아 있습니다. 게임을 TV 채널이라고 생각하면 됩니다. TV, 즉 창은 계속 켜져 있고 채널, 즉 상태만 바뀝니다. 플레이 중 채널에서는 우주선이 날고 운석이 떨어지고, 게임 오버 채널에서는 검은 배경에 글자만 보입니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6 text-center">
          <h3 className="text-xl font-bold text-sky-600">플레이 중 채널</h3>
          <p className="mt-3 text-lg text-gray-700">
            우주선이 날고
            <br />
            운석이 떨어진다
          </p>
        </div>
        <div className="rounded-xl border-2 border-gray-400 bg-white p-6 text-center">
          <h3 className="text-xl font-bold text-gray-600">게임 오버 채널</h3>
          <p className="mt-3 text-lg text-gray-700">
            배경만 남고
            <br />
            글자가 보인다
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "running과 game_over는 다르다",
    bg: "from-white to-red-50",
    script:
      "여기가 오늘 가장 헷갈리는 부분입니다. running과 game_over는 완전히 다른 것입니다. running은 창을 닫을지를 정하는 프로그램 자체의 상태입니다. game_over는 지금 어느 화면을 보여줄지 정하는 게임 안의 상태입니다. 이 둘을 헷갈리면 재시작을 만들 수 없습니다. 전원과 채널의 차이라고 다시 짚어주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`running    → 창을 닫을까?      (프로그램 = TV 전원)
game_over  → 어느 화면을?     (게임 안 = 채널)

while running:          # 창은 계속 살아 있다
    if not game_over:   # 채널만 바뀐다
        ...`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "글자도 그림이다",
    bg: "from-white to-amber-50",
    script:
      "파이게임은 글자를 바로 그릴 수 없습니다. 글자를 먼저 그림, 즉 Surface로 구워야 합니다. 도장을 찍는 것과 같습니다. 글자라는 모양을 종이에 찍어서 이미지로 만든 다음 벽에 붙이는 것입니다. render의 인자는 세 개입니다. 그릴 글자, 부드럽게 다듬을지, 그리고 색입니다. 돌려받은 것은 2강에서 배운 그 Surface라서 blit으로 붙일 수 있습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`font = pygame.font.Font(size=100)

self.image = font.render("Game Over", True, "white")
#                         글자        다듬기  색
#            ↑ 돌려받은 건 Surface! → blit 가능`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "HUD는 왜 그룹에 안 맡기나",
    bg: "from-white to-purple-50",
    script:
      "지금까지 스프라이트는 전부 group.draw가 알아서 그려줬습니다. 그런데 HUD는 조금 다릅니다. 우주선이나 운석은 항상 화면에 있어야 하니 그룹에 넣어두면 됩니다. 하지만 HUD는 게임 오버일 때만 보여야 하고 내용도 바뀔 수 있습니다. 그래서 필요한 순간에 직접 blit 하는 draw 메서드를 만듭니다. msg를 받아서 매번 다시 굽기 때문에 나중에 점수 같은 바뀌는 글자도 그릴 수 있습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def draw(self, msg: str):
    self.image = Hud.font.render(msg, True, "white")
    self.rect = self.image.get_frect(center=(W/2, H/2))
    display_surface.blit(self.image, self.rect)

# 나중에는 hud.draw(f"점수: {score}") 도 가능`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "kill()과 empty()",
    bg: "from-white to-emerald-50",
    script:
      "게임 오버가 되면 화면을 깨끗하게 비웁니다. 여기서 empty를 씁니다. 9강에서 배운 kill과 비교해서 설명해 주세요. kill은 스프라이트 하나가 자기가 속한 그룹들에서 스스로 빠지는 것이고, empty는 그룹이 안에 있는 것들을 전부 내보내는 것입니다. 방향이 반대입니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-400 bg-white p-6">
          <h3 className="font-mono text-xl font-bold text-gray-600">
            sprite.kill()
          </h3>
          <p className="mt-3 text-lg text-gray-700">
            스프라이트 하나가
            <br />
            스스로 빠진다
          </p>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6">
          <h3 className="font-mono text-xl font-bold text-emerald-600">
            group.empty()
          </h3>
          <p className="mt-3 text-lg text-gray-700">
            그룹이 전부
            <br />
            내보낸다
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "재시작 = 되돌리기",
    bg: "from-white to-teal-50",
    script:
      "재시작은 비운 것을 되돌리는 일입니다. 세 단계입니다. 배경을 다시 그룹에 넣고, 우주선의 위치를 가운데로 옮겨 그룹에 다시 넣고, 글자를 치우고 상태를 되돌립니다. 여기서 중요한 것은 새로 만드는 게 아니라는 점입니다. bg 변수도 player 변수도 살아 있습니다. 그룹에서만 빠진 것이라 다시 넣어주면 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`all_sprite_group.add(bg)     # ① 배경을 다시
player.reset()               # ② 우주선을 가운데로 + 다시 그룹에
hud.kill()                   # ③ 글자 치우기
game_over = False            #    다시 플레이 채널로

# 새로 만드는 게 아니라 "되돌리는" 것`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "키 입력의 세 번째 방법",
    bg: "from-white to-violet-50",
    script:
      "재시작 키는 또 다른 방법으로 받습니다. KEYDOWN 이벤트입니다. 지금까지 배운 키 입력을 정리해 주세요. get_pressed는 누르는 동안 계속으로 이동에 쓰고, get_just_pressed는 누른 프레임에만으로 발사에 썼고, KEYDOWN 이벤트는 누른 순간 이벤트로 들어옵니다. 뒤의 두 개는 결과가 비슷하지만 KEYDOWN은 이벤트 접수함을 통해 오기 때문에 창 닫기나 타이머와 같은 자리에서 처리할 수 있다는 게 다릅니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-xl">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-mono font-bold text-violet-600">
            get_pressed()
          </span>
          <span className="ml-3 text-gray-600">누르는 동안 — 이동 (5강)</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-mono font-bold text-violet-600">
            get_just_pressed()
          </span>
          <span className="ml-3 text-gray-600">누른 프레임 — 발사 (9강)</span>
        </div>
        <div className="rounded-xl border-2 border-violet-400 bg-white p-5">
          <span className="font-mono font-bold text-violet-600">KEYDOWN</span>
          <span className="ml-3 text-gray-600">
            이벤트로 — 재시작 (오늘)
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "if game_over를 빼면?",
    bg: "from-white to-red-50",
    script:
      "마지막으로 함정 하나입니다. R키 처리에 if game_over 조건을 꼭 넣어야 합니다. 안 그러면 게임 도중에 R을 눌러도 화면이 초기화됩니다. 실습에서 일부러 빼고 실행해보게 하면 왜 필요한지 바로 압니다. 그럼 실습으로 가겠습니다. 오늘 이걸 끝내면 게임이 완성됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`if event.type == pygame.KEYDOWN and event.key == pygame.K_r:
    if game_over:          # ← 이게 없으면?
        ...`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-red-300 bg-white p-5 text-lg text-gray-700">
          게임 도중에 R을 눌러도 화면이 초기화된다
        </div>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
