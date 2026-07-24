"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 '벡터DB'입니다. 지난 시간에 우리는 문서를 청킹하고 임베딩으로 변환한 뒤 유사도 검색을 수행했습니다. 하지만 매번 코드를 실행할 때마다 모든 청크를 처음부터 다시 임베딩해야 하는 비효율이 있었습니다. 오늘은 이 문제를 해결하는 '벡터DB', 구체적으로 Chroma라는 도구를 배우겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🗄️</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          벡터DB가 뭐냥?
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          한 번 정리하면 끝! Chroma 벡터DB 개념 강의
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "오늘 강의의 학습 목표를 확인하겠습니다. 첫째, 벡터DB가 무엇인지, 왜 필요한지 설명할 수 있어야 합니다. 둘째, Chroma 벡터DB에 문서를 저장(add)하고 검색(query)하는 기본 사용법을 이해합니다. 셋째, 한 번 저장한 임베딩을 다시 계산하지 않고 재사용하는 원리를 파악합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "벡터DB가 무엇인지, 왜 필요한지 설명할 수 있다" },
            { num: "2", text: "Chroma에 문서를 저장(add)하고 검색(query)하는 기본 사용법을 익힌다" },
            { num: "3", text: "한 번 저장한 임베딩을 다시 계산하지 않고 재사용하는 원리를 이해한다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-indigo-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "지난 시간의 문제점",
    bg: "from-orange-50 to-red-50",
    script: "지난 시간에 만든 검색기를 떠올려보겠습니다. 질문 하나를 할 때마다 우리는 모든 청크를 다시 임베딩하고, 유사도를 처음부터 다시 계산했습니다. 문서가 몇 개일 때는 괜찮지만, 100개 1000개가 되면 매번 전체를 다시 처리하는 것은 매우 비효율적입니다. 한 번 분류해둔 책들을 찾을 때마다 매번 다시 분류할 필요가 있을까요? 당연히 없겠죠. 한 번 정리해두고 계속 재사용하는 것이 합리적입니다. 바로 그 역할을 하는 것이 벡터DB입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">지난 시간 검색기의 비효율을 되돌아봅니다.</p>
        <div className="space-y-4">
          {[
            { icon: "🔄", text: "실행할 때마다 모든 청크를 처음부터 다시 임베딩" },
            { icon: "💸", text: "같은 API 호출을 반복 — 느리고 비용 낭비" },
            { icon: "📈", text: "문서가 많아질수록 시간이 기하급수적으로 증가" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-400">
          <p className="text-lg text-gray-700 italic">&ldquo;한 번 분류해둔 책들을, 찾을 때마다 매번 다시 분류할 필요가 있을까?&rdquo;</p>
        </div>
      </div>
    ),
  },
  {
    title: "벡터DB란 무엇인가",
    bg: "from-green-50 to-emerald-50",
    script: "벡터DB는 임베딩 벡터들을 미리 저장해두고, 필요할 때 빠르게 검색할 수 있게 해주는 전용 데이터베이스입니다. 오늘 우리가 사용할 도구는 가볍고 무료로 사용할 수 있는 Chroma입니다. 핵심 비유로 설명하자면, 지난 시간의 방식은 매번 책상 위에 책을 전부 펼쳐놓고 하나하나 다시 분류한 다음 찾는 '임시 메모지' 방식이었습니다. 벡터DB는 이미 분류가 끝난 '정리된 서랍장'입니다. 한 번 책을 분류해서 서랍에 넣어두면, 다음에는 서랍만 열어서 바로 꺼내면 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>벡터DB</strong> = 임베딩 벡터를 <strong>미리 저장</strong>해두고,
            필요할 때 <strong>빠르게 검색</strong>할 수 있는 전용 데이터베이스
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-7xl">🗄️</span>
          <div>
            <p className="text-xl text-gray-600">오늘 사용할 도구: <strong>Chroma</strong></p>
            <p className="text-base text-gray-500">가볍고 무료로 사용 가능한 벡터DB</p>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            비유: <strong>임시 메모지</strong>(매번 다시 분류) → <strong>정리된 서랍장</strong>(한 번 저장, 계속 재사용)
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "임시 메모지 vs 정리된 서랍장",
    bg: "from-purple-50 to-pink-50",
    script: "지난 시간 방식과 벡터DB 방식을 표로 비교해보겠습니다. 지난 시간 방식은 매번 책을 다 펼쳐 다시 분류하는 것이고, 벡터DB는 한 번 분류해 서랍에 저장하는 것입니다. 지난 방식은 찾을 때마다 임베딩을 새로 계산하지만, 벡터DB는 저장된 임베딩을 그대로 재사용합니다. 지난 방식은 책이 많아지면 점점 느려지지만, 벡터DB는 서랍만 열면 바로 꺼낼 수 있습니다. 새 책이 들어와도 전체를 다시 분류하지 않고, 새 책 한 권만 서랍에 추가하면 됩니다.",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left"></th>
              <th className="p-4 text-left">지난 시간 방식 📝</th>
              <th className="p-4 text-left">벡터DB 방식 🗄️</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              ["비유", "임시 메모지", "정리된 서랍장"],
              ["임베딩", "매번 전체를 다시 계산", "한 번만 저장, 재사용"],
              ["검색 속도", "문서가 많으면 느려짐", "서랍에서 바로 꺼냄"],
              ["새 문서 추가", "전체를 다시 분류", "새 문서만 추가"],
            ].map(([label, old, neww], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-4 font-semibold">{label}</td>
                <td className="p-4">{old}</td>
                <td className="p-4">{neww}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "Chroma 핵심 세 가지 동작",
    bg: "from-cyan-50 to-blue-50",
    script: "Chroma의 사용법은 매우 간단합니다. 딱 세 가지 동작만 기억하시면 됩니다. 첫째, 컬렉션 만들기입니다. client.create_collection()으로 문서를 담을 서랍장을 생성합니다. 둘째, 저장하기입니다. collection.add()를 호출하면 문서를 넣으면서 자동으로 임베딩까지 해서 저장합니다. 지난 시간에 우리가 직접 했던 임베딩 변환을 Chroma가 알아서 처리해주는 것입니다. 셋째, 검색하기입니다. collection.query()로 질문에 가장 비슷한 문서를 꺼내줍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">Chroma는 세 가지 동작만 기억하면 됩니다.</p>
        {[
          { num: "1", title: "컬렉션 만들기", code: "client.create_collection()", desc: "문서를 담을 서랍장 생성" },
          { num: "2", title: "저장하기 (add)", code: "collection.add()", desc: "문서를 넣으면 자동으로 임베딩해서 저장" },
          { num: "3", title: "검색하기 (query)", code: "collection.query()", desc: "질문에 가장 비슷한 문서를 꺼내줌" },
        ].map((item) => (
          <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
            <div>
              <p className="text-lg font-semibold text-gray-800">{item.title}</p>
              <p className="text-base text-gray-600">{item.desc}</p>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{item.code}</code>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "코드 예시: 서랍장 만들고 문서 넣기",
    bg: "from-blue-50 to-indigo-50",
    script: "기본 코드 구조를 살펴보겠습니다. 먼저 코드 맨 위의 GeminiEmbedding 클래스를 봐주세요. 이것은 Chroma에게 임베딩을 제미나이에게 맡기라고 알려주는 연결 코드입니다. Chroma에 내장된 기본 임베딩 모델은 영어 위주로 학습되어 있어 한국어 문서 검색이 부정확하기 때문에, 지난 시간부터 써온 제미나이 임베딩을 연결해서 사용합니다. 이 클래스는 그대로 복사해서 쓰면 됩니다. 그다음 create_collection으로 컬렉션, 즉 서랍장을 만드는데, 이때 embedding_function에 GeminiEmbedding을 넣어 연결합니다. collection.add()로 문서를 저장할 때는 documents에 문서 내용을, ids에 고유한 식별자를 넣어줍니다. 중요한 점은 id가 절대 중복되어서는 안 된다는 것입니다. chunk_0, chunk_1처럼 서로 다른 이름을 붙여주어야 합니다.",
    content: (
      <div className="flex flex-col gap-5">
        <CodeBlock>
          {`import chromadb
from chromadb import EmbeddingFunction
from google import genai

genai_client = genai.Client(api_key="본인의 API 키")

# 제미나이 임베딩을 Chroma에 연결 (그대로 복사)
class GeminiEmbedding(EmbeddingFunction):
    def __call__(self, input):
        result = genai_client.models.embed_content(
            model="gemini-embedding-001",
            contents=list(input),
        )
        return [e.values for e in result.embeddings]

client = chromadb.Client()

# 컬렉션(서랍장) 만들기 — 제미나이 임베딩 연결
collection = client.create_collection(
    name="my_documents",
    embedding_function=GeminiEmbedding(),
)

# 문서를 id와 함께 저장
collection.add(
    documents=["고양이는 귀엽다", "강아지는 충성스럽다"],
    ids=["doc_0", "doc_1"]
)`}
        </CodeBlock>
        <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-lg text-gray-700"><strong>주의:</strong> id는 절대 중복되면 안 됩니다. 같은 id로 다시 add하면 에러가 발생할 수 있습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "코드 예시: 질문으로 검색하기",
    bg: "from-teal-50 to-cyan-50",
    script: "저장한 문서를 검색하는 코드는 더욱 간단합니다. collection.query()에 query_texts로 질문을 전달하고, n_results로 가져올 문서 개수를 지정합니다. 여기서 주목할 점은, 우리가 직접 임베딩을 생성하거나 유사도를 계산하지 않았다는 것입니다. Chroma가 질문을 우리가 연결해둔 제미나이 임베딩으로 변환한 다음, 저장된 문서들과의 유사도 계산까지 자동으로 처리해줍니다.",
    content: (
      <div className="flex flex-col gap-5">
        <CodeBlock>
          {`# 질문과 가장 비슷한 문서를 검색
results = collection.query(
    query_texts=["귀여운 동물은?"],
    n_results=1
)

print(results["documents"][0])`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="text-lg text-gray-700">
            <strong>핵심:</strong> 임베딩 생성과 유사도 계산을 직접 하지 않아도 됩니다.
          </p>
          <p className="text-base text-gray-600">
            Chroma가 연결해둔 제미나이 임베딩으로 질문을 변환해 자동 처리합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "벡터DB의 핵심 원리",
    bg: "from-emerald-50 to-green-50",
    script: "벡터DB의 핵심을 한 문장으로 정리하겠습니다. 벡터DB는 '저장과 검색을 함께' 담당합니다. 임베딩 결과를 DB에 한 번만 넣어두면 계속 재사용할 수 있다는 것이 핵심입니다. add()를 호출하면 임베딩이 자동으로 생성되고, query()를 호출하면 가장 가까운 문서를 자동으로 찾아줍니다. 그리고 중요한 예고를 하겠습니다. 오늘 만든 이 벡터DB는 다음 시간에 제미나이와 연결하여 진짜 RAG 앱으로 완성될 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-6 text-center">
          <p className="text-2xl text-gray-800 font-semibold">
            벡터DB = &ldquo;저장 + 검색&rdquo;을 함께 담당
          </p>
          <p className="text-xl text-gray-600 mt-3">
            임베딩 결과를 DB에 <strong>한 번만</strong> 넣어두면 계속 재사용 가능
          </p>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
            <span className="text-green-500 text-xl">✅</span>
            <p className="text-lg text-gray-700">add() 호출 → 임베딩 자동 생성 및 저장</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
            <span className="text-green-500 text-xl">✅</span>
            <p className="text-lg text-gray-700">query() 호출 → 가장 가까운 문서 자동 검색</p>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            📌 다음 시간 예고: 이 벡터DB에 제미나이를 연결하여 진짜 RAG 앱을 완성합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, 지난 시간의 방식은 매번 전체를 다시 임베딩해야 하는 비효율이 있었습니다. 둘째, 벡터DB는 임베딩을 한 번 저장해두고 계속 재사용할 수 있게 해주는 전용 데이터베이스입니다. 셋째, Chroma의 핵심 동작은 세 가지로 컬렉션 생성, add로 저장, query로 검색입니다. 넷째, 컬렉션을 만들 때는 한국어 검색이 정확하도록 제미나이 임베딩을 embedding_function으로 연결합니다. 다섯째, id는 문서마다 고유해야 하며 중복되면 안 됩니다. 다음 시간에는 이 벡터DB에서 검색한 결과를 제미나이에게 전달하여 답변을 생성하는 RAG 파이프라인을 완성하겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ 지난 방식: 매번 전체를 다시 임베딩 → 비효율</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ 벡터DB: 한 번 저장하고 계속 재사용</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ Chroma 핵심: create_collection → add → query</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ 한국어 검색은 제미나이 임베딩 연결 (embedding_function)</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">✅ id는 문서마다 고유해야 함 (중복 불가)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "오늘 강의를 마치겠습니다. 벡터DB는 한 번 정리해두면 두고두고 빠르게 꺼내 쓸 수 있는 자동 도서관 시스템입니다. 다음 시간에는 이 도서관에 친절한 AI 사서(제미나이)를 연결해서 진짜 RAG 앱을 완성하겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 벡터DB + 제미나이 = RAG 챗봇 완성</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function RAG3VectorDBGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
