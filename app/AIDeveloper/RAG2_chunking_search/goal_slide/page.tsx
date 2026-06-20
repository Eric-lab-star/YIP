"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-teal-50 to-cyan-50",
    script: "안녕하세요, 여러분. 오늘 강의의 주제는 '청킹과 유사도 검색'입니다. 지난 시간에 우리는 문장을 벡터(숫자 좌표)로 바꾸고, 두 문장이 얼마나 비슷한지 유사도로 비교하는 방법을 배웠습니다. 오늘은 한 걸음 더 나아가서, 아주 긴 문서를 AI에게 참고시키려면 어떻게 해야 하는지를 배워보겠습니다. 책 한 권처럼 긴 자료를 어떻게 쪼개고(청킹), 어떻게 찾아내는지(검색) 체계적으로 살펴보겠습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📚</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          청킹과 유사도 검색
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          책을 챕터로 쪼개고, 질문에 맞는 조각을 찾아내기
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: "오늘 강의의 학습 목표를 확인하겠습니다. 첫째, 긴 문서를 작은 조각(청크)으로 나누는 이유와 방법을 이해합니다. 둘째, 질문과 가장 관련 있는 문서 조각을 임베딩 유사도로 찾아내는 '검색' 과정을 이해합니다. 이 두 가지를 오늘 강의가 끝나기 전까지 확실히 습득하는 것이 목표입니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.</p>
        <div className="space-y-4">
          {[
            { num: "1", text: "긴 문서를 작은 조각(청크)으로 나누는 이유와 방법을 이해한다" },
            { num: "2", text: "질문과 가장 관련 있는 문서 조각을 임베딩 유사도로 찾아내는 '검색' 과정을 이해한다" },
          ].map((item) => (
            <div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-teal-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "책 한 권을 통째로 임베딩하면?",
    bg: "from-red-50 to-orange-50",
    script: "지난 시간에는 짧은 문장 하나를 벡터로 바꿔봤습니다. 그런데 여기서 질문이 생깁니다. AI에게 참고시킬 자료가 책 한 권처럼 아주 길다면, 그 전체를 한 번에 임베딩해도 괜찮을까요? 결론부터 말씀드리면, 좋지 않습니다. 두꺼운 책 한 권을 통째로 하나의 좌표로 표현하면, 책 안의 여러 주제가 한 좌표에 뭉쳐져서 핵심 의미가 흐려져 버립니다. 또한 AI가 한 번에 처리할 수 있는 글자 수에도 한계가 있습니다. 그래서 긴 문서는 잘게 나눠서 다뤄야 합니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-800 font-semibold">긴 글을 통째로 임베딩하면 두 가지 문제가 발생합니다.</p>
        </div>
        <div className="space-y-4">
          {[
            { icon: "🌫️", title: "핵심 의미가 희석됨", desc: "여러 주제가 한 좌표에 뭉쳐져서 의미가 흐려짐" },
            { icon: "📏", title: "글자 수 한계", desc: "AI가 한 번에 처리할 수 있는 텍스트 양에 제한이 있음" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-lg text-orange-600 font-medium text-center">그래서 긴 문서는 잘게 나눠서 다뤄야 합니다!</p>
      </div>
    ),
  },
  {
    title: "청킹(Chunking)이란?",
    bg: "from-green-50 to-emerald-50",
    script: "이 문제를 해결하는 방법이 바로 청킹(Chunking)입니다. 청킹이란 긴 문서를 의미 단위(문단, 일정 글자 수 등)로 잘라서 여러 개의 작은 조각으로 나누는 작업입니다. 잘라진 조각 하나하나를 '청크(chunk)'라고 부릅니다. 책에 비유하면, 두꺼운 책 한 권을 챕터별로 나누어 각각 책장에 따로 정리하는 것과 같습니다. 청킹을 하면 각 조각마다 의미가 또렷하게 살아있고, 질문과 가장 가까운 조각을 빠르게 검색할 수 있게 됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>청킹(Chunking)</strong> = 긴 문서를 작은 조각(청크)으로 나누는 작업
          </p>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-6xl">📖</span>
          <div>
            <p className="text-xl text-gray-700 mb-2">비유: 책을 챕터별로 나누어 책장에 정리하기</p>
            <ul className="text-lg text-gray-600 space-y-1">
              <li>• <strong>청킹</strong> = 책을 챕터별로 나누는 작업</li>
              <li>• <strong>임베딩</strong> = 각 챕터를 책장의 좌표에 꽂아두기</li>
              <li>• <strong>검색</strong> = 질문과 가장 가까운 챕터를 찾기</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "통째로 vs 청크별로",
    bg: "from-purple-50 to-pink-50",
    script: "통째로 임베딩하는 것과 청크별로 나누어 임베딩하는 것의 차이를 비교해보겠습니다. 통째로 임베딩하면 여러 주제가 한 좌표에 뭉쳐져서 핵심 의미가 흐려지고, 글자 수 한계에 걸리며, 질문에 딱 맞는 부분을 콕 집기가 어렵습니다. 반면 청크별로 나누어 임베딩하면 조각마다 의미가 또렷하게 살아있고, 글자 수 부담이 작아지며, 질문과 가장 가까운 조각을 빠르게 검색할 수 있습니다.",
    content: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-5">
            <p className="font-semibold text-red-700 mb-3">📕 통째로 임베딩</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 여러 주제가 한 좌표에 뭉침</li>
              <li>• 핵심 의미가 흐려짐</li>
              <li>• 글자 수 한계에 걸림</li>
              <li>• 딱 맞는 부분을 찾기 어려움</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="font-semibold text-green-700 mb-3">📚 청크별로 임베딩</p>
            <ul className="text-base text-gray-600 space-y-2">
              <li>• 조각마다 의미가 또렷함</li>
              <li>• 글자 수 부담이 작아짐</li>
              <li>• 가장 가까운 조각을 빠르게 검색</li>
              <li>• 각 청크를 따로 정리 가능</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "청크 크기의 중요성",
    bg: "from-amber-50 to-yellow-50",
    script: "청크의 크기도 중요한 고려 사항입니다. 청크가 너무 작으면 앞뒤 맥락이 부족해져서 의미를 제대로 전달하지 못합니다. 반대로 청크가 너무 크면 다시 의미가 희석됩니다. 따라서 적절한 크기를 찾는 것이 핵심입니다. 오늘 실습에서는 글자 수 기준(예: 200자)으로 나누는 방식을 사용하겠습니다. 실무에서는 문단 단위, 문장 단위, 의미 단위 등 다양한 청킹 전략이 사용됩니다.",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">청크 크기는 &ldquo;적당히&rdquo;가 중요합니다.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-5">
            <p className="font-semibold text-red-700 mb-2">너무 작으면</p>
            <p className="text-gray-600">앞뒤 맥락이 부족 → 의미 전달 실패</p>
          </div>
          <div className="bg-red-50 rounded-xl p-5">
            <p className="font-semibold text-red-700 mb-2">너무 크면</p>
            <p className="text-gray-600">의미가 다시 희석 → 통째로와 비슷한 문제</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-5">
          <p className="text-lg text-gray-700">
            오늘 실습에서는 <strong>글자 수 기준(200자)</strong>으로 나누는 방식을 사용합니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "검색기의 동작 순서",
    bg: "from-blue-50 to-indigo-50",
    script: "오늘 직접 만들어볼 것은 '검색기'입니다. 긴 텍스트를 청크로 나누고, 각 청크를 임베딩한 다음, 질문과 가장 유사한 청크를 찾아내는 도구입니다. 검색기가 동작하는 순서는 다섯 단계입니다. 첫째, 문서를 청크로 나눕니다(청킹). 둘째, 각 청크를 임베딩으로 변환합니다. 셋째, 질문도 임베딩으로 변환합니다. 넷째, 질문과 각 청크의 유사도를 비교합니다. 다섯째, 가장 유사한 청크를 결과로 돌려줍니다. 이것은 도서관 사서가 질문에 맞는 챕터를 찾아주는 것과 같은 원리입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">검색기가 동작하는 5단계</p>
        {[
          { num: "1", text: "문서를 청크로 나누기 (청킹) ✂️" },
          { num: "2", text: "각 청크를 임베딩으로 변환 📍" },
          { num: "3", text: "질문도 임베딩으로 변환 ❓" },
          { num: "4", text: "질문과 각 청크의 유사도 비교 📏" },
          { num: "5", text: "가장 유사한 청크를 결과로 반환 🎁" },
        ].map((item) => (
          <div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
            <span className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
            <p className="text-lg text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "청킹 코드 미리보기",
    bg: "from-cyan-50 to-teal-50",
    script: "실습에서 사용할 청킹 함수를 미리 살펴보겠습니다. split_into_chunks라는 함수는 텍스트를 chunk_size 글자 수만큼씩 잘라서 리스트에 담는 역할을 합니다. chunk_size를 200으로 설정하면 200글자씩, 100으로 설정하면 100글자씩 잘립니다. range 함수를 사용하여 텍스트의 시작부터 끝까지 chunk_size 간격으로 반복하면서 슬라이싱합니다. 실습 페이지에서는 이 함수의 빈칸을 직접 채워보는 미션이 있을 것입니다.",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">청킹 함수의 기본 구조</p>
        <CodeBlock>
          {`def split_into_chunks(text, chunk_size=200):
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunk = text[i:i + chunk_size]
        chunks.append(chunk)
    return chunks`}
        </CodeBlock>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            chunk_size만큼씩 텍스트를 잘라서 리스트에 담는 구조입니다.
            <br />200이면 200글자씩, 100이면 100글자씩 잘립니다.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-base text-gray-600">
            📝 오늘은 &ldquo;검색&rdquo;까지만 진행합니다. AI가 자료를 보고 답변을 생성하는 것은 다음 차시에서 다룹니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: "오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, 청킹은 긴 문서를 작은 조각(청크)으로 나누는 작업입니다. 통째로 임베딩하면 의미가 희석되고 글자 수 한계에 걸리기 때문에 청킹이 필요합니다. 둘째, 청크 크기는 너무 작아도, 너무 커도 좋지 않으며 적절한 크기를 찾는 것이 중요합니다. 셋째, 검색기는 문서 청킹, 청크 임베딩, 질문 임베딩, 유사도 비교, 결과 반환의 다섯 단계로 동작합니다. 다음 시간에는 이 청크들을 벡터 데이터베이스에 저장하여 매번 다시 임베딩하지 않고도 빠르게 검색할 수 있는 방법을 배우겠습니다.",
    content: (
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>청킹</strong> = 긴 문서를 작은 조각으로 나누는 작업 (의미 희석 방지)
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>청크 크기</strong> = 너무 작지도, 너무 크지도 않게 적절히 설정
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-lg text-gray-700">
              <strong>검색기</strong> = 청킹 → 임베딩 → 유사도 비교 → 가장 가까운 청크 반환
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-teal-50 to-cyan-50",
    script: "오늘 강의를 마치겠습니다. 긴 문서를 청크로 나누는 이유와 방법, 그리고 검색기의 동작 원리를 이해하셨을 것입니다. 다음 시간에는 벡터 데이터베이스를 활용하여 청크를 영구적으로 저장하고 빠르게 검색하는 방법을 배우겠습니다. 수고하셨습니다.",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
        <p className="text-xl text-gray-600 mt-4">다음 시간: 벡터DB 구축하기</p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function RAG2ChunkingSearchGoalSlidePage() {
  return <SlideShell slides={slides} />;
}
