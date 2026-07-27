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
      "실습을 시작합니다. 오늘 실습의 핵심은 한 번에 다 만들지 않는 것입니다. 먼저 미사일을 화면 아무 데나 띄워서 보이는지 확인하고, 그다음에 움직이게 하고, 마지막에 발사되게 합니다. 한 번에 다 쓰면 어디가 틀렸는지 못 찾습니다. 단계마다 실행해서 확인하게 해 주세요.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">미사일 발사</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          띄우기 → 날리기 → 발사하기 → 쿨다운
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 일단 보이게만",
    bg: "from-white to-amber-50",
    script:
      "첫 미션은 미사일을 화면에 띄우기만 하는 것입니다. 위치를 일부러 100 100이라는 엉뚱한 곳에 고정해뒀습니다. 지금은 클래스가 제대로 만들어졌는지만 확인하는 단계라고 말해주세요. 8강에서 만든 bg.py와 거의 같은 모양이라 어렵지 않습니다. 화면 왼쪽 위에 미사일이 보이면 성공입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Missile(pygame.sprite.Sprite):
    path = join("images", "missile.png")

    def __init__(self, group):
        super().__init__(group)
        self.image = pygame.image.load(Missile.path).convert_alpha()
        self.rect = self.image.get_frect(center=(100, 100))`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          위치는 일부러 고정 — 지금은 &ldquo;보이는지&rdquo;만 확인
        </p>
      </div>
    ),
  },
  {
    title: "미션 2 · 날아가고 사라지기",
    bg: "from-white to-blue-50",
    script:
      "두 번째 미션에서 미사일을 움직입니다. 빈칸이 네 개입니다. midbottom, 빼기, bottom, kill입니다. 특히 midbottom을 왜 쓰는지 물어보세요. 우주선 코앞에서 나오게 하려면 미사일의 아래쪽이 우주선 위쪽에 맞아야 합니다. 그리고 여기서 좋은 실험이 있습니다. kill 조건을 주석 처리하고 미사일을 여러 개 만들어 한참 두게 하세요. 화면 밖에서도 계속 살아 있는 걸 확인하게 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`self.rect = self.image.get_frect(__________=pos)

def update(self, dt):
    self.rect.centery ___ dt * Missile.speed
    if self.rect.______ < 0:
        self.______()`}</CodeBlock>
        <div className="mt-5 rounded-xl border-2 border-amber-400 bg-white p-4 text-lg text-gray-700">
          <span className="font-bold text-amber-600">해보게 하기:</span> kill을
          빼면? → 화면 밖에서도 계속 살아 있다
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · 우주선이 쏘게 하기",
    bg: "from-white to-purple-50",
    script:
      "세 번째 미션이 오늘의 핵심입니다. player.py에 미사일 클래스를 가져오고, 쿨다운 변수 두 개를 추가하고, self.group에 그룹을 기억하고, spawn_missile과 handleMissile 두 메서드를 추가합니다. 빈칸은 group, get_just_pressed, midtop, handleMissile입니다. 여기서 self.group을 빠뜨리면 미사일이 만들어지긴 하는데 화면에 안 나옵니다. 이 증상을 미리 말해주면 학생이 스스로 찾습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def spawn_missile(self):
    keys = pygame.key.________________()
    if keys[pygame.K_SPACE]:
        Missile(self.group, pygame.Vector2(self.rect.________))
        Player.missile_timer = pygame.time.get_ticks()

def handleMissile(self):
    current_time = pygame.time.get_ticks()
    if current_time - Player.missile_timer > Player.missile_cooldown:
        self.spawn_missile()`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "안 나올 때 체크리스트",
    bg: "from-white to-red-50",
    script:
      "미사일이 안 나온다고 하는 학생이 나오면 이 순서로 확인하게 하세요. 첫째 self.group을 저장했는지, 둘째 update 끝에서 handleMissile을 부르는지, 셋째 player.py에 Missile을 import 했는지입니다. 대부분 이 셋 중 하나입니다. 답을 바로 알려주기보다 이 체크리스트를 보여주고 스스로 찾게 하는 편이 좋습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ol className="flex flex-col gap-5 text-xl text-gray-700">
          <li>
            ① <span className="font-mono">self.group = group</span> 을 저장했나?
          </li>
          <li>
            ② update 끝에서 <span className="font-mono">handleMissile()</span>{" "}
            을 부르나?
          </li>
          <li>
            ③ player.py에{" "}
            <span className="font-mono">from entity.missile import Missile</span>{" "}
            했나?
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: "미션 4 · 쿨다운 느껴보기",
    bg: "from-white to-emerald-50",
    script:
      "마지막 미션은 실험입니다. 쿨다운을 1000으로 바꾸고 연타하면 1초에 한 발만 나갑니다. 50으로 바꾸면 우수수 쏟아집니다. 그리고 세 번째 실험이 재미있습니다. get_just_pressed를 get_pressed로 바꾸고 스페이스바를 꾹 눌러보게 하세요. 누르고 있는 동안 계속 발사되려고 하지만 쿨다운이 막아줘서 일정 간격으로 연사가 됩니다. 어떤 게 더 재미있는지 물어보고 각자 원하는 값으로 정하게 하세요. 정답은 없습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ol className="flex flex-col gap-4 text-xl text-gray-700">
          <li>① 쿨다운 1000 → 1초에 한 발</li>
          <li>② 쿨다운 50 → 우수수</li>
          <li className="text-emerald-600">
            ③ get_pressed로 바꾸고 꾹 누르기 → 자동 연사!
          </li>
        </ol>
        <p className="mt-8 text-center text-xl text-gray-500">
          어떤 게 더 재미있나? 정답은 없다
        </p>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-red-50",
    script:
      "오늘 한 일을 정리하겠습니다. Missile 스프라이트 클래스를 만들었고, kill로 화면을 벗어난 미사일을 정리했고, get_just_pressed로 누른 순간만 잡아냈고, get_ticks로 쿨다운을 만들었습니다. 그리고 main.py에서 미션 1에 넣었던 Missile 줄은 지우게 하세요. 이제 미사일은 우주선이 만들기 때문에 main.py는 몰라도 됩니다. 이제 쏠 수 있는데 맞출 게 없습니다. 다음 시간에는 운석을 만듭니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· Missile 스프라이트 클래스</li>
        <li>· kill()로 화면 밖 정리</li>
        <li>· get_just_pressed로 한 번만</li>
        <li>· get_ticks()로 쿨다운</li>
        <li className="mt-4 text-red-500">다음 시간 — 운석 만들기</li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
