"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-violet-50 to-purple-50",
    script: `안녕하세요, 여러분. 오늘 강의의 주제는 '사진을 보고 푸는 수학 봇 2부'입니다. 지난 시간에는 텍스트 메시지를 받아서 답장하는 봇을 만들었습니다. 오늘은 한 단계 더 나아가서, AI가 사진 속 수학 문제를 직접 '보고', 단계별로 풀이를 생성하는 핵심 기능을 이해해보겠습니다. 봇에 연결하는 것은 다음 시간이고, 오늘은 그 핵심 두뇌 부분의 원리를 배우겠습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">👀</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          사진을 보고 푸는
          <br />
          <span className="text-purple-500">수학 봇 (2부)</span>
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          이미지 인식 + 단계별 풀이 생성의 원리
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: `오늘의 학습 목표를 확인하겠습니다. 첫째, 이미지를 AI(제미나이 비전)에게 전달하여 내용을 인식하는 방법을 이해합니다. 둘째, 사진 속 수학 문제를 인식하고 단계별 풀이를 생성하는 핵심 기능의 원리를 파악합니다. 셋째, '단계별로 설명하라'는 프롬프트가 풀이 품질을 크게 높인다는 점을 이해합니다. 이 세 가지를 오늘 강의에서 확실히 다루겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 이해하게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "이미지를 AI(제미나이 비전)에게 전달하여 내용을 인식하는 방법" },
            { num: "2", text: "사진 속 수학 문제를 인식하고 단계별 풀이를 생성하는 원리" },
            { num: "3", text: "'단계별로 설명하라'는 프롬프트가 풀이 품질을 높이는 이유" },
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
    title: "지난 시간 복습 + 오늘 목표",
    bg: "from-blue-50 to-indigo-50",
    script: `먼저 지금까지의 진행 상황을 정리하겠습니다. 지난 시간에는 텍스트 메시지를 받아서 답장하는 봇, 즉 대화의 통로를 만들었습니다. 오늘은 그 봇에게 줄 새로운 능력을 만듭니다. 바로 사진 속 수학 문제를 읽고 단계별로 풀이를 만드는 기능, 즉 눈과 두뇌입니다. 그리고 다음 시간에는 이 풀이 기능을 봇에 연결하여 완성형 앱을 만들 것입니다. 오늘은 봇 연결까지는 하지 않고, 핵심 기능의 원리에 집중하겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">시기</th>
                <th className="p-4 text-left">봇이 할 수 있는 일</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-white">
                <td className="p-4 font-semibold">지난 시간</td>
                <td className="p-4">글자 메시지를 받아서 답장하기 (대화의 통로)</td>
              </tr>
              <tr className="bg-purple-50">
                <td className="p-4 font-semibold text-purple-700">오늘 ⭐</td>
                <td className="p-4 text-purple-700 font-medium">사진 속 수학 문제를 읽고, 단계별 풀이 만들기 (눈 + 두뇌)</td>
              </tr>
              <tr className="bg-white">
                <td className="p-4 font-semibold">다음 시간</td>
                <td className="p-4">풀이 기능을 봇에 연결해서 완성형 앱 만들기</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "멀티모달 인식이란?",
    bg: "from-green-50 to-emerald-50",
    script: `오늘의 핵심 개념인 '멀티모달 인식'에 대해 설명하겠습니다. 이전까지 우리가 사용한 AI는 글로 된 질문만 처리할 수 있었습니다. 마치 눈을 감고 듣기만 하는 선생님과 같았습니다. 하지만 제미나이 비전 같은 멀티모달 AI는 텍스트뿐만 아니라 이미지도 함께 입력으로 받을 수 있습니다. 이것을 멀티모달, 즉 여러 형태의 입력을 동시에 처리하는 능력이라고 합니다. 오늘 우리는 이 선생님에게 '눈'을 달아주는 것입니다. 사진 속 문제를 직접 보고, 머리로 풀어서 설명할 수 있게 됩니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>멀티모달(Multimodal)</strong> = 글자 + 이미지 등 여러 형태의 입력을 동시에 처리하는 능력
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-gray-400">
            <p className="text-lg font-bold text-gray-700 mb-3">👂 글자만 듣던 AI</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 글로 된 질문만 답할 수 있음</li>
              <li>• 사진은 전달해도 못 봄</li>
              <li>• 눈을 감고 듣기만 하는 선생님</li>
            </ul>
          </div>
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-purple-400">
            <p className="text-lg font-bold text-purple-700 mb-3">👀 사진도 보는 AI (멀티모달)</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 이미지와 질문을 함께 받음</li>
              <li>• 사진 속 문제를 직접 읽음</li>
              <li>• 눈과 머리를 함께 쓰는 선생님</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "핵심 비유: 눈과 머리를 가진 선생님",
    bg: "from-emerald-50 to-teal-50",
    script: `이 개념을 비유로 정리하겠습니다. 지금까지의 AI는 눈을 감고 듣기만 하는 선생님이었습니다. 학생이 문제를 글자로 타이핑해서 전달해야만 답할 수 있었습니다. 오늘 우리가 하는 것은 이 선생님에게 눈을 달아주는 것입니다. 이제 선생님은 사진 속 문제를 직접 보고, 이해하고, 풀이 과정을 설명할 수 있습니다. 사진 한 장이면 바로 풀이가 가능합니다. 보는 능력과 푸는 능력을 동시에 사용하게 하는 것, 이것이 오늘 강의의 핵심입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <p className="text-6xl mb-4">👀 ➕ 🧠</p>
          <p className="text-2xl text-gray-800 font-semibold">
            보는 능력(인식) + 푸는 능력(풀이)
          </p>
          <p className="text-lg text-gray-600 mt-2">
            이 두 가지를 동시에 사용하게 하는 것이 오늘의 핵심
          </p>
        </div>
        <div className="space-y-3">
          <div className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">📷</span>
            <p className="text-lg text-gray-700"><strong>입력:</strong> 수학 문제가 적힌 사진 한 장</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">👀</span>
            <p className="text-lg text-gray-700"><strong>1단계:</strong> AI가 사진을 보고 문제를 인식 (이미지 인식)</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">🧠</span>
            <p className="text-lg text-gray-700"><strong>2단계:</strong> 문제를 이해하고 단계별로 풀이 생성</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">📝</span>
            <p className="text-lg text-gray-700"><strong>출력:</strong> 단계별 풀이 과정 + 최종 정답</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "기본 코드 구조 살펴보기",
    bg: "from-cyan-50 to-blue-50",
    script: `이제 실습에서 사용할 코드의 기본 구조를 살펴보겠습니다. 핵심은 딱 두 가지입니다. 첫째, PIL.Image.open으로 사진 파일을 불러옵니다. 둘째, generate_content의 contents 매개변수에 지시문과 이미지를 리스트로 함께 전달합니다. 이것이 멀티모달의 핵심입니다. 사진만 보내는 것이 아니라, '이 사진으로 무엇을 해달라'는 지시문도 함께 보내는 것입니다. contents에 문자열과 이미지를 리스트로 묶어서 전달하는 이 한 줄이 가장 중요한 부분입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">
          핵심은 딱 두 가지: <strong>사진 불러오기</strong>와 <strong>지시문 + 사진 함께 보내기</strong>
        </p>
        <CodeBlock>
          {`from google import genai
import PIL.Image

client = genai.Client(api_key="API 키")

# 1. 수학 문제 사진 불러오기
image = PIL.Image.open("math_problem.jpg")

# 2. 지시문과 사진을 리스트로 함께 전달!
response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=["이 사진 속 수학 문제를 읽어줘.", image]
)
print(response.text)`}
        </CodeBlock>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">
            핵심 한 줄: <strong>contents=[지시문, image]</strong> — 글자와 사진을 리스트로 함께 전달
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "풀이 품질을 높이는 프롬프트",
    bg: "from-amber-50 to-yellow-50",
    script: `사진을 AI에게 보여주는 것만으로는 충분하지 않습니다. AI에게 어떻게 풀어달라고 부탁하느냐, 즉 프롬프트가 풀이 품질을 크게 좌우합니다. 단순히 '이 문제 풀어줘'라고 하면 AI가 답만 던지는 경우가 많습니다. 하지만 '먼저 문제가 무엇을 묻는지 설명하고, 단계별로 풀이 과정을 보여준 뒤, 마지막에 정답을 알려줘'라고 구체적으로 순서를 지정하면, AI가 체계적인 풀이를 생성합니다. 좋은 수학 선생님이 답만 알려주지 않고 풀이 과정을 차근차근 보여주는 것과 같은 원리입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-300">
            <p className="text-lg font-bold text-red-700 mb-2">❌ 단순한 프롬프트</p>
            <p className="text-base text-gray-600">"이 문제 풀어줘"</p>
            <p className="text-sm text-gray-500 mt-2">→ 답만 툭 던짐</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-400">
            <p className="text-lg font-bold text-green-700 mb-2">✅ 체계적인 프롬프트</p>
            <p className="text-base text-gray-600">"문제를 먼저 읽고, 단계별로 풀이 과정을 설명한 뒤, 마지막에 정답을 알려줘"</p>
            <p className="text-sm text-gray-500 mt-2">→ 과정 + 정답을 체계적으로 제공</p>
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-lg text-gray-700 font-semibold mb-2">수학 풀이에 좋은 프롬프트 구조:</p>
          <ol className="text-base text-gray-600 space-y-2">
            <li>1. 문제가 무엇을 묻는지 설명</li>
            <li>2. 단계별 풀이 과정 보여주기</li>
            <li>3. 마지막에 정답 명시</li>
            <li>4. 쉬운 언어로 설명 요청</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    title: "AI도 실수할 수 있습니다",
    bg: "from-red-50 to-orange-50",
    script: `마지막으로 매우 중요한 주의사항을 말씀드리겠습니다. AI는 똑똑하지만 완벽하지 않습니다. 사진이 흐리거나 글씨가 알아보기 어려우면 AI도 문제를 잘못 읽을 수 있습니다. 또한 AI가 가끔 계산 실수를 하기도 합니다. 따라서 AI 풀이가 나오면 그대로 외우거나 믿지 말고, 반드시 '이게 맞는가?' 하고 스스로 검토하는 습관이 중요합니다. 이것은 다음 시간의 윤리 수업과도 연결되는 매우 중요한 태도입니다. AI는 도구이지 정답 기계가 아니라는 점을 꼭 기억하시기 바랍니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-500">
          <p className="text-xl text-gray-800 font-semibold">
            AI 풀이를 그대로 믿지 마세요!
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: "📷", title: "사진 품질 문제", desc: "흐리거나 글씨가 작으면 AI가 문제를 잘못 읽을 수 있음" },
            { icon: "🔢", title: "계산 실수", desc: "AI가 가끔 연산 과정에서 오류를 범할 수 있음" },
            { icon: "✅", title: "반드시 검토", desc: "AI 풀이가 나오면 '이게 맞나?' 스스로 확인하는 습관 필요" },
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
        <p className="text-lg text-gray-500 text-center">
          AI는 도구이지 정답 기계가 아닙니다. (윤리 수업과 연결)
        </p>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, 멀티모달 인식은 글자뿐 아니라 이미지까지 함께 처리하는 AI의 능력입니다. 둘째, contents 매개변수에 지시문과 이미지를 리스트로 함께 전달하는 것이 핵심 코드 구조입니다. 셋째, 단계별로 설명을 요청하는 프롬프트가 풀이 품질을 크게 높입니다. 넷째, AI 풀이는 반드시 검토해야 하며, 그대로 신뢰해서는 안 됩니다. 다음 시간에는 이 핵심 기능을 봇에 연결하여, 사진을 보내면 풀이가 답장으로 오는 완성형 앱을 만들어보겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            "멀티모달 인식 = 글자 + 이미지를 동시에 처리하는 AI 능력",
            "contents=[지시문, image] — 핵심 코드 구조",
            "'단계별 설명' 프롬프트가 풀이 품질을 크게 향상",
            "AI 풀이는 반드시 검토 — AI는 도구이지 정답 기계가 아님",
          ].map((text, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
              <span className="text-green-500 text-xl">✅</span>
              <p className="text-lg text-gray-700">{text}</p>
            </div>
          ))}
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-600">
            다음 시간: 이 기능을 봇에 연결하여 <strong>완성형 앱</strong> 만들기
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-violet-50 to-purple-50",
    script: `개념 강의를 마치겠습니다. 오늘은 사진을 AI에게 전달하여 수학 문제를 인식하고, 단계별 풀이를 생성하는 핵심 원리를 배웠습니다. 실습 시간에 직접 코드를 작성하면서 이 개념을 체험해보시기 바랍니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">
          개념 강의를 마칩니다
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          실습 시간에 직접 사진 인식 + 풀이 생성 코드를 작성합니다
        </p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function MathBot2GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
