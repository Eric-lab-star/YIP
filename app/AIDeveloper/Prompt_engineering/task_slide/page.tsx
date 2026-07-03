"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-amber-50 to-yellow-50",
    script: "안녕하세요, 여러분. 오늘은 지난 시간에 배운 프롬프트 엔지니어링 개념을 바탕으로 직접 실습을 진행하겠습니다. 같은 질문을 나쁜 프롬프트와 좋은 프롬프트로 각각 던져보고 결과를 비교합니다. 그 다음 나만의 프롬프트 템플릿을 만들고, 지난 시간 Agent에도 적용해보겠습니다. 약 25분에서 30분이 소요됩니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          <code className="text-amber-500">프롬프트</code> 실습
        </h1>
        <p className="text-2xl text-gray-500 mt-2">나쁜 vs 좋은 프롬프트 대결!</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, langchain-google-genai 패키지가 설치되어 있어야 합니다. 둘째, 지난 시간에 만든 LangChain Agent와 get_weather 코드가 필요합니다. 셋째, 역할, 맥락, 지시, 형식 네 가지 요소를 기억해두시기 바랍니다. 모든 준비가 확인되면 시작하겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "langchain-google-genai 패키지 설치 확인" },
            { icon: "🤖", text: "지난 시간 LangChain Agent + get_weather 코드" },
            { icon: "📝", text: "역할 / 맥락 / 지시 / 형식 네 가지 요소 메모" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "미션 1: 나쁜 vs 좋은 프롬프트 비교 (8~10분)",
    bg: "from-rose-50 to-orange-50",
    script: "첫 번째 미션입니다. 같은 주제인 여행 추천을 두고, 단순한 프롬프트와 네 가지 요소를 갖춘 프롬프트의 결과를 나란히 출력해서 비교해보겠습니다. 화면에 보이는 코드 템플릿에서 빈칸을 채워주시기 바랍니다. 첫 번째 빈칸은 역할, 두 번째는 맥락, 세 번째는 지시 조건, 네 번째는 형식입니다. 예를 들어 '친절한', '바다', '예산 20만 원', '표' 등을 넣을 수 있습니다. 두 결과를 비교하여 차이를 확인해보시기 바랍니다. 8분에서 10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 같은 주제를 나쁜/좋은 프롬프트로 비교합니다.</p>
        </div>
        <CodeBlock>
          {`from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    google_api_key="제미나이 API 키"
)

bad_prompt = "여행지 추천해줘"

good_prompt = f"""
너는 {____} 역할을 맡은 여행 전문가야.
{____}을(를) 좋아하는 사람에게,
{____} 조건에 맞는 국내 여행지 3곳을
{____} 형식으로 추천해줘.
"""

print("=== 나쁜 프롬프트 ===")
print(llm.invoke(bad_prompt).content)

print("=== 좋은 프롬프트 ===")
print(llm.invoke(good_prompt).content)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-base text-gray-600">
            빈칸 순서: <strong>역할 → 맥락 → 지시 → 형식</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-rose-50 to-pink-50",
    script: "미션 1의 핵심 포인트입니다. 같은 LLM에게 물어봐도, 프롬프트의 구체성에 따라 결과의 품질이 크게 달라집니다. 나쁜 프롬프트의 결과는 일반적이고 막연한 반면, 좋은 프롬프트의 결과는 구체적이고 원하는 형태로 정리되어 있습니다. 만약 나쁜 프롬프트의 결과가 의외로 괜찮게 나왔다면, 좋은 프롬프트에 예산, 인원수, 계절 등 더 구체적인 조건을 추가해서 다시 비교해보시기 바랍니다. 조건이 많아질수록 차이가 더 뚜렷하게 드러납니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="font-semibold text-red-700 mb-2">나쁜 프롬프트 결과</p>
            <p className="text-gray-600">일반적, 막연, 들쭉날쭉</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-semibold text-green-700 mb-2">좋은 프롬프트 결과</p>
            <p className="text-gray-600">구체적, 원하는 형태, 또렷함</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 조건을 더 추가할수록(예산, 인원, 계절) 차이가 뚜렷해집니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 여섯 가지 활용 + 제로샷 CoT (6~8분)",
    bg: "from-lime-50 to-green-50",
    script: "두 번째 미션입니다. 프롬프트만 바꿔서 AI에게 여러 가지 일을 시켜보겠습니다. 요약, 질문 답변, 분류 중에서 두세 개를 골라 llm.invoke로 돌려봅니다. 특히 질문 답변에서는 맥락 안에서만 답하게 하고, 맥락에 없는 것을 물으면 '잘 모르겠어'라고 답하는지 확인해봅니다. 그다음 제로샷 CoT의 마법을 확인합니다. 같은 계산 문제를 두 번 물어보되, 한 번은 그냥, 한 번은 '차근차근 생각해보자'를 붙여서 결과를 비교합니다. 이 한 문장만으로 계산이 더 정확해지는 것을 눈으로 확인해보시기 바랍니다. 6분에서 8분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 프롬프트만 바꿔 여러 일을 시키고, 제로샷 CoT를 체험합니다.</p>
        </div>
        <CodeBlock>
          {`# 요약 / 질문답변 / 분류 중 골라서 돌려보기
qa = """아래 맥락만 보고 답해줘. 확신이 없으면
"잘 모르겠어"라고만 답해.
맥락: OKT3는 처음에 생쥐에서 유래한 항체야.
질문: OKT3는 처음에 무엇에서 유래했어?"""
print(llm.invoke(qa).content)

# 제로샷 CoT — "차근차근 생각해보자"의 마법
problem = "사과 10개를 사서 2개, 2개를 주고 5개를 더 사서 1개를 먹었어. 남은 건?"
print(llm.invoke(problem).content)
print(llm.invoke(problem + "\\n차근차근 생각해보자.").content)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 &ldquo;차근차근 생각해보자&rdquo; 한 문장 → 계산이 더 정확해집니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-lime-50 to-emerald-50",
    script: "미션 2의 핵심 포인트입니다. 첫째, 프롬프트 하나만 바꾸면 요약, 질문 답변, 분류 같은 서로 다른 일을 모두 시킬 수 있습니다. 둘째, 질문 답변에서 '맥락 안에서만 답하고 모르면 잘 모르겠다고 답하라'는 조건을 넣으면, AI가 아무 말이나 지어내는 환각을 줄일 수 있습니다. 셋째, 어려운 계산이나 논리 문제는 '차근차근 생각해보자'라는 한 문장, 즉 제로샷 CoT만 붙여도 정확도가 올라갑니다. 예시를 몇 개 보여주는 Few-shot이나 푸는 과정까지 보여주는 CoT도 같은 원리로, AI에게 생각할 시간과 본보기를 주는 것입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-lg text-gray-700">프롬프트만 바꾸면 <strong>요약·질문답변·분류</strong>를 모두 처리</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">&ldquo;맥락 안에서만 답해&rdquo; → <strong>환각(hallucination) 감소</strong></p>
        </div>
        <div className="bg-lime-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">&ldquo;차근차근 생각해보자&rdquo; = <strong>제로샷 CoT</strong> → 추론 정확도 ↑</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 나만의 프롬프트 템플릿 (8~10분)",
    bg: "from-violet-50 to-purple-50",
    script: "세 번째 미션입니다. 미션 1의 빈칸을 나만의 답으로 바꿔서, 세상에 하나뿐인 프롬프트를 만들어보겠습니다. 역할에는 어떤 전문가인지, 맥락에는 어떤 사람을 위한 것인지, 지시에는 어떤 조건인지, 형식에는 어떤 모양으로 받고 싶은지를 적습니다. 네 가지 요소가 모두 들어가 있는지 확인하시기 바랍니다. 여행 외에 음식, 운동, 공부 등 다른 주제로 바꿔도 좋습니다. 옆 친구와 서로의 템플릿을 비교해보는 것도 추천합니다. 같은 틀인데도 답이 다양하게 나오는 것을 확인할 수 있습니다. 8분에서 10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 네 가지 요소를 활용한 나만의 프롬프트를 만듭니다.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">요소</th>
                <th className="p-4 text-left">내가 채울 내용</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["역할 (Role)", '"너는 ○○ 전문가야"'],
                ["맥락 (Context)", '"○○한 사람에게 / ○○ 상황에서"'],
                ["지시 (Instruction)", '"○○을 ○개, ○○ 조건으로"'],
                ["형식 (Format)", '"표 / 목록 / 이모지 포함 등으로"'],
              ].map(([elem, ex], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-semibold">{elem}</td>
                  <td className="p-4">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-lg text-orange-600 font-medium text-center">
          ✍️ 여행 외에 음식, 운동, 공부 등 다른 주제로도 만들어보세요!
        </p>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-violet-50 to-indigo-50",
    script: "미션 3의 핵심 포인트입니다. 프롬프트 템플릿의 힘은, 같은 구조에 다른 내용을 넣으면 완전히 다른 결과를 얻을 수 있다는 것입니다. 이것이 프롬프트 엔지니어링의 본질입니다. AI의 성능은 고정되어 있지만, 프롬프트를 어떻게 쓰느냐에 따라 결과의 품질을 크게 향상시킬 수 있습니다. 실무에서도 프롬프트 템플릿을 만들어두고, 상황에 맞게 변수만 바꿔서 사용하는 경우가 많습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            같은 구조 + 다른 내용 = 완전히 다른 결과
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            AI 성능은 고정 → <strong>프롬프트가 결과 품질을 결정</strong>
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 실무에서도 프롬프트 템플릿을 만들어두고 변수만 바꿔 사용합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4: Agent에 적용하기 (8~10분)",
    bg: "from-teal-50 to-cyan-50",
    script: "네 번째 미션입니다. 지난 시간에 만든 Agent에 오늘 배운 프롬프트 원리를 적용해보겠습니다. 두 가지를 수정합니다. 첫째, @tool 함수의 docstring을 더 구체적으로 수정합니다. 어떤 입력을 받고, 어떤 정보를 돌려주는지 명확하게 작성합니다. 둘째, Agent에게 던지는 질문에 역할, 맥락, 형식을 담습니다. 예를 들어 '너는 친절한 날씨 안내원이야. 서울의 오늘 날씨를 한 문장으로 알려줘'와 같이 작성합니다. 수정 전후의 결과를 pretty_print로 비교해보시기 바랍니다. 8분에서 10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> Agent의 docstring과 질문에 프롬프트 원리를 적용합니다.</p>
        </div>
        <CodeBlock>
          {`@tool
def get_weather(city: str) -> str:
    """____"""  # 구체적으로 수정!
    ...

agent = create_agent(llm, [get_weather])

# 역할/맥락/형식을 담은 질문
question = ____
result = agent.invoke({
    "messages": [{"role": "user", "content": question}]
})
print(result["messages"][-1].content)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• docstring: &ldquo;도시 이름을 입력받아 현재 온도와 날씨 상태를 알려준다&rdquo;</li>
            <li>• question: &ldquo;너는 친절한 날씨 안내원이야. 서울 날씨를 한 문장으로 알려줘&rdquo;</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4 해설",
    bg: "from-teal-50 to-emerald-50",
    script: "미션 4의 핵심 포인트입니다. docstring을 구체적으로 수정한 후, Agent가 도구를 더 정확하게 선택하는 것을 확인하셨을 것입니다. 도구의 설명문은 결국 Agent에게 보내는 프롬프트와 같습니다. 좋은 프롬프트의 원리, 즉 구체적이고 명확하게 쓰는 것이 도구 설명에도 그대로 적용됩니다. 또한 사용자 질문에도 역할과 형식을 추가하면, 최종 답변의 품질이 크게 향상됩니다. 프롬프트 엔지니어링의 원리는 AI와 소통하는 모든 곳에 적용됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>도구 설명문 = Agent에게 보내는 프롬프트</strong>
            </p>
            <p className="text-lg text-gray-600 mt-1">좋은 프롬프트 원리가 그대로 적용됩니다.</p>
          </div>
          <div className="bg-teal-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              프롬프트 엔지니어링은 <strong>AI와 소통하는 모든 곳</strong>에 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 실습을 정리하겠습니다. 미션 1에서는 나쁜 프롬프트와 좋은 프롬프트의 결과를 직접 비교했습니다. 미션 2에서는 프롬프트만 바꿔 요약, 질문 답변, 분류를 시키고, 제로샷 CoT의 마법까지 확인했습니다. 미션 3에서는 역할, 맥락, 지시, 형식을 활용한 나만의 프롬프트 템플릿을 만들었습니다. 미션 4에서는 그 원리를 LangChain Agent에 적용하여 도구 설명문과 질문을 개선했습니다. 같은 AI, 같은 도구인데도 프롬프트 하나만 바꿔도 결과가 확 달라진다는 것을 직접 확인하셨습니다. 이것이 바로 프롬프트 엔지니어링입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "나쁜 vs 좋은 프롬프트 결과 비교", color: "bg-rose-100" },
            { num: "2", text: "여섯 가지 활용 + 제로샷 CoT 체험", color: "bg-lime-100" },
            { num: "3", text: "역할·맥락·지시·형식 프롬프트 템플릿 제작", color: "bg-violet-100" },
            { num: "4", text: "LangChain Agent에 프롬프트 원리 적용", color: "bg-teal-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            같은 AI + 같은 도구 + <strong>다른 프롬프트</strong> = 완전히 다른 결과
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-yellow-50",
    script: "오늘 실습을 마치겠습니다. 프롬프트 하나의 차이로 AI의 결과가 크게 달라진다는 것을 직접 확인하셨습니다. 이 원리는 앞으로 여러분이 AI를 활용하는 모든 상황에서 적용됩니다. 다음 시간에는 RAG와 임베딩에 대해 배우겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <div className="text-xl text-gray-600 space-y-2 mt-4">
          <p>나쁜 vs 좋은 프롬프트 비교 ✅</p>
          <p>나만의 프롬프트 템플릿 제작 ✅</p>
          <p>Agent에 프롬프트 원리 적용 ✅</p>
        </div>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function PromptTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
