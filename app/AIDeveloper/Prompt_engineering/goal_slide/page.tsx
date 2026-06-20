"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-amber-50 to-yellow-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 '좋은 프롬프트 작성법', 즉 프롬프트 엔지니어링입니다. 지난 시간에 LangChain Agent를 만들었을 때, Agent가 도구를 제대로 찾지 못하고 헤맸던 경험이 있으실 겁니다. 사실 그것은 도구의 설명문이 모호하게 작성되어 있었기 때문입니다. 오늘은 AI에게 일을 제대로 시키는 방법, 즉 좋은 프롬프트를 작성하는 네 가지 핵심 요소를 배우겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📝</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          AI에게 잘 시키는 법!
          <br />
          좋은 <code className="text-amber-500">프롬프트</code>가 뭐냥?
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          코딩냥과 함께하는 프롬프트 엔지니어링 강의
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "오늘 강의의 학습 목표를 확인하겠습니다. 첫째, 좋은 프롬프트와 나쁜 프롬프트의 차이를 설명할 수 있어야 합니다. 둘째, 좋은 프롬프트의 네 가지 핵심 요소인 역할, 맥락, 지시, 형식을 이해합니다. 셋째, 지난 시간 Agent가 도구를 못 찾던 문제가 프롬프트 작성과 어떻게 연결되는지 이해합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.</p>
        <div className="space-y-4">
          {[
            { num: "1", text: "좋은 프롬프트와 나쁜 프롬프트의 차이를 설명할 수 있다" },
            { num: "2", text: "역할, 맥락, 지시, 형식 네 가지 핵심 요소를 활용할 수 있다" },
            { num: "3", text: "Agent의 도구 선택 문제와 프롬프트의 관계를 이해한다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "왜 같은 AI인데 결과가 다를까?",
    bg: "from-blue-50 to-indigo-50",
    script: "먼저 근본적인 질문을 던져보겠습니다. 왜 똑같은 AI인데 설명을 어떻게 쓰느냐에 따라 결과가 달라질까요? 지난 시간을 떠올려보겠습니다. Tool의 description이 모호하게 작성되어 있을 때, Agent는 '이 도구를 언제 써야 하지?'라고 헷갈려서 엉뚱하게 행동했습니다. 반대로 설명을 또렷하게 적어주었더니 척척 알아서 도구를 골랐습니다. 프롬프트는 AI에게 명령하는 코드와 같습니다. 코드에 오타가 있으면 에러가 나듯이, 프롬프트가 모호하면 엉뚱한 결과로 이어집니다. AI는 우리가 적어준 글자만큼만 이해합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-700">
            <strong>프롬프트는 &ldquo;AI에게 명령하는 코드&rdquo;와 같습니다.</strong>
          </p>
          <p className="text-lg text-gray-600 mt-2">
            코드에 오타 → 에러 / 프롬프트가 모호 → 엉뚱한 결과
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-700 mb-2">모호한 설명</p>
            <p className="text-gray-600">Agent가 도구를 못 찾고 헤맴</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-semibold text-green-700 mb-2">또렷한 설명</p>
            <p className="text-gray-600">Agent가 척척 도구를 골라냄</p>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          AI는 우리가 적어준 글자만큼만 이해합니다.
        </p>
      </div>
    ),
  },
  {
    title: "비유: 주문서가 곧 프롬프트",
    bg: "from-orange-50 to-amber-50",
    script: "이것을 식당에 비유해서 설명하겠습니다. 요리사, 즉 AI에게 그냥 '맛있게 해주세요'라고만 말하면, 요리사는 무엇을 만들어야 할지 막막합니다. 한식인지, 양식인지, 매운 것인지, 단 것인지 알 수가 없습니다. 하지만 '한식을 좋아하는 손님을 위해, 맵지 않게, 15분 안에 만들 수 있는 점심 메뉴를 추천해주세요'라고 말하면, 요리사는 훨씬 정확하고 만족스러운 요리를 만들어냅니다. 주문서가 곧 프롬프트입니다. 대충 쓴 주문서는 막막한 요리로, 자세히 쓴 주문서는 만족스러운 요리로 이어집니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">식당</th>
                <th className="p-4 text-left">우리 AI</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["요리사", "AI (LLM)"],
                ["손님이 건넨 주문서", "우리가 적은 프롬프트"],
                ["대충 쓴 주문서 → 막막한 요리", "모호한 프롬프트 → 엉뚱한 답변"],
                ["자세한 주문서 → 만족스러운 요리", "구체적 프롬프트 → 정확한 답변"],
              ].map(([left, right], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-semibold">{left}</td>
                  <td className="p-4">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "핵심 요소 1: 역할 (Role)",
    bg: "from-blue-50 to-sky-50",
    script: "좋은 프롬프트의 첫 번째 핵심 요소는 역할(Role)입니다. AI에게 어떤 역할을 맡길지 알려주는 것입니다. 예를 들어, '너는 친절한 여행 가이드야' 또는 '너는 10년 차 영양사야'와 같이 설정합니다. 역할을 정해주면 AI가 그 역할에 맞는 말투와 전문 지식을 선택하여 답변합니다. 같은 질문이라도 '여행 가이드'와 '영양사'에게 물으면 완전히 다른 관점의 답을 받을 수 있습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
          <p className="text-2xl font-bold text-blue-700 mb-2">역할 (Role)</p>
          <p className="text-xl text-gray-700">AI에게 <strong>어떤 역할을 맡길지</strong> 알려주는 것</p>
        </div>
        <div className="space-y-3">
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-lg text-gray-700">&ldquo;너는 <strong>친절한 여행 가이드</strong>야&rdquo;</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-lg text-gray-700">&ldquo;너는 <strong>10년 차 영양사</strong>야&rdquo;</p>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          역할에 따라 AI의 말투와 전문 지식이 달라집니다.
        </p>
      </div>
    ),
  },
  {
    title: "핵심 요소 2: 맥락 (Context)",
    bg: "from-green-50 to-emerald-50",
    script: "두 번째 핵심 요소는 맥락(Context)입니다. 답변에 필요한 상황 정보를 제공하는 것입니다. '초등학생에게 설명하듯이', '예산은 10만 원이고 2명이서 갈 거야'와 같이 작성합니다. 같은 질문이라도 듣는 사람과 상황에 따라 적절한 답이 달라집니다. 맥락을 제공하면 AI가 상황에 맞는 답을 만들어낼 수 있습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-400">
          <p className="text-2xl font-bold text-green-700 mb-2">맥락 (Context)</p>
          <p className="text-xl text-gray-700">답변에 필요한 <strong>상황 정보</strong>를 제공하는 것</p>
        </div>
        <div className="space-y-3">
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-lg text-gray-700">&ldquo;<strong>초등학생</strong>에게 설명하듯이&rdquo;</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-lg text-gray-700">&ldquo;예산은 <strong>10만 원</strong>이고 <strong>2명</strong>이서 갈 거야&rdquo;</p>
          </div>
        </div>
        <p className="text-lg text-gray-500 text-center">
          같은 질문이라도 상황에 따라 적절한 답이 달라집니다.
        </p>
      </div>
    ),
  },
  {
    title: "핵심 요소 3~4: 지시와 형식",
    bg: "from-purple-50 to-violet-50",
    script: "세 번째 요소는 지시(Instruction)입니다. 무엇을 어떻게 해야 하는지 명확하게 짚어주는 것입니다. '3줄 이내로 요약해줘', '장점과 단점을 각각 알려줘'와 같이 구체적인 숫자와 조건을 포함합니다. 네 번째 요소는 형식(Format)입니다. 결과를 어떤 형태로 받고 싶은지 지정하는 것입니다. '표 형식으로', '번호를 매긴 목록으로', '이모지를 붙여서'와 같이 원하는 모양을 미리 말해두면 한 번에 보기 좋은 결과를 받을 수 있습니다. 정리하면, '누가(역할), 어떤 상황에서(맥락), 무엇을 어떻게(지시), 어떤 모양으로(형식)' 답해야 하는지 적어주면 그것이 좋은 프롬프트입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-400">
            <p className="text-xl font-bold text-purple-700 mb-2">지시 (Instruction)</p>
            <p className="text-base text-gray-700">무엇을 어떻게 해야 하는지 명확하게</p>
            <p className="text-sm text-gray-500 mt-2">&ldquo;3줄 이내로 요약해줘&rdquo;</p>
            <p className="text-sm text-gray-500">&ldquo;장점과 단점을 각각 알려줘&rdquo;</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-6 border-l-4 border-violet-400">
            <p className="text-xl font-bold text-violet-700 mb-2">형식 (Format)</p>
            <p className="text-base text-gray-700">결과를 어떤 형태로 받고 싶은지</p>
            <p className="text-sm text-gray-500 mt-2">&ldquo;표 형식으로&rdquo;</p>
            <p className="text-sm text-gray-500">&ldquo;번호 목록으로&rdquo;</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            <strong>누가</strong>(역할) + <strong>어떤 상황에서</strong>(맥락) + <strong>무엇을 어떻게</strong>(지시) + <strong>어떤 모양으로</strong>(형식) = 좋은 프롬프트
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "나쁜 vs 좋은 프롬프트 비교",
    bg: "from-rose-50 to-pink-50",
    script: "같은 주제로 나쁜 프롬프트와 좋은 프롬프트를 비교해보겠습니다. 나쁜 프롬프트는 '여행지 추천해줘'입니다. 역할도, 맥락도, 형식도 없어서, AI는 누구를 위해 무엇을 기준으로 답해야 할지 알 수 없습니다. 결과가 막연하고 들쭉날쭉합니다. 반면 좋은 프롬프트는 '너는 여행 전문가야. 바다를 좋아하는 사람에게, 예산 20만 원으로 갈 수 있는 국내 여행지 3곳을 표 형식으로 추천해줘'입니다. 역할, 맥락, 지시, 형식이 모두 들어가 있어서 원하는 모양으로 또렷한 결과를 받을 수 있습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="font-bold text-red-700 mb-2">나쁜 프롬프트 💬</p>
            <p className="text-gray-700 italic">&ldquo;여행지 추천해줘&rdquo;</p>
            <p className="text-sm text-gray-500 mt-2">역할·맥락·형식 없음 → 막연한 결과</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-400">
            <p className="font-bold text-green-700 mb-2">좋은 프롬프트 ⚙️</p>
            <p className="text-gray-700 italic">&ldquo;너는 여행 전문가야. 바다를 좋아하는 사람에게, 예산 20만 원, 국내 3곳, 표 형식으로&rdquo;</p>
            <p className="text-sm text-gray-500 mt-2">4요소 모두 포함 → 또렷한 결과</p>
          </div>
        </div>
        <CodeBlock>
          {`# 나쁜 프롬프트
bad = "여행지 추천해줘"

# 좋은 프롬프트
good = """
너는 친절한 여행 전문가야.
바다를 좋아하는 사람에게,
예산 20만 원으로 갈 수 있는 국내 여행지 3곳을
표 형식으로 추천해줘.
"""`}
        </CodeBlock>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의 내용을 정리하겠습니다. 첫째, 프롬프트는 AI에게 명령하는 코드와 같으며, 모호하면 엉뚱한 결과가, 구체적이면 정확한 결과가 나옵니다. 둘째, 좋은 프롬프트의 네 가지 핵심 요소는 역할(Role), 맥락(Context), 지시(Instruction), 형식(Format)입니다. 셋째, 지난 시간 Agent가 도구를 못 찾은 것은 Tool의 설명문이 모호했기 때문이며, 좋은 프롬프트 원리를 적용하면 해결됩니다. 다음 시간에는 직접 나쁜 프롬프트와 좋은 프롬프트를 비교 실험하고, 나만의 프롬프트 템플릿을 만들어보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="bg-amber-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>프롬프트</strong> = AI에게 명령하는 코드 → 구체적일수록 정확한 결과
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              네 가지 핵심: <strong>역할 · 맥락 · 지시 · 형식</strong>
            </p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-5 space-y-2">
          <p className="text-lg text-gray-700">✅ 모호한 프롬프트 → 엉뚱한 결과</p>
          <p className="text-lg text-gray-700">✅ 구체적 프롬프트 → 정확한 결과</p>
          <p className="text-lg text-gray-700">✅ Agent의 도구 설명도 프롬프트 원리와 동일</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-yellow-50",
    script: "오늘 강의를 마치겠습니다. AI에게 제대로 일을 시키는 주문서 쓰는 법을 이해하셨을 것입니다. 다음 시간에는 직접 나쁜 프롬프트와 좋은 프롬프트를 비교하고, 나만의 프롬프트 템플릿을 만들어보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 나쁜 vs 좋은 프롬프트 비교 실험</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function PromptGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
