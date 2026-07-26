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
      "실습을 시작하겠습니다. 오늘 실습에서 학생들이 가장 많이 막히는 지점은 코드가 아니라 파일 위치입니다. 이미지를 엉뚱한 폴더에 넣으면 코드가 완벽해도 에러가 납니다. 미션 1을 특히 꼼꼼히 확인해 주세요. 폴더 이름이 images인지, s가 빠지지 않았는지 같이 봐 주시면 좋습니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">우주선 띄우기</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          이미지 저장 → 불러오기 → 중앙 배치 → 튕기기
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 이미지를 프로젝트에 넣기",
    bg: "from-white to-amber-50",
    script:
      "먼저 교재의 버튼으로 우주선 그림과 배경 그림을 받습니다. 그리고 프로젝트 폴더 안에 images 폴더를 새로 만들어서 그 안에 넣습니다. VS Code를 쓴다면 탐색기 창으로 드래그 앤 드롭 하면 바로 들어갑니다. 여기서 확인할 것 두 가지입니다. 경로가 space_shooter 안의 images인지, 그리고 폴더 이름에 s가 붙어 있는지입니다. image라고 쓰는 학생이 매번 나옵니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`space_shooter/
├── images/
│   ├── player.png
│   └── background.png
├── main.py
└── pyproject.toml`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-amber-300 bg-white p-5 text-lg text-gray-700">
          폴더 이름은 <span className="font-mono font-bold">images</span> — s를
          빠뜨리지 않기
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 · 이미지 불러오기",
    bg: "from-white to-blue-50",
    script:
      "이제 코드입니다. 파일 맨 위에 from os.path import join을 추가하고, set_caption 아래에 두 줄을 씁니다. 빈칸은 파일 이름, load, convert_alpha입니다. 그리고 게임 루프에서 네모 대신 우주선을 그립니다. 회색 배경에 우주선이 보이면 성공입니다. 여기서 FileNotFoundError가 나오는 학생이 있으면 코드가 아니라 파일 위치 문제라고 알려주세요. 그리고 터미널이 space_shooter 폴더 안에 있는지도 확인해야 합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`from os.path import ____

player_path = join("images", "________")
player_surf = pygame.image.____(player_path).____________()

# 루프 안
display_surface.blit(________, (100, 100))`}</CodeBlock>
        <div className="mt-5 rounded-xl border-2 border-red-300 bg-white p-4 text-lg text-gray-700">
          FileNotFoundError → 코드가 아니라 파일 위치 문제
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · 정중앙에 배치",
    bg: "from-white to-indigo-50",
    script:
      "세 번째 미션입니다. 지금은 100 100에 고정돼 있는데, 이걸 화면 정중앙으로 옮깁니다. get_frect에 center를 주고, blit의 좌표 자리에 좌표 대신 그 사각형을 그대로 넣습니다. 여기서 자주 나오는 질문이 있습니다. blit의 두 번째 인자에 좌표가 아니라 사각형을 넣어도 되냐는 것입니다. 됩니다. 파이게임이 사각형의 왼쪽 위 좌표를 알아서 꺼내 씁니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`player_rect = player_surf.__________(
    ______=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
)

display_surface.blit(player_surf, ___________)`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          blit의 두 번째 인자에 Frect를 그대로 넣어도 된다
        </p>
      </div>
    ),
  },
  {
    title: "미션 4 · 배경과 튕기기",
    bg: "from-white to-emerald-50",
    script:
      "네 번째 미션입니다. 배경은 transform.scale로 화면 크기에 맞게 늘려서 불러옵니다. 그리고 방향과 속력 변수를 만들고, 벽 판정을 넣습니다. 여기서 중요한 순서가 있습니다. 배경을 먼저 그리고 우주선을 나중에 그려야 합니다. 반대로 하면 우주선이 배경에 덮입니다. 그리고 배경 이미지가 화면 전체를 덮으니 fill 줄은 지워도 됩니다. 배경이 지우개 역할을 합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`bg_surf = pygame.transform.____(
    pygame.image.load(bg_path).convert_alpha(),
    (WINDOW_WIDTH, WINDOW_HEIGHT)
)

if player_rect.right >= WINDOW_WIDTH or player_rect.____ <= 0:
    direction *= ____

display_surface.blit(bg_surf, (0, 0))      # 배경 먼저
display_surface.blit(player_surf, player_rect)  # 우주선 나중`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 5 · 도전 과제",
    bg: "from-white to-purple-50",
    script:
      "마지막은 도전 과제입니다. 지금은 좌우로만 움직이는데, 위아래로도 튕기게 만듭니다. 힌트는 네 가지를 주면 충분합니다. 방향 변수를 x와 y 두 개로 나눌 것, 위아래 벽은 top과 bottom으로 확인할 것, 위치는 centerx와 centery를 각각 갱신할 것, 그리고 좌우 판정과 상하 판정은 서로 다른 if 문이어야 한다는 것입니다. elif로 묶으면 모서리에서 한쪽만 뒤집혀서 이상하게 동작합니다. 이 마지막 힌트는 학생이 막힌 뒤에 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ul className="flex flex-col gap-4 text-xl text-gray-700">
          <li>· 방향 변수를 x, y 두 개로 나눈다</li>
          <li>· 위아래 벽은 top / bottom으로 확인</li>
          <li>· 위치는 centerx / centery 각각 갱신</li>
          <li className="text-purple-600">
            · 좌우와 상하는 서로 다른 if 문 (elif로 묶으면 모서리에서 깨진다)
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-indigo-50",
    script:
      "오늘 한 일을 정리하겠습니다. images 폴더를 만들고 그림을 넣었고, join과 load와 convert_alpha로 이미지를 불러왔고, get_frect로 정중앙에 배치했고, 배경을 깔고 벽에서 튕기게 만들었습니다. 그런데 한 가지 문제가 남아 있습니다. 지금 속도는 컴퓨터 성능에 따라 달라집니다. 빠른 컴퓨터에서는 우주선이 더 빨리 움직입니다. 다음 시간에 이걸 해결합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· images 폴더에 그림 넣기</li>
        <li>· join · load · convert_alpha로 불러오기</li>
        <li>· get_frect로 정중앙 배치</li>
        <li>· 배경 깔고 벽에서 튕기기</li>
        <li className="mt-4 text-indigo-600">
          다음 시간 — 컴퓨터마다 같은 속도로 (FPS)
        </li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
