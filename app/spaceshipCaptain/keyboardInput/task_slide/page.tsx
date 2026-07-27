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
      "실습을 시작하겠습니다. 오늘 실습의 핵심은 미션 4입니다. 대각선이 빠른 것을 학생들이 직접 느껴본 뒤에 고치게 하는 순서입니다. 문제를 느끼지 않고 해결책부터 배우면 왜 필요한지 모릅니다. 미션 4의 실험은 꼭 하게 해 주세요.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">WASD 조종</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          입력 확인 → 조종 → 코드 줄이기 → 정규화
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 키가 읽히는지 확인",
    bg: "from-white to-blue-50",
    script:
      "첫 미션은 눈으로 확인하는 것입니다. get_pressed로 키 상태를 받아서 W키만 print 합니다. 실행하고 W를 눌렀다 뗐다 하면 터미널에 True와 False가 쏟아집니다. 학생들이 터미널이 너무 빨리 흘러간다고 하면 정상이라고 말해주세요. 1초에 수십 번 출력되고 있는 겁니다. 확인이 끝나면 print 줄은 지우게 합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`keys = pygame.key.____________()
print(keys[pygame.K_w])`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          W를 누르면 True, 떼면 False가 쏟아진다
        </p>
      </div>
    ),
  },
  {
    title: "미션 2 · WASD로 움직이기",
    bg: "from-white to-teal-50",
    script:
      "두 번째 미션에서 실제로 조종을 붙입니다. 방향 벡터를 만들고 if로 네 방향을 처리합니다. 빈칸의 부호를 채우게 하는데, W는 마이너스 1이라는 점을 앞 슬라이드에서 배운 대로 스스로 생각하게 해 주세요. 그리고 speed를 벡터에서 숫자 하나로 바꿉니다. 이제 방향은 direction이 담당하니 speed는 크기만 있으면 됩니다. 여기서 가장 흔한 문제는 손을 떼도 계속 움직이는 것입니다. 초기화 줄이 루프 안에 있는지 확인하세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`direction = pygame.Vector2(0, 0)   # 루프 안!

if keys[pygame.K_w]:
    direction.y = ____
elif keys[pygame.K_s]:
    direction.y = ____

speed = 200        # 벡터가 아니라 숫자로`}</CodeBlock>
        <div className="mt-5 rounded-xl border-2 border-red-300 bg-white p-4 text-lg text-gray-700">
          손을 떼도 움직인다 → 초기화가 루프 밖에 있음
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 · 뺄셈으로 줄이기",
    bg: "from-white to-emerald-50",
    script:
      "세 번째 미션은 방금 쓴 여덟 줄을 두 줄로 줄이는 것입니다. 빈칸에는 각각 반대 방향 키가 들어갑니다. 여기서 한 가지 더 알려줄 것이 있습니다. 이렇게 바꾸면 방향 벡터를 매 프레임 새로 만들 필요가 없어집니다. 점 x와 점 y에 항상 값을 덮어쓰기 때문입니다. 그래서 이 줄은 main 시작 부분으로 옮겨도 됩니다. 동작은 똑같고 코드만 짧아집니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`direction.x = int(keys[pygame.K_d]) - int(keys[pygame.____])
direction.y = int(keys[pygame.K_s]) - int(keys[pygame.____])`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          항상 덮어쓰므로 매 프레임 초기화가 필요 없어진다
        </p>
      </div>
    ),
  },
  {
    title: "미션 4 · 먼저 느껴보기",
    bg: "from-white to-red-50",
    script:
      "네 번째 미션이 오늘의 핵심입니다. 고치기 전에 먼저 느껴보게 합니다. D만 눌러서 화면 오른쪽 끝까지 가는 시간을 세게 하고, 그다음 W와 D를 같이 눌러 대각선으로 가게 합니다. 확실히 더 빠릅니다. 이 체험을 하고 나서 정규화를 배우면 왜 필요한지 몸으로 이해합니다. 순서를 바꾸지 마세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ol className="flex flex-col gap-5 text-2xl text-gray-700">
          <li>① D만 눌러 오른쪽 끝까지 — 몇 초?</li>
          <li>② W+D로 대각선 — 몇 초?</li>
          <li className="font-bold text-red-500">③ 확실히 더 빠르다!</li>
        </ol>
      </div>
    ),
  },
  {
    title: "미션 4 · 정규화로 고치기",
    bg: "from-white to-teal-50",
    script:
      "느꼈으면 이제 고칩니다. length로 길이를 재고 0보다 클 때만 normalize_ip를 부릅니다. 그리고 여기서 꼭 시켜볼 것이 있습니다. length 검사를 일부러 빼고 실행하게 하세요. 아무 키도 안 누른 순간 바로 오류가 나면서 게임이 꺼집니다. 왜 그 검사가 필요한지 직접 보는 것이 설명보다 훨씬 강합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`if direction.________() > 0:
    direction.____________()`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-amber-400 bg-white p-5 text-lg text-gray-700">
          <span className="font-bold text-amber-600">해보게 하기:</span> length
          검사를 빼면? → 키를 떼는 순간 오류로 종료
        </div>
      </div>
    ),
  },
  {
    title: "미션 5 · 화면에 가두기",
    bg: "from-white to-slate-50",
    script:
      "마지막 미션입니다. 지금은 우주선이 화면 밖으로 사라집니다. clamp_ip로 가둡니다. 위치를 갱신한 바로 다음 줄에 넣어야 합니다. 순서가 중요합니다. 움직이고 나서 가두는 것입니다. 우주선이 화면 가장자리에 딱 붙어 멈추면 성공입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`player_rect.center += direction * speed * dt
player_rect.________(pygame.Rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT))`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          움직인 다음에 가둔다 — 순서 주의
        </p>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-teal-50",
    script:
      "오늘 한 일을 정리하겠습니다. get_pressed로 키보드 상태를 읽었고, WASD로 우주선을 조종했고, if 여덟 줄을 뺄셈 두 줄로 줄였고, 대각선 문제를 직접 느껴본 뒤 정규화로 해결했고, clamp_ip로 화면에 가뒀습니다. 그런데 이제 main.py가 꽤 길어졌습니다. 다음 시간부터는 클래스를 배워서 이 코드를 정리합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· get_pressed로 키보드 읽기</li>
        <li>· WASD 조종, if 여덟 줄 → 뺄셈 두 줄</li>
        <li>· 대각선 문제를 느껴보고 정규화로 해결</li>
        <li>· clamp_ip로 화면에 가두기</li>
        <li className="mt-4 text-teal-600">다음 시간 — 클래스로 코드 정리</li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
