"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: "안녕하세요, 여러분. 오늘은 지난 시간에 배운 Streamlit 개념을 바탕으로 직접 실습을 진행하겠습니다. 지난 시간에 만든 API 코드를 Streamlit 화면에 연결하여, 실제로 사용할 수 있는 앱 두 개를 만들어보겠습니다. 미션 1에서 기본 환경을 확인하고, 미션 2에서 날씨 앱, 미션 3에서 채팅 앱을 완성합니다. 약 25분에서 30분이 소요됩니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          <code className="text-blue-500">Streamlit</code> 실습
        </h1>
        <p className="text-2xl text-gray-500 mt-2">나만의 앱 두 개 오픈하기!</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, streamlit 패키지가 설치되어 있어야 합니다. pip install streamlit 으로 설치하시기 바랍니다. 둘째, 지난 시간에 만든 날씨 API 코드와 제미나이 API 코드가 필요합니다. 셋째, 빈칸이 포함된 코드 템플릿 파일이 준비되어 있어야 합니다. 모든 준비가 확인되면 첫 번째 미션을 시작하겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "streamlit 패키지 설치 (pip install streamlit)" },
            { icon: "🌤️", text: "지난 시간 날씨 API / 제미나이 API 코드" },
            { icon: "📄", text: "빈칸 포함 코드 템플릿 (.py 파일)" },
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
    title: "미션 1: 기본 환경 확인 (5분)",
    bg: "from-cyan-50 to-blue-50",
    script: "첫 번째 미션입니다. 목표는 Streamlit이 정상적으로 설치되었는지, 화면이 제대로 나타나는지 확인하는 것입니다. 새 파일 app.py를 만들고 화면에 보이는 코드를 입력해주시기 바랍니다. 그 다음 터미널에서 streamlit run app.py를 실행합니다. 웹 브라우저가 자동으로 열리면서 제목과 글자가 나타나면 성공입니다. 만약 화면이 나타나지 않으면, 실행 명령어가 streamlit run인지, python이 아닌지 확인해주시기 바랍니다. 5분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> Streamlit 설치 확인 및 첫 화면 띄우기
          </p>
        </div>
        <CodeBlock>
          {`import streamlit as st

st.title("Hello, Streamlit! 🐱")
st.write("내 첫 번째 화면이 떴다냥!")`}
        </CodeBlock>
        <CodeBlock>{`streamlit run app.py`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 웹 브라우저가 자동으로 열렸는가?</li>
            <li>• 제목과 글자가 화면에 표시되는가?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-cyan-50 to-teal-50",
    script: "미션 1의 핵심 포인트를 정리하겠습니다. streamlit run 명령어로 실행하면, Streamlit이 내부적으로 웹 서버를 띄우고 브라우저를 자동으로 엽니다. 이것이 python 명령어로 실행하는 것과의 근본적인 차이입니다. python app.py로 실행하면 Streamlit 서버가 시작되지 않기 때문에 화면이 나타나지 않습니다. 앞으로 Streamlit 파일을 실행할 때는 반드시 streamlit run을 사용하시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>streamlit run</strong> → 웹 서버 시작 + 브라우저 자동 실행
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="text-lg text-gray-700">
              <strong>python app.py</strong> → Streamlit 서버가 시작되지 않음 → 화면 없음
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 날씨 정보 화면 만들기 (10~12분)",
    bg: "from-amber-50 to-yellow-50",
    script: "두 번째 미션입니다. 목표는 날씨 API를 Streamlit 화면에 연결하여, 도시 이름을 입력하고 버튼을 누르면 온도와 날씨가 표시되는 앱을 만드는 것입니다. 화면에 보이는 코드 템플릿에서 빈칸을 채워주시기 바랍니다. 첫 번째 빈칸에는 API 키를 담은 변수명이 들어갑니다. 두 번째 빈칸에는 온도 값을 가져오는 키가 들어갑니다. 영어로 온도라는 뜻의 단어입니다. 완성한 후 다양한 도시 이름으로 테스트해보시기 바랍니다. 10분에서 12분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 날씨 API를 Streamlit 화면에 연결합니다.
          </p>
        </div>
        <CodeBlock>
          {`import streamlit as st
import requests

st.title("오늘의 날씨 알리미")
city = st.text_input("도시 이름을 입력하세요 (예: Seoul)")

if st.button("날씨 확인하기"):
    weather_api_key = "본인의 API 키"
    url = f"https://api.openweathermap.org/..."
    #    ?q={city}&appid={____}&units=metric

    response = requests.get(url)
    data = response.json()

    temperature = data["main"]["___"]
    description = data["weather"][0]["description"]

    st.write(f"{city}의 현재 온도: {temperature}도")
    st.write(f"날씨 상태: {description}")`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 첫 번째 빈칸: API 키를 담은 변수 이름</li>
            <li>• 두 번째 빈칸: 영어로 &ldquo;온도&rdquo;를 뜻하는 키 🌡️</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-amber-50 to-orange-50",
    script: "미션 2의 핵심 포인트입니다. 이 미션에서 여러분은 두 가지 기술을 결합했습니다. 첫째, Streamlit의 st.text_input과 st.button으로 사용자 입력을 받았습니다. 둘째, requests 라이브러리로 외부 API를 호출하고 그 결과를 st.write로 화면에 출력했습니다. 이것이 바로 Streamlit의 실질적인 활용 방법입니다. 사용자 입력을 받아서 외부 데이터를 가져오고, 그 결과를 보기 좋게 화면에 표시하는 것입니다. 이 패턴은 앞으로 만들게 될 거의 모든 앱에서 반복적으로 사용됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              두 가지 기술의 결합:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-blue-700 mb-2">사용자 입력</p>
              <p className="text-gray-600">st.text_input + st.button</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">외부 데이터 연결</p>
              <p className="text-gray-600">requests + API → st.write로 출력</p>
            </div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-base text-gray-600">
              💡 이 패턴(입력 → API 호출 → 출력)은 앞으로 거의 모든 앱에서 반복됩니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 간단한 AI 채팅 앱 (10~13분)",
    bg: "from-violet-50 to-purple-50",
    script: "세 번째 미션입니다. 이번에는 제미나이 API를 Streamlit 화면에 연결하여, 질문을 입력하면 AI가 답해주는 미니 챗봇을 만들어보겠습니다. 미션 2를 완료한 분들만 진행하시면 됩니다. 화면의 코드 템플릿에서 prompt 변수에 들어갈 값을 직접 작성해주시기 바랍니다. 가장 간단하게는 user_input을 그대로 넣어도 되고, '쉽게 설명해줘' 같은 추가 지시를 붙여도 좋습니다. 오늘은 한 번의 질문과 답변에만 집중합니다. 대화 기록을 유지하는 챗봇은 이후 단계에서 다루겠습니다. 10분에서 13분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 제미나이 API를 연결한 미니 챗봇을 만듭니다.
          </p>
        </div>
        <CodeBlock>
          {`import streamlit as st
from google import genai

st.title("나만의 간단한 AI 챗봇")
client = genai.Client(api_key="제미나이 API 키")

user_input = st.text_input("질문을 입력하세요")

if st.button("질문하기"):
    prompt = ____  # user_input을 활용
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )
    st.write(response.text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-lg text-gray-600">
            💡 오늘은 <strong>한 번의 질문-답변</strong>에만 집중합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-violet-50 to-indigo-50",
    script: "미션 3의 핵심 포인트입니다. 여러분이 방금 만든 것은 AI API를 웹 인터페이스와 결합한 최소 단위의 챗봇입니다. 구조를 분석하면, 사용자 입력을 st.text_input으로 받고, 그 입력을 API에 전달하고, API의 응답을 st.write로 화면에 출력하는 것입니다. 미션 2의 날씨 앱과 구조가 동일합니다. 입력, API 호출, 출력이라는 동일한 패턴이 반복되는 것입니다. 이 패턴을 이해하면, 어떤 API든 Streamlit 화면에 연결할 수 있게 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-xl text-gray-700 text-center">
            날씨 앱과 챗봇의 구조가 동일합니다
          </p>
        </div>
        <div className="bg-white/60 rounded-xl p-5 space-y-3">
          <p className="text-lg text-gray-700">1. <strong>입력</strong> → st.text_input</p>
          <p className="text-lg text-gray-700">2. <strong>API 호출</strong> → requests / genai</p>
          <p className="text-lg text-gray-700">3. <strong>출력</strong> → st.write</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 이 패턴을 이해하면, 어떤 API든 Streamlit에 연결할 수 있습니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "보너스 미션 (선택)",
    bg: "from-emerald-50 to-green-50",
    script: "시간이 남는 분들을 위한 보너스 미션입니다. 첫째, 날씨 앱에 날씨 상태에 맞는 이모지를 함께 보여주는 기능을 추가해보시기 바랍니다. 예를 들어 맑음이면 태양, 비면 우산 이모지를 표시하는 것입니다. 둘째, 환율이나 랜덤 명언 같은 다른 무료 API를 Streamlit 화면에 연결해보시기 바랍니다. 셋째, st.write 대신 st.success나 st.warning 같은 함수로 화면을 꾸며보시기 바랍니다. 질문이 있으면 언제든지 손을 들어주시면 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">빠르게 끝낸 분들을 위한 보너스 활동입니다.</p>
        </div>
        <div className="space-y-4">
          {[
            { num: "1", text: "날씨 상태에 맞는 이모지(☀️🌧️❄️)를 함께 표시하기" },
            { num: "2", text: "다른 무료 API(환율, 명언 등)를 Streamlit에 연결하기" },
            { num: "3", text: "st.success(), st.warning() 등으로 화면 꾸미기" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
              <p className="text-lg text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 실습을 정리하겠습니다. 미션 1에서는 Streamlit 기본 환경을 확인하고 첫 화면을 띄웠습니다. 미션 2에서는 날씨 API를 Streamlit에 연결하여 날씨 정보 앱을 만들었습니다. 미션 3에서는 제미나이 API를 연결하여 간단한 AI 채팅 앱을 만들었습니다. 핵심 패턴은 '입력 → API 호출 → 출력'이며, 이 패턴은 어떤 API에든 동일하게 적용됩니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "Streamlit 기본 환경 확인 및 첫 화면", color: "bg-cyan-100" },
            { num: "2", text: "날씨 API 연결 — 날씨 정보 앱 완성", color: "bg-amber-100" },
            { num: "3", text: "제미나이 API 연결 — AI 채팅 앱 완성", color: "bg-violet-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            핵심 패턴: <strong>입력 → API 호출 → 출력</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-cyan-50 to-blue-50",
    script: "오늘 실습을 마치겠습니다. 처음으로 코드 결과를 웹 화면으로 전환하고, 사용자가 직접 사용할 수 있는 앱 두 개를 만들어보셨습니다. 다음 시간에는 LangChain을 활용하여 AI가 스스로 도구를 사용하는 에이전트를 만들어보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <div className="text-xl text-gray-600 space-y-2 mt-4">
          <p>Hello Streamlit 화면 띄우기 ✅</p>
          <p>날씨 정보 앱 만들기 ✅</p>
          <p>AI 채팅 앱 만들기 ✅</p>
        </div>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function StreamlitTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
