"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-rose-50 to-orange-50",
    script: `안녕하세요, 여러분. 오늘은 지난 시간에 배운 .ipynb 노트북의 개념을 바탕으로, 직접 실습을 진행하겠습니다. 총 5가지 미션을 약 25분에 걸쳐 수행합니다. 각 미션은 5분씩 배정되어 있으며, 미션마다 구체적인 목표와 확인 사항이 있습니다. 강의 시간에 배운 내용을 직접 손으로 실행해보면서 체감하는 것이 오늘의 목적입니다. 질문이 있으면 언제든지 손을 들어주시기 바랍니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          <code className="text-orange-500">.ipynb</code> 실습 미션
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          5가지 미션으로 노트북 완전 정복!
        </p>
        <p className="text-lg text-gray-400">총 소요 시간: 약 25분</p>
      </div>
    ),
  },
  {
    title: "실습 전 준비 사항",
    bg: "from-yellow-50 to-amber-50",
    script: `미션을 시작하기 전에, 실습 환경이 준비되어 있는지 확인하겠습니다. 첫째, VS Code가 열려 있어야 합니다. 둘째, 새 .ipynb 파일이 생성되어 있어야 합니다. 지난 시간에 연습했던 것처럼 File → New File에서 Jupyter Notebook을 선택하거나, 파일명을 practice.ipynb로 저장하면 됩니다. 셋째, Python 커널이 연결되어 있어야 합니다. 노트북 오른쪽 상단에 'Python 3' 또는 비슷한 표시가 보이면 정상입니다. 아직 준비가 안 되신 분은 지금 해주시기 바랍니다. 모든 분의 준비가 확인되면 첫 번째 미션을 시작하겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">
          미션을 시작하기 전에 아래 사항을 확인합니다.
        </p>
        <div className="space-y-4">
          {[
            { icon: "💻", text: "VS Code가 열려 있는가?" },
            {
              icon: "📄",
              text: "새 .ipynb 파일이 생성되어 있는가? (practice.ipynb)",
            },
            {
              icon: "🐍",
              text: 'Python 커널이 연결되어 있는가? (오른쪽 상단 "Python 3" 표시 확인)',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 rounded-xl p-5 flex items-center gap-4"
            >
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-lg text-orange-600 font-medium text-center">
          모든 준비가 확인되면 첫 번째 미션을 시작합니다.
        </p>
      </div>
    ),
  },
  {
    title: "미션 1: 첫 코드 셀 실행 (5분)",
    bg: "from-rose-50 to-orange-50",
    script: `첫 번째 미션입니다. 목표는 코드 셀을 생성하고 실행하여 결과를 확인하는 것입니다. 새 코드 셀을 하나 만들고, print("Hello AI!")를 입력한 후 실행해주시기 바랍니다. 실행 방법은 셀 왼쪽의 재생 버튼을 클릭하거나 Shift + Enter를 누르면 됩니다. 셀 바로 아래에 'Hello AI!'라는 결과가 나타나면 성공입니다. 이것이 바로 .ipynb의 핵심적인 특징입니다. .py 파일에서는 파일 전체를 실행해야 결과를 볼 수 있었지만, .ipynb에서는 셀 하나를 실행하면 즉시 결과가 나타납니다. 결과를 확인하신 분들은 print 안의 문장을 자신만의 문장으로 바꿔서 다시 실행해보시기 바랍니다. 예를 들어 자기 이름이나 좋아하는 음식 등을 출력해보세요. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 코드 셀을 생성하고 실행하여 결과를 확인합니다.
          </p>
        </div>
        <p className="text-xl text-gray-700">
          새 코드 셀을 만들고, 아래 코드를 입력 후 실행해보세요.
        </p>
        <CodeBlock>{`print("Hello AI!")`}</CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">확인 사항</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>
              • 셀 아래에 <code className="bg-gray-200 px-1 rounded">Hello AI!</code> 결과가 나타났는가?
            </li>
            <li>• .py 파일에서의 실행 방식과 어떻게 다른가?</li>
          </ul>
        </div>
        <p className="text-lg text-orange-600 font-medium">
          ✍️ 완료한 분: print(&quot;...&quot;) 안의 내용을 자신만의 문장으로
          바꿔서 재실행해보세요.
        </p>
      </div>
    ),
  },
  {
    title: "미션 1 해설",
    bg: "from-rose-50 to-pink-50",
    script: `미션 1의 핵심 포인트를 정리하겠습니다. 여러분이 방금 경험한 것은 .ipynb의 가장 기본적이면서도 중요한 기능입니다. 코드를 작성하고 실행하면, 별도의 터미널이나 출력 창을 열 필요 없이 바로 그 셀 아래에 결과가 표시됩니다. .py 파일에서는 터미널에서 python 파일명.py를 실행해야 하고, 결과도 터미널에서 따로 확인해야 합니다. 하지만 .ipynb에서는 코드와 결과가 바로 인접해 있어서, 어떤 코드가 어떤 결과를 만들어냈는지 한눈에 파악할 수 있습니다. 이것이 학습과 실험에서 .ipynb가 선호되는 이유입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
            <span className="text-green-500 text-2xl">✅</span>
            <p className="text-xl text-gray-700">
              코드와 결과가 바로 인접해 있어, 어떤 코드가 어떤 결과를
              만들었는지 한눈에 파악 가능
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-blue-700 mb-2">.py 방식</p>
              <p className="text-gray-600">
                터미널에서 실행 → 별도 창에서 결과 확인
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">.ipynb 방식</p>
              <p className="text-gray-600">
                셀에서 실행 → 바로 아래에 결과 표시
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2: 마크다운 셀 작성 (5분)",
    bg: "from-violet-50 to-purple-50",
    script: `두 번째 미션입니다. 이번 목표는 마크다운 셀을 추가하여 코드에 대한 설명을 작성하는 것입니다. 미션 1에서 만든 코드 셀 위에 새 셀을 추가하고, 셀 종류를 마크다운(Markdown)으로 변경해주시기 바랍니다. 위쪽 메뉴의 '+ Markdown' 버튼을 누르면 됩니다. 마크다운 셀에서는 특별한 문법을 사용할 수 있습니다. 샵(#) 기호를 붙이면 제목이 됩니다. 별표 두 개로 감싸면 굵은 글씨가 됩니다. 백틱으로 감싸면 코드 스타일의 글씨가 됩니다. 화면에 보이는 예시를 참고하여 자유롭게 작성해보시기 바랍니다. 작성한 후 Shift + Enter를 누르면 서식이 적용된 모습으로 변환됩니다. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 마크다운 셀을 추가하여 코드에 대한 설명을
            작성합니다.
          </p>
        </div>
        <p className="text-xl text-gray-700">
          코드 셀 위에 마크다운 셀을 추가하고, 아래 내용을 참고하여 작성해보세요.
        </p>
        <CodeBlock>
          {`# 나의 첫 번째 코드
이 셀은 화면에 글자를 출력하는 코드입니다.

**중요!** \`print()\`는 괄호 안의 내용을 화면에 보여줍니다.`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">
            마크다운 기본 문법
          </p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>
              • <code className="bg-gray-200 px-1 rounded">#</code> → 제목
              (큰 글씨)
            </li>
            <li>
              • <code className="bg-gray-200 px-1 rounded">**글자**</code> →
              굵은 글씨
            </li>
            <li>
              • <code className="bg-gray-200 px-1 rounded">`코드`</code> →
              코드 스타일
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "미션 2 해설",
    bg: "from-violet-50 to-indigo-50",
    script: `미션 2의 핵심 포인트입니다. 마크다운 셀은 .ipynb 파일의 두 번째 핵심 구성 요소입니다. .py 파일에서는 설명을 남기려면 주석(#)을 사용해야 하는데, 주석은 서식을 지원하지 않고 코드 실행 시 완전히 무시됩니다. 반면 마크다운 셀에서는 제목, 굵은 글씨, 목록, 링크, 심지어 수식과 이미지까지 포함할 수 있습니다. 이 덕분에 .ipynb 파일은 단순한 코드 파일을 넘어서, 코드와 설명이 통합된 완성된 문서가 됩니다. 실제 AI 연구 논문이나 데이터 분석 보고서에서도 .ipynb 형태로 코드와 설명을 함께 제공하는 경우가 많습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-blue-700 mb-2">
                .py의 주석 (#)
              </p>
              <p className="text-gray-600">서식 없음, 코드 실행 시 무시됨</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">
                .ipynb의 마크다운 셀
              </p>
              <p className="text-gray-600">
                제목, 굵은 글씨, 목록, 수식, 이미지까지 지원
              </p>
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              .ipynb는 코드 파일을 넘어서,
              <br />
              <strong>코드 + 설명이 통합된 완성된 문서</strong>가 됩니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3: 셀 사이의 변수 확인 (5분)",
    bg: "from-teal-50 to-cyan-50",
    script: `세 번째 미션입니다. 이번 목표는 셀 간 변수 공유와 실행 순서의 중요성을 직접 체험하는 것입니다. 셀 1에 my_name = "코딩냥"을 입력하고, 셀 2에 print(my_name, "안녕!")을 입력해주시기 바랍니다. 먼저 셀 1을 실행한 후 셀 2를 실행하면 '코딩냥 안녕!'이라는 결과가 나타날 것입니다. 여기서 중요한 실험을 해보겠습니다. 노트북을 초기화하거나 커널을 재시작한 후, 셀 2를 먼저 실행해보세요. NameError가 발생할 것입니다. 이것이 바로 지난 시간에 배운 '실행 순서'의 중요성입니다. 추가로, 셀 1의 my_name 값을 자신의 이름으로 바꾸고 다시 실행한 후 셀 2를 실행해보세요. 결과가 바뀌는 것을 확인할 수 있습니다. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 셀 간 변수 공유와 실행 순서의 중요성을 직접
            체험합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              셀 1 (먼저 실행)
            </p>
            <CodeBlock>{`my_name = "코딩냥"`}</CodeBlock>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              셀 2 (그 다음 실행)
            </p>
            <CodeBlock>{`print(my_name, "안녕!")`}</CodeBlock>
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-lg text-gray-800">실험해보세요</p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>
              • 셀 2를 먼저 실행하면? →{" "}
              <code className="bg-red-100 px-1 rounded">NameError</code> 발생
            </li>
            <li>• my_name을 자신의 이름으로 바꾸고 재실행하면?</li>
          </ul>
          <p className="text-orange-600 font-medium mt-2">
            💡 핵심: 셀의 위치가 아닌 &ldquo;실행한 순서&rdquo;에 따라 결과가
            결정됩니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "미션 3 해설",
    bg: "from-teal-50 to-emerald-50",
    script: `미션 3의 핵심 포인트를 정리하겠습니다. .ipynb에서 한 셀에서 생성한 변수는 같은 노트북 내의 다른 모든 셀에서 접근할 수 있습니다. 이것을 '커널 메모리 공유'라고 합니다. 하지만 중요한 조건이 있습니다. 해당 변수를 생성하는 셀이 먼저 '실행'되어 있어야 한다는 것입니다. 셀이 위에 위치해 있어도, 실행하지 않았다면 변수는 메모리에 존재하지 않습니다. 이것은 .ipynb를 사용할 때 가장 자주 발생하는 실수이므로, 다시 한번 강조합니다. 문제가 발생했을 때는 '내가 이 셀을 실행했는가?'를 먼저 확인하시기 바랍니다. 참고로, 셀 왼쪽에 표시되는 번호(예: [1], [2])가 실행 순서를 나타냅니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              한 셀에서 생성한 변수는 같은 노트북 내 다른 모든 셀에서 접근
              가능합니다.
              <br />이것을 <strong>커널 메모리 공유</strong>라고 합니다.
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
            <p className="text-lg text-gray-700">
              <strong>조건:</strong> 변수를 생성하는 셀이 먼저{" "}
              <strong>실행</strong>되어 있어야 합니다.
              <br />
              셀이 위에 위치해 있어도, 실행하지 않았다면 변수는 존재하지
              않습니다.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-base text-gray-600">
              💡 셀 왼쪽의 번호 (예: [1], [2])가 실행 순서를 나타냅니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 4: 간단한 AI 예제 코드 (5분)",
    bg: "from-amber-50 to-yellow-50",
    script: `네 번째 미션입니다. 이번 목표는 조건문 기반의 간단한 AI 예제를 실행하고, 직접 규칙을 추가해보는 것입니다. 화면에 보이는 코드를 새 셀에 입력하고 실행해주시기 바랍니다. 이 코드는 입력된 문장에 특정 단어가 포함되어 있는지를 확인하고, 그에 맞는 응답을 반환합니다. '안녕'이라는 단어가 들어있으면 인사를 하고, '고양이'가 들어있으면 고양이에 대한 반응을 보여줍니다. 실제 AI는 이것보다 훨씬 복잡한 방식으로 동작하지만, '입력을 받아서, 처리하고, 결과를 출력한다'는 기본 구조는 동일합니다. 실행을 확인하신 분들은 elif 줄을 추가하여 자신만의 규칙을 만들어보시기 바랍니다. 예를 들어 '날씨'라는 단어에 반응하는 규칙을 추가하는 것입니다. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 조건문 기반 AI 예제를 실행하고, 직접 규칙을
            추가합니다.
          </p>
        </div>
        <CodeBlock>
          {`def simple_ai_response(text):
    if "안녕" in text:
        return "AI: 안녕하세요! 반가워요"
    elif "고양이" in text:
        return "AI: 저도 고양이를 좋아해요!"
    elif "AI" in text or "인공지능" in text:
        return "AI: 인공지능 이야기를 좋아해요!"
    else:
        return "AI: 다른 말을 해볼래요?"

print(simple_ai_response("안녕! 고양이 좋아하니?"))`}
        </CodeBlock>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <p className="text-lg text-gray-600">
            실제 AI의 기본 구조: <strong>입력 → 처리 → 출력</strong>
          </p>
        </div>
        <p className="text-lg text-orange-600 font-medium">
          ✍️ 완료한 분: elif 줄을 추가하여 나만의 규칙을 만들어보세요.
        </p>
      </div>
    ),
  },
  {
    title: "미션 4 해설",
    bg: "from-amber-50 to-orange-50",
    script: `미션 4의 핵심 포인트입니다. 여러분이 작성한 코드는 '규칙 기반 시스템(Rule-based System)'이라고 합니다. 사람이 미리 정해둔 if-elif-else 규칙에 따라 답을 선택하는 방식입니다. 현대의 AI, 예를 들어 ChatGPT 같은 대규모 언어 모델은 이런 수동 규칙 대신 대량의 데이터에서 패턴을 학습하여 응답을 생성합니다. 하지만 '입력을 받아서 처리하고 결과를 출력한다'는 기본 흐름은 동일합니다. 오늘 여러분이 직접 elif 규칙을 추가해본 경험은, 앞으로 AI 모델이 어떤 방식으로 동작하는지 이해하는 데 좋은 기초가 될 것입니다. 그리고 이런 실험을 한 셀씩 단계별로 진행할 수 있다는 것이 바로 .ipynb의 강점입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-gray-800 font-semibold">핵심 포인트</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-xl p-5">
              <p className="font-semibold text-orange-700 mb-2">
                오늘의 코드: 규칙 기반 시스템
              </p>
              <p className="text-gray-600">
                사람이 정한 if-elif-else 규칙에 따라 응답 선택
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5">
              <p className="font-semibold text-purple-700 mb-2">
                현대 AI: 학습 기반 시스템
              </p>
              <p className="text-gray-600">
                대량의 데이터에서 패턴을 학습하여 응답 생성
              </p>
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-5">
            <p className="text-xl text-gray-700 text-center">
              공통 구조: <strong>입력 → 처리 → 출력</strong>
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "미션 5: 자유 실습 시간 (5분)",
    bg: "from-emerald-50 to-green-50",
    script: `마지막 미션, 자유 실습 시간입니다. 지금까지 배운 모든 기능을 활용하여 자유롭게 노트북을 다뤄보시기 바랍니다. 화면에 네 가지 활동을 제안했는데, 이 중 원하는 것을 골라서 해도 좋고, 자신만의 방식으로 실험해도 좋습니다. 첫째, 변수와 print를 활용한 나만의 코드 만들기. 둘째, 셀의 순서를 바꿔보고 결과가 달라지는지 확인하기. 셋째, 필요 없는 셀을 삭제해보기. 넷째, 마크다운 셀로 오늘 배운 내용을 정리해보기. 특히 네 번째 활동을 추천합니다. 오늘 배운 내용을 자신의 언어로 정리하면 기억에 오래 남습니다. 질문이 있으면 언제든지 손을 들어주시기 바랍니다. 5분 드리겠습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-lg text-gray-600">
            <strong>목표:</strong> 지금까지 배운 모든 기능을 자유롭게 활용합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              num: "1",
              text: "변수와 print()를 활용해서 나만의 코드 만들기",
            },
            {
              num: "2",
              text: "셀의 순서를 바꿔보고, 결과가 달라지는지 확인",
            },
            { num: "3", text: "필요 없는 셀 삭제해보기 (휴지통 아이콘)" },
            {
              num: "4",
              text: "마크다운 셀로 오늘 배운 내용을 정리해보기 (추천!)",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="bg-white/70 rounded-xl p-5 flex items-start gap-3"
            >
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                {item.num}
              </span>
              <p className="text-lg text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-500 text-center">
          질문은 언제든지 환영합니다.
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 실습 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 5가지 미션을 모두 수행하셨습니다. 정리하겠습니다. 미션 1에서는 코드 셀을 실행하고 즉시 결과를 확인하는 .ipynb의 기본 기능을 체험했습니다. 미션 2에서는 마크다운 셀로 코드에 대한 설명을 작성하는 문서화 기능을 익혔습니다. 미션 3에서는 셀 간 변수 공유와 실행 순서의 중요성을 직접 확인했습니다. 미션 4에서는 조건문 기반의 AI 예제를 실행하고 직접 규칙을 추가해봤습니다. 미션 5에서는 자유롭게 노트북을 다루면서 전체적인 활용법을 복습했습니다. 이제 여러분은 .ipynb 파일을 생성하고, 코드를 실행하고, 설명을 작성하고, 변수를 활용하는 기본적인 능력을 갖추게 되었습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          {[
            { num: "1", text: "코드 셀 실행과 즉시 결과 확인", color: "bg-rose-100" },
            { num: "2", text: "마크다운 셀로 코드 설명 작성 (문서화)", color: "bg-violet-100" },
            { num: "3", text: "셀 간 변수 공유와 실행 순서의 중요성", color: "bg-teal-100" },
            { num: "4", text: "조건문 기반 AI 예제 실행 및 규칙 추가", color: "bg-amber-100" },
            { num: "5", text: "자유로운 노트북 활용 실습", color: "bg-emerald-100" },
          ].map((item) => (
            <div
              key={item.num}
              className={`${item.color} rounded-xl p-4 flex items-center gap-4`}
            >
              <span className="text-lg font-bold text-gray-500">
                미션 {item.num}
              </span>
              <p className="text-lg text-gray-700">{item.text} ✅</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: `오늘 실습을 마치겠습니다. 여러분 모두 훌륭하게 수행해주셨습니다. .ipynb 파일을 만들고, 코드를 실행하고, 설명을 작성하고, 변수를 활용하는 기본 능력을 갖추셨습니다. 이 기초 위에 앞으로 본격적인 AI 실습을 진행하게 됩니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-5xl font-bold text-gray-800">
          실습을 마칩니다
        </h1>
        <div className="text-xl text-gray-600 space-y-2 mt-4">
          <p>코드 셀 실행 ✅</p>
          <p>마크다운 셀 작성 ✅</p>
          <p>셀 간 변수 공유 이해 ✅</p>
          <p>AI 예제 코드 실행 ✅</p>
          <p>자유 실습 완료 ✅</p>
        </div>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function TaskSlidePage() {
  return <SlideShell slides={slides} />;
}
