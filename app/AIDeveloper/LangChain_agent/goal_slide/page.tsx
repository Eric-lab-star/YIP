"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-purple-50 to-indigo-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 'LangChain 에이전트'입니다. 지난 시간에 우리는 날씨 API에서 데이터를 가져와서 직접 프롬프트에 끼워 넣고, 그것을 제미나이에게 전달하는 방식으로 작업했습니다. 하지만 오늘은 AI가 스스로 '날씨를 확인해야겠다'고 판단하고 직접 API를 호출하게 만드는 방법을 배우겠습니다. 이것을 가능하게 해주는 것이 바로 LangChain입니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🧰</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          AI에게 도구를 쥐어주자!
          <br />
          <code className="text-purple-500">LangChain</code>이 뭐냥?
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          코딩냥과 함께하는 LangChain 에이전트 개념 강의
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "오늘 강의의 학습 목표를 확인하겠습니다. 첫째, LangChain이 무엇이고 왜 필요한지 이해합니다. 둘째, LLM, Tool, Agent 세 가지 핵심 개념을 구분할 수 있어야 합니다. 셋째, 지난 시간 '날씨 API에서 데이터를 가져와 프롬프트에 넣어주던 방식'과, 오늘 배울 'AI가 스스로 도구를 사용하는 방식'의 차이를 설명할 수 있어야 합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.</p>
        <div className="space-y-4">
          {[
            { num: "1", text: "LangChain이 무엇이고 왜 필요한지 설명할 수 있다" },
            { num: "2", text: "LLM, Tool, Agent 세 가지 핵심 개념을 구분할 수 있다" },
            { num: "3", text: "'메모 방식'과 '전화기 방식'의 차이를 이해한다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-purple-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "지난 시간: 메모를 건네주는 방식",
    bg: "from-blue-50 to-indigo-50",
    script: "지난 시간의 작업 방식을 복습하겠습니다. 우리는 먼저 사람이 직접 날씨 API를 호출하여 데이터를 가져왔습니다. 그 다음 사람이 그 데이터를 프롬프트 문자열에 끼워 넣었습니다. 마지막으로 제미나이는 우리가 만들어준 프롬프트만 읽고 답을 작성했습니다. 여기서 핵심은, 모든 판단과 준비를 사람이 했다는 것입니다. AI는 시키는 대로 답만 한 것입니다. 비유하자면, 비서에게 메모를 건네주고 그 메모만 보고 답하게 한 것과 같습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">지난 시간의 흐름을 정리하면 다음과 같습니다.</p>
        <div className="space-y-4">
          {[
            { num: "1", text: "사람이 날씨 API를 직접 호출", icon: "👤" },
            { num: "2", text: "사람이 받아온 데이터를 프롬프트에 끼워 넣음", icon: "📝" },
            { num: "3", text: "제미나이는 그 프롬프트만 읽고 답변", icon: "🤖" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-600">모든 <strong>판단과 준비를 사람</strong>이 했고, AI는 답만 했습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘: 전화기를 쥐어주는 방식",
    bg: "from-green-50 to-emerald-50",
    script: "오늘 배울 LangChain 방식은 근본적으로 다릅니다. 비서, 즉 AI에게 날씨를 확인할 수 있는 전화기, 즉 도구(Tool)를 직접 쥐어줍니다. 그러면 손님이 '오늘 서울 날씨에 맞는 옷 추천해줘'라고 물었을 때, 비서가 스스로 '날씨를 먼저 확인해야겠다'고 판단하고 전화기를 들어 날씨 API를 호출합니다. 그리고 그 결과를 바탕으로 최종 답변을 만들어줍니다. 핵심은 비서가 스스로 도구를 사용하게 되는 것입니다. 판단과 도구 사용을 AI에게 맡기는 것, 이것이 LangChain의 본질입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          {[
            { num: "1", text: "AI에게 날씨 도구(Tool)를 쥐어줌", icon: "📞" },
            { num: "2", text: "AI가 스스로 도구가 필요한지 판단", icon: "🤔" },
            { num: "3", text: "AI가 직접 도구를 호출해 정보 수집", icon: "🔧" },
            { num: "4", text: "그 결과로 AI가 최종 답을 완성", icon: "✅" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-lg text-green-700 font-medium">
            핵심: <strong>판단과 도구 사용을 AI에게 맡기는 것!</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "메모 방식 vs 전화기 방식",
    bg: "from-purple-50 to-pink-50",
    script: "두 방식을 표로 비교해보겠습니다. 메모 방식에서는 사람이 API를 호출하고, 사람이 데이터를 프롬프트에 넣고, AI는 받은 메모로만 답합니다. 판단은 전부 사람의 몫입니다. 반면 전화기, 즉 LangChain 방식에서는 AI에게 도구를 쥐어주고, AI가 스스로 도구의 필요성을 판단하며, AI가 직접 도구를 호출하여 정보를 수집합니다. 판단과 실행 모두 AI가 담당합니다. 이 차이가 바로 단순한 API 호출과 AI 에이전트의 근본적인 차이입니다.",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left"></th>
              <th className="p-4 text-left">메모 방식 📝</th>
              <th className="p-4 text-left">전화기 방식 📞</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              ["API 호출", "사람이 직접", "AI가 스스로"],
              ["데이터 처리", "사람이 프롬프트에 넣음", "AI가 도구로 수집"],
              ["판단 주체", "사람", "AI (Agent)"],
              ["AI 역할", "받은 메모로 답만 함", "판단 + 도구 사용 + 답변"],
              ["확장성", "새 API마다 코드 수정 필요", "도구 등록만 하면 자동 사용"],
            ].map(([label, old, lc], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-4 font-semibold">{label}</td>
                <td className="p-4">{old}</td>
                <td className="p-4">{lc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "LangChain의 3대 주역",
    bg: "from-indigo-50 to-blue-50",
    script: "LangChain을 이해하기 위해 반드시 알아야 할 세 가지 핵심 개념을 설명하겠습니다. 첫째, LLM입니다. 제미나이와 같은 대규모 언어 모델로, 생각하고 답을 만드는 두뇌 역할을 합니다. 둘째, Tool, 즉 도구입니다. 날씨 API처럼 LLM이 필요할 때 사용하는 외부 기능입니다. 셋째, Agent, 즉 에이전트입니다. 어떤 도구를 쓸지 스스로 판단하고, 도구를 호출하여 결과를 받은 뒤 최종 답을 만드는 지휘자 역할을 합니다. Agent가 가장 중요한 개념이며, 사용자의 질문을 보고 적절한 도구를 스스로 선택하고 호출한다는 점이 핵심입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">이름</th>
                <th className="p-4 text-left">역할</th>
                <th className="p-4 text-left">한마디로</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["LLM (제미나이)", "생각하고 답을 만드는 두뇌", "똑똑한 머리 🧠"],
                ["Tool (도구)", "필요할 때 사용하는 외부 기능", "손에 쥔 도구 🔧"],
                ["Agent (에이전트)", "도구 사용을 스스로 판단하는 지휘자", "결정하는 지휘자 🎯"],
              ].map(([name, role, short], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-semibold">{name}</td>
                  <td className="p-4">{role}</td>
                  <td className="p-4">{short}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-base text-gray-600">💡 Agent가 가장 핵심입니다. 사용자 질문을 보고 적절한 도구를 <strong>스스로 선택</strong>합니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "코드 구조 미리보기",
    bg: "from-teal-50 to-cyan-50",
    script: "LangChain으로 날씨 에이전트를 만드는 코드의 큰 구조를 살펴보겠습니다. 자세한 작성은 실습 시간에 직접 해볼 것이므로, 여기서는 전체적인 흐름만 파악하시면 됩니다. 코드는 네 단계로 구성됩니다. 첫째, 날씨 함수를 @tool 데코레이터로 감싸서 도구로 등록합니다. 둘째, 제미나이 LLM을 준비합니다. 셋째, LLM과 도구를 한 팀으로 묶어 Agent를 만듭니다. 넷째, 질문을 던지면 Agent가 스스로 판단하여 답합니다. 특히 @tool 함수의 설명문, 즉 docstring이 매우 중요합니다. Agent는 이 설명을 읽고 해당 도구를 언제 사용할지 판단하기 때문입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <CodeBlock>
          {`# 1) 날씨 함수를 @tool로 감싸 도구 등록
@tool
def get_weather(city: str) -> str:
    """도시의 현재 날씨 정보를 알려준다."""
    ...  # 날씨 API 호출

# 2) 제미나이 LLM 준비
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash")

# 3) Agent 만들기 (LLM + 도구를 한 팀으로)
agent = create_agent(llm, [get_weather])

# 4) 질문 → Agent가 스스로 판단해서 답함
result = agent.invoke({...})`}
        </CodeBlock>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-lg text-gray-700">
            <strong>중요:</strong> @tool 함수의 설명문(docstring)을 구체적으로 작성해야 Agent가 도구를 올바르게 선택합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "도구 확장의 가능성",
    bg: "from-emerald-50 to-green-50",
    script: "LangChain의 큰 장점 중 하나는 확장성입니다. 오늘은 날씨 도구 하나만 사용하지만, LangChain은 여러 도구를 동시에 연결할 수 있습니다. 예를 들어 날씨 도구 외에 환율 도구, 뉴스 도구, 계산기 도구를 추가로 등록할 수 있습니다. Agent는 사용자의 질문 내용에 따라 적절한 도구를 스스로 골라서 사용합니다. '서울 날씨 알려줘'라고 물으면 날씨 도구를 사용하고, '1달러가 몇 원이야'라고 물으면 환율 도구를 사용하는 것입니다. 도구를 추가하는 것은 기존 코드를 수정하는 것이 아니라, 새로운 도구 함수를 등록하기만 하면 됩니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">LangChain은 여러 도구를 동시에 연결할 수 있습니다.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "🌤️", name: "날씨" },
            { icon: "💱", name: "환율" },
            { icon: "📰", name: "뉴스" },
            { icon: "🧮", name: "계산기" },
          ].map((tool, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 text-center">
              <span className="text-4xl">{tool.icon}</span>
              <p className="text-lg text-gray-700 mt-2">{tool.name}</p>
            </div>
          ))}
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 새 도구를 추가할 때 기존 코드를 수정할 필요 없이, <strong>새 함수를 등록</strong>하기만 하면 됩니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의 내용을 정리하겠습니다. 첫째, LangChain은 AI에게 도구를 사용할 수 있는 능력과 판단력을 부여하는 프레임워크입니다. 둘째, 핵심 구성 요소는 LLM(두뇌), Tool(도구), Agent(지휘자) 세 가지입니다. 셋째, 지난 시간의 메모 방식은 사람이 모든 판단을 하고 AI는 답만 했지만, 오늘의 전화기 방식은 AI가 스스로 판단하고 도구를 사용합니다. 넷째, @tool 함수의 설명문이 Agent의 도구 선택에 결정적인 역할을 합니다. 다음 시간에는 직접 날씨 에이전트를 코드로 작성해보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>LangChain</strong> = AI에게 도구 사용 능력 + 판단력을 부여하는 프레임워크
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              핵심 구성: <strong>LLM(두뇌) + Tool(도구) + Agent(지휘자)</strong>
            </p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-5 space-y-2">
          <p className="text-lg text-gray-700">✅ 메모 방식: 사람이 판단, AI는 답만</p>
          <p className="text-lg text-gray-700">✅ 전화기 방식: AI가 스스로 판단 + 도구 사용</p>
          <p className="text-lg text-gray-700">✅ @tool 설명문이 Agent의 도구 선택을 좌우</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-purple-50 to-indigo-50",
    script: "오늘 강의를 마치겠습니다. AI에게 스스로 일할 수 있는 능력을 부여하는 개념을 이해하셨을 것입니다. 다음 시간에는 직접 날씨 에이전트를 만들고, 다양한 질문으로 AI가 스스로 도구를 사용하는 순간을 확인해보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 직접 날씨 에이전트를 만들어봅니다</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function LangChainGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
