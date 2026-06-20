"use client";

import SlideShell, {
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: "안녕하세요, 여러분. 드디어 우리 여정의 마지막 무대, 최종 프로젝트 시간입니다. 지금까지는 선생님이 정해준 주제를 따라 만들었지만, 이제부터는 여러분이 직접 주제를 정하고, 내 손으로 처음부터 끝까지 완성해서, 친구들 앞에서 발표하는 시간입니다. 오늘 강의에서는 프로젝트의 전체 구조, 일정, 주제 선정 방법, 평가 기준을 안내하겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🏪</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          나만의 AI 앱 만들기
          <br />
          <span className="text-orange-500">최종 프로젝트 안내</span>
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          기획 · 제작 · 점검 · 발표
        </p>
      </div>
    ),
  },
  {
    title: "프로젝트 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "최종 프로젝트의 학습 목표를 확인하겠습니다. 첫째, 지금까지 배운 기술들, API, Streamlit, LangChain, 프롬프트 엔지니어링, RAG 등을 내 아이디어에 맞게 골라 활용할 수 있어야 합니다. 둘째, 작은 기획서를 직접 작성해서, 무엇을 어떻게 만들지 스스로 설계할 수 있어야 합니다. 셋째, 동료의 피드백을 받아 앱을 보완하고, 나만의 AI 앱을 완성하여 발표할 수 있어야 합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 프로젝트가 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "배운 기술(API · Streamlit · LangChain · 프롬프트 · RAG)을 내 아이디어에 맞게 골라 활용할 수 있다" },
            { num: "2", text: "작은 기획서를 직접 작성해, 무엇을 어떻게 만들지 스스로 설계할 수 있다" },
            { num: "3", text: "동료의 피드백을 받아 앱을 보완하고, 나만의 AI 앱을 완성·발표할 수 있다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-orange-400 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "핵심 비유: 나만의 작은 가게 차리기",
    bg: "from-green-50 to-emerald-50",
    script: "이번 프로젝트를 한마디로 설명하면 '나만의 작은 가게 차리기'입니다. 가게를 차리는 과정을 떠올리면 우리가 무엇을 할지 한눈에 보입니다. 어떤 손님을 위한 가게를 열까 정하는 것이 기획 단계, 직접 메뉴를 만드는 것이 제작 단계, 친구들에게 미리 맛보여주고 의견 듣는 것이 중간 점검 단계, 가게 문을 열고 손님 맞이하는 것이 발표 단계입니다. 지금까지는 선생님이 정해준 메뉴를 따라 만들었지만, 이제부터 여러분이 사장님입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700 text-center">
          프로젝트 = <strong>&ldquo;나만의 작은 가게 차리기&rdquo;</strong>
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">가게 차리기</th>
                <th className="p-4 text-left">우리 프로젝트</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["어떤 손님을 위한 가게를 열까 정하기", "기획 (주제 선정 · 기획서 작성)"],
                ["직접 메뉴를 만들기", "제작 (핵심 기능 → UI 연결 → 통합)"],
                ["친구들에게 미리 맛보여주고 의견 듣기", "중간 점검 (동료 피드백)"],
                ["가게 문을 열고 손님 맞이하기", "발표 (시연 + 회고)"],
              ].map(([shop, project], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4">{shop}</td>
                  <td className="p-4 font-semibold">{project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "전체 일정 한눈에 보기",
    bg: "from-blue-50 to-indigo-50",
    script: "프로젝트는 총 10차시, 23차시부터 32차시까지 진행됩니다. 차근차근 단계를 밟아가니 걱정할 필요 없습니다. 23차시와 24차시는 기획 단계입니다. 주제를 선정하고, 아이디어를 구체화하고, 기획서를 작성합니다. 25차시부터 27차시까지는 제작 단계입니다. 핵심 기능 구현, UI 연결, 기능 통합 및 디버깅을 진행합니다. 28차시는 중간 점검입니다. 동료 피드백을 받고 보완 계획을 세웁니다. 29차시는 피드백 반영 및 마무리 제작, 30차시는 발표 준비, 31차시와 32차시는 발표와 회고입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="overflow-x-auto">
          <table className="w-full text-base border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">차시</th>
                <th className="p-3 text-left">단계</th>
                <th className="p-3 text-left">핵심 활동</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["23", "기획 1", "주제 선정, 아이디어 구체화"],
                ["24", "기획 2", "기획서 작성, 기술 스택 선택"],
                ["25", "제작 1", "핵심 기능(프롬프트/API) 구현"],
                ["26", "제작 2", "기능 확장 또는 UI(Streamlit) 연결"],
                ["27", "제작 3", "기능 통합 및 디버깅"],
                ["28", "중간 점검", "동료 피드백 + 보완 계획 수립"],
                ["29", "제작 4", "피드백 반영 및 마무리 제작"],
                ["30", "발표 준비", "발표 자료(슬라이드/시연) 준비"],
                ["31~32", "발표 + 회고", "학생 발표 + 전체 회고"],
              ].map(([session, stage, activity], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 font-mono">{session}</td>
                  <td className="p-3 font-semibold">{stage}</td>
                  <td className="p-3">{activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "좋은 주제의 3가지 조건",
    bg: "from-teal-50 to-cyan-50",
    script: "이제 어떤 주제를 골라야 할지 알아보겠습니다. 좋은 프로젝트 주제는 딱 세 가지 조건을 만족하면 됩니다. 첫째, 내가 관심 있는 주제여야 합니다. 좋아하는 것을 만들어야 끝까지 즐겁게 할 수 있습니다. 둘째, 실제로 쓸모 있는 것이어야 합니다. 평소 불편했던 점을 해결해주는 앱이면 더 뿌듯합니다. 셋째, 배운 기술로 만들 수 있는 것이어야 합니다. 우리가 배운 도구, 즉 제미나이 API, Streamlit, LangChain, RAG 등으로 구현 가능한 범위여야 합니다. 이 세 가지가 겹치는 부분에서 아이디어를 찾으면 후회가 없을 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          {[
            { icon: "🙂", title: "내가 관심 있는 주제", desc: "좋아하는 것을 만들어야 끝까지 즐겁게 할 수 있습니다." },
            { icon: "🛠️", title: "실제로 쓸모 있는 것", desc: "평소 불편했던 점을 해결해주면 더 뿌듯합니다." },
            { icon: "🤖", title: "배운 기술로 만들 수 있는 것", desc: "API, Streamlit, LangChain, RAG 등으로 구현 가능한 범위여야 합니다." },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-cyan-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            💡 세 가지가 <strong>겹치는 곳</strong>에서 아이디어를 찾으세요!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "아이디어 예시",
    bg: "from-purple-50 to-pink-50",
    script: "아이디어가 잘 떠오르지 않는 분들을 위해 예시를 준비했습니다. 텍스트와 대화 중심 아이디어로는 내 고민을 들어주는 상담 챗봇, 오늘 일기를 써주는 글쓰기 도우미, 어려운 단어를 쉽게 설명해주는 사전, 여행 계획을 짜주는 플래너 등이 있습니다. 멀티모달이나 RAG를 활용한 아이디어로는 사진을 올리면 설명해주는 앱, 내 PDF 교재를 검색해서 답해주는 앱, 키워드로 그림을 그려주는 앱 등이 있습니다. 한 가지 중요한 점은 핵심 기능을 1개에서 3개로 좁히는 것이 좋다는 것입니다. 기능이 너무 많으면 시간 안에 완성하기 어렵습니다. 대표 메뉴 하나부터 확실하게 만드는 것이 훨씬 좋습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-lg font-semibold text-blue-700 mb-3">💬 텍스트·대화 중심</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 고민 상담 챗봇</li>
              <li>• 일기 쓰기 도우미</li>
              <li>• 쉬운 설명 사전</li>
              <li>• 여행 플래너</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-lg font-semibold text-purple-700 mb-3">🖼️ 멀티모달·RAG 활용</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 사진 설명 앱 (이미지 인식)</li>
              <li>• PDF 검색 답변 앱 (RAG)</li>
              <li>• 키워드 그림 생성 앱</li>
              <li>• 텔레그램 알림 봇</li>
            </ul>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-lg text-gray-700">
            ⚠️ 핵심 기능은 <strong>1~3개</strong>로 좁히세요. 대표 메뉴 하나부터 확실하게!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "발표 평가 기준",
    bg: "from-rose-50 to-orange-50",
    script: "발표가 어떻게 평가되는지 설명하겠습니다. 발표는 완성품 자랑 대회가 아닙니다. 내가 무엇을 배우고 어떻게 도전했는지를 보여주는 자리입니다. 따라서 앱이 조금 부족해도 괜찮습니다. 과정이 더 중요합니다. 좋은 발표는 네 가지를 담으면 됩니다. 첫째, 문제 정의입니다. 어떤 문제를 해결하고 싶었는지를 설명합니다. 둘째, 제작 방법입니다. 어떤 기술을 어떻게 사용했는지를 설명합니다. 셋째, 시연입니다. 앱이 실제로 동작하는 모습을 보여줍니다. 넷째, 배운 점입니다. 무엇을 배우고 무엇이 어려웠는지를 공유합니다. 또한 AI 윤리 가이드라인이 적용되었는지도 점검하시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            발표는 <strong>완성품 자랑이 아니라</strong>, 배운 과정을 보여주는 자리입니다.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">기준</th>
                <th className="p-4 text-left">무엇을 보여줄까요?</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["① 문제 정의", "어떤 문제를 해결하고 싶었는가?"],
                ["② 제작 방법", "어떤 기술(API, Streamlit, RAG 등)을 어떻게 썼는가?"],
                ["③ 시연", "앱이 실제로 동작하는 모습 (입력 → 결과)"],
                ["④ 배운 점", "무엇을 배우고, 무엇이 어려웠는가?"],
              ].map(([criterion, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-semibold">{criterion}</td>
                  <td className="p-4">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            📝 AI 윤리 가이드라인도 점검: &ldquo;AI가 만든 결과임을 표시했는가?&rdquo;
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "퀴즈로 확인해봅시다",
    bg: "from-cyan-50 to-blue-50",
    script: "지금까지 배운 내용을 퀴즈로 확인해보겠습니다. 첫 번째, 최종 프로젝트를 가게에 비유하면 기획, 제작, 중간 점검, 발표는 각각 무엇에 해당합니까? 정답은 기획은 어떤 손님을 위한 가게를 열지 정하기, 제작은 직접 메뉴 만들기, 중간 점검은 친구들에게 시식회, 발표는 가게 문 열고 손님 맞이하기입니다. 두 번째, 좋은 주제의 3가지 조건은 무엇입니까? 정답은 내가 관심 있는 주제, 실제로 쓸모 있는 것, 배운 기술로 만들 수 있는 것입니다. 세 번째, 핵심 기능은 몇 개로 정하는 것이 좋습니까? 정답은 1개에서 3개입니다.",
    content: (
      <div className="flex flex-col gap-5">
        {[
          { q: "프로젝트의 네 단계(기획·제작·점검·발표)를 가게 비유로 설명하면?", a: "가게 정하기 → 메뉴 만들기 → 시식회 → 개업식" },
          { q: "좋은 주제의 3가지 조건은?", a: "① 관심 있는 주제 ② 쓸모 있는 것 ③ 배운 기술로 가능한 것" },
          { q: "핵심 기능은 몇 개로 좁히는 것이 좋은가?", a: "1~3개. 대표 메뉴 하나부터 확실하게 만드는 것이 좋습니다." },
        ].map((item, i) => (
          <div key={i} className="bg-white/70 rounded-xl p-5">
            <p className="text-lg font-semibold text-gray-800 mb-2">Q{i + 1}. {item.q}</p>
            <p className="text-base text-gray-600">→ {item.a}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, 최종 프로젝트는 '나만의 작은 가게 차리기'와 같으며, 기획, 제작, 중간 점검, 발표의 네 단계로 진행됩니다. 둘째, 총 10차시에 걸쳐 진행되며, 각 차시마다 구체적인 활동이 있습니다. 셋째, 좋은 주제는 관심, 쓸모, 실현 가능성 세 가지가 겹치는 곳에서 찾습니다. 넷째, 발표는 완성품이 아니라 과정을 보여주는 자리이며, 문제 정의, 제작 방법, 시연, 배운 점 네 가지를 담으면 됩니다. 다음 시간에는 실습을 통해 아이디어를 구체화하고 기획서를 작성하겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            "프로젝트 = 나만의 작은 가게 차리기 (기획 → 제작 → 점검 → 발표)",
            "총 10차시(23~32차시)에 걸쳐 진행",
            "좋은 주제 = 관심 + 쓸모 + 실현 가능성이 겹치는 곳",
            "발표는 과정을 보여주는 자리 (문제·방법·시연·배운 점)",
          ].map((text, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-start gap-3">
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
    script: "오늘 강의를 마치겠습니다. 프로젝트의 전체 구조, 일정, 주제 선정 방법, 평가 기준을 모두 안내해드렸습니다. 다음 시간에는 실습을 통해 아이디어를 구체화하고, 기획서를 직접 작성하고, 단계별 미션을 따라가며 나만의 AI 앱을 만들어보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">
          다음 시간: 아이디어 구체화 + 기획서 작성 + 단계별 제작
        </p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function FinalProjectGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
