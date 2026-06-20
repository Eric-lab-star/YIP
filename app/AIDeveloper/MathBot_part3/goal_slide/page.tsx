"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: `안녕하세요, 여러분. 오늘 강의의 주제는 '수학 풀이 봇 완성하기'입니다. 지금까지 우리는 16차시에서 텔레그램 봇의 대화 기능을, 17차시에서 사진 속 수학 문제를 인식하고 풀이를 생성하는 기능을 각각 만들었습니다. 오늘은 이 두 가지 부품을 하나로 조립하여, 사진을 보내면 풀이를 답장해주는 완성형 봇을 만들겠습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🤖</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          부품을 조립하자!
          <br />
          수학 풀이 봇 완성하기
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          대화 기능 + 사진 풀이 기능 → 완성형 봇
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: `오늘의 학습 목표는 두 가지입니다. 첫째, 텔레그램 봇이 사진을 받는 방법을 이해합니다. 글자 메시지와 사진 메시지는 처리 방식이 다르며, 이를 위한 별도의 핸들러가 필요합니다. 둘째, 16차시에서 만든 봇 코드와 17차시에서 만든 사진 인식 및 풀이 코드를 결합하여, 사진을 보내면 풀이를 답장하는 완성형 앱을 만듭니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "텔레그램 봇이 사진을 받는 방법을 이해한다" },
            { num: "2", text: "16차시(봇)와 17차시(사진 인식 + 풀이)를 결합해 완성형 앱을 만든다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-orange-400 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "지금까지 만든 부품 정리",
    bg: "from-blue-50 to-indigo-50",
    script: `본격적으로 시작하기 전에, 지금까지 만든 부품을 정리하겠습니다. 16차시에서 만든 것은 텔레그램에서 텍스트 메시지를 받아 답장하는 봇입니다. 이것은 봇의 '입과 귀'에 해당합니다. 17차시에서 만든 것은 사진 속 수학 문제를 인식하고 AI가 단계별 풀이를 생성하는 기능입니다. 이것은 봇의 '눈과 머리'에 해당합니다. 오늘은 이 두 부품을 하나의 몸체에 조립하여, 사진을 받으면 풀이를 답장하는 완성형 봇을 만듭니다. 마치 로봇의 부품을 따로 만들어서 마지막에 조립하는 것과 같습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          {[
            { icon: "👂", label: "16차시 — 대화하는 봇", desc: "텔레그램에서 텍스트 메시지를 받아 답장 (봇의 입과 귀)" },
            { icon: "👁️", label: "17차시 — 사진 풀이 기능", desc: "사진 속 수학 문제를 인식하고 AI가 풀이 생성 (봇의 눈과 머리)" },
            { icon: "🤖", label: "오늘 — 둘을 합치기", desc: "사진을 받으면 풀이를 답장하는 완성형 봇 조립" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.label}</p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "글자 핸들러 vs 사진 핸들러",
    bg: "from-purple-50 to-pink-50",
    script: `여기서 중요한 개념이 있습니다. 텔레그램에서는 글자(텍스트)와 사진(이미지)이 서로 다른 방식으로 전달됩니다. 지금까지 만든 봇은 글자 메시지만 처리할 수 있었습니다. filters.TEXT를 사용하여 글자 메시지만 골라내는 '글자 핸들러'를 만들었기 때문입니다. 사진을 처리하려면 filters.PHOTO를 사용하는 별도의 '사진 핸들러(PhotoHandler)'를 새로 추가해야 합니다. 이것이 오늘 새로 만들 핵심 부품입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">텔레그램에서 글자와 사진은 서로 다른 방식으로 처리됩니다.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white/70 rounded-xl p-6 border-l-4 border-blue-400">
            <p className="text-lg font-bold text-blue-700 mb-2">💬 글자(텍스트) 핸들러</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>• 사용자가 보낸 글자를 받음</li>
              <li>• filters.TEXT로 글자만 골라냄</li>
              <li>• 16차시에서 만든 부분</li>
            </ul>
          </div>
          <div className="bg-white/70 rounded-xl p-6 border-l-4 border-purple-400">
            <p className="text-lg font-bold text-purple-700 mb-2">🖼️ 사진(이미지) 핸들러</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>• 사용자가 보낸 사진을 받음</li>
              <li>• filters.PHOTO로 사진만 골라냄</li>
              <li>• 오늘 새로 추가할 부분</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "사진이 풀이로 바뀌는 과정",
    bg: "from-cyan-50 to-blue-50",
    script: `사진 한 장이 풀이 결과로 바뀌는 전체 과정을 살펴보겠습니다. 네 단계로 이루어집니다. 첫째, 사용자가 수학 문제 사진을 봇에게 보냅니다. 둘째, 봇이 받은 사진을 컴퓨터에 파일로 저장합니다. 셋째, 저장한 사진을 17차시에서 만든 풀이 기능, 즉 AI에게 전달합니다. 넷째, AI가 만든 풀이 결과를 사용자에게 답장으로 보냅니다. 여기서 중요한 UX 배려 포인트가 있습니다. AI가 풀이를 만드는 데 시간이 걸리므로, 그동안 사용자가 불안해하지 않도록 '잠시만 기다려주세요'와 같은 안내 메시지를 먼저 보내주는 것이 좋습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", icon: "📸", text: "사용자가 수학 문제 사진을 봇에게 보냄" },
            { num: "2", icon: "💾", text: "받은 사진을 파일(received.jpg)로 저장" },
            { num: "3", icon: "🧠", text: "저장한 사진을 AI(풀이 기능)에 전달" },
            { num: "4", icon: "💬", text: "AI가 만든 풀이를 사용자에게 답장" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
              <p className="text-lg text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400">
          <p className="text-base text-gray-700">
            💡 <strong>UX 배려:</strong> 풀이 생성에 시간이 걸리므로, &ldquo;잠시만 기다려주세요...&rdquo; 안내 메시지를 먼저 보내면 친절한 봇이 됩니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "모듈식 개발이란?",
    bg: "from-green-50 to-emerald-50",
    script: `우리가 기능을 처음부터 하나로 만들지 않고, 따로따로 만든 다음 마지막에 합친 이유가 있습니다. 이러한 방식을 '모듈식 개발'이라고 합니다. 모듈식 개발의 장점은 세 가지입니다. 첫째, 테스트하기 쉽습니다. 각 부품을 독립적으로 테스트할 수 있어서, 문제가 있는 부분을 빠르게 찾을 수 있습니다. 둘째, 오류를 찾기 쉽습니다. 문제가 발생했을 때 어느 부품에서 잘못되었는지 빠르게 파악할 수 있습니다. 셋째, 재사용이 가능합니다. 17차시에서 만든 풀이 기능을 오늘 그대로 가져다 쓰는 것처럼, 한 번 잘 만든 부품은 다른 프로젝트에서도 계속 활용할 수 있습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            기능을 따로 만들고 마지막에 합치는 방식을 <strong>모듈식 개발</strong>이라고 합니다.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { num: "1", title: "테스트하기 쉽다", desc: "각 부품을 독립적으로 테스트하여 문제를 빠르게 발견" },
            { num: "2", title: "오류를 찾기 쉽다", desc: "문제 발생 시 어느 부품에서 잘못되었는지 빠르게 파악" },
            { num: "3", title: "재사용이 가능하다", desc: "17차시 풀이 기능을 오늘 그대로 재사용하는 것처럼 활용" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-start gap-4">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "풀이 프롬프트 재사용",
    bg: "from-teal-50 to-cyan-50",
    script: `오늘 봇의 AI에게 줄 명령서, 즉 풀이 프롬프트는 17차시에서 만든 것을 그대로 가져다 씁니다. 새로 만들 필요 없이 부품을 재사용하는 것입니다. 이 프롬프트는 AI에게 '어떻게 풀이를 만들어야 하는지' 알려주는 안내문입니다. 친절한 수학 선생님 역할을 지정하고, 문제 설명, 단계별 풀이 과정, 정답 순서로 답변하도록 지시합니다. 한 번 잘 만들어두면, 사진만 바꿔도 같은 형식의 풀이를 만들어줍니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">17차시에서 만든 풀이 프롬프트를 <strong>그대로 재사용</strong>합니다.</p>
        </div>
        <CodeBlock>
          {`# 17차시에서 만든 풀이 프롬프트 재사용
solve_prompt = """
너는 친절한 수학 선생님이야.
이 사진 속 수학 문제를 풀어줘.
문제를 설명하고, 단계별 풀이 과정을 보여준 뒤,
마지막에 '정답: '으로 정답을 알려줘.
중학생도 이해할 수 있게 쉽게 설명해줘.
"""`}
        </CodeBlock>
        <div className="bg-teal-50 rounded-xl p-4">
          <p className="text-base text-gray-600">한 번 잘 만든 프롬프트는 사진만 바뀌어도 같은 형식의 풀이를 생성합니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "완성 봇의 전체 구조",
    bg: "from-indigo-50 to-violet-50",
    script: `완성될 봇의 전체 구조를 정리하겠습니다. 봇은 크게 네 가지 부품으로 구성됩니다. 첫째, 연결 도구 불러오기 — 텔레그램 도구, 제미나이 AI 도구, 이미지 도구인 PIL을 import합니다. 둘째, 열쇠 준비 — 봇 토큰과 제미나이 API 키를 설정합니다. 셋째, 기존 기능 — /start 인사 기능과 풀이 프롬프트를 재사용합니다. 넷째, 오늘의 핵심인 사진 핸들러 — 사진을 받아서 저장하고, AI에 전달하고, 풀이 결과를 답장하는 함수를 새로 작성합니다. 이 구조를 이해하고 있으면, 실습에서 코드를 조립할 때 큰 그림이 보일 것입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">완성 봇에 들어갈 네 가지 부품</p>
        <div className="space-y-3">
          {[
            { icon: "📦", label: "연결 도구 불러오기", desc: "텔레그램, 제미나이 AI, PIL(이미지) 도구 import" },
            { icon: "🔑", label: "열쇠 준비", desc: "봇 토큰, 제미나이 API 키 설정" },
            { icon: "♻️", label: "기존 기능 재사용", desc: "/start 인사 기능 + 풀이 프롬프트" },
            { icon: "🌟", label: "사진 핸들러 (NEW!)", desc: "사진 받기 → 파일 저장 → AI 풀이 → 답장 전송" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.label}</p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "photo[-1]의 의미",
    bg: "from-rose-50 to-pink-50",
    script: `코드에서 자주 보게 될 photo[-1]에 대해 설명하겠습니다. 텔레그램은 사진 한 장을 보낼 때 여러 가지 크기의 버전을 함께 전송합니다. 작은 썸네일부터 고화질 원본까지 배열 형태로 들어오며, photo[-1]은 그 배열의 마지막 항목, 즉 가장 고화질인 사진을 선택하는 것입니다. 수학 문제 사진은 글씨가 또렷하게 보여야 AI가 정확하게 인식할 수 있으므로, 고화질 사진을 사용하는 것이 중요합니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            텔레그램은 사진 한 장을 보낼 때 <strong>여러 크기의 버전</strong>을 함께 전송합니다.
          </p>
        </div>
        <CodeBlock>{`# photo[-1] = 배열의 마지막 = 가장 고화질
photo_file = await update.message.photo[-1].get_file()`}</CodeBlock>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-sm text-gray-500">photo[0]</p>
            <p className="text-lg">🖼️</p>
            <p className="text-xs text-gray-400">작은 썸네일</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-sm text-gray-500">photo[1]</p>
            <p className="text-2xl">🖼️</p>
            <p className="text-xs text-gray-400">중간 크기</p>
          </div>
          <div className="bg-blue-100 rounded-xl p-3 border-2 border-blue-400">
            <p className="text-sm text-blue-600 font-bold">photo[-1]</p>
            <p className="text-3xl">🖼️</p>
            <p className="text-xs text-blue-500">고화질 원본</p>
          </div>
        </div>
        <p className="text-base text-gray-500 text-center">문제 글씨가 또렷해야 AI가 정확히 인식할 수 있으므로 고화질을 선택합니다.</p>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, 완성형 봇은 16차시의 대화 기능과 17차시의 사진 풀이 기능을 하나로 합쳐서 만듭니다. 둘째, 텔레그램에서 글자와 사진은 서로 다른 핸들러로 처리하며, 사진용으로는 filters.PHOTO를 사용합니다. 셋째, 사진 처리 흐름은 사진 받기, 파일 저장, AI 풀이, 답장 전송 네 단계입니다. 넷째, 사용자 경험을 위해 처리 중 안내 메시지를 먼저 보내는 것이 중요합니다. 다섯째, 이처럼 기능을 따로 만들고 마지막에 합치는 방식을 모듈식 개발이라 하며, 테스트, 디버깅, 재사용에 유리합니다.`,
    content: (
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          {[
            "16차시(대화) + 17차시(사진 풀이) = 완성형 봇",
            "글자 핸들러(filters.TEXT)와 사진 핸들러(filters.PHOTO)는 별도",
            "사진 처리 흐름: 받기 → 저장 → AI 풀이 → 답장",
            "처리 중 안내 메시지로 사용자 경험 개선",
            "모듈식 개발: 테스트·디버깅·재사용에 유리",
          ].map((text, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-center gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <p className="text-lg text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: `개념 강의를 마치겠습니다. 오늘 배운 내용을 바탕으로, 다음 실습 시간에는 사진 핸들러를 직접 코드로 추가하고, 실제로 수학 문제 사진을 보내서 풀이를 받아보는 실습을 진행하겠습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 사진 핸들러를 직접 추가하고 봇을 완성합니다</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function MathBot3GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
