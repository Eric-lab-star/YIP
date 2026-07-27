"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-teal-50",
    script:
      "오늘은 드디어 우주선을 직접 조종합니다. 그런데 조종을 붙이고 나면 학생들이 이상한 걸 발견하게 됩니다. 대각선으로 갈 때만 더 빠릅니다. 오늘은 키보드 입력을 받는 방법과 함께, 그 대각선 문제의 원인과 해결법까지 배웁니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          방향키로 <span className="text-teal-600">움직이기</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 5강 · 입력과 벡터 정규화
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 세 가지입니다. get_pressed가 무엇을 돌려주는지 설명할 수 있어야 하고, 방향 벡터를 매 프레임 새로 만드는 이유를 말할 수 있어야 하며, 대각선이 더 빠른 이유와 정규화가 그것을 어떻게 해결하는지 설명할 수 있어야 합니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-5 text-2xl leading-relaxed text-gray-700">
        <li>· get_pressed()가 돌려주는 것 설명하기</li>
        <li>· 방향을 매 프레임 초기화하는 이유 말하기</li>
        <li>· 대각선이 빠른 이유와 정규화 설명하기</li>
      </ul>
    ),
  },
  {
    title: "키보드 사진 한 장",
    bg: "from-white to-blue-50",
    script:
      "get_pressed는 키보드 전체를 한 장에 찍은 사진이라고 생각하면 됩니다. 지금 이 순간 어떤 키가 눌려 있는지를 전부 담아서 돌려줍니다. 여기서 중요한 것은 눌려 있는 동안 계속 True라는 점입니다. 키를 꾹 누르고 있으면 매 프레임 True가 나옵니다. 그래서 캐릭터를 부드럽게 계속 움직일 때 딱 맞습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`keys = pygame.key.get_pressed()

keys[pygame.K_w]    # 눌려 있으면 True
keys[pygame.K_a]    # 아니면 False`}</CodeBlock>
        <p className="mt-6 text-xl text-gray-600">
          누르고 있는 동안 <span className="font-bold">계속</span> True
        </p>
      </div>
    ),
  },
  {
    title: "두 가지 입력 방식",
    bg: "from-white to-slate-50",
    script:
      "참고로 키 입력에는 두 가지 방식이 있습니다. get_pressed는 눌려 있는 동안 계속 반응해서 이동에 씁니다. 반면 이벤트 방식인 KEYDOWN은 누른 순간 딱 한 번만 반응합니다. 점프나 발사처럼 한 번만 일어나야 하는 동작에 씁니다. 실제로 두 챕터 뒤 미사일 발사에서 KEYDOWN을 쓰게 되니 오늘 미리 언급해 두면 좋습니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-teal-400 bg-white p-6">
          <h3 className="font-mono text-xl font-bold text-teal-600">
            get_pressed()
          </h3>
          <p className="mt-3 text-lg text-gray-700">
            누르고 있는 동안 계속
            <br />→ 이동
          </p>
        </div>
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6">
          <h3 className="font-mono text-xl font-bold text-gray-500">KEYDOWN</h3>
          <p className="mt-3 text-lg text-gray-600">
            누른 순간 한 번만
            <br />→ 점프, 발사
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "방향은 매 프레임 새로",
    bg: "from-white to-red-50",
    script:
      "다음은 학생들이 실습에서 반드시 만나는 함정입니다. 방향 벡터를 매 프레임 0 0으로 되돌려야 합니다. 왜냐하면 키에서 손을 뗐을 때 멈춰야 하기 때문입니다. 초기화하지 않으면 지난 프레임의 방향이 그대로 남아서, W를 눌렀다 떼도 우주선이 계속 위로 날아갑니다. 매 프레임 나는 지금 어디로 가야 하지를 새로 묻는 구조여야 한다고 설명해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`direction = pygame.Vector2(0, 0)   # 매 프레임 "정지"부터
if keys[pygame.K_w]:
    direction.y = -1`}</CodeBlock>
        <div className="mt-6 rounded-xl border-2 border-red-300 bg-white p-5 text-lg text-gray-700">
          초기화를 빠뜨리면 → 손을 떼도 계속 날아간다
        </div>
      </div>
    ),
  },
  {
    title: "위로 가는데 왜 마이너스?",
    bg: "from-white to-amber-50",
    script:
      "여기서 질문이 꼭 나옵니다. W는 위인데 왜 y가 마이너스 1이냐는 것입니다. 지난 시간에 배운 대로 파이게임의 y는 아래가 커집니다. 화면 맨 위가 0이고 아래로 갈수록 숫자가 커집니다. 그래서 위로 가려면 빼야 합니다. 이건 매 수업 나오는 질문이니 미리 짚고 넘어가면 좋습니다.",
    content: (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border-2 border-amber-400 bg-white p-8 text-center">
          <p className="text-xl text-gray-500">y = 0 (화면 맨 위)</p>
          <p className="my-6 text-3xl text-amber-600">↓ y가 커지는 방향</p>
          <p className="text-xl text-gray-500">y = 720 (화면 맨 아래)</p>
        </div>
        <p className="mt-6 text-center text-xl font-bold text-gray-700">
          위로 가려면 y를 <span className="text-amber-600">빼야</span> 한다
        </p>
      </div>
    ),
  },
  {
    title: "if 여덟 줄을 뺄셈 두 줄로",
    bg: "from-white to-emerald-50",
    script:
      "다음은 코드를 줄이는 방법입니다. True는 1, False는 0이 되는 성질을 이용합니다. 오른쪽 힘에서 왼쪽 힘을 빼는 줄다리기라고 생각하면 됩니다. D만 누르면 1 빼기 0으로 1, A만 누르면 0 빼기 1로 마이너스 1, 둘 다 누르면 0이 되어 제자리입니다. if 여덟 줄이 두 줄로 줄고, 양쪽을 동시에 누르는 경우까지 저절로 처리됩니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`direction.x = int(keys[K_d]) - int(keys[K_a])
direction.y = int(keys[K_s]) - int(keys[K_w])

# D만    1 - 0 =  1
# A만    0 - 1 = -1
# 둘 다  1 - 1 =  0`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "대각선이 더 빠르다",
    bg: "from-white to-red-50",
    script:
      "이제 오늘의 핵심입니다. W와 D를 같이 누르면 방향이 1 마이너스 1이 됩니다. 이 화살표의 길이는 얼마일까요. 가로 1 세로 1인 직각삼각형의 빗변이니 약 1.414입니다. 상하좌우일 때는 길이가 1인데 대각선일 때는 1.414입니다. 약 41퍼센트 더 빠릅니다. 같은 보폭으로 걸어도 대각선으로 가면 더 멀리 간다고 비유하면 이해가 빠릅니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-sky-400 bg-white p-6 text-center">
          <h3 className="text-xl font-bold text-sky-600">상하좌우</h3>
          <p className="mt-3 font-mono text-2xl text-gray-700">(1, 0)</p>
          <p className="mt-2 text-lg text-gray-600">길이 = 1</p>
        </div>
        <div className="rounded-xl border-2 border-red-400 bg-white p-6 text-center">
          <h3 className="text-xl font-bold text-red-500">대각선</h3>
          <p className="mt-3 font-mono text-2xl text-gray-700">(1, -1)</p>
          <p className="mt-2 text-lg text-gray-600">길이 ≈ 1.414</p>
        </div>
      </div>
    ),
  },
  {
    title: "정규화 — 길이만 1로",
    bg: "from-white to-teal-50",
    script:
      "해결책은 정규화입니다. 방향은 그대로 두고 길이만 1로 맞춥니다. 1 마이너스 1은 0.707 마이너스 0.707이 됩니다. 방향은 여전히 오른쪽 위인데 길이가 1이라 다른 방향과 속도가 같아집니다. 그리고 반드시 length가 0보다 큰지 검사해야 합니다. 아무 키도 안 누르면 방향이 0 0인데, 길이 0짜리 화살표는 길이를 1로 만들 수 없어서 오류가 납니다. 실습에서 일부러 이 오류를 내보게 할 예정입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`if direction.length() > 0:      # 이 검사가 없으면 오류!
    direction.normalize_ip()

# (1, -1) → (0.707, -0.707)
# 방향은 그대로, 길이만 1`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          _ip = in place · 그 자리에서 바꾼다
        </p>
      </div>
    ),
  },
  {
    title: "화면 밖으로 못 나가게",
    bg: "from-white to-slate-50",
    script:
      "마지막으로 clamp_ip입니다. clamp는 가둔다는 뜻입니다. 우주선 사각형이 화면 사각형 밖으로 나가면 경계에 딱 붙여줍니다. 지난 시간처럼 튕기는 게 아니라 더 못 나가게 막는 것입니다. 이것도 _ip가 붙어 있으니, 그 자리에서 바꾼다는 규칙을 다시 확인시켜 주면 좋습니다. 그럼 실습으로 넘어가겠습니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`player_rect.clamp_ip(
    pygame.Rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
)`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-gray-600">
          clamp = 가둔다 · 경계에 딱 붙여서 더 못 나가게
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
