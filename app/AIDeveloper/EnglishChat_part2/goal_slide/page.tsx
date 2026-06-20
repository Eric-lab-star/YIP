"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-indigo-50 to-violet-50",
    script: `안녕하세요, 여러분. 오늘 강의의 주제는 '대화를 기억하는 채팅 화면 만들기'입니다. 지난 시간에 우리는 .ipynb에서 input() 함수로 영어 회화 선생님과 대화를 주고받는 기능을 만들었습니다. 오늘은 그 대화를 진짜 카카오톡 같은 채팅 화면으로 옮기고, 학생의 영어를 살짝 고쳐주는 교정 기능까지 추가하여 앱을 완성하겠습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">💬</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          대화를 기억하는
          <br />
          <span className="text-indigo-500">채팅 화면</span> 만들기
        </h1>
        <p className="text-2xl text-gray-500 mt-2">Streamlit 채팅 UI + 표현 교정 기능</p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: `오늘의 학습 목표를 확인하겠습니다. 첫째, Streamlit의 채팅 UI 기능인 st.chat_message와 st.chat_input을 이해합니다. 둘째, 세션 상태(st.session_state)가 왜 필요한지 설명할 수 있게 됩니다. 셋째, 지난 시간의 대화 기능을 채팅 화면으로 옮기고, 표현 교정 기능을 추가하여 앱을 완성합니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.</p>
        <div className="space-y-4">
          {[
            { num: "1", text: "Streamlit의 채팅 UI 기능(st.chat_message, st.chat_input)을 이해한다" },
            { num: "2", text: "세션 상태(st.session_state)가 왜 필요한지 설명할 수 있다" },
            { num: "3", text: "채팅 화면으로 대화를 옮기고, 표현 교정 기능을 추가하여 앱을 완성한다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-indigo-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "지난 시간 복습",
    bg: "from-blue-50 to-sky-50",
    script: `지난 시간에 무엇을 했는지 간단히 복습하겠습니다. 지난 시간에는 페르소나(친절한 영어 선생님)를 설정하고, 대화 기록을 유지하면서 영어로 이야기를 주고받았습니다. 하지만 그것은 .ipynb에서 input() 함수로만 동작하는 것이었습니다. 오늘은 이것을 실제 앱 화면으로 옮기겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-gray-400">
            <p className="text-lg font-bold text-gray-700 mb-3">지난 시간</p>
            <p className="text-base text-gray-600">페르소나 설정 + 대화 기록 유지 기능 완성</p>
            <p className="text-sm text-gray-500 mt-2">.ipynb의 input() 기반</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-5 border-l-4 border-indigo-400">
            <p className="text-lg font-bold text-indigo-700 mb-3">오늘</p>
            <p className="text-base text-gray-600">Streamlit 채팅 화면으로 옮기기 + 표현 교정 기능 추가</p>
            <p className="text-sm text-gray-500 mt-2">실제 웹 앱으로 완성</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "채팅 UI를 만드는 두 함수",
    bg: "from-cyan-50 to-blue-50",
    script: `Streamlit에는 카카오톡 같은 채팅 화면을 매우 쉽게 만들어주는 도구가 있습니다. 핵심 함수는 딱 두 개입니다. 첫째, st.chat_input은 화면 아래쪽에 채팅 입력창을 만들어줍니다. 둘째, st.chat_message는 말풍선을 만들어 그 안에 메시지를 보여줍니다. user를 지정하면 사용자 말풍선, assistant를 지정하면 AI 말풍선이 됩니다. 이 두 함수만 알면 채팅 화면의 기본 구조를 완성할 수 있습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">카카오톡 같은 채팅 화면을 만드는 핵심 함수 두 개</p>
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">함수</th>
                <th className="p-4 text-left">역할</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-white"><td className="p-4 font-mono text-blue-600">st.chat_input(&quot;안내문&quot;)</td><td className="p-4">화면 아래쪽에 채팅 입력창 생성</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-mono text-blue-600">st.chat_message(&quot;user&quot;)</td><td className="p-4">말풍선을 만들어 메시지 표시</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">💡 &ldquo;user&rdquo; = 사용자 말풍선, &ldquo;assistant&rdquo; = AI 말풍선</p>
        </div>
      </div>
    ),
  },
  {
    title: "세션 상태(session_state)가 필요한 이유",
    bg: "from-red-50 to-orange-50",
    script: `여기서 매우 중요한 개념을 하나 배워야 합니다. Streamlit 화면은 사용자가 새로 입력할 때마다 코드를 처음부터 다시 실행합니다. 이것은 Streamlit의 근본적인 작동 방식입니다. 따라서 일반 변수에 대화를 저장해두면, 새 입력이 들어올 때마다 변수가 초기화되어 이전 대화가 모두 사라집니다. 이 문제를 해결하는 것이 st.session_state입니다. session_state는 화면이 새로 그려져도 유지되는 데이터 저장소입니다. 비유하자면, 칠판 전체를 지우고 다시 그리더라도 한 켠에 있는 지워지지 않는 메모장에 대화 기록을 적어두는 것과 같습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-800 font-semibold">
            Streamlit은 입력마다 코드를 처음부터 다시 실행합니다!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-gray-400">
            <p className="text-lg font-bold text-gray-700 mb-3">🧽 보통 변수</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 입력마다 코드 재실행 → 변수 초기화</li>
              <li>• 대화 기록이 매번 사라짐</li>
              <li>• 대화가 끊기는 느낌</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-400">
            <p className="text-lg font-bold text-green-700 mb-3">🪧 session_state</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 화면 재실행에도 데이터 유지</li>
              <li>• 대화 기록을 차곡차곡 보존</li>
              <li>• 대화가 자연스럽게 이어짐</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "채팅 화면 기본 코드",
    bg: "from-teal-50 to-cyan-50",
    script: `채팅 화면의 기본 코드 구조를 살펴보겠습니다. 먼저 session_state에 messages라는 빈 리스트를 만들어둡니다. 이것이 대화 기록을 저장하는 공간입니다. 다음으로, for 반복문으로 session_state에 저장된 대화를 처음부터 끝까지 말풍선으로 다시 그려줍니다. 마지막으로, st.chat_input으로 하단 입력창을 만듭니다. 여기서 핵심은 if "messages" not in st.session_state 부분입니다. 이것은 칠판이 처음이면 빈 칸으로 준비해두겠다는 의미입니다. 그리고 for 반복문은 칠판에 적힌 대화를 매번 처음부터 다시 보여주는 역할을 합니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <CodeBlock>
          {`import streamlit as st

# 세션 상태에 대화 기록 저장소 만들기
if "messages" not in st.session_state:
    st.session_state.messages = []

# 지금까지의 대화를 화면에 다시 그리기
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

# 화면 아래쪽 채팅 입력창
user_input = st.chat_input("영어로 말해보세요")`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-2">
          <p className="text-base text-gray-600">• <strong>if 조건문</strong>: 처음 접속 시 빈 대화 기록 준비</p>
          <p className="text-base text-gray-600">• <strong>for 반복문</strong>: 저장된 대화를 매번 말풍선으로 다시 표시</p>
          <p className="text-base text-gray-600">• <strong>st.chat_input</strong>: 하단 채팅 입력창 생성</p>
        </div>
      </div>
    ),
  },
  {
    title: "표현 교정 기능",
    bg: "from-amber-50 to-yellow-50",
    script: `오늘 한 가지 기능을 더 추가하겠습니다. 학생이 입력한 영어 문장을 더 자연스럽게 고쳐주는 표현 교정 기능입니다. 이것이 어렵게 느껴질 수 있지만, 사실 이것도 프롬프트 한 줄로 만들 수 있습니다. AI에게 '이 문장을 더 자연스러운 영어로 고쳐주세요'라고 부탁하기만 하면 됩니다. 대화는 대화대로 이어가면서, 동시에 학생의 표현을 살짝 교정해주는 친절한 선생님이 완성됩니다. 교정 결과는 st.expander를 사용하여 접어둘 수 있어서, 대화 흐름을 방해하지 않습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            교정 기능 = 결국 <strong>프롬프트 한 줄</strong>입니다
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="font-semibold text-blue-700 mb-2">대화 기능</p>
            <p className="text-gray-600">페르소나 + 히스토리로 자연스러운 대화</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="font-semibold text-green-700 mb-2">교정 기능 (추가)</p>
            <p className="text-gray-600">&ldquo;이 문장을 더 자연스럽게 고쳐주세요&rdquo; 프롬프트</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-base text-gray-600">💡 st.expander로 교정 결과를 접어두면 대화 흐름이 끊기지 않습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "세 앱의 공통점",
    bg: "from-purple-50 to-pink-50",
    script: `오늘로 여러분은 블로그 작가, 수학 선생님에 이어 영어 회화 선생님까지 세 종류의 AI 앱을 모두 완성하게 됩니다. 각기 다른 앱이지만 사용한 도구는 비슷합니다. 프롬프트로 AI에게 역할을 부여하고, API로 AI와 통신하고, Streamlit으로 화면을 만들었습니다. 이 패턴을 이해하면, 앞으로 원하는 AI 앱을 스스로 설계할 수 있는 힘이 생깁니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">세 AI 앱에서 공통으로 사용한 기술</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "✏️", label: "프롬프트", desc: "AI에게 역할과 조건 부여" },
            { icon: "🔌", label: "API", desc: "AI와 코드로 통신" },
            { icon: "🖥️", label: "Streamlit", desc: "사용자 화면 구축" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 text-center">
              <span className="text-4xl">{item.icon}</span>
              <p className="text-lg font-semibold text-gray-800 mt-2">{item.label}</p>
              <p className="text-base text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">앱은 달라도 <strong>도구는 같습니다</strong>. 이 패턴으로 원하는 앱을 설계할 수 있습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 강의에서 다룬 내용을 정리하겠습니다. st.chat_input과 st.chat_message로 채팅 화면을 만들 수 있습니다. Streamlit은 입력마다 코드를 재실행하므로, st.session_state로 대화 기록을 보존해야 합니다. 표현 교정 기능도 결국 프롬프트 한 줄로 구현할 수 있습니다. 블로그, 수학 풀이, 영어 대화 세 앱 모두 프롬프트, API, Streamlit이라는 공통 도구를 사용합니다.`,
    content: (
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>st.chat_input + st.chat_message</strong> = 채팅 화면</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>st.session_state</strong> = 대화 기록 보존 (지워지지 않는 칠판)</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>표현 교정</strong> = 프롬프트 한 줄로 구현</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ <strong>공통 패턴</strong>: 프롬프트 + API + Streamlit</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-indigo-50 to-violet-50",
    script: `오늘 개념 강의를 마치겠습니다. Streamlit의 채팅 UI와 세션 상태, 그리고 표현 교정 기능의 원리를 이해하셨을 것입니다. 다음 시간 실습에서 직접 채팅 화면과 교정 기능을 코드로 완성해보겠습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 채팅 화면과 교정 기능을 코드로 완성합니다</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function EnglishChat2GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
