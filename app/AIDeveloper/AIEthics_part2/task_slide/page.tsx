"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: "안녕하세요, 여러분. 오늘은 지난 시간에 배운 개인정보, 저작권, 공정성 개념을 바탕으로 직접 실습을 진행하겠습니다. 총 세 가지 활동과 도전 과제가 있습니다. 먼저 AI의 편향을 직접 관찰하는 실험을 하고, 그다음 우리가 만든 앱에 넣을 AI 사용 가이드라인을 모둠별로 만들고, 마지막으로 모둠별 발표와 우리 반 공통 규칙 정리까지 진행합니다. 코드도 있고 토론도 있는, 머리와 마음을 모두 쓰는 시간입니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🔬</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          윤리적인 AI (2부)
          <br />
          <span className="text-purple-500">실습 미션</span>
        </h1>
        <p className="text-2xl text-gray-500 mt-2">편향 관찰 + 가이드라인 만들기</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 실습 환경을 확인하겠습니다. 첫째, google-genai 패키지가 설치되어 있고 API 키가 준비되어 있어야 합니다. 둘째, 편향 관찰 실험에 사용할 단어 및 직업 목록을 준비해주시기 바랍니다. 셋째, 지난 시간에 배운 데이터 편향 사례를 복습해두면 좋습니다. 넷째, 모둠별 가이드라인 작성을 위한 양식을 준비해주시기 바랍니다. 한 줄짜리 규칙 3개면 충분합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "🔑", text: "google-genai 패키지 설치 및 API 키 확인" },
            { icon: "📋", text: "편향 관찰 실험용 단어·직업 목록 준비" },
            { icon: "📖", text: "지난 시간 데이터 편향 사례 복습" },
            { icon: "✍️", text: "모둠별 가이드라인 작성 양식 (한 줄 규칙 3개)" },
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
    title: "미션 1: AI 편향 관찰 실험 (8~10분)",
    bg: "from-violet-50 to-purple-50",
    script: "첫 번째 미션입니다. AI가 정말 편견을 가지고 있는지 우리 눈으로 직접 확인해보는 실험입니다. 여러 직업을 AI에게 묘사하게 시키고, 그 묘사에 고정관념이 드러나는지 관찰합니다. 화면에 보이는 코드를 그대로 실행해주시기 바랍니다. jobs 리스트에 간호사, 프로그래머, 유치원 교사, 건설 노동자가 있습니다. 각 직업에 대해 AI가 만든 이야기 속 인물의 성별이나 나이에 치우침이 있는지 관찰해보시기 바랍니다. 결과를 확인하신 분들은 jobs 목록을 자신이 궁금한 다른 직업이나 단어로 바꿔서도 실험해보시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> AI의 묘사에 고정관념(치우침)이 드러나는지 직접 관찰합니다.
          </p>
        </div>
        <CodeBlock>
          {`from google import genai

client = genai.Client(api_key="여기에 API 키 입력")

jobs = ["간호사", "프로그래머", "유치원 교사", "건설 노동자"]

for job in jobs:
    prompt = f"'{job}'인 사람에 대한 짧은 이야기를 한 문장으로 만들어줘."
    result = client.models.generate_content(
        model="gemini-3.5-flash", contents=prompt
    )
    print(f"[{job}]", result.text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">관찰 포인트</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• AI가 만든 인물의 <strong>성별, 나이</strong>에 치우침이 보이는가?</li>
            <li>• jobs 목록을 바꿔서 다른 직업으로도 실험해보세요.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-violet-50 to-indigo-50",
    script: "미션 1의 핵심 포인트를 정리하겠습니다. AI는 대량의 텍스트 데이터를 학습하여 답을 생성합니다. 만약 그 데이터에 '간호사는 여성, 프로그래머는 남성'이라는 패턴이 많이 포함되어 있었다면, AI도 그 패턴을 그대로 반영할 수 있습니다. 다만 주의할 점이 있습니다. 요즘 AI는 편향을 많이 개선하고 있어서, 실험 결과에서 고정관념이 뚜렷하게 드러나지 않을 수도 있습니다. 그렇다고 안심해서는 안 됩니다. '많이 좋아졌지만, 여전히 조심해야 한다'가 오늘의 균형 잡힌 메시지입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              AI는 학습 데이터의 패턴을 반영합니다.
              <br />
              데이터에 편견이 있으면 → AI도 편견을 보일 수 있습니다.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-400">
            <p className="text-lg text-gray-700">
              ⚖️ 요즘 AI는 편향을 많이 개선했지만,
              <br />
              <strong>&ldquo;여전히 조심해야 한다&rdquo;</strong>가 균형 잡힌 관점입니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 우리 앱 가이드라인 만들기 (12~15분)",
    bg: "from-emerald-50 to-green-50",
    script: "두 번째 미션입니다. 이번 목표는 우리가 그동안 만든 앱들에 넣을 AI 사용 가이드라인, 즉 규칙을 모둠별로 만드는 것입니다. 거창하지 않아도 됩니다. 한 줄짜리 규칙 3개면 충분합니다. 각 앱에 맞는 규칙을 직접 만들어보시기 바랍니다. 예를 들어, 수학 풀이 봇에는 'AI 풀이는 참고용이며 틀릴 수 있음을 안내한다', 블로그 앱에는 'AI가 작성했음을 밝히고 사실 정보는 따로 확인한다', 영어 대화 앱에는 '대화에 실명이나 주소 등 개인정보를 입력하지 않는다' 같은 규칙입니다. 오늘 배운 세 가지 키워드, 개인정보, 저작권, 공정성을 떠올리며 작성해주시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 우리 앱에 넣을 AI 사용 가이드라인(한 줄 규칙 3개)을 모둠별로 만듭니다.
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-lg font-semibold text-gray-800 mb-3">앱별 규칙 예시</p>
          <ul className="text-base text-gray-600 space-y-2">
            <li>• <strong>수학 풀이 봇:</strong> &ldquo;AI 풀이는 참고용이며 틀릴 수 있음을 안내한다&rdquo;</li>
            <li>• <strong>블로그 앱:</strong> &ldquo;AI가 작성했음을 밝히고, 사실 정보는 따로 확인한다&rdquo;</li>
            <li>• <strong>영어 대화 앱:</strong> &ldquo;대화에 실명, 주소 등 개인정보를 입력하지 않는다&rdquo;</li>
          </ul>
        </div>
        <div className="bg-green-50 rounded-xl p-5">
          <p className="text-lg font-semibold text-gray-800 mb-2">만들 때 떠올릴 세 가지</p>
          <ul className="text-base text-gray-600 space-y-2">
            <li>🔒 개인정보: 사용자가 위험한 정보를 넣지 않게 하려면?</li>
            <li>©️ 저작권: AI 결과물을 정직하게 밝히게 하려면?</li>
            <li>⚖️ 공정성: AI 답변을 무조건 믿지 않고 검토하게 하려면?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-emerald-50 to-teal-50",
    script: "미션 2의 핵심 포인트를 정리하겠습니다. 가이드라인은 멋진 문장이 아니어도 됩니다. 짧고 분명한 한 줄 규칙이 오히려 지키기 쉽습니다. 중요한 것은 우리가 만든 앱을 사용하는 사람들이 안전하고 공정하게 사용할 수 있도록 돕는 것입니다. 실제 기업에서도 AI 서비스를 출시할 때 반드시 이런 사용 가이드라인을 함께 제공합니다. 여러분이 오늘 만든 것은 단순한 연습이 아니라, 실제 개발 현장에서도 필요한 중요한 작업입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              짧고 분명한 <strong>한 줄 규칙</strong>이 오히려 지키기 쉽습니다.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-lg text-gray-700">
              실제 기업에서도 AI 서비스 출시 시 <strong>사용 가이드라인</strong>을 반드시 제공합니다.
              <br />
              여러분이 만든 것은 실제 개발 현장에서도 필요한 중요한 작업입니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 모둠별 발표 및 공통 규칙 정리 (5분)",
    bg: "from-cyan-50 to-blue-50",
    script: "세 번째 미션입니다. 각 모둠이 만든 가이드라인을 친구들 앞에서 발표합니다. 발표를 들으면서 여러 모둠에 겹치는 규칙이 있는지 찾아보시기 바랍니다. 모둠마다 겹치는 규칙을 모으면 '우리 반 공통 AI 사용 규칙'이라는 멋진 산출물이 완성됩니다. 이것은 마치 동네가 평화롭게 돌아가려면 함께 지키는 약속이 필요한 것과 같습니다. 좋은 개발자는 멋진 기능뿐 아니라, 이런 약속까지 함께 만드는 사람입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 모둠별 발표 후, 겹치는 규칙을 모아 우리 반 공통 규칙을 정리합니다.
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">활동 순서</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>1. 각 모둠이 가이드라인 3개를 발표합니다.</li>
            <li>2. 여러 모둠에 겹치는 규칙을 찾습니다.</li>
            <li>3. 겹치는 규칙을 모아 <strong>&ldquo;우리 반 공통 AI 사용 규칙&rdquo;</strong>을 완성합니다.</li>
          </ul>
        </div>
        <div className="bg-teal-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            🏡 비유: 동네의 약속(규칙) = 우리 앱의 약속(가이드라인)
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "도전 과제: 나의 윤리 점검 노트 (선택)",
    bg: "from-amber-50 to-yellow-50",
    script: "도전 과제입니다. 다음 시간부터는 지금까지 배운 모든 것을 활용하여 나만의 AI 앱을 직접 기획하고 만드는 프로젝트가 시작됩니다. 미리 마음의 준비를 해보시기 바랍니다. 내가 만들 프로젝트에서 특히 조심해야 할 윤리 포인트는 무엇인지 적어보고, 그 앱에 넣을 가이드라인 한 줄을 미리 정해보고, 오늘 만든 우리 반 공통 규칙을 내 프로젝트에도 적용할 방법을 생각해보시기 바랍니다. 이 과제는 선택이지만, 해두시면 프로젝트를 시작할 때 큰 도움이 될 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 최종 프로젝트를 앞두고 윤리적 관점에서 미리 점검합니다.
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          {[
            "내가 만들 프로젝트에서 특히 조심해야 할 윤리 포인트 적어보기",
            "그 앱에 넣을 가이드라인 한 줄을 미리 정해보기",
            "우리 반 공통 규칙을 내 프로젝트에도 적용할 방법 생각해보기",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="bg-amber-400 text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</span>
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
    script: "오늘 세 가지 활동을 모두 수행하셨습니다. 정리하겠습니다. 미션 1에서는 AI 편향 관찰 실험으로 AI도 편견을 가질 수 있다는 것을 직접 확인했습니다. 미션 2에서는 우리 앱에 넣을 AI 사용 가이드라인을 모둠별로 만들었습니다. 미션 3에서는 모둠 발표로 우리 반 공통 규칙까지 정리했습니다. 지난 시간과 오늘로, 여러분은 AI를 안전하고 책임감 있게 다루는 법을 모두 배웠습니다. 기술, 즉 운전 실력과 태도, 즉 교통 법규를 모두 갖추셨습니다. AI 사용 운전면허 취득 완료입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "AI 편향 관찰 실험 — AI도 편견을 가질 수 있음을 확인", color: "bg-violet-100" },
            { num: "2", text: "AI 사용 가이드라인 모둠별 작성", color: "bg-emerald-100" },
            { num: "3", text: "모둠 발표 + 우리 반 공통 규칙 정리", color: "bg-cyan-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-4 text-center">
          <p className="text-xl text-gray-700">
            🪪 기술(운전 실력) + 태도(교통 법규) = <strong>AI 사용 운전면허 취득!</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "오늘 실습을 마치겠습니다. 여러분 모두 훌륭하게 수행해주셨습니다. 다음 시간부터는 지금까지 배운 모든 것을 활용하여 나만의 AI 앱을 자유롭게 만들어보는 최종 프로젝트가 시작됩니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <div className="text-xl text-gray-600 space-y-2 mt-4">
          <p>AI 편향 관찰 실험 ✅</p>
          <p>AI 사용 가이드라인 작성 ✅</p>
          <p>우리 반 공통 규칙 완성 ✅</p>
        </div>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function AIEthics2TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
