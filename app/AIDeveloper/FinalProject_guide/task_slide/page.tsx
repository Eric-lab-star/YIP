"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: "안녕하세요, 여러분. 오늘부터 10차시에 걸쳐 나만의 AI 앱을 차근차근 완성해나가겠습니다. 한 번에 다 하는 것이 아니라, 하루에 한두 미션씩 단계를 밟아가면 됩니다. 각 미션마다 구체적인 활동지가 있으니, 빈칸을 채워가며 진행해주시면 됩니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🏪</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          최종 프로젝트
          <br />
          <span className="text-orange-500">실습 미션</span>
        </h1>
        <p className="text-2xl text-gray-500 mt-2">10차시 동안의 여정을 단계별로</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "전체 미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, 1차시부터 22차시까지 만든 코드와 자료 모음이 필요합니다. 참고 템플릿으로 활용할 것입니다. 둘째, 활동지가 필요합니다. 기획서, 피드백 시트, 발표 시트, 회고 시트를 사용합니다. 셋째, streamlit, google-genai 등 그동안 사용하던 패키지 환경이 준비되어 있어야 합니다. 넷째, 발표 시 사용할 타이머를 준비해주시기 바랍니다. 1인당 5분 내외입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📁", text: "1~22차시 코드·자료 모음 (참고 템플릿)" },
            { icon: "📝", text: "활동지 (기획서 · 피드백 · 발표 · 회고 시트)" },
            { icon: "🐍", text: "streamlit, google-genai 등 패키지 환경" },
            { icon: "⏱️", text: "발표용 타이머 (1인 5분 내외)" },
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
    title: "미션 1: 아이디어 씨앗 고르기 (23차시)",
    bg: "from-green-50 to-emerald-50",
    script: "첫 번째 미션입니다. 평소에 불편했던 일이나 관심 있는 분야를 떠올리며, 주제 후보 3개를 적어보시기 바랍니다. 각 아이디어마다 어떤 AI 기능이 필요할지도 함께 메모해주시기 바랍니다. 화면에 보이는 브레인스토밍 시트의 빈칸을 채워보세요. 작성이 끝나면 짝과 아이디어를 공유하고, 가장 흥미로운 아이디어에 대해 피드백을 주고받습니다. 이번 미션의 목표는 주제 후보 3개를 적고, 다음 시간까지 주제 1개로 좁히는 것입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 주제 후보 3개를 적고, 짝 피드백 후 1개로 좁힙니다.
          </p>
        </div>
        <CodeBlock>
          {`1. 평소에 불편하거나 시간이 많이 걸리는 일은?
   -

2. 내가 관심 있는 분야/주제는?
   -

3. 아이디어 3가지:
   A: ________ (필요한 AI 기능: ________)
   B: ________ (필요한 AI 기능: ________)
   C: ________ (필요한 AI 기능: ________)

4. 짝의 피드백:
   가장 흥미로운 아이디어: ________
   이유: ________`}
        </CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 2: 기획서 = 설계도 완성 (24차시)",
    bg: "from-blue-50 to-indigo-50",
    script: "두 번째 미션입니다. 만들기 전에 무엇을, 어떻게 만들지 정리해두면 시간을 크게 아낄 수 있습니다. 14차시에서 블로그 글을 쓸 때 구조부터 만들었던 것을 기억하실 것입니다. 앱도 동일합니다. 화면에 보이는 기획서 빈칸을 채워, 내 앱의 설계도를 완성해주시기 바랍니다. 앱 이름, 한 줄 설명, 주요 사용자, 핵심 기능 1에서 3개, 사용할 기술 스택, 화면 구상, 예상되는 어려움과 대비책을 적습니다. 핵심 기능은 반드시 1에서 3개로 좁히시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 기획서를 작성하여 앱의 설계도를 완성합니다.
          </p>
        </div>
        <CodeBlock>
          {`■ 앱 이름:

■ 한 줄 설명 (이 앱은 ____ 을 위한 앱입니다):

■ 주요 사용자:

■ 핵심 기능 (1~3개, 우선순위 순):
  1.
  2.
  3.

■ 사용할 기술 스택:
  [ ] 제미나이 API   [ ] 이미지 인식/생성
  [ ] LangChain     [ ] RAG
  [ ] Streamlit     [ ] 기타:

■ 화면 구상 (간단한 스케치/설명):

■ 예상되는 어려움과 대비책:`}
        </CodeBlock>
      </div>
    ),
  },
  {
    title: "미션 3~5: 제작 단계 (25~27차시)",
    bg: "from-violet-50 to-purple-50",
    script: "세 번째부터 다섯 번째 미션은 제작 단계입니다. 25차시에는 대표 메뉴부터 시작합니다. 기획서의 핵심 기능 1개를 .ipynb에서 먼저 만듭니다. 프롬프트 작성, API 호출 등 가장 중요한 기능부터 구현합니다. 26차시에는 두 갈래 길 중 하나를 선택합니다. UI 연결이 필요한 분은 Streamlit 화면에 연결하고, 기능 확장이 필요한 분은 두 번째 기능 구현을 시작합니다. 27차시에는 만든 기능들을 하나의 앱으로 통합하고, 전체 흐름을 테스트하고, 발견한 오류를 수정합니다. 통합할 때 변수명 충돌이나 실행 순서 꼬임이 자주 발생하므로 주의하시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          {[
            { session: "25차시", title: "핵심 기능 구현", desc: "대표 메뉴 하나부터! 기획서의 핵심 기능 1개를 .ipynb에서 먼저 구현", icon: "🍳" },
            { session: "26차시", title: "UI 연결 또는 기능 확장", desc: "Streamlit 화면 연결 또는 두 번째 기능 구현 시작", icon: "🖥️" },
            { session: "27차시", title: "통합 및 디버깅", desc: "기능들을 하나의 앱으로 통합 + 전체 흐름 테스트", icon: "🔧" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-sm text-gray-500">{item.session}</p>
                <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-base text-gray-700">
            ⚠️ 통합 시 주의: 변수명 충돌, 실행 순서 꼬임. 에러 메시지를 끝까지 읽고, 작은 단위로 테스트!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 6: 동료 피드백 — 시식회 (28차시)",
    bg: "from-amber-50 to-yellow-50",
    script: "여섯 번째 미션, 중간 점검입니다. 정식으로 가게를 열기 전, 친구들에게 미리 맛을 보여주고 의견을 듣는 시식회입니다. 모둠을 돌며 서로의 앱을 직접 사용해본 뒤, 피드백 시트를 작성합니다. 피드백은 1-1-1 형식이 좋습니다. 좋은 점 1개, 개선점 1개, 질문 1개입니다. 피드백은 비판이 아니라 더 좋아지기 위한 발견이라는 것을 기억해주시기 바랍니다. 이번 미션의 목표는 가장 유용했던 피드백 1개를 골라, 남은 시간의 우선순위를 다시 정리하는 것입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 동료 피드백을 받고, 가장 유용한 피드백 1개를 선택하여 우선순위를 재정리합니다.
          </p>
        </div>
        <CodeBlock>
          {`■ 평가한 앱 이름:

■ 좋았던 점 (1개 이상):

■ 더 좋아지면 좋을 점 (1개 이상):

■ 궁금한 점/질문:

■ 받은 피드백 중 반영하고 싶은 것:`}
        </CodeBlock>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-base text-gray-700">
            💡 피드백 형식: <strong>1-1-1</strong> (좋은 점 1개 · 개선점 1개 · 질문 1개)
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 7~8: 마무리 및 발표 준비 (29~30차시)",
    bg: "from-teal-50 to-cyan-50",
    script: "일곱 번째 미션은 29차시, 피드백 반영 및 마무리 제작입니다. 우선순위가 높은 피드백부터 반영하여 기능을 보완합니다. 여러 입력값으로 최종 동작 테스트를 하고, 윤리 가이드라인 항목을 점검하고, 최종본을 저장 및 백업합니다. 여덟 번째 미션은 30차시, 발표 준비입니다. 발표 구성 시트를 채우고, 짝과 리허설까지 해봅니다. 발표는 문제 정의 30초, 제작 방법 1분, 시연 1에서 2분, 배운 점 1분 정도로 구성하면 됩니다. 시연 때 보여줄 입력값을 미리 정해두면 발표 중 당황할 일이 줄어듭니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-teal-400">
            <p className="text-sm text-gray-500">29차시</p>
            <p className="text-lg font-semibold text-gray-800 mb-2">마무리 제작 ✨</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>• 우선순위 높은 피드백 반영</li>
              <li>• 최종 동작 테스트</li>
              <li>• 윤리 가이드라인 점검</li>
              <li>• 최종본 저장/백업</li>
            </ul>
          </div>
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-blue-400">
            <p className="text-sm text-gray-500">30차시</p>
            <p className="text-lg font-semibold text-gray-800 mb-2">발표 준비 📣</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>• 발표 구성 시트 작성</li>
              <li>• 시연 입력값 미리 정하기</li>
              <li>• 짝과 리허설</li>
              <li>• 예상 질문과 답변 준비</li>
            </ul>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-base text-gray-700">
            💡 완벽하지 않아도 괜찮습니다. 발표는 과정을 보여주는 자리입니다!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 9: 발표하기 (31~32차시)",
    bg: "from-rose-50 to-pink-50",
    script: "아홉 번째 미션, 드디어 그동안 준비한 가게의 문을 여는 날입니다. 발표할 때는 준비한 네 가지, 문제, 방법, 시연, 배운 점 순서대로 차분하게 보여주시면 됩니다. 들을 때는 경청하고, 박수 쳐주고, 질문 1개씩 준비해주시기 바랍니다. 발표를 들으며 인상 깊었던 점을 메모해두면 회고에 도움이 됩니다. 떨려도 괜찮습니다. 여기까지 온 것만으로도 정말 대단한 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 문제 → 방법 → 시연 → 배운 점 순서로 발표합니다.
          </p>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-lg font-semibold text-gray-800 mb-3">🗣️ 발표할 때</p>
            <p className="text-base text-gray-600">문제 → 방법 → 시연 → 배운 점 순서대로 차분하게</p>
          </div>
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-lg font-semibold text-gray-800 mb-3">👂 들을 때</p>
            <p className="text-base text-gray-600">경청 + 박수 + 질문 1개씩 준비</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            떨려도 괜찮습니다. 여기까지 온 것만으로도 <strong>정말 대단합니다!</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "회고: 긴 여정 되돌아보기 (32차시 마무리)",
    bg: "from-indigo-50 to-violet-50",
    script: "마지막 활동, 회고입니다. 1차시부터 32차시까지, 정말 긴 길을 걸어왔습니다. .ipynb 파일 열기부터 시작해서 API, Streamlit, LangChain, 프롬프트 엔지니어링, RAG, 응용 앱, 윤리, 그리고 최종 프로젝트까지. 그 여정 전체를 자랑스러워해도 좋습니다. 화면에 보이는 최종 회고 시트를 채우며 나의 성장을 되돌아보시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 전체 여정을 되돌아보며 나의 성장을 기록합니다.
          </p>
        </div>
        <CodeBlock>
          {`■ 가장 기억에 남는 수업은? 왜?

■ 프로젝트에서 가장 잘한 부분은?

■ 더 시간이 있었다면 추가하고 싶은 기능은?

■ 앞으로 AI를 어떻게 활용하고 싶나요?

■ 선생님/친구들에게 하고 싶은 말:`}
        </CodeBlock>
      </div>
    ),
  },
  {
    title: "최종 제출 체크리스트",
    bg: "from-orange-50 to-red-50",
    script: "발표 전 최종 제출 체크리스트를 확인하겠습니다. 기획서를 작성하고 핵심 기능을 1에서 3개로 정했는지, 핵심 기능이 실제로 동작하는지, 동료 피드백을 받아 우선순위가 높은 부분을 반영했는지, AI 윤리 항목을 점검했는지, 최종본을 저장 및 백업했는지, 발표 구성 시트를 작성하고 시연 입력값을 정해뒀는지 확인해주시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            "기획서를 작성하고 핵심 기능을 1~3개로 정했다",
            "핵심 기능이 실제로 동작한다 (여러 입력값으로 테스트 완료)",
            "동료 피드백을 받아 우선순위가 높은 부분을 반영했다",
            "AI 윤리 항목을 점검했다",
            "최종본을 저장/백업했다",
            "발표 구성 시트를 작성하고, 시연 입력값을 정해뒀다",
          ].map((text, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-center gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <p className="text-lg text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: "모든 미션을 마치겠습니다. 처음 .ipynb 파일을 열었던 그 첫날부터 지금까지, 여러분은 정말 긴 여정을 걸어왔습니다. 그리고 마침내 나만의 작은 가게, 즉 AI 앱을 직접 차려냈습니다. 완벽하지 않아도 괜찮습니다. 스스로 기획하고, 만들고, 보완하고, 발표한 그 과정 전체가 여러분의 가장 큰 보물입니다. 정말 수고 많으셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">모든 여정을 마칩니다</h1>
        <div className="text-xl text-gray-600 space-y-2 mt-4">
          <p>.ipynb → API → Streamlit → LangChain</p>
          <p>→ 프롬프트 → RAG → 응용 앱 → 윤리</p>
          <p>→ <strong>나만의 AI 앱 완성!</strong></p>
        </div>
        <p className="text-2xl text-gray-500 mt-4">정말 수고 많으셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function FinalProjectTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
