"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-purple-50 to-pink-50", script: "안녕하세요, 여러분. 오늘은 지난 시간의 글 생성 기능에 진짜 이미지 생성을 합쳐 완성형 블로그 앱을 만드는 실습을 진행하겠습니다. 2가지 미션을 약 25~30분에 걸쳐 수행합니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><h1 className="text-5xl sm:text-6xl font-bold text-gray-800">블로그 앱 실습 (2부)</h1><p className="text-2xl text-gray-500 mt-2">글과 그림 합치기</p></div>) },
  { title: "실습 전 준비 사항", bg: "from-yellow-50 to-amber-50", script: "준비물을 확인하겠습니다. google-genai, streamlit 패키지와 지난 시간 글 생성 코드가 필요합니다. 오늘 쓰는 이미지 모델인 gemini-3.1-flash-lite-image, 나노 바나나 2 라이트는 일반 제미나이 API 키로도 잘 작동하는 것을 확인했습니다. 다만 계정이나 모델에 따라 결제 여부가 결과에 영향을 줄 수 있어, 오늘 코드는 이미지 생성이 실패해도 에러 없이 안내만 뜨도록 만들었습니다.", content: (<div className="flex flex-col gap-6"><div className="space-y-4">{[{ text: "google-genai, streamlit 패키지 설치" }, { text: "지난 시간 글 생성 코드 백업" }, { text: "제미나이 API 키 확인" }].map((item, i) => (<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4"><p className="text-xl text-gray-700">{item.text}</p></div>))}</div><div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-400"><p className="text-lg text-gray-700">오늘 쓰는 이미지 모델(나노 바나나 2 라이트)은 <strong>일반 API 키로 작동 확인</strong>했습니다. 혹시 안 되어도 앱은 멈추지 않으니 걱정 마세요!</p></div></div>) },
  { title: "미션 1: 진짜 표지 이미지 만들기 (10~13분)", bg: "from-rose-50 to-orange-50", script: "첫 번째 미션입니다. 주제를 받아 대표 이미지 묘사문을 AI에게 생성시킨 뒤, 그 묘사문으로 진짜 표지 이미지까지 그립니다. 빈칸에는 글의 분위기를 나타내는 단어를 넣으면 됩니다. '따뜻하고 아늑한', '차분하고 깔끔한' 같은 느낌 단어입니다. 여기서 학생들이 가장 많이 틀리는 부분을 짚어주십시오. 빈칸을 채울 때 중괄호를 씌우면 안 됩니다. f-string 안에서 중괄호는 변수 값을 넣으라는 뜻이라, 중괄호를 남긴 채 단어를 쓰면 NameError가 납니다. 그리고 프롬프트 맨 아래 '설명이나 인사말 없이 영어 묘사문 한 문장만 출력해'라는 줄이 반드시 필요합니다. 이 줄이 없으면 AI가 한국어 설명을 붙여서 답하고, 그 덩어리를 받은 그림 모델이 그림 대신 답장을 보냅니다. 에러도 나지 않아서 학생들이 원인을 찾기 어렵습니다. 이미지를 그리는 부분은 gemini-3.1-flash-lite-image라는 이미지 전용 모델을 쓰고, response_modalities 설정이 필요합니다. 이 부분은 그대로 복사해서 쓰면 됩니다. 실행한 폴더에 cover.jpg 파일이 새로 생기는지 확인해보시기 바랍니다. 10~13분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 이미지 묘사문을 만들고, 진짜 표지 이미지까지 생성합니다.</p></div><CodeBlock>{`topic = "초보자를 위한 홈카페 만들기"

image_desc_prompt = f"""
'{topic}'이라는 블로그 글의 대표 이미지를 만들려고 해.
이미지 생성 AI에게 전달할 영어 묘사문을
한 문장으로 만들어줘.
____ 분위기를 담아줘.

중요: 설명이나 인사말 없이,
영어 묘사문 한 문장만 출력해.
"""
image_description = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=image_desc_prompt
).text

# 이미지 묘사문을 진짜 그림으로 바꾸기 (그대로 복사!)
try:
    image_response = client.models.generate_content(
        model="gemini-3.1-flash-lite-image",
        contents=image_description,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
        ),
    )
    saved = False
    for part in image_response.parts or []:
        if image := part.as_image():
            image.save("cover.jpg")
            print("표지 이미지 저장 완료: cover.jpg")
            saved = True
    if not saved:
        print("그림 대신 글자만 돌아왔어요.")
        print("돌아온 내용:", image_response.text)
except Exception as e:
    print("이미지 생성에 실패했어요:", e)`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">빈칸: &quot;따뜻하고 아늑한&quot;, &quot;차분하고 깔끔한&quot; 등 — <strong>중괄호 없이</strong> 단어만!</p></div></div>) },
  { title: "미션 1 해설", bg: "from-rose-50 to-pink-50", script: "미션 1의 핵심 포인트입니다. AI에게 이미지 묘사문을 만들게 하면, 주제의 핵심 키워드를 자동으로 추출하여 적절한 영어 묘사를 생성합니다. 그다음 이 묘사문을 이미지 전용 모델에 전달하면 진짜 그림을 얻을 수 있습니다. response.parts를 하나씩 살펴보면서 part.as_image()로 그림 조각을 꺼내 저장하는 것이 핵심입니다. 이미지가 안 나오는 학생이 있으면 순서대로 확인해주십시오. 첫째, 그림 대신 글자만 돌아왔다는 메시지가 떴다면 가장 흔한 경우입니다. 출력된 이미지 묘사를 함께 보고, 영어 한 문장이 아니라 한국어 설명이 붙어 있으면 프롬프트의 마지막 줄을 확인시켜 주십시오. 둘째, 에러 메시지가 떴다면 결제가 활성화되지 않은 키일 수 있습니다. 마지막으로 분위기 단어를 바꾸면 같은 주제라도 전혀 다른 느낌의 이미지가 나오니 여러 번 시도해보게 하십시오.", content: (<div className="flex flex-col gap-5"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">AI가 주제 키워드를 자동 추출 → <strong>적절한 영어 묘사문 생성</strong> → <strong>진짜 이미지로 변환</strong></p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-600">part.as_image()로 그림 조각을 꺼내 cover.jpg로 저장</p></div><div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400"><p className="text-lg text-gray-700"><strong>이미지가 안 나올 때 1순위:</strong> 묘사문에 한국어 설명이 붙었는지 확인 — 그림 모델이 그림 대신 답장을 보냅니다</p></div><div className="bg-red-50 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>2순위:</strong> 에러 메시지가 떴다면 결제가 안 된 키일 수 있습니다</p></div></div>) },
  { title: "미션 2: Streamlit 앱 통합 (12~15분)", bg: "from-violet-50 to-purple-50", script: "두 번째 미션입니다. 글 생성과 이미지 생성을 하나의 Streamlit 화면에 합칩니다. 주제를 입력하고 말투를 선택한 뒤 버튼을 누르면 완성된 블로그 글과 표지 이미지가 화면에 나타납니다. 빈칸에는 이미지 묘사 프롬프트를 넣으면 됩니다. 미션 1에서 만든 프롬프트를 그대로 활용하시기 바랍니다. 이때 '설명 없이 영어 한 문장만 출력해'를 빠뜨리지 않았는지 꼭 확인시켜 주십시오. 이것이 빠지면 표지 이미지가 나오지 않습니다. 여기서 또 중요한 점은, 이미지 생성 부분을 try와 except로 감싸서, 결제가 안 되어 있어도 앱 전체가 멈추지 않고 글 생성 결과는 그대로 보이도록 만든다는 것입니다. 이 부분은 그대로 복사해서 쓰면 됩니다. 12~15분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 글 + 이미지를 하나의 Streamlit 앱으로 통합합니다. (이미지 실패해도 안전하게!)</p></div><CodeBlock>{`import streamlit as st
from google import genai
from google.genai import types

st.title("블로그 자동 작성 도우미")
topic = st.text_input("블로그 주제를 입력하세요")
tone = st.selectbox("말투", ["친근한", "전문적인", "유머러스한"])

if st.button("블로그 글 생성하기"):
    post_prompt = f"""
    너는 {tone} 말투의 블로거야.
    '{topic}' 주제로 제목, 소제목 3개와 본문, 마무리를 써줘.
    """
    with st.spinner("글을 쓰는 중..."):
        post = client.models.generate_content(
            model="gemini-3.5-flash", contents=post_prompt
        ).text
    st.write("### 생성된 블로그 글")
    st.write(post)

    image_desc_prompt = ____
    image_description = client.models.generate_content(
        model="gemini-3.5-flash", contents=image_desc_prompt
    ).text

    # 결제가 안 되어 있어도 앱이 멈추지 않도록 try/except로 감싼다
    st.write("### 표지 이미지")
    with st.spinner("표지 이미지를 그리는 중..."):
        try:
            image_response = client.models.generate_content(
                model="gemini-3.1-flash-lite-image",
                contents=image_description,
                config=types.GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"]
                ),
            )
            for part in image_response.parts or []:
                if image := part.as_image():
                    image.save("cover.jpg")
                    st.image("cover.jpg", caption="AI가 그린 표지 이미지")
        except Exception:
            st.warning("표지 이미지를 그리지 못했습니다 (결제가 필요해요)")`}</CodeBlock><div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400"><p className="text-lg text-gray-700">빈칸의 <strong>image_desc_prompt</strong>에도 &quot;설명 없이 영어 한 문장만 출력해&quot;를 꼭 넣어야 합니다!</p></div></div>) },
  { title: "미션 2 해설", bg: "from-violet-50 to-indigo-50", script: "미션 2의 핵심 포인트입니다. 하나의 Streamlit 앱에서 여러 AI 기능이 협업하는 구조를 만들었습니다. 사용자 입력 한 번으로 글 생성과 이미지 생성이 동시에 이루어집니다. try와 except로 이미지 생성 부분을 감싸면, 에러가 나도 앱 전체가 멈추지 않고 글 생성 결과는 안전하게 화면에 남습니다. 이렇게 실패할 수도 있는 부분을 미리 감싸두는 습관은 진짜 서비스를 만들 때도 아주 중요합니다. st.spinner를 활용하면 생성 중 대기 화면도 보여줄 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-4"><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">하나의 앱에서 <strong>여러 AI 기능이 협업</strong>하는 구조 완성</p></div><div className="bg-red-50 rounded-xl p-4"><p className="text-lg text-gray-600">try/except로 이미지 실패해도 <strong>앱은 멈추지 않음</strong></p></div><div className="bg-blue-50 rounded-xl p-4"><p className="text-lg text-gray-600">st.spinner로 생성 중 대기 화면을 보여줄 수 있습니다.</p></div></div></div>) },
  { title: "오늘의 실습 정리", bg: "from-orange-50 to-red-50", script: "오늘 2가지 미션을 모두 수행하셨습니다. 주제에서 이미지 묘사를 생성하고 진짜 표지 이미지까지 그렸으며, 글 생성과 이미지 생성을 하나의 Streamlit 앱으로 통합했습니다. 글도 쓰고 그림도 그려주는 나만의 1인 출판사 앱을 완성한 것입니다.", content: (<div className="flex flex-col gap-5"><div className="space-y-3">{[{ num: "1", text: "이미지 묘사 생성 + 진짜 표지 이미지 그리기", color: "bg-rose-100" }, { num: "2", text: "글 + 이미지를 Streamlit 앱으로 통합 (안전하게!)", color: "bg-violet-100" }].map((item) => (<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}><span className="text-lg font-bold text-gray-500">미션 {item.num}</span><p className="text-lg text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "", bg: "from-purple-50 to-pink-50", script: "오늘 실습을 마치겠습니다. 주제 하나만 던지면 완성된 블로그 글과 표지 이미지가 나오는 앱을 만들었습니다. 다음 시간에는 전혀 다른 종류의 앱, 사진을 보고 수학 문제를 풀어주는 앱에 도전하겠습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><h1 className="text-5xl font-bold text-gray-800">1인 출판사 앱 완성!</h1><p className="text-xl text-gray-600 mt-4">다음 시간: 수학 봇 만들기</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p></div>) },
];

export default function BlogAppPart2TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
