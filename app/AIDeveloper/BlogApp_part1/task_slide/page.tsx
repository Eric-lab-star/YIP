"use client";

import SlideShell, { CodeBlock, type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
  { title: "", bg: "from-amber-50 to-orange-50", script: "안녕하세요, 여러분. 오늘은 주제에서 블로그 글의 구조를 만들고, 본문까지 채우는 앱을 직접 완성해보는 실습을 진행하겠습니다. 총 3가지 미션을 약 25~30분에 걸쳐 수행합니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><h1 className="text-5xl sm:text-6xl font-bold text-gray-800">블로그 글쓰기 실습</h1><p className="text-2xl text-gray-500 mt-2">구조 짓고 본문 채우기</p><p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p></div>) },
  { title: "실습 전 준비 사항", bg: "from-yellow-50 to-amber-50", script: "준비물을 확인하겠습니다. google-genai 패키지 설치와 제미나이 API 키가 필요합니다. 써보고 싶은 블로그 주제 1~2개를 미리 생각해두시기 바랍니다.", content: (<div className="flex flex-col gap-6"><div className="space-y-4">{[{ text: "google-genai 패키지 설치 및 API 키 확인" }, { text: "써보고 싶은 블로그 주제 1~2개 준비" }, { text: "빈칸이 포함된 코드 템플릿" }].map((item, i) => (<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4"><p className="text-xl text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "미션 1: 환경 준비 (5분)", bg: "from-rose-50 to-orange-50", script: "첫 번째 미션입니다. google-genai 패키지와 API 키가 정상 동작하는지 확인합니다. 코드를 실행하여 에러 없이 '준비 완료!'가 출력되면 성공입니다. 5분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> API 키와 패키지 정상 동작 확인</p></div><CodeBlock>{`from google import genai

client = genai.Client(api_key="여기에 API 키 입력")
print("준비 완료!")`}</CodeBlock></div>) },
  { title: "미션 1 해설", bg: "from-rose-50 to-pink-50", script: "미션 1의 핵심 포인트입니다. API 키가 정상적으로 인증되면 이후 모든 미션에서 제미나이를 활용할 수 있습니다. import 에러가 나면 pip install google-genai를 다시 실행하시기 바랍니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">API 키 인증 성공 = 이후 모든 미션에서 제미나이 활용 가능</p></div></div>) },
  { title: "미션 2: 블로그 구조 생성 (10~12분)", bg: "from-violet-50 to-purple-50", script: "두 번째 미션입니다. AI에게 글의 설계도, 즉 제목과 소제목 3개를 만들게 합니다. 빈칸에는 말투를 넣으면 됩니다. '친근한', '전문적인', '유머러스한' 중에서 골라보세요. 여기서 학생들이 가장 많이 틀리는 부분을 미리 짚어주십시오. 빈칸을 채울 때 중괄호를 씌우면 안 됩니다. f-string 안에서 중괄호는 변수 값을 넣으라는 뜻이라, 중괄호를 남긴 채 단어를 쓰면 NameError가 납니다. 반면 바로 아랫줄의 중괄호 topic은 진짜 변수이므로 그대로 두어야 합니다. 실행하면 제목 1개와 소제목 3개가 나옵니다. 다만 AI가 앞뒤로 인사말을 붙이거나 제목을 굵게 표시할 수 있는데, 정상이니 소제목 3개만 찾아서 다음 미션에 복사하면 된다고 안내해 주십시오. 완료한 분들은 topic을 본인이 쓰고 싶은 주제로 바꿔보시기 바랍니다. 10~12분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> AI에게 블로그 글의 구조(제목 + 소제목 3개)를 생성시킵니다.</p></div><CodeBlock>{`topic = "초보자를 위한 홈카페 만들기"

structure_prompt = f"""
너는 ____ 말투의 블로거야.
'{topic}'이라는 주제로 블로그 글을 쓰려고 해.
다음 형식으로 구조만 먼저 만들어줘:

제목: (눈길을 끄는 제목 1개)
소제목1:
소제목2:
소제목3:
"""

structure = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=structure_prompt
).text
print(structure)`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">빈칸: &quot;친근한&quot;, &quot;전문적인&quot;, &quot;유머러스한&quot; 중 선택 — <strong>중괄호 없이</strong> 단어만!</p></div><div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400"><p className="text-lg text-gray-700"><strong>흔한 실수:</strong> 빈칸에 중괄호를 남기면 <code>NameError</code> — 단, 아랫줄의 <code>{"{topic}"}</code>은 진짜 변수라 그대로 둡니다</p></div></div>) },
  { title: "미션 2 해설", bg: "from-violet-50 to-indigo-50", script: "미션 2의 핵심 포인트입니다. 형식을 명확히 지정하면 AI는 원하는 구조대로 출력합니다. 같은 주제라도 말투를 바꾸면 완전히 다른 느낌의 글이 나옵니다. 이것이 프롬프트 엔지니어링의 힘입니다. 이제 이 구조를 바탕으로 본문을 채울 준비가 되었습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="space-y-4"><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700"><strong>형식 지정</strong> → AI가 원하는 구조대로 출력</p></div><div className="bg-blue-50 rounded-xl p-5"><p className="text-lg text-gray-700">같은 주제 + 다른 말투 = 완전히 다른 느낌의 글</p></div></div></div>) },
  { title: "다리 놓기: 미션 2 결과 → 미션 3 입력", bg: "from-amber-50 to-yellow-50", script: "미션 3으로 넘어가기 전에, 학생들이 스스로 넘기 어려워하는 단계가 하나 있습니다. 미션 2가 돌려준 것은 제목과 소제목과 인사말이 전부 뒤섞인 글자 덩어리 하나, 즉 문자열입니다. 그런데 미션 3의 반복문은 소제목을 하나씩 따로 꺼내 써야 하므로 리스트가 필요합니다. 이 변환은 코드가 자동으로 해주지 않고 학생이 직접 해야 한다는 점을 분명히 짚어주십시오. 순서는 세 단계입니다. 첫째, 출력에서 소제목 줄만 찾습니다. 앞뒤 인사말이나 별표 장식은 무시하면 됩니다. 둘째, 소제목1 콜론 같은 이름표를 떼어냅니다. 이름표는 여기가 소제목이라고 알려주는 표시일 뿐 소제목 자체가 아닙니다. 셋째, 각 문장을 따옴표로 감싸고 쉼표로 구분해 리스트에 넣습니다. 이름표를 왜 떼야 하는지도 함께 알려주십시오. subtitle 변수는 프롬프트에만 쓰이는 것이 아니라 full_post에 완성된 글의 소제목으로 그대로 찍힙니다. 이름표를 남기면 최종 글에 별표 소제목1 콜론이 그대로 나옵니다. 프롬프트 쪽은 이름표가 붙어 있어도 AI가 알아서 잘 써주므로, 문제가 되는 것은 최종 결과물의 모양입니다.", content: (<div className="flex flex-col gap-4"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-700">미션 2 = <strong>문자열 한 덩어리</strong> → 미션 3 = <strong>리스트</strong> 필요. 이 변환은 <strong>손으로</strong> 합니다.</p></div><div><p className="text-base text-gray-500 mb-1">미션 2 출력에서 소제목 줄만</p><CodeBlock>{`**소제목1:** 장비 욕심은 넣어두세요! 가성비 필수템 3가지
**소제목2:** 우리 집 거실이 카페로? 감성 인테리어 한 스푼
**소제목3:** 1분 만에 뚝딱! 카페 갈 필요 없는 시그니처 레시피`}</CodeBlock></div><div><p className="text-base text-gray-500 mb-1">이름표를 떼고 따옴표로 감싸 리스트로</p><CodeBlock>{`subtitles = [
    "장비 욕심은 넣어두세요! 가성비 필수템 3가지",
    "우리 집 거실이 카페로? 감성 인테리어 한 스푼",
    "1분 만에 뚝딱! 카페 갈 필요 없는 시그니처 레시피",
]`}</CodeBlock></div><div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400"><p className="text-lg text-gray-700">이름표를 떼는 이유: <code>subtitle</code>은 <code>full_post</code>에 <strong>완성된 글의 소제목으로 그대로 찍힙니다</strong></p></div></div>) },
  { title: "미션 3: 본문 채우기 (10~13분)", bg: "from-teal-50 to-cyan-50", script: "세 번째 미션입니다. 설계도가 완성되었으니 각 소제목마다 본문을 채워 한 편의 글로 합칩니다. 위에서 나온 소제목들을 subtitles 리스트에 직접 복사해서 넣고, 빈칸에는 본문 분량을 넣으면 됩니다. '3문장', '200자'처럼 구체적으로 적어보세요. 여기서도 중괄호는 씌우지 않습니다. 그리고 이 코드는 미션 2 코드 아래에 이어서 써야 합니다. client와 topic을 미션 2에서 만들어뒀기 때문입니다. 새 파일에 따로 쓰면 client가 정의되지 않았다는 NameError가 납니다. 반복문이 소제목을 하나씩 AI에게 건네주며 본문을 받아오는 구조입니다. 이것이 '목차를 먼저 짜고 챕터를 쓰는 작가'와 같은 방식입니다. 10~13분 드리겠습니다.", content: (<div className="flex flex-col gap-5"><div className="bg-white/60 rounded-xl p-4"><p className="text-lg text-gray-600"><strong>목표:</strong> 각 소제목마다 본문을 생성하여 전체 글을 완성합니다.</p></div><CodeBlock>{`subtitles = [
    "소제목1 내용을 여기에",
    "소제목2 내용을 여기에",
    "소제목3 내용을 여기에",
]

full_post = f"[주제: {topic}]\\n\\n"

for subtitle in subtitles:
    body_prompt = f"""
    '{topic}' 블로그 글의 '{subtitle}' 부분 본문을 써줘.
    ____ 분량으로, 친근한 말투로 작성해줘.
    """
    body = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=body_prompt
    ).text
    full_post += f"## {subtitle}\\n{body}\\n\\n"

print(full_post)`}</CodeBlock><div className="bg-white/70 rounded-xl p-4"><p className="text-lg text-gray-600">빈칸: &quot;3문장&quot;, &quot;200자&quot; 등 구체적 분량 — <strong>중괄호 없이</strong>!</p></div><div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400"><p className="text-lg text-gray-700"><code>NameError: name &apos;client&apos; is not defined</code> → 미션 2 코드 <strong>아래에 이어서</strong> 쓰지 않은 경우입니다</p></div></div>) },
  { title: "미션 3 해설", bg: "from-teal-50 to-emerald-50", script: "미션 3의 핵심 포인트입니다. 좋은 작가는 책을 쓸 때 먼저 목차를 정하고, 각 챕터를 하나씩 써내려갑니다. 우리 앱도 동일한 방식으로 작동합니다. AI에게 목차를 먼저 만들게 한 뒤, 그 목차를 하나씩 건네주며 본문을 요청합니다. 이렇게 일을 나누면 각 부분에 더 집중하여 질 좋은 글을 생산할 수 있습니다.", content: (<div className="flex flex-col gap-6"><p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p><div className="bg-white/70 rounded-xl p-5"><p className="text-xl text-gray-700">목차 먼저 → 챕터별 본문 요청 = <strong>각 부분에 집중하여 품질 향상</strong></p></div><div className="bg-green-50 rounded-xl p-4"><p className="text-lg text-gray-600">분량을 구체적으로 지정하면 원하는 길이의 글을 얻을 수 있습니다.</p></div></div>) },
  { title: "오늘의 실습 정리", bg: "from-orange-50 to-red-50", script: "오늘 3가지 미션을 모두 수행하셨습니다. 환경 준비, AI에게 블로그 글의 구조 만들게 하기, 각 소제목마다 본문을 채워 한 편의 글로 합치기까지 해보았습니다. 오늘 만든 것은 블로그 글의 뼈대와 살입니다. 다음 시간에는 여기에 이미지를 더해 완성형 블로그 앱으로 업그레이드하겠습니다.", content: (<div className="flex flex-col gap-5"><div className="space-y-3">{[{ num: "1", text: "환경 준비 및 API 키 확인", color: "bg-rose-100" }, { num: "2", text: "블로그 구조(제목 + 소제목) 생성", color: "bg-violet-100" }, { num: "3", text: "각 소제목별 본문 채우기 → 전체 글 완성", color: "bg-teal-100" }].map((item) => (<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}><span className="text-lg font-bold text-gray-500">미션 {item.num}</span><p className="text-lg text-gray-700">{item.text}</p></div>))}</div></div>) },
  { title: "", bg: "from-amber-50 to-orange-50", script: "오늘 실습을 마치겠습니다. 다음 시간에는 글에 어울리는 이미지를 AI로 생성하여 완성형 블로그 앱을 만들겠습니다. 수고하셨습니다.", content: (<div className="flex flex-col items-center justify-center h-full gap-6 text-center"><h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1><p className="text-xl text-gray-600 mt-4">다음 시간: 글 + 이미지 = 완성형 블로그 앱</p><p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p></div>) },
];

export default function BlogAppPart1TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
