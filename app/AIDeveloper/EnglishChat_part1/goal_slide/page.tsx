"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-sky-50 to-blue-50",
    script: `안녕하세요, 여러분. 오늘 강의의 주제는 '대화를 기억하는 AI 영어 선생님 만들기'입니다. 지금까지 우리가 만든 챗봇은 한 번 질문하면 한 번 답하고 끝나는 구조였습니다. 하지만 진짜 대화는 이전에 한 이야기를 기억하면서 자연스럽게 이어져야 합니다. 오늘은 AI가 대화의 맥락을 기억하게 만드는 핵심 원리인 '대화 히스토리'와, AI에게 역할을 부여하는 '페르소나' 개념을 학습하겠습니다. 이 두 가지를 결합하면, 여러분만의 영어 회화 선생님을 만들 수 있습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐱💬</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          대화를 기억하는
          <br />
          <span className="text-blue-500">AI 영어 선생님</span> 만들기
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          대화 히스토리와 페르소나의 원리
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: `오늘 강의의 학습 목표를 확인하겠습니다. 첫째, AI가 '대화의 맥락을 기억'하게 하려면 무엇이 필요한지 이해합니다. 둘째, 영어 대화 상대 역할, 즉 '페르소나'를 부여하는 방법을 학습합니다. 셋째, 이전 대화를 기억하며 자연스럽게 이어가는 대화 앱의 핵심 원리를 설명할 수 있게 됩니다. 이 세 가지 목표를 오늘 강의가 끝나기 전에 달성하는 것이 핵심입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "AI가 '대화의 맥락을 기억'하게 하려면 무엇이 필요한지 이해한다" },
            { num: "2", text: "영어 대화 상대 역할(페르소나)을 부여하는 방법을 안다" },
            { num: "3", text: "이전 대화를 기억하며 이어가는 대화 앱의 핵심 원리를 설명할 수 있다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "AI는 사실 기억하지 못합니다",
    bg: "from-red-50 to-orange-50",
    script: `여러분에게 놀라운 사실을 하나 알려드리겠습니다. AI는 사실 이전 대화를 전혀 기억하지 못합니다. 방금 한 말도, 다음 요청이 들어오면 완전히 잊어버립니다. 그렇다면 어떻게 ChatGPT나 제미나이 같은 서비스에서 대화가 자연스럽게 이어지는 것일까요? 비밀은 바로 '수첩'에 있습니다. 우리가 AI에게 매번 '지금까지 나눈 대화를 적어둔 수첩'을 함께 건네주는 것입니다. AI는 그 수첩을 읽고, 흐름에 맞는 다음 말을 이어갑니다. 이 수첩을 프로그래밍에서는 '대화 히스토리(history)'라고 부릅니다. 즉, AI가 대화를 기억한다는 것은 사실 '매번 과거 대화를 다시 보내주는 것'과 같습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-800 font-semibold">
            AI는 이전 대화를 전혀 기억하지 못합니다!
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-lg font-semibold text-gray-800 mb-3">📒 수첩 비유</p>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">상황</th>
                  <th className="p-3 text-left">우리 코드</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t"><td className="p-3">매번 기억이 사라지는 사람</td><td className="p-3">이전 대화를 기억 못 하는 AI</td></tr>
                <tr className="border-t bg-gray-50"><td className="p-3">대화를 적은 수첩</td><td className="p-3">대화 히스토리(history)</td></tr>
                <tr className="border-t"><td className="p-3">수첩을 읽고 다음 말 이어가기</td><td className="p-3">과거 대화를 함께 보내 맥락 유지</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-lg text-orange-600 font-medium text-center">
          &ldquo;AI가 기억한다&rdquo; = &ldquo;매번 과거 대화를 다시 보내준다&rdquo;
        </p>
      </div>
    ),
  },
  {
    title: "한 번 질문 vs 대화 이어가기",
    bg: "from-blue-50 to-indigo-50",
    script: `지금까지 우리가 만든 챗봇과 오늘 만들 대화 앱의 차이를 비교해보겠습니다. 기존 챗봇은 질문 한 번에 답변 한 번으로 끝나는 구조였습니다. AI가 이전 대화를 전혀 기억하지 못하기 때문에, 마치 한 컷짜리 사진 같은 대화였습니다. 반면 오늘 만들 대화 앱은 여러 번 주고받으며 대화가 이어집니다. 수첩, 즉 히스토리로 이전 대화를 기억하고, 연속극처럼 흐름이 자연스럽게 이어집니다. 예를 들어, 여러분이 주말 이야기를 했다면 AI가 다음 대화에서 그 주말에 대해 다시 물어볼 수 있습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-gray-400">
            <p className="text-lg font-bold text-gray-700 mb-3">📸 지금까지의 챗봇</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 질문 한 번 → 답변 한 번으로 끝</li>
              <li>• AI가 이전 대화를 전혀 기억 못 함</li>
              <li>• 한 컷짜리 사진 같은 대화</li>
              <li>• 맥락이 이어지지 않음</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
            <p className="text-lg font-bold text-blue-700 mb-3">💬 오늘 만들 대화 앱</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 여러 번 주고받으며 대화가 이어짐</li>
              <li>• 수첩(히스토리)으로 이전 대화 기억</li>
              <li>• 연속극처럼 흐름이 자연스러움</li>
              <li>• 주말 이야기를 다음에 다시 물어봄</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "페르소나(Persona)란?",
    bg: "from-purple-50 to-violet-50",
    script: `수첩(히스토리)만 있으면 충분할까요? 아닙니다. AI에게 어떤 역할을 맡길지도 정해줘야 합니다. 이것을 '페르소나(persona)'라고 합니다. 페르소나는 AI에게 미리 건네는 '역할 설명서'입니다. 예를 들어, '너는 친절한 영어 회화 선생님이야'라고 알려주면, AI가 그 역할에 맞춰 대화합니다. 좋은 영어 선생님 페르소나에는 역할, 난이도, 실수 교정 여부, 한국어 설명 추가 여부 등을 포함시킵니다. 이런 조건을 구체적으로 넣을수록, 학습용으로 더 적합한 대화 상대가 됩니다. 이것은 이전에 배운 프롬프트 엔지니어링의 연장선입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            페르소나 = AI에게 미리 건네는 <strong>역할 설명서</strong>
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-lg font-semibold text-gray-800 mb-4">좋은 영어 선생님 페르소나에 담을 것</p>
          <div className="space-y-3">
            {[
              { label: "역할", desc: '"너는 친절한 영어 회화 선생님이야"' },
              { label: "난이도", desc: '"초급 학습자에게 쉬운 단어로 천천히 말해줘"' },
              { label: "교정", desc: '"학생이 실수하면 자연스럽게 고쳐줘"' },
              { label: "한국어", desc: '"답변 끝에 한국어로 짧은 설명을 덧붙여줘"' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-semibold shrink-0">{item.label}</span>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-base text-gray-500 text-center">
          조건을 구체적으로 넣을수록 학습에 적합한 대화 상대가 됩니다.
        </p>
      </div>
    ),
  },
  {
    title: "페르소나 코드 예시",
    bg: "from-violet-50 to-purple-50",
    script: `페르소나를 코드로 어떻게 설정하는지 살펴보겠습니다. 제미나이 API에서는 system_instruction이라는 매개변수에 페르소나를 문자열로 전달합니다. 화면의 코드를 보시면, system_instruction 변수에 '너는 친절한 영어 회화 선생님이야. 초급 학습자에게 쉬운 단어로 천천히 영어로 말해주고, 학생이 실수하면 자연스럽게 고쳐줘. 답변 끝에 한국어로 짧은 설명을 덧붙여줘'라고 적혀 있습니다. 이 한 줄이 AI의 전체 행동 방식을 결정합니다. generate_content를 호출할 때 config에 이 system_instruction을 포함시키면, AI는 매번 이 역할을 기억하고 대화합니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <CodeBlock>
          {`from google import genai
from google.genai import types

client = genai.Client(api_key="API 키")

system_instruction = "너는 친절한 영어 회화 선생님이야. \\
초급 학습자에게 쉬운 단어로 천천히 영어로 말해주고, \\
학생이 실수하면 자연스럽게 고쳐줘. \\
답변 끝에 한국어로 짧은 설명을 덧붙여줘."

response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Hello! Can we talk about my weekend?",
    config=types.GenerateContentConfig(
        system_instruction=system_instruction
    )
)
print(response.text)`}
        </CodeBlock>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 <strong>system_instruction</strong>에 페르소나를 적어두면, AI는 매번 그 역할에 맞춰 대화합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "수첩 + 페르소나 = 연속극",
    bg: "from-green-50 to-emerald-50",
    script: `이제 수첩(대화 히스토리)과 페르소나를 합치면 어떤 일이 생기는지 정리하겠습니다. 한 번 묻고 끝나는 대화는 한 컷짜리 사진과 같습니다. 하지만 대화 기록을 유지하면, 어제 본 드라마 내용을 기억하고 오늘 편을 보는 것처럼, 이전 이야기에 이어서 자연스럽게 대화가 흘러갑니다. 여기에 페르소나까지 더하면, AI가 '친절한 영어 선생님' 역할을 유지하면서, 여러분이 한 이야기를 기억하고 이어주는, 말 그대로 나만의 영어 대화 상대가 완성됩니다. 이것이 오늘 강의의 핵심 구조입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📒", label: "대화 히스토리", desc: "과거 대화를 매번 함께 전달" },
            { icon: "🧑‍🏫", label: "페르소나", desc: "역할, 난이도, 말투 설정" },
            { icon: "🎬", label: "연속극 대화", desc: "자연스럽게 이어지는 맥락" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 text-center">
              <span className="text-4xl">{item.icon}</span>
              <p className="text-lg font-semibold text-gray-800 mt-2">{item.label}</p>
              <p className="text-base text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-green-50 rounded-xl p-5 text-center">
          <p className="text-xl text-gray-700">
            <strong>히스토리 + 페르소나</strong> = 나만의 영어 대화 선생님 완성!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "자연스러운 대화 앱의 3요소",
    bg: "from-teal-50 to-cyan-50",
    script: `오늘 배운 내용을 세 가지 키워드로 정리하겠습니다. 첫째, 페르소나(system instruction)입니다. AI에게 어떤 역할을 맡길지 미리 정해주는 역할 설명서입니다. 둘째, 대화 히스토리입니다. 이전 대화를 매번 함께 보내주어 맥락을 유지하는 수첩입니다. 셋째, 맥락 유지입니다. 위 두 가지가 합쳐져서 연속극처럼 자연스럽게 이어지는 대화가 만들어집니다. 이 세 요소가 자연스러운 대화 앱의 핵심입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        {[
          { num: "1", title: "페르소나 (System Instruction)", desc: "AI에게 역할, 난이도, 말투를 미리 설정하는 역할 설명서", color: "bg-purple-500" },
          { num: "2", title: "대화 히스토리", desc: "이전 대화를 매번 함께 보내주어 맥락을 유지하는 수첩", color: "bg-blue-500" },
          { num: "3", title: "맥락 유지", desc: "위 두 가지가 합쳐져 연속극처럼 자연스럽게 이어지는 대화", color: "bg-green-500" },
        ].map((item) => (
          <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className={`${item.color} text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-lg`}>{item.num}</span>
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
    bg: "from-amber-50 to-yellow-50",
    script: `오늘 배운 내용을 점검해보겠습니다. 첫 번째 질문, AI가 대화를 '기억'하게 만들려면 실제로 무엇을 해야 합니까? 정답은, AI는 사실 이전 대화를 기억하지 못하므로, 매번 '지금까지 나눈 대화(대화 히스토리)'를 함께 보내줘야 한다는 것입니다. 두 번째, 페르소나(system instruction)는 무엇을 정해주는 것입니까? AI에게 어떤 역할을 맡길지 미리 알려주는 역할 설명서입니다. 세 번째, 자연스러운 대화 앱의 핵심 키워드 세 가지는? 페르소나, 대화 히스토리, 맥락 유지입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        {[
          { q: "AI가 대화를 '기억'하게 만들려면 실제로 무엇을 해야 합니까?", a: "매번 '지금까지 나눈 대화(히스토리)'를 함께 보내줘야 합니다." },
          { q: "페르소나(system instruction)는 무엇을 정해주는 것입니까?", a: "AI에게 어떤 역할을 맡길지 미리 알려주는 역할 설명서입니다." },
          { q: "자연스러운 대화 앱의 핵심 키워드 3가지는?", a: "페르소나, 대화 히스토리, 맥락 유지" },
        ].map((item, i) => (
          <div key={i} className="bg-white/70 rounded-xl p-5">
            <p className="text-lg font-semibold text-gray-800 mb-2">Q{i + 1}. {item.q}</p>
            <p className="text-base text-gray-600">→ {item.a}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 강의에서 다룬 내용을 정리하겠습니다. AI는 사실 이전 대화를 기억하지 못하며, '대화를 기억한다'는 것은 매번 과거 대화(히스토리)를 함께 보내주는 것입니다. 페르소나를 설정하면 AI에게 영어 선생님 같은 특정 역할을 부여할 수 있습니다. 히스토리와 페르소나를 결합하면, 맥락이 유지되는 자연스러운 대화 앱을 만들 수 있습니다. 다음 시간 실습에서는 직접 페르소나를 설정하고, 대화를 여러 번 주고받는 코드를 완성해보겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="bg-red-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              AI는 기억 못 함 → <strong>히스토리(수첩)</strong>를 매번 함께 전달
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>페르소나</strong> = 역할 + 난이도 + 말투를 설정하는 역할 설명서
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>히스토리 + 페르소나</strong> = 맥락이 유지되는 자연스러운 대화
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-sky-50 to-blue-50",
    script: `오늘 개념 강의를 마치겠습니다. AI가 대화를 기억하는 원리와 페르소나 설정 방법을 이해하셨을 것입니다. 다음 시간에는 직접 페르소나를 설정하고, 제미나이의 chat 기능을 사용하여 대화를 여러 번 주고받는 영어 선생님을 코드로 완성해보겠습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 페르소나를 설정하고 대화 기능을 코드로 완성합니다</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function EnglishChat1GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
