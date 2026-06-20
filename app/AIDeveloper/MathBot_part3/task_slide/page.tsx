"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: "안녕하세요, 여러분. 오늘은 지난 두 차시에 걸쳐 따로따로 만들어온 부품들을 하나로 합치는 실습을 진행하겠습니다. 16차시의 봇 코드와 17차시의 풀이 코드를 한 파일에 모으고, 사진 핸들러를 추가하여 완성형 수학 풀이 봇을 만들 것입니다. 총 3가지 미션을 약 25~30분에 걸쳐 수행합니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🤖</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          수학 풀이 봇 완성 실습
        </h1>
        <p className="text-2xl text-gray-500 mt-2">사진 핸들러 추가하기</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, python-telegram-bot, google-genai, Pillow 패키지가 설치되어 있어야 합니다. 둘째, 16차시 봇 코드와 17차시 풀이 코드를 준비해주시기 바랍니다. 셋째, 봇 토큰과 제미나이 API 키가 필요합니다. 넷째, 테스트용 수학 문제 사진을 미리 준비해주시기 바랍니다. 다섯째, 빈칸이 포함된 코드 템플릿을 열어두시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "python-telegram-bot, google-genai, Pillow 설치 확인" },
            { icon: "📄", text: "16차시 봇 코드 + 17차시 풀이 코드 준비" },
            { icon: "🔑", text: "봇 토큰, 제미나이 API 키 준비" },
            { icon: "📸", text: "테스트용 수학 문제 사진 준비" },
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
    title: "미션 1: 코드 합치기 준비 (5분)",
    bg: "from-blue-50 to-indigo-50",
    script: "첫 번째 미션입니다. 우리가 합칠 두 부품을 정리하겠습니다. 16차시에서 만든 봇 코드는 텔레그램에서 메시지를 받아 답장하는 부분이고, 17차시에서 만든 풀이 코드는 사진을 AI에 보내 풀이를 만드는 부분입니다. 이 둘을 하나의 .py 파일에 모으는 것이 첫걸음입니다. 완성 봇에 들어갈 부품을 확인합니다. 연결 도구(텔레그램, 제미나이, PIL 임포트), 열쇠(봇 토큰, API 키), 풀이 프롬프트, /start 인사 기능, 그리고 오늘 새로 추가할 사진 핸들러입니다. 5분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 합칠 두 부품을 정리하고 구조를 파악합니다.</p>
        </div>
        <div className="space-y-3">
          <p className="text-xl text-gray-700 font-semibold">완성 봇에 들어갈 부품들</p>
          {[
            { icon: "🔌", text: "연결 도구: 텔레그램, 제미나이, PIL 임포트" },
            { icon: "🔑", text: "열쇠: 봇 토큰, 제미나이 API 키" },
            { icon: "📋", text: "풀이 프롬프트: 17차시에서 만든 명령서 재사용" },
            { icon: "👋", text: "/start 인사 기능" },
            { icon: "🌟", text: "사진 핸들러: 오늘 새로 추가할 핵심 부품!" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-lg text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-blue-50 to-cyan-50",
    script: "미션 1의 핵심 포인트입니다. 우리가 기능을 처음부터 하나로 뭉쳐서 만들지 않고, 따로따로 만든 다음 마지막에 합친 이유가 있습니다. 이런 방식을 '모듈식 개발'이라고 합니다. 모듈식 개발의 장점은 세 가지입니다. 첫째, 각 부품을 따로 테스트할 수 있어서 오류를 찾기 쉽습니다. 둘째, 문제가 생겼을 때 어느 부품에서 잘못되었는지 빠르게 파악할 수 있습니다. 셋째, 17차시의 풀이 기능을 오늘 그대로 재사용하는 것처럼, 한 번 잘 만든 부품은 계속 활용할 수 있습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트: 모듈식 개발</p>
        <div className="space-y-4">
          {[
            { icon: "🧪", title: "테스트하기 쉽다", desc: "각 부품을 따로 만들면, 그 부품 하나만 콕 집어서 확인 가능" },
            { icon: "🔍", title: "오류를 찾기 쉽다", desc: "문제 발생 시 '어느 부품에서 잘못됐는지' 빠르게 파악" },
            { icon: "♻️", title: "다시 쓰기 좋다", desc: "17차시 풀이 기능을 오늘 그대로 재사용하는 것이 좋은 예" },
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
      </div>
    ),
  },
  {
    title: "미션 2: 사진 핸들러 추가 (12~15분)",
    bg: "from-violet-50 to-purple-50",
    script: "두 번째 미션입니다. 오늘의 핵심인 사진 핸들러를 추가하겠습니다. 화면의 코드에서 두 개의 빈칸을 채워주시기 바랍니다. 첫 번째 빈칸에는 AI에게 줄 풀이 명령서, 즉 위에서 정의한 변수 이름이 들어갑니다. s로 시작하는 변수입니다. 두 번째 빈칸에는 AI가 만들어준 풀이 결과 텍스트가 들어갑니다. response에서 텍스트만 꺼내는 방법을 생각해보시기 바랍니다. 참고로, photo[-1]은 텔레그램이 사진을 여러 크기로 전송할 때 그중 가장 고화질인 마지막 것을 선택한다는 의미입니다. 12~15분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 사진을 받아 풀이를 답장하는 핸들러를 완성합니다.</p>
        </div>
        <CodeBlock>
          {`async def handle_photo(update, context):
    await update.message.reply_text(
        "문제를 푸는 중이에요..."
    )

    photo_file = await update.message.photo[
        -1
    ].get_file()
    await photo_file.download_to_drive(
        "received.jpg"
    )

    image = PIL.Image.open("received.jpg")
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[____, image]
    )

    await update.message.reply_text(____)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4 space-y-2">
          <p className="text-base text-gray-600"><strong>힌트 1:</strong> 첫 번째 빈칸 = 풀이 프롬프트 변수 (s로 시작)</p>
          <p className="text-base text-gray-600"><strong>힌트 2:</strong> 두 번째 빈칸 = response에서 텍스트 추출</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-violet-50 to-indigo-50",
    script: "미션 2의 핵심 포인트를 정리하겠습니다. 첫 번째 빈칸의 정답은 solve_prompt입니다. 이것은 위에서 정의한 풀이 명령서 변수로, AI에게 '어떻게 풀이를 만들어야 하는지' 알려주는 프롬프트입니다. 두 번째 빈칸의 정답은 response.text입니다. 제미나이 API의 응답 객체에서 텍스트 내용만 추출하는 속성입니다. 사진 핸들러의 전체 흐름은 네 단계입니다. 안내 메시지 전송, 사진 다운로드, AI에게 풀이 요청, 결과 답장. 사용자에게 '잠시만 기다려주세요'라는 안내 메시지를 먼저 보내는 것은 UX(사용자 경험) 관점에서 중요한 배려입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-lg text-gray-700">
              빈칸 1: <code className="bg-gray-200 px-2 py-1 rounded">solve_prompt</code> — 풀이 명령서 변수
            </p>
            <p className="text-lg text-gray-700 mt-2">
              빈칸 2: <code className="bg-gray-200 px-2 py-1 rounded">response.text</code> — 응답에서 텍스트 추출
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-lg text-gray-700 font-semibold mb-2">사진 핸들러의 4단계</p>
            <ol className="text-base text-gray-600 space-y-1">
              <li>1. 안내 메시지 전송 (&ldquo;잠시만 기다려주세요...&rdquo;)</li>
              <li>2. 사진 다운로드 (received.jpg)</li>
              <li>3. AI에게 풀이 요청 (프롬프트 + 이미지)</li>
              <li>4. 결과 답장</li>
            </ol>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 실제 테스트 (8~10분)",
    bg: "from-emerald-50 to-green-50",
    script: "세 번째 미션입니다. 봇을 실행하고 실제로 작동하는지 확인해보겠습니다. 터미널에서 python 파일이름.py를 실행하면 '수학 풀이 봇이 실행 중입니다'라는 메시지가 나타납니다. 텔레그램을 열어 봇에게 수학 문제 사진을 보내보시기 바랍니다. 사진을 보내자마자 '잠시만 기다려주세요' 메시지가 먼저 오는지, 그리고 잠시 후 단계별 풀이와 정답이 답장으로 오는지 확인해주시기 바랍니다. 문제가 발생할 경우 자주 나는 오류 세 가지를 확인해보시기 바랍니다. 핸들러 등록 누락, 토큰과 키 혼동, 들여쓰기 오류입니다. 8~10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 봇을 실행하고 실제로 사진을 보내 테스트합니다.</p>
        </div>
        <CodeBlock>{`python 파일이름.py`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• &ldquo;잠시만 기다려주세요...&rdquo; 메시지가 먼저 왔는가?</li>
            <li>• 단계별 풀이와 &ldquo;정답:&rdquo;이 답장으로 왔는가?</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-xl p-5">
          <p className="font-semibold text-red-700 mb-2">자주 나는 오류</p>
          <ul className="text-base text-gray-600 space-y-1">
            <li>• 핸들러 등록 누락: MessageHandler(filters.PHOTO, ...) 확인</li>
            <li>• 토큰/키 혼동: 봇 토큰과 API 키 자리 확인</li>
            <li>• 들여쓰기 오류: async def 안쪽 줄 정렬 확인</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-emerald-50 to-teal-50",
    script: "미션 3의 핵심 포인트입니다. 여러분이 방금 테스트한 것은 직접 만든 부품들이 하나로 조립되어 실제로 작동하는 순간입니다. 텔레그램에서 사진을 보내면 봇이 사진을 받아 파일로 저장하고, AI에게 전달하여 풀이를 생성한 뒤, 그 결과를 다시 사용자에게 답장으로 보내는 전체 파이프라인이 완성된 것입니다. 이것은 여러분이 직접 부품을 만들고 조립해서 세상에 내놓은 첫 작품입니다. 친구가 사진을 보내고 풀이를 받는 모습을 보면서, 자신이 만든 것이 실제로 작동한다는 성취감을 느껴보시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-lg text-gray-700 font-semibold mb-3">완성된 파이프라인</p>
            <div className="flex flex-wrap items-center gap-2 text-base text-gray-600">
              <span className="bg-blue-100 px-3 py-1 rounded-full">사진 전송</span>
              <span>→</span>
              <span className="bg-green-100 px-3 py-1 rounded-full">파일 저장</span>
              <span>→</span>
              <span className="bg-purple-100 px-3 py-1 rounded-full">AI 풀이</span>
              <span>→</span>
              <span className="bg-orange-100 px-3 py-1 rounded-full">답장 전송</span>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-5">
            <p className="text-lg text-gray-700">
              여러분이 직접 만들고 조립한 <strong>첫 번째 완성형 앱</strong>입니다!
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 3가지 미션을 모두 수행하셨습니다. 정리하겠습니다. 미션 1에서는 16차시와 17차시의 코드를 한 파일에 모으는 구조를 파악했습니다. 미션 2에서는 사진 핸들러를 추가하여 사진을 받아 풀이를 답장하는 핵심 기능을 완성했습니다. 미션 3에서는 실제 텔레그램에서 봇을 테스트하여 전체 파이프라인이 작동하는 것을 확인했습니다. 이것은 모듈식 개발의 실제 적용 사례이기도 합니다. 다음 시간에는 이 경험을 바탕으로 영어 대화 연습 앱을 만들어보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "코드 합치기 준비 (구조 파악)", color: "bg-blue-100" },
            { num: "2", text: "사진 핸들러 추가 (핵심 기능 완성)", color: "bg-violet-100" },
            { num: "3", text: "실제 테스트 (전체 파이프라인 확인)", color: "bg-emerald-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">다음 시간: 영어 대화 연습 앱 만들기</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: "오늘 실습을 마치겠습니다. 16차시 봇과 17차시 풀이 기능을 조립하여 사진을 보내면 풀이를 답장해주는 완성형 봇을 만들었습니다. 이 경험을 바탕으로 앞으로 더 다양한 AI 앱에 도전해보시기 바랍니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 영어 대화 연습 앱</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function MathBot3TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
