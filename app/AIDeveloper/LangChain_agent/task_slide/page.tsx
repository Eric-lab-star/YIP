"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-purple-50 to-indigo-50",
    script: "안녕하세요, 여러분. 오늘은 지난 시간에 배운 LangChain 개념을 바탕으로, 날씨 API를 LangChain Tool로 등록하고 제미나이 Agent가 스스로 도구를 호출하는 앱을 직접 만들어보겠습니다. 총 4가지 미션을 약 25분에서 30분에 걸쳐 수행합니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          <code className="text-purple-500">LangChain</code> 실습
        </h1>
        <p className="text-2xl text-gray-500 mt-2">스스로 날씨를 찾는 AI 만들기!</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, langchain과 langchain-google-genai 패키지가 설치되어 있어야 합니다. 둘째, 지난 시간에 만든 날씨 API 호출 함수 코드가 필요합니다. 셋째, 날씨 API 키와 제미나이 API 키가 준비되어 있어야 합니다. 모든 준비가 확인되면 시작하겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "langchain, langchain-google-genai 패키지 설치" },
            { icon: "🌤️", text: "지난 시간 날씨 API 호출 함수 코드" },
            { icon: "🔑", text: "날씨 API 키 + 제미나이 API 키" },
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
    title: "미션 1: 패키지 설치 확인 (5분)",
    bg: "from-cyan-50 to-blue-50",
    script: "첫 번째 미션입니다. LangChain 관련 패키지가 설치되어 있는지 확인합니다. 터미널에서 pip install langchain langchain-google-genai requests 명령어를 실행해주시기 바랍니다. 설치가 완료되면 import langchain을 실행하여 에러가 나지 않는지 확인합니다. ModuleNotFoundError가 발생하면 패키지가 설치되지 않은 것이므로 다시 설치하시기 바랍니다. 5분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> LangChain 패키지 설치를 확인합니다.</p>
        </div>
        <CodeBlock>{`pip install langchain langchain-google-genai requests`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 설치가 에러 없이 완료되었는가?</li>
            <li>• import langchain 실행 시 에러가 없는가?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-cyan-50 to-teal-50",
    script: "미션 1의 핵심 포인트입니다. AI 개발에서 가장 흔한 에러 원인 1순위가 패키지 미설치입니다. ModuleNotFoundError가 발생하면, 가장 먼저 해당 패키지가 설치되어 있는지 확인해야 합니다. 또한 여러 패키지를 한 번에 설치할 때는 패키지 이름 사이에 공백을 넣어 나열하면 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-700">
            AI 개발에서 <strong>에러 원인 1순위</strong> = 패키지 미설치
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-lg text-gray-700">
            ModuleNotFoundError → pip install로 해당 패키지 설치 확인
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 날씨 함수를 Tool로 만들기 (8~10분)",
    bg: "from-green-50 to-emerald-50",
    script: "두 번째 미션입니다. 지난 시간에 만든 날씨 API 호출 함수를 LangChain의 @tool 데코레이터로 감싸서 도구로 등록해보겠습니다. 화면에 보이는 코드 템플릿에서 빈칸을 채워주시기 바랍니다. 특히 함수의 설명문, 즉 docstring이 매우 중요합니다. Agent는 이 설명을 읽고 해당 도구를 언제 사용할지 판단합니다. 설명이 모호하면 Agent가 도구를 찾지 못하므로, 어떤 입력을 받고 어떤 정보를 돌려주는지 구체적으로 작성해야 합니다. 8분에서 10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 날씨 함수를 @tool로 감싸 LangChain 도구로 등록합니다.</p>
        </div>
        <CodeBlock>
          {`from langchain_core.tools import tool
import requests

@tool
def get_weather(city: str) -> str:
    """도시 이름을 입력받아 현재 날씨를 알려줍니다."""
    weather_api_key = "본인 API 키"
    url = f"https://api.openweathermap.org/..."
    #    ?q={city}&appid={____}&units=metric

    response = requests.get(url)
    data = response.json()

    temperature = data["main"]["___"]
    description = data["weather"][0]["description"]

    return f"{city}: {temperature}도, {description}"`}
        </CodeBlock>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-lg text-gray-700">
            <strong>중요:</strong> docstring을 구체적으로 작성해야 Agent가 도구를 올바르게 선택합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-green-50 to-teal-50",
    script: "미션 2의 핵심 포인트입니다. @tool 데코레이터는 일반 파이썬 함수를 LangChain이 인식할 수 있는 도구로 변환합니다. Agent는 함수의 docstring을 읽어서 이 도구가 무엇을 하는지 판단합니다. 따라서 docstring에는 '어떤 입력을 받고, 어떤 정보를 돌려주는지'를 명확하게 작성해야 합니다. '도시 이름을 입력받아 해당 도시의 현재 온도와 날씨 상태를 알려준다'와 같이 구체적으로 적는 것이 좋습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>@tool</strong> = 일반 함수를 LangChain 도구로 변환하는 데코레이터
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              Agent는 <strong>docstring(설명문)</strong>을 읽고 도구를 선택합니다.
              <br />→ 구체적으로 작성할수록 Agent가 정확하게 판단합니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: Agent 만들고 실행하기 (8~10분)",
    bg: "from-amber-50 to-yellow-50",
    script: "세 번째 미션입니다. 이제 제미나이 LLM과 방금 만든 Tool을 연결하여 Agent를 만들고, 질문을 던져보겠습니다. 화면의 코드에서 question 변수에 '오늘 서울 날씨 알려줘' 같은 문장을 넣고 실행해주시기 바랍니다. 실행 후 result의 messages를 pretty_print로 출력하면, Agent가 어떤 과정으로 생각하고 도구를 호출했는지 확인할 수 있습니다. 이 질문에 대해 도구가 필요한지 판단하고, 도구를 호출하고, 결과를 받아 최종 답을 작성하는 전체 과정이 표시됩니다. 8분에서 10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> LLM + Tool을 묶어 Agent를 만들고 실행합니다.</p>
        </div>
        <CodeBlock>
          {`from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    google_api_key="제미나이 API 키"
)

agent = create_agent(llm, [get_weather])

question = ____  # "오늘 서울 날씨 알려줘"
result = agent.invoke({
    "messages": [{"role": "user", "content": question}]
})

for message in result["messages"]:
    message.pretty_print()`}
        </CodeBlock>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 pretty_print()로 Agent의 사고 과정을 확인할 수 있습니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-amber-50 to-orange-50",
    script: "미션 3의 핵심 포인트입니다. create_agent 함수는 LLM과 도구 목록을 받아서 하나의 Agent를 만듭니다. Agent에게 질문을 던지면, 내부적으로 다음과 같은 과정이 일어납니다. 첫째, Agent가 질문을 분석합니다. 둘째, 등록된 도구 중 필요한 것이 있는지 판단합니다. 셋째, 필요한 도구를 호출합니다. 넷째, 도구의 결과를 바탕으로 최종 답변을 작성합니다. pretty_print로 messages를 출력하면 이 네 단계를 직접 확인할 수 있습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트: Agent의 내부 동작</p>
        <div className="space-y-3">
          {[
            { num: "1", text: "질문 분석", icon: "🔍" },
            { num: "2", text: "필요한 도구가 있는지 판단", icon: "🤔" },
            { num: "3", text: "도구 호출 및 결과 수집", icon: "🔧" },
            { num: "4", text: "최종 답변 작성", icon: "✍️" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-lg text-gray-700"><strong>{item.num}.</strong> {item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "미션 4: 다양한 질문으로 테스트 (5~7분)",
    bg: "from-rose-50 to-pink-50",
    script: "네 번째 미션입니다. 이번에는 여러 질문을 던져보면서 AI가 스스로 판단한다는 것을 직접 체감해보겠습니다. 날씨 관련 질문, 예를 들어 '부산 날씨 알려줘'를 던지면 Agent가 날씨 도구를 사용하는지 확인합니다. 그 다음 날씨와 무관한 질문, 예를 들어 '오늘 점심 메뉴 추천해줘'를 던지면 Agent가 도구를 사용하지 않고 바로 답하는지 확인합니다. 두 질문에서 messages 내용이 어떻게 다른지 비교해보시기 바랍니다. 날씨 질문에서만 도구를 호출했다면, 그것이 바로 Agent가 스스로 판단한 증거입니다. 5분에서 7분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> AI가 스스로 도구 사용을 판단하는 것을 확인합니다.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-semibold text-blue-700 mb-2">🌤️ 날씨 관련 질문</p>
            <p className="text-gray-600">&ldquo;부산 날씨 알려줘&rdquo;</p>
            <p className="text-sm text-gray-500 mt-1">→ 도구 사용 O</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="font-semibold text-orange-700 mb-2">🍱 무관한 질문</p>
            <p className="text-gray-600">&ldquo;점심 메뉴 추천해줘&rdquo;</p>
            <p className="text-sm text-gray-500 mt-1">→ 도구 사용 X</p>
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-lg text-gray-700 text-center">
            두 질문의 messages를 비교하면, <strong>Agent의 판단 과정</strong>이 보입니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4 해설",
    bg: "from-rose-50 to-red-50",
    script: "미션 4의 핵심 포인트입니다. Agent가 날씨 관련 질문에서는 도구를 사용하고, 무관한 질문에서는 사용하지 않았다면, 그것이 바로 AI가 스스로 판단했다는 증거입니다. 만약 날씨 관련 질문인데도 도구를 사용하지 않았다면, @tool 함수의 docstring이 너무 모호한 경우가 대부분입니다. '현재 날씨 정보를 도시별로 알려준다'와 같이 더 구체적으로 수정하시기 바랍니다. 이것은 다음 시간에 배울 프롬프트 엔지니어링과도 직결되는 내용입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              날씨 질문에서만 도구 호출 = <strong>Agent가 스스로 판단한 증거</strong>
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="text-lg text-gray-700">
              도구를 못 찾는다면? → docstring(설명문)을 더 구체적으로 수정
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-base text-gray-600">
              💡 이것은 다음 시간 &ldquo;프롬프트 엔지니어링&rdquo;과 직결됩니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 실습을 정리하겠습니다. 미션 1에서는 LangChain 패키지를 설치하고 확인했습니다. 미션 2에서는 날씨 함수를 @tool로 감싸 LangChain 도구로 등록했습니다. 미션 3에서는 LLM과 Tool을 묶어 Agent를 만들고 실행했습니다. 미션 4에서는 다양한 질문으로 Agent가 스스로 판단하는 것을 확인했습니다. 이제 우리 AI는 단순히 답만 하는 것이 아니라, 필요할 때 직접 정보를 찾아오는 든든한 팀원이 되었습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "LangChain 패키지 설치 확인", color: "bg-cyan-100" },
            { num: "2", text: "날씨 함수를 @tool로 도구 등록", color: "bg-green-100" },
            { num: "3", text: "LLM + Tool → Agent 생성 및 실행", color: "bg-amber-100" },
            { num: "4", text: "다양한 질문으로 Agent 판단력 확인", color: "bg-rose-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-purple-50 to-indigo-50",
    script: "오늘 실습을 마치겠습니다. LangChain으로 AI 에이전트를 만들고, 도구를 스스로 사용하는 순간을 직접 확인하셨습니다. 다음 시간에는 좋은 프롬프트 작성법을 배우고, Agent가 도구를 더 정확하게 사용하도록 개선해보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <div className="text-xl text-gray-600 space-y-2 mt-4">
          <p>패키지 설치 확인 ✅</p>
          <p>날씨 함수 → Tool 등록 ✅</p>
          <p>Agent 생성 및 실행 ✅</p>
          <p>Agent 판단력 테스트 ✅</p>
        </div>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function LangChainTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
