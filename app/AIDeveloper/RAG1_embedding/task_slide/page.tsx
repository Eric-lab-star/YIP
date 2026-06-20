"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-indigo-50 to-purple-50",
    script: "안녕하세요, 여러분. 오늘은 지난 시간에 배운 임베딩의 개념을 바탕으로, 직접 실습을 진행하겠습니다. 문장을 숫자 벡터로 바꾸고, 문장들 사이의 거리(유사도)를 직접 계산해볼 것입니다. 총 4가지 미션을 약 25~30분에 걸쳐 수행합니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🔢</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          임베딩 실습
        </h1>
        <p className="text-2xl text-gray-500 mt-2">문장을 숫자로 바꾸고 거리 재보기</p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: "미션을 시작하기 전에 준비물을 확인하겠습니다. 첫째, google-genai와 numpy 패키지가 설치되어 있어야 합니다. 둘째, 지난 시간과 동일한 제미나이 API 키가 필요합니다. 셋째, 빈칸이 포함된 코드 템플릿 파일을 준비해주시기 바랍니다. 아직 준비가 안 되신 분은 지금 해주시기 바랍니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">미션을 시작하기 전에 아래 사항을 확인합니다.</p>
        <div className="space-y-4">
          {[
            { icon: "📦", text: "google-genai, numpy 패키지 설치 확인" },
            { icon: "🔑", text: "제미나이 API 키 준비 (지난 시간과 동일)" },
            { icon: "📄", text: "빈칸이 포함된 코드 템플릿 (.py 또는 .ipynb)" },
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
    title: "미션 1: 환경 준비하기 (5분)",
    bg: "from-cyan-50 to-blue-50",
    script: "첫 번째 미션입니다. 임베딩 API를 사용하기 위한 패키지가 정상적으로 설치되어 있는지 확인하겠습니다. 터미널에서 pip install google-genai numpy 명령어를 실행해주시기 바랍니다. 설치가 에러 없이 완료되었는지, 그리고 제미나이 API 키가 준비되어 있는지 확인하시기 바랍니다. 5분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 임베딩 API 사용을 위한 환경을 준비합니다.</p>
        </div>
        <CodeBlock>{`pip install google-genai numpy`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>• 설치가 에러 없이 완료되었는가?</li>
            <li>• 제미나이 API 키가 준비되어 있는가?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 문장을 벡터로 변환하기 (8~10분)",
    bg: "from-green-50 to-emerald-50",
    script: "두 번째 미션입니다. 여러 문장을 임베딩 API로 숫자 벡터로 변환해보겠습니다. 화면에 보이는 코드를 따라 입력하되, API 키 부분에는 본인의 제미나이 API 키를 넣어주시기 바랍니다. 세 개의 문장을 준비했습니다. '오늘 날씨가 정말 좋다', '오늘 기분이 너무 화창해', '나는 점심으로 김치볶음밥을 먹었다'. 코드를 실행하면 벡터의 길이(차원 수)와 첫 번째 문장의 벡터 일부가 출력됩니다. 벡터 자체는 사람이 읽어도 의미를 알 수 없지만, 컴퓨터는 이 숫자들로 문장 간 유사도를 계산할 수 있습니다. 8~10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 문장을 임베딩 API로 숫자 벡터로 변환합니다.</p>
        </div>
        <CodeBlock>
          {`from google import genai

client = genai.Client(api_key="API 키 입력")

sentences = [
    "오늘 날씨가 정말 좋다.",
    "오늘 기분이 너무 화창해.",
    "나는 점심으로 김치볶음밥을 먹었다.",
]

embeddings = []
for sentence in sentences:
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=sentence
    )
    embeddings.append(result.embeddings[0].values)

print("벡터의 길이:", len(embeddings[0]))
print("첫 번째 벡터 일부:", embeddings[0][:5])`}
        </CodeBlock>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">💡 벡터는 컴퓨터를 위한 표현 방식입니다. 사람은 의미를 알 수 없지만, 컴퓨터는 이것으로 유사도를 계산합니다.</p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-green-50 to-teal-50",
    script: "미션 2의 핵심 포인트를 정리하겠습니다. 여러분이 방금 경험한 것은 문장이 수백 개의 숫자로 이루어진 벡터로 변환되는 과정입니다. 이 벡터에는 문장의 '의미'가 숫자로 인코딩되어 있습니다. 벡터의 길이, 즉 차원 수는 모델에 따라 다르지만, 제미나이 임베딩 모델의 경우 768차원입니다. 사람이 이 숫자들을 직접 해석하는 것은 불가능하지만, 컴퓨터는 이 숫자들의 패턴을 통해 문장 간의 의미적 유사성을 정확하게 계산할 수 있습니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              문장이 <strong>수백 개의 숫자(벡터)</strong>로 변환됩니다.
              <br />이 벡터에 문장의 &ldquo;의미&rdquo;가 인코딩되어 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="font-semibold text-purple-700 mb-2">사람의 시각</p>
              <p className="text-gray-600">숫자 나열 → 의미 해석 불가</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">컴퓨터의 시각</p>
              <p className="text-gray-600">숫자 패턴 → 의미적 유사성 계산 가능</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 유사도 비교하기 (8~10분)",
    bg: "from-violet-50 to-purple-50",
    script: "세 번째 미션입니다. 두 문장이 얼마나 비슷한지 코사인 유사도로 계산해보겠습니다. 화면의 코드에서 빈칸을 직접 채워주시기 바랍니다. sim_0_2 빈칸에는 cosine_similarity 함수에 embeddings[0]과 embeddings[2]를 넣으면 됩니다. 의미가 비슷한 0번과 1번 문장의 유사도가, 의미가 다른 0번과 2번 문장의 유사도보다 높게 나오는지 확인해보시기 바랍니다. 유사도 값이 때때로 직관과 다르게 나올 수도 있는데, 이는 자연스러운 현상입니다. AI도 완벽하지 않기 때문입니다. 8~10분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 코사인 유사도로 두 문장의 비슷한 정도를 측정합니다.</p>
        </div>
        <CodeBlock>
          {`import numpy as np

def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    return np.dot(vec1, vec2) / (
        np.linalg.norm(vec1) * np.linalg.norm(vec2)
    )

sim_0_1 = cosine_similarity(
    embeddings[0], embeddings[1]
)
sim_0_2 = ____  # 직접 채워보세요

print(f"날씨-화창 유사도: {sim_0_1:.4f}")
print(f"날씨-점심 유사도: {sim_0_2:.4f}")`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-4">
          <p className="text-base text-gray-600">
            <strong>힌트:</strong> cosine_similarity(embeddings[0], embeddings[2])
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-violet-50 to-indigo-50",
    script: "미션 3의 핵심 포인트입니다. 의미가 비슷한 문장 쌍(날씨가 좋다 / 기분이 화창하다)의 유사도가, 의미가 다른 문장 쌍(날씨가 좋다 / 점심을 먹었다)의 유사도보다 높게 나온 것을 확인하셨을 것입니다. 이것이 바로 임베딩이 '글자 비교'가 아니라 '의미 비교'를 한다는 증거입니다. '날씨'와 '화창'은 글자가 완전히 다르지만, 의미적으로 연결되어 있기 때문에 높은 유사도를 보이는 것입니다. 이 원리가 RAG에서 관련 자료를 검색하는 핵심 메커니즘이 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-lg text-gray-700">
              <strong>높은 유사도:</strong> &ldquo;날씨가 좋다&rdquo; ↔ &ldquo;기분이 화창하다&rdquo;
            </p>
            <p className="text-base text-green-600">→ 글자는 다르지만, 의미가 연결 → 높은 점수</p>
          </div>
          <div className="bg-red-50 rounded-xl p-5">
            <p className="text-lg text-gray-700">
              <strong>낮은 유사도:</strong> &ldquo;날씨가 좋다&rdquo; ↔ &ldquo;점심을 먹었다&rdquo;
            </p>
            <p className="text-base text-red-600">→ 의미적 연결 없음 → 낮은 점수</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-lg text-gray-700 text-center">
              이것이 RAG에서 관련 자료를 검색하는 <strong>핵심 메커니즘</strong>입니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4: 나만의 문장으로 실험하기 (5~7분)",
    bg: "from-amber-50 to-yellow-50",
    script: "네 번째 미션입니다. 이번에는 여러분이 직접 문장을 만들어서 실험해보겠습니다. 의미가 비슷한 문장 2개, 의미가 다른 문장 1개를 만들어서 유사도를 비교해주시기 바랍니다. 빈칸에는 큰따옴표로 감싼 문장을 넣으면 됩니다. 문장 A와 B는 의미가 비슷하게, 문장 C는 완전히 다른 주제로 작성하시기 바랍니다. A-B 유사도가 A-C 유사도보다 높게 나오는지 직접 확인해보시기 바랍니다. 5~7분 드리겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600"><strong>목표:</strong> 직접 만든 문장으로 의미 비교 실험을 합니다.</p>
        </div>
        <CodeBlock>
          {`my_sentences = [
    ____,  # 문장 A
    ____,  # 문장 B (A와 의미 비슷)
    ____,  # 문장 C (A, B와 의미 다르게)
]

my_embeddings = []
for s in my_sentences:
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=s
    )
    my_embeddings.append(
        result.embeddings[0].values
    )

print("A-B 유사도:",
    cosine_similarity(
        my_embeddings[0], my_embeddings[1]
    ))
print("A-C 유사도:",
    cosine_similarity(
        my_embeddings[0], my_embeddings[2]
    ))`}
        </CodeBlock>
        <p className="text-lg text-orange-600 font-medium">
          ✍️ A-B 유사도가 A-C보다 높게 나오는지 확인해보세요!
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 4가지 미션을 모두 수행하셨습니다. 정리하겠습니다. 미션 1에서는 실습 환경을 준비했습니다. 미션 2에서는 문장을 숫자 벡터로 변환하는 임베딩을 직접 체험했습니다. 미션 3에서는 코사인 유사도로 문장 간 의미적 거리를 측정했습니다. 미션 4에서는 직접 만든 문장으로 의미 비교 실험을 수행했습니다. 오늘 한 작업은 문장들의 '단어 지도'를 만드는 것이었습니다. 다음 시간에는 이 지도 위에 긴 문서를 잘게 나누어 올려놓고, 질문이 들어왔을 때 가장 가까운 조각을 찾아내는 '검색기'를 직접 만들어보겠습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "환경 준비 (패키지 설치, API 키)", color: "bg-cyan-100" },
            { num: "2", text: "문장을 숫자 벡터로 변환 (임베딩)", color: "bg-green-100" },
            { num: "3", text: "코사인 유사도로 문장 간 거리 측정", color: "bg-violet-100" },
            { num: "4", text: "직접 만든 문장으로 의미 비교 실험", color: "bg-amber-100" },
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
    script: "오늘 실습을 마치겠습니다. 문장이 숫자 좌표가 되고, 의미가 비슷한 문장은 가까운 좌표에 놓인다는 핵심 원리를 직접 확인하셨습니다. 다음 시간에는 긴 문서를 청크로 나누고 검색하는 방법을 배우겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 청킹과 유사도 검색</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function RAG1EmbeddingTaskSlidePage() {
  return <SlideShell slides={slides} />;
}
