"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-blue-50 to-indigo-50", script: "안녕하세요, 여러분. 오늘부터 매우 흥미로운 프로젝트를 시작합니다. 텔레그램에 수학 문제 사진을 올리면 봇이 풀이를 답장해주는 앱을 만드는 것입니다. 한 번에 다 만들 수는 없으므로, 오늘 1부에서는 먼저 텍스트 메시지에 답하는 기본 봇부터 차근차근 만들어보겠습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🤖</span><h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">텔레그램 봇과 첫 인사</h1><p className="text-2xl text-gray-500 mt-2">수학 봇 만들기 1부 — 기본 봇 만들기</p></div>) },
  { title: "오늘의 학습 목표", bg: "from-yellow-50 to-amber-50", script: "오늘의 학습 목표입니다. 첫째, 챗봇 플랫폼(텔레그램)과 내 코드가 어떻게 연결되는지 이해합니다. 둘째, 텔레그램 봇을 만들고 메시지를 주고받는 기본 동작을 설명할 수 있습니다. 셋째, 봇 토큰이 무엇이고 왜 소중히 다뤄야 하는지 알아봅니다.", content: (<div className="flex flex-col gap-6">{[{ num: "1", text: "챗봇 플랫폼(텔레그램)과 내 코드가 어떻게 연결되는지 이해한다" }, { num: "2", text: "텔레그램 봇을 만들고 메시지를 주고받는 기본 동작을 설명할 수 있다" }, { num: "3", text: "봇 토큰이 무엇이고 왜 소중히 다뤄야 하는지 안다" }].map((item) => (<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4"><span className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold">{item.num}</span><p className="text-xl text-gray-700">{item.text}</p></div>))}</div>) },
  { title: "전체 로드맵", bg: "from-green-50 to-emerald-50", script: "최종 목표를 먼저 그려보겠습니다. 수학 문제 사진을 봇에게 보내면 풀이를 답장해주는 앱을 만드는 것입니다. 이 앱은 작은 조각들이 모여서 만들어집니다. 1부(오늘)는 텍스트 메시지를 받고 답장하는 기본 봇을 만듭니다. 2부는 텍스트 대신 사진을 받아서 문제를 인식하는 눈을 답니다. 3부는 인식한 문제를 풀어주는 머리를 답니다. 오늘은 가장 기초가 되는 대화의 통로부터 열겠습니다.", content: (<div className="flex flex-col gap-5"><div className="overflow-x-auto"><table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm"><thead><tr className="bg-gray-800 text-white"><th className="p-4 text-left">단계</th><th className="p-4 text-left">무엇을 추가하는가</th></tr></thead><tbody className="text-gray-700">{[["1부 (오늘)", "텍스트 메시지를 받고 답장하는 기본 봇"], ["2부", "사진을 받아서 문제를 인식하는 눈 달기"], ["3부", "인식한 문제를 풀어주는 머리 달기"]].map(([step, desc], i) => (<tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}><td className="p-4 font-semibold">{step}</td><td className="p-4">{desc}</td></tr>))}</tbody></table></div></div>) },
  { title: "텔레그램 봇의 작동 원리", bg: "from-cyan-50 to-blue-50", script: "봇이 어떻게 메시지를 주고받는지 우체국 비유로 설명하겠습니다. 사용자가 보낸 메시지는 텔레그램이라는 우체국(서버)에 먼저 도착합니다. 내 프로그램은 그 우체국에 가서 메시지를 받아 읽은 뒤, 답장을 써서 다시 우체국에 맡깁니다. 우체국이 사용자에게 답장을 대신 전달해줍니다. 내 코드는 우체국(텔레그램 서버)을 통해서만 사용자와 대화합니다.", content: (<div className="flex flex-col gap-5"><div className="overflow-x-auto"><table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm"><thead><tr className="bg-gray-800 text-white"><th className="p-4 text-left">우체국 비유</th><th className="p-4 text-left">텔레그램 봇</th></tr></thead><tbody className="text-gray-700">{[["사용자가 쓴 편지", "사용자가 보낸 메시지"], ["편지를 모아두는 우체국", "텔레그램 서버"], ["편지를 받아 읽고 답장 쓰는 나", "내 봇 코드(파이썬)"], ["답장을 사용자에게 배달", "텔레그램이 답장 전송"]].map(([left, right], i) => (<tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}><td className="p-4">{left}</td><td className="p-4">{right}</td></tr>))}</tbody></table></div></div>) },
  { title: "봇 토큰 = 우체통의 열쇠", bg: "from-red-50 to-orange-50", script: "봇을 만들려면 텔레그램의 BotFather에게 봇 생성을 요청합니다. BotFather가 토큰이라는 긴 비밀번호를 발급해줍니다. 이 토큰은 '이 우체통은 내 것이에요'라고 증명하는 열쇠입니다. 토큰이 있어야 내 코드가 우체국에서 내 봇의 메시지를 받아올 수 있습니다. 매우 중요한 점은, 토큰은 절대 남에게 보여주면 안 된다는 것입니다. API 키와 동일한 보안 정보이므로, 코드를 공유하거나 인터넷에 올릴 때 토큰이 노출되지 않도록 주의해야 합니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-5"><p className="text-xl text-gray-700"><strong>봇 토큰</strong> = BotFather가 발급하는 긴 비밀번호 = <strong>내 우체통의 열쇠</strong></p></div><div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400"><p className="text-lg text-gray-700"><strong>⚠️ 토큰은 절대 남에게 보여주면 안 됩니다!</strong></p><p className="text-base text-gray-600 mt-1">API 키와 동일한 보안 정보. 노출 시 /revoke로 토큰 재발급 가능.</p></div></div>) },
  { title: "메아리 봇: 기본 흐름 익히기", bg: "from-teal-50 to-cyan-50", script: "오늘 만들 봇은 '메아리 봇'입니다. 사용자가 한 말을 그대로 따라 답장하는 봇입니다. 외국어를 처음 배울 때 상대의 말을 따라 하는 연습부터 시작하는 것처럼, 봇도 '메시지를 받고 답장을 보낸다'는 기본 흐름을 확실히 익히는 것이 중요합니다. 이 흐름만 이해하면, 나중에 답장 부분만 AI로 바꾸면 똑똑한 봇이 완성됩니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-5"><p className="text-xl text-gray-700"><strong>메아리 봇</strong> = 사용자가 보낸 말을 그대로 따라 답장하는 봇</p></div><div className="bg-green-50 rounded-xl p-4"><p className="text-lg text-gray-600">기본 흐름: <strong>메시지 받기 → 답장 보내기</strong></p><p className="text-base text-gray-500 mt-1">이 흐름만 익히면 답장 부분을 AI로 교체하여 똑똑한 봇 완성 가능!</p></div></div>) },
  { title: "메아리 봇 코드 구조", bg: "from-indigo-50 to-violet-50", script: "메아리 봇의 기본 코드 구조를 살펴보겠습니다. start 함수는 사용자가 /start를 누르면 인사말을 답장합니다. echo 함수는 사용자가 보낸 글자를 그대로 답장합니다. add_handler는 '이런 메시지가 오면 이 함수를 써라'라고 봇에게 알려주는 부분입니다. run_polling은 봇을 계속 켜둔 상태로 만들어 메시지를 기다리게 합니다.", content: (<div className="flex flex-col gap-5"><CodeBlock>{`from telegram import Update
from telegram.ext import (
    Application, MessageHandler,
    CommandHandler, filters, ContextTypes
)

TELEGRAM_TOKEN = "BotFather에서 받은 토큰"

async def start(update, context):
    await update.message.reply_text("안녕하세요!")

async def echo(update, context):
    user_text = update.message.text
    await update.message.reply_text(user_text)

app = Application.builder().token(TELEGRAM_TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(
    filters.TEXT & ~filters.COMMAND, echo
))
app.run_polling()`}</CodeBlock></div>) },
  { title: "오늘 배운 내용 정리", bg: "from-orange-50 to-red-50", script: "오늘 배운 내용을 정리하겠습니다. 텔레그램 봇은 우체국(서버)을 통해 사용자와 메시지를 주고받습니다. 봇 토큰은 우체통의 열쇠이며, 절대 노출하면 안 됩니다. 메아리 봇으로 '메시지 받기 → 답장 보내기' 기본 흐름을 익혔습니다. 이 기본 흐름에 AI를 연결하면 똑똑한 봇이 완성됩니다.", content: (<div className="flex flex-col gap-4"><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-700">✅ 텔레그램 봇 = 우체국(서버)을 통한 메시지 교환</p></div><div className="bg-red-50 rounded-xl p-4"><p className="text-lg text-gray-700">✅ 봇 토큰 = 우체통의 열쇠 (절대 노출 금지)</p></div><div className="bg-green-50 rounded-xl p-4"><p className="text-lg text-gray-700">✅ 메아리 봇으로 기본 흐름 습득: 받기 → 답장</p></div><div className="bg-purple-50 rounded-xl p-4"><p className="text-lg text-gray-700">✅ 답장 부분을 AI로 교체하면 → 똑똑한 봇 완성</p></div></div>) },
  { title: "", bg: "from-blue-50 to-indigo-50", script: "오늘 강의를 마치겠습니다. 사용자와 봇 사이의 대화 통로를 이해했습니다. 다음 시간에는 이 봇에 사진을 보는 눈을 달아서 수학 문제 사진을 인식하게 만들겠습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">📘</span><h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1><p className="text-xl text-gray-600 mt-4">다음 시간: 봇에 사진을 보는 눈 달기</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p></div>) },
];

export default function MathBotPart1GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
