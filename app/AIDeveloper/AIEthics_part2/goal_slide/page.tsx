"use client";

import SlideShell, {
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 '함께 잘 쓰는 AI — 윤리적인 AI 2부'입니다. 지난 시간에는 AI도 틀릴 수 있다는 점, 즉 환각(hallucination) 현상과 그래서 우리가 AI의 답을 한 번 더 검토하는 것이 왜 중요한지를 배웠습니다. 오늘은 시선을 조금 바꿔보겠습니다. AI를 사용할 때 '나'뿐 아니라 '다른 사람'과 '사회'를 어떻게 배려해야 하는지를 다루겠습니다. 좋은 개발자는 기술만 잘 다루는 사람이 아니라, 함께 잘 쓰는 법을 아는 사람입니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🤝</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          함께 잘 쓰는 AI
          <br />
          <span className="text-purple-500">윤리적인 AI (2부)</span>
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          개인정보 · 저작권 · 공정성(편향)
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "본격적인 내용에 들어가기 전에, 오늘 강의의 학습 목표를 먼저 확인하겠습니다. 첫째, AI를 사용할 때 지켜야 할 개인정보, 저작권, 공정성(편향) 문제를 이해합니다. 둘째, 내가 만든 앱이 다른 사람에게 피해를 주지 않으려면 무엇을 조심해야 하는지 파악합니다. 이 두 가지를 오늘 강의가 끝나기 전까지 확실히 이해하는 것이 목표입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "AI 사용 시 지켜야 할 개인정보, 저작권, 공정성(편향) 문제를 설명할 수 있다" },
            { num: "2", text: "내가 만든 앱이 다른 사람에게 피해를 주지 않으려면 무엇을 조심해야 하는지 안다" },
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
    title: "오늘의 큰 그림",
    bg: "from-blue-50 to-indigo-50",
    script: "지난 시간의 주제가 'AI를 나를 위해 똑똑하게 쓰는 법'이었다면, 오늘은 'AI를 남과 함께 안전하게 쓰는 법'입니다. AI는 이제 나 혼자만 쓰는 도구가 아닙니다. 내가 만든 앱을 통해 친구도, 가족도, 모르는 사람도 사용하게 됩니다. 그만큼 더 큰 책임이 따릅니다. 오늘 우리가 살펴볼 핵심 주제는 딱 세 가지입니다. 개인정보, 저작권, 공정성입니다. 어렵게 들릴 수 있지만, 사실은 우리가 평소 친구를 대할 때 지키는 예절과 같은 이야기입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            지난 시간: AI를 <strong>나</strong>를 위해 똑똑하게 쓰는 법
          </p>
          <p className="text-xl text-gray-700 mt-2">
            오늘: AI를 <strong>다른 사람</strong>과 함께 안전하게 쓰는 법
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">키워드</th>
                <th className="p-4 text-left">한 줄 설명</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["🔒 개인정보", "AI에게 입력한 내용이 어디로 갈지 모른다 — 민감한 정보 입력 주의"],
                ["©️ 저작권", "AI가 만든 글·이미지, 남의 글을 AI에 넣을 때 생각할 점"],
                ["⚖️ 공정성(편향)", "AI는 학습한 데이터의 편견을 그대로 가질 수 있음"],
              ].map(([keyword, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-semibold">{keyword}</td>
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
    title: "🔒 개인정보 — 한 번 입력하면 되돌리기 어렵다",
    bg: "from-red-50 to-rose-50",
    script: "첫 번째 주제, 개인정보입니다. AI 채팅창에 무언가를 입력하면, 그 내용이 어디로 가서 어떻게 사용되는지 우리는 정확히 알 수 없습니다. 따라서 친구 이름, 집 주소, 비밀번호 같은 민감한 정보는 함부로 입력해서는 안 됩니다. 한번 입력하면 지우개로 지우듯 되돌리기가 어렵기 때문입니다. 간단한 기준이 있습니다. '이 내용을 모르는 사람 앞에서 큰 소리로 말해도 괜찮을까?'를 떠올려보시기 바랍니다. 괜찮지 않다면 AI에 입력하지 않는 것이 안전합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-xl text-gray-700">
            AI 채팅창에 입력한 내용은 <strong>어디로 가서 어떻게 쓰이는지</strong> 알 수 없습니다.
          </p>
          <p className="text-xl text-gray-700 mt-3">
            한번 입력하면 <strong>되돌리기가 어렵습니다</strong>.
          </p>
        </div>
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-lg font-semibold text-gray-800 mb-2">입력하면 안 되는 것들</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 친구 이름, 집 주소, 전화번호</li>
            <li>• 비밀번호, 계정 정보</li>
            <li>• 학교, 학번, 주민등록번호 등</li>
          </ul>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            💡 기준: &ldquo;모르는 사람 앞에서 큰 소리로 말해도 괜찮을까?&rdquo;
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "©️ 저작권 — 남의 물건을 내 것처럼 쓰지 않기",
    bg: "from-blue-50 to-sky-50",
    script: "두 번째 주제, 저작권입니다. 저작권은 두 방향으로 생각해야 합니다. 하나는 AI가 만든 글이나 이미지를 내가 사용할 때이고, 다른 하나는 남이 만든 글을 내가 AI에 넣을 때입니다. 요즘은 'AI가 만들었다'라고 정직하게 밝히는 것이 점점 중요해지고 있습니다. AI가 그려준 그림이나 써준 글을 마치 내가 처음부터 만든 것처럼 속이지 않는 것이 정직한 태도입니다. 또한, 다른 사람의 저작물을 AI에 그대로 넣어서 변형하여 쓰는 것도 저작권 침해가 될 수 있으므로 주의해야 합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">저작권은 <strong>두 방향</strong>으로 생각해야 합니다.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-blue-400">
            <p className="text-lg font-semibold text-blue-700 mb-2">AI가 만든 것을 쓸 때</p>
            <p className="text-base text-gray-600">&ldquo;AI가 만들었다&rdquo;고 정직하게 밝히는 것이 중요합니다.</p>
          </div>
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-purple-400">
            <p className="text-lg font-semibold text-purple-700 mb-2">남의 글을 AI에 넣을 때</p>
            <p className="text-base text-gray-600">다른 사람의 저작물을 그대로 넣어 변형하면 저작권 침해가 될 수 있습니다.</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            💡 핵심: <strong>솔직함</strong>이 좋은 개발자의 기본입니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "⚖️ 공정성(편향) — AI도 편견을 배운다",
    bg: "from-green-50 to-emerald-50",
    script: "세 번째 주제, 공정성, 또는 편향 문제입니다. 이전 수업에서 'AI는 데이터를 먹고 자란다'고 배운 것을 기억하실 것입니다. 만약 그 데이터에 편견이 섞여 있으면, AI도 그 편견을 그대로 학습합니다. 예를 들어, AI에게 '간호사'를 묘사하게 하면 자꾸 여성으로, '프로그래머'를 묘사하면 남성으로 표현하는 경우가 있을 수 있습니다. 이런 편향된 답이 특정 사람들을 차별하거나 상처 줄 수 있으므로, 우리는 AI의 답을 비판적으로 검토하는 자세가 필요합니다. 다만, 요즘 AI는 편향을 많이 개선하고 있어서 고정관념이 잘 드러나지 않을 수도 있습니다. 그렇다고 안심해서는 안 됩니다. '많이 좋아졌지만, 여전히 조심해야 한다'가 균형 잡힌 관점입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            AI는 학습한 데이터의 <strong>편견을 그대로</strong> 가질 수 있습니다.
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5">
          <p className="text-lg font-semibold text-gray-800 mb-2">편향의 예시</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• &ldquo;간호사&rdquo; → 자꾸 여성으로 묘사</li>
            <li>• &ldquo;프로그래머&rdquo; → 자꾸 남성으로 묘사</li>
            <li>• 특정 문화·인종에 대한 고정관념 반영</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-lg text-gray-700">
            ⚠️ 요즘 AI는 편향을 많이 개선했지만, <strong>여전히 조심해야</strong> 합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "핵심 비유: 공공장소에서의 예절",
    bg: "from-teal-50 to-cyan-50",
    script: "이 세 가지를 한 번에 기억할 수 있는 비유를 준비했습니다. 바로 '공공장소에서의 예절'입니다. AI를 사용하는 것은 마치 여러 사람이 함께 쓰는 공공장소, 예를 들어 공원, 도서관, 지하철에 있는 것과 같습니다. 공공장소에서 우리가 지키는 예절을 떠올려보면 AI 윤리가 한눈에 들어옵니다. 내 비밀을 큰 소리로 말하지 않는 것은 개인정보 보호와 같고, 남의 물건을 내 것처럼 가져가지 않는 것은 저작권 존중과 같고, 누군가를 차별하거나 상처 주지 않는 것은 공정성과 같습니다. AI를 잘 쓰는 사람이란 기술만 잘 다루는 사람이 아니라, 이런 예절을 아는 사람입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700 text-center">
          AI를 쓰는 것 = <strong>공공장소(공원, 도서관, 지하철)</strong>에 있는 것
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-lg font-semibold text-green-700 mb-3">🏙️ 공공장소에서의 예절</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 내 비밀을 큰 소리로 말하지 않기</li>
              <li>• 남의 물건을 내 것처럼 가져가지 않기</li>
              <li>• 누군가를 차별하거나 상처 주지 않기</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-lg font-semibold text-purple-700 mb-3">🤖 AI를 쓸 때의 예절</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 개인정보를 함부로 입력하지 않기</li>
              <li>• 저작물을 내 것처럼 쓰지 않기</li>
              <li>• 편향된 답을 조심하고 검토하기</li>
            </ul>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            AI를 잘 쓰는 사람 = <strong>기술 + 예절</strong>을 모두 갖춘 사람
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "퀴즈로 확인해봅시다",
    bg: "from-amber-50 to-yellow-50",
    script: "지금까지 배운 내용을 퀴즈로 확인해보겠습니다. 첫 번째, AI 채팅창에 친구의 이름이나 집 주소 같은 민감한 정보를 입력해도 괜찮을까요? 정답은 '안 됩니다'입니다. 입력한 내용이 어디로 가는지 알 수 없고, 한번 입력하면 되돌리기 어렵기 때문입니다. 두 번째, AI가 만들어준 글이나 그림을 쓸 때 중요한 태도는 무엇일까요? 정답은 'AI가 만들었다고 솔직하게 밝히는 것'입니다. 세 번째, AI가 특정 직업이나 사람에 대해 편견 섞인 답을 하는 이유는 무엇일까요? 정답은 'AI가 학습한 데이터에 편견이 포함되어 있을 수 있기 때문'입니다.",
    content: (
      <div className="flex flex-col gap-5">
        {[
          { q: "AI 채팅창에 민감한 개인정보를 입력해도 괜찮을까요?", a: "안 됩니다. 입력 내용이 어디로 가는지 알 수 없고, 되돌리기 어렵습니다." },
          { q: "AI가 만들어준 글·그림을 쓸 때 중요한 태도는?", a: "'AI가 만들었다'고 솔직하게 밝히는 것입니다." },
          { q: "AI가 편견 섞인 답을 하는 이유는?", a: "학습한 데이터에 편견이 포함되어 있을 수 있기 때문입니다." },
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
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, 개인정보는 한 번 입력하면 되돌리기 어려우므로, 입력 전에 한 번 더 생각해야 합니다. 둘째, AI가 만든 결과물에는 'AI가 만들었다'고 솔직하게 밝히는 것이 정직한 태도입니다. 셋째, AI는 학습한 데이터의 편견을 그대로 가질 수 있으므로, AI의 답을 비판적으로 검토하는 자세가 필요합니다. 넷째, 이 세 가지를 '공공장소에서의 예절'로 기억하면 됩니다. 다음 시간에는 실습을 통해 AI의 편향을 직접 관찰하고, 우리 앱에 넣을 AI 사용 가이드라인을 만들어보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { icon: "🔒", title: "개인정보", desc: "입력 전에 한 번 더 생각하기 — 되돌리기 어렵습니다" },
            { icon: "©️", title: "저작권", desc: "'AI가 만들었다'고 솔직하게 밝히는 정직한 태도" },
            { icon: "⚖️", title: "공정성(편향)", desc: "AI의 답을 비판적으로 검토하는 자세가 필요합니다" },
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
        <div className="bg-teal-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            💡 비유: <strong>공공장소에서의 예절</strong> = AI를 쓸 때의 예절
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "오늘 강의를 마치겠습니다. AI를 다른 사람과 함께 안전하게 쓰는 예절, 개인정보, 저작권, 공정성, 이 세 가지를 기억하시기 바랍니다. 다음 시간에는 실습 페이지에서 AI의 편향을 직접 관찰하는 실험을 하고, 우리 앱에 넣을 AI 사용 가이드라인을 만들어보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">
          다음 시간: AI 편향 관찰 실험 + 가이드라인 만들기
        </p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function AIEthics2GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
