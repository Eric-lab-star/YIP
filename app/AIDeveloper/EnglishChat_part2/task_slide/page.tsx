"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-indigo-50 to-violet-50",
    script: `안녕하세요, 여러분. 오늘은 지난 시간에 만든 페르소나 대화 코드를 Streamlit 채팅 화면으로 옮기는 실습을 진행하겠습니다. 미션 1에서 환경을 준비하고, 미션 2에서 채팅 화면을 만들고, 미션 3에서 표현 교정 기능을 추가합니다. 총 소요 시간은 약 25분에서 30분입니다. 질문이 있으면 언제든지 손을 들어주시기 바랍니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          영어 대화 앱 완성 실습
          <br />
          <span className="text-indigo-500">채팅 화면</span>과 <span className="text-green-500">교정 기능</span>
        </h1>
        <p className="text-2xl text-gray-500 mt-2">Streamlit UI + 표현 교정</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: `미션 시작 전 확인 사항입니다. streamlit과 google-genai 패키지가 설치되어 있어야 합니다. 지난 시간에 만든 페르소나 및 대화 코드를 참고할 수 있어야 합니다. 새 파일 app.py를 만들어 작업하겠습니다. 모든 준비가 확인되면 시작하겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "streamlit, google-genai 패키지 설치 확인" },
            { icon: "📄", text: "지난 시간 페르소나 / 대화 코드 참고 가능" },
            { icon: "🆕", text: "새 파일 app.py 생성 준비" },
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
    title: "미션 1: 환경 준비 (5분)",
    bg: "from-cyan-50 to-blue-50",
    script: `첫 번째 미션입니다. app.py 파일을 만들고, 페르소나가 적용된 기본 코드를 작성합니다. streamlit run app.py로 실행했을 때 '나의 영어 대화 선생님' 제목이 에러 없이 표시되면 성공입니다. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> app.py를 만들고 페르소나가 적용된 기본 코드를 작성합니다.</p>
        </div>
        <CodeBlock>
          {`import streamlit as st
from google import genai
from google.genai import types

client = genai.Client(api_key="API 키 입력")

st.title("나의 영어 대화 선생님")

system_instruction = "너는 친절한 영어 회화 선생님이야."
config = types.GenerateContentConfig(
    system_instruction=system_instruction
)`}
        </CodeBlock>
        <CodeBlock>{`streamlit run app.py`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 브라우저에 &ldquo;나의 영어 대화 선생님&rdquo; 제목이 보이는가?</li>
            <li>• 에러 없이 화면이 정상 표시되는가?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-cyan-50 to-teal-50",
    script: `미션 1의 핵심 포인트입니다. streamlit run 명령어로 .py 파일을 실행하면 웹 브라우저에 앱 화면이 자동으로 열립니다. st.title로 제목을 설정하고, GenerateContentConfig에 system_instruction을 포함시켜 페르소나를 미리 준비해둡니다. 이것이 이후 미션의 기반이 됩니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="text-green-500 text-2xl">✅</span>
            <p className="text-xl text-gray-700">streamlit run app.py → 브라우저에 앱 화면이 자동으로 열림</p>
          </div>
          <div className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="text-green-500 text-2xl">✅</span>
            <p className="text-xl text-gray-700">GenerateContentConfig에 system_instruction 포함 → 페르소나 준비 완료</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 채팅 화면 만들기 (12~15분)",
    bg: "from-violet-50 to-purple-50",
    script: `두 번째 미션입니다. 카카오톡 같은 채팅 화면을 만들어보겠습니다. st.chat_input, st.chat_message와 session_state를 사용하여 대화가 사라지지 않는 채팅 화면을 완성합니다. 화면의 코드 템플릿에서 빈칸을 채워보시기 바랍니다. content 빈칸에는 AI의 답변이 담긴 변수 ai_reply를 넣으면 됩니다. 완성 후 영어로 한 마디 입력하고, 여러 번 대화를 주고받아도 위쪽 대화가 사라지지 않고 쌓이는지 확인해보시기 바랍니다. 12분에서 15분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> session_state로 대화가 사라지지 않는 채팅 화면을 완성합니다.</p>
        </div>
        <CodeBlock>
          {`# 세션 상태에 대화 기록 저장소
if "messages" not in st.session_state:
    st.session_state.messages = []

# 대화를 화면에 다시 그리기
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

user_input = st.chat_input("영어로 말해보세요")

if user_input:
    st.session_state.messages.append(
        {"role": "user", "content": user_input}
    )
    with st.chat_message("user"):
        st.write(user_input)

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=user_input, config=config
    )
    ai_reply = response.text

    st.session_state.messages.append(
        {"role": "assistant", "content": ____}
    )
    with st.chat_message("assistant"):
        st.write(ai_reply)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <p className="text-base text-gray-600 mt-2">&ldquo;content&rdquo;: ____ 에는 AI 답변이 담긴 변수 ai_reply를 넣습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-violet-50 to-indigo-50",
    script: `미션 2의 핵심 포인트를 정리하겠습니다. session_state.messages 리스트에 사용자와 AI의 메시지를 계속 추가하고, 화면이 다시 그려질 때마다 이 리스트를 처음부터 끝까지 말풍선으로 표시합니다. 이것이 대화가 사라지지 않는 비결입니다. 궁금하신 분은 session_state 관련 코드를 잠시 삭제하고 실행해보시기 바랍니다. 새 메시지를 보낼 때마다 이전 대화가 사라지는 것을 직접 확인할 수 있습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              session_state.messages에 메시지 추가 → 화면 재실행 시 전체 말풍선 다시 표시
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-lg text-gray-600">
              💡 session_state 코드를 삭제하고 실행하면 대화가 매번 사라지는 것을 직접 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 표현 교정 기능 추가 (8~10분)",
    bg: "from-emerald-50 to-green-50",
    script: `세 번째 미션입니다. 미션 2를 완료한 분만 도전하셔도 좋습니다. 학생의 영어 문장을 더 자연스럽게 고쳐주는 교정 기능을 추가합니다. 교정 함수의 프롬프트에서 빈칸을 채워보시기 바랍니다. 빈칸에는 '고친 이유를 한국어로 짧게 설명해줘' 같은 추가 지시 문장을 넣습니다. 완성 후 일부러 어색한 영어 문장을 입력해보시기 바랍니다. 예를 들어 'I goes to school' 같은 문장을 입력하면, 선생님이 자연스럽게 고쳐주는 것을 확인할 수 있습니다. 8분에서 10분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 프롬프트 기반 영어 표현 교정 기능을 추가합니다.</p>
        </div>
        <CodeBlock>
          {`def correct_english(text):
    correction_prompt = f"""
    다음 영어 문장을 더 자연스러운 영어로 고쳐줘.
    {____}

    문장: {text}
    """
    return client.models.generate_content(
        model="gemini-3.5-flash",
        contents=correction_prompt,
        config=config
    ).text

# 채팅 코드에서 사용자 입력 직후에 호출
# correction = correct_english(user_input)
# with st.expander("표현 교정 보기"):
#     st.write(correction)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <p className="text-base text-gray-600 mt-2">빈칸에는 &ldquo;고친 이유를 한국어로 짧게 설명해줘&rdquo; 같은 추가 지시를 넣습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-emerald-50 to-teal-50",
    script: `미션 3의 핵심 포인트입니다. 교정 기능은 별도의 복잡한 로직이 아니라, 프롬프트 한 줄로 구현됩니다. AI에게 '이 문장을 고쳐달라'고 부탁하는 것과 같습니다. st.expander를 사용하면 교정 결과를 접어둘 수 있어서, 대화 흐름을 방해하지 않습니다. 보고 싶을 때만 펼쳐보면 됩니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">교정 기능 = <strong>프롬프트 한 줄</strong>로 구현. 복잡한 로직 불필요.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-lg text-gray-600">st.expander로 교정 결과를 접어두면 대화 흐름을 방해하지 않습니다.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "도전 미션 (선택)",
    bg: "from-rose-50 to-pink-50",
    script: `시간이 남는 분들을 위한 보너스 미션입니다. 첫째, 페르소나를 바꿔서 엄격한 선생님이나 유머러스한 친구 등 다른 성격의 선생님을 만들어보세요. 둘째, st.spinner를 사용하여 AI 응답을 기다리는 동안 '생각 중...' 표시를 띄워보세요. 셋째, 채팅 입력창 안내 문구를 더 친절하게 꾸며보세요. 이 미션들은 선택 사항입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">빠르게 끝낸 분들을 위한 보너스 미션입니다.</p>
        <div className="space-y-3">
          {[
            "페르소나를 바꿔서 다른 성격의 선생님 만들기",
            "st.spinner('생각 중...')으로 대기 표시 추가",
            "채팅 입력창 안내 문구를 더 친절하게 꾸미기",
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
    script: `오늘 실습에서 수행한 내용을 정리하겠습니다. 미션 1에서는 페르소나가 적용된 모델을 Streamlit 앱으로 준비했습니다. 미션 2에서는 session_state로 대화가 사라지지 않는 채팅 화면을 만들었습니다. 미션 3에서는 프롬프트로 영어 표현 교정 기능을 추가했습니다. 이로써 블로그 작가, 수학 선생님에 이어 영어 회화 선생님 앱까지, 세 종류의 AI 앱을 모두 완성하셨습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "페르소나 적용 모델을 Streamlit 앱으로 준비", color: "bg-cyan-100" },
            { num: "2", text: "session_state로 대화가 사라지지 않는 채팅 화면 완성", color: "bg-violet-100" },
            { num: "3", text: "프롬프트로 영어 표현 교정 기능 추가", color: "bg-emerald-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-5 text-center">
          <p className="text-xl text-gray-700">블로그 + 수학 + <strong>영어 대화</strong> = 세 AI 앱 완성!</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-indigo-50 to-violet-50",
    script: `오늘 실습을 마치겠습니다. Streamlit으로 채팅 화면을 만들고, 세션 상태로 대화를 보존하고, 프롬프트로 교정 기능까지 추가하셨습니다. 세 종류의 AI 앱을 모두 완성한 여러분을 축하합니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">세 종류의 AI 앱을 모두 완성했습니다! 🎊</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function EnglishChat2TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
