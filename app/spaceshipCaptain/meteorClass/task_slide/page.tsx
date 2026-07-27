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
      "실습을 시작합니다. 오늘도 한 단계씩 갑니다. 운석 하나 띄우기, 랜덤으로 떨어뜨리기, 여러 개 만들기, 계속 나오게 하기, 마지막에 최적화입니다. 미션 5의 최적화는 화면이 안 바뀌는 작업이지만 게임이 느려지지 않게 하는 중요한 단계라고 미리 말해주세요.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          실습 · <span className="text-emerald-600">운석 쏟아내기</span>
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          띄우기 → 랜덤 → 여러 개 → 타이머 → 최적화
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 · 스스로 만들어보기",
    bg: "from-white to-amber-50",
    script:
      "첫 미션은 운석 클래스를 만드는 것인데, 이번엔 코드를 다 주지 않습니다. 9강에서 만든 missile.py와 거의 같으니 그걸 열어놓고 이름만 바꿔가며 스스로 쓰게 하세요. 위치는 일단 100 100으로 고정하고 update는 pass로 둡니다. 세 번째 스프라이트 클래스라 이제 패턴이 손에 익을 때입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-amber-400 bg-white p-8 text-xl text-gray-700">
          <p className="font-bold text-amber-600">
            코드를 주지 않습니다 — 스스로
          </p>
          <p className="mt-4">missile.py를 열어놓고 이름만 바꿔가며</p>
          <p className="mt-2 text-lg text-gray-500">
            위치는 (100, 100) 고정 · update는 pass
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 · 랜덤으로",
    bg: "from-white to-blue-50",
    script:
      "두 번째 미션에서 랜덤을 넣습니다. 빈칸은 random 모듈, y 시작 범위, 그리고 사라지는 조건입니다. y 시작 범위를 마이너스 100에서 0으로 하는 이유를 꼭 물어보세요. 화면 위쪽 바깥에서 시작해야 자연스럽습니다. 그리고 실행할 때마다 운석이 다른 자리에서 다른 속도로 떨어지는지 확인하게 하세요. 매번 똑같다면 random을 안 쓴 것입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`import ______

center=(random.randint(0, WINDOW_WIDTH),
        random.randint(____, ____))

def update(self, dt):
    self.rect.center += self.direction * dt * self.speed
    if self.rect.____ > WINDOW_HEIGHT:
        self.kill()`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 3 · 공장 만들기",
    bg: "from-white to-orange-50",
    script:
      "세 번째 미션은 spawn 클래스 메서드입니다. 빈칸은 classmethod입니다. 여기서 raise ValueError를 왜 넣는지도 설명해 주세요. spawn을 0으로 부르면 조용히 아무것도 안 하는 것보다 에러로 알려주는 게 낫습니다. 나중에 버그를 훨씬 빨리 찾습니다. 운석 열 개가 우르르 떨어지면 성공입니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`@__________
def spawn(cls, group, n):
    if n <= 0:
        raise ValueError("n must be greater than 0")
    for _ in range(n):
        Meteor(group)

# main.py
Meteor.spawn(all_sprite_group, 10)`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 4 · 타이머",
    bg: "from-white to-purple-50",
    script:
      "네 번째 미션에서 타이머를 붙입니다. custom_type과 set_timer 두 줄을 while 위에 넣고, 이벤트 확인 부분에 갈래를 하나 추가합니다. 그리고 여기서 재미있는 실험을 시키세요. 400을 100으로 바꾸면 운석이 미친 듯이 쏟아지고, 2000으로 바꾸면 한참 기다려야 합니다. 이게 게임 난이도를 조절하는 숫자라고 알려주고 각자 좋아하는 값을 찾게 하세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`meteor_event = pygame.event.____________()
pygame.time.__________(meteor_event, 400)

if event.type == ____________:
    Meteor.spawn(all_sprite_group, 3)`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          400 → 100? 2000? 게임 난이도를 조절하는 숫자
        </p>
      </div>
    ),
  },
  {
    title: "미션 5 · 순서가 중요하다",
    bg: "from-white to-red-50",
    script:
      "마지막 미션이 최적화인데, 순서가 정말 중요합니다. 반드시 settings.py를 먼저 고쳐야 합니다. pygame.init과 set_mode를 settings.py로 옮기고, main.py에서는 display_surface를 가져다 쓰기만 합니다. 이걸 먼저 안 하고 클래스 변수부터 바꾸면 cannot convert without video display 오류가 납니다. 이 오류가 나면 5-1을 했는지 확인하라고 안내해 주세요.",
    content: (
      <div className="mx-auto max-w-3xl">
        <ol className="flex flex-col gap-4 text-xl text-gray-700">
          <li className="font-bold text-red-500">
            ① settings.py에 init/set_mode 옮기기 (먼저!)
          </li>
          <li>② meteor.py 이미지를 클래스 변수로</li>
          <li>③ missile.py도 똑같이 (스스로)</li>
        </ol>
        <div className="mt-6 rounded-xl border-2 border-red-300 bg-white p-4 font-mono text-base text-red-600">
          pygame.error: cannot convert without video display
        </div>
      </div>
    ),
  },
  {
    title: "오늘 한 일",
    bg: "from-emerald-50 to-stone-100",
    script:
      "오늘 한 일을 정리하겠습니다. random으로 운석마다 다른 위치와 속도와 방향을 줬고, classmethod로 공장을 만들었고, 커스텀 이벤트와 타이머로 운석이 계속 쏟아지게 했고, 이미지를 클래스 변수로 한 번만 불러오도록 최적화했고, settings.py로 화면 생성을 옮겨 import 순서를 맞췄습니다. 이제 쏠 수도 있고 맞출 것도 있는데, 미사일이 운석을 뚫고 지나갑니다. 다음 시간에는 충돌을 배웁니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· random으로 다양한 운석</li>
        <li>· @classmethod 공장</li>
        <li>· 커스텀 이벤트 + 타이머</li>
        <li>· 이미지 클래스 변수 최적화</li>
        <li className="mt-4 text-stone-600">
          다음 시간 — 충돌 (미사일이 뚫고 지나간다!)
        </li>
      </ul>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
