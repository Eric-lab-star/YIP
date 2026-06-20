"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: `안녕하세요, 여러분. 오늘 강의의 주제는 '믿을 수 있는 AI — 환각(hallucination)이란 무엇인가'입니다. 지금까지 우리는 수학 풀이 봇, 블로그 도우미, 영어 대화 앱 같은 멋진 것들을 AI로 만들어 보았습니다. 그런데 혹시 AI가 틀린 적은 없었습니까? 오늘은 AI가 왜 그럴듯하게 틀린 답을 하는지, 그리고 어떻게 하면 우리 앱을 더 믿을 수 있게 만들 수 있는지 배워보겠습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐱</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          믿을 수 있는 AI
          <br />
          <span className="text-rose-500">환각(Hallucination)</span>이란?
        </h1>
        <p className="text-2xl text-gray-500 mt-2">AI가 틀리는 이유와 안전하게 사용하는 법</p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: `오늘의 학습 목표를 확인하겠습니다. 첫째, AI의 환각(hallucination) 현상이 무엇인지 이해하고, 왜 발생하는지 설명할 수 있게 됩니다. 둘째, 우리가 만든 앱에서 AI를 더 믿을 수 있게 만드는 방법을 고민할 수 있게 됩니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.</p>
        <div className="space-y-4">
          {[
            { num: "1", text: "AI의 환각(hallucination)이 무엇인지 이해하고, 왜 발생하는지 설명할 수 있다" },
            { num: "2", text: "우리가 만든 앱에서 AI를 더 믿을 수 있게 만드는 방법을 고민할 수 있다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-rose-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "AI가 틀린 적이 있었습니까?",
    bg: "from-red-50 to-rose-50",
    script: `먼저 문제를 인식하는 것부터 시작하겠습니다. 지금까지 만든 앱들에게 질문했을 때, AI가 자신만만하게 말했는데 알고 보니 틀린 적이 있지 않았습니까? 더 무서운 점은, AI는 모르는 것도 전혀 머뭇거리지 않고 그럴듯하게 대답한다는 것입니다. 이렇게 AI가 모르는 것도 자신 있게 그럴듯하게 틀린 답을 만들어내는 현상을 '환각(hallucination)'이라고 부릅니다. 예를 들어, 이전에 다뤘던 '근처 식당 추천' 같은 경우를 떠올려보시기 바랍니다. AI가 실제로는 없는 식당을 진짜인 것처럼 추천했다면, 그것이 바로 환각입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-800 font-semibold">
            환각(Hallucination)이란?
          </p>
          <p className="text-lg text-gray-600 mt-2">
            AI가 사실이 아닌 정보를 마치 진짜인 것처럼 자연스럽고 자신 있게 만들어내는 현상
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="text-lg text-gray-700">
            <strong>핵심:</strong> AI는 거짓말을 하려는 것이 아닙니다.
          </p>
          <p className="text-lg text-gray-700">
            빈칸을 그럴듯한 말로 <strong>&ldquo;채워버리는&rdquo;</strong> 것입니다.
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-base text-gray-600">⚠️ 예: AI가 실제로 없는 식당을 진짜인 것처럼 추천하는 경우</p>
        </div>
      </div>
    ),
  },
  {
    title: "환각은 왜 생길까?",
    bg: "from-purple-50 to-violet-50",
    script: `환각이 왜 생기는지 이해하는 것이 오늘 강의의 핵심입니다. 우리는 AI가 사실을 검색해서 답한다고 생각하기 쉽습니다. 하지만 실제로 AI는 검색하는 것이 아닙니다. AI는 '이 말 다음에는 이런 말이 올 법하다'라는 방식으로, 다음에 올 그럴듯한 말을 한 글자 한 글자 생성하는 것입니다. 그래서 AI는 사실과 다른 내용도 아주 매끄럽게 만들어낼 수 있습니다. 문장이 자연스럽다고 해서 내용이 진짜인 것은 절대 아닙니다. 이 차이를 반드시 기억하시기 바랍니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">&ldquo;검색&rdquo;과 &ldquo;생성&rdquo;은 다릅니다</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-400">
            <p className="text-lg font-bold text-green-700 mb-3">🔎 우리의 착각 — &ldquo;검색&rdquo;</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 저장된 사실을 찾아온다</li>
              <li>• 없으면 &ldquo;없다&rdquo;고 답할 것 같다</li>
              <li>• 항상 정확할 것 같다</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
            <p className="text-lg font-bold text-purple-700 mb-3">✍️ 실제 — &ldquo;생성&rdquo;</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 그럴듯한 다음 말을 만들어낸다</li>
              <li>• 빈칸도 그럴듯하게 채워버린다</li>
              <li>• 매끄럽지만 틀릴 수 있다</li>
            </ul>
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700 font-medium">문장이 자연스럽다고 ≠ 내용이 진짜</p>
        </div>
      </div>
    ),
  },
  {
    title: "RAG과의 연결",
    bg: "from-blue-50 to-indigo-50",
    script: `여기서 이전에 배운 RAG과의 연결점을 짚어보겠습니다. 우리가 RAG, 즉 참고 자료를 함께 주는 방법을 배운 이유가 바로 환각 문제와 관련이 있습니다. AI에게 믿을 수 있는 참고 자료를 함께 쥐어주면, AI가 혼자서 지어내는 일이 줄어들기 때문에 환각이 상당히 줄어듭니다. 물론 RAG을 사용해도 환각이 완전히 사라지는 것은 아니지만, 근거 자료가 있으므로 답변의 신뢰도가 크게 향상됩니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
          <p className="text-xl text-gray-800 font-semibold">
            RAG을 배운 이유가 여기에 있습니다!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-5">
            <p className="font-semibold text-red-700 mb-2">RAG 없이</p>
            <p className="text-gray-600">AI가 혼자 지어내기 → 환각 발생 가능성 높음</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="font-semibold text-green-700 mb-2">RAG 적용</p>
            <p className="text-gray-600">참고 자료를 함께 전달 → 근거 기반 답변 → 환각 감소</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '핵심 비유: "아는 척을 잘하는 친구"',
    bg: "from-amber-50 to-yellow-50",
    script: `환각을 더 쉽게 이해하기 위해 비유를 들어보겠습니다. 환각은 마치 '모르는 것도 일단 자신 있게 대답하는 친구'와 같습니다. 그 친구는 거짓말을 하려는 것이 아니라, 빈칸을 그럴듯한 말로 채우는 데 익숙할 뿐입니다. 그래서 우리는 그 친구에게 이렇게 알려줘야 합니다. '추측하지 말고, 모르면 모른다고 해!'라고 말이지요. 또한 '이 자료를 보고 답해!'라고 근거를 쥐어주는 것도 좋은 방법입니다. AI를 똑똑하게 사용하는 사람은 AI의 답을 무조건 믿지 않고, 스스로 확인하는 습관을 가진 사람입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-xl text-gray-700 mb-4">
            환각 = <strong>모르는 것도 자신 있게 대답하는 친구</strong>
          </p>
          <div className="space-y-3">
            <p className="text-lg text-gray-600">• 거짓말이 아니라, 빈칸을 채우는 데 익숙할 뿐</p>
            <p className="text-lg text-gray-600">• 👉 &ldquo;추측하지 말고, 모르면 모른다고 해!&rdquo;</p>
            <p className="text-lg text-gray-600">• 👉 &ldquo;이 자료를 보고 답해!&rdquo; (근거를 쥐어주기)</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-400">
          <p className="text-lg text-gray-700">
            <strong>AI를 똑똑하게 쓰는 사람</strong> = AI 답을 무조건 믿지 않고, 스스로 확인하는 습관을 가진 사람
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "환각은 결함이 아닙니다",
    bg: "from-orange-50 to-red-50",
    script: `한 가지 중요한 점을 강조하겠습니다. 환각은 AI가 고장 나서 생기는 것이 아닙니다. AI가 작동하는 방식 자체에서 나오는 자연스러운 현상입니다. AI는 '다음에 올 그럴듯한 말'을 생성하도록 설계되어 있기 때문에, 사실 여부와 관계없이 매끄러운 문장을 만들어냅니다. 그래서 더더욱 사용자의 검토가 중요합니다. AI는 강력한 도구이지만, 마지막 판단은 언제나 사람의 몫이라는 것을 기억하시기 바랍니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-800 font-semibold">
            환각은 &ldquo;결함&rdquo;이 아니라 &ldquo;자연스러운 현상&rdquo;입니다
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="text-lg text-gray-700">
            AI는 &ldquo;다음에 올 그럴듯한 말&rdquo;을 생성하도록 설계되어 있습니다.
          </p>
          <p className="text-lg text-gray-700">
            사실 여부와 관계없이 매끄러운 문장을 만들어냅니다.
          </p>
          <p className="text-lg text-orange-600 font-medium">
            → 더더욱 <strong>사용자의 검토</strong>가 중요합니다.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">AI는 강력한 도구이지만, <strong>마지막 판단은 언제나 사람의 몫</strong>입니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "환각을 줄이는 방법",
    bg: "from-green-50 to-emerald-50",
    script: `환각을 줄이는 구체적인 방법을 세 가지로 정리하겠습니다. 첫째, 프롬프트에 '모르면 모른다고 답하라'는 지시를 추가합니다. 이것만으로도 AI가 지어내는 빈도가 상당히 줄어듭니다. 둘째, RAG을 활용하여 참고 자료를 근거로 답하게 합니다. 근거가 있으면 지어내는 대신 자료를 기반으로 답변합니다. 셋째, AI 답변임을 표시하여 사용자에게 검토가 필요하다는 점을 알려줍니다. 이 세 가지가 바로 AI를 안전하게 사용하기 위한 안전장치입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        {[
          { icon: "🪢", title: "프롬프트 안전장치", desc: "'모르면 모른다고 답하라'는 지시를 추가", color: "bg-blue-500" },
          { icon: "📚", title: "RAG 활용", desc: "참고 자료를 근거로 답하게 하여 지어내기 방지", color: "bg-green-500" },
          { icon: "🏷️", title: "AI 답변 표시", desc: "사용자에게 AI가 만든 답변이므로 검토 필요함을 알림", color: "bg-purple-500" },
        ].map((item, i) => (
          <div key={i} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className={`${item.color} text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 text-lg`}>{item.icon}</span>
            <div>
              <p className="text-lg font-semibold text-gray-800">{item.title}</p>
              <p className="text-base text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "퀴즈로 확인하기",
    bg: "from-indigo-50 to-blue-50",
    script: `오늘 배운 내용을 점검해보겠습니다. 첫 번째 질문, AI가 모르는 것도 자신 있게 틀린 답을 만들어내는 현상을 무엇이라고 합니까? 정답은 환각(hallucination)입니다. 두 번째, 환각은 왜 생깁니까? AI는 사실을 검색하는 것이 아니라 다음에 올 그럴듯한 말을 생성하는 방식이기 때문입니다. 세 번째, RAG이 환각을 줄이는 데 왜 도움이 됩니까? AI에게 믿을 수 있는 참고 자료를 함께 주면 혼자 지어내는 일이 줄어들기 때문입니다. 네 번째, AI를 똑똑하게 쓰는 사람의 가장 중요한 습관은? AI의 답을 무조건 믿지 않고 스스로 확인하는 습관입니다.`,
    content: (
      <div className="flex flex-col gap-4">
        {[
          { q: "AI가 그럴듯하게 틀린 답을 만들어내는 현상은?", a: "환각(hallucination)" },
          { q: "환각은 왜 생깁니까?", a: "AI는 '검색'이 아닌 '다음에 올 말을 생성'하는 방식이기 때문" },
          { q: "RAG이 환각을 줄이는 이유는?", a: "참고 자료를 함께 주면 혼자 지어내는 일이 줄어들기 때문" },
          { q: "AI를 똑똑하게 쓰는 가장 중요한 습관은?", a: "AI 답을 무조건 믿지 않고 스스로 확인하는 것" },
        ].map((item, i) => (
          <div key={i} className="bg-white/70 rounded-xl p-4">
            <p className="text-base font-semibold text-gray-800">Q{i + 1}. {item.q}</p>
            <p className="text-base text-gray-600 mt-1">→ {item.a}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 강의에서 다룬 핵심 키워드를 정리하겠습니다. 환각(hallucination)은 AI가 그럴듯하게 틀린 답을 만들어내는 현상입니다. 검토 습관은 AI 답을 무조건 믿지 않고 확인하는 것입니다. 안전장치는 '모르면 모른다고 답하라'와 같은 프롬프트 지시입니다. RAG의 가치는 참고 자료를 줘서 환각을 줄이는 것입니다. 다음 시간 실습에서는 직접 환각을 유도해보고, 안전장치를 적용하여 답변이 어떻게 달라지는지 실험해보겠습니다.`,
    content: (
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>환각</strong> — AI가 그럴듯하게 틀린 답을 만들어내는 현상</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>검토 습관</strong> — AI 답을 무조건 믿지 않고 확인하기</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>안전장치</strong> — &ldquo;모르면 모른다고 답하라&rdquo; 프롬프트 지시</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>RAG의 가치</strong> — 참고 자료를 줘서 환각 줄이기</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: `오늘 개념 강의를 마치겠습니다. AI도 틀릴 수 있다는 것을 이해하는 것은 AI를 더 잘 활용하기 위한 첫걸음입니다. 다음 시간 실습에서는 직접 환각을 유도하고, 프롬프트와 RAG으로 환각을 줄이는 방법을 실험해보겠습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 환각 실험과 안전장치 실습</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function AIEthics1GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
