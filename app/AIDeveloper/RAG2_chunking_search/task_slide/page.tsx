"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-teal-50 to-cyan-50",
    script: "안녕하세요, 여러분. 오늘은 지난 시간에 배운 청킹과 검색의 개념을 바탕으로, 직접 나만의 문서 검색기를 만들어보겠습니다. 긴 텍스트를 청크로 나누고, 각 청크를 임베딩해서, 질문과 가장 비슷한 조각을 찾아주는 검색기를 완성할 것입니다. 총 4가지 미션을 약 25~30분에 걸쳐 수행합니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🔍</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          청킹 & 검색 실습
        </h1>
        <p className="text-2xl text-gray-500 mt-2">나만의 문서 검색기 만들기</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, google-genai와 numpy 패키지가 설치되어 있어야 합니다. 둘째, 실습용 긴 텍스트 문서가 필요합니다. 5~6개 문단 이상으로 구성된 학교 소개, 동아리 안내, 특정 주제 설명문 등이 적합합니다. 셋째, 빈칸이 포함된 코드 템플릿을 준비해주시기 바랍니다. 넷째, 문서 내용을 기반으로 한 테스트 질문 몇 개를 미리 생각해두시면 좋습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "google-genai, numpy 패키지 설치 확인" },
            { icon: "📄", text: "실습용 긴 텍스트 문서 (5~6개 문단 이상)" },
            { icon: "📝", text: "빈칸 포함 코드 템플릿 (.py 또는 .ipynb)" },
            { icon: "❓", text: "문서 내용 기반 테스트 질문 준비" },
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
    title: "미션 1: 실습용 문서 준비 (5분)",
    bg: "from-green-50 to-emerald-50",
    script: "첫 번째 미션입니다. 검색기로 다룰 긴 텍스트 자료를 준비하겠습니다. 학교 소개 글, 동아리 안내, 좋아하는 주제 설명문 등 여러 문단으로 이루어진 글이면 좋습니다. 최소 5~6개 문단 이상이어야 청킹 효과를 체감할 수 있습니다. 문서가 한 가지 주제만 다루지 않고 여러 소주제를 담고 있는지 확인해주시기 바랍니다. 5분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 검색기로 다룰 긴 텍스트 자료를 준비합니다.</p>
        </div>
        <CodeBlock>
          {`document = """
(여기에 여러 문단으로 구성된 긴 텍스트)
예: 학교 소개, 동아리 안내, 특정 주제 설명 등
최소 5~6개 문단 이상 권장
"""`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 여러 소주제(문단)를 담고 있는가?</li>
            <li>• 충분히 긴 글로 준비했는가?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 문서를 청크로 쪼개기 (8~10분)",
    bg: "from-blue-50 to-indigo-50",
    script: "두 번째 미션입니다. 긴 문서를 일정 글자 수 단위로 잘라서 여러 청크로 나눠보겠습니다. 화면의 코드에서 빈칸을 직접 채워주시기 바랍니다. 두 빈칸 모두 '얼마만큼씩 자를지'를 정하는 값입니다. 함수에 이미 들어와 있는 매개변수를 생각해보시기 바랍니다. 코드를 실행하면 총 몇 개의 청크로 나뉘었는지와 첫 번째 청크의 내용이 출력됩니다. 8~10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 긴 문서를 일정 글자 수 단위로 청크로 나눕니다.</p>
        </div>
        <CodeBlock>
          {`def split_into_chunks(text, chunk_size=200):
    chunks = []
    for i in range(0, len(text), ____):
        chunk = text[i:i + ____]
        chunks.append(chunk)
    return chunks

chunks = split_into_chunks(document, chunk_size=200)
print(f"총 {len(chunks)}개의 청크로 나뉘었습니다.")
print("첫 번째 청크:", chunks[0])`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-base text-gray-600"><strong>힌트:</strong> 두 빈칸 모두 함수 매개변수 중 하나입니다. 얼마만큼씩 자를지를 정하는 값입니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-blue-50 to-cyan-50",
    script: "미션 2의 핵심 포인트입니다. 빈칸에 들어갈 값은 chunk_size입니다. range 함수에서 chunk_size 간격으로 반복하면서, 매번 chunk_size만큼의 텍스트를 잘라내는 구조입니다. 청크 개수는 문서 길이를 chunk_size로 나눈 값에 가깝게 나옵니다. 문서가 1000글자이고 chunk_size가 200이면 약 5개의 청크가 생성됩니다. 이렇게 나눈 청크들은 각각 독립적인 의미를 가지며, 다음 단계에서 임베딩으로 변환될 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-lg text-gray-700">
              빈칸 정답: <code className="bg-gray-200 px-2 py-1 rounded">chunk_size</code>
            </p>
            <p className="text-base text-gray-600 mt-2">
              range(0, len(text), <strong>chunk_size</strong>) → chunk_size 간격으로 반복
              <br />text[i:i + <strong>chunk_size</strong>] → chunk_size만큼 텍스트 슬라이싱
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              예: 1000글자 문서, chunk_size=200 → 약 <strong>5개</strong> 청크 생성
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 검색 함수 만들기 (8~10분)",
    bg: "from-violet-50 to-purple-50",
    script: "세 번째 미션입니다. 모든 청크를 임베딩으로 변환하고, 질문과 가장 비슷한 청크를 찾아주는 search 함수를 완성해보겠습니다. 두 개의 빈칸을 채워야 합니다. 첫 번째 빈칸에는 cosine_similarity 함수에 질문 임베딩과 청크 임베딩을 넣으면 됩니다. 두 번째 빈칸에는 문서 내용과 관련된 질문을 따옴표로 감싼 문자열로 넣으면 됩니다. 이 search 함수는 도서관 사서와 같은 역할을 합니다. 질문이 오면 모든 청크의 위치를 살펴보고, 질문과 가장 가까운 위치에 있는 청크를 꺼내 건네주는 것입니다. 8~10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 질문과 가장 유사한 청크를 찾는 검색 함수를 완성합니다.</p>
        </div>
        <CodeBlock>
          {`chunk_embeddings = [
    get_embedding(chunk) for chunk in chunks
]

def search(query, top_k=1):
    query_embedding = get_embedding(query)
    similarities = []
    for chunk_emb in chunk_embeddings:
        sim = ____  # cosine_similarity 사용
        similarities.append(sim)
    top_indices = np.argsort(
        similarities
    )[::-1][:top_k]
    return [chunks[i] for i in top_indices]

question = ____  # 문서 관련 질문
results = search(question)
print("가장 관련 있는 내용:")
for r in results:
    print("-", r)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4 space-y-2">
          <p className="text-base text-gray-600"><strong>힌트 1:</strong> cosine_similarity(query_embedding, chunk_emb)</p>
          <p className="text-base text-gray-600"><strong>힌트 2:</strong> 문서 내용에 대한 질문 문자열 (예: &ldquo;동아리는 어떻게 가입하나요?&rdquo;)</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-violet-50 to-indigo-50",
    script: "미션 3의 핵심 포인트를 정리하겠습니다. 여러분이 만든 search 함수는 도서관 사서와 같은 역할을 합니다. 질문(query)이 들어오면 먼저 질문을 임베딩으로 변환합니다. 그 다음 모든 청크의 임베딩과 유사도를 계산합니다. 마지막으로 유사도가 가장 높은 청크를 결과로 돌려줍니다. 아직 이 결과를 '설명'해주지는 않지만, 정확한 자료를 찾아주는 역할까지는 완성한 것입니다. 다음 차시에서는 이 자료를 AI에게 전달하여 자연스러운 답변을 생성하는 부분을 추가할 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-lg text-gray-700 font-semibold mb-3">search 함수 = 도서관 사서 👩‍🏫</p>
            <ol className="text-base text-gray-600 space-y-2">
              <li>1. 질문을 임베딩으로 변환</li>
              <li>2. 모든 청크와 유사도 계산</li>
              <li>3. 가장 유사한 청크를 결과로 반환</li>
            </ol>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-base text-gray-600">
              오늘은 &ldquo;자료 찾기&rdquo;까지 완성. 다음 시간에 &ldquo;자료를 보고 답변 생성&rdquo;을 추가합니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4: 다양한 질문으로 테스트 (5~7분)",
    bg: "from-amber-50 to-yellow-50",
    script: "네 번째 미션입니다. 검색기가 잘 동작하는지 여러 질문을 직접 넣어보며 확인해보겠습니다. question 값을 바꿔가며 실행하면 됩니다. 문서 안 내용에 대해 서로 다른 질문 3개 이상을 넣어보고, 어떤 청크가 검색되는지 비교해보시기 바랍니다. top_k를 2로 늘리면 관련 있는 청크를 여러 개 받아볼 수도 있습니다. 5~7분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 다양한 질문으로 검색기의 정확도를 테스트합니다.</p>
        </div>
        <CodeBlock>
          {`question = "여기에 질문을 바꿔서 넣어보세요"
results = search(question)

print("가장 관련 있는 내용:")
for r in results:
    print("-", r)`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 질문과 관련된 청크가 잘 검색되는가?</li>
            <li>• 서로 다른 질문 3개 이상을 테스트해보기</li>
            <li>• top_k=2로 늘려서 여러 결과 확인해보기</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 4가지 미션을 모두 수행하셨습니다. 정리하겠습니다. 미션 1에서는 실습용 긴 문서를 준비했습니다. 미션 2에서는 문서를 청크로 쪼개는 청킹 함수를 완성했습니다. 미션 3에서는 질문과 가장 유사한 청크를 찾는 검색 함수를 만들었습니다. 미션 4에서는 다양한 질문으로 검색기를 테스트했습니다. 오늘 만든 것은 도서관의 검색 카운터와 같습니다. 다만 매번 코드를 실행할 때마다 모든 청크를 다시 임베딩했는데, 다음 시간에는 이것을 벡터 데이터베이스(Chroma)에 저장하여 빠르게 검색하는 방법을 배우겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "실습용 긴 문서 준비", color: "bg-green-100" },
            { num: "2", text: "문서를 청크로 쪼개기 (청킹 함수)", color: "bg-blue-100" },
            { num: "3", text: "질문과 유사한 청크를 찾는 검색 함수", color: "bg-violet-100" },
            { num: "4", text: "다양한 질문으로 검색기 테스트", color: "bg-amber-100" },
          ].map((item) => (
            <div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
              <span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">다음 시간: 벡터DB(Chroma)에 저장하여 빠르게 검색하기</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-teal-50 to-cyan-50",
    script: "오늘 실습을 마치겠습니다. 긴 문서를 청크로 나누고, 질문에 맞는 조각을 검색하는 도서관 검색 카운터를 완성하셨습니다. 다음 시간에는 벡터 데이터베이스를 활용하여 매번 다시 임베딩하지 않고도 빠르게 검색할 수 있는 방법을 배우겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 벡터DB 구축하기</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function RAG2ChunkingSearchTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
