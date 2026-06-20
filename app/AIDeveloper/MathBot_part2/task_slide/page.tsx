"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: `안녕하세요, 여러분. 오늘 실습에서는 사진 속 수학 문제를 AI에게 보여주고 풀이를 받아내는 핵심 기능을 직접 만들어보겠습니다. 총 3가지 미션을 약 25~30분에 걸쳐 수행합니다. 미션 1에서 사진을 준비하고, 미션 2에서 사진 인식 코드를 완성하고, 미션 3에서 단계별 풀이 생성 프롬프트를 만들겠습니다. 질문이 있으면 언제든 손을 들어주시기 바랍니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          수학 봇 실습 <span className="text-purple-500">(2부)</span>
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          사진을 읽고 풀이 만들기
        </p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: `미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, google-genai와 Pillow(PIL) 패키지가 설치되어 있어야 합니다. 둘째, 수학 문제 예시 이미지가 필요합니다. 간단한 사칙연산부터 방정식까지 난이도별로 여러 장 준비하면 좋습니다. 셋째, 제미나이 API 키가 준비되어 있어야 합니다. 넷째, 빈칸이 포함된 코드 템플릿 파일을 확인해주시기 바랍니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">
          아래 준비물이 모두 갖추어져 있는지 확인합니다.
        </p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "google-genai, Pillow(PIL) 패키지 설치 확인" },
            { icon: "📷", text: "수학 문제 예시 이미지 여러 장 (난이도별)" },
            { icon: "🔑", text: "제미나이 API 키 준비" },
            { icon: "📄", text: "빈칸 포함 코드 템플릿 (.py 파일)" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-lg text-orange-600 font-medium text-center">
          모든 준비가 확인되면 첫 번째 미션을 시작합니다.
        </p>
      </div>
    ),
  },
  {
    title: "미션 1: 수학 문제 사진 준비 (5분)",
    bg: "from-blue-50 to-indigo-50",
    script: `첫 번째 미션입니다. AI에게 보여줄 수학 문제 사진을 준비합니다. 직접 촬영하거나 선생님이 나눠준 예시 이미지를 사용해도 됩니다. 준비한 이미지 파일을 코드와 같은 폴더에 두고, 파일 이름을 기억해두시기 바랍니다. 예를 들어 math_problem.jpg 같은 이름입니다. 두 가지를 반드시 확인하세요. 이미지가 코드 파일과 같은 폴더에 있는지, 그리고 문제 글씨가 또렷하게 보이는지입니다. 여유가 있으면 깨끗한 사진과 흐릿한 사진을 모두 준비하여 나중에 비교해보시기 바랍니다. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> AI에게 보여줄 수학 문제 사진을 준비합니다.
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 이미지가 코드 파일과 <strong>같은 폴더</strong>에 있는가?</li>
            <li>• 문제 글씨가 <strong>또렷하게</strong> 보이는가?</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            💡 깨끗한 사진과 흐릿한 사진을 모두 준비하면, 입력 품질의 중요성을 직접 체감할 수 있습니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-blue-50 to-sky-50",
    script: `미션 1의 핵심 포인트입니다. AI에게 이미지를 전달하려면 파일 경로가 정확해야 합니다. 코드와 같은 폴더에 이미지를 두면 파일 이름만으로 접근할 수 있어서 가장 간편합니다. 그리고 입력 데이터의 품질이 출력 품질을 좌우합니다. 사진이 흐리면 AI도 문제를 잘못 읽을 수 있습니다. 이것은 AI 전반에 적용되는 원칙입니다. 좋은 입력이 좋은 출력을 만듭니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="text-green-500 text-2xl">✅</span>
            <p className="text-xl text-gray-700">
              코드와 같은 폴더에 이미지를 두면 파일 이름만으로 접근 가능
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="text-green-500 text-2xl">✅</span>
            <p className="text-xl text-gray-700">
              <strong>좋은 입력 = 좋은 출력</strong> — 입력 데이터 품질이 결과를 좌우
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 사진 속 문제 인식하기 (10~12분)",
    bg: "from-green-50 to-emerald-50",
    script: `두 번째 미션입니다. 이미지를 제미나이에 전달하여 사진 속 수학 문제를 글자로 읽어내는 코드를 완성합니다. 화면에 보이는 템플릿에서 빈칸 부분을 직접 채워주시기 바랍니다. read_prompt 변수에 AI에게 사진을 어떻게 읽어달라고 부탁하는 문장을 넣으면 됩니다. 예를 들어 '이 사진 속에 있는 수학 문제를 글자로 그대로 읽어줘'라고 작성합니다. 실행 후 AI가 사진 속 문제를 글자로 정확하게 읽어내는지 확인하세요. 시간이 되면 또렷한 사진과 흐릿한 사진을 모두 테스트해서 결과를 비교해보시기 바랍니다. 10~12분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 이미지를 제미나이에 전달하여 사진 속 문제를 글자로 인식합니다.
          </p>
        </div>
        <CodeBlock>
          {`from google import genai
import PIL.Image

client = genai.Client(api_key="API 키")
image = PIL.Image.open("math_problem.jpg")

# 빈칸을 채워보세요!
read_prompt = ____

response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=[read_prompt, image]
)
print("인식된 문제:", response.text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <p className="text-lg text-gray-600">
            read_prompt에는 AI에게 사진을 어떻게 읽어달라고 부탁하는 문장을 넣습니다.
          </p>
          <p className="text-base text-gray-500">
            예: "이 사진 속에 있는 수학 문제를 글자로 그대로 읽어줘."
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-green-50 to-teal-50",
    script: `미션 2의 핵심 포인트입니다. contents 매개변수에 문자열(지시문)과 이미지를 리스트로 함께 전달하는 것이 멀티모달 코드의 핵심 구조입니다. 지시문은 AI에게 이미지를 어떻게 처리할지 알려주는 역할을 합니다. '읽어줘'라고 하면 텍스트 인식을, '설명해줘'라고 하면 이미지 설명을 합니다. 같은 이미지라도 지시문에 따라 AI의 출력이 완전히 달라집니다. 또한 흐릿한 사진에서 인식 정확도가 떨어지는 것을 확인하셨을 것입니다. 이것이 입력 품질의 중요성입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>contents=[지시문, image]</strong> — 멀티모달 코드의 핵심 구조
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              같은 이미지라도 <strong>지시문에 따라</strong> AI의 출력이 완전히 달라짐
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              흐릿한 사진 → 인식 정확도 하락 = <strong>입력 품질의 중요성</strong>
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 단계별 풀이 생성 (10~13분)",
    bg: "from-amber-50 to-yellow-50",
    script: `세 번째 미션입니다. 이번 목표는 사진 속 문제를 단계별로 풀어주는 프롬프트를 완성하는 것입니다. 답만 던지는 것이 아니라 풀이 과정에서 정답 순서로 체계적으로 설명하게 만드는 것이 핵심입니다. 화면의 템플릿에서 빈칸 부분을 직접 채워주시기 바랍니다. 빈칸에는 AI가 풀이 과정을 어떻게 보여줄지 지시하는 문장을 넣습니다. 예를 들어 '풀이 과정을 한 단계씩 순서대로 자세히 보여주고'와 같이 작성합니다. 완성한 후 간단한 사칙연산부터 방정식까지 여러 난이도의 문제로 테스트해보시기 바랍니다. AI 풀이가 나오면 반드시 직접 검토하는 습관을 들이세요. 10~13분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 단계별 풀이를 생성하는 프롬프트를 완성합니다.
          </p>
        </div>
        <CodeBlock>
          {`solve_prompt = """
너는 친절한 수학 선생님이야.
이 사진 속 수학 문제를 풀어줘. 단,
1) 먼저 문제가 무엇을 묻는지 설명하고,
2) ____
3) 마지막에 '정답: '으로 정답을 명확히 알려줘.
중학생도 이해할 수 있게 쉽게 설명해줘.
"""

response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=[solve_prompt, image]
)
print(response.text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">빈칸 힌트</p>
          <p className="text-lg text-gray-600">
            AI가 풀이 과정을 어떻게 보여줄지 지시하는 문장을 넣습니다.
          </p>
          <p className="text-base text-gray-500">
            예: "풀이 과정을 한 단계씩 순서대로 자세히 보여주고,"
          </p>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-base text-gray-700">
            ⚠️ AI 풀이가 나오면 반드시 직접 검토하세요. AI도 계산 실수를 할 수 있습니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-amber-50 to-orange-50",
    script: `미션 3의 핵심 포인트입니다. 프롬프트에 구체적인 순서와 조건을 명시하면 AI의 출력 품질이 크게 향상됩니다. '단계별로', '쉽게 설명해줘'라는 조건이 핵심입니다. 이것은 프롬프트 엔지니어링의 기본 원리입니다. AI에게 무엇을, 어떤 순서로, 어떤 수준으로 해달라고 구체적으로 요청하면 더 좋은 결과를 얻을 수 있습니다. 그리고 AI 풀이를 검토하는 습관은 AI를 올바르게 활용하는 가장 기본적인 태도입니다. 좋은 수학 선생님처럼 과정을 보여주도록 만들되, 그 결과를 무조건 신뢰하지 않는 것이 중요합니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              프롬프트에 <strong>구체적 순서 + 조건</strong>을 명시 → 출력 품질 대폭 향상
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              프롬프트 엔지니어링: <strong>무엇을 + 어떤 순서로 + 어떤 수준으로</strong> 요청
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="text-xl text-gray-700">
              AI 풀이 검토 습관 = AI를 올바르게 활용하는 <strong>가장 기본적인 태도</strong>
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-purple-50 to-violet-50",
    script: `오늘 3가지 미션을 모두 수행하셨습니다. 정리하겠습니다. 미션 1에서는 수학 문제 사진을 준비하고 입력 품질의 중요성을 이해했습니다. 미션 2에서는 이미지를 제미나이에 전달하여 문제를 인식하는 멀티모달 코드를 작성했습니다. 미션 3에서는 단계별 풀이를 생성하는 프롬프트를 완성했습니다. 이제 봇에게 줄 눈(인식)과 머리(풀이) 기능이 완성되었습니다. 다음 시간에는 이 기능을 텔레그램 봇에 연결하여, 사진을 보내면 풀이가 답장으로 오는 완성형 앱을 만들어보겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "수학 문제 사진 준비 + 입력 품질의 중요성", color: "bg-blue-100" },
            { num: "2", text: "이미지 → 제미나이 전달 → 문제 인식 (멀티모달)", color: "bg-green-100" },
            { num: "3", text: "단계별 풀이 생성 프롬프트 완성", color: "bg-amber-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-purple-50 rounded-xl p-5 text-center">
          <p className="text-xl text-gray-700">
            👀 눈(인식) + 🧠 머리(풀이) = <strong>핵심 기능 완성!</strong>
          </p>
          <p className="text-lg text-gray-500 mt-2">
            다음 시간: 이 기능을 봇에 연결하여 완성형 앱 만들기
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-violet-50 to-purple-50",
    script: `오늘 실습을 마치겠습니다. 사진 인식과 단계별 풀이 생성이라는 핵심 기능을 직접 만들어보셨습니다. 다음 시간에는 이 기능을 텔레그램 봇에 연결하여 완성형 앱을 만들겠습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">
          실습을 마칩니다
        </h1>
        <div className="text-xl text-gray-600 space-y-2 mt-4">
          <p>사진 준비 ✅</p>
          <p>문제 인식 (멀티모달) ✅</p>
          <p>단계별 풀이 생성 ✅</p>
        </div>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function MathBot2TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
