"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: "안녕하세요, 여러분. 오늘은 지난 시간에 배운 API 개념을 바탕으로, 날씨 API와 제미나이 API를 직접 코드로 연결하는 실습을 진행하겠습니다. 총 3가지 미션과 보너스 미션으로 구성되어 있으며, 약 25~30분이 소요됩니다. 빈칸을 채워가며 한 단계씩 진행하겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          <code className="text-orange-500">API</code> 실습 미션
        </h1>
        <p className="text-2xl text-gray-500 mt-2">날씨 정보 앱 완성하기</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "실습을 시작하기 전에 준비물을 확인하겠습니다. 첫째, requests 패키지가 설치되어 있어야 합니다. pip install requests 명령어로 설치할 수 있습니다. 둘째, google-genai 패키지도 설치해야 합니다. pip install google-genai 명령어를 사용합니다. 셋째, 선생님이 나눠주신 날씨 API 키와 제미나이 API 키를 확인해주시기 바랍니다. 넷째, 새 파이썬 파일을 하나 열어두시기 바랍니다. 모든 준비가 확인되면 첫 번째 미션을 시작하겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">준비물을 확인합니다.</p>
        <div className="space-y-3">
          {[
            { icon: "📦", text: "requests 패키지 설치 (pip install requests)" },
            { icon: "📦", text: "google-genai 패키지 설치 (pip install google-genai)" },
            { icon: "🔑", text: "날씨 API 키와 제미나이 API 키 확인" },
            { icon: "📄", text: "새 파이썬 파일 (.py) 하나 열어두기" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-lg text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "미션 1: 날씨 API 연결하기 (8~10분)",
    bg: "from-blue-50 to-sky-50",
    script: "첫 번째 미션입니다. OpenWeatherMap API에 요청을 보내서 날씨 데이터를 받아오겠습니다. 화면의 코드 템플릿에서 빈칸을 채워주시기 바랍니다. 첫 번째 빈칸에는 도시 이름을 담은 변수 city가, 두 번째 빈칸에는 API 키를 담은 변수 weather_api_key가 들어갑니다. data에서 온도를 가져오는 키는 영어로 온도를 뜻하는 temp이고, 날씨 설명을 가져오는 키는 description입니다. 완성된 코드를 실행하면 도시명, 온도, 날씨 상태가 출력됩니다. 다 하신 분들은 city를 Busan이나 Tokyo 등으로 바꿔서 실행해보시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> OpenWeatherMap API에서 날씨 데이터를 받아옵니다.</p>
        </div>
        <CodeBlock>
{`import requests

weather_api_key = "여기에 날씨 API 키 입력"
city = "Seoul"

url = f"https://api.openweathermap.org/data/2.5/weather?q={____}&appid={____}&units=metric"

response = requests.get(url)
data = response.json()

temperature = data["main"]["___"]
description = data["weather"][0]["___"]

print(f"도시: {city}")
print(f"온도: {temperature}도")
print(f"날씨: {description}")`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4 text-base text-gray-600">
          <p>• 첫 번째/두 번째 빈칸 → 도시 이름 변수, API 키 변수</p>
          <p>• 온도 키 → 영어로 &ldquo;온도&rdquo; 🌡️ | 설명 키 → 영어로 &ldquo;설명&rdquo;</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-blue-50 to-indigo-50",
    script: "미션 1의 핵심 포인트를 정리하겠습니다. 여러분이 방금 한 것은 requests 라이브러리를 사용하여 외부 API 서버에 HTTP GET 요청을 보내고, JSON 형태의 응답 데이터를 파이썬 딕셔너리로 변환한 것입니다. URL에 포함된 q 파라미터에 도시 이름을, appid 파라미터에 API 키를 넣어서 어떤 데이터를 요청하는지 서버에 알려주었습니다. 응답에서 온도는 data의 main 안에 있는 temp 키로, 날씨 설명은 weather 배열의 첫 번째 요소 안에 있는 description 키로 접근합니다. 이것이 API를 사용하는 가장 기본적인 패턴입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>requests.get(url)</strong> → 외부 서버에 GET 요청을 보내고 응답을 받습니다.
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>.json()</strong> → JSON 응답을 파이썬 딕셔너리로 변환합니다.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-base text-gray-600">
              URL 파라미터: <code className="bg-gray-200 px-1 rounded">q=도시명</code>, <code className="bg-gray-200 px-1 rounded">appid=API키</code> → 서버에 &ldquo;어떤 데이터를 원하는지&rdquo; 전달
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 제미나이 API 코멘트 만들기 (8~10분)",
    bg: "from-purple-50 to-violet-50",
    script: "두 번째 미션입니다. 이번에는 제미나이 API에 날씨 데이터를 전달하여 AI 코멘트를 받아오겠습니다. 화면의 코드 템플릿에서 프롬프트의 빈칸을 채워주시기 바랍니다. 첫 번째 빈칸에는 도시 이름 변수 city가, 두 번째에는 날씨 설명 변수 description이, 세 번째에는 온도 변수 temperature가 들어갑니다. 실행하면 제미나이가 날씨에 맞는 재미있는 코멘트를 생성해줍니다. 완료하신 분들은 프롬프트의 말투를 격식체로나 영어로 바꿔서 결과가 어떻게 달라지는지 실험해보시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 제미나이 API에 날씨 데이터를 전달하여 AI 코멘트를 생성합니다.</p>
        </div>
        <CodeBlock>
{`from google import genai

client = genai.Client(api_key="제미나이 API 키")

temperature = 28
description = "clear sky"

prompt = f"""
오늘 {____}의 날씨는 {____}이고, 기온은 {____}도야.
이 날씨에 어울리는 짧고 재미있는 코멘트를
2~3문장으로 써줘.
"""

response = client.models.generate_content(
    model="gemini-3.5-flash", contents=prompt)
print(response.text)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4 text-base text-gray-600">
          <p>빈칸: 도시 이름, 날씨 설명, 온도 변수를 순서대로 넣으세요.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-purple-50 to-pink-50",
    script: "미션 2의 핵심 포인트입니다. 여러분이 한 것은 f-string을 사용하여 변수 값을 프롬프트 문자열 안에 삽입하고, 그 프롬프트를 제미나이 API에 전송하여 AI의 응답을 받아온 것입니다. 여기서 중요한 점은 프롬프트에 구체적인 데이터를 포함시켜야 AI가 정확한 답변을 할 수 있다는 것입니다. 단순히 날씨 코멘트 써줘라고 하면 AI는 어떤 날씨인지 모르기 때문에 일반적인 답변만 합니다. 하지만 서울의 날씨는 clear sky이고 28도라는 구체적 정보를 주면, 그에 맞는 맞춤 코멘트를 생성합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>f-string</strong>으로 변수 값을 프롬프트에 삽입 → AI에게 <strong>구체적인 데이터</strong>를 전달
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4">
              <p className="font-semibold text-red-700 mb-2">데이터 없는 프롬프트</p>
              <p className="text-gray-600">&ldquo;날씨 코멘트 써줘&rdquo; → 일반적 답변</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">데이터 있는 프롬프트</p>
              <p className="text-gray-600">&ldquo;서울, clear sky, 28도&rdquo; → 맞춤 코멘트</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 두 API 합쳐서 완성하기 (8~10분)",
    bg: "from-emerald-50 to-green-50",
    script: "세 번째 미션입니다. 미션 1과 미션 2를 하나로 합쳐서 날씨 정보 앱을 완성하겠습니다. 이것이 오늘의 핵심 과제입니다. 화면의 코드 템플릿에서 세 개의 빈칸을 채워주시기 바랍니다. genai.Client의 api_key에는 제미나이 API 키 변수를, generate_content의 contents에는 위에서 만든 prompt 변수를, 마지막 print의 빈칸에는 AI 코멘트를 담은 comment 변수를 넣으면 됩니다. 이 코드의 핵심은 날씨 API에서 데이터를 가져오고, 그 데이터를 제미나이 API에 전달하고, 결과를 출력하는 세 단계가 하나의 코드로 연결된다는 것입니다. 마치 심부름꾼이 날씨 가게에서 정보를 사온 뒤 작가 가게로 가서 코멘트를 받아오는 것과 같습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 미션 1 + 미션 2를 합쳐 날씨 정보 앱을 완성합니다.</p>
        </div>
        <CodeBlock>
{`import requests
from google import genai

weather_api_key = "날씨 API 키"
gemini_api_key  = "제미나이 API 키"

city = "Seoul"
url = f"https://api.openweathermap.org/..."
data = requests.get(url).json()

temperature = data["main"]["temp"]
description = data["weather"][0]["description"]

client = genai.Client(api_key=____)
prompt = f"오늘 {city} 날씨는 {description}, {temperature}도. 코멘트 써줘."
comment = client.models.generate_content(
    model="gemini-3.5-flash", contents=____).text

print(f"🌤️ {city}: {description}, {temperature}도")
print(f"🐱 코멘트: {____}")`}
        </CodeBlock>
        <div className="bg-amber-50 rounded-xl p-4 text-base text-gray-600">
          <p>핵심 비유: 내 코드 = 두 가게를 연결하는 <strong>심부름꾼</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-emerald-50 to-teal-50",
    script: "미션 3의 핵심 포인트를 정리하겠습니다. 여러분이 완성한 코드는 두 개의 API를 연결하는 파이프라인입니다. 날씨 API에서 받아온 데이터가 제미나이 API의 입력으로 사용되고, 제미나이의 출력이 최종 결과로 화면에 표시됩니다. 이것이 API를 활용한 프로그래밍의 핵심 패턴입니다. 하나의 API 결과를 다른 API의 입력으로 연결하면, 단독으로는 불가능한 복합적인 기능을 만들 수 있습니다. 이 패턴은 앞으로 여러분이 더 복잡한 AI 애플리케이션을 만들 때에도 반복적으로 사용하게 될 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>API 파이프라인</strong>: 한 API의 출력 → 다른 API의 입력으로 연결
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 text-xl text-gray-600">
          <span className="bg-blue-100 rounded-lg px-4 py-2">날씨 API</span>
          <span>→</span>
          <span className="bg-purple-100 rounded-lg px-4 py-2">제미나이 API</span>
          <span>→</span>
          <span className="bg-green-100 rounded-lg px-4 py-2">결과 출력</span>
        </div>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-lg text-gray-600">
            이 패턴은 앞으로 더 복잡한 AI 애플리케이션을 만들 때에도 반복적으로 사용됩니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "보너스 미션 (선택)",
    bg: "from-violet-50 to-purple-50",
    script: "빠르게 완료하신 분들을 위한 보너스 미션입니다. 첫째, 도시 입력 받기 — city 변수를 input 함수로 바꿔서, 실행할 때마다 다른 도시를 입력할 수 있게 해보세요. 둘째, 말투 실험 — 프롬프트의 말투를 격식체나 영어 등으로 바꿔서 결과가 어떻게 달라지는지 비교해보세요. 셋째, 이모지 추가 — 날씨 상태에 따라 해, 비, 눈 이모지를 다르게 출력해보세요. 이 미션들은 선택 사항이므로, 시간이 남는 분들만 도전하시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>시간이 남는 분들을 위한 추가 미션</strong></p>
        </div>
        <div className="space-y-3">
          {[
            { icon: "🏙️", text: "city = input(\"도시 이름: \")으로 바꿔서 다양한 도시 테스트" },
            { icon: "🗣️", text: "프롬프트 말투 변경 (격식체, 영어 등) → 결과 비교" },
            { icon: "🎨", text: "날씨 상태에 따라 다른 이모지 출력 (☀️🌧️❄️)" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
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
    script: "오늘 실습을 정리하겠습니다. 미션 1에서는 날씨 API로 실시간 날씨 데이터를 가져오는 방법을 익혔습니다. 미션 2에서는 제미나이 API로 날씨 코멘트를 자동 생성하는 방법을 익혔습니다. 미션 3에서는 두 API를 연결하여 하나의 앱으로 합치는 파이프라인을 완성했습니다. 처음으로 두 가지 API를 연결해서 작동하는 앱을 만든 것입니다. 다음 시간에는 이 앱에 Streamlit UI를 입혀서 실제로 사용할 수 있는 웹 앱으로 완성해보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "날씨 API로 실시간 날씨 데이터 가져오기", color: "bg-blue-100" },
            { num: "2", text: "제미나이 API로 AI 코멘트 자동 생성", color: "bg-purple-100" },
            { num: "3", text: "두 API를 연결하여 날씨 정보 앱 완성", color: "bg-green-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-600 text-center mt-2">
          다음 시간: Streamlit UI를 입혀서 웹 앱으로 완성
        </p>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: "오늘 실습을 마치겠습니다. 처음으로 두 가지 API를 연결해서 작동하는 앱을 만들었습니다. 다음 시간에는 이 앱에 Streamlit UI를 입혀서 실제로 사용할 수 있는 웹 앱으로 발전시켜보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">날씨 API + 제미나이 API 연결 완료! ✅</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function APIBasicsTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
