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
      "실습을 시작하겠습니다. 오늘 실습은 새로 만드는 것이 거의 없고, 이미 있는 코드를 고치는 작업입니다. 화면상으로는 거의 달라지지 않는데 안쪽이 훨씬 튼튼해집니다. 이런 걸 리팩토링이라고 부른다는 것도 같이 알려주시면 좋습니다. 학생들이 화면이 안 바뀌면 뭔가 잘못했다고 생각할 수 있으니 미리 말해주세요.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">벡터와 dt</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          화면은 그대로, 안쪽은 튼튼하게
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 위치를 Vector2로",
    bg: "from-white to-blue-50",
    script:
      "첫 미션입니다. 이미지를 불러온 아래에서 위치를 Vector2로 묶습니다. 여기서 중요한 안내가 있습니다. 이 미션을 마쳐도 화면은 지금과 똑같아야 합니다. 겉모습이 안 바뀌는 게 정상입니다. 좌표 두 개를 벡터 하나로 묶기만 한 것이니까요. 이걸 말해주지 않으면 학생들이 계속 뭔가 빠뜨렸다고 생각합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`pos = pygame.________(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
player_rect = player_surf.get_frect(center=pos)`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-sky-300 bg-white p-5 text-lg text-gray-700">
          화면이 안 바뀌는 게 정상 — 묶기만 한 것
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 · 속도도 Vector2로",
    bg: "from-white to-emerald-50",
    script:
      "두 번째 미션입니다. 지금은 방향 변수 x, y와 speed를 따로 쓰고 있는데 이걸 속도 벡터 하나로 합칩니다. 그리고 위치 갱신을 center에 speed를 더하는 한 줄로 줄입니다. 여기서 벽 튕김 판정은 잠시 지워두라고 안내해 주세요. 우주선이 화면 밖으로 나가도 괜찮습니다. 다음 챕터에서 키보드로 조종하게 되면 이 부분은 아예 필요 없어집니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`speed = pygame.Vector2(2, 1)

player_rect.______ += speed`}</CodeBlock>
        <div className="mt-6 rounded-xl bg-white p-5 text-lg text-gray-700 shadow-sm">
          벽 튕김 판정은 잠시 지워둔다 — 다음 챕터에서 키보드 조종으로 대체
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · Clock 만들기",
    bg: "from-white to-purple-50",
    script:
      "세 번째 미션입니다. main 함수 위쪽에 Clock 객체를 하나 만들고, 게임 루프 맨 첫 줄에서 tick을 부릅니다. tick을 루프 맨 앞에 두는 것이 관례라고 알려주세요. 한 바퀴가 시작될 때 시간을 재야 정확하기 때문입니다. 여기까지는 화면 변화가 거의 없습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`clock = pygame.time.______()      # main 위에

while running:
    clock.tick(60)                # 루프 맨 앞`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 4 · dt 붙이기 (핵심)",
    bg: "from-white to-cyan-50",
    script:
      "네 번째 미션이 오늘의 핵심입니다. tick이 돌려주는 값을 1000으로 나눠 dt로 받고, speed에 곱합니다. 여기서 반드시 예고해 주셔야 할 것이 있습니다. 이 순간 우주선이 거의 안 움직입니다. 학생들이 당황합니다. 정상이라고 말해주세요. speed의 뜻이 1초에 몇 픽셀로 바뀌었기 때문에 Vector2 2, 1은 1초에 2픽셀이라는 뜻이 됩니다. 숫자를 100배쯤 키우면 원래 속도가 나옵니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`dt = clock.tick(60) / ______

player_rect.center += speed * ____

# 거의 안 움직인다? 정상!
speed = pygame.Vector2(200, 100)`}</CodeBlock>
        <div className="mt-5 rounded-xl border-2 border-amber-400 bg-white p-4 text-lg font-bold text-amber-600">
          &ldquo;안 움직여요&rdquo; → 정상입니다. 숫자를 키우세요.
        </div>
      </div>
    ),
  },
  {
    title: "미션 5 · 확인 실험",
    bg: "from-white to-indigo-50",
    script:
      "마지막은 확인 실험입니다. 델타타임이 정말 일하고 있는지 눈으로 보게 합니다. tick의 숫자를 30, 120으로 바꿔가며 실행하게 하세요. 제대로 됐다면 속도는 그대로이고 부드러움만 달라집니다. 화면 끝까지 가는 시간은 같습니다. 그다음 dt를 잠깐 지우고 같은 실험을 하면 속도까지 달라지는 걸 보게 됩니다. 이 대비가 오늘 배운 것을 가장 확실하게 각인시킵니다. 실험이 끝나면 dt를 꼭 다시 넣게 해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-indigo-300 bg-white p-6 text-xl text-gray-700">
          <p className="font-bold text-indigo-600">dt가 있을 때</p>
          <p className="mt-2">FPS를 바꿔도 → 속도 같음, 부드러움만 달라짐</p>
          <p className="mt-6 font-bold text-red-500">dt를 지우면</p>
          <p className="mt-2">FPS를 바꾸면 → 속도까지 달라짐</p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-cyan-50",
    script:
      "오늘 한 일을 정리하겠습니다. 위치와 속도를 Vector2로 묶어 코드를 절반으로 줄였고, Clock으로 FPS를 제한했고, dt를 곱해서 컴퓨터 성능과 무관하게 같은 속도로 만들었습니다. 그리고 FPS를 바꿔가며 델타타임이 실제로 동작하는 것을 눈으로 확인했습니다. 다음 시간에는 우주선이 혼자 흘러가는 대신 방향키로 직접 조종하게 만듭니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· 위치와 속도를 Vector2로 묶기</li>
        <li>· Clock으로 FPS 제한</li>
        <li>· dt로 컴퓨터마다 같은 속도</li>
        <li className="mt-4 text-cyan-600">다음 시간 — 방향키로 조종하기</li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
