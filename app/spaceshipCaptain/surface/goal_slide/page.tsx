"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-purple-50",
    script:
      "지난 시간에는 검은 창을 띄웠습니다. 오늘은 그 창에 색을 칠하고 모양을 올립니다. 파이게임에서 그림과 관련된 것은 전부 surface라는 하나의 개념으로 통합니다. 오늘 이 개념만 제대로 잡으면 앞으로 우주선도, 운석도, 미사일도 전부 똑같은 방식으로 다룰 수 있습니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          <span className="text-purple-500">surface</span> 이해하기
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 2강 · 도화지와 그림 조각
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 세 가지입니다. pygame.display가 무엇을 담당하는 모듈인지 설명할 수 있어야 하고, display surface와 일반 Surface의 차이를 구분할 수 있어야 하며, flip과 fill을 매 프레임 불러야 하는 이유를 각각 말할 수 있어야 합니다. 특히 두 번째, 이름이 비슷한 두 도화지를 구분하는 것이 오늘의 핵심입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· pygame.display가 담당하는 일 설명하기</li>
        <li>· display surface와 Surface의 차이 구분하기</li>
        <li>· flip과 fill을 매 프레임 부르는 이유 말하기</li>
      </ul>
    ),
  },
  {
    title: "pygame.display — TV 본체",
    bg: "from-white to-blue-50",
    script:
      "pygame.display는 창 자체를 담당하는 모듈입니다. TV 본체라고 생각하면 됩니다. 자주 쓰는 함수가 세 개 있습니다. set_mode는 지난 시간에 쓴 그 함수로 창을 만들고 도화지를 돌려줍니다. set_caption은 창 제목을 붙입니다. 가게 간판과 같아서, set_mode 바로 다음에 한 번만 부르면 계속 유지됩니다. 그리고 flip은 다 그린 그림을 실제로 화면에 내보냅니다. 이건 매 프레임 불러야 합니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-xl">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-mono font-bold text-sky-600">set_mode()</span>
          <span className="ml-3 text-gray-600">창을 만든다 (한 번)</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-mono font-bold text-sky-600">set_caption()</span>
          <span className="ml-3 text-gray-600">창 제목을 붙인다 (한 번)</span>
        </div>
        <div className="rounded-xl border-2 border-sky-400 bg-white p-5">
          <span className="font-mono font-bold text-sky-600">flip()</span>
          <span className="ml-3 text-gray-600">
            화면에 내보낸다 (매 프레임)
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "더블 버퍼링 — 캔버스는 두 장",
    bg: "from-white to-emerald-50",
    script:
      "왜 flip이라는 별도의 명령이 필요할까요. 파이게임은 화면을 두 장 씁니다. 더블 버퍼링이라고 합니다. 화가가 캔버스 두 개를 놓고 작업한다고 생각해 보세요. 뒷면 캔버스에는 지금 열심히 그리는 중인 그림이 있고, 앞면 캔버스는 관객이 보고 있는 그림입니다. flip은 다 그린 뒷면을 앞으로 뒤집어 공개하는 동작입니다. 이걸 안 하면 아무리 그려도 관객은 계속 옛날 그림만 봅니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-500">뒷면 캔버스</h3>
          <p className="mt-4 text-lg text-gray-600">
            지금 그리는 중인 그림
            <br />
            (관객은 못 봄)
          </p>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6 text-center">
          <h3 className="text-2xl font-bold text-emerald-600">앞면 캔버스</h3>
          <p className="mt-4 text-lg text-gray-700">
            관객이 보는 그림
            <br />
            (flip으로 교체)
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "fill()도 매 프레임",
    bg: "from-white to-orange-50",
    script:
      "fill도 매 프레임 불러야 합니다. 이유는 잔상 때문입니다. 이전 프레임에 그린 그림이 화면에 그대로 남아 있으면, 우주선이 움직일 때 지나간 자리가 줄줄이 남습니다. 그래서 매 프레임 도화지를 새 색으로 덧칠해서 깨끗하게 지우고 다시 그립니다. 순서가 중요합니다. 지우기, 그리기, 내보내기 순서입니다. 이 순서는 앞으로 계속 반복되니 통째로 외워두면 좋습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`while running:
    for event in pygame.event.get():
        ...
    display_surface.fill((0, 0, 0))   # ② 지우기
    display_surface.blit(surf, (x, y)) # ③ 그리기
    pygame.display.flip()              # ④ 내보내기`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          ① 이벤트 → ② 지우기 → ③ 그리기 → ④ 내보내기
        </p>
      </div>
    ),
  },
  {
    title: "도화지는 두 종류",
    bg: "from-white to-purple-50",
    script:
      "여기가 오늘 가장 중요한 부분입니다. 이름이 둘 다 surface라서 학생들이 많이 헷갈립니다. display surface는 set_mode가 돌려주는 그 도화지로, 게임에 딱 하나뿐이고 실제로 화면에 보이는 무대입니다. 반면 Surface는 대문자 S로 시작하는 클래스로 만드는 그림 조각입니다. 몇 개든 만들 수 있지만 그 자체로는 화면에 보이지 않습니다. blit으로 무대에 붙여야만 보입니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="mb-4 text-2xl font-bold text-sky-600">
            display surface
          </h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>· set_mode()가 돌려준다</li>
            <li>· 게임에 딱 하나</li>
            <li>· 실제로 화면에 보인다</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-purple-400 bg-white p-6">
          <h3 className="mb-4 text-2xl font-bold text-purple-600">Surface</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>· pygame.Surface()로 만든다</li>
            <li>· 몇 개든 만들 수 있다</li>
            <li>· blit해야 보인다</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "게시판과 색종이",
    bg: "from-white to-slate-50",
    script:
      "비유로 정리하겠습니다. display surface가 교실 게시판이라면, Surface는 손에 든 색종이 조각입니다. 색종이는 아무리 예쁘게 칠해도 게시판에 붙이기 전에는 아무도 볼 수 없습니다. 그 붙이는 동작이 blit입니다. 앞으로 우주선도, 운석도, 미사일도 전부 이 방식입니다. 각자 자기 Surface를 가지고, 매 프레임 무대에 blit 됩니다. 이 구조가 게임 전체를 관통합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`surf = pygame.Surface((100, 150))       # 색종이를 만들고
surf.fill("orange")                     # 색칠하고
display_surface.blit(surf, (100, 100))  # 게시판에 붙인다`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          우주선 · 운석 · 미사일 — 앞으로 전부 이 방식
        </p>
      </div>
    ),
  },
  {
    title: "색을 정하는 두 가지 방법",
    bg: "from-white to-amber-50",
    script:
      "마지막으로 색 지정 방법입니다. 두 가지가 있습니다. RGB 숫자 세 개를 튜플로 넘기는 방법과, 색 이름을 문자열로 넘기는 방법입니다. RGB는 빨강 초록 파랑을 각각 0에서 255 사이로 섞습니다. 0 0 0은 검정, 255 255 255는 흰색입니다. 실습에서 랜덤 색을 만들 때 이 RGB 방식을 쓰게 됩니다. 그럼 실습으로 넘어가겠습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`display_surface.fill((250, 250, 0))   # RGB 숫자
surf.fill("orange")                   # 색 이름

# (0,0,0) 검정 · (255,255,255) 흰색`}</CodeBlock>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
