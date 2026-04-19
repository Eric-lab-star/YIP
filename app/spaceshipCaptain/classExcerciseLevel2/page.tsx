import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Title from "@/components/commons/Title";
export default function Page() {
  return (
    <div className="p-10 pb-100">
      <Title my="m">클래스 연습하기 Level2</Title>

      {questions.map((q, i) => (
        <div className="my-10" key={i}>
          <Title my="m" size="h2">
            {q.question}
          </Title>
          <Title my="m" size="h3" weight="semi">
            {q.des}
          </Title>
          <CodeBlock code={q.code} />
        </div>
      ))}
    </div>
  );
}

interface IQuestion {
  question: string;
  code: string;
  des: string;
}

const questions: IQuestion[] = [
  {
    question: "문제 1. 클래스 만들기",
    des: "Dog 클래스를 만들고, 이름(name)과 나이(age)를 받는 __init__ 메소드를 작성하세요. 그런 다음 '초코', 3살 강아지 객체를 만들어 이름과 나이를 출력하세요.",
    code: `출력:
초코
3`,
  },
  {
    question: "문제 2. 메소드 추가하기",
    des: "아래 클래스에 bark() 메소드를 추가하세요. 이 메소드는 '(이름): 멍멍!' 형식의 문자열을 반환해야 합니다.",
    code: `class Dog:
    def __init__(self, name):
        self.name = name

d = Dog("초코")
print(d.bark())

출력: 초코: 멍멍!`,
  },
  {
    question: "문제 3. 여러 객체 만들기",
    des: "아래 Car 클래스를 이용하여 '소나타'(흰색)와 '아반떼'(검정)를 각각 객체로 만들고, 각 차의 이름과 색상을 출력하세요.",
    code: `class Car:
    def __init__(self, model, color):
        self.model = model
        self.color = color

출력:
소나타 흰색
아반떼 검정`,
  },
  {
    question: "문제 4. 속성 값 수정하기",
    des: "아래 코드에서 객체를 생성한 뒤, score 속성을 95로 수정하고 출력하세요.",
    code: `class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

s = Student("김철수", 80)
# score를 95로 수정하세요

출력: 95`,
  },
  {
    question: "문제 5. 계산하는 메소드",
    des: "아래 Rectangle 클래스에 area() 메소드를 추가하여 넓이(가로 × 세로)를 반환하도록 만드세요.",
    code: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

r = Rectangle(5, 3)
print(r.area())

출력: 15`,
  },
  {
    question: "문제 6. 정보 출력 메소드",
    des: "아래 Person 클래스에 info() 메소드를 추가하세요. 이 메소드는 '이름: (name), 나이: (age)' 형식의 문자열을 반환해야 합니다.",
    code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("이영희", 15)
print(p.info())

출력: 이름: 이영희, 나이: 15`,
  },
  {
    question: "문제 7. 메소드로 속성 변경하기",
    des: "아래 Lamp 클래스에 turn_on(), turn_off() 메소드를 추가하세요. turn_on()은 is_on을 True로, turn_off()는 False로 변경합니다. 아래 순서대로 실행하여 결과를 출력하세요.",
    code: `class Lamp:
    def __init__(self):
        self.is_on = False

lamp = Lamp()
lamp.turn_on()
print(lamp.is_on)
lamp.turn_off()
print(lamp.is_on)

출력:
True
False`,
  },
  {
    question: "문제 8. 누적 기능 만들기",
    des: "아래 BankAccount 클래스에 deposit(amount) 메소드를 추가하세요. deposit()을 호출할 때마다 balance에 amount만큼 더해집니다.",
    code: `class BankAccount:
    def __init__(self):
        self.balance = 0

account = BankAccount()
account.deposit(1000)
account.deposit(500)
print(account.balance)

출력: 1500`,
  },
  {
    question: "문제 9. __str__ 메소드",
    des: "아래 Book 클래스에 __str__ 메소드를 추가하여 print()로 출력했을 때 아래 형식이 나오도록 만드세요.",
    code: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

b = Book("파이썬 기초", "김코딩")
print(b)

출력: [파이썬 기초] 저자: 김코딩`,
  },
  {
    question: "문제 10. 객체 리스트 활용",
    des: "아래 Student 클래스로 학생 3명의 객체를 만들어 리스트에 저장한 뒤, for문으로 각 학생의 이름과 점수를 출력하세요.",
    code: `class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

# 김철수(90), 이영희(85), 박민수(78) 객체를 만드세요

출력:
김철수: 90점
이영희: 85점
박민수: 78점`,
  },
  {
    question: "문제 11. 조건 판단 메소드",
    des: "아래 Student 클래스에 is_pass() 메소드를 추가하세요. score가 60 이상이면 True, 미만이면 False를 반환해야 합니다.",
    code: `class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

s1 = Student("김철수", 75)
s2 = Student("이영희", 45)
print(s1.is_pass())
print(s2.is_pass())

출력:
True
False`,
  },
  {
    question: "문제 12. 클래스 변수",
    des: "아래 Counter 클래스에서 객체를 3개 생성했을 때 클래스 변수 count가 몇인지 출력하세요. 클래스 변수 count는 객체가 생성될 때마다 1씩 증가해야 합니다.",
    code: `class Counter:
    count = 0

    def __init__(self):
        Counter.count += 1

c1 = Counter()
c2 = Counter()
c3 = Counter()
print(Counter.count)

출력: 3`,
  },
  {
    question: "문제 13. 두 객체 비교하기",
    des: "아래 Rectangle 클래스에 is_bigger(other) 메소드를 추가하세요. 자신의 넓이가 other의 넓이보다 크면 True, 아니면 False를 반환해야 합니다.",
    code: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

r1 = Rectangle(5, 4)
r2 = Rectangle(3, 3)
print(r1.is_bigger(r2))
print(r2.is_bigger(r1))

출력:
True
False`,
  },
  {
    question: "문제 14. 메소드 여러 개 활용",
    des: "아래 Calculator 클래스에 add(), subtract(), reset() 메소드를 추가하세요. add(n)은 result에 n을 더하고, subtract(n)은 n을 빼고, reset()은 result를 0으로 초기화합니다.",
    code: `class Calculator:
    def __init__(self):
        self.result = 0

calc = Calculator()
calc.add(10)
calc.add(5)
calc.subtract(3)
print(calc.result)
calc.reset()
print(calc.result)

출력:
12
0`,
  },
  {
    question: "문제 15. 클래스 종합 활용",
    des: "아래 조건에 맞게 StudentGroup 클래스를 완성하세요. add_student(name, score)로 학생을 추가하고, show_all()로 전체 학생 정보를, best_student()로 최고 점수 학생 이름을 출력합니다.",
    code: `class StudentGroup:
    def __init__(self):
        self.students = []

    def add_student(self, name, score):
        # 딕셔너리로 학생 정보를 students 리스트에 추가하세요
        pass

    def show_all(self):
        # 모든 학생의 이름과 점수를 출력하세요
        pass

    def best_student(self):
        # 가장 점수가 높은 학생의 이름을 반환하세요
        pass

group = StudentGroup()
group.add_student("김철수", 85)
group.add_student("이영희", 92)
group.add_student("박민수", 78)
group.show_all()
print("최고 점수:", group.best_student())

출력:
김철수: 85점
이영희: 92점
박민수: 78점
최고 점수: 이영희`,
  },
];
