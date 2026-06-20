"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "안녕하세요, 여러분. 오늘은 Chroma 벡터DB를 직접 만들어보는 실습을 진행하겠습니다. 총 4가지 미션을 약 25~30분에 걸쳐 수행합니다. 서랍장 만들기, 문서 저장하기, 검색하기, 새 문서 추가하기 순서로 하나씩 진행하겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🗄️</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          벡터DB 실습 미션
        </h1>
        <p className="text-2xl text-gray-500 mt-2">나만의 서랍장에 문서 저장하고 검색하기</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 준비물을 확인하겠습니다. chromadb 패키지가 설치되어 있어야 합니다. 지난 시간에 만든 청크 데이터가 있으면 좋지만, 없으면 예시로 직접 만들어도 됩니다. 빈칸이 포함된 코드 템플릿과 검색 테스트용 질문 한두 개를 미리 생각해두시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션 시작 전 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "chromadb 패키지 설치 (pip install chromadb)" },
            { icon: "📄", text: "지난 시간 청크 데이터 (없으면 예시로 직접 작성)" },
            { icon: "💻", text: "빈칸이 포함된 코드 템플릿 (.py 또는 .ipynb)" },
            { icon: "❓", text: "검색 테스트용 질문 한두 개 미리 준비" },
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
    title: "미션 1: 환경 준비 (5분)",
    bg: "from-rose-50 to-orange-50",
    script: "첫 번째 미션입니다. chromadb가 잘 설치되었는지 확인합니다. 터미널에서 pip install chromadb를 실행한 후, 파이썬에서 import chromadb를 실행하여 에러 없이 '준비 완료!'가 출력되는지 확인하시기 바랍니다. 참고로, Chroma는 컬렉션을 처음 만들 때 내부 임베딩 모델을 한 번 다운로드합니다. 첫 실행이 조금 느릴 수 있지만 한 번만 받으면 이후에는 빨라집니다. 5분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> chromadb 패키지 설치 및 정상 동작 확인</p>
        </div>
        <CodeBlock>{`import chromadb
print("chromadb 준비 완료!")`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <p className="text-lg text-gray-600 mt-2">에러 없이 &ldquo;chromadb 준비 완료!&rdquo;가 출력되는가?</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-base text-gray-600">💡 첫 실행 시 임베딩 모델 다운로드로 잠시 느릴 수 있습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-rose-50 to-pink-50",
    script: "미션 1의 핵심 포인트입니다. chromadb는 순수 파이썬 패키지로, 별도의 서버 설치 없이 로컬에서 바로 사용할 수 있습니다. 첫 실행 시 내부 임베딩 모델을 자동으로 다운로드하기 때문에 시간이 걸릴 수 있지만, 이후에는 빠르게 동작합니다. 설치가 정상적으로 완료되었다면, 이제 벡터DB를 만들 준비가 된 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-xl text-gray-700">chromadb는 별도 서버 설치 없이 <strong>로컬에서 바로 사용</strong> 가능합니다.</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-lg text-gray-600">첫 실행 시 임베딩 모델 자동 다운로드 → 이후에는 빠르게 동작</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: DB 만들고 데이터 저장하기 (8~10분)",
    bg: "from-violet-50 to-purple-50",
    script: "두 번째 미션입니다. 서랍장(컬렉션)을 만들고 청크들을 저장합니다. 빈칸을 채워야 하는 부분은 ids를 생성하는 부분입니다. 각 청크에 고유한 id를 부여해야 하는데, f-string과 반복 변수 i를 활용하여 chunk_0, chunk_1과 같은 형태로 만들면 됩니다. 마지막 줄에서 저장된 청크 개수가 올바르게 출력되는지 확인하시기 바랍니다. 8~10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 컬렉션을 만들고 청크 데이터를 저장합니다.</p>
        </div>
        <CodeBlock>
          {`import chromadb

client = chromadb.Client()
collection = client.create_collection(
    name="my_documents"
)

chunks = [
    "여기에 문서 청크 1 내용",
    "여기에 문서 청크 2 내용",
    "여기에 문서 청크 3 내용",
]

# 빈칸: 각 청크에 고유 id 부여
ids = [____ for i in range(len(chunks))]

collection.add(documents=chunks, ids=ids)
print(f"{collection.count()}개 저장 완료")`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-lg text-gray-600">💡 힌트: f&quot;chunk_{'{i}'}&quot; 형태로 고유 id를 만들 수 있습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-violet-50 to-indigo-50",
    script: "미션 2의 핵심 포인트입니다. collection.add()를 호출하면 Chroma가 내부적으로 각 문서를 자동으로 임베딩하여 저장합니다. 지난 시간에 우리가 직접 수행했던 임베딩 변환 과정을 Chroma가 대신 처리해주는 것입니다. id는 문서를 구별하는 고유 식별자이므로, 반드시 중복되지 않도록 주의해야 합니다. 정답은 f-string을 활용한 f 따옴표 chunk 언더바 중괄호 i 중괄호 닫기 따옴표 형태입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              collection.add() 호출 → Chroma가 <strong>자동으로 임베딩</strong> 생성 및 저장
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="text-lg text-gray-700">
              <strong>id는 고유해야 합니다.</strong> 중복 id로 add하면 에러가 발생할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: DB에서 검색하기 (8~10분)",
    bg: "from-teal-50 to-cyan-50",
    script: "세 번째 미션입니다. 저장한 서랍장에 질문을 던져서 가장 비슷한 청크를 꺼내봅니다. query_texts에 넣을 질문을 직접 작성해야 합니다. 따옴표로 감싼 문자열 형태로 넣으면 됩니다. 예를 들어 question 변수에 '고양이에 대해 알려줘'와 같은 문장을 넣으면 됩니다. 질문과 가장 비슷한 청크 2개가 잘 출력되는지 확인하시기 바랍니다. 우리가 직접 임베딩이나 유사도를 계산하지 않았는데도 검색이 되는 것, 이것이 벡터DB의 핵심입니다. 8~10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 질문을 던져 가장 유사한 문서를 검색합니다.</p>
        </div>
        <CodeBlock>
          {`# 질문을 직접 작성해보세요
question = ____

results = collection.query(
    query_texts=[question],
    n_results=2
)

print("검색된 내용:")
for doc in results["documents"][0]:
    print("-", doc)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-lg text-gray-600">💡 힌트: question = &quot;고양이에 대해 알려줘&quot; 형태로 넣으면 됩니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-teal-50 to-emerald-50",
    script: "미션 3의 핵심 포인트입니다. collection.query()를 호출하면 Chroma가 내부적으로 질문을 임베딩으로 변환하고, 저장된 문서들과의 유사도를 계산하여 가장 가까운 문서를 반환합니다. 이 전체 과정이 한 줄의 코드로 처리됩니다. n_results 값을 변경하면 가져오는 결과의 개수를 조절할 수 있습니다. 시간이 남는 분들은 n_results를 2에서 3, 4로 바꿔보며 결과를 비교해보시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="bg-white/70 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            query() 한 줄로: <strong>질문 임베딩 → 유사도 계산 → 결과 반환</strong> 전부 자동 처리
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-lg text-gray-600">n_results 값을 변경하면 가져오는 문서 개수를 조절할 수 있습니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4: 새 문서 추가 + 재검색 (5~7분)",
    bg: "from-amber-50 to-yellow-50",
    script: "네 번째 미션입니다. 서랍장에 새 문서를 추가한 뒤 같은 질문으로 다시 검색하여 결과가 어떻게 달라지는지 확인합니다. new_chunks에 새로운 문장 1~2개를 직접 작성하여 넣으시기 바랍니다. 추가 후 같은 질문으로 재검색했을 때, 새 문서가 질문과 더 관련이 있다면 결과 순위가 바뀔 수 있습니다. 이것이 벡터DB의 장점입니다. 새 문서를 추가할 때 전체를 다시 처리하지 않고, 새 문서 한 건만 추가하면 됩니다. 5~7분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 새 문서 추가 후 재검색하여 결과 변화를 확인합니다.</p>
        </div>
        <CodeBlock>
          {`# 새로운 청크를 직접 작성해보세요
new_chunks = [____, ____]
new_ids = ["chunk_new_1", "chunk_new_2"]

collection.add(
    documents=new_chunks, ids=new_ids
)
print(f"총 {collection.count()}개 저장")

# 같은 질문으로 재검색
results = collection.query(
    query_texts=[question], n_results=2
)
print("재검색 결과:")
for doc in results["documents"][0]:
    print("-", doc)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-lg text-gray-600">새 문서가 질문과 더 관련 있다면 결과 순위가 달라질 수 있습니다!</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4 해설",
    bg: "from-amber-50 to-orange-50",
    script: "미션 4의 핵심 포인트입니다. 벡터DB에 새 문서를 추가할 때, 기존에 저장된 문서를 다시 처리할 필요가 없습니다. 새로 추가한 문서만 임베딩하여 저장하면 됩니다. 이것이 지난 시간 방식과의 가장 큰 차이점입니다. 지난 방식에서는 문서가 추가될 때마다 전체를 다시 임베딩해야 했습니다. 또한 저장된 문서가 바뀌면 검색 결과도 자동으로 달라지는 것을 확인하셨을 것입니다. 이처럼 벡터DB는 유연하고 효율적인 문서 관리를 가능하게 합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">새 문서 추가 시 <strong>기존 문서 재처리 불필요</strong> — 새 문서만 임베딩하여 저장</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="font-semibold text-orange-700 mb-2">지난 방식</p>
              <p className="text-gray-600">문서 추가 시 전체를 다시 임베딩</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">벡터DB</p>
              <p className="text-gray-600">새 문서 한 건만 추가하면 끝</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 4가지 미션을 모두 수행하셨습니다. chromadb 설치 확인, 서랍장(컬렉션) 만들기, 청크 저장(add), 질문으로 검색(query), 새 문서 추가 및 재검색까지 해보았습니다. 한 번 정리해두면 두고두고 빠르게 꺼내 쓸 수 있는 자동 도서관을 직접 만든 것입니다. 다음 시간에는 이 도서관에 친절한 AI 사서(제미나이)를 연결해서 진짜 RAG 앱을 완성하겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "chromadb 설치 및 환경 확인", color: "bg-rose-100" },
            { num: "2", text: "서랍장(컬렉션) 만들고 청크 저장 (add)", color: "bg-violet-100" },
            { num: "3", text: "질문으로 유사 문서 검색 (query)", color: "bg-teal-100" },
            { num: "4", text: "새 문서 추가 후 재검색으로 결과 변화 확인", color: "bg-amber-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "오늘 실습을 마치겠습니다. 여러분 모두 훌륭하게 수행해주셨습니다. 다음 시간에는 이 벡터DB에 제미나이를 연결하여 진짜 RAG 챗봇을 완성하겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 벡터DB + 제미나이 = RAG 챗봇</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function RAG3VectorDBTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
