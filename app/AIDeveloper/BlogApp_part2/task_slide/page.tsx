"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-purple-50 to-pink-50", script: "안녕하세요, 여러분. 오늘은 지난 시간의 글 생성 기능에 이미지 생성을 합쳐 완성형 블로그 앱을 만드는 실습을 진행하겠습니다. 2가지 미션을 약 25~30분에 걸쳐 수행합니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🎨</span><h1 className="text-5xl sm:text-6xl font-bold text-gray-800">블로그 앱 실습 (2부)</h1><p className="text-2xl text-gray-500 mt-2">글과 그림 합치기</p></div>) },
  { title: "실습 전 준비 사항", bg: "from-yellow-50 to-amber-50", script: "준비물을 확인하겠습니다. google-genai, streamlit 패키지와 지난 시간 글 생성 코드가 필요합니다.", content: (<div className="flex flex-col gap-6"><div className="space-y-4">{[{ icon: "📦", text: "google-genai, streamlit 패키지 설치" }, { icon: "📝", text: "지난 시간 글 생성 코드 백업" }, { icon: "🔑", text: "제미나이 API 키 확인" }].map((item, i) => (<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4"><span className="text-3xl">{item.icon}</span><p className="text-xl text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "미션 1: 대표 이미지 묘사 만들기 (8~10분)", bg: "from-rose-50 to-orange-50", script: "첫 번째 미션입니다. 주제를 받아 대표 이미지 묘사문을 AI에게 생성시킵니다. 빈칸에는 글의 분위기를 나타내는 단어를 넣으면 됩니다. '따뜻하고 아늑한', '차분하고 깔끔한' 같은 느낌 단어입니다. topic을 다양하게 바꿔가며 어떤 묘사가 나오는지 비교해보시기 바랍니다. 8~10분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 주제에서 대표 이미지 묘사문을 AI로 생성합니다.</p></div><CodeBlock>{`topic = "초보자를 위한 홈카페 만들기"

image_desc_prompt = f"""
'{'{topic}'}'이라는 블로그 글의 대표 이미지를 만들려고 해.
이미지 생성 AI에게 전달할 영어 묘사문을
한 문장으로 만들어줘.
{'{____}'} 분위기를 담아줘.
"""

image_description = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=image_desc_prompt
).text
print("이미지 묘사:", image_description)`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">💡 빈칸: &quot;따뜻하고 아늑한&quot;, &quot;차분하고 깔끔한&quot; 등</p></div></div>) },
  { title: "미션 1 해설", bg: "from-rose-50 to-pink-50", script: "미션 1의 핵심 포인트입니다. AI에게 이미지 묘사문을 만들게 하면, 주제의 핵심 키워드를 자동으로 추출하여 적절한 영어 묘사를 생성합니다. 이 묘사문을 이미지 생성 AI에 전달하면 주제에 맞는 표지 이미지를 얻을 수 있습니다. 분위기 단어를 바꾸면 같은 주제라도 전혀 다른 느낌의 이미지 묘사가 나옵니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">AI가 주제 키워드를 자동 추출 → <strong>적절한 영어 묘사문 생성</strong></p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-600">분위기 단어 변경 → 같은 주제라도 다른 느낌의 이미지 묘사</p></div></div>) },
  { title: "미션 2: Streamlit 앱 통합 (12~15분)", bg: "from-violet-50 to-purple-50", script: "두 번째 미션입니다. 글 생성과 이미지 묘사 생성을 하나의 Streamlit 화면에 합칩니다. 주제를 입력하고 말투를 선택한 뒤 버튼을 누르면 완성된 블로그 글과 추천 이미지 묘사가 화면에 나타납니다. 빈칸에는 이미지 묘사 프롬프트를 넣으면 됩니다. 미션 1에서 만든 프롬프트를 활용하시기 바랍니다. 같은 주제로 말투만 바꿔가며 비교해보면 재미있습니다. 12~15분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 글 + 이미지 묘사를 하나의 Streamlit 앱으로 통합합니다.</p></div><CodeBlock>{`import streamlit as st

st.title("블로그 자동 작성 도우미")
topic = st.text_input("블로그 주제를 입력하세요")
tone = st.selectbox("말투", ["친근한", "전문적인", "유머러스한"])

if st.button("블로그 글 생성하기"):
    post_prompt = f"""
    너는 {'{tone}'} 말투의 블로거야.
    '{'{topic}'}' 주제로 제목, 소제목 3개와 본문, 마무리를 써줘.
    """
    post = client.models.generate_content(
        model="gemini-3.5-flash", contents=post_prompt
    ).text
    st.write("### 생성된 블로그 글")
    st.write(post)

    st.write("### 추천 대표 이미지 묘사")
    image_desc_prompt = ____
    image_desc = client.models.generate_content(
        model="gemini-3.5-flash", contents=image_desc_prompt
    ).text
    st.write(image_desc)`}</CodeBlock></div>) },
  { title: "미션 2 해설", bg: "from-violet-50 to-indigo-50", script: "미션 2의 핵심 포인트입니다. 하나의 Streamlit 앱에서 여러 AI 기능이 협업하는 구조를 만들었습니다. 사용자 입력 한 번으로 글 생성과 이미지 묘사 생성이 동시에 이루어집니다. st.spinner를 활용하면 생성 중 대기 화면을 보여줄 수 있습니다. 이 앱은 기능을 추가하면 실제로 유용한 도구로 발전시킬 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-4"><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">하나의 앱에서 <strong>여러 AI 기능이 협업</strong>하는 구조 완성</p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-600">💡 st.spinner로 생성 중 대기 화면을 보여줄 수 있습니다.</p></div></div></div>) },
  { title: "오늘의 실습 정리", bg: "from-orange-50 to-red-50", script: "오늘 2가지 미션을 모두 수행하셨습니다. 주제에서 대표 이미지 묘사를 생성하고, 글 생성과 이미지 묘사 생성을 하나의 Streamlit 앱으로 통합했습니다. 글도 쓰고 그림도 그려주는 나만의 1인 출판사 앱을 완성한 것입니다.", content: (<div className="flex flex-col gap-5"><div className="space-y-3">{[{ num: "1", text: "주제에서 대표 이미지 묘사 생성", color: "bg-rose-100" }, { num: "2", text: "글 + 이미지 묘사를 Streamlit 앱으로 통합", color: "bg-violet-100" }].map((item) => (<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}><span className="text-lg font-bold text-gray-500">미션 {item.num}</span><p className="text-lg text-gray-700">{item.text} ✅</p></div>))}</div></div>) },
  { title: "", bg: "from-purple-50 to-pink-50", script: "오늘 실습을 마치겠습니다. 주제 하나만 던지면 완성된 블로그 글이 나오는 앱을 만들었습니다. 다음 시간에는 전혀 다른 종류의 앱, 사진을 보고 수학 문제를 풀어주는 앱에 도전하겠습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🎉</span><h1 className="text-5xl font-bold text-gray-800">1인 출판사 앱 완성!</h1><p className="text-xl text-gray-600 mt-4">다음 시간: 수학 봇 만들기</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p></div>) },
];

export default function BlogAppPart2TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
