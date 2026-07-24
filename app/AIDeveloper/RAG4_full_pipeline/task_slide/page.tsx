"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-purple-50 to-indigo-50", script: "안녕하세요, 여러분. 오늘은 PDF 파일을 불러와 벡터DB를 채우고, 거기에 제미나이를 합쳐 RAG 챗봇을 직접 만들어보는 실습을 진행하겠습니다. 먼저 PDF로 도서관을 채우고, RAG 함수를 완성하고, 다양한 질문으로 테스트한 뒤, Streamlit으로 챗봇까지 만들어보겠습니다. 총 4가지 미션을 약 30~35분에 걸쳐 수행합니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🔗</span><h1 className="text-5xl sm:text-6xl font-bold text-gray-800">RAG 챗봇 실습 미션</h1><p className="text-2xl text-gray-500 mt-2">PDF로 채우는 나만의 AI 사서 챗봇</p><p className="text-lg text-gray-400">총 소요 시간: 약 30~35분</p></div>) },
  { title: "실습 전 준비 사항", bg: "from-yellow-50 to-amber-50", script: "준비물을 확인하겠습니다. chromadb, google-genai, streamlit, 그리고 오늘 새로 사용할 pypdf 패키지가 설치되어 있어야 합니다. pip install pypdf로 설치할 수 있습니다. 벡터DB에 넣을 PDF 파일도 하나 준비해주세요. 반드시 글자로 된 PDF여야 합니다. 사진을 스캔한 이미지 PDF는 글자가 안 뽑힐 수 있습니다. 제미나이 API 키와 비교 테스트용 질문 목록도 미리 준비해주시기 바랍니다.", content: (<div className="flex flex-col gap-6"><p className="text-xl text-gray-700">미션 시작 전 아래 사항을 확인합니다.</p><div className="space-y-4">{[{ icon: "📦", text: "chromadb, google-genai, streamlit, pypdf 패키지 설치" }, { icon: "📄", text: "벡터DB에 넣을 PDF 파일 (글자로 된 PDF!)" }, { icon: "🔑", text: "제미나이 API 키 확인" }, { icon: "❓", text: "비교 테스트용 질문 목록 준비" }].map((item, i) => (<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4"><span className="text-3xl">{item.icon}</span><p className="text-xl text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "미션 1: PDF 불러와서 벡터DB 채우기 (8~10분)", bg: "from-sky-50 to-blue-50", script: "첫 번째 미션입니다. 손으로 문장을 써넣는 대신, 진짜 PDF 파일을 불러와서 벡터DB를 채워봅니다. 빈칸이 두 군데 있습니다. 첫째, PdfReader 괄호 안에는 본인의 PDF 파일 이름을 문자열로 넣습니다. 예를 들어 따옴표 교재 점 pdf 따옴표처럼 씁니다. 둘째, text 플러스 이퀄 자리에는 페이지에서 글자를 뽑는 page 점 extract_text 괄호를 넣습니다. 이 세 걸음, 즉 읽기, 텍스트 추출, 청킹과 적재를 마치면 몇 개의 청크를 넣었다는 메시지가 출력됩니다. 만약 글자가 하나도 안 뽑힌다면, 그 PDF는 사진을 스캔한 이미지 PDF일 수 있으니 글자를 선택할 수 있는 PDF로 바꿔서 다시 시도하시기 바랍니다. 8~10분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> PDF 파일을 불러와 텍스트를 뽑고 청킹해서 벡터DB에 넣기</p></div><CodeBlock>{`from pypdf import PdfReader

# 1) PDF 열기 (빈칸: 파일 이름)
reader = PdfReader(____)

# 2) 모든 페이지의 텍스트 이어붙이기
text = ""
for page in reader.pages:
    text += ____   # 글자를 뽑는 함수

# 3) 청킹해서 벡터DB에 넣기
chunks = split_into_chunks(text, 200)
collection.add(
    documents=chunks,
    ids=[f"chunk_{'{i}'}" for i in range(len(chunks))],
)
print(f"{'{len(chunks)}'}개의 청크를 넣었다냥!")`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">💡 빈칸: <code>PdfReader(&quot;교재.pdf&quot;)</code>, <code>page.extract_text()</code></p></div></div>) },
  { title: "미션 1 해설", bg: "from-sky-50 to-cyan-50", script: "미션 1의 핵심 포인트입니다. PDF를 벡터DB에 넣는 과정은 읽기, 텍스트 추출, 청킹과 적재의 세 걸음입니다. 가장 중요한 깨달음은, PDF에서 글자만 뽑아내면 그 다음은 지난 시간에 배운 청킹과 저장 과정과 완전히 똑같다는 것입니다. 즉 벡터DB 입장에서는 손으로 쓴 문장이든 PDF에서 뽑은 문장이든 똑같은 텍스트 청크일 뿐입니다. 이 원리를 이해하면, PDF뿐 아니라 텍스트 파일, 워드 문서 등 어떤 자료든 글자만 뽑아내면 RAG에 활용할 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-4"><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">PDF 넣기 = <strong>읽기 → 텍스트 추출 → 청킹 + 적재</strong> 세 걸음</p></div><div className="bg-sky-50 rounded-xl p-5 border-l-4 border-sky-400"><p className="text-lg text-gray-700"><strong>PDF에서 글자만 뽑으면</strong>, 그 다음은 지난 시간의 청킹·저장과 똑같습니다. 벡터DB엔 결국 똑같은 &ldquo;텍스트 청크&rdquo;가 들어갑니다.</p></div></div></div>) },
  { title: "미션 2: RAG 함수 만들기 (8~10분)", bg: "from-rose-50 to-orange-50", script: "두 번째 미션입니다. 검색과 생성을 한 함수 안에서 합쳐봅니다. 빈칸이 두 군데 있습니다. 첫째, prompt 안의 역할 빈칸입니다. 어떤 도우미인지 적으면 됩니다. 예를 들어 '친절한 도서관 사서'와 같이 작성합니다. 둘째, question 변수에 테스트할 질문을 문자열로 넣으면 됩니다. 특히 prompt에 '참고 자료에 없는 내용이면 자료에서 찾을 수 없습니다라고 답해줘'라는 조건을 넣어야 합니다. 이것이 AI의 환각을 방지하는 핵심 장치입니다. 8~10분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 검색(벡터DB) + 생성(제미나이)을 합친 RAG 함수 완성</p></div><CodeBlock>{`def rag_answer(question):
    results = collection.query(
        query_texts=[question], n_results=2
    )
    context = "\\n".join(results["documents"][0])

    prompt = f"""
    너는 {'{____}'} 역할을 맡은 AI 도우미야.
    아래 [참고 자료]만을 근거로 답해줘.
    참고 자료에 없으면 "자료에서 찾을 수 없습니다"라고 답해줘.
    [참고 자료]
    {'{context}'}
    [질문]
    {'{question}'}
    """
    response = genai_client.models.generate_content(
        model="gemini-3.5-flash", contents=prompt
    )
    return response.text

question = ____
print(rag_answer(question))`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">💡 역할 예시: &quot;친절한 도서관 사서&quot;, &quot;학교 안내 도우미&quot;</p></div></div>) },
  { title: "미션 2 해설", bg: "from-rose-50 to-pink-50", script: "미션 2의 핵심 포인트입니다. RAG 함수는 세 단계로 이루어져 있습니다. 먼저 벡터DB에서 관련 문서를 검색하고, 검색 결과를 prompt에 삽입하고, 제미나이가 답변을 생성합니다. 특히 '참고 자료에 없으면 모른다고 답하라'는 조건이 중요합니다. 이 한 줄이 없으면 AI가 자료에 없는 내용을 그럴듯하게 지어내는 '환각' 현상이 발생할 수 있습니다. RAG에서 prompt 한 줄이 얼마나 중요한지 기억하시기 바랍니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-4"><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">RAG 함수 = <strong>검색 → prompt 구성 → 생성</strong> 세 단계</p></div><div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400"><p className="text-lg text-gray-700"><strong>&ldquo;자료에 없으면 모른다고 답하라&rdquo;</strong> — 이 한 줄이 AI 환각을 방지합니다.</p></div></div></div>) },
  { title: "미션 3: 다양한 질문으로 테스트 (8~10분)", bg: "from-violet-50 to-purple-50", script: "세 번째 미션입니다. RAG의 진짜 가치를 느끼는 순간입니다. 두 종류의 질문을 던져서 결과를 비교해보겠습니다. 첫째, 문서에 있는 내용을 질문합니다. 자료를 바탕으로 친절하게 답하는지 확인합니다. 둘째, 문서에 없는 내용을 일부러 질문합니다. '자료에서 찾을 수 없습니다'라고 솔직하게 답하는지 확인합니다. 추가 실험으로, prompt에서 '자료에 없으면 모른다고 답해줘' 부분을 빼고 실행해보시기 바랍니다. AI가 자료에 없는 내용도 그럴듯하게 지어내는 환각 현상을 직접 확인할 수 있습니다. 8~10분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 두 종류의 질문으로 RAG의 가치를 체감합니다.</p></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="bg-green-50 rounded-xl p-5"><p className="font-semibold text-green-700 mb-2">테스트 1: 문서에 있는 질문</p><p className="text-gray-600">자료를 바탕으로 답하는지 확인</p></div><div className="bg-red-50 rounded-xl p-5"><p className="font-semibold text-red-700 mb-2">테스트 2: 문서에 없는 질문</p><p className="text-gray-600">&ldquo;찾을 수 없습니다&rdquo;라고 답하는지 확인</p></div></div><div className="bg-amber-50 rounded-xl p-4"><p className="text-lg text-gray-600">🧪 보너스 실험: &ldquo;모른다고 답하라&rdquo; 조건을 빼고 비교해보세요!</p></div></div>) },
  { title: "미션 3 해설", bg: "from-violet-50 to-indigo-50", script: "미션 3의 핵심 포인트입니다. RAG의 가장 큰 가치는 '근거 기반 답변'입니다. 문서에 있는 내용은 자료를 인용하여 정확하게 답하고, 없는 내용은 솔직하게 모른다고 답합니다. 이것은 일반적인 AI 챗봇과의 가장 큰 차이점입니다. 일반 챗봇은 학습 데이터에 기반하여 답하므로 우리 고유의 자료에 대해서는 답할 수 없거나 지어내기도 합니다. RAG는 우리가 직접 넣어준 자료를 근거로 답하기 때문에, 정확성과 신뢰성이 훨씬 높습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-4"><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">RAG의 핵심 가치 = <strong>근거 기반 답변</strong></p></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="bg-orange-50 rounded-xl p-4"><p className="font-semibold text-orange-700 mb-2">일반 AI 챗봇</p><p className="text-gray-600">학습 데이터 기반 → 고유 자료에 약함</p></div><div className="bg-green-50 rounded-xl p-4"><p className="font-semibold text-green-700 mb-2">RAG 챗봇</p><p className="text-gray-600">우리 자료를 근거로 → 정확성 높음</p></div></div></div></div>) },
  { title: "미션 4: Streamlit RAG 챗봇 (8~10분)", bg: "from-teal-50 to-cyan-50", script: "마지막 미션입니다. rag_answer 함수를 Streamlit 화면에 연결하여 입력창에 질문을 받아 답을 보여주는 진짜 RAG 챗봇을 완성합니다. 빈칸은 rag_answer(user_question) 형태로 함수를 호출하면 됩니다. 터미널에서 streamlit run app.py로 실행하고 다양한 질문을 넣어보시기 바랍니다. 참고한 자료 보기 기능도 활용하여 AI가 어떤 자료를 참고했는지 확인해보세요. Streamlit 연결이 어려우신 분들은 .ipynb에서 rag_answer 함수만 다양한 질문으로 실행하는 것으로도 충분합니다. 8~10분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> rag_answer를 Streamlit에 연결하여 RAG 챗봇 완성</p></div><CodeBlock>{`import streamlit as st

st.title("나만의 RAG 챗봇")
user_question = st.text_input("질문을 입력하세요")

if st.button("질문하기"):
    answer = ____  # rag_answer 함수 호출
    st.write("### 답변")
    st.write(answer)

    with st.expander("참고한 자료 보기"):
        results = collection.query(
            query_texts=[user_question], n_results=2
        )
        for doc in results["documents"][0]:
            st.write("-", doc)`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">💡 빈칸: rag_answer(user_question)</p></div></div>) },
  { title: "미션 4 해설", bg: "from-teal-50 to-emerald-50", script: "미션 4의 핵심 포인트입니다. Streamlit으로 UI를 만들면 비개발자도 쉽게 사용할 수 있는 앱이 됩니다. 참고한 자료 보기 기능은 RAG의 투명성을 보여주는 중요한 요소입니다. 사용자가 AI의 답변 근거를 직접 확인할 수 있기 때문입니다. 오늘 만든 것은 작은 시작이지만, 더 많은 자료와 기능을 추가하면 실제로 유용한 앱으로 발전시킬 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-4"><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">Streamlit UI = 비개발자도 쉽게 사용 가능</p></div><div className="bg-blue-50 rounded-xl p-5"><p className="text-lg text-gray-700"><strong>&ldquo;참고한 자료 보기&rdquo;</strong> = RAG의 투명성. 답변 근거를 사용자가 직접 확인 가능.</p></div></div></div>) },
  { title: "오늘의 실습 정리", bg: "from-orange-50 to-red-50", script: "오늘 4가지 미션을 모두 수행하셨습니다. PDF 파일을 불러와 벡터DB 채우기, 검색과 생성을 합친 RAG 함수 완성, 다양한 질문으로 테스트하며 RAG의 가치 체감, Streamlit으로 나만의 RAG 챗봇 완성까지 해보았습니다. 처음엔 빈 노트에서 시작했던 우리가, 이제는 내 PDF를 읽고 질문에 친절하게 설명해주는 나만의 AI 비서를 완성한 것입니다.", content: (<div className="flex flex-col gap-4"><div className="space-y-3">{[{ num: "1", text: "PDF 불러와서 벡터DB 채우기", color: "bg-sky-100" }, { num: "2", text: "검색 + 생성 합친 RAG 함수 완성", color: "bg-rose-100" }, { num: "3", text: "다양한 질문으로 테스트하며 RAG 가치 체감", color: "bg-violet-100" }, { num: "4", text: "Streamlit으로 나만의 RAG 챗봇 완성", color: "bg-teal-100" }].map((item) => (<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}><span className="text-lg font-bold text-gray-500">미션 {item.num}</span><p className="text-lg text-gray-700">{item.text} ✅</p></div>))}</div></div>) },
  { title: "", bg: "from-purple-50 to-indigo-50", script: "오늘 실습을 마치겠습니다. RAG의 4차시 여정이 완성되었습니다. 임베딩, 청킹, 벡터DB, 그리고 오늘의 RAG 파이프라인까지, 여러분은 AI 검색 증강 생성의 전체 과정을 직접 구현해보셨습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><span className="text-8xl">🎉</span><h1 className="text-5xl font-bold text-gray-800">RAG 챗봇 완성!</h1><p className="text-xl text-gray-600 mt-4">임베딩 → 청킹 → 벡터DB → RAG 파이프라인</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p></div>) },
];

export default function RAG4FullPipelineTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
