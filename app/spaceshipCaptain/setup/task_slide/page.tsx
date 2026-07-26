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
      "지금부터 실습입니다. 오늘 실습은 이 과정 전체에서 가장 까다로운 부분입니다. 터미널에 명령어를 입력해서 프로그램을 설치해야 하기 때문입니다. 학생들에게 미리 말해주세요. 여기서 막히는 것은 실력 문제가 아니라 환경 문제라고요. 막히는 학생이 나오면 바로 도와주시고, 옆 사람과 같이 하도록 안내해 주세요. 여기만 넘기면 다음 시간부터는 훨씬 수월합니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">창 띄우기</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          uv 설치 → 프로젝트 생성 → main.py 완성
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · uv 설치하기",
    bg: "from-white to-amber-50",
    script:
      "먼저 uv를 설치합니다. 자기 컴퓨터에 맞는 줄을 한 줄만 골라서 붙여넣으라고 안내해 주세요. 맥과 리눅스는 위쪽, 윈도우는 아래쪽입니다. 두 줄을 다 넣는 학생이 꼭 나오니 미리 짚어주세요. 설치가 끝나면 uv --version으로 확인합니다. 버전 번호가 나오면 성공입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          확인: <span className="font-mono">uv --version</span>
        </p>
      </div>
    ),
  },
  {
    title: "자주 나오는 문제",
    bg: "from-white to-red-50",
    script:
      "여기서 가장 자주 나오는 문제를 미리 알려드립니다. 설치는 됐는데 uv를 찾을 수 없다는 메시지가 나오는 경우입니다. 이건 터미널이 새로 설치된 도구를 아직 모르기 때문입니다. 터미널을 완전히 닫았다가 다시 열면 대부분 해결됩니다. 그래도 안 되면 재부팅까지 안내해 주세요. 학생 잘못이 아니라는 점을 꼭 말해주시기 바랍니다.",
    content: (
      <div className="mx-auto max-w-3xl rounded-xl border-2 border-red-300 bg-white p-8">
        <p className="font-mono text-xl text-red-600">
          uv: command not found
        </p>
        <p className="mt-5 text-xl text-gray-700">
          → 터미널을 완전히 닫았다가 다시 열기
        </p>
        <p className="mt-2 text-lg text-gray-500">
          새로 설치된 도구는 새 터미널부터 인식됩니다
        </p>
      </div>
    ),
  },
  {
    title: "미션 2 · 프로젝트와 패키지",
    bg: "from-white to-blue-50",
    script:
      "이제 프로젝트를 만듭니다. uv init space_shooter로 작업실을 만들고, cd로 그 안에 들어갑니다. cd를 빠뜨리는 학생이 많으니 확인해 주세요. 그 다음 uv add pygame-ce로 파이게임을 설치합니다. 설치가 끝나면 pyproject.toml 파일을 열어서 pygame-ce가 자동으로 적혀 있는지 같이 확인해 보세요. 내가 설치한 것이 기록으로 남는다는 걸 눈으로 보는 게 중요합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`uv init space_shooter
cd space_shooter
uv add pygame-ce`}</CodeBlock>
        <div className="mt-6 rounded-xl bg-white p-5 text-lg text-gray-700 shadow-sm">
          <p className="font-bold">확인 포인트</p>
          <p className="mt-2">· space_shooter 폴더 안에 들어와 있는가</p>
          <p>· pyproject.toml에 pygame-ce가 적혀 있는가</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · 네 뼈대 채우기",
    bg: "from-white to-emerald-50",
    script:
      "이제 main.py를 씁니다. 학습 목표에서 배운 네 뼈대를 그대로 코드로 옮기는 것입니다. 빈칸이 채워진 형태로 제공되니, 학생들이 스스로 채우게 해 주세요. 첫 번째 빈칸은 init, 두 번째는 set_mode, 세 번째는 running, 네 번째는 QUIT입니다. 답을 바로 알려주기보다는 학습 목표 슬라이드를 다시 보라고 안내하는 편이 좋습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`import pygame

pygame.____()

WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.________((WINDOW_WIDTH, WINDOW_HEIGHT))

def main():
    running = True
    while ________:
        for event in pygame.event.get():
            if event.type == pygame.____:
                running = False
    pygame.quit()`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 4 · 실행하기",
    bg: "from-white to-slate-50",
    script:
      "마지막으로 파일 맨 아래에 if __name__ 두 줄을 더하고 실행합니다. uv run main.py입니다. 검은 창이 뜨고 X 버튼으로 닫히면 성공입니다. 여기서 창은 떴는데 마우스를 대면 응답 없음이 되는 학생이 나올 수 있습니다. 그건 이벤트를 꺼내는 for 문이 빠진 경우입니다. 앞 슬라이드의 민원 접수함 이야기를 다시 꺼내면서 스스로 찾게 해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`if __name__ == "__main__":
    main()`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-700">
          실행: <span className="font-mono">uv run main.py</span>
        </p>
        <div className="mt-6 rounded-xl border-2 border-amber-300 bg-white p-5 text-lg text-gray-700">
          창이 &ldquo;응답 없음&rdquo;이 된다 → 이벤트 for 문이 빠진 것
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-blue-50",
    script:
      "오늘 한 일을 정리하겠습니다. uv를 설치하고 space_shooter 프로젝트를 만들었고, pygame-ce를 설치했고, 창이 뜨는 main.py를 완성했습니다. 가장 어려운 고비를 넘겼습니다. 다음 시간에는 이 검은 도화지에 색을 칠하고 모양을 그립니다. 수고하셨습니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· uv 설치, space_shooter 프로젝트 생성</li>
        <li>· pygame-ce 설치</li>
        <li>· 1280x720 창이 뜨는 main.py 완성</li>
        <li className="mt-4 text-sky-600">다음 시간 — 도화지에 색칠하기</li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
