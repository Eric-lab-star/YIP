"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-sky-50 to-blue-50",
    script: `안녕하세요, 여러분. 오늘은 지난 시간에 배운 대화 히스토리와 페르소나 개념을 바탕으로, 직접 영어 회화 선생님을 코드로 만들어보겠습니다. 총 3가지 미션을 약 25분에서 30분에 걸쳐 수행합니다. 먼저 환경을 준비하고, 페르소나를 설정해 한 번 대화해본 뒤, 대화를 기억하며 여러 번 주고받는 기능까지 완성하겠습니다. 질문이 있으면 언제든지 손을 들어주시기 바랍니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          영어 대화 앱 실습
          <br />
          <span className="text-blue-500">기억하는 선생님</span> 만들기
        </h1>
        <p className="text-2xl text-gray-500 mt-2">페르소나 설정 + 대화 히스토리 실습</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: `미션을 시작하기 전에 실습 환경을 확인하겠습니다. 첫째, google-genai 패키지가 설치되어 있어야 합니다. 둘째, 본인의 제미나이 API 키가 준비되어 있어야 합니다. 셋째, 대화 예시 시나리오를 미리 떠올려보시기 바랍니다. 자기소개, 취미, 여행 등 영어로 대화할 주제를 하나 정해두면 실습이 더 수월합니다. 모든 준비가 확인되면 첫 번째 미션을 시작하겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "google-genai 패키지가 설치되어 있는가?" },
            { icon: "🔑", text: "본인의 제미나이 API 키가 준비되어 있는가?" },
            { icon: "💬", text: "대화 시나리오를 떠올려보았는가? (자기소개, 취미, 여행 등)" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-base text-gray-700">⚠️ API 키는 비밀입니다. 코드를 공유할 때는 키를 반드시 가려주시기 바랍니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1: 환경 준비하기 (5분)",
    bg: "from-cyan-50 to-blue-50",
    script: `첫 번째 미션입니다. 제미나이를 사용할 준비가 되었는지 확인합니다. 터미널에서 pip install google-genai 명령어로 패키지를 설치하시기 바랍니다. 설치가 완료되면, 본인의 API 키가 정상적으로 작동하는지 간단한 테스트를 해보시기 바랍니다. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 제미나이 패키지 설치 및 API 키 동작 확인</p>
        </div>
        <CodeBlock>{`pip install google-genai`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• google-genai 패키지가 설치되었는가?</li>
            <li>• 본인의 제미나이 API 키를 확보했는가?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-cyan-50 to-teal-50",
    script: `미션 1의 핵심 포인트입니다. google-genai 패키지는 Google의 제미나이 AI 모델에 접근하기 위한 공식 라이브러리입니다. API 키는 여러분의 신원을 증명하는 열쇠와 같으므로, 코드를 공유하거나 제출할 때는 반드시 키를 삭제하거나 가려야 합니다. 이 환경 준비 단계는 모든 AI 앱 개발의 첫 번째 단계이며, 이전 수업에서도 동일한 과정을 거쳤습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="text-green-500 text-2xl">✅</span>
            <p className="text-xl text-gray-700">google-genai = 제미나이 AI에 접근하는 공식 라이브러리</p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="text-lg text-gray-700">⚠️ API 키는 비밀 열쇠입니다. 코드 공유 시 반드시 삭제하거나 가려주시기 바랍니다.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 페르소나 설정하고 대화하기 (10~12분)",
    bg: "from-violet-50 to-purple-50",
    script: `두 번째 미션입니다. AI에게 영어 선생님 역할, 즉 페르소나를 부여하고 한 번 대화를 나눠보겠습니다. 화면의 코드 템플릿에서 빈칸(밑줄 네 개)을 직접 채워보시기 바랍니다. system_instruction 변수에 페르소나 문자열을 넣으면 됩니다. 예시 주석을 참고하여, 역할, 난이도, 실수 교정, 한국어 설명 등의 조건을 자유롭게 작성해보시기 바랍니다. 완료하신 분들은 나만의 페르소나로 바꿔보세요. 중급 학습자용, 여행 영어 전문, 친구처럼 편한 말투 등 원하는 선생님을 디자인해보시기 바랍니다. 10분에서 12분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 페르소나를 설정하고 AI와 한 번 대화합니다.</p>
        </div>
        <CodeBlock>
          {`from google import genai
from google.genai import types

client = genai.Client(api_key="API 키 입력")

# 페르소나를 직접 작성해보세요
system_instruction = ____
# 예: "너는 친절한 영어 회화 선생님이야.
#      초급 학습자에게 쉬운 단어로 천천히 말해줘."

response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Hello! Can we talk about my weekend?",
    config=types.GenerateContentConfig(
        system_instruction=system_instruction
    )
)
print(response.text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <p className="text-base text-gray-600 mt-2">system_instruction = ____ 에는 페르소나 문자열을 넣습니다. 따옴표 안에 역할, 난이도, 교정 조건을 작성하세요.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-violet-50 to-indigo-50",
    script: `미션 2의 핵심 포인트입니다. system_instruction은 API 호출 시 AI의 전체 행동 방식을 결정하는 매우 중요한 매개변수입니다. 여기에 역할, 난이도, 말투 등을 구체적으로 명시할수록, AI가 그 조건에 맞는 응답을 생성합니다. 이것은 이전에 배운 프롬프트 엔지니어링의 실전 적용입니다. 하지만 현재 코드는 한 번 질문하고 한 번 답받는 구조입니다. 다음 미션에서 대화를 여러 번 이어가는 기능을 추가하겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>system_instruction</strong>은 AI의 전체 행동 방식을 결정하는 핵심 매개변수입니다.
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-lg text-gray-600">
              역할 + 난이도 + 말투를 구체적으로 → 더 적합한 응답 생성
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-base text-gray-600">
              💡 지금은 한 번 질문, 한 번 답변 구조입니다. 다음 미션에서 대화 이어가기를 추가합니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 대화 기록 유지하며 대화하기 (10~13분)",
    bg: "from-emerald-50 to-green-50",
    script: `세 번째 미션입니다. 이번에는 대화 히스토리, 즉 수첩을 유지하면서 여러 번 대화를 주고받아보겠습니다. 제미나이의 chat 기능을 사용하면 히스토리가 자동으로 관리됩니다. 화면의 코드 템플릿에서 빈칸을 채워보시기 바랍니다. response = ____ 부분에는 chat 객체로 메시지를 보내는 코드가 들어갑니다. chat.send_message 형태를 떠올려보시기 바랍니다. 안에는 user_input을 넣으면 됩니다. quit을 입력하면 대화가 종료됩니다. 영어로 자기소개를 한 뒤, 취미나 주말 이야기로 대화를 이어가보시기 바랍니다. AI가 앞에서 한 말을 기억하고 이어주는지 확인해보세요. 10분에서 13분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 대화 히스토리를 유지하면서 여러 번 대화를 주고받습니다.</p>
        </div>
        <CodeBlock>
          {`# chat 기능으로 히스토리 자동 관리
chat = client.chats.create(
    model="gemini-3.5-flash",
    config=types.GenerateContentConfig(
        system_instruction=system_instruction
    )
)

# 여러 번 대화 주고받기
while True:
    user_input = input("You: ")
    if user_input.lower() == "quit":
        break

    # 사용자 입력을 보내고 응답을 받으세요
    response = ____
    print("Teacher:", response.text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <p className="text-base text-gray-600 mt-2">response = ____ 에는 chat.send_message(user_input) 형태의 코드를 넣습니다.</p>
        </div>
        <p className="text-lg text-orange-600 font-medium">
          ✍️ 영어로 자기소개 후 취미, 주말 이야기로 이어가보세요. AI가 이전 말을 기억하는지 확인!
        </p>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-emerald-50 to-teal-50",
    script: `미션 3의 핵심 포인트를 정리하겠습니다. client.chats.create를 사용하면 대화 히스토리가 자동으로 관리됩니다. 내부적으로는 우리가 배운 원리 그대로, 매번 과거 대화를 함께 보내주는 것입니다. 수첩을 자동으로 들고 다녀주는 것과 같습니다. chat.send_message로 메시지를 보내면, 자동으로 이전 대화 내용이 함께 전달되어 AI가 맥락을 유지할 수 있습니다. 이것이 대화형 AI 앱의 핵심 구현 방식입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>client.chats.create</strong> = 히스토리가 자동으로 관리되는 대화 객체
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-lg text-gray-600">
              내부적으로는 &ldquo;과거 대화를 매번 함께 보내주는&rdquo; 원리와 동일합니다.
              <br />수첩을 자동으로 들고 다녀주는 것과 같습니다.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-base text-gray-600">
              💡 chat.send_message(user_input) → 이전 대화 + 새 메시지가 함께 전달됩니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "도전 미션 (선택)",
    bg: "from-rose-50 to-pink-50",
    script: `시간이 남는 분들을 위한 보너스 미션입니다. 첫째, 페르소나에 난이도 조건을 중급으로 변경해서 좀 더 어려운 단어로 대화하게 해보시기 바랍니다. 둘째, 선생님이 여러분의 실수를 교정해주도록 페르소나에 조건을 추가해보세요. 셋째, 답변 끝에 한국어 설명을 덧붙이도록 페르소나를 다듬어보세요. 넷째, 자기소개에서 취미, 여행으로 이어지는 시나리오를 정해 길게 대화를 이어가보세요. 이 미션들은 선택 사항이므로, 기본 미션을 완료한 분만 도전하시기 바랍니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">빠르게 끝낸 분들을 위한 보너스 미션입니다.</p>
        <div className="space-y-3">
          {[
            "페르소나에 난이도(중급) 조건을 넣어 더 어려운 대화 시도",
            "선생님이 실수를 교정해주도록 페르소나에 조건 추가",
            "답변 끝에 한국어 설명을 덧붙이도록 페르소나 다듬기",
            "시나리오를 정해(자기소개→취미→여행) 길게 대화 이어가기",
          ].map((text, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-start gap-3">
              <span className="bg-pink-500 text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</span>
              <p className="text-lg text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 실습에서 수행한 내용을 정리하겠습니다. 미션 1에서는 제미나이 환경을 준비했습니다. 미션 2에서는 페르소나를 설정해 영어 선생님 역할을 부여하고 한 번 대화했습니다. 미션 3에서는 대화 히스토리를 유지하며 여러 번 대화를 주고받았습니다. 이로써 여러분은 내 말을 기억해주는 나만의 영어 선생님을 완성한 것입니다. 다음 시간에는 이 선생님을 Streamlit 채팅 화면으로 옮기고, 표현 교정 기능까지 추가해보겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "제미나이 환경 준비 (패키지 + API 키)", color: "bg-cyan-100" },
            { num: "2", text: "페르소나 설정으로 영어 선생님 역할 부여", color: "bg-violet-100" },
            { num: "3", text: "대화 히스토리를 유지하며 여러 번 대화 주고받기", color: "bg-emerald-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-5 text-center">
          <p className="text-xl text-gray-700">나만의 <strong>영어 대화 선생님</strong> 완성!</p>
          <p className="text-base text-gray-500 mt-2">다음 시간: Streamlit 채팅 화면 + 표현 교정 기능</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-sky-50 to-blue-50",
    script: `오늘 실습을 마치겠습니다. 페르소나를 설정하고, 대화 히스토리를 유지하며 여러 번 대화를 주고받는 영어 선생님을 직접 만들어보셨습니다. 다음 시간에는 이 기능을 Streamlit 채팅 화면으로 옮기고, 영어 표현 교정 기능까지 추가하여 완성도 높은 앱을 만들어보겠습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">나만의 기억하는 영어 선생님 완성! ✅</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function EnglishChat1TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
