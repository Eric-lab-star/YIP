"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-orange-50",
    script:
      "지난 시간에 게임 루프는 짧아졌는데 main.py 파일 자체는 여전히 깁니다. 앞으로 미사일, 운석, HUD 클래스까지 들어오면 이 파일은 수백 줄이 됩니다. 오늘은 파일을 여러 개로 쪼개는 방법을 배웁니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          모듈과 <span className="text-orange-500">패키지</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 8강 · 파일을 나누는 기술
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 네 가지입니다. 모듈과 패키지가 각각 무엇인지, 파일을 나누면 좋은 점 세 가지, from A import B 문법 읽고 쓰기, 그리고 리팩토링이 무엇인지 설명할 수 있어야 합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· 모듈과 패키지의 차이</li>
        <li>· 파일을 나누면 좋은 점 세 가지</li>
        <li>· from A import B 문법</li>
        <li>· 리팩토링이란</li>
      </ul>
    ),
  },
  {
    title: "요리책으로 비유하면",
    bg: "from-white to-amber-50",
    script:
      "모듈과 패키지를 요리책으로 비유하겠습니다. 모듈은 파스타 레시피 페이지 한 장, 즉 .py 파일 하나입니다. 패키지는 이탈리안 요리책 한 권, 즉 모듈들을 담은 폴더입니다. 사실 우리는 이미 둘 다 써봤습니다. import pygame은 패키지를 통째로 가져오는 것이고, from os.path import join은 os 패키지 안의 path 모듈에서 join 함수만 골라오는 것입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`import pygame                # 패키지를 통째로
from os.path import join     # 패키지 → 모듈 → 함수 하나

# 직접 만든 파일도 똑같이 가져올 수 있다`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "사물함 하나에 전부",
    bg: "from-white to-red-50",
    script:
      "왜 나눠야 하는지 비유로 시작하겠습니다. 코드를 한 파일에 다 넣는 것은 사물함 하나에 교과서, 체육복, 도시락, 우산을 전부 구겨넣는 것과 같습니다. 찾기도 힘들고 꺼내기도 불편합니다. 기능별로 나누면 체육 시간에는 체육 사물함만 열면 되는 것처럼, 플레이어를 고칠 때는 player.py만 열면 됩니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-red-300 bg-white p-6">
          <h3 className="mb-3 text-xl font-bold text-red-500">한 파일에 전부</h3>
          <p className="text-lg text-gray-700">
            플레이어 · 적 · 총알 · 배경 · 점수판
            <br />
            전부 main.py 안에
          </p>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 bg-white p-6">
          <h3 className="mb-3 text-xl font-bold text-emerald-600">
            기능별로 나누기
          </h3>
          <p className="text-lg text-gray-700">
            player.py / enemy.py
            <br />
            고칠 파일만 열면 된다
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "나누면 좋은 점 세 가지",
    bg: "from-white to-emerald-50",
    script:
      "정리하면 세 가지입니다. 첫째 유지보수입니다. 고칠 곳이 어느 파일인지 바로 알고 다른 파일을 건드릴 일이 없으니 실수도 줄어듭니다. 둘째 재사용입니다. player.py를 다음 게임 프로젝트에 그대로 복사해서 쓸 수 있습니다. 셋째 협업입니다. 여러 명이 각자 다른 파일을 맡으면 서로 부딪히지 않습니다.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-5 text-xl">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-bold text-emerald-600">유지보수</span>
          <span className="ml-3 text-gray-600">고칠 파일만 열면 된다</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-bold text-emerald-600">재사용</span>
          <span className="ml-3 text-gray-600">다음 프로젝트에 그대로 복사</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <span className="font-bold text-emerald-600">협업</span>
          <span className="ml-3 text-gray-600">각자 다른 파일 담당</span>
        </div>
      </div>
    ),
  },
  {
    title: "우리가 만들 구조",
    bg: "from-white to-blue-50",
    script:
      "오늘 만들 구조입니다. main.py에는 게임 루프만 남고, settings.py에 창 크기 같은 설정값이 들어가고, entity 폴더에 게임에 등장하는 것들이 들어갑니다. 지금은 player.py와 bg.py 두 개지만 앞으로 missile.py, meteor.py, hud.py가 여기에 추가됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`space_shooter/
├── main.py           ← 게임 루프만
├── settings.py       ← 설정값
├── images/
└── entity/           ← 등장하는 것들 (패키지)
    ├── player.py
    └── bg.py`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "import 문법 뜯어보기",
    bg: "from-white to-purple-50",
    script:
      "import 문법을 뜯어보겠습니다. from entity.player import Player에서 entity는 폴더 이름, 점 player는 그 안의 player.py 파일, import Player는 그 파일 안의 Player 클래스입니다. 폴더는 점으로 파고 들어가고, 파일 확장자 .py는 쓰지 않는다는 점을 강조해 주세요. 학생들이 .py를 붙이는 실수를 자주 합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`from entity.player import Player
#    └─폴더 └─파일        └─클래스

# .py 는 쓰지 않는다
# 폴더는 점(.)으로 파고 들어간다`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "리팩토링 = 방 청소",
    bg: "from-white to-teal-50",
    script:
      "오늘 하는 작업을 리팩토링이라고 부릅니다. 방 청소와 같습니다. 물건을 버리거나 새로 사는 게 아니라 어질러진 것을 제자리에 정리하는 것입니다. 동작은 하나도 안 바뀌고 구조만 좋아지는 모든 작업이 리팩토링입니다. 핵심은 고치기 전과 후의 화면이 똑같아야 한다는 것입니다. 오늘 실습이 끝나도 게임 화면은 지난 시간과 완전히 같습니다. 달라지는 건 파일이 몇 개인가뿐입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-teal-400 bg-white p-8 text-xl text-gray-700">
          <p className="font-bold text-teal-600">리팩토링</p>
          <p className="mt-4">동작은 그대로, 구조만 좋아지는 작업</p>
          <p className="mt-6 text-lg text-gray-500">
            긴 함수 쪼개기 · 중복 합치기 · 이름 바꾸기
            <br />· 파일 나누기 ← 오늘
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "그리는 순서 = 넣는 순서",
    bg: "from-white to-orange-50",
    script:
      "마지막으로 오늘 실습의 함정을 미리 알려드립니다. group.draw는 그룹 안의 스프라이트를 들어온 순서대로 그립니다. 나중에 그려진 게 위에 덮입니다. 그래서 배경을 먼저 그룹에 넣어야 합니다. 순서를 바꾸면 배경이 우주선을 덮어버려서 우주선이 사라집니다. 실습에서 일부러 순서를 바꿔보게 하면 확실히 각인됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`Background(all_sprite_group)   # 먼저 → 아래에 깔린다
Player(all_sprite_group)       # 나중 → 위에 그려진다`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-red-300 bg-white p-5 text-lg text-gray-700">
          순서를 바꾸면 → 배경이 우주선을 덮어서 우주선이 사라진다
        </div>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
