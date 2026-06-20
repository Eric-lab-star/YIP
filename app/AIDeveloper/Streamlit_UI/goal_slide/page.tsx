"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-cyan-50 to-blue-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 'Streamlit으로 화면 만들기'입니다. 지금까지 우리는 코드의 실행 결과를 터미널이나 노트북의 텍스트 출력으로만 확인해왔습니다. 하지만 오늘부터는 코드 결과를 버튼, 입력창, 제목이 있는 실제 웹 화면으로 전환하는 방법을 배우겠습니다. 이를 가능하게 해주는 도구가 바로 Streamlit입니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🖥️</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          화면이 뿅!
          <br />
          <code className="text-blue-500">Streamlit</code>이 뭐냥?
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          코딩냥과 함께하는 Streamlit 개념 강의
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "본격적인 내용에 앞서, 오늘 강의의 학습 목표를 확인하겠습니다. 첫째, Streamlit이 무엇인지 설명할 수 있어야 합니다. 둘째, Streamlit의 기본 함수인 텍스트 출력, 입력창, 버튼 사용법을 익힙니다. 셋째, 오늘 실습에서 만들게 될 두 가지 과제, 날씨 정보 화면과 간단한 채팅 앱의 구조를 이해합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "Streamlit이 무엇인지 설명할 수 있다" },
            { num: "2", text: "Streamlit의 기본 함수(텍스트, 입력창, 버튼)를 사용할 수 있다" },
            { num: "3", text: "날씨 정보 화면과 간단한 채팅 앱의 구조를 이해한다" },
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
    title: "Streamlit이란?",
    bg: "from-blue-50 to-indigo-50",
    script: "Streamlit은 파이썬 코드만으로 웹 화면을 만들 수 있는 프레임워크입니다. 지금까지 우리는 print 함수로 터미널에 텍스트만 출력했습니다. 하지만 Streamlit을 사용하면, 코드 몇 줄만 추가하면 제목, 입력창, 버튼이 있는 실제 웹 앱을 만들 수 있습니다. HTML이나 CSS 같은 웹 개발 지식이 전혀 필요하지 않다는 것이 가장 큰 장점입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>Streamlit</strong>은 파이썬 코드만으로
            <br />
            <strong>웹 화면(앱)</strong>을 만들 수 있는 프레임워크입니다.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: "🐍", title: "파이썬만으로 가능", desc: "HTML, CSS, JavaScript 지식이 필요 없음" },
            { icon: "⚡", title: "코드 몇 줄이면 완성", desc: "입력창, 버튼, 표 등을 간단한 함수 호출로 추가" },
            { icon: "🌐", title: "실제 웹 브라우저에서 동작", desc: "웹 브라우저가 자동으로 열리며 결과를 시각적으로 확인" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "비유: 주방과 테이블",
    bg: "from-amber-50 to-orange-50",
    script: "Streamlit의 역할을 식당에 비유하여 설명하겠습니다. 지금까지 우리는 주방, 즉 노트북이나 터미널에서 코드를 실행하고 그 결과를 주방 안에서만 확인했습니다. 손님, 즉 사용자에게 보여줄 수 있는 예쁜 그릇과 테이블이 없었던 겁니다. Streamlit은 바로 그 테이블 세팅을 담당합니다. 주방에서 만든 데이터를, 손님이 보기 좋은 화면에 자동으로 차려주는 역할입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">식당</th>
                <th className="p-4 text-left">우리 코드</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["주방에서 만든 요리", ".ipynb에서 실행한 코드 결과"],
                ["예쁜 그릇과 테이블 세팅", "Streamlit 화면 (글자, 입력창, 버튼)"],
                ["가게에 들어온 손님", "우리 앱을 쓰는 사용자"],
              ].map(([left, right], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-semibold">{left}</td>
                  <td className="p-4">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-lg text-orange-600 font-medium text-center">
          Streamlit = 주방의 요리를 손님 테이블에 예쁘게 차려주는 역할!
        </p>
      </div>
    ),
  },
  {
    title: "print() vs Streamlit 비교",
    bg: "from-purple-50 to-pink-50",
    script: "print 함수와 Streamlit의 차이를 비교해보겠습니다. print 함수를 사용하면 검은 화면, 즉 터미널에 글자만 출력됩니다. 개발자인 본인만 결과를 볼 수 있고, 입력창이나 버튼 같은 상호작용 요소는 없습니다. 반면 Streamlit을 사용하면 웹 브라우저에 화면이 출력됩니다. 누구나 클릭하고 입력하며 사용할 수 있고, 입력창, 버튼, 표 등을 손쉽게 추가할 수 있습니다. 같은 코드 결과라도 전달 방식이 완전히 달라지는 것입니다.",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left"></th>
              <th className="p-4 text-left">print() 📜</th>
              <th className="p-4 text-left">Streamlit 🖥️</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              ["출력 위치", "터미널 (검은 화면)", "웹 브라우저"],
              ["사용자", "개발자 본인만", "누구나 접근 가능"],
              ["상호작용", "없음", "입력창, 버튼, 표 등"],
              ["꾸미기", "어려움", "함수 호출만으로 가능"],
              ["결과물", "텍스트 출력", "실제 웹 앱"],
            ].map(([label, py, st], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-4 font-semibold">{label}</td>
                <td className="p-4">{py}</td>
                <td className="p-4">{st}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "설치하고 실행하기",
    bg: "from-cyan-50 to-teal-50",
    script: "Streamlit의 설치와 실행 방법을 설명하겠습니다. 설치는 터미널에서 pip install streamlit 명령어를 한 번만 입력하면 됩니다. 실행은 streamlit run 파일명.py 형식으로 합니다. 이 명령어를 실행하면 자동으로 웹 브라우저가 열리면서 우리가 만든 화면이 나타납니다. 주의할 점은, 일반적인 python 파일명.py로 실행하면 Streamlit 화면이 나타나지 않는다는 것입니다. 반드시 streamlit run 명령어를 사용해야 합니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">1. 설치 (처음 한 번만)</p>
            <CodeBlock>{`pip install streamlit`}</CodeBlock>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">2. 실행</p>
            <CodeBlock>{`streamlit run app.py`}</CodeBlock>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-lg text-gray-700">
            <strong>주의:</strong> python app.py 가 아닌{" "}
            <strong>streamlit run app.py</strong> 로 실행해야 합니다!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "핵심 함수 4가지",
    bg: "from-green-50 to-emerald-50",
    script: "Streamlit에서 반드시 알아야 할 핵심 함수 네 가지를 설명하겠습니다. 첫째, st.title은 큰 제목을 화면에 표시합니다. 둘째, st.write는 글자, 숫자, 표 등 거의 모든 것을 출력하는 만능 출력 함수입니다. 헷갈릴 때는 일단 st.write를 사용하시면 됩니다. 셋째, st.text_input은 사용자가 글자를 입력할 수 있는 입력창을 만듭니다. 넷째, st.button은 클릭 가능한 버튼을 만듭니다. if문과 함께 사용하여 버튼 클릭 시 실행할 코드를 지정할 수 있습니다. 이 네 가지만 알면 기본적인 화면을 만들 수 있습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">함수</th>
                <th className="p-4 text-left">하는 일</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ['st.title("제목")', "큰 제목을 화면에 표시"],
                ['st.write("내용")', "글자, 숫자, 표 등 거의 모든 것 출력 (만능!)"],
                ['st.text_input("안내문")', "사용자가 글자를 입력하는 입력창 생성"],
                ['st.button("버튼이름")', "클릭 가능한 버튼 생성"],
              ].map(([func, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-mono text-blue-600">{func}</td>
                  <td className="p-4">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "기본 코드 예시",
    bg: "from-blue-50 to-sky-50",
    script: "핵심 함수 네 가지를 활용한 기본 코드 예시를 보겠습니다. import streamlit as st로 시작하여, st.title로 제목을 표시하고, st.write로 안내 문구를 출력합니다. st.text_input으로 이름 입력창을 만들고, st.button으로 인사하기 버튼을 만듭니다. 버튼을 클릭하면 입력한 이름으로 인사 메시지가 출력됩니다. 이 코드를 실행하면 제목, 안내 글, 이름 입력창, 버튼이 있는 완전한 웹 화면이 나타납니다. 코드를 수정하고 저장하면 화면 오른쪽 위의 Rerun 버튼으로 새 화면을 다시 그릴 수 있습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <CodeBlock>
          {`import streamlit as st

st.title("나의 첫 Streamlit 앱")
st.write("안녕하세요! Streamlit으로 만든 화면입니다.")

name = st.text_input("이름을 입력하세요")
if st.button("인사하기"):
    st.write(f"{name}님, 반갑습니다!")`}
        </CodeBlock>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 코드 수정 후 저장하면, 화면 오른쪽 위의 <strong>Rerun</strong> 버튼으로 새 화면을 다시 그릴 수 있습니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 과제 안내",
    bg: "from-rose-50 to-orange-50",
    script: "오늘 실습에서 만들게 될 두 가지 과제를 안내하겠습니다. 과제 1은 날씨 정보 화면 만들기입니다. 지난 시간에 배운 날씨 API에서 받아온 정보를 Streamlit 화면에 보여주는 앱을 만듭니다. 도시 이름을 입력하고 버튼을 클릭하면 온도와 날씨가 화면에 출력됩니다. 과제 2는 간단한 AI 채팅 앱 만들기입니다. 사용자가 입력한 질문을 제미나이 API에 전달하고, AI의 답변을 화면에 보여주는 미니 챗봇을 만듭니다. 식당에 비유하면, 과제 1은 '오늘의 날씨 메뉴'를 제공하는 식당이고, 과제 2는 '무엇이든 물어보세요'에 즉석으로 답해주는 식당입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white/70 rounded-xl p-6 border-l-4 border-yellow-400">
            <p className="text-lg font-bold text-yellow-700 mb-2">과제 1: 날씨 정보 화면 🌤️</p>
            <p className="text-base text-gray-600">
              도시 이름 입력 → 버튼 클릭 → 온도와 날씨가 화면에 출력
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-6 border-l-4 border-purple-400">
            <p className="text-lg font-bold text-purple-700 mb-2">과제 2: AI 채팅 앱 💬</p>
            <p className="text-base text-gray-600">
              질문 입력 → 버튼 클릭 → 제미나이 API 답변이 화면에 출력
            </p>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-600">
            오늘 여러분은 작은 <strong>식당(앱) 두 곳</strong>을 동시에 오픈하게 됩니다! 🏪
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-green-50 to-teal-50",
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, Streamlit은 파이썬 코드만으로 웹 화면을 만들 수 있는 프레임워크입니다. 둘째, print 함수가 터미널에 텍스트를 출력하는 것이라면, Streamlit은 웹 브라우저에 상호작용 가능한 화면을 출력합니다. 셋째, 핵심 함수는 st.title, st.write, st.text_input, st.button 네 가지입니다. 넷째, 실행은 반드시 streamlit run 파일명.py로 해야 합니다. 다음 시간에는 이 개념을 바탕으로 날씨 앱과 채팅 앱을 직접 만들어보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>Streamlit</strong> = 파이썬 코드만으로 웹 화면을 만드는 프레임워크
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              핵심 함수: <strong>st.title, st.write, st.text_input, st.button</strong>
            </p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-5 space-y-2">
          <p className="text-lg text-gray-700">✅ print() → 터미널 텍스트 출력</p>
          <p className="text-lg text-gray-700">✅ Streamlit → 웹 브라우저 화면 출력</p>
          <p className="text-lg text-gray-700">✅ 실행: streamlit run 파일명.py</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-cyan-50 to-blue-50",
    script: "오늘 강의를 마치겠습니다. Streamlit이 무엇이고, 어떤 함수를 사용하며, 어떻게 실행하는지 이해하셨을 것입니다. 다음 시간에는 오늘 배운 개념을 바탕으로 날씨 정보 앱과 AI 채팅 앱을 직접 만들어보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">
          다음 시간: 날씨 앱과 채팅 앱을 직접 만들어봅니다
        </p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function StreamlitGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
