import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
  return (
    <div className="p-10 mb-100">
      <Title my="m" size="h2" id={"class"}>
        클래스
      </Title>
      <Text>
        클래스는 마치 붕어빵 틀과 같아서, 틀 자체는 붕어빵이 아니지만 그 틀을
        이용해 팥 붕어빵, 슈크림 붕어빵처럼 같은 모양이지만 내용물이 다른
        붕어빵을 여러 개 찍어낼 수 있듯이, <Code>class Player:</Code>라고
        클래스를 한 번 정의해두면 <Code>player1 = Player("Alice")</Code>,{" "}
        <Code>player2 = Player("Bob")</Code>처럼 같은 구조를 가지지만 서로 다른
        데이터를 가진 객체를 여러 개 만들어낼 수 있습니다.
      </Text>

      <CodeBlockExplainSection
        code={`
class Player:                          # 1. class 키워드로 클래스 정의
    def __init__(self, name, hp):      # 2. 객체 생성 시 자동으로 실행되는 메서드
        self.name = name               # 3. self.변수명으로 데이터 저장
        self.hp = hp

    def take_damage(self, damage):     # 4. 기능(메서드) 추가
        self.hp -= damage
        print(f"{self.name}의 체력: {self.hp}")

    def is_alive(self):                # 5. 메서드는 여러 개 추가 가능
        return self.hp > 0


# 클래스로 객체 생성
player1 = Player("Alice", 100)        # __init__ 자동 실행
player1.take_damage(30)               # Alice의 체력: 70
print(player1.is_alive())             # True
				`}
        title="클래스를 만드는 방법"
        des={
          <>
            클래스를 만들 때는 마치 설계도를 그리듯{" "}
            <Code>class 클래스이름:</Code>으로 시작하고, 그 안에{" "}
            <Code>init</Code> 메서드를 정의해서 객체가 처음 만들어질 때 가져야
            할 데이터를 설정하는데, 여기서 <Code>self</Code>는 "나 자신"을
            가리키는 대명사로 <Code>self.name</Code>처럼 앞에 붙여야 그 객체만의
            데이터로 저장되고, 이후 기능을 추가하고 싶으면{" "}
            <Code>def 메서드이름(self):</Code> 형태로 함수를 클래스 안에
            작성하면 됩니다.
          </>
        }
      />
      <Title my="m" size="h2" id={"instance"}>
        객체 - instance
      </Title>
      <Text>
        객체란 클래스라는 설계도를 바탕으로 실제로 만들어진 결과물인데, 마치
        "자동차 설계도"는 하나지만 그 설계도를 이용해 빨간 자동차, 파란
        자동차처럼 실제로 도로 위를 달리는 자동차를 여러 대 만들 수 있듯이,{" "}
        <Code>class Player:</Code>라는 설계도를 바탕으로{" "}
        <Code>player1 = Player("Alice", 100)</Code>이라고 작성하는 순간 메모리
        위에 실제로 존재하는 객체가 탄생하고, 각 객체는 같은 설계도에서
        만들어졌더라도 <Code>player1.name</Code>은 "Alice",{" "}
        <Code>player2.name</Code>은 "Bob"처럼 자기만의 고유한 데이터를 가집니다.
      </Text>
      <CodeBlock
        code={`
class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

# 설계도(클래스)는 하나지만 객체는 여러 개 생성 가능
player1 = Player("Alice", 100)  # 객체 1
player2 = Player("Bob", 80)     # 객체 2
player3 = Player("Carol", 90)   # 객체 3

# 같은 설계도에서 만들어졌지만 각자 고유한 데이터를 가짐
print(player1.name)  # Alice
print(player2.name)  # Bob
print(player3.name)  # Carol
				`}
      />

      <Title id={"basic"} my="l" size="h2">
        클래스의 개념
      </Title>
      <CodeBlockExplainSection
        code={`
# 클래스 없이 관리 → 변수가 뒤죽박죽
player1_name = "Alice"
player1_hp = 100
player1_speed = 5
player2_name = "Bob"
player2_hp = 80
player2_speed = 3

# 클래스로 관리 → 깔끔하게 정리
class Player:
    def __init__(self, name, hp, speed):
        self.name = name
        self.hp = hp
        self.speed = speed

    def take_damage(self, damage):
        self.hp -= damage
        print(f"{self.name}의 체력: {self.hp}")

player1 = Player("Alice", 100, 5)
player2 = Player("Bob", 80, 3)

player1.take_damage(20)  # Alice의 체력: 80
player2.take_damage(10)  # Bob의 체력: 70
				`}
        title="클래스를 사용하는 이유"
        des={
          <>
            클래스를 사용하는 이유는 관련된 데이터와 기능을 하나로 묶어서 코드를
            깔끔하게 정리하기 위해서인데, 예를 들어 클래스 없이 플레이어 두 명을
            관리하려면 <Code>player1_name</Code>, <Code>player1_hp</Code>,{" "}
            <Code>player1_speed</Code>처럼 변수를 따로따로 만들어야 해서 마치
            서랍 없이 책상 위에 물건을 마구 올려놓은 것처럼 코드가 뒤죽박죽이
            되지만, 클래스를 사용하면 이름, 체력, 속도, 이동 기능을{" "}
            <Code>Player</Code>라는 서랍 하나에 깔끔하게 정리할 수 있고
            플레이어가 10명으로 늘어나도 <Code>Player()</Code>를 10번 호출하기만
            하면 되므로 코드의 재사용성과 유지보수성이 크게 높아집니다.
          </>
        }
      />
      <CodeBlockExplainSection
        code={`
class Player:
    max_players = 4              # 클래스 변수: 모든 객체가 공유하는 데이터

    def __init__(self, name, hp): # __init__: 객체 생성 시 자동 실행
        self.name = name          # 인스턴스 변수: 각 객체만의 고유 데이터
        self.hp = hp

    def take_damage(self, damage): # 메서드: 클래스 안에 정의된 함수
        self.hp -= damage
        print(f"{self.name}의 체력: {self.hp}")

    def is_alive(self):            # self는 항상 첫 번째 매개변수
        return self.hp > 0


player1 = Player("Alice", 100)    # 객체 생성
player2 = Player("Bob", 80)

player1.take_damage(30)           # Alice의 체력: 70
print(player1.is_alive())         # True

print(Player.max_players)         # 4  ← 클래스 변수는 클래스 이름으로 접근
print(player1.name)               # Alice  ← 인스턴스 변수는 객체 이름으로 접근
print(player2.name)               # Bob
				`}
        title="핵심 개념"
        des={
          <>
            클래스를 사용할 때 반드시 알아야 할 기본 개념들을 정리하면, 첫째로{" "}
            <Code>init</Code>은 객체가 생성될 때 자동으로 실행되는 초기화
            메서드이고, 둘째로 <Code>self</Code>는 "나 자신"을 가리키는 대명사로
            클래스 안의 모든 메서드 첫 번째 매개변수에 반드시 써야 하며, 셋째로{" "}
            <Code>self.변수명</Code>처럼 <Code>self</Code>가 붙은 변수는 그
            객체만의 데이터인 인스턴스 변수이고, 넷째로 클래스 안에 정의된
            함수를 메서드라고 부르며, 다섯째로 클래스 이름 바로 아래에 작성한
            변수는 모든 객체가 공유하는 클래스 변수로 인스턴스 변수와 구별해서
            사용해야 합니다.
          </>
        }
      />
      <CodeBlockExplainSection
        code={`
class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def attack(self):                    # public 메서드: 외부에서 자유롭게 호출 가능
        damage = self.__calculate_damage()
        print(f"{self.name}이 {damage}의 데미지를 입혔습니다.")

    def _helper(self):                   # 관례적 private: 외부에서 쓰지 말아달라는 약속
        print("내부용 메서드입니다.")

    def __calculate_damage(self):        # private 메서드: 클래스 내부에서만 사용
        return 50


player = Player("Alice", 100)

player.attack()                          # 정상 실행: Alice이 50의 데미지를 입혔습니다.
player._helper()                         # 실행은 되지만 관례상 호출하지 않는 것이 좋음
player.__calculate_damage()              # 오류 발생: 외부에서 접근 불가
					`}
        title="private 메서드와 public 메서드"
        des={
          <>
            파이썬에서 public 메서드와 private 메서드의 차이는 마치 카페에서
            손님이 이용할 수 있는 공간과 직원만 들어갈 수 있는 주방의 차이와
            같은데, 이름 앞에 아무것도 붙이지 않은{" "}
            <Code>def attack(self):</Code>는 public 메서드로 클래스 밖에서
            자유롭게 호출할 수 있고, 이름 앞에 밑줄 두 개를 붙인{" "}
            <Code>def __calculate(self):</Code>는 private 메서드로 클래스
            내부에서만 사용하도록 의도된 메서드이며, 밑줄 한 개를 붙인{" "}
            <Code>def _helper(self):</Code>는 "외부에서 직접 쓰지
            말아주세요"라는 개발자들 사이의 약속으로 강제는 아니지만 관례적으로
            내부용임을 표시할 때 사용합니다.
          </>
        }
      />
      <CodeBlockExplainSection
        code={`
class Player:
    max_players = 4              # 클래스 변수

    def __init__(self, name: str):
        self.name: str = name    # 인스턴스 변수

player1 = Player("Alice")
player2 = Player("Bob")

# 인스턴스에서 클래스 변수 접근 가능
print(player1.max_players)      # 4
print(player2.max_players)      # 4
print(Player.max_players)       # 4

# 인스턴스를 통해 변경하면 클래스 변수가 아닌 새로운 인스턴스 변수가 생성됨
player1.max_players = 10
print(player1.max_players)      # 10  ← player1만의 새로운 인스턴스 변수
print(player2.max_players)      # 4   ← 클래스 변수는 그대로
print(Player.max_players)       # 4   ← 클래스 변수는 그대로

# 클래스 변수를 실제로 변경하려면 클래스 이름으로 접근해야 함
Player.max_players = 10
print(player1.max_players)      # 10  ← 이미 인스턴스 변수가 생성되어 있어서 그대로
print(player2.max_players)      # 10  ← 클래스 변수가 변경되어 반영됨
print(Player.max_players)       # 10  ← 클래스 변수 변경됨
				`}
        title="인스턴스가 클래스 변수에 접근할 경우"
        des={
          <>
            클래스 변수는 마치 학교 게시판처럼 모든 학생(인스턴스)이 공유하는
            정보인데, 인스턴스에서 <Code>player1.max_players</Code>처럼 접근하면
            파이썬이 먼저 그 인스턴스 안에서 해당 변수를 찾고 없으면 자동으로
            클래스 변수를 찾아서 반환해 주기 때문에 인스턴스에서도 접근이
            가능하지만, 주의할 점은 <Code>player1.max_players = 10</Code>처럼
            인스턴스를 통해 값을 변경하면 클래스 변수가 바뀌는 것이 아니라 그
            인스턴스만의 새로운 변수가 생성되므로 클래스 변수를 변경하려면
            반드시 <Code>Player.max_players = 10</Code>처럼 클래스 이름으로
            접근해야 합니다.
          </>
        }
      />
      <CodeBlockExplainSection
        code={`
class Player:
    name: str                            # 클래스 변수 타입 힌트
    hp: int
    speed: float

    def __init__(self, name: str, hp: int, speed: float) -> None:  # 매개변수 타입 힌트
        self.name: str = name            # 인스턴스 변수 타입 힌트
        self.hp: int = hp
        self.speed: float = speed

    def take_damage(self, damage: int) -> None:   # 반환값이 없으면 -> None
        self.hp -= damage
        print(f"{self.name}의 체력: {self.hp}")

    def is_alive(self) -> bool:          # 반환값이 bool이면 -> bool
        return self.hp > 0

    def get_name(self) -> str:           # 반환값이 str이면 -> str
        return self.name


player = Player("Alice", 100, 1.5)
player.take_damage(30)                   # Alice의 체력: 70
print(player.is_alive())                 # True
print(player.get_name())                 # Alice
				`}
        title="파이썬 클래스에서 타입힌트 설정하기"
        des={
          <>
            파이썬은 기본적으로 변수에 타입을 강제하지 않지만, 마치 서류 양식에
            "이름: ___", "나이: ___"처럼 어떤 종류의 데이터를 넣어야 하는지 미리
            표시해두는 것처럼 클래스에서 <Code>name: str</Code>,{" "}
            <Code>hp: int</Code>와 같이 타입 힌트를 작성하면 코드를 읽는 사람이
            어떤 데이터가 들어와야 하는지 한눈에 파악할 수 있고, 실제로 타입이
            틀려도 파이썬이 오류를 강제로 막지는 않지만 VSCode 같은 편집기에서
            자동완성과 경고를 띄워줘서 실수를 미리 방지하는 데 큰 도움이 됩니다.
          </>
        }
      />
      <Title id="inheritance" size="h2" my="m">
        상속
      </Title>
      <Text size="md">
        {" "}
        클래스 상속이란 이미 만들어진 클래스의 데이터와 기능을 물려받아 새로운
        클래스를 만드는 것인데, 마치 스마트폰이 기존 전화기의 통화 기능을 그대로
        물려받으면서 카메라, 인터넷 같은 새로운 기능을 추가한 것처럼{" "}
        <Code>class Warrior(Player):</Code>라고 괄호 안에 부모 클래스 이름을
        넣으면 <Code>Player</Code>의 모든 데이터와 메서드를 그대로 가져오면서
        전사만의 새로운 기능을 추가하거나 기존 기능을 덮어써서 변경할 수 있고,
        이때 <Code>super()</Code>는 부모 클래스를 가리키는 표현으로{" "}
        <Code>super().init()</Code>처럼 사용하면 부모의 초기화 코드를 그대로
        재사용할 수 있어서 중복 코드를 줄일 수 있습니다.
      </Text>
      <CodeBlock
        code={`
class Player:                              # 부모 클래스
    def __init__(self, name: str, hp: int) -> None:
        self.name = name
        self.hp = hp

    def take_damage(self, damage: int) -> None:
        self.hp -= damage
        print(f"{self.name}의 체력: {self.hp}")


class Warrior(Player):                     # Player를 상속받는 자식 클래스
    def __init__(self, name: str, hp: int, sword: str) -> None:
        super().__init__(name, hp)         # 부모의 __init__ 재사용
        self.sword = sword                 # 전사만의 고유 데이터 추가

    def slash(self) -> None:              # 전사만의 고유 메서드 추가
        print(f"{self.name}이 {self.sword}로 공격했습니다.")

    def take_damage(self, damage: int) -> None:  # 부모 메서드 덮어쓰기(오버라이딩)
        self.hp -= damage // 2             # 전사는 방어력이 있어서 데미지 절반
        print(f"{self.name}의 체력: {self.hp} (전사 방어력 적용)")


warrior = Warrior("Alice", 100, "롱소드")

warrior.slash()                            # Alice이 롱소드로 공격했습니다.
warrior.take_damage(40)                    # Alice의 체력: 80 (전사 방어력 적용)

print(isinstance(warrior, Warrior))        # True  ← Warrior의 인스턴스
print(isinstance(warrior, Player))         # True  ← 동시에 Player의 인스턴스이기도 함
				`}
      />
    </div>
  );
}
