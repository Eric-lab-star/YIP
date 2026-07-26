"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-cyan-50",
    script:
      "지난 시간에 만든 우주선을 친구 컴퓨터에서 돌려보면 이상한 일이 생깁니다. 어떤 컴퓨터에서는 슝 날아가고, 어떤 컴퓨터에서는 느릿느릿합니다. 같은 코드인데 말입니다. 오늘은 그 문제를 해결합니다. 그리고 x와 y를 따로 들고 다니느라 길어진 코드도 벡터로 깔끔하게 묶습니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          <span className="text-cyan-600">FPS</span>와{" "}
          <span className="text-cyan-600">Vector</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 4강 · 컴퓨터마다 같은 속도로
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 세 가지입니다. Vector2가 무엇이고 왜 x y를 따로 두는 것보다 편한지 설명할 수 있어야 하고, FPS가 무엇이며 clock.tick이 무슨 일을 하는지 말할 수 있어야 하며, 델타타임을 곱하면 왜 컴퓨터마다 같은 속도가 되는지 설명할 수 있어야 합니다. 세 번째가 오늘 가장 어려운 부분입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· Vector2가 왜 편한지 설명하기</li>
        <li>· FPS와 clock.tick()이 하는 일 말하기</li>
        <li>· dt를 곱하면 속도가 같아지는 이유 설명하기</li>
      </ul>
    ),
  },
  {
    title: "Vector2 — 화살표 하나",
    bg: "from-white to-blue-50",
    script:
      "벡터는 화살표라고 생각하면 됩니다. 보물 지도의 오른쪽으로 5걸음 위로 3걸음처럼, x와 y 두 숫자로 방향과 거리를 한 번에 나타냅니다. 여기서 꼭 짚어야 할 것이 있습니다. 파이게임에서 y는 아래쪽이 커집니다. 화면 맨 위가 0이고 아래로 갈수록 숫자가 커집니다. 수학 시간에 배운 좌표와 반대라서 학생들이 처음에 많이 헷갈립니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`pygame.Vector2(5, 3)   # 오른쪽 5, 아래 3`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-amber-300 bg-white p-5 text-xl text-gray-700">
          주의: 파이게임의 y는 <span className="font-bold">아래쪽이 커진다</span>
          <br />
          화면 맨 위 = 0
        </div>
      </div>
    ),
  },
  {
    title: "왜 묶으면 편할까",
    bg: "from-white to-emerald-50",
    script:
      "벡터가 좋은 이유는 더하기가 된다는 점입니다. x와 y를 따로 관리하면 위치도 두 개, 속도도 두 개, 갱신하는 줄도 두 줄입니다. 벡터로 묶으면 pos에 speed를 더하는 한 줄로 끝납니다. x끼리 y끼리 알아서 더해집니다. 양손에 짐을 하나씩 드는 것과, 가방 하나에 담아 드는 것의 차이라고 설명하면 이해가 빠릅니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6">
          <h3 className="mb-3 text-xl font-bold text-gray-500">따로 관리</h3>
          <pre className="font-mono text-base text-gray-600">{`pos_x += speed_x
pos_y += speed_y`}</pre>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6">
          <h3 className="mb-3 text-xl font-bold text-emerald-600">
            Vector2로 묶기
          </h3>
          <pre className="font-mono text-base text-gray-700">{`pos += speed`}</pre>
        </div>
      </div>
    ),
  },
  {
    title: "FPS — 플립북",
    bg: "from-white to-purple-50",
    script:
      "FPS는 1초에 화면을 몇 번 그리는가입니다. 빠르게 넘기는 만화책, 플립북을 떠올리면 됩니다. 1초에 60장을 넘기면 아주 부드럽고, 10장만 넘기면 뚝뚝 끊깁니다. 게임 화면도 똑같습니다. 파이게임에서는 Clock 객체를 만들어서 tick으로 속도를 제한합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`clock = pygame.time.Clock()   # 게임 시작 전 한 번

while running:
    clock.tick(60)            # 초당 60번을 넘지 않게`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          60 = 부드럽다 · 30 = 조금 끊긴다
        </p>
      </div>
    ),
  },
  {
    title: "진짜 문제",
    bg: "from-white to-red-50",
    script:
      "여기가 오늘의 핵심입니다. 지금 우리 코드는 한 프레임에 speed만큼 움직입니다. 그런데 프레임 수가 컴퓨터마다 다릅니다. 빠른 컴퓨터는 1초에 200프레임이니 200번 이동합니다. 느린 컴퓨터는 30프레임이니 30번만 이동합니다. 같은 코드인데 결과가 6배 넘게 차이납니다. 게임으로서는 심각한 문제입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-red-300 bg-white p-8 text-xl">
          <p className="text-gray-700">
            빠른 컴퓨터 · 200프레임 → 200번 이동 →{" "}
            <span className="font-bold text-red-500">슝!</span>
          </p>
          <p className="mt-4 text-gray-700">
            느린 컴퓨터 · 30프레임 → 30번 이동 →{" "}
            <span className="font-bold text-gray-500">느릿...</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "델타타임 — 생각을 바꾸기",
    bg: "from-white to-cyan-50",
    script:
      "해결책은 생각을 바꾸는 것입니다. 한 프레임에 얼마가 아니라, 1초에 얼마로 바꿉니다. clock.tick은 지난 프레임과 지금 사이에 걸린 시간을 밀리초로 돌려줍니다. 1000으로 나누면 초 단위가 되고, 그것이 dt입니다. 이 dt를 speed에 곱합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`dt = clock.tick(60) / 1000        # 이번 프레임에 걸린 시간(초)

player_rect.center += speed * dt`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          &ldquo;한 프레임에 얼마&rdquo; → &ldquo;1초에 얼마&rdquo;
        </p>
      </div>
    ),
  },
  {
    title: "왜 같아지는가",
    bg: "from-white to-emerald-50",
    script:
      "왜 이러면 같아지는지 숫자로 보여드리겠습니다. 빠른 컴퓨터는 1초에 200프레임이니 한 프레임에 걸린 시간 dt가 0.005초입니다. speed 곱하기 0.005를 200번 더하면 speed 곱하기 1입니다. 느린 컴퓨터는 dt가 0.033초이고 30번 더하면 역시 speed 곱하기 1입니다. 어느 컴퓨터든 1초가 지나면 딱 speed만큼 이동합니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="text-xl font-bold text-sky-600">200 FPS</h3>
          <p className="mt-3 font-mono text-lg text-gray-700">
            dt ≈ 0.005
            <br />
            speed × 0.005 × 200
            <br />= speed × 1
          </p>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6">
          <h3 className="text-xl font-bold text-emerald-600">30 FPS</h3>
          <p className="mt-3 font-mono text-lg text-gray-700">
            dt ≈ 0.033
            <br />
            speed × 0.033 × 30
            <br />= speed × 1
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "speed의 뜻이 바뀐다",
    bg: "from-white to-amber-50",
    script:
      "마지막으로 실습에서 반드시 나올 상황을 미리 알려드립니다. dt를 곱이면 speed의 의미가 한 프레임에 몇 픽셀에서 1초에 몇 픽셀로 바뀝니다. 그래서 기존의 0.5나 2 같은 숫자를 그대로 두면 우주선이 거의 안 움직입니다. 학생들이 코드를 잘못 썼다고 생각하기 쉬우니, 이건 정상이고 숫자를 100배쯤 키워야 한다고 미리 말해주세요. 그럼 실습으로 가겠습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-amber-400 bg-white p-8 text-xl text-gray-700">
          <p>
            dt 전 · <span className="font-mono">Vector2(2, 1)</span> = 한
            프레임에 2픽셀
          </p>
          <p className="mt-4">
            dt 후 · <span className="font-mono">Vector2(2, 1)</span> = 1초에
            2픽셀 (거의 정지!)
          </p>
          <p className="mt-6 font-bold text-amber-600">
            → Vector2(200, 100) 처럼 크게 키운다
          </p>
        </div>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
