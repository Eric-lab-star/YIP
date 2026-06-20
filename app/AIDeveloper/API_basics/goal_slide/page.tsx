"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 'API가 무엇인가'입니다. API는 Application Programming Interface의 약자로, 우리가 만든 프로그램이 다른 서비스와 소통할 수 있게 해주는 창구입니다. 오늘은 API의 개념을 일상생활의 비유로 이해하고, 제미나이 앱과 제미나이 API의 차이를 명확히 구분하는 것을 목표로 합니다. 마지막으로 오늘의 최종 과제인 날씨 정보 앱이 어떤 구조인지 미리 살펴보겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          <code className="text-orange-500">API</code>가 뭐냥?
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          코딩냥과 함께하는 API 개념 강의
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "본격적인 내용에 앞서, 오늘의 학습 목표를 확인하겠습니다. 첫째, API가 무엇인지 설명할 수 있습니다. 둘째, 제미나이 앱을 사용하는 것과 제미나이 API를 사용하는 것이 어떻게 다른지 구분할 수 있습니다. 셋째, 오늘의 최종 과제인 날씨 정보 앱의 구조를 이해합니다. 이 세 가지를 오늘 강의가 끝나기 전까지 확실히 이해하는 것이 목표입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "API가 무엇인지 설명할 수 있다" },
            { num: "2", text: "제미나이 앱과 제미나이 API의 차이를 구분할 수 있다" },
            { num: "3", text: "오늘의 최종 과제(날씨 정보 앱)의 구조를 이해한다" },
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
    title: "API란 무엇인가?",
    bg: "from-blue-50 to-indigo-50",
    script: "API는 Application Programming Interface의 약자입니다. 이름이 길고 어렵게 느껴질 수 있지만, 핵심은 간단합니다. API는 내가 만든 프로그램이 다른 서비스에 요청을 보내고 결과를 받아오는 창구입니다. 이것을 키오스크에 비유하면 이해가 쉽습니다. 햄버거 가게에서 키오스크를 통해 주문하면, 키오스크가 주방에 주문을 전달하고 음식이 나옵니다. 우리가 직접 주방에 들어갈 필요가 없습니다. API도 마찬가지입니다. 내 프로그램이 API를 통해 외부 서비스에 요청을 보내면, 그 서비스가 데이터를 돌려줍니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-lg text-gray-500 mb-1">
            API = <strong>A</strong>pplication <strong>P</strong>rogramming <strong>I</strong>nterface
          </p>
          <p className="text-xl text-gray-700">
            내 프로그램이 다른 서비스에 <strong>요청을 보내고 결과를 받아오는 창구</strong>입니다.
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5">
          <p className="text-lg font-semibold text-gray-800 mb-3">키오스크 비유</p>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <tbody className="text-gray-700">
                {[
                  ["손님 (나)", "내가 만든 프로그램 (코드)"],
                  ["키오스크", "API"],
                  ["주방 (요리사)", "외부 서비스 (제미나이, 날씨 서버 등)"],
                  ["주문한 음식", "API가 돌려주는 데이터"],
                ].map(([left, right], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white/50" : ""}>
                    <td className="p-3 font-semibold">{left}</td>
                    <td className="p-3">→ {right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "배달 앱 속의 API",
    bg: "from-sky-50 to-blue-50",
    script: "API가 일상에서 얼마나 많이 사용되는지 배달 앱을 예로 들어 설명하겠습니다. 여러분이 매일 사용하는 배달 앱 하나에도 여러 개의 API가 동시에 작동하고 있습니다. 지도 API로 식당 위치를 보여주고, 결제 API로 카드 결제를 처리하고, 날씨 API로 배달 소요 시간에 영향을 주는 날씨 정보를 가져옵니다. 이처럼 하나의 앱 안에 여러 개의 API가 동시에 쓰이는 경우가 대부분입니다. 핵심을 한 문장으로 요약하면, API는 내 프로그램이 다른 서비스에 요청을 보내고 결과를 받아오는 창구입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">
          하나의 앱 안에 <strong>여러 개의 API</strong>가 동시에 작동합니다.
        </p>
        <div className="space-y-3">
          {[
            { icon: "🗺️", name: "지도 API", desc: "식당 위치를 지도에 표시" },
            { icon: "💳", name: "결제 API", desc: "카드 결제를 처리" },
            { icon: "🌤️", name: "날씨 API", desc: "배달 관련 날씨 정보를 제공" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700 font-medium">
            API = 내 프로그램이 다른 서비스에 요청을 보내고 결과를 받아오는 창구
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "제미나이 앱 vs 제미나이 API",
    bg: "from-purple-50 to-pink-50",
    script: "이제 오늘의 핵심 내용입니다. 우리가 평소에 사용하는 제미나이 앱과, 코드로 사용하는 제미나이 API는 어떻게 다를까요? 제미나이 앱은 사람이 직접 화면에서 타이핑하고, 눈으로 답변을 읽고, 결과를 복사해서 다른 곳에 옮겨야 합니다. 한 번에 한 사람만 사용합니다. 반면 제미나이 API는 내가 만든 프로그램이 자동으로 질문을 보내고, 답변을 코드가 받아서 자동으로 처리합니다. 결과를 바로 화면에 띄우거나 저장하거나 다른 곳에 활용할 수 있으며, 수백 명이 동시에 사용할 수 있습니다. 가장 큰 차이점은 제미나이 앱은 사람이 사용하는 도구이고, 제미나이 API는 내가 만든 프로그램이 사용하는 도구라는 것입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
            <p className="text-lg font-bold text-blue-700 mb-3">💬 제미나이 앱</p>
            <ul className="space-y-2 text-base text-gray-600">
              <li>• 사람이 직접 화면에서 타이핑</li>
              <li>• 눈으로 답변을 읽고 직접 판단</li>
              <li>• 결과를 손으로 복사·이동</li>
              <li>• 한 번에 한 사람만 사용</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
            <p className="text-lg font-bold text-purple-700 mb-3">⚙️ 제미나이 API</p>
            <ul className="space-y-2 text-base text-gray-600">
              <li>• 코드가 자동으로 질문 전송</li>
              <li>• 답변을 코드가 자동으로 처리</li>
              <li>• 결과를 즉시 활용·저장 가능</li>
              <li>• 수백 명 동시 사용 (자동화)</li>
            </ul>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">
            앱 = <strong>사람</strong>이 사용하는 도구 | API = <strong>프로그램</strong>이 사용하는 도구
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "실생활 비교 예시",
    bg: "from-green-50 to-emerald-50",
    script: "좀 더 구체적인 상황으로 비교하겠습니다. '오늘 서울 날씨를 AI에게 물어보고 싶다'는 상황을 가정해봅시다. 제미나이 앱을 사용하면, 사람이 직접 제미나이 화면에 접속해서 '오늘 서울 날씨 알려줘'라고 타이핑하고, 제미나이가 답변하면 사람이 눈으로 읽고 끝입니다. 반면 제미나이 API를 사용하면, 내 코드가 먼저 날씨 API에서 기온 데이터를 자동으로 가져온 다음, 그 데이터를 제미나이 API에 자동으로 전송하고, 제미나이가 답변을 내 코드에 돌려주면, 앱 화면에 예쁘게 표시됩니다. 사람이 일일이 타이핑할 필요가 없습니다. 이것이 오늘 여러분이 직접 만들어볼 구조입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700 font-semibold">
          상황: 오늘 서울 날씨를 AI에게 물어보고 싶다
        </p>
        <div className="bg-blue-50 rounded-xl p-5">
          <p className="font-semibold text-blue-700 mb-2">제미나이 앱을 쓰면</p>
          <CodeBlock>
{`나 → 제미나이 앱 화면 → 직접 타이핑
  → 제미나이가 답변
  → 내가 눈으로 읽고 끝`}
          </CodeBlock>
        </div>
        <div className="bg-purple-50 rounded-xl p-5">
          <p className="font-semibold text-purple-700 mb-2">제미나이 API를 쓰면</p>
          <CodeBlock>
{`내 코드 → 날씨 API에서 기온 자동 수집
       → 제미나이 API에 자동 전송
       → 답변을 코드가 받아서
       → 앱 화면에 예쁘게 표시!`}
          </CodeBlock>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 만들 것: 날씨 정보 앱",
    bg: "from-cyan-50 to-blue-50",
    script: "이제 오늘의 최종 과제를 안내하겠습니다. 오늘 여러분이 만들 것은 두 개의 API를 연결한 날씨 정보 앱입니다. 앱의 동작 순서는 다음과 같습니다. 첫째, 날씨 API에서 오늘의 날씨 정보를 가져옵니다. 둘째, 그 정보를 제미나이 API에 전달해서 재미있는 날씨 코멘트를 받아옵니다. 셋째, 결과를 화면에 보여줍니다. 예를 들어 '오늘 서울 날씨: 맑음 28도'에 대해 AI가 '오늘은 햇살이 쨍쨍합니다! 자외선 차단제를 꼭 바르세요'와 같은 코멘트를 자동으로 생성해주는 것입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">
          두 개의 API를 연결해서 <strong>날씨 정보 앱</strong>을 만듭니다.
        </p>
        <div className="space-y-3">
          {[
            { num: "1", text: "날씨 API에서 오늘의 날씨 정보를 가져온다", icon: "🌤️" },
            { num: "2", text: "제미나이 API에 전달해서 AI 코멘트를 받아온다", icon: "🤖" },
            { num: "3", text: "결과를 화면에 보여준다", icon: "📱" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div className="flex items-center gap-3">
                <span className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
                <p className="text-lg text-gray-700">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 rounded-xl p-5 text-green-300 font-mono text-base">
          <p>🌤️ 오늘 서울 날씨: 맑음, 28도</p>
          <p className="mt-2">🐱 코딩냥의 한마디:</p>
          <p>&quot;오늘은 햇살이 쨍쨍합니다! 자외선 차단제 꼭 바르세요~&quot;</p>
        </div>
      </div>
    ),
  },
  {
    title: "사용할 재료 (API)",
    bg: "from-teal-50 to-cyan-50",
    script: "오늘 사용할 API 두 가지를 정리하겠습니다. 첫째, 날씨 API입니다. OpenWeatherMap이라는 서비스의 API를 사용하며, 역할은 실시간 날씨 데이터를 가져오는 것입니다. API 키는 선생님이 미리 발급해두었습니다. 둘째, 제미나이 API입니다. Google의 AI 서비스인 제미나이의 API를 사용하며, 역할은 날씨 데이터를 기반으로 AI 코멘트를 자동 생성하는 것입니다. 여기서 API 키라는 것이 나오는데, API 키는 API를 사용할 수 있는 일종의 회원증이라고 생각하시면 됩니다. 이 키가 있어야 해당 서비스에 접근할 수 있습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">재료</th>
                <th className="p-4 text-left">역할</th>
                <th className="p-4 text-left">비고</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-white">
                <td className="p-4 font-semibold">🌤️ 날씨 API</td>
                <td className="p-4">날씨 데이터 가져오기</td>
                <td className="p-4">선생님이 키 발급 완료</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 font-semibold">🤖 제미나이 API</td>
                <td className="p-4">AI 코멘트 생성하기</td>
                <td className="p-4">선생님이 키 발급 완료</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">
            🔑 <strong>API 키(Key)</strong> = API를 사용할 수 있는 일종의 &ldquo;회원증&rdquo;
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "앱의 전체 흐름 정리",
    bg: "from-indigo-50 to-violet-50",
    script: "오늘 만들 앱의 전체 흐름을 코드 구조로 미리 살펴보겠습니다. 크게 세 단계입니다. 첫 번째, 날씨 API 호출입니다. requests 라이브러리를 사용하여 OpenWeatherMap API에 도시 이름과 API 키를 보내고, JSON 형태의 응답에서 온도와 날씨 설명을 추출합니다. 두 번째, 제미나이 API 호출입니다. 앞에서 가져온 날씨 데이터를 프롬프트에 넣어서 제미나이에게 코멘트를 요청합니다. 세 번째, 결과 출력입니다. 날씨 정보와 AI 코멘트를 화면에 보여줍니다. 이 세 단계를 실습 시간에 하나씩 직접 코드로 작성해볼 것입니다.",
    content: (
      <div className="flex flex-col gap-4">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-semibold text-blue-700 mb-2">1단계: 날씨 API 호출</p>
            <CodeBlock>
{`import requests
url = f"https://api.openweathermap.org/..."
data = requests.get(url).json()
temperature = data["main"]["temp"]`}
            </CodeBlock>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="font-semibold text-purple-700 mb-2">2단계: 제미나이 API 호출</p>
            <CodeBlock>
{`from google import genai
client = genai.Client(api_key="...")
response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=prompt
)`}
            </CodeBlock>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-semibold text-green-700 mb-2">3단계: 결과 출력</p>
            <CodeBlock>{`print(f"날씨: {description}, {temperature}도")
print(f"AI 코멘트: {response.text}")`}</CodeBlock>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, API는 내 프로그램이 다른 서비스에 요청을 보내고 결과를 받아오는 창구입니다. 키오스크가 손님과 주방을 연결해주는 것과 같은 원리입니다. 둘째, 제미나이 앱은 사람이 직접 사용하는 도구이고, 제미나이 API는 코드가 자동으로 사용하는 도구입니다. 자동화가 가능하다는 점이 가장 큰 차이입니다. 셋째, 오늘의 과제는 날씨 API와 제미나이 API 두 개를 연결하여 날씨 정보 앱을 만드는 것입니다. 다음 시간에 직접 코드를 작성하며 완성해보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>API</strong> = 내 프로그램이 다른 서비스에 요청을 보내고 결과를 받아오는 창구
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              제미나이 <strong>앱</strong> = 사람이 사용 | 제미나이 <strong>API</strong> = 프로그램이 사용
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              오늘의 과제: <strong>날씨 API + 제미나이 API</strong>를 연결한 날씨 정보 앱
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: "오늘 강의를 마치겠습니다. API의 개념, 제미나이 앱과 API의 차이, 그리고 오늘 만들 날씨 정보 앱의 구조를 이해하셨을 것입니다. 다음 시간에는 직접 코드를 작성하면서 날씨 API 연결, 제미나이 API 연결, 그리고 두 API를 합치는 과정을 실습해보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 날씨 정보 앱 코드 실습</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function APIBasicsGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
