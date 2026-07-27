"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-red-50",
    script:
      "이제 공격입니다. 미사일은 지금까지 만든 것들과 결정적으로 다릅니다. 우주선과 배경은 게임 시작할 때 하나씩 만들어놓고 끝이지만, 미사일은 계속 새로 태어나고 계속 사라집니다. 오늘은 그 태어나고 사라지는 것을 다루는 법을 배웁니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          <span className="text-red-500">미사일</span> 클래스
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 9강 · 태어나고 사라지는 것
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 네 가지입니다. 미사일이 어디서 태어나 어떻게 움직이다 언제 사라지는지, kill이 무엇을 하는지, get_pressed와 get_just_pressed의 차이, 그리고 쿨다운이 왜 필요하고 어떻게 구현하는지입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· 미사일의 일생 — 태어남 · 살아감 · 사라짐</li>
        <li>· kill()이 하는 일</li>
        <li>· get_pressed vs get_just_pressed</li>
        <li>· 쿨다운의 원리</li>
      </ul>
    ),
  },
  {
    title: "미사일의 일생",
    bg: "from-white to-orange-50",
    script:
      "미사일의 일생은 세 단계입니다. 태어남은 스페이스바를 누른 순간 우주선 위쪽 끝에서입니다. 3강에서 배운 기준점을 여기서 씁니다. 살아감은 매 프레임 위로 이동하는 것입니다. 위로 가야 하니 y를 뺍니다. 사라짐은 화면 위로 완전히 벗어났을 때입니다. 미사일의 아래쪽 변이 화면 맨 위보다 위로 갔다면 완전히 나간 것입니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-xl">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-bold text-orange-600">태어남</span>
          <span className="ml-3 text-gray-600">
            우주선의 midtop에서 (기준점!)
          </span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-bold text-orange-600">살아감</span>
          <span className="ml-3 text-gray-600">
            centery -= dt * speed (위로)
          </span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-bold text-orange-600">사라짐</span>
          <span className="ml-3 text-gray-600">
            rect.bottom &lt; 0 이면 kill()
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "kill() — 명함첩에서 빼기",
    bg: "from-white to-blue-50",
    script:
      "kill은 그 스프라이트를 자기가 속한 모든 그룹에서 빼내는 메서드입니다. 7강의 명함첩 비유를 다시 씁니다. 명함첩에서 빠지면 아무도 그 사람을 부르지 않습니다. 그룹에서 빠지면 update도 draw도 더 이상 안 불립니다. 즉 존재하지 않는 것처럼 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`if self.rect.bottom < 0:
    self.kill()      # 모든 그룹에서 빠진다
                     # → update도 draw도 안 불린다`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          명함첩에서 명함을 빼는 것
        </p>
      </div>
    ),
  },
  {
    title: "kill()을 안 쓰면",
    bg: "from-white to-red-50",
    script:
      "kill을 안 쓰면 어떻게 될까요. 화면 밖으로 나간 미사일이 계속 남습니다. 1분만 쏴도 수백 개가 쌓입니다. 보이지도 않는데 매 프레임 update가 불립니다. 점점 느려지다가 결국 버벅입니다. 실습에서 일부러 kill을 주석 처리하고 한참 쏴보게 하면 좋습니다. 눈에 안 보이는 것이 성능을 갉아먹는다는 걸 체험하게 됩니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-red-400 bg-white p-6">
          <h3 className="text-xl font-bold text-red-500">kill() 없이</h3>
          <ul className="mt-3 space-y-2 text-lg text-gray-700">
            <li>· 화면 밖 미사일이 계속 쌓임</li>
            <li>· 보이지도 않는데 update</li>
            <li>· 점점 느려진다</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="text-xl font-bold text-sky-600">kill() 있으면</h3>
          <ul className="mt-3 space-y-2 text-lg text-gray-700">
            <li>· 벗어나는 순간 사라짐</li>
            <li>· 살아 있는 건 화면 안뿐</li>
            <li>· 몇 시간을 쏴도 부드럽다</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "누르고 있기 vs 누른 순간",
    bg: "from-white to-purple-50",
    script:
      "5강에서 예고했던 것이 드디어 나옵니다. get_pressed는 누르고 있는 동안 계속 True라서 이동에 씁니다. 미사일에 쓰면 1초에 수십 발이 나갑니다. get_just_pressed는 누른 그 프레임에만 True입니다. 꾹 눌러도 한 번만 나갑니다. 발사나 점프처럼 한 번짜리 동작에 씁니다. 떼었다 다시 눌러야 또 True가 됩니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6">
          <h3 className="font-mono text-lg font-bold text-gray-500">
            get_pressed()
          </h3>
          <p className="mt-3 text-lg text-gray-600">
            누르고 있는 동안 계속
            <br />→ 이동
          </p>
        </div>
        <div className="rounded-xl border-2 border-purple-400 bg-white p-6">
          <h3 className="font-mono text-lg font-bold text-purple-600">
            get_just_pressed()
          </h3>
          <p className="mt-3 text-lg text-gray-700">
            누른 그 프레임만
            <br />→ 발사
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "쿨다운 — 엘리베이터 버튼",
    bg: "from-white to-emerald-50",
    script:
      "get_just_pressed를 써도 문제가 남습니다. 스페이스바를 빠르게 연타하면 미사일이 우수수 나갑니다. 게임 밸런스가 무너집니다. 그래서 쿨다운을 둡니다. 엘리베이터 버튼과 같습니다. 아무리 빨리 여러 번 눌러도 일정 시간이 지나야 다시 반응합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`missile_cooldown = 200      # 0.2초 (밀리초)
missile_timer = 0           # 마지막으로 쏜 시각

current_time = pygame.time.get_ticks()
if current_time - missile_timer > missile_cooldown:
    발사!`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "get_ticks()는 스톱워치",
    bg: "from-white to-teal-50",
    script:
      "get_ticks는 게임이 시작된 순간부터 지금까지 몇 밀리초 지났는지를 돌려줍니다. 스톱워치라고 생각하면 됩니다. 지금 시각에서 마지막으로 쏜 시각을 빼면 얼마나 지났는지가 나옵니다. 이게 쿨다운보다 크면 이제 쏴도 된다는 뜻입니다. 여기서 왜 dt를 안 쓰냐는 질문이 나올 수 있는데, 쿨다운은 몇 초에 한 번이라는 절대 시간이라 시계로 재는 게 더 간단하다고 답해주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-teal-400 bg-white p-8 text-xl text-gray-700">
          <p className="font-mono text-teal-600">pygame.time.get_ticks()</p>
          <p className="mt-4">게임 시작 후 흐른 밀리초 = 스톱워치</p>
          <p className="mt-6 font-mono text-lg">
            지금 − 마지막으로 쏜 시각 &gt; 쿨다운
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "우주선이 그룹을 들고 있어야 한다",
    bg: "from-white to-slate-50",
    script:
      "마지막으로 구조 이야기입니다. 미사일을 만드는 건 우주선인데, 미사일도 그룹에 들어가야 그려집니다. 그런데 super.__init__ 괄호 group은 우주선 자신만 그룹에 넣어줍니다. 나중에 미사일을 만들 때 그 그룹을 다시 써야 하니, self.group에 따로 기억해둬야 합니다. 이걸 빠뜨리면 미사일이 만들어지긴 하는데 화면에 안 나옵니다. 그럼 실습으로 가겠습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def __init__(self, group):
    super().__init__(group)   # 우주선 자신만 등록
    self.group = group        # 나중에 쓰려고 기억

def spawn_missile(self):
    Missile(self.group, ...)  # 같은 그룹에 넣는다`}</CodeBlock>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
