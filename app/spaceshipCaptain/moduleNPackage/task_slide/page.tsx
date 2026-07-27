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
      "실습을 시작합니다. 오늘도 화면은 하나도 안 바뀝니다. 파일만 여러 개로 나뉩니다. 이게 리팩토링입니다. 다만 파일을 옮기다 보면 import를 빠뜨리기 쉽습니다. 에러가 나면 이 파일에 필요한 걸 다 가져왔나를 먼저 확인하라고 안내해 주세요. 오늘 나오는 에러의 대부분이 import 문제입니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">파일 나누기</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          settings.py → entity/player.py → bg.py
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · settings.py",
    bg: "from-white to-amber-50",
    script:
      "첫 미션입니다. main.py와 같은 위치에 settings.py를 만들고 창 크기 한 줄만 넣습니다. 그리고 main.py에서 import 하고 원래 정의는 삭제합니다. 여기서 좋은 확인 방법이 있습니다. settings.py의 1280을 800으로 바꿔서 실행하게 하세요. 창이 작아집니다. 이제 창 크기는 settings.py만 고치면 된다는 걸 몸으로 알게 됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# settings.py
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720

# main.py
from settings import ____________, _____________
# 원래 있던 정의는 삭제`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          확인: 1280을 800으로 바꿔보기 → 창이 작아진다
        </p>
      </div>
    ),
  },
  {
    title: "미션 2 · entity/player.py",
    bg: "from-white to-blue-50",
    script:
      "두 번째 미션입니다. entity 폴더를 만들고 player.py에 Player 클래스를 통째로 옮깁니다. 여기서 반드시 짚어야 할 것이 있습니다. 그냥 옮기면 에러가 납니다. 그 파일에도 필요한 걸 가져와야 합니다. Player 클래스가 쓰는 것을 하나씩 짚어보게 하세요. pygame, join, WINDOW_WIDTH 세 가지입니다. 스스로 찾아내게 하는 게 중요합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# entity/player.py — 클래스가 쓰는 것을 다 가져와야 한다
import ______
from os.path import ____
from settings import WINDOW_WIDTH, WINDOW_HEIGHT

# main.py
from entity.player import ______`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "자주 나오는 에러",
    bg: "from-white to-red-50",
    script:
      "여기서 나오는 대표 에러입니다. ModuleNotFoundError No module named settings입니다. 대부분 터미널이 space_shooter 폴더 바깥에 있어서 생깁니다. 파이썬은 실행한 위치를 기준으로 모듈을 찾습니다. 터미널에서 pwd나 dir로 지금 어디인지 확인하게 하세요. 그리고 NameError가 나면 그 파일에 import를 빠뜨린 것입니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="rounded-xl border-2 border-red-300 bg-white p-5">
          <p className="font-mono text-lg text-red-600">
            ModuleNotFoundError: No module named &apos;settings&apos;
          </p>
          <p className="mt-2 text-lg text-gray-700">
            → 터미널이 space_shooter 폴더 안인지 확인
          </p>
        </div>
        <div className="rounded-xl border-2 border-amber-400 bg-white p-5">
          <p className="font-mono text-lg text-amber-600">
            NameError: name &apos;join&apos; is not defined
          </p>
          <p className="mt-2 text-lg text-gray-700">
            → 그 파일에 import를 빠뜨림
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · 배경 클래스 직접 만들기",
    bg: "from-white to-violet-50",
    script:
      "세 번째 미션은 스스로 만드는 과제입니다. entity 폴더에 bg.py를 만들고 Background 클래스를 직접 씁니다. player.py를 열어놓고 거의 똑같이 만들면 됩니다. 힌트는 네 가지만 주세요. transform.scale로 화면 크기에 맞추기, 배경은 안 움직이지만 update는 있어야 한다는 것, 그 이유는 group.update가 모든 스프라이트의 update를 부르기 때문이라는 것, 그리고 위치는 0 0이니 get_frect를 인자 없이 부르면 된다는 것입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ul className="flex flex-col gap-4 text-xl text-gray-700">
          <li>· player.py를 열어놓고 거의 똑같이</li>
          <li>· transform.scale로 화면 크기에 맞추기</li>
          <li>· 안 움직여도 update(self, dt)는 있어야 한다</li>
          <li>· 위치는 (0,0) → get_frect() 인자 없이</li>
        </ul>
      </div>
    ),
  },
  {
    title: "순서를 바꿔보게 하기",
    bg: "from-white to-orange-50",
    script:
      "여기가 오늘 가장 인상적인 순간입니다. 배경을 그룹에 넣을 때 Player보다 먼저 넣어야 합니다. 학생들에게 일부러 순서를 바꿔서 실행해보게 하세요. 우주선이 사라집니다. 배경이 위에 덮이기 때문입니다. 직접 보고 나면 그리는 순서가 넣는 순서라는 걸 절대 안 잊습니다. 그리고 이제 안 쓰는 코드들, bg_surf와 fill 회색 줄을 정리하게 하세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`Background(all_sprite_group)   # 먼저
Player(all_sprite_group)       # 나중

# 바꿔보면? → 우주선이 사라진다`}</CodeBlock>
        <div className="mt-6 rounded-xl bg-white p-5 text-lg text-gray-700 shadow-sm">
          정리할 것: bg_path · bg_surf · fill(&ldquo;gray&rdquo;) · 남은
          direction
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-orange-50",
    script:
      "오늘 한 일을 정리하겠습니다. settings.py로 설정값을 분리했고, entity 패키지를 만들어 player.py로 클래스를 옮겼고, Background 클래스를 직접 만들어 배경도 스프라이트로 바꿨고, 그룹에 넣는 순서가 그리는 순서라는 걸 확인했습니다. 마지막으로 main.py의 게임 루프를 다시 보게 하세요. 이벤트 확인, update, draw, flip 네 줄입니다. 앞으로 미사일과 운석이 들어와도 이 루프는 그대로입니다. 다음 시간에는 미사일을 발사합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· settings.py로 설정값 분리</li>
        <li>· entity 패키지와 player.py</li>
        <li>· Background 클래스 직접 작성</li>
        <li>· 넣는 순서 = 그리는 순서</li>
        <li className="mt-4 text-orange-500">다음 시간 — 미사일 발사</li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
