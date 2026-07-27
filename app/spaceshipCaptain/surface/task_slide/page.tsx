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
      "실습을 시작하겠습니다. 오늘은 새 파일을 만들지 않습니다. 지난 시간에 완성한 main.py를 그대로 이어서 고칩니다. 미션 1부터 3까지가 기본이고, 미션 4는 스스로 풀어보는 도전 과제입니다. 시간이 부족하면 미션 3까지만 해도 다음 진도에 지장이 없습니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">색과 모양</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          지난 시간 main.py를 이어서 고치기
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 창에 이름 붙이기",
    bg: "from-white to-amber-50",
    script:
      "첫 미션은 간단합니다. set_mode 바로 아랫줄에 set_caption을 추가해서 창 제목을 붙입니다. caption은 사진 아래 붙는 설명글이라는 뜻이라고 힌트를 주면 됩니다. 실행해서 창 맨 위 제목 표시줄이 바뀌었는지 눈으로 확인하게 해 주세요. 성취감을 빨리 주는 미션입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.____________("space shooter")`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          힌트: 사진 아래 붙는 설명글이라는 뜻
        </p>
      </div>
    ),
  },
  {
    title: "미션 2 · 배경 칠하고 내보내기",
    bg: "from-white to-blue-50",
    script:
      "두 번째 미션입니다. 게임 루프 안, for 문 아래에 두 줄을 추가합니다. fill로 배경을 칠하고 flip으로 화면에 내보냅니다. 순서가 중요하다고 강조해 주세요. 칠하고 나서 내보냅니다. 노란 창이 뜨면 성공입니다. 창이 계속 검은색인 학생이 있으면, flip을 빠뜨렸거나 게임 루프 바깥에 썼을 가능성이 큽니다. 들여쓰기를 같이 확인해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`        display_surface.____((250, 250, 0))
        pygame.display.____()`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-amber-300 bg-white p-5 text-lg text-gray-700">
          창이 계속 검은색이다 → flip이 빠졌거나 루프 바깥에 있음
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · Surface 만들어 붙이기",
    bg: "from-white to-purple-50",
    script:
      "세 번째 미션입니다. 그림 조각을 하나 만들어서 화면에 올립니다. 여기서 위치가 중요합니다. Surface를 만드는 두 줄은 while 문 위에 있어야 합니다. 반복문 안에 넣으면 매 프레임 새로 만들어져서 낭비입니다. 그리고 blit은 fill 다음에 와야 합니다. blit을 먼저 쓰면 배경으로 덮여서 네모가 안 보입니다. 지우기, 그리기, 내보내기 순서를 다시 짚어주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def main():
    running = True
    surf = pygame.________((100, 150))   # while 위에!
    surf.fill("orange")
    while running:
        ...
        display_surface.fill((0, 0, 0))
        display_surface.____(surf, (100, 100))
        pygame.display.flip()`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "자주 나오는 실수",
    bg: "from-white to-red-50",
    script:
      "여기서 나오는 대표적인 실수 두 가지입니다. 첫째, blit을 fill보다 먼저 써서 네모가 배경에 덮이는 경우입니다. 둘째, Surface 생성을 while 안에 넣는 경우입니다. 이건 화면상으로는 똑같이 보여서 학생이 알아채기 어렵습니다. 발견하면 왜 낭비인지 설명해 주세요. 매 프레임 새 도화지를 만들어 버리고 있는 셈이라고요.",
    content: (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="rounded-xl border-2 border-red-300 bg-white p-5 text-lg">
          <p className="font-bold text-red-600">네모가 안 보인다</p>
          <p className="mt-2 text-gray-700">blit이 fill보다 먼저 있음</p>
        </div>
        <div className="rounded-xl border-2 border-amber-300 bg-white p-5 text-lg">
          <p className="font-bold text-amber-600">보이긴 하는데 낭비</p>
          <p className="mt-2 text-gray-700">
            Surface 생성이 while 루프 안에 있음
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4 · 도전 과제",
    bg: "from-white to-emerald-50",
    script:
      "마지막은 도전 과제입니다. 세 가지를 스스로 하게 합니다. 창 제목을 colors로 바꾸고, 배경색이 매 프레임 랜덤으로 바뀌게 하고, 네모를 흰색으로 바꿉니다. 랜덤 색은 import random과 random.randint 0에서 255를 알려주되, fill에 세 개가 필요하다는 것과 이 코드가 while 안에 있어야 한다는 것만 힌트로 주고 나머지는 스스로 하게 해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ol className="flex flex-col gap-4 text-2xl text-gray-700">
          <li>① 창 제목을 colors로</li>
          <li>② 배경색이 매 프레임 랜덤으로</li>
          <li>③ 네모를 흰색으로</li>
        </ol>
        <div className="mt-8 rounded-xl bg-white p-5 text-lg text-gray-600 shadow-sm">
          힌트: <span className="font-mono">import random</span> ·{" "}
          <span className="font-mono">random.randint(0, 255)</span>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-purple-50",
    script:
      "오늘 한 일을 정리하겠습니다. set_caption으로 창에 이름을 붙였고, fill과 flip을 게임 루프 안에서 매 프레임 호출했고, Surface를 만들어 blit으로 화면에 올렸습니다. 도전 과제에서는 반복문 안과 밖의 차이를 직접 확인했습니다. 다음 시간에는 네모 대신 진짜 우주선 그림을 올립니다. 수고하셨습니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· set_caption으로 창 이름 붙이기</li>
        <li>· fill과 flip을 매 프레임 호출</li>
        <li>· Surface를 만들어 blit으로 올리기</li>
        <li className="mt-4 text-purple-600">다음 시간 — 진짜 우주선 이미지</li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
