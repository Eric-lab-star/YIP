"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 'RAG와 임베딩'입니다. RAG은 Retrieval-Augmented Generation의 약자로, AI가 학습하지 못한 정보도 정확하게 답할 수 있도록 만들어주는 기술입니다. 그리고 임베딩은 RAG의 핵심 재료로, 문장을 숫자로 변환하여 컴퓨터가 의미를 비교할 수 있게 해주는 기술입니다. 이 두 가지 개념은 현대 AI 애플리케이션의 근간이 되는 매우 중요한 내용이므로, 집중해서 들어주시기 바랍니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📚</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          RAG와 임베딩
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          문장을 숫자로 바꾸는 임베딩 이야기
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "오늘 강의의 학습 목표를 확인하겠습니다. 첫째, RAG이 무엇인지, 왜 필요한지 설명할 수 있어야 합니다. 둘째, 임베딩(Embedding)의 개념을 이해해야 합니다. 셋째, 문장이 숫자(벡터)로 변환된다는 것을 체험적으로 이해해야 합니다. 이 세 가지를 오늘 강의가 끝나기 전까지 확실히 습득하는 것이 목표입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            { num: "1", text: "RAG이 무엇인지, 왜 필요한지 설명할 수 있다" },
            { num: "2", text: "임베딩(Embedding)의 개념을 이해한다" },
            { num: "3", text: "문장이 숫자(벡터)로 바뀐다는 것을 체험으로 이해한다" },
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
    title: "AI의 한계: 모르는 정보",
    bg: "from-blue-50 to-indigo-50",
    script: "먼저 RAG이 왜 필요한지부터 이해해보겠습니다. 우리가 지금까지 사용해온 AI, 예를 들어 제미나이는 매우 똑똑하지만, 자기가 학습한 시점까지의 정보만 알고 있습니다. 예를 들어 '우리 학교 급식 메뉴가 뭐야?'라고 물어보면, AI는 그런 정보를 학습한 적이 없기 때문에 엉뚱한 대답을 하거나 모른다고 답합니다. 이것은 AI의 근본적인 한계입니다. AI는 기억으로만 대답하는 친구와 같습니다. 기억에 없는 것은 답할 수 없는 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-800 font-semibold">
            AI는 학습한 시점까지의 정보만 알고 있습니다.
          </p>
        </div>
        <div className="bg-white/70 rounded-xl p-6">
          <p className="text-xl text-gray-700 mb-3">예시 질문:</p>
          <p className="text-lg text-gray-600 italic mb-2">&ldquo;우리 학교 급식 메뉴가 뭐야?&rdquo;</p>
          <p className="text-lg text-red-600">→ AI: 모르는 정보이므로 엉뚱한 답변 또는 거절</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-5">
          <p className="text-lg text-gray-700">
            AI는 <strong>기억으로만 대답하는 친구</strong>와 같습니다.
            <br />기억에 없는 것은 답할 수 없습니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "RAG: AI에게 참고 자료를 주는 방법",
    bg: "from-green-50 to-emerald-50",
    script: "이 문제를 해결하는 방법이 바로 RAG입니다. RAG은 Retrieval-Augmented Generation의 약자로, AI에게 참고할 자료를 함께 건네주고 그 자료를 보고 답하게 하는 방법입니다. 쉽게 비유하면 '오픈북 시험'과 같습니다. 외운 것만으로 보는 시험에서는 기억에 없으면 답을 못 쓰지만, 오픈북 시험에서는 자료를 찾아보며 답을 쓸 수 있습니다. RAG은 AI에게 오픈북 시험을 보게 해주는 기술입니다. 모르는 것도 자료만 있으면 정확하게 답할 수 있게 되는 것입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-lg text-gray-500 mb-1">
            RAG = <strong>R</strong>etrieval-<strong>A</strong>ugmented <strong>G</strong>eneration
          </p>
          <p className="text-xl text-gray-700">
            AI에게 <strong>참고할 자료</strong>를 함께 건네주고,
            <br />그 자료를 보고 답하게 하는 방법입니다.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">시험 방식</th>
                <th className="p-4 text-left">AI의 답변 방식</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-white">
                <td className="p-4">외운 것만으로 보는 시험</td>
                <td className="p-4">그냥 AI에게 바로 물어보기</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 font-semibold text-green-700">오픈북 시험</td>
                <td className="p-4 font-semibold text-green-700">RAG — 자료를 찾아서 함께 주고 답하게 하기</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "임베딩이란?",
    bg: "from-purple-50 to-violet-50",
    script: "RAG에서 자료를 찾으려면 한 가지 문제가 있습니다. 컴퓨터는 우리처럼 글자를 그대로 이해하지 못합니다. 컴퓨터가 문장을 비교하려면, 먼저 숫자(벡터)로 변환해야 합니다. 이 변환 작업이 바로 임베딩(Embedding)입니다. 임베딩은 문장을, 의미가 비슷하면 가까운 위치에, 의미가 다르면 먼 위치에 놓는 숫자 좌표로 바꾸는 작업입니다. 가장 중요한 점은, 임베딩은 글자 비교가 아니라 의미 비교라는 것입니다. 예를 들어 '강아지'와 '개'는 글자는 완전히 다르지만, 의미가 같기 때문에 임베딩으로 변환하면 매우 가까운 좌표에 위치하게 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>임베딩(Embedding)</strong>이란 문장을
            <br /><strong>의미에 따른 숫자 좌표</strong>로 변환하는 작업입니다.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-gray-400">
            <p className="font-semibold text-gray-700 mb-2">🔡 글자 그대로 비교</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>&ldquo;강아지&rdquo;와 &ldquo;개&rdquo;는 글자가 달라서 → 다른 것</li>
              <li>겉모습(철자)만 비교함</li>
            </ul>
          </div>
          <div className="bg-white/70 rounded-xl p-5 border-l-4 border-purple-400">
            <p className="font-semibold text-purple-700 mb-2">🧭 임베딩(의미 비교)</p>
            <ul className="text-base text-gray-600 space-y-1">
              <li>&ldquo;강아지&rdquo;와 &ldquo;개&rdquo;는 의미가 같아서 → 가까운 좌표</li>
              <li>의미가 비슷하면 거리가 가까움</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "임베딩의 원리: 도서관 비유",
    bg: "from-violet-50 to-pink-50",
    script: "임베딩을 도서관에 비유하면 이해가 쉽습니다. 도서관에서 책을 찾을 때, 책 제목을 글자 한 글자씩 비교하지 않습니다. 대신, 비슷한 주제의 책들을 한 책장에 모아두는 분류 작업을 먼저 합니다. 임베딩은 바로 이 '책을 의미에 따라 같은 책장 근처에 꽂아두는 작업'과 같습니다. 비슷한 의미의 문장은 가까운 자리에, 다른 의미의 문장은 먼 자리에 놓이게 됩니다. 그리고 나중에 질문이 들어오면, 그 질문과 가장 가까운 책장에서 자료를 꺼내오는 것입니다. 이것이 RAG의 검색 원리입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <span className="text-6xl">📖</span>
          <div>
            <p className="text-xl text-gray-700 mb-2">
              임베딩 = <strong>책을 의미에 따라 같은 책장 근처에 꽂아두는 작업</strong>
            </p>
            <p className="text-lg text-gray-600">
              비슷한 의미의 문장은 가까운 자리에, 다른 의미의 문장은 먼 자리에 놓입니다.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🐕</span>
            <p className="text-lg text-gray-700">&ldquo;강아지&rdquo;와 &ldquo;개&rdquo; → 같은 책장 (가까운 좌표)</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <p className="text-lg text-gray-700">&ldquo;강아지&rdquo;와 &ldquo;자동차&rdquo; → 먼 책장 (먼 좌표)</p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            질문이 들어오면 → 질문과 <strong>가장 가까운 책장</strong>에서 자료를 꺼내옵니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "유사도: 두 좌표 사이의 거리",
    bg: "from-cyan-50 to-blue-50",
    script: "임베딩으로 변환된 문장들은 거대한 지도 위의 좌표와 같습니다. 두 문장이 얼마나 비슷한지를 측정하는 것을 '유사도 계산'이라고 합니다. 구체적으로는 '코사인 유사도'라는 수학적 방법을 사용합니다. 유사도 값은 0에서 1 사이의 숫자로 나타나며, 1에 가까울수록 의미가 비슷하고, 0에 가까울수록 의미가 다릅니다. 예를 들어, '오늘 날씨가 좋다'와 '오늘 기분이 화창하다'는 유사도가 높게 나오고, '오늘 날씨가 좋다'와 '점심으로 김치볶음밥을 먹었다'는 유사도가 낮게 나옵니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>유사도</strong> = 임베딩 좌표 사이의 거리를 측정하는 것
          </p>
          <p className="text-lg text-gray-500 mt-2">코사인 유사도: 0(완전 다름) ~ 1(완전 같음)</p>
        </div>
        <div className="space-y-3">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>높은 유사도:</strong> &ldquo;오늘 날씨가 좋다&rdquo; ↔ &ldquo;오늘 기분이 화창하다&rdquo;
            </p>
            <p className="text-base text-green-600 mt-1">→ 의미가 비슷 → 가까운 거리 → 높은 점수</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>낮은 유사도:</strong> &ldquo;오늘 날씨가 좋다&rdquo; ↔ &ldquo;점심으로 김치볶음밥을 먹었다&rdquo;
            </p>
            <p className="text-base text-red-600 mt-1">→ 의미가 다름 → 먼 거리 → 낮은 점수</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "RAG의 전체 흐름",
    bg: "from-emerald-50 to-teal-50",
    script: "이제 RAG의 전체적인 흐름을 정리하겠습니다. RAG은 크게 세 단계로 이루어져 있습니다. 첫 번째는 준비 단계입니다. 참고 자료(문서)를 임베딩으로 변환하여 저장해둡니다. 두 번째는 검색 단계입니다. 사용자의 질문도 임베딩으로 변환한 후, 저장된 자료 중에서 질문과 가장 유사한 자료를 찾아냅니다. 세 번째는 생성 단계입니다. 찾아낸 자료를 AI에게 함께 전달하여, AI가 자료를 참고해서 답변을 생성합니다. 오늘은 이 중에서 첫 번째와 두 번째 단계의 핵심인 '임베딩'에 집중하겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">RAG의 세 단계</p>
        {[
          { num: "1", title: "준비 (Indexing)", desc: "참고 자료를 임베딩으로 변환하여 저장", color: "bg-blue-500", highlight: true },
          { num: "2", title: "검색 (Retrieval)", desc: "질문과 가장 유사한 자료를 찾아냄", color: "bg-green-500", highlight: true },
          { num: "3", title: "생성 (Generation)", desc: "찾은 자료를 AI에게 전달하여 답변 생성", color: "bg-purple-500", highlight: false },
        ].map((item) => (
          <div key={item.num} className={`rounded-xl p-5 flex items-start gap-4 ${item.highlight ? "bg-white/70 border-2 border-orange-200" : "bg-white/40"}`}>
            <span className={`${item.color} text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-lg`}>{item.num}</span>
            <div>
              <p className="text-lg font-semibold text-gray-800">{item.title}</p>
              <p className="text-base text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
        <p className="text-base text-orange-600 text-center font-medium">오늘은 1, 2단계의 핵심인 임베딩에 집중합니다.</p>
      </div>
    ),
  },
  {
    title: "실습에서 할 것",
    bg: "from-amber-50 to-yellow-50",
    script: "이론은 여기까지입니다. 실습 시간에는 세 가지를 직접 수행해보겠습니다. 첫째, 여러 문장을 제미나이 임베딩 API를 사용하여 숫자 벡터로 변환합니다. 둘째, 두 문장 사이의 유사도(거리)를 코사인 유사도로 계산해봅니다. 셋째, 여러분이 직접 만든 문장으로 '의미가 비슷한 문장은 정말 가까운지' 실험해봅니다. 문장이 숫자가 되고, 그 숫자로 의미의 가까움을 측정할 수 있다는 것을 직접 체험하는 시간입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">실습 시간에 직접 해볼 것</p>
        {[
          { num: "1", text: "여러 문장을 임베딩 API로 숫자 벡터로 변환하기" },
          { num: "2", text: "두 문장 사이의 유사도(거리)를 계산해보기" },
          { num: "3", text: "내가 직접 만든 문장으로 의미 비교 실험하기" },
        ].map((item) => (
          <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
            <p className="text-xl text-gray-700">{item.text}</p>
          </div>
        ))}
        <CodeBlock>
          {`from google import genai

client = genai.Client(api_key="API 키")
result = client.models.embed_content(
    model="gemini-embedding-001",
    contents="문장을 넣으면 숫자가 나옵니다"
)
print(result.embeddings[0].values[:5])`}
        </CodeBlock>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, AI는 학습한 시점까지의 정보만 알고 있으므로, 모르는 정보를 답하게 하려면 참고 자료가 필요합니다. 둘째, RAG은 AI에게 참고 자료를 함께 제공하여 답하게 하는 방법으로, 오픈북 시험과 같은 원리입니다. 셋째, 임베딩은 문장을 의미에 따른 숫자 좌표로 변환하는 작업이며, 글자 비교가 아닌 의미 비교를 가능하게 합니다. 넷째, 유사도는 두 임베딩 좌표 사이의 거리를 측정하는 것으로, 값이 높을수록 의미가 비슷합니다. 다음 시간에는 이 임베딩 기술을 바탕으로 실제 문서 검색 기능을 구현해보겠습니다.",
    content: (
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>RAG</strong> = AI에게 참고 자료를 함께 주고 답하게 하는 방법 (오픈북 시험)
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>임베딩</strong> = 문장을 의미에 따른 숫자 좌표로 변환하는 작업
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>유사도</strong> = 두 좌표 사이의 거리 측정 (높을수록 비슷)
            </p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            핵심: 임베딩은 <strong>글자 비교가 아닌 의미 비교</strong>를 가능하게 합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "오늘 강의를 마치겠습니다. RAG의 개념과 임베딩의 원리를 이해하셨을 것입니다. 다음 시간에는 이 임베딩 기술을 실제로 활용하여 긴 문서를 조각으로 나누고(청킹), 질문과 가장 관련 있는 조각을 검색하는 방법을 배우겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 청킹과 유사도 검색</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function RAG1EmbeddingGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
