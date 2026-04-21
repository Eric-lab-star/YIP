import Title from "@/components/commons/Title";
import Text from "@/components/commons/Text";
import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
export default function Page() {
  return (
    <div className="p-10 pb-100">
      <Title id="intro" size="h2" my="l">
        모듈과 패키지
      </Title>
      <Text>
        모듈은 파이썬 코드가 담긴 하나의 .py 파일이고, 패키지는 그런 모듈들을
        폴더로 묶어놓은 것인데, 마치 요리책에 비유하자면 모듈은 "파스타 레시피
        페이지" 하나이고 패키지는 "이탈리안 요리책" 한 권 전체라고 볼 수 있어요.
        예를 들어 <Code>import math</Code>라고 하면 수학 관련 함수들이 담긴 모듈
        하나를 가져오는 것이고, <Code>from os.path import join</Code>처럼{" "}
        <Code>os</Code>라는 패키지 안의 <Code>path</Code>라는 모듈에서{" "}
        <Code>join</Code> 함수만 골라서 가져올 수도 있으며, 직접 만든 파일도
        같은 방식으로 <Code>import my_module</Code>처럼 불러올 수 있어서 코드를
        기능별로 파일에 나눠 관리하고 필요한 것만 가져다 쓸 수 있는 것이 모듈과
        패키지의 핵심입니다.
      </Text>

      <Title id="benefit" size="h2" my="l">
        패키지와 모듈 사용 이유
      </Title>

      <Text>
        코드를 하나의 파일에 모두 작성하면 마치 학교 사물함 하나에 교과서,
        체육복, 도시락, 우산을 전부 구겨넣는 것처럼 나중에 원하는 것을 찾기도
        힘들고 꺼내기도 불편해지는데, 파일을 기능별로 분리하면 "체육 시간엔 체육
        사물함만 열면 되는 것"처럼 <Code>player.py</Code>를 수정할 때 다른
        파일을 건드릴 필요가 없어서 유지보수가 쉬워지고, 같은{" "}
        <Code>player.py</Code>를 다른 프로젝트에서도 그대로 가져다 쓸 수 있는
        재사용성이 생기며, 팀으로 작업할 때도 A는 <Code>player.py</Code>, B는{" "}
        <Code>enemy.py</Code>를 각자 담당할 수 있어서 충돌 없이 협업이
        가능해집니다.
      </Text>
      <Title my="m" size="h3" id="benefitExample">
        예시
      </Title>
      <CodeBlock
        code={`
# 하나의 파일에 모두 작성 (나쁜 예)
main.py  ← 플레이어, 적, 총알, 배경, 점수판 코드가 전부 여기에...

# 기능별로 분리 (좋은 예)
main.py
entity/
├── __init__.py
├── player.py    ← 플레이어 관련 코드만
└── enemy.py     ← 적 관련 코드만
ui/
├── __init__.py
└── scoreboard.py  ← 점수판 관련 코드만
				`}
      />
      <CodeBlock
        code={`
# main.py
from entity.player import Player
from entity.enemy import Enemy
from ui.scoreboard import Scoreboard

# 각 파일이 자기 역할만 담당하므로
# Player 버그 수정 → player.py만 열면 됨
# Enemy 추가 기능 → enemy.py만 열면 됨

				`}
      />
      <HorizontalLine />
      <Title id="refactoring" size="h2" my="m">
        main.py 리팩토링하기
      </Title>
      <Text>
        리팩토링은 마치 방 청소와 같아서 방 안의 물건(기능)을 버리거나 새로 사는
        것이 아니라 어지럽게 놓여있던 물건들을 제자리에 정리하고 찾기 쉽게
        배치하는 작업인데, 코드에서도 동일하게 프로그램이 실행되는 결과는 전혀
        바꾸지 않으면서 코드의 구조를 더 읽기 쉽고 유지보수하기 좋게 개선하는
        모든 작업을 리팩토링이라고 하며, 대표적인 예로는 긴 함수를 작은 함수로
        쪼개기, 중복 코드를 하나로 합치기, 변수나 함수 이름을 더 명확하게
        바꾸기, 하나의 파일을 여러 모듈로 분리하기 등이 있습니다.
      </Text>
    </div>
  );
}
