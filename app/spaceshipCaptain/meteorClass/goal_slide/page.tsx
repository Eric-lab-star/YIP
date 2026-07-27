"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-slate-50 to-stone-100",
    script:
      "드디어 맞출 것이 생깁니다. 운석은 미사일과 비슷하지만 두 가지가 다릅니다. 첫째, 하나하나가 다 달라야 합니다. 다 똑같이 떨어지면 재미없습니다. 둘째, 끝없이 계속 나와야 합니다. 그리고 오늘은 처음으로 최적화도 배웁니다.",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 sm:text-6xl">
          <span className="text-stone-600">운석</span> 클래스
        </h1>
        <p className="mt-2 text-2xl text-gray-500">
          우주선 게임 10강 · 랜덤 · 타이머 · 최적화
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-white to-slate-50",
    script:
      "오늘의 목표는 네 가지입니다. random으로 운석마다 다른 위치와 속도와 방향을 주는 방법, 커스텀 이벤트와 타이머로 주기적으로 실행하는 법, classmethod가 무엇인지, 그리고 이미지를 클래스 변수로 한 번만 불러오는 최적화의 이유입니다.",
    content: (
      <ul className="mx-auto flex max-w-3xl flex-col gap-4 text-2xl leading-relaxed text-gray-700">
        <li>· random으로 다양한 운석 만들기</li>
        <li>· 커스텀 이벤트 + 타이머</li>
        <li>· @classmethod</li>
        <li>· 이미지 로딩 최적화</li>
      </ul>
    ),
  },
  {
    title: "랜덤 세 가지",
    bg: "from-white to-amber-50",
    script:
      "운석 100개가 전부 같은 자리에서 같은 속도로 떨어지면 게임이 아닙니다. 세 가지를 랜덤으로 줍니다. 위치는 가로는 아무 데나, 세로는 마이너스 100에서 0 사이입니다. 여기가 중요합니다. 화면 위쪽 바깥에서 시작해야 운석이 화면 안에서 갑자기 튀어나오지 않고 위에서 스르륵 들어오는 것처럼 보입니다. 속도는 300에서 500, 방향은 x가 마이너스 1, 0, 1 중 하나이고 y는 항상 1이라 아래로는 반드시 갑니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`center=(random.randint(0, WINDOW_WIDTH),
        random.randint(-100, 0))     # 화면 위쪽 바깥!

self.speed = random.randint(300, 500)
self.direction = pygame.Vector2(random.randint(-1, 1), 1)`}</CodeBlock>
        <p className="mt-5 text-xl text-gray-600">
          y가 음수 → 위에서 스르륵 들어온다
        </p>
      </div>
    ),
  },
  {
    title: "@classmethod — 가게에 주문하기",
    bg: "from-white to-orange-50",
    script:
      "운석을 열 개 만들려고 Meteor 괄호 group을 열 번 쓸 수는 없습니다. 공장을 만듭니다. classmethod는 붕어빵 가게 주인에게 주문하는 것이라고 비유하면 됩니다. 보통 메서드는 붕어빵 하나에게 말을 거는 것이고, 클래스 메서드는 가게 자체에게 말을 거는 것입니다. 붕어빵을 먼저 하나 사지 않아도 다섯 개 주세요라고 주문할 수 있습니다.",
    content: (
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-xl border-2 border-gray-300 bg-white p-6">
          <h3 className="font-mono text-lg font-bold text-gray-500">
            보통 메서드 (self)
          </h3>
          <p className="mt-3 text-lg text-gray-600">
            객체 하나에게
            <br />
            player.update(dt)
          </p>
        </div>
        <div className="rounded-xl border-2 border-orange-400 bg-white p-6">
          <h3 className="font-mono text-lg font-bold text-orange-600">
            클래스 메서드 (cls)
          </h3>
          <p className="mt-3 text-lg text-gray-700">
            클래스 자체에게
            <br />
            Meteor.spawn(group, 10)
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "커스텀 이벤트 — 간식 시간 만들기",
    bg: "from-white to-blue-50",
    script:
      "운석이 처음에 10개 나오고 끝나면 안 됩니다. 계속 나와야 합니다. 학교 시간표에 없던 간식 시간을 내가 직접 만들어 등록하는 것과 같습니다. 세 단계입니다. custom_type으로 새 이벤트 종류를 만들고, set_timer로 알람을 맞추고, 게임 루프에서 그 알람을 듣습니다. 1강에서 배운 event.get이 여기서 다시 나온다는 점을 짚어주세요. 그때는 창 닫기만 봤는데 이제 내가 만든 이벤트도 같은 접수함으로 들어옵니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`meteor_event = pygame.event.custom_type()   # ① 만들고
pygame.time.set_timer(meteor_event, 400)   # ② 알람 맞추고

for event in pygame.event.get():
    if event.type == meteor_event:          # ③ 들으면
        Meteor.spawn(all_sprite_group, 3)`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "최적화 — 마트에 100번 다녀오기",
    bg: "from-white to-red-50",
    script:
      "이제 최적화입니다. 지금 코드는 운석이 하나 생길 때마다 하드디스크에서 meteor.png를 다시 읽습니다. 붕어빵을 하나 구울 때마다 밀가루를 사러 마트에 다녀오는 것과 같습니다. 운석 100개면 마트에 100번 다녀옵니다. 디스크에서 파일을 읽는 건 메모리에서 꺼내는 것보다 훨씬 느리고, 게다가 똑같은 이미지가 메모리에 100개나 올라갑니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`def __init__(self, group):
    self.image = pygame.image.load(Meteor.path).convert_alpha()
    #            ↑ 운석 하나 만들 때마다 디스크에서 다시 읽는다`}</CodeBlock>
        <p className="mt-6 text-center text-xl text-red-500">
          붕어빵 하나 구울 때마다 마트 다녀오기
        </p>
      </div>
    ),
  },
  {
    title: "클래스 변수로 공유하기",
    bg: "from-white to-emerald-50",
    script:
      "해결책은 6강에서 배운 게시판, 즉 클래스 변수입니다. 이미지를 클래스 변수로 한 번만 불러두고 모든 운석이 그 하나를 공유합니다. 밀가루를 한 포대 사와서 모든 붕어빵을 그걸로 굽는 것과 같습니다. 미사일 클래스에도 똑같이 적용합니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")
    surf = pygame.image.load(path).convert_alpha()   # 딱 한 번

    def __init__(self, group):
        self.image = Meteor.surf     # 모두가 공유`}</CodeBlock>
      </div>
    ),
  },
  {
    title: "함정 — 클래스 변수는 언제 실행되나",
    bg: "from-white to-purple-50",
    script:
      "여기서 중요한 함정이 있습니다. 클래스 변수에 적힌 코드는 언제 실행될까요. __init__이 불릴 때가 아닙니다. 파이썬이 class Meteor라는 정의문을 읽는 순간, 즉 그 파일이 import되는 바로 그때 딱 한 번 실행됩니다. 빵집이 문을 여는 아침에 주인이 반죽을 미리 만들어두는 것과 같습니다. 손님이 한 명도 안 왔지만 가게가 세워지는 순간 이미 준비가 끝납니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-2 border-purple-400 bg-white p-8 text-xl text-gray-700">
          <p className="font-bold text-purple-600">클래스 변수 실행 시점</p>
          <p className="mt-4">__init__ 호출 때가 아니라</p>
          <p className="mt-2 font-bold">파일을 import 하는 순간, 딱 한 번</p>
          <p className="mt-6 text-lg text-gray-500">
            빵집 문 여는 아침에 반죽을 미리 만들어두기
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "그래서 set_mode를 옮긴다",
    bg: "from-white to-teal-50",
    script:
      "그런데 convert_alpha는 화면이 이미 만들어져 있어야 쓸 수 있습니다. 3강에서 배웠습니다. 그래서 순서 문제가 생깁니다. main이 meteor.py를 import하면 class 정의문을 읽으면서 image.load와 convert_alpha가 실행되는데, 그때 아직 화면이 없으면 오류가 납니다. 해결책은 화면 만들기를 settings.py로 옮기는 것입니다. meteor.py가 settings를 먼저 import하니 화면이 먼저 만들어지고 그다음에 이미지가 로드됩니다. 실습에서 이 순서를 안 지키면 cannot convert without video display 오류가 납니다.",
    content: (
      <div className="mx-auto max-w-3xl">
        <CodeBlock>{`# settings.py
pygame.init()
display_surface = pygame.display.set_mode((W, H))

# entity/meteor.py
from settings import ...     # 화면이 먼저 만들어진다
surf = pygame.image.load(path).convert_alpha()  # 그다음 로드`}</CodeBlock>
        <div className="mt-5 rounded-xl border-2 border-red-300 bg-white p-4 text-lg text-gray-700">
          순서를 어기면: pygame.error: cannot convert without video display
        </div>
      </div>
    ),
  },
];

export default function Page() {
  return <SlideShell slides={slides} />;
}
