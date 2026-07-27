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
      "마지막 실습입니다. 오늘 이걸 끝내면 게임이 완성됩니다. 상태를 나누고, 글자를 띄우고, 되돌리는 순서로 갑니다. 학생들에게 오늘이 마지막이라는 것과, 다 하고 나면 친구에게 보여줄 수 있는 게임이 된다는 걸 미리 말해주면 집중도가 올라갑니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">게임 완성</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          상태 나누기 → 글자 → 폰트 → 재시작
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 상태로 나누기",
    bg: "from-white to-blue-50",
    script:
      "첫 미션에서 game_over 상태를 만들고 게임 루프 뒷부분을 두 갈래로 나눕니다. 여기서 두 가지를 강조해 주세요. 첫째, 전에는 running을 False로 만들었는데 이제는 창을 닫지 않습니다. 창은 계속 살아 있고 보여주는 화면만 바뀝니다. 둘째, 배경을 bg 변수에 담는 이유입니다. 게임 오버일 때는 그룹을 안 쓰고 배경만 직접 blit 해야 하니 배경 객체를 손에 들고 있어야 합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`game_over = ______
bg = Background()        # 변수에 담는다

if not game_over:
    if pygame.sprite.spritecollide(player, meteor_group, False):
        game_over = ______
    all_sprite_group.update(dt)
    all_sprite_group.draw(display_surface)
else:
    player.kill()
    meteor_sprite_group.empty()
    display_surface.blit(bg.image)`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 2 · 일단 글자부터",
    bg: "from-white to-amber-50",
    script:
      "두 번째 미션에서 HUD 클래스를 만드는데, 먼저 글자가 나오는지부터 확인합니다. 이 단계에서는 글자가 항상 보입니다. 그게 정상이라고 미리 말해주세요. 다음 미션에서 고칩니다. 그리고 font가 클래스 변수라 import 하는 순간 실행된다는 점, 10강에서 배운 그 함정이라는 점을 짚어주세요. settings.py에서 pygame.init을 이미 했으니 괜찮습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Hud(pygame.sprite.Sprite):
    font = pygame.font.Font(size=100)

    def __init__(self):
        super().__init__(all_sprite_group)
        self.image = Hud.font.______("Game Over", True, "white")`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          글자가 항상 보이는 게 정상 — 다음 미션에서 고친다
        </p>
      </div>
    ),
  },
  {
    title: "미션 3 · 필요할 때만",
    bg: "from-white to-purple-50",
    script:
      "세 번째 미션에서 draw 메서드를 만들어 필요할 때만 그리게 합니다. __init__의 글자를 빈 문자열로 바꾸고, msg를 받아 매번 다시 굽는 draw를 추가합니다. display_surface를 settings에서 가져와야 한다는 걸 놓치는 학생이 많으니 확인해 주세요. 평소엔 안 보이다가 부딪히면 Game Over가 뜨면 성공입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def __init__(self, msg=""):        # 기본값 빈 문자열

def draw(self, msg: str):
    self.image = Hud.font.render(msg, True, "white")
    self.rect = self.image.get_frect(center=(W/2, H/2))
    display_surface.______(self.image, self.rect)`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          settings에서 display_surface를 가져왔는지 확인
        </p>
      </div>
    ),
  },
  {
    title: "미션 4 · 폰트 바꾸기",
    bg: "from-white to-teal-50",
    script:
      "네 번째 미션은 짧고 성취감이 큽니다. 갈무리 폰트를 받아 images 폴더에 넣고 font_path를 만들어 Font에 넘깁니다. 글자 모양이 픽셀 폰트로 바뀝니다. 여기서 다른 폰트를 써도 된다고 알려주세요. ttf 파일이면 뭐든 됩니다. 자기 게임에 어울리는 폰트를 직접 찾아보게 하면 재미있어 합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`font_path: str = join("images", "________")
font = pygame.font.Font(________, size=100)`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          .ttf 파일이면 뭐든 된다 — 직접 찾아봐도 좋다
        </p>
      </div>
    ),
  },
  {
    title: "미션 5 · 재시작",
    bg: "from-white to-indigo-50",
    script:
      "마지막 미션입니다. 세 부분으로 나뉩니다. 게임 오버일 때 그룹을 전부 비우고, Player에 reset 메서드를 만들고, R키를 KEYDOWN 이벤트로 받습니다. 여기서 꼭 시켜볼 것이 있습니다. if game_over 조건을 빼고 실행해보게 하세요. 게임 도중에 R을 눌러도 화면이 초기화됩니다. 조건이 왜 필요한지 바로 압니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# ① 게임 오버 시 전부 비우기
all_sprite_group.______()

# ② player.py
def reset(self):
    self.rect.center = pygame.Vector2(W/2, H/2)
    all_sprite_group.____(self)

# ③ R키 이벤트
if event.type == pygame.KEYDOWN and event.key == pygame.____:
    if game_over:      # ← 빼고 실행해보게 하기!`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "게임 완성!",
    bg: "from-emerald-50 to-indigo-50",
    script:
      "게임이 완성됐습니다. 여기서 수업을 끝내지 말고 더 만들어보고 싶다면 항목을 같이 읽어주세요. 점수 세기, 목숨 만들기, 시간이 지날수록 난이도 올리기, 소리 넣기 같은 것들입니다. 여기서부터는 학생 각자의 게임입니다. 12강 동안 창 하나 띄우는 것부터 시작해서 진짜 게임을 완성했다는 것, 그리고 오늘 쓴 기술이 게임뿐 아니라 어떤 프로그램에도 쓰인다는 것을 꼭 말해주세요. 수고하셨습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-3xl font-bold text-indigo-600">
          우주선 게임 완성!
        </p>
        <ul className="mt-8 flex flex-col gap-3 text-xl text-gray-700">
          <li>· 점수를 세어보기</li>
          <li>· 목숨 만들기</li>
          <li>· 시간이 지날수록 난이도 올리기</li>
          <li>· 소리 넣기 (pygame.mixer)</li>
        </ul>
        <p className="mt-8 text-center text-xl text-gray-500">
          여기서부터는 각자의 게임입니다
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
