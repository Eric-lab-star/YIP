"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-blue-50 to-indigo-50", script: "안녕하세요, 여러분. 오늘은 진짜로 작동하는 텔레그램 봇을 직접 만들어보는 실습을 진행하겠습니다. 봇을 만들고, 토큰을 받고, 메아리 봇을 실행해서 직접 대화까지 해보겠습니다. 총 3가지 미션을 약 25~30분에 걸쳐 수행합니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><h1 className="text-5xl sm:text-6xl font-bold text-gray-800">메아리 봇 실습</h1><p className="text-2xl text-gray-500 mt-2">내 첫 텔레그램 봇 만들기</p></div>) },
  { title: "실습 전 준비 사항", bg: "from-yellow-50 to-amber-50", script: "준비물을 확인하겠습니다. 텔레그램 앱 설치와 계정이 필요합니다. python-telegram-bot과 python-dotenv, 두 개의 패키지를 설치해야 합니다. BotFather에서 받을 봇 토큰이 필요합니다. 그리고 그 토큰을 적어둘 점 env 파일을 만들 것입니다.", content: (<div className="flex flex-col gap-6"><div className="space-y-4">{[{ text: "텔레그램 앱 설치 및 계정" }, { text: "python-telegram-bot, python-dotenv 패키지 설치" }, { text: "BotFather에서 받은 봇 토큰" }, { text: "토큰을 적어둘 .env 파일" }].map((item, i) => (<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4"><p className="text-xl text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "미션 1: BotFather로 봇 만들기 (8~10분)", bg: "from-rose-50 to-orange-50", script: "첫 번째 미션입니다. 텔레그램 앱에서 BotFather를 검색하여 봇을 만들고 토큰을 발급받습니다. 순서는 다섯 단계입니다. BotFather 검색, /newbot 메시지 전송, 봇 이름 설정, 사용자명 설정(반드시 bot으로 끝나야 합니다), 토큰 수령 및 안전한 곳에 복사. 토큰은 비밀번호와 같으므로 절대 노출하지 마시기 바랍니다. 8~10분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> BotFather로 봇을 만들고 토큰을 발급받습니다.</p></div><div className="space-y-3">{["BotFather 검색 (파란 체크 공식 계정)", "/newbot 메시지 전송", "봇 이름(name) 설정", "사용자명(username) 설정 — 반드시 bot으로 끝나야 함", "토큰 수령 → 안전한 곳에 복사"].map((step, i) => (<div key={i} className="bg-white/70 rounded-xl p-3 flex items-start gap-3"><span className="bg-orange-400 text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</span><p className="text-lg text-gray-700">{step}</p></div>))}</div><div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400"><p className="text-base text-gray-700"><strong>토큰 = 비밀번호.</strong> 노출 시 /revoke로 재발급 가능.</p></div></div>) },
  { title: "미션 1 해설", bg: "from-rose-50 to-pink-50", script: "미션 1의 핵심 포인트입니다. BotFather는 텔레그램의 공식 봇 관리자입니다. 봇 생성, 토큰 발급, 설정 변경 등을 모두 BotFather를 통해 수행합니다. 토큰은 API 키와 동일한 보안 정보이므로, 코드를 공유하거나 깃허브에 올릴 때 반드시 제외해야 합니다. 그러면 어떻게 제외할까요? 다음 미션에서 점 env 파일을 만들어 토큰을 코드 밖으로 빼내겠습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">BotFather = 텔레그램 공식 봇 관리자</p></div><div className="bg-red-50 rounded-xl p-4"><p className="text-lg text-gray-600">토큰 = API 키와 동일한 보안 정보 → 코드 공유 시 반드시 제외</p></div></div>) },
  { title: "미션 2: 패키지 설치 + 토큰 숨기기 (5~7분)", bg: "from-violet-50 to-purple-50", script: "두 번째 미션입니다. 먼저 패키지 두 개를 설치합니다. pip install python-telegram-bot python-dotenv를 한 번에 실행하면 됩니다. 그다음이 중요합니다. 봇 코드를 저장할 폴더에 점 env라는 이름의 파일을 새로 만듭니다. 이름 앞에 점이 반드시 붙어야 합니다. 그 안에 TELEGRAM_TOKEN 등호 그리고 받은 토큰을 한 줄로 적습니다. 등호 앞뒤에 띄어쓰기를 넣으면 안 됩니다. 점 env 파일은 반드시 파이 파일과 같은 폴더에 있어야 합니다. 다른 폴더에 있으면 찾지 못합니다. 5~7분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 패키지 설치 + 토큰을 <code>.env</code>에 숨기기</p></div><CodeBlock>{`pip install python-telegram-bot python-dotenv`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-base text-gray-600 mb-2"><strong>.env</strong> 파일을 <strong>.py와 같은 폴더</strong>에 만들고 한 줄 작성:</p></div><CodeBlock>{`TELEGRAM_TOKEN=BotFather에서 받은 토큰`}</CodeBlock><div className="bg-red-50 rounded-xl p-4"><p className="text-base text-gray-700">이름 앞에 <strong>점(.)</strong> 필수 | <strong>=</strong> 앞뒤 띄어쓰기 금지</p></div></div>) },
  { title: "미션 2 해설", bg: "from-violet-50 to-indigo-50", script: "미션 2의 핵심 포인트입니다. python-telegram-bot은 텔레그램 봇 API를 파이썬에서 쉽게 사용할 수 있게 해주는 라이브러리입니다. python-dotenv는 점 env 파일에 적어둔 값을 코드에서 꺼내 쓰게 해주는 도구입니다. 점 env를 쓰는 이유는 이렇습니다. 코드는 친구에게 보여주거나 인터넷에 올릴 일이 많은데, 토큰을 코드 안에 적어두면 코드를 보여주는 순간 열쇠까지 함께 넘어갑니다. 점 env는 그 열쇠만 따로 담아두는 비밀 서랍입니다. 코드는 서랍에서 열쇠를 꺼내오라고만 말하고, 서랍 자체는 절대 공유하지 않습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">python-telegram-bot = 텔레그램 봇 API를 파이썬에서 쉽게 사용하게 해주는 라이브러리</p></div><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">python-dotenv = <code>.env</code>에 적어둔 값을 코드에서 꺼내 쓰게 해주는 도구</p></div><div className="bg-green-50 rounded-xl p-5"><p className="text-lg text-gray-700"><strong><code>.env</code> = 비밀 서랍.</strong> 코드(<code>.py</code>)는 공유해도 되지만, 서랍은 절대 공유하지 않습니다.</p></div></div>) },
  { title: "미션 3: 메아리 봇 실행 (12~15분)", bg: "from-teal-50 to-cyan-50", script: "세 번째 미션입니다. 핵심 미션입니다. 사용자가 보낸 메시지를 그대로 따라 답장하는 메아리 봇을 만듭니다. 코드에 토큰을 직접 적지 않는다는 점에 주목해주시기 바랍니다. load_dotenv가 점 env를 읽어오고, os.environ이 그 안에서 토큰을 꺼내옵니다. 두 함수 모두 update.effective_message로 메시지를 먼저 꺼낸 뒤, if message is None으로 막아주고 사용합니다. 빈칸에는 사용자가 보낸 메시지를 담고 있는 변수명을 넣으면 됩니다. 윗줄에서 message.text를 user_text에 담았으므로, reply_text의 인자로 user_text를 넣으면 됩니다. 코드를 저장하고 실행한 뒤, 텔레그램에서 내 봇을 검색하여 직접 대화해보시기 바랍니다. 만약 KeyError 오류가 난다면 점 env 파일의 위치와 이름, 철자를 확인해주시기 바랍니다. 12~15분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 메시지를 그대로 따라 답장하는 메아리 봇 완성</p></div><CodeBlock>{`import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import (
    Application, MessageHandler,
    CommandHandler, filters, ContextTypes
)

load_dotenv()
TELEGRAM_TOKEN = os.environ["TELEGRAM_TOKEN"]

async def start(update, context):
    message = update.effective_message
    if message is None:
        return
    await message.reply_text(
        "안녕하세요! 메시지를 보내면 따라 말할게요."
    )

async def echo(update, context):
    message = update.effective_message
    if message is None:
        return
    user_text = message.text
    await message.reply_text(____)

app = Application.builder().token(TELEGRAM_TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(
    filters.TEXT & ~filters.COMMAND, echo
))
print("봇 실행 중...")
app.run_polling()`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">빈칸: user_text (윗줄에서 받은 메시지 변수)</p></div><div className="bg-red-50 rounded-xl p-4"><p className="text-base text-gray-700"><strong>KeyError가 난다면?</strong> <code>.env</code> 위치 / 파일 이름 / 철자 확인</p></div></div>) },
  { title: "미션 3 해설", bg: "from-teal-50 to-emerald-50", script: "미션 3의 핵심 포인트입니다. start 함수는 /start 명령어에 반응하고, echo 함수는 일반 텍스트 메시지에 반응합니다. add_handler로 '어떤 메시지에 어떤 함수를 실행할지' 규칙을 등록합니다. 여기서 filters.TEXT 앤드 물결표 filters.COMMAND는 '글자이면서 명령어는 아닌 것'만 echo로 보낸다는 뜻입니다. 앤드는 그리고, 물결표는 아님을 뜻합니다. slash start도 사실은 글자이기 때문에, 물결표 filters.COMMAND를 빼면 메아리 봇이 slash start까지 따라 말하게 됩니다. 또 하나, update.message가 아니라 update.effective_message를 쓴 이유입니다. update.message는 사용자가 메시지를 수정했을 때 비어 있어서 봇이 조용히 아무 반응도 하지 않게 됩니다. effective_message는 이번에 실제로 내용이 들어 있는 칸을 알아서 골라줍니다. 에디터에 노란 줄로 text is not a known attribute of None 경고가 뜨는 것도 같은 이유이며, if message is None으로 막아주면 사라집니다. run_polling은 봇을 계속 켜둔 상태로 만듭니다. 봇을 멈추려면 Ctrl+C를 누르면 됩니다. 이 기본 구조에서 echo 함수의 답장 부분만 바꾸면 다양한 봇을 만들 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-3"><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-700"><strong>start</strong> → /start 명령에 반응 | <strong>echo</strong> → 일반 메시지에 반응</p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-700"><strong>add_handler</strong> = 메시지-함수 규칙 등록 | <strong>run_polling</strong> = 대기 상태 유지</p></div><div className="bg-amber-50 rounded-xl p-4"><p className="text-lg text-gray-700"><strong>filters.TEXT &amp; ~filters.COMMAND</strong> = &quot;글자인데 명령어는 아닌 것&quot;</p><p className="text-base text-gray-600 mt-1"><code>&amp;</code>=그리고, <code>~</code>=아님 | 이걸 빼면 <code>/start</code>까지 따라 말합니다</p></div><div className="bg-purple-50 rounded-xl p-4"><p className="text-lg text-gray-700"><strong>update.effective_message</strong> = 이번에 실제로 내용이 든 메시지</p><p className="text-base text-gray-600 mt-1"><code>update.message</code>만 쓰면 <strong>수정된 메시지를 놓칩니다</strong> | 노란 줄 경고도 <code>if message is None</code>으로 해결</p></div><div className="bg-green-50 rounded-xl p-4"><p className="text-lg text-gray-600">echo의 답장 부분만 바꾸면 → 다양한 봇으로 발전 가능!</p></div></div></div>) },
  { title: "오늘의 실습 정리", bg: "from-orange-50 to-red-50", script: "오늘 3가지 미션을 모두 수행하셨습니다. BotFather로 내 봇을 만들고 토큰을 받았고, 패키지를 설치한 뒤 토큰을 점 env에 안전하게 숨겼고, 메시지를 따라 말하는 메아리 봇을 실행했습니다. 처음으로 나와 사용자를 잇는 대화의 통로를 직접 열어본 것입니다. 게다가 열쇠를 코드에 적지 않는, 진짜 개발자의 습관까지 익혔습니다.", content: (<div className="flex flex-col gap-5"><div className="space-y-3">{[{ num: "1", text: "BotFather로 봇 만들고 토큰 받기", color: "bg-rose-100" }, { num: "2", text: "패키지 설치 + 토큰을 .env에 숨기기", color: "bg-violet-100" }, { num: "3", text: "메아리 봇 실행 및 직접 대화", color: "bg-teal-100" }].map((item) => (<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}><span className="text-lg font-bold text-gray-500">미션 {item.num}</span><p className="text-lg text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "", bg: "from-blue-50 to-indigo-50", script: "오늘 실습을 마치겠습니다. 다음 시간에는 이 봇에 사진을 보는 눈을 달아서 수학 문제 사진을 인식하게 만들겠습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1><p className="text-xl text-gray-600 mt-4">다음 시간: 봇에 사진 인식 기능 추가</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p></div>) },
];

export default function MathBotPart1TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
