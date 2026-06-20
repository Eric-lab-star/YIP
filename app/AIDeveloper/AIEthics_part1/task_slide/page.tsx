"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: `안녕하세요, 여러분. 오늘은 AI의 환각을 직접 유도하여 관찰하고, 프롬프트와 RAG으로 환각을 줄이는 방법을 실험해보겠습니다. 마지막에는 친구들과 함께 '우리 앱에 어떤 안전장치를 넣을까'를 토론하는 시간도 가지겠습니다. 총 소요 시간은 약 25분에서 30분입니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          환각 실험실
          <br />
          AI에게 <span className="text-rose-500">안전벨트</span> 채우기
        </h1>
        <p className="text-2xl text-gray-500 mt-2">환각 유도 → 안전장치 실험 → 모둠 토론</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: `미션 시작 전 확인 사항입니다. google-genai 패키지와 API 키가 준비되어 있어야 합니다. 환각을 유도할 질문을 미리 생각해보시기 바랍니다. 존재하지 않는 책, 영화, 인물처럼 내가 직접 진짜인지 확인할 수 있는 주제가 좋습니다. 모둠 토론을 위한 질문지도 준비했습니다. 모든 준비가 확인되면 시작하겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "google-genai 패키지 설치 및 API 키 확인" },
            { icon: "🔍", text: "환각 유도용 질문 준비 (존재하지 않는 책/영화/인물 등)" },
            { icon: "💬", text: "모둠 토론용 질문지 확인" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-base text-gray-600">💡 좋은 실험 주제: 내가 직접 진짜인지 확인할 수 있는 것 (없는 책 제목, 가상의 인물 등)</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1: 환각 유도 실험 (8~10분)",
    bg: "from-red-50 to-rose-50",
    script: `첫 번째 미션입니다. AI에게 존재하지 않는 것에 대해 질문하여, 환각이 실제로 발생하는지 관찰합니다. 화면의 코드를 그대로 실행해보시기 바랍니다. 2024년에 출판된 '용감한 코딩 고양이의 모험'이라는 책의 줄거리를 물어보는 코드입니다. 이 책은 실제로 존재하지 않습니다. AI가 '그런 책은 모른다'고 답하는지, 아니면 줄거리를 그럴듯하게 지어내는지 관찰해보시기 바랍니다. 지어냈다면, 그 답이 얼마나 자연스럽고 자신만만한지 살펴보세요. 그것이 바로 환각입니다. 8분에서 10분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> AI에게 존재하지 않는 것을 질문하여 환각을 관찰합니다.</p>
        </div>
        <CodeBlock>
          {`from google import genai

client = genai.Client(api_key="API 키 입력")

# 환각을 유도하는 질문
hallucination_prompt = "2024년에 출판된 책 \\
'용감한 코딩 고양이의 모험'의 줄거리를 알려줘."

print("=== 안전장치 없는 답변 ===")
print(client.models.generate_content(
    model="gemini-3.5-flash",
    contents=hallucination_prompt
).text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">관찰 포인트</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• AI가 &ldquo;모른다&rdquo;고 답했는가, 아니면 줄거리를 지어냈는가?</li>
            <li>• 지어냈다면, 얼마나 자연스럽고 자신만만한가?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-red-50 to-orange-50",
    script: `미션 1의 핵심 포인트입니다. 대부분의 경우, AI는 존재하지 않는 책의 줄거리를 마치 읽어본 것처럼 자연스럽게 지어냅니다. 이것이 바로 환각입니다. AI는 '모른다'고 답하는 것보다 '그럴듯한 답을 생성하는 것'이 기본 동작 방식입니다. 그래서 안전장치 없이는 사실 여부와 관계없이 매끄러운 답변을 만들어냅니다. 이 실험을 통해 환각이 실제로 발생하는 것을 직접 확인하셨을 것입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">대부분 AI는 없는 책의 줄거리를 <strong>자연스럽게 지어냅니다</strong>.</p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="text-lg text-gray-700">AI의 기본 동작 = &ldquo;모른다&rdquo;보다 &ldquo;그럴듯한 답 생성&rdquo;</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-base text-gray-600">→ 안전장치가 없으면 사실 여부와 관계없이 매끄러운 답변 생성</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 프롬프트로 환각 줄이기 (8~10분)",
    bg: "from-green-50 to-emerald-50",
    script: `두 번째 미션입니다. 이번에는 같은 질문에 '모르면 모른다고 답하라'는 지시를 추가하여 답변이 어떻게 달라지는지 비교합니다. 화면의 코드에서 빈칸을 채워보시기 바랍니다. 빈칸에는 AI에게 주는 안전장치 지시문을 넣습니다. 예를 들어 '확실하지 않거나 사실인지 모르는 정보는 지어내지 말고, 확인할 수 없다고 답해줘'와 같은 문장입니다. 미션 1의 안전장치 없는 답변과 미션 2의 안전장치 있는 답변을 나란히 놓고 비교해보시기 바랍니다. 지시 한 줄을 넣었을 뿐인데 답이 달라지는 것을 확인할 수 있을 것입니다. 8분에서 10분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 안전장치 지시문을 추가하여 답변 변화를 비교합니다.</p>
        </div>
        <CodeBlock>
          {`# 환각을 줄이는 지시를 직접 추가해보세요
safe_prompt = f"""
{____}
질문: 2024년에 출판된 책 \\
'용감한 코딩 고양이의 모험'의 줄거리를 알려줘.
"""
# 힌트: "확실하지 않거나 사실인지 모르는 정보는
#        지어내지 말고, '확인할 수 없다'고 답해줘."

print("\\n=== 안전장치 있는 답변 ===")
print(client.models.generate_content(
    model="gemini-3.5-flash",
    contents=safe_prompt
).text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <p className="text-base text-gray-600 mt-2">빈칸에는 안전장치 지시문을 넣습니다. 예: &ldquo;확실하지 않은 정보는 지어내지 말고 확인할 수 없다고 답해줘&rdquo;</p>
        </div>
        <p className="text-lg text-green-600 font-medium">✍️ 미션 1과 미션 2의 답변을 나란히 비교해보세요!</p>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-green-50 to-teal-50",
    script: `미션 2의 핵심 포인트입니다. 프롬프트에 '모르면 모른다고 답하라'는 지시 한 줄을 추가하는 것만으로도 AI의 답변이 크게 달라집니다. 안전장치가 없을 때는 그럴듯한 줄거리를 지어냈지만, 안전장치를 넣으면 '해당 책을 확인할 수 없다'거나 '정확한 정보를 찾을 수 없다'고 답하는 경우가 많습니다. 물론 완벽하지는 않습니다. 안전장치를 넣어도 여전히 지어내는 경우가 있을 수 있습니다. 그래서 사용자의 검토가 항상 필요합니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              프롬프트 지시 <strong>한 줄</strong>만으로도 AI 답변이 크게 달라집니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4">
              <p className="font-semibold text-red-700 mb-2">안전장치 없이</p>
              <p className="text-gray-600">줄거리를 그럴듯하게 지어냄</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">안전장치 적용</p>
              <p className="text-gray-600">&ldquo;확인할 수 없다&rdquo;고 답하는 경우가 많음</p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-base text-gray-600">⚠️ 완벽하지는 않으므로, 사용자의 검토가 항상 필요합니다.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 모둠 토론 (8~10분)",
    bg: "from-indigo-50 to-violet-50",
    script: `세 번째 미션은 모둠 토론입니다. 코드를 잠시 내려놓고, 친구들과 함께 세 가지 주제를 토론해보시기 바랍니다. 첫째, 우리가 만든 수학 풀이 봇이 틀린 답을 내놓으면 어떤 문제가 생길까요? 둘째, 사용자에게 '이 답은 AI가 만든 것이라 틀릴 수 있다'는 점을 어떻게 알려주면 좋을까요? 셋째, 어떤 종류의 질문에는 AI 답변을 특히 더 조심해야 할까요? 예를 들어 의료, 법률, 안전 분야 같은 것입니다. 토론의 목적은 하나의 정답을 찾는 것이 아니라, 다양한 관점을 서로 나누는 것입니다. 8분에서 10분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 우리 앱에 넣을 안전장치를 모둠으로 토론합니다.</p>
        </div>
        <div className="space-y-4">
          {[
            "우리가 만든 수학 풀이 봇이 틀린 답을 내놓으면 어떤 문제가 생길까?",
            '사용자에게 "이 답은 AI가 만든 것이라 틀릴 수 있다"는 점을 어떻게 알려주면 좋을까?',
            "어떤 종류의 질문에는 AI 답변을 특히 더 조심해야 할까? (의료, 법률, 안전 등)",
          ].map((text, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
              <p className="text-lg text-gray-700">{text}</p>
            </div>
          ))}
        </div>
        <div className="bg-violet-50 rounded-xl p-4">
          <p className="text-base text-gray-600">💡 토론은 정답을 찾는 것이 아니라, 다양한 관점을 나누는 것이 목적입니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: '핵심 비유: "안전벨트를 채운 자동차"',
    bg: "from-amber-50 to-yellow-50",
    script: `오늘 실습을 비유로 정리하겠습니다. 자동차, 즉 AI는 매우 편리하지만 사고, 즉 환각이 날 수 있습니다. 그렇다고 차를 안 탈 수는 없습니다. 대신 우리는 안전벨트(검토 습관)와 신호등(안전장치)을 만듭니다. '모르면 모른다고 답하기'는 프롬프트 안전장치입니다. '참고 자료를 근거로 답하기'는 RAG입니다. 'AI 답변임을 표시하기'는 사용자에게 알려주는 것입니다. 이런 장치들이 AI를 안전하게 사용하기 위한 안전벨트입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-xl text-gray-700 mb-4">
            🚗 <strong>자동차(AI)</strong>에 <strong>안전벨트(검토)</strong>와 <strong>신호등(안전장치)</strong>을 달자!
          </p>
          <div className="space-y-3">
            <p className="text-lg text-gray-600">• 🪢 모르면 모른다고 답하기 (프롬프트 지시)</p>
            <p className="text-lg text-gray-600">• 📚 참고 자료를 근거로 답하기 (RAG)</p>
            <p className="text-lg text-gray-600">• 🏷️ AI 답변임을 표시하기 (사용자 알림)</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">이것이 AI를 <strong>안전하게 사용하기 위한 안전벨트</strong>입니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "자기 점검: 나의 안전장치 다짐",
    bg: "from-teal-50 to-cyan-50",
    script: `오늘의 마지막 활동입니다. 내가 만든 앱에 넣고 싶은 안전장치를 한 가지 적어보시기 바랍니다. 어떤 앱인지, 어떤 안전장치를 넣고 싶은지, 그리고 왜 그 안전장치가 필요한지를 생각해보세요. 2분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 내가 만든 앱에 넣고 싶은 안전장치를 한 가지 적어봅니다.</p>
        </div>
        <div className="bg-white/70 rounded-xl p-6 space-y-4">
          <p className="text-lg text-gray-700 font-semibold">[ 나의 안전장치 다짐 ]</p>
          <p className="text-base text-gray-600">내가 만든 앱: ___________________________</p>
          <p className="text-base text-gray-600">넣고 싶은 안전장치: ___________________________</p>
          <p className="text-base text-gray-600">이유: ___________________________</p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 실습에서 수행한 내용을 정리하겠습니다. 미션 1에서는 환각을 직접 유도하여 AI가 지어내는 모습을 관찰했습니다. 미션 2에서는 프롬프트에 안전장치를 넣어 답변이 달라지는 것을 비교했습니다. 미션 3에서는 우리 앱에 넣을 안전장치를 모둠으로 토론했습니다. AI라는 강력한 자동차를 안전하게 운전하는 첫 번째 수업을 마쳤습니다. 다음 시간에는 개인정보, 저작권, 공정성(편향) 같은 다른 사람을 배려하며 AI를 사용하는 법을 배워보겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "환각을 직접 유도하여 AI가 지어내는 모습 관찰", color: "bg-red-100" },
            { num: "2", text: "프롬프트 안전장치를 넣어 답변 변화 비교", color: "bg-green-100" },
            { num: "3", text: "우리 앱에 넣을 안전장치를 모둠 토론", color: "bg-indigo-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-5 text-center">
          <p className="text-lg text-gray-700">다음 시간: 개인정보, 저작권, 공정성(편향) 등 AI 윤리</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: `오늘 실습을 마치겠습니다. AI의 환각을 직접 경험하고, 안전장치의 효과를 확인하셨습니다. AI를 안전하게 사용하는 첫 번째 수업을 멋지게 마치셨습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">AI를 안전하게 사용하는 첫 번째 수업 완료! 🛡️</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function AIEthics1TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
