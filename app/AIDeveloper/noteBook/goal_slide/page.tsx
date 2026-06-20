"use client";

import SlideShell, {
  CodeBlock,
  type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: `안녕하세요, 여러분. 오늘 강의의 주제는 '.ipynb 파일과 친해지기'입니다. .ipynb는 'Interactive Python Notebook'의 약자로, 주피터 노트북이라고도 불리는 파일 형식입니다. 이 파일은 AI 개발, 데이터 분석, 머신러닝 분야에서 표준적으로 사용되는 도구이며, 여러분이 앞으로 AI를 학습하는 과정에서 반드시 익혀야 할 핵심 도구입니다. 오늘 강의에서는 먼저 여러분이 이미 알고 있는 .py 파일과 비교하면서, .ipynb 파일이 어떤 점에서 다르고 왜 유용한지 체계적으로 살펴보겠습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">🐾</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
          <code className="text-orange-500">.ipynb</code> 파일과
          <br />
          친해져 보자냥!
        </h1>
        <p className="text-2xl text-gray-500 mt-2">
          코딩냥과 함께하는 주피터 노트북 개념 강의
        </p>
      </div>
    ),
  },
  {
    title: "오늘의 학습 목표",
    bg: "from-yellow-50 to-amber-50",
    script: `본격적인 내용에 들어가기 전에, 오늘 강의의 학습 목표를 먼저 확인하겠습니다. 첫째, .py 파일과 .ipynb 파일의 근본적인 차이점을 이해합니다. 둘째, .ipynb 파일의 핵심 구성 요소인 '셀(cell)'의 개념과 종류를 파악합니다. 셋째, VS Code에서 직접 .ipynb 파일을 생성하고 실행하는 방법을 익힙니다. 이 세 가지를 오늘 강의가 끝나기 전까지 확실히 이해하는 것이 목표입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-600 mb-2">
          이번 시간이 끝나면 여러분은 다음을 할 수 있게 됩니다.
        </p>
        <div className="space-y-4">
          {[
            {
              num: "1",
              text: ".py 파일과 .ipynb 파일의 근본적인 차이점을 설명할 수 있다",
            },
            {
              num: "2",
              text: ".ipynb 파일의 핵심 구성 요소인 '셀(cell)'의 개념과 종류를 이해한다",
            },
            {
              num: "3",
              text: "VS Code에서 .ipynb 파일을 직접 생성하고 실행할 수 있다",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
            >
              <span className="bg-orange-400 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">
                {item.num}
              </span>
              <p className="text-xl text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "우리가 알고 있는 .py 파일",
    bg: "from-blue-50 to-indigo-50",
    script: `먼저 여러분이 이미 알고 있는 .py 파일부터 복습하겠습니다. .py 파일은 파이썬의 기본 코드 파일입니다. 이 파일의 특징은 코드를 위에서부터 아래까지 순차적으로, 전체를 한 번에 실행한다는 것입니다. 예를 들어, 화면에 보이는 코드처럼 '재료 준비, 썰기, 볶기, 간 맞추기, 완성'이라는 다섯 단계가 있다면, 실행 버튼을 누르면 이 다섯 단계가 한꺼번에 순서대로 실행됩니다. 중간에 '재료 썰기까지만 실행해서 결과를 확인하고 싶다'고 해도, 기본적으로는 전체가 실행됩니다. 중간 결과를 확인하려면 별도로 print문을 넣거나 디버거를 사용해야 합니다. 이것을 쉽게 비유하면, 츄르 한 봉지를 한 번에 다 짜서 먹는 것과 같습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-xl text-gray-700">
            <strong>.py 파일</strong>은 파이썬의 기본 코드 파일로,
            <br />
            <strong>위에서부터 아래까지 전체를 한 번에 실행</strong>합니다.
          </p>
        </div>
        <div className="flex items-start gap-6">
          <span className="text-7xl shrink-0">🥤</span>
          <div className="flex-1">
            <CodeBlock>
              {`# my_recipe.py
재료_준비()
재료_썰기()
볶기()
간_맞추기()
완성()`}
            </CodeBlock>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 space-y-2">
          <p className="text-lg text-gray-600">
            <strong>특징:</strong> 실행하면 끝까지 쭉 돌아간 다음에야 결과 확인
          </p>
          <p className="text-lg text-gray-600">
            <strong>비유:</strong> 츄르 한 봉지를 한 번에 다 먹는 것
          </p>
        </div>
      </div>
    ),
  },
  {
    title: ".py 파일의 한계",
    bg: "from-blue-50 to-sky-50",
    script: `.py 파일이 나쁜 것은 아닙니다. 완성된 프로그램을 만들거나 자동화 스크립트를 작성할 때는 .py 파일이 적합합니다. 하지만 학습이나 실험, 데이터 탐색 같은 상황에서는 몇 가지 불편한 점이 있습니다. 첫째, 코드를 부분적으로 실행하기 어렵습니다. 전체를 한 번에 실행하기 때문에, 특정 부분만 테스트하려면 나머지를 주석 처리하거나 별도 파일을 만들어야 합니다. 둘째, 중간 결과를 확인하기 번거롭습니다. 매번 print문을 넣었다 지웠다 해야 합니다. 셋째, 코드에 대한 설명을 주석(#)으로만 달 수 있어서, 복잡한 설명이나 수식, 이미지를 포함하기 어렵습니다. 이러한 한계를 해결해주는 것이 바로 .ipynb 파일입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-xl text-gray-700">
          학습과 실험 상황에서 .py 파일의 불편한 점
        </p>
        <div className="space-y-4">
          {[
            {
              icon: "🔒",
              title: "부분 실행이 어렵다",
              desc: "특정 부분만 테스트하려면 나머지를 주석 처리하거나 별도 파일 필요",
            },
            {
              icon: "🔍",
              title: "중간 결과 확인이 번거롭다",
              desc: "매번 print문을 넣었다 지웠다 해야 함",
            },
            {
              icon: "📝",
              title: "설명 작성이 제한적이다",
              desc: "주석(#)으로만 가능 — 수식, 이미지, 서식 있는 글은 불가",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="text-base text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-lg text-orange-600 font-medium text-center">
          이 한계를 해결해주는 것이 바로 .ipynb 파일입니다!
        </p>
      </div>
    ),
  },
  {
    title: ".ipynb 파일이란?",
    bg: "from-green-50 to-emerald-50",
    script: `이제 오늘의 주인공인 .ipynb 파일에 대해 알아보겠습니다. .ipynb는 'Interactive Python Notebook'의 약자이며, 주피터 노트북(Jupyter Notebook)이라는 도구에서 만들어진 파일 형식입니다. 참고로, 'Jupyter'라는 이름은 Julia, Python, R이라는 세 프로그래밍 언어의 이름을 합쳐서 만든 것입니다. .ipynb 파일의 가장 큰 특징은 코드를 '셀(cell)'이라는 작은 단위로 나누어 작성하고, 각 셀을 독립적으로 실행할 수 있다는 것입니다. 한 셀을 실행하면 그 셀의 결과가 바로 아래에 표시됩니다. 간식을 한 알씩 천천히 먹으면서 각각의 맛을 음미하는 것에 비유할 수 있습니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <div className="bg-white/60 rounded-xl p-5">
          <p className="text-lg text-gray-500 mb-1">
            .ipynb = <strong>I</strong>nteractive <strong>P</strong>ython{" "}
            <strong>N</strong>ote<strong>b</strong>ook
          </p>
          <p className="text-xl text-gray-700">
            코드를 <strong>셀(cell)</strong>이라는 작은 단위로 나누어 작성하고,
            <br />각 셀을 <strong>독립적으로 실행</strong>할 수 있는 파일
            형식입니다.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-7xl">🐟</span>
          <p className="text-xl text-gray-600">
            간식을 한 알씩 천천히 음미하는 것처럼,
            <br />한 셀씩 실행하고 결과를 바로 확인합니다.
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 text-base text-gray-500">
          💡 Jupyter라는 이름은 <strong>Ju</strong>lia +{" "}
          <strong>Pyt</strong>hon + <strong>R</strong> 세 언어의 이름에서
          유래했습니다.
        </div>
      </div>
    ),
  },
  {
    title: ".ipynb의 핵심: 셀(Cell)",
    bg: "from-green-50 to-teal-50",
    script: `.ipynb 파일의 가장 중요한 개념은 '셀(cell)'입니다. 셀에는 크게 두 가지 종류가 있습니다. 첫째, 코드 셀(Code Cell)입니다. 파이썬 코드를 작성하고 실행하는 칸입니다. 실행하면 바로 그 아래에 결과가 출력됩니다. 둘째, 마크다운 셀(Markdown Cell)입니다. 코드가 아닌 설명, 메모, 제목 등을 작성하는 칸입니다. 마크다운 문법을 사용하여 굵은 글씨, 목록, 링크 등 서식 있는 텍스트를 작성할 수 있습니다. 이 두 종류의 셀을 자유롭게 조합하여 '코드 + 결과 + 설명'을 하나의 문서에 체계적으로 정리할 수 있습니다. 이것이 .ipynb 파일이 학습과 실험에 적합한 핵심적인 이유입니다.`,
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-xl text-gray-700">
          .ipynb 파일은 두 종류의 셀로 구성됩니다.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white/70 rounded-xl p-6 border-l-4 border-blue-400">
            <p className="text-lg font-bold text-blue-700 mb-2">
              코드 셀 (Code Cell)
            </p>
            <p className="text-base text-gray-600 mb-3">
              파이썬 코드를 작성하고 실행하는 칸
            </p>
            <CodeBlock>{`print("안녕하세요!")`}</CodeBlock>
            <p className="text-sm text-gray-500 mt-2">
              → 실행하면 바로 아래에 결과 출력
            </p>
          </div>
          <div className="bg-white/70 rounded-xl p-6 border-l-4 border-purple-400">
            <p className="text-lg font-bold text-purple-700 mb-2">
              마크다운 셀 (Markdown Cell)
            </p>
            <p className="text-base text-gray-600 mb-3">
              설명, 메모, 제목 등을 작성하는 칸
            </p>
            <CodeBlock>
              {`# 제목
**굵은 글씨**, *기울임*
- 목록 항목`}
            </CodeBlock>
            <p className="text-sm text-gray-500 mt-2">
              → 서식이 적용된 깔끔한 문서로 표시
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-500 bg-white/60 rounded-xl p-4 text-center">
          코드 + 결과 + 설명이 하나의 문서에 체계적으로 정리됩니다.
        </p>
      </div>
    ),
  },
  {
    title: ".ipynb의 세 가지 장점",
    bg: "from-emerald-50 to-green-50",
    script: `.ipynb 파일의 핵심 장점을 세 가지로 정리하겠습니다. 첫째, 셀 단위 실행입니다. 코드를 한 칸씩 실행할 수 있기 때문에, 중간 결과를 바로 확인하면서 단계별로 진행할 수 있습니다. 오류가 발생했을 때도 해당 셀만 수정해서 다시 실행하면 됩니다. 둘째, 즉시 결과 확인입니다. 실행 결과가 셀 바로 아래에 표시되기 때문에, 코드와 결과를 한눈에 비교할 수 있습니다. 표, 그래프, 이미지 등 다양한 형태의 결과물도 바로 확인할 수 있습니다. 셋째, 문서화 기능입니다. 마크다운 셀을 활용하여 코드에 대한 상세한 설명을 함께 작성할 수 있습니다. 이를 통해 학습 내용을 체계적으로 기록하고, 다른 사람과 공유할 수 있는 완성된 문서를 만들 수 있습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        {[
          {
            num: "1",
            title: "셀 단위 실행",
            desc: "코드를 한 칸씩 실행하여 중간 결과를 바로 확인. 오류 발생 시 해당 셀만 수정하여 재실행 가능.",
            color: "bg-blue-500",
          },
          {
            num: "2",
            title: "즉시 결과 확인",
            desc: "실행 결과가 셀 바로 아래에 표시. 표, 그래프, 이미지 등 다양한 출력 형태 지원.",
            color: "bg-green-500",
          },
          {
            num: "3",
            title: "문서화 기능",
            desc: "마크다운 셀로 상세한 설명 작성. 학습 내용을 체계적으로 기록하고 공유 가능.",
            color: "bg-purple-500",
          },
        ].map((item) => (
          <div
            key={item.num}
            className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
          >
            <span
              className={`${item.color} text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-lg`}
            >
              {item.num}
            </span>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {item.title}
              </p>
              <p className="text-base text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: ".py vs .ipynb 비교표",
    bg: "from-purple-50 to-pink-50",
    script: `자, 이제 .py 파일과 .ipynb 파일의 차이점을 표로 한눈에 비교해보겠습니다. 화면의 표를 함께 읽어보겠습니다. 비유 — .py는 츄르 한 봉지를 한 번에 먹는 것, .ipynb는 간식을 한 알씩 음미하는 것입니다. 실행 방식 — .py는 전체를 한 번에 실행하지만, .ipynb는 셀 단위로 따로 실행할 수 있습니다. 결과 확인 — .py는 전체 실행이 끝나야 결과를 확인할 수 있지만, .ipynb는 각 셀마다 바로 결과를 확인할 수 있습니다. 설명 글 — .py는 주석(#)으로만 가능하지만, .ipynb는 마크다운 셀로 자유롭게 작성할 수 있습니다. 어울리는 작업 — .py는 완성된 프로그램 제작에, .ipynb는 실습, 데이터 탐색, 학습 과정 기록에 적합합니다. 이 표의 내용을 잘 기억해두시기 바랍니다.`,
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left"></th>
              <th className="p-4 text-left">.py 파일 🥤</th>
              <th className="p-4 text-left">.ipynb 파일 🐟</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              ["비유", "츄르 한 봉지 한입에", "간식 한 알씩 음미하기"],
              ["실행 방식", "전체를 한 번에 실행", "셀 단위로 따로 실행"],
              ["결과 확인", "다 끝나야 결과 확인", "칸마다 바로 결과 확인"],
              [
                "설명 글",
                "주석(#)으로만 가능",
                "마크다운 셀로 자유롭게 작성",
              ],
              [
                "어울리는 작업",
                "완성된 프로그램 만들기",
                "실습, 데이터 탐색, 학습 기록",
              ],
            ].map(([label, py, ipynb], i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-4 font-semibold">{label}</td>
                <td className="p-4">{py}</td>
                <td className="p-4">{ipynb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "VS Code에서 .ipynb 만들기",
    bg: "from-cyan-50 to-blue-50",
    script: `이제 실제로 VS Code에서 .ipynb 파일을 만드는 방법을 설명하겠습니다. 순서를 따라가면 매우 간단합니다. 첫 번째, VS Code를 엽니다. 두 번째, 왼쪽 위 메뉴에서 File, 그다음 New File을 클릭합니다. 세 번째, 파일 형식을 선택하는 화면이 나타나면 'Jupyter Notebook'을 선택합니다. 만약 목록에 보이지 않는다면, 파일 이름을 직접 practice.ipynb로 입력하여 저장하면 됩니다. 네 번째, 새 노트북이 열리면 빈 셀이 하나 보입니다. 거기에 코드를 입력합니다. 실행은 셀 왼쪽의 재생(▶) 버튼을 클릭하거나, Shift + Enter 키를 누르면 됩니다. 처음 실행할 때 '커널을 선택하세요(Select Kernel)'라는 안내창이 나타날 수 있는데, Python을 선택하면 됩니다. 한 번만 설정하면 이후에는 자동으로 연결됩니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <ol className="space-y-4 text-xl text-gray-700">
          {[
            "VS Code를 엽니다",
            "File → New File... 클릭",
            '"Jupyter Notebook" 선택 (또는 파일명을 practice.ipynb로 저장)',
            "빈 셀에 코드를 입력합니다",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="bg-orange-400 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <CodeBlock>{`print("야옹, 나는 .ipynb 파일이다냥!")`}</CodeBlock>
        <div className="bg-white/60 rounded-xl p-4 space-y-2">
          <p className="text-lg text-gray-600">
            ▶ 버튼 또는{" "}
            <kbd className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">
              Shift + Enter
            </kbd>
            로 실행
          </p>
          <p className="text-base text-gray-500">
            💡 &ldquo;Select Kernel&rdquo; 창이 뜨면 Python을 선택하세요.
            처음 한 번만 설정하면 됩니다.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "핵심 개념: 셀 실행 순서",
    bg: "from-teal-50 to-cyan-50",
    script: `.ipynb 파일을 사용할 때 반드시 이해해야 할 핵심 개념이 있습니다. 바로 '셀의 실행 순서'입니다. .ipynb에서는 셀의 물리적 위치, 즉 위에 있냐 아래에 있냐가 아니라, 실제로 실행한 순서가 중요합니다. 예를 들어, 셀 1에서 변수 my_name에 값을 저장하고, 셀 2에서 그 변수를 출력하는 코드가 있다고 합시다. 셀 1을 먼저 실행한 후 셀 2를 실행하면 정상적으로 작동합니다. 하지만 셀 2를 먼저 실행하면 'my_name이 정의되지 않았다'는 에러가 발생합니다. 셀의 위치가 위에 있어도, 실행하지 않았다면 그 안의 코드는 작동하지 않은 것입니다. 이것은 .ipynb를 사용하면서 가장 자주 겪는 실수이기도 하므로, 반드시 기억하시기 바랍니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
          <p className="text-xl text-gray-800 font-semibold">
            셀의 위치가 아닌, &ldquo;실행한 순서&rdquo;가 중요합니다!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              셀 1 (먼저 실행해야 함)
            </p>
            <CodeBlock>{`my_name = "코딩냥"`}</CodeBlock>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              셀 2 (셀 1 이후에 실행)
            </p>
            <CodeBlock>{`print(my_name, "안녕!")`}</CodeBlock>
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✅</span>
            <p className="text-lg text-gray-700">
              셀 1 → 셀 2 순서로 실행 → 정상 출력
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-red-500 text-xl">❌</span>
            <p className="text-lg text-gray-700">
              셀 2를 먼저 실행 → <code className="bg-red-100 px-1 rounded">NameError</code> 발생
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: ".ipynb가 사용되는 곳",
    bg: "from-indigo-50 to-violet-50",
    script: `.ipynb 파일이 실제로 어디에서 사용되는지 살펴보겠습니다. 첫째, AI 및 머신러닝 개발입니다. 데이터를 로드하고, 전처리하고, 모델을 학습시키고, 결과를 시각화하는 전 과정을 한 노트북 안에서 단계별로 진행할 수 있습니다. Google Colab, Kaggle 등 유명한 AI 플랫폼 대부분이 .ipynb 형식을 기본으로 사용합니다. 둘째, 데이터 분석입니다. 대량의 데이터를 탐색하고, 통계를 계산하고, 그래프를 그리는 작업에 매우 적합합니다. 셋째, 학습 및 교육입니다. 코드와 설명이 함께 있어서 교재나 튜토리얼로 활용하기 좋습니다. 여러분이 앞으로 AI를 학습하면서 접하게 될 대부분의 실습 자료가 .ipynb 형식으로 제공될 것입니다.`,
    content: (
      <div className="flex flex-col gap-5">
        {[
          {
            icon: "🤖",
            title: "AI / 머신러닝 개발",
            desc: "데이터 로드 → 전처리 → 모델 학습 → 시각화를 단계별로 진행. Google Colab, Kaggle 등이 기본으로 사용.",
          },
          {
            icon: "📊",
            title: "데이터 분석",
            desc: "대량의 데이터를 탐색하고, 통계를 계산하고, 그래프를 그리는 작업에 적합.",
          },
          {
            icon: "📚",
            title: "학습 및 교육",
            desc: "코드와 설명이 함께 있어 교재나 튜토리얼로 활용. 대부분의 AI 실습 자료가 .ipynb 형식으로 제공.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/70 rounded-xl p-5 flex items-start gap-4"
          >
            <span className="text-4xl">{item.icon}</span>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {item.title}
              </p>
              <p className="text-base text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "오늘 배운 내용 정리",
    bg: "from-orange-50 to-red-50",
    script: `오늘 강의에서 다룬 내용을 정리하겠습니다. 첫째, .py 파일은 처음부터 끝까지 한 번에 실행하는 완성된 코드 파일이며, 프로그램 제작에 적합합니다. 둘째, .ipynb 파일은 셀 단위로 실행하면서 결과를 바로 확인할 수 있고, 마크다운으로 설명을 추가할 수 있는 노트 형식의 파일입니다. 셋째, .ipynb의 핵심 구성 요소는 코드 셀과 마크다운 셀 두 가지입니다. 넷째, 셀의 실행 순서가 중요하며, 물리적 위치가 아닌 실제 실행 순서에 따라 코드가 작동합니다. 다섯째, AI, 데이터 분석, 학습 등 다양한 분야에서 .ipynb가 표준적으로 사용됩니다. 다음 시간에는 이 개념을 바탕으로 실습 미션을 직접 수행해보겠습니다.`,
    content: (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>.py 파일</strong> = 처음부터 끝까지 한 번에 실행하는 완성된
              코드 🥤
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xl text-gray-700">
              <strong>.ipynb 파일</strong> = 셀 단위로 실행 + 즉시 결과 확인 +
              마크다운 설명 🐟
            </p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-5 space-y-2">
          <p className="text-lg text-gray-700">
            ✅ 코드 셀과 마크다운 셀 두 가지로 구성
          </p>
          <p className="text-lg text-gray-700">
            ✅ 셀의 &ldquo;실행 순서&rdquo;가 핵심
          </p>
          <p className="text-lg text-gray-700">
            ✅ AI, 데이터 분석, 학습에서 표준적으로 사용
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    bg: "from-amber-50 to-orange-50",
    script: `오늘 강의를 마치겠습니다. .ipynb 파일이 무엇이고, .py 파일과 어떻게 다른지, 왜 AI 분야에서 널리 사용되는지 이해하셨을 것입니다. 다음 시간에는 오늘 배운 개념을 바탕으로, VS Code에서 직접 .ipynb 파일을 만들고 5가지 실습 미션을 수행해보겠습니다. 수고하셨습니다.`,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <span className="text-8xl">📘</span>
        <h1 className="text-5xl font-bold text-gray-800">
          개념 강의를 마칩니다
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          다음 시간: .ipynb 실습 미션을 직접 수행해봅니다
        </p>
        <p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
      </div>
    ),
  },
];

export default function GoalSlidePage() {
  return <SlideShell slides={slides} />;
}
