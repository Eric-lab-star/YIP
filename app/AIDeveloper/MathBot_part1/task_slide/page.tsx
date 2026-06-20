"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-blue-50 to-indigo-50", script: "안녕하세요, 여러분. 오늘은 진짜로 작동하는 텔레그램 봇을 직접 만들어보는 실습을 진행하겠습니다. 봇을 만들고, 토큰을 받고, 메아리 봇을 실행해서 직접 대화까지 해보겠습니다. 총 3가지 미션을 약 25~30분에 걸쳐 수행합니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🤖</span><h1 className="text-5xl sm:text-6xl font-bold text-gray-800">메아리 봇 실습</h1><p className="text-2xl text-gray-500 mt-2">내 첫 텔레그램 봇 만들기</p></div>) },
  { title: "실습 전 준비 사항", bg: "from-yellow-50 to-amber-50", script: "준비물을 확인하겠습니다. 텔레그램 앱 설치와 계정이 필요합니다. python-telegram-bot 패키지를 설치해야 합니다. BotFather에서 받을 봇 토큰이 필요합니다.", content: (<div className="flex flex-col gap-6"><div className="space-y-4">{[{ icon: "📱", text: "텔레그램 앱 설치 및 계정" }, { icon: "📦", text: "python-telegram-bot 패키지 설치" }, { icon: "🔑", text: "BotFather에서 받은 봇 토큰" }].map((item, i) => (<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4"><span className="text-3xl">{item.icon}</span><p className="text-xl text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "미션 1: BotFather로 봇 만들기 (8~10분)", bg: "from-rose-50 to-orange-50", script: "첫 번째 미션입니다. 텔레그램 앱에서 BotFather를 검색하여 봇을 만들고 토큰을 발급받습니다. 순서는 다섯 단계입니다. BotFather 검색, /newbot 메시지 전송, 봇 이름 설정, 사용자명 설정(반드시 bot으로 끝나야 합니다), 토큰 수령 및 안전한 곳에 복사. 토큰은 비밀번호와 같으므로 절대 노출하지 마시기 바랍니다. 8~10분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> BotFather로 봇을 만들고 토큰을 발급받습니다.</p></div><div className="space-y-3">{["BotFather 검색 (파란 체크 공식 계정)", "/newbot 메시지 전송", "봇 이름(name) 설정", "사용자명(username) 설정 — 반드시 bot으로 끝나야 함", "토큰 수령 → 안전한 곳에 복사"].map((step, i) => (<div key={i} className="bg-white/70 rounded-xl p-3 flex items-start gap-3"><span className="bg-orange-400 text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</span><p className="text-lg text-gray-700">{step}</p></div>))}</div><div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400"><p className="text-base text-gray-700"><strong>⚠️ 토큰 = 비밀번호.</strong> 노출 시 /revoke로 재발급 가능.</p></div></div>) },
  { title: "미션 1 해설", bg: "from-rose-50 to-pink-50", script: "미션 1의 핵심 포인트입니다. BotFather는 텔레그램의 공식 봇 관리자입니다. 봇 생성, 토큰 발급, 설정 변경 등을 모두 BotFather를 통해 수행합니다. 토큰은 API 키와 동일한 보안 정보이므로, 코드를 공유하거나 깃허브에 올릴 때 반드시 제외해야 합니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">BotFather = 텔레그램 공식 봇 관리자</p></div><div className="bg-red-50 rounded-xl p-4"><p className="text-lg text-gray-600">토큰 = API 키와 동일한 보안 정보 → 코드 공유 시 반드시 제외</p></div></div>) },
  { title: "미션 2: 패키지 설치 (5분)", bg: "from-violet-50 to-purple-50", script: "두 번째 미션입니다. python-telegram-bot 패키지를 설치합니다. 터미널에서 pip install python-telegram-bot을 실행하여 에러 없이 설치가 완료되면 성공입니다. 5분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> python-telegram-bot 패키지 설치</p></div><CodeBlock>{`pip install python-telegram-bot`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">에러 없이 설치가 완료되면 성공!</p></div></div>) },
  { title: "미션 2 해설", bg: "from-violet-50 to-indigo-50", script: "미션 2의 핵심 포인트입니다. python-telegram-bot은 텔레그램 봇 API를 파이썬에서 쉽게 사용할 수 있게 해주는 라이브러리입니다. 이 패키지가 있어야 텔레그램 서버와 통신하는 코드를 작성할 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">python-telegram-bot = 텔레그램 봇 API를 파이썬에서 쉽게 사용하게 해주는 라이브러리</p></div></div>) },
  { title: "미션 3: 메아리 봇 실행 (12~15분)", bg: "from-teal-50 to-cyan-50", script: "세 번째 미션입니다. 핵심 미션입니다. 사용자가 보낸 메시지를 그대로 따라 답장하는 메아리 봇을 만듭니다. 빈칸에는 사용자가 보낸 메시지를 담고 있는 변수명을 넣으면 됩니다. 윗줄에서 update.message.text를 user_text에 담았으므로, reply_text의 인자로 user_text를 넣으면 됩니다. 코드를 저장하고 실행한 뒤, 텔레그램에서 내 봇을 검색하여 직접 대화해보시기 바랍니다. 12~15분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 메시지를 그대로 따라 답장하는 메아리 봇 완성</p></div><CodeBlock>{`from telegram import Update
from telegram.ext import (
    Application, MessageHandler,
    CommandHandler, filters, ContextTypes
)

TELEGRAM_TOKEN = "내 토큰 입력"

async def start(update, context):
    await update.message.reply_text(
        "안녕하세요! 메시지를 보내면 따라 말할게요."
    )

async def echo(update, context):
    user_text = update.message.text
    await update.message.reply_text(____)

app = Application.builder().token(TELEGRAM_TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(
    filters.TEXT & ~filters.COMMAND, echo
))
print("봇 실행 중...")
app.run_polling()`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">💡 빈칸: user_text (윗줄에서 받은 메시지 변수)</p></div></div>) },
  { title: "미션 3 해설", bg: "from-teal-50 to-emerald-50", script: "미션 3의 핵심 포인트입니다. start 함수는 /start 명령어에 반응하고, echo 함수는 일반 텍스트 메시지에 반응합니다. add_handler로 '어떤 메시지에 어떤 함수를 실행할지' 규칙을 등록합니다. run_polling은 봇을 계속 켜둔 상태로 만들어 메시지를 기다리게 합니다. 봇을 멈추려면 Ctrl+C를 누르면 됩니다. 이 기본 구조에서 echo 함수의 답장 부분만 바꾸면 다양한 봇을 만들 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-3"><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-700"><strong>start</strong> → /start 명령에 반응 | <strong>echo</strong> → 일반 메시지에 반응</p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-700"><strong>add_handler</strong> = 메시지-함수 규칙 등록 | <strong>run_polling</strong> = 대기 상태 유지</p></div><div className="bg-green-50 rounded-xl p-4"><p className="text-lg text-gray-600">echo의 답장 부분만 바꾸면 → 다양한 봇으로 발전 가능!</p></div></div></div>) },
  { title: "오늘의 실습 정리", bg: "from-orange-50 to-red-50", script: "오늘 3가지 미션을 모두 수행하셨습니다. BotFather로 내 봇을 만들고 토큰을 받았고, python-telegram-bot 패키지를 설치했고, 메시지를 따라 말하는 메아리 봇을 실행했습니다. 처음으로 나와 사용자를 잇는 대화의 통로를 직접 열어본 것입니다.", content: (<div className="flex flex-col gap-5"><div className="space-y-3">{[{ num: "1", text: "BotFather로 봇 만들고 토큰 받기", color: "bg-rose-100" }, { num: "2", text: "python-telegram-bot 패키지 설치", color: "bg-violet-100" }, { num: "3", text: "메아리 봇 실행 및 직접 대화", color: "bg-teal-100" }].map((item) => (<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}><span className="text-lg font-bold text-gray-500">미션 {item.num}</span><p className="text-lg text-gray-700">{item.text} ✅</p></div>))}</div></div>) },
  { title: "", bg: "from-blue-50 to-indigo-50", script: "오늘 실습을 마치겠습니다. 다음 시간에는 이 봇에 사진을 보는 눈을 달아서 수학 문제 사진을 인식하게 만들겠습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🎉</span><h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1><p className="text-xl text-gray-600 mt-4">다음 시간: 봇에 사진 인식 기능 추가</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p></div>) },
];

export default function MathBotPart1TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
