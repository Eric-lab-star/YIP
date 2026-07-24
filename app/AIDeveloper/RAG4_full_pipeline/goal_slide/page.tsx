"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-purple-50 to-indigo-50",
    script: "안녕하세요, 여러분. 오늘은 지난 세 시간 동안 만들어온 임베딩, 청킹, 벡터DB를 하나로 합쳐서 진짜 RAG 챗봇을 완성하는 시간입니다. RAG는 Retrieval-Augmented Generation, 즉 검색 증강 생성의 약자입니다. 자료를 찾기만 하고 끝내는 것이 아니라, 찾은 자료를 바탕으로 자연스러운 답변까지 만들어내는 완성된 시스템을 구축하겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📚</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          RAG 챗봇 완성하기
        </h1>
        <p className="text-2xl text-gray-500 mt-2">검색 + 생성 합체! 나만의 AI 사서 만들기</p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "오늘의 학습 목표입니다. 첫째, 검색(Retrieval)과 생성(Generation)을 연결하는 전체 RAG 흐름을 이해합니다. 둘째, 지난 3차시 동안 만든 임베딩, 청킹, 벡터DB를 하나의 앱으로 통합합니다. 셋째, 검색 결과를 prompt에 잘 넣는 것이 답변 품질을 좌우한다는 점을 파악합니다.",
    content: (
      <div className="flex flex-col gap-6">
        {[
          { num: "1", text: "검색(Retrieval)과 생성(Generation)을 연결하는 전체 RAG 흐름을 이해한다" },
          { num: "2", text: "PDF 같은 외부 파일을 pypdf로 불러와 청킹하고 벡터DB에 채우는 법을 익힌다" },
          { num: "3", text: "임베딩 · 청킹 · 벡터DB를 하나의 앱으로 통합한다" },
          { num: "4", text: "검색 결과를 prompt에 잘 넣는 것이 답변 품질을 좌우한다는 점을 안다" },
        ].map((item) => (
          <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="bg-purple-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
            <p className="text-xl text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "지금까지 만든 것들 복습",
    bg: "from-blue-50 to-indigo-50",
    script: "오늘 합체를 하려면 먼저 우리가 어떤 부품들을 만들어왔는지 정리해야 합니다. 1차시에서는 임베딩으로 문장을 숫자(벡터)로 표현했습니다. 2차시에서는 문서를 청킹하고 유사도로 비슷한 조각을 찾았습니다. 3차시에서는 Chroma 벡터DB에 저장하고 효율적으로 검색했습니다. 그리고 오늘 4차시에서는 검색한 자료를 제미나이에게 전달하여 답변 생성까지 완성합니다. 지금까지는 '자료를 찾는 것'까지만 했고, 오늘은 '찾은 자료로 친절하게 설명하기'를 추가하는 날입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead><tr className="bg-gray-800 text-white">
              <th className="p-4 text-left">차시</th><th className="p-4 text-left">무엇을 했는가</th>
            </tr></thead>
            <tbody className="text-gray-700">
              {[
                ["1차시", "임베딩으로 문장을 숫자(벡터)로 표현"],
                ["2차시", "문서를 청킹하고 유사도로 비슷한 조각 검색"],
                ["3차시", "Chroma 벡터DB에 저장하고 효율적으로 검색"],
                ["오늘 (4차시)", "검색한 자료로 제미나이가 답변 생성"],
              ].map(([session, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-semibold">{session}</td><td className="p-4">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "진짜 도서관 채우기: PDF 불러오기",
    bg: "from-sky-50 to-blue-50",
    script: "본격적인 합체에 앞서 중요한 질문을 하나 던지겠습니다. 지금까지 우리는 벡터DB에 문서를 어떻게 넣었습니까? 코드에 문장을 손으로 직접 타이핑해서 넣었습니다. 연습용으로는 괜찮지만, 실제로 쓸모 있는 챗봇을 만들려면 내 교재 PDF나 안내문 파일을 통째로 넣을 수 있어야 합니다. 오늘은 pypdf라는 도구로 PDF 파일을 불러와서 벡터DB를 채우는 방법을 배우겠습니다. 왼쪽은 지금까지의 하드코딩 방식이고, 오른쪽은 오늘 배울 파일 불러오기 방식입니다. 하드코딩은 짧은 연습용, 파일 불러오기는 실전용이라고 이해하시면 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-400">
            <p className="text-lg font-bold text-orange-700 mb-2">✍️ 지금까지 (하드코딩)</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>코드에 문장을 직접 타이핑</li>
              <li>긴 문서는 넣기가 너무 힘듦</li>
              <li>실제 자료(PDF)는 못 넣음 → 연습용</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
            <p className="text-lg font-bold text-blue-700 mb-2">📄 오늘부터 (파일 불러오기)</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>PDF 파일을 통째로 불러옴</li>
              <li>긴 교재도 한 번에 처리</li>
              <li>내 진짜 자료로 챗봇 제작 → 실전용</li>
            </ul>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-4 text-center">
          <p className="text-lg text-gray-700">PDF에서 <strong>글자만 뽑아내면</strong>, 그 다음은 지난 시간의 청킹·저장과 똑같습니다!</p>
        </div>
      </div>
    ),
  },
  {
    title: "PDF가 도서관 책이 되는 세 걸음",
    bg: "from-cyan-50 to-sky-50",
    script: "PDF를 벡터DB에 넣는 과정은 딱 세 걸음입니다. 첫째, 읽기 단계입니다. pypdf의 PdfReader로 PDF 파일을 엽니다. pip install pypdf로 설치할 수 있습니다. 둘째, 텍스트 추출 단계입니다. 페이지를 하나씩 돌면서 extract_text 함수로 글자를 뽑아 이어붙입니다. 셋째, 청킹과 적재 단계입니다. 지난 시간에 만든 split_into_chunks 함수로 잘게 나눈 뒤, collection.add로 벡터DB에 넣습니다. 코드를 보면, PDF를 열고, 모든 페이지의 텍스트를 하나로 합치고, 청킹해서 add하는 흐름이 그대로 담겨 있습니다. 한 가지 주의할 점은, extract_text는 글자로 된 PDF에서만 글자를 뽑을 수 있다는 것입니다. 사진을 스캔한 이미지 PDF는 글자가 안 나올 수 있으니, 글자를 드래그해서 선택할 수 있는 PDF를 사용하시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { num: "1", title: "읽기", desc: "PdfReader로 PDF 열기", color: "bg-sky-500" },
            { num: "2", title: "텍스트 추출", desc: "extract_text()로 글자 뽑기", color: "bg-cyan-500" },
            { num: "3", title: "청킹 + 적재", desc: "chunk 후 collection.add()", color: "bg-blue-500" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-center gap-3">
              <span className={`${item.color} text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold`}>{item.num}</span>
              <div>
                <p className="text-base font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <CodeBlock>
          {`from pypdf import PdfReader

reader = PdfReader("교재.pdf")          # 1) 읽기
text = ""
for page in reader.pages:               # 2) 텍스트 추출
    text += page.extract_text()

chunks = split_into_chunks(text, 200)   # 3) 청킹 + 적재
collection.add(
    documents=chunks,
    ids=[f"chunk_{'{i}'}" for i in range(len(chunks))],
)`}
        </CodeBlock>
        <div className="bg-amber-50 rounded-xl p-3">
          <p className="text-base text-gray-600">🐾 주의: <strong>스캔(사진) PDF</strong>는 글자가 안 뽑힐 수 있어요. 글자를 선택할 수 있는 PDF를 쓰세요!</p>
        </div>
      </div>
    ),
  },
  {
    title: "핵심 비유: AI 사서의 완성",
    bg: "from-green-50 to-emerald-50",
    script: "RAG를 한 번에 이해할 수 있는 비유를 소개하겠습니다. 지금까지 우리는 도서관(벡터DB)에서 관련 자료를 빠르게 찾아내는 시스템을 만들었습니다. 이것은 '사서' 역할입니다. 하지만 자료를 찾는 것과, 그 자료를 읽고 정리해서 설명하는 것은 다른 일입니다. 오늘은 '설명을 잘하는 직원(제미나이)'을 사서와 한 팀으로 묶습니다. 사서가 관련 자료를 찾아오면, 제미나이가 그 자료를 바탕으로 친절하게 답변을 만들어줍니다. 이 두 전문가가 한 팀이 되면 RAG가 완성됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-400">
            <p className="text-lg font-bold text-green-700 mb-2">🔎 사서 (검색 시스템)</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>벡터DB에서 관련 자료를 찾아냄</li>
              <li>&ldquo;이 자료들이 관련 있어요!&rdquo;까지만 담당</li>
              <li>지난 3차시 동안 만든 부분</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
            <p className="text-lg font-bold text-purple-700 mb-2">🗣️ 설명 직원 (제미나이)</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>찾아온 자료를 읽고 이해</li>
              <li>&ldquo;이 자료를 보면 답은 이거예요!&rdquo;</li>
              <li>오늘 새로 연결할 부분</li>
            </ul>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-5 text-center">
          <p className="text-xl text-gray-800">사서 + 설명 직원 = <strong>RAG 완성</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: "RAG 파이프라인 네 단계",
    bg: "from-cyan-50 to-blue-50",
    script: "사용자의 질문이 답변이 되어 나오기까지의 전체 흐름을 살펴보겠습니다. 네 단계로 이루어집니다. 첫째, 사용자 질문 단계입니다. 사용자가 궁금한 것을 물어봅니다. 둘째, 검색(Retrieval) 단계입니다. 벡터DB에서 질문과 관련된 청크를 찾아옵니다. 셋째, prompt 구성 단계입니다. 검색 결과와 질문을 하나의 prompt로 합칩니다. 넷째, 생성(Generation) 단계입니다. 제미나이가 그 prompt를 읽고 답변을 생성합니다. 여기서 정말 중요한 점은, 검색 결과를 prompt에 어떻게 넣느냐가 답변 품질을 크게 좌우한다는 것입니다.",
    content: (
      <div className="flex flex-col gap-5">
        {[
          { num: "1", title: "사용자 질문", desc: "사용자가 궁금한 것을 물어봄", color: "bg-blue-500" },
          { num: "2", title: "검색 (Retrieval)", desc: "벡터DB에서 질문과 관련된 청크를 찾아옴", color: "bg-green-500" },
          { num: "3", title: "prompt 구성", desc: "검색 결과 + 질문을 하나의 prompt로 합침", color: "bg-orange-500" },
          { num: "4", title: "생성 (Generation)", desc: "제미나이가 prompt를 읽고 답변을 생성", color: "bg-purple-500" },
        ].map((item) => (
          <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className={`${item.color} text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold`}>{item.num}</span>
            <div>
              <p className="text-lg font-semibold text-gray-800">{item.title}</p>
              <p className="text-base text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "RAG의 핵심 한 문장",
    bg: "from-emerald-50 to-green-50",
    script: "RAG의 핵심을 한 문장으로 정리하겠습니다. 'AI가 원래 모르는 내용도, 검색해온 자료를 참고하면 답할 수 있다.' 이것이 RAG의 본질입니다. 제미나이는 우리 학교 자료나 개인 문서를 학습한 적이 없습니다. 하지만 그 자료를 검색해서 prompt에 넣어주면, 마치 아는 것처럼 답할 수 있게 됩니다. 이것이 RAG가 실무에서 널리 사용되는 이유입니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <div className="bg-white/70 rounded-2xl p-8 max-w-2xl">
          <p className="text-2xl text-gray-800 font-bold leading-relaxed">
            &ldquo;AI가 원래 모르는 내용도,<br />
            검색해온 자료를 참고하면 답할 수 있다!&rdquo;
          </p>
        </div>
        <p className="text-xl text-gray-600">
          제미나이는 우리 문서를 학습한 적이 없지만,<br />
          자료를 찾아서 prompt에 넣어주면 답할 수 있습니다.
        </p>
      </div>
    ),
  },
  {
    title: "코드로 보는 RAG 함수",
    bg: "from-blue-50 to-indigo-50",
    script: "실습에서 직접 빈칸을 채우겠지만, 먼저 RAG 함수의 전체 구조를 눈으로 확인하겠습니다. rag_answer 함수 안에 위에서 배운 네 단계가 그대로 들어 있습니다. collection.query()가 검색 단계이고, genai_client.models.generate_content()가 생성 단계입니다. 그 사이에서 검색 결과를 prompt에 끼워넣는 것이 RAG의 핵심입니다. 지금은 전체 구조만 파악하시면 충분합니다.",
    content: (
      <div className="flex flex-col gap-5">
        <CodeBlock>
          {`def rag_answer(question):
    # 1) 벡터DB에서 관련 청크 검색
    results = collection.query(
        query_texts=[question], n_results=2
    )
    context = "\\n".join(results["documents"][0])

    # 2) 검색 결과 + 질문을 prompt로 구성
    prompt = f"""
    아래 [참고 자료]만을 근거로 답해줘.
    [참고 자료]
    {'{context}'}
    [질문]
    {'{question}'}
    """

    # 3) 제미나이가 답변 생성
    response = genai_client.models.generate_content(
        model="gemini-3.5-flash", contents=prompt
    )
    return response.text`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-lg text-gray-700">query() = <strong>검색</strong>, generate_content() = <strong>생성</strong>, 그 사이의 prompt = <strong>핵심 연결</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. R은 Retrieval(검색)으로 벡터DB에서 관련 자료를 찾아오는 단계이고, G는 Generation(생성)으로 제미나이가 답변을 만드는 단계입니다. RAG의 핵심은 AI가 모르는 내용도 검색한 자료를 참고하면 답할 수 있다는 것입니다. 검색 결과를 prompt에 어떻게 넣느냐가 답변 품질을 크게 좌우합니다. 좋은 프롬프트 작성법이 여기서 빛을 발합니다.",
    content: (
      <div className="flex flex-col gap-4">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">✅ <strong>R</strong>etrieval = 벡터DB에서 관련 자료 검색</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">✅ <strong>G</strong>eneration = 제미나이가 자료 기반 답변 생성</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">✅ 핵심: AI가 모르는 내용도 검색한 자료를 참고하면 답할 수 있다</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-lg text-gray-700">✅ prompt 구성 방식이 답변 품질을 좌우한다</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-purple-50 to-indigo-50",
    script: "오늘 강의를 마치겠습니다. 드디어 검색과 생성을 합쳐서 진짜 AI 사서를 완성할 준비가 끝났습니다. 이제 실습에서 직접 RAG 함수를 만들고 Streamlit 챗봇까지 완성해보겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음: RAG 함수 만들기 + Streamlit 챗봇 실습</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function RAG4FullPipelineGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
