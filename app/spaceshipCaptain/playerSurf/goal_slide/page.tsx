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
      "지난 시간에는 주황색 네모를 화면에 올렸습니다. 오늘은 그 자리에 진짜 우주선 그림을 올립니다. 그런데 그림을 화면 정중앙에 놓거나 벽에 튕기게 하려면 위치를 다루는 방법이 필요합니다. 그것이 오늘의 주인공인 Frect입니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          우주선 <span className="text-indigo-500">이미지</span> 띄우기
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 3강 · 이미지와 Frect
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 세 가지입니다. 이미지 파일을 불러오는 세 단계를 설명할 수 있어야 하고, Frect가 무엇이며 왜 get_rect가 아니라 get_frect를 쓰는지 말할 수 있어야 하며, 기준점이라는 개념을 이해해야 합니다. 특히 기준점 개념은 앞으로 모든 물체의 위치를 다룰 때 계속 쓰이니 오늘 확실히 잡고 가야 합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· 이미지 불러오기 세 단계 설명하기</li>
        <li>· Frect가 무엇이고 왜 get_frect인지 말하기</li>
        <li>· 기준점(center, topleft…)의 뜻 설명하기</li>
      </ul>
    ),
  },
  {
    title: "이미지 불러오기 세 단계",
    bg: "from-white to-amber-50",
    script:
      "이미지를 불러오는 데는 세 단계가 필요합니다. 첫째, join으로 경로를 만듭니다. 왜 그냥 슬래시로 쓰지 않느냐고 물으면, 윈도우는 역슬래시를 쓰고 맥은 슬래시를 쓰기 때문이라고 설명해 주세요. join이 컴퓨터에 맞게 알아서 넣어줍니다. 둘째, image.load로 파일을 읽어 Surface로 만듭니다. 지난 시간에 배운 그 그림 조각입니다. 셋째, convert_alpha로 투명한 부분을 처리합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`from os.path import join

player_path = join("images", "player.png")          # ① 경로
player_surf = pygame.image.load(player_path)        # ② 불러오기
                            .convert_alpha()        # ③ 투명 처리`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          경로 → 불러오기 → 투명 처리
        </p>
      </div>
    ),
  },
  {
    title: "convert_alpha를 빠뜨리면",
    bg: "from-white to-red-50",
    script:
      "convert_alpha를 빠뜨리면 어떻게 될까요. 우주선 주위의 투명해야 할 부분이 네모난 상자로 보입니다. 학생들이 실습에서 이 증상을 만나면 바로 알아챌 수 있게 미리 보여주세요. 그리고 한 가지 주의점이 있습니다. convert_alpha는 set_mode 뒤에 호출해야 합니다. 화면이 아직 없는데 화면에 맞게 변환할 수는 없기 때문입니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-red-300 bg-white p-6 text-center">
          <h3 className="text-2xl font-bold text-red-500">없으면</h3>
          <p className="mt-4 text-lg text-gray-700">
            우주선 주위에 네모 상자가 보인다
            <br />
            그리는 속도도 느리다
          </p>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6 text-center">
          <h3 className="text-2xl font-bold text-emerald-600">있으면</h3>
          <p className="mt-4 text-lg text-gray-700">
            투명한 부분이 제대로 처리된다
            <br />
            그리기도 빨라진다
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "정중앙에 놓으려면?",
    bg: "from-white to-purple-50",
    script:
      "이제 Frect가 왜 필요한지 보여드리겠습니다. 우주선을 화면 정중앙에 놓고 싶습니다. blit의 좌표에 뭘 넣어야 할까요. 직접 계산하면 화면 가로 나누기 2에서 이미지 가로 나누기 2를 빼야 합니다. 세로도 마찬가지입니다. 이미지 크기가 바뀌면 다시 계산해야 하고, 화면 크기가 바뀌어도 다시 계산해야 합니다. 상당히 귀찮습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# 직접 계산하면...
x = WINDOW_WIDTH / 2 - 이미지가로 / 2
y = WINDOW_HEIGHT / 2 - 이미지세로 / 2

# 이미지가 바뀌면 다시 계산
# 화면이 바뀌어도 다시 계산`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "Frect — 이미지를 감싸는 사각형",
    bg: "from-white to-indigo-50",
    script:
      "그래서 파이게임은 이미지를 감싸는 투명한 사각형을 하나 줍니다. 그것이 Frect입니다. get_frect에 center 값을 주면, 이 사각형의 중심을 여기에 맞춰달라고만 하면 됩니다. 파이게임이 알아서 왼쪽 위 좌표를 계산해 줍니다. 기준점은 종이를 벽에 붙일 때 어느 부분을 맞출지 정하는 것과 같다고 설명하면 학생들이 잘 이해합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`player_rect = player_surf.get_frect(
    center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
)

display_surface.blit(player_surf, player_rect)`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          &ldquo;이 사각형의 중심을 여기에 맞춰줘&rdquo;
        </p>
      </div>
    ),
  },
  {
    title: "기준점 아홉 자리",
    bg: "from-white to-slate-50",
    script:
      "기준점은 아홉 자리가 있습니다. 가운데는 center, 네 모서리는 topleft, topright, bottomleft, bottomright, 각 변의 가운데는 midtop, midbottom, midleft, midright입니다. 지금은 center만 쓰지만, 나중에 미사일을 우주선 위쪽에서 발사할 때 midbottom 같은 걸 쓰게 됩니다. 이름이 직관적이라 외우기보다는 필요할 때 찾아 쓰면 됩니다.",
    content: (
      <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3 text-center text-lg">
        {[
          "topleft",
          "midtop",
          "topright",
          "midleft",
          "center",
          "midright",
          "bottomleft",
          "midbottom",
          "bottomright",
        ].map((n) => (
          <div
            key={n}
            className={`rounded-lg border-2 p-4 font-mono ${
              n === "center"
                ? "border-indigo-400 bg-indigo-50 font-bold text-indigo-600"
                : "border-gray-300 bg-white text-gray-600"
            }`}
          >
            {n}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "왜 get_rect가 아니라 get_frect?",
    bg: "from-white to-blue-50",
    script:
      "여기서 f가 왜 붙었는지 설명하겠습니다. f는 float, 소수의 f입니다. 기존 get_rect는 위치를 정수로만 저장합니다. 그래서 속도 0.5로 움직이면 소수점이 잘려서 움직임이 뚝뚝 끊깁니다. pygame-ce가 추가한 get_frect는 150.75 같은 소수점 값을 그대로 저장합니다. 우리는 속도를 0.5처럼 소수로 줄 것이기 때문에 get_frect를 씁니다. 사용법은 완전히 같습니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6">
          <h3 className="mb-4 font-mono text-2xl font-bold text-gray-500">
            get_rect()
          </h3>
          <ul className="space-y-2 text-lg text-gray-600">
            <li>· 정수만 저장</li>
            <li>· 0.5씩 더하면 잘려나감</li>
            <li>· 움직임이 끊긴다</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6">
          <h3 className="mb-4 font-mono text-2xl font-bold text-sky-600">
            get_frect()
          </h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>· 소수점 그대로 저장</li>
            <li>· f = float</li>
            <li>· 움직임이 부드럽다</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "벽에서 튕기는 원리",
    bg: "from-white to-emerald-50",
    script:
      "마지막으로 움직임의 원리입니다. 방향과 속력을 따로 갖습니다. direction이 1이면 오른쪽, 마이너스 1이면 왼쪽입니다. 매 프레임 speed 곱하기 direction만큼 위치를 더합니다. 그리고 Frect의 right와 left로 사각형의 각 변이 지금 어디 있는지 확인해서, 화면 끝을 넘었으면 direction에 마이너스 1을 곱합니다. 부호가 뒤집히면서 반대로 갑니다. 튕기는 동작이 한 줄로 표현됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`direction = 1      # 1 오른쪽 / -1 왼쪽
speed = 0.5

if player_rect.right >= WINDOW_WIDTH or player_rect.left <= 0:
    direction *= -1          # 부호를 뒤집는다

player_rect.centerx += speed * direction`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          실습 마지막엔 상하좌우 모두 튕기게 만든다
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
