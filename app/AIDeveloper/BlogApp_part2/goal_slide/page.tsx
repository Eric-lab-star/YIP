"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-purple-50 to-pink-50", script: "안녕하세요, 여러분. 지난 시간에는 주제만 주면 제목부터 본문까지 자동 생성하는 글 생성 기능을 만들었습니다. 오늘은 그 글에 어울리는 대표 이미지까지 AI로 생성하여, 글과 그림이 한 팀이 되는 완성형 블로그 앱을 만들어보겠습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🎨</span><h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">블로그 앱 완성하기 (2부)</h1><p className="text-2xl text-gray-500 mt-2">글에 그림까지! 완성형 블로그 앱</p></div>) },
  { title: "오늘의 학습 목표", bg: "from-yellow-50 to-amber-50", script: "오늘의 학습 목표입니다. 첫째, 글에 어울리는 이미지를 AI로 생성하는 방법을 이해합니다. 둘째, 지난 시간의 글 생성 기능에 이미지 생성을 합쳐 Streamlit으로 완성형 블로그 작성 앱을 만듭니다.", content: (<div className="flex flex-col gap-6">{[{ num: "1", text: "글에 어울리는 이미지를 AI로 생성하는 방법을 이해한다" }, { num: "2", text: "글 생성 + 이미지 생성을 합쳐 Streamlit 완성형 앱을 만든다" }].map((item) => (<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4"><span className="bg-purple-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold">{item.num}</span><p className="text-xl text-gray-700">{item.text}</p></div>))}</div>) },
  { title: "지난 시간 복습 + 오늘 할 일", bg: "from-blue-50 to-indigo-50", script: "지난 시간에 우리는 주제를 입력받아 제목, 소제목 구조를 만들고 본문까지 생성하는 기능을 완성했습니다. 오늘은 거기에 글에 어울리는 대표 이미지 묘사를 만들고, 이미지를 생성하고, Streamlit 화면에서 글과 그림을 함께 보여주는 기능을 추가합니다.", content: (<div className="flex flex-col gap-5"><div className="grid grid-cols-1 sm:grid-cols-2 gap-5"><div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400"><p className="text-lg font-bold text-blue-700 mb-2">✍️ 지난 시간 (1부)</p><ul className="text-base text-gray-600 space-y-1"><li>주제 입력받기</li><li>제목 · 소제목 구조 만들기</li><li>본문 글까지 생성 완료</li></ul></div><div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400"><p className="text-lg font-bold text-purple-700 mb-2">🎨 오늘 (2부)</p><ul className="text-base text-gray-600 space-y-1"><li>대표 이미지 묘사 만들기</li><li>이미지 생성하기</li><li>Streamlit으로 글+그림 완성</li></ul></div></div></div>) },
  { title: "이미지 프롬프트 설계", bg: "from-green-50 to-emerald-50", script: "이미지 프롬프트도 글 프롬프트와 원리가 동일합니다. 구체적 묘사, 분위기, 스타일을 담아야 합니다. '카페'보다 '원목 테이블과 작은 화분이 있는 아늑한 홈카페'가 훨씬 좋은 결과를 만듭니다. 게다가 글의 주제에서 이미지 키워드를 뽑아내는 과정 자체를 AI에게 시킬 수 있습니다. AI에게 '이 글의 대표 이미지를 묘사하는 영어 문장을 만들어줘'라고 부탁하는 것입니다.", content: (<div className="flex flex-col gap-5"><div className="overflow-x-auto"><table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm"><thead><tr className="bg-gray-800 text-white"><th className="p-4 text-left">원리</th><th className="p-4 text-left">예시</th></tr></thead><tbody className="text-gray-700">{[["구체적 묘사", "\"원목 테이블과 화분이 있는 아늑한 홈카페\""], ["분위기", "\"따뜻한\", \"차분한\", \"활기찬\""], ["스타일", "\"수채화 느낌\", \"사진처럼 사실적인\""]].map(([k, v], i) => (<tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}><td className="p-4 font-semibold">{k}</td><td className="p-4">{v}</td></tr>))}</tbody></table></div><div className="bg-green-50 rounded-xl p-4"><p className="text-lg text-gray-600">💡 주제에서 이미지 키워드를 뽑아내는 과정 자체를 AI에게 시킬 수 있습니다!</p></div></div>) },
  { title: "핵심 비유: 글과 그림의 출판사", bg: "from-cyan-50 to-blue-50", script: "오늘 만들 앱은 작은 출판사와 같습니다. 주제(원고 의뢰)가 들어오면, 작가(글 생성 AI)가 글을 쓰고, 화가(이미지 생성 AI)가 표지를 그려서, 한 편의 완성된 글을 독자에게 내놓습니다. 여러 AI 기능을 한 화면에서 협업하게 만드는 것이 오늘의 핵심입니다. 이렇게 여러 AI 기능을 묶어 하나의 앱으로 만드는 것을 '멀티 기능 통합'이라고 합니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-6 text-center"><p className="text-2xl text-gray-800 font-semibold">주제 → 작가(글 AI) → 화가(이미지 AI) → 완성된 블로그</p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-600">여러 AI 기능을 한 앱에서 협업시키기 = <strong>멀티 기능 통합</strong></p></div></div>) },
  { title: "코드 미리보기: 이미지 묘사 생성", bg: "from-indigo-50 to-violet-50", script: "실습에서 사용할 코드를 미리 살펴보겠습니다. topic 변수에 주제를 넣고, AI에게 그 주제의 대표 이미지를 묘사하는 영어 문장을 만들어달라고 요청합니다. AI가 'warm and cozy home cafe with wooden table'과 같은 영어 묘사문을 생성하면, 그것을 이미지 생성 AI에 전달하여 표지 그림을 만들 수 있습니다.", content: (<div className="flex flex-col gap-5"><CodeBlock>{`topic = "초보자를 위한 홈카페 만들기"

image_desc_prompt = f"""
'{'{topic}'}'이라는 블로그 글의 대표 이미지를 만들려고 해.
이미지 생성 AI에게 전달할 영어 묘사문을
한 문장으로 만들어줘.
따뜻하고 아늑한 분위기를 담아줘.
"""

image_description = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=image_desc_prompt
).text
print("이미지 묘사:", image_description)`}</CodeBlock></div>) },
  { title: "오늘 배운 내용 정리", bg: "from-orange-50 to-red-50", script: "오늘 배운 내용을 정리하겠습니다. 이미지 프롬프트도 글 프롬프트와 원리가 동일합니다. 구체적 묘사, 분위기, 스타일을 담아야 합니다. 글의 주제에서 이미지 키워드를 뽑아내는 과정을 AI에게 시킬 수 있습니다. 여러 AI 기능을 하나의 앱에 통합하는 멀티 기능 통합의 개념을 배웠습니다.", content: (<div className="flex flex-col gap-4"><div className="bg-green-50 rounded-xl p-4"><p className="text-lg text-gray-700">✅ 이미지 프롬프트 = 구체적 묘사 + 분위기 + 스타일</p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-700">✅ 주제 → 이미지 키워드 추출도 AI가 수행 가능</p></div><div className="bg-purple-50 rounded-xl p-4"><p className="text-lg text-gray-700">✅ 멀티 기능 통합: 글 생성 + 이미지 생성 = 1인 출판사 앱</p></div></div>) },
  { title: "", bg: "from-purple-50 to-pink-50", script: "오늘 강의를 마치겠습니다. 글만 쓰던 앱이 그림까지 그리는 1인 출판사로 한 단계 발전했습니다. 이제 실습에서 직접 만들어보겠습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">📘</span><h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1><p className="text-xl text-gray-600 mt-4">다음: 이미지 묘사 생성 + Streamlit 통합 실습</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p></div>) },
];

export default function BlogAppPart2GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
