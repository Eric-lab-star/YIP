"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-blue-50",
    script:
      "안녕하세요, 여러분. 오늘부터 파이게임으로 우주선 게임을 만들어 봅니다. 그런데 게임 코드를 쓰기 전에 먼저 해야 할 일이 있습니다. 작업실을 차리는 일입니다. 오늘은 그 작업실을 만들어주는 도구인 uv를 익히고, 파이게임 프로그램이 어떤 뼈대로 돌아가는지를 이해하는 것이 목표입니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          프로젝트 <span className="text-sky-500">설정하기</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 1강 · uv와 파이게임의 뼈대
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘 수업이 끝나면 세 가지를 할 수 있어야 합니다. 첫째, uv가 무엇을 해주는 도구인지 설명할 수 있어야 합니다. 둘째, 파이게임 프로그램의 네 가지 뼈대를 순서대로 말할 수 있어야 합니다. 준비, 창, 반복, 종료입니다. 셋째, 게임 코드가 왜 while 반복문 안에 들어가야 하는지 설명할 수 있어야 합니다. 이 세 가지가 오늘의 기준입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· uv가 무엇을 해주는 도구인지 설명하기</li>
        <li>· 파이게임의 네 뼈대를 순서대로 말하기</li>
        <li>· 게임이 while 반복문 안에서 도는 이유 설명하기</li>
      </ul>
    ),
  },
  {
    title: "uv — 작업실 관리인",
    bg: "from-white to-amber-50",
    script:
      "게임을 만들려면 파이게임처럼 남이 만들어둔 도구를 가져다 써야 합니다. 그 도구를 내려받고 정리하고 실행까지 시켜주는 관리인이 uv입니다. 명령은 세 개만 기억하면 됩니다. uv init은 새 작업실을 차려주고, uv add는 필요한 장비를 주문해서 넣어주고, uv run은 그 작업실 안에서 프로그램을 돌려줍니다. 이사 갈 집을 설계하고, 가구를 주문하고, 그 집에서 생활하는 것에 비유하면 이해하기 쉽습니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-xl">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-mono font-bold text-sky-600">uv init</span>
          <span className="ml-3 text-gray-600">새 프로젝트를 만든다</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-mono font-bold text-sky-600">uv add</span>
          <span className="ml-3 text-gray-600">필요한 도구를 설치한다</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-mono font-bold text-sky-600">uv run</span>
          <span className="ml-3 text-gray-600">프로그램을 실행한다</span>
        </div>
      </div>
    ),
  },
  {
    title: "왜 pygame이 아니라 pygame-ce일까",
    bg: "from-white to-slate-50",
    script:
      "우리가 설치할 것은 pygame이 아니라 pygame-ce입니다. ce는 커뮤니티 에디션의 약자로, 여러 사람이 더 부지런히 관리하고 있는 버전이라는 뜻입니다. 새로운 기능이 빨리 들어오고 버그도 빨리 고쳐집니다. 중요한 것은, 코드를 쓰는 방법은 기존 pygame과 완전히 똑같다는 점입니다. import 할 때도 그냥 import pygame이라고 씁니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`uv add pygame-ce

# 코드에서는 그냥 pygame으로 쓴다
import pygame`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          ce = Community Edition · 관리가 활발한 파이게임
        </p>
      </div>
    ),
  },
  {
    title: "지금까지의 프로그램 vs 게임",
    bg: "from-white to-purple-50",
    script:
      "여기가 오늘 가장 중요한 부분입니다. 우리가 지금까지 만든 프로그램은 위에서 아래로 한 번 실행되고 끝났습니다. print 하고, 계산하고, 마지막 줄에 도착하면 프로그램이 사라졌습니다. 그런데 게임이 그러면 어떻게 될까요? 창이 뜨자마자 곧바로 꺼져버립니다. 게임은 사용자가 끄기 전까지 계속 살아 있어야 하고, 1초에 수십 번 화면을 다시 그려야 하며, 매 순간 키 입력을 확인해야 합니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6">
          <h3 className="mb-4 text-2xl font-bold text-gray-500">
            지금까지의 프로그램
          </h3>
          <ul className="space-y-2 text-lg text-gray-600">
            <li>· 위에서 아래로 한 번 실행</li>
            <li>· 마지막 줄에 도착하면 끝</li>
            <li>· 창을 띄워도 곧바로 사라짐</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="mb-4 text-2xl font-bold text-sky-600">게임 프로그램</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>· 끄기 전까지 계속 살아 있음</li>
            <li>· 1초에 수십 번 화면을 다시 그림</li>
            <li>· 매 순간 키 입력을 확인</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "게임 루프",
    bg: "from-white to-blue-50",
    script:
      "그래서 게임에는 게임 루프라는 것이 있습니다. while 반복문 하나가 게임이 살아 있는 내내 계속 돕니다. 이 반복문이 한 바퀴 도는 것을 프레임이라고 부릅니다. TV를 생각하면 됩니다. 전원을 끄기 전까지 1초에 수십 번 화면을 새로 뿌리고 있습니다. 게임도 똑같습니다. 반복문 안에서 무슨 일이 있었는지 확인하고, 화면을 다시 그리는 일을 계속 반복합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`running = True
while running:
    # 1. 무슨 일이 있었는지 확인 (이벤트)
    # 2. 화면을 다시 그린다`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          한 바퀴 = 1 프레임
        </p>
      </div>
    ),
  },
  {
    title: "파이게임의 네 뼈대",
    bg: "from-white to-emerald-50",
    script:
      "어떤 파이게임 프로그램이든 뼈대는 똑같습니다. 네 단계만 기억하면 됩니다. 준비 단계에서 pygame.init으로 파이게임의 기능을 켭니다. 오븐을 예열하는 것과 같습니다. 창 단계에서 set_mode로 게임이 펼쳐질 창을 만듭니다. 그림을 그리기 전에 도화지 크기를 정하는 것과 같습니다. 반복 단계가 방금 본 게임 루프입니다. 마지막 종료 단계에서 pygame.quit으로 쓰던 자원을 반납합니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {[
          ["준비", "pygame.init()", "파이게임 기능을 켠다"],
          ["창", "set_mode((가로, 세로))", "그릴 도화지를 만든다"],
          ["반복", "while running:", "끄기 전까지 계속 돈다"],
          ["종료", "pygame.quit()", "자원을 반납한다"],
        ].map(([step, code, desc]) => (
          <div key={step} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-xl font-bold text-emerald-600">{step}</div>
            <div className="mt-1 font-mono text-lg text-gray-800">{code}</div>
            <div className="mt-1 text-base text-gray-500">{desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "이벤트 — 민원 접수함",
    bg: "from-white to-orange-50",
    script:
      "네 뼈대 중에서 학생들이 가장 자주 빠뜨리는 것이 이벤트 처리입니다. pygame.event.get은 민원 접수함이라고 생각하면 됩니다. 키를 누르거나, 마우스를 클릭하거나, 창의 X 버튼을 누른 사건이 전부 여기에 쌓입니다. 매 프레임 이 접수함을 비워주지 않으면 운영체제는 프로그램이 멈췄다고 판단합니다. 실습에서 창이 응답 없음이 되는 학생이 나오면, 십중팔구 이 for 문이 빠진 것입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`for event in pygame.event.get():
    if event.type == pygame.QUIT:
        running = False`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          매 프레임 접수함을 비우지 않으면 창이 &ldquo;응답 없음&rdquo;이 된다
        </p>
      </div>
    ),
  },
  {
    title: "오늘 만들 결과",
    bg: "from-slate-50 to-blue-50",
    script:
      "실습이 끝나면 가로 1280 세로 720짜리 검은 창이 뜨고, X 버튼을 누르면 얌전히 닫히는 프로그램이 완성됩니다. 아직 아무것도 그려져 있지 않지만, 이 검은 화면이 앞으로 우주선이 날아다닐 무대입니다. 다음 시간에는 여기에 색을 칠하고 모양을 그립니다. 그럼 실습으로 넘어가겠습니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-lg border-4 border-gray-700 bg-black">
          <span className="text-lg text-gray-600">1280 x 720</span>
        </div>
        <p className="text-xl text-gray-600">
          X 버튼을 누르면 닫히는 창 — 우주선이 날아다닐 무대
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
