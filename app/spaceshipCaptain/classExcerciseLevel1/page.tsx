import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Title from "@/components/commons/Title";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";

export default function Page() {
  return (
    <div className="p-10 pb-100">
      <Title my="m">클래스 연습하기 Level1</Title>

      {questions.map((q, i) => (
        <QuizzWithOptions
          key={i}
          answer={q.answer}
          question={`${i + 1}. ${q.question}`}
        >
          {q.code && <CodeBlock code={q.code} />}
          {q.options.map((option, j) => (
            <Option key={j} value={j + 1}>
              {option}
            </Option>
          ))}
        </QuizzWithOptions>
      ))}
    </div>
  );
}

interface IQuestion {
  question: string;
  answer: number;
  code?: string;
  options: string[];
}

const questions: IQuestion[] = [
  {
    question: "클래스에 관한 설명으로 틀린 것을 고르세요.",
    answer: 2,
    options: [
      "클래스를 사용하면 데이터와 기능을 하나로 묶을 수 있다.",
      "하나의 클래스로는 하나의 객체만 만들 수 있다.",
      "클래스에서 정의된 함수를 메소드라고 한다.",
      "클래스는 객체를 만들기 위한 설계도 역할을 한다.",
    ],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Dog:
    def __init__(self, name):
        self.name = name

d = Dog("초코")
print(d.name)`.trim(),
    answer: 1,
    options: ["초코", "name", "Dog", "에러 발생"],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Cat:
    def __init__(self, age):
        self.age = age

c = Cat(3)
print(c.age)`.trim(),
    answer: 2,
    options: ["Cat", "3", "age", "에러 발생"],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return "안녕, 나는 " + self.name

p = Person("민준")
print(p.greet())`.trim(),
    answer: 3,
    options: [
      "안녕, 나는 Person",
      "안녕, 나는 self.name",
      "안녕, 나는 민준",
      "에러 발생",
    ],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return self.radius * self.radius

c = Circle(5)
print(c.area())`.trim(),
    answer: 1,
    options: ["25", "10", "5", "에러 발생"],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Counter:
    count = 0

    def add(self):
        self.count += 1

c = Counter()
c.add()
c.add()
print(c.count)`.trim(),
    answer: 3,
    options: ["0", "1", "2", "에러 발생"],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Box:
    def __init__(self, color):
        self.color = color

b = Box("빨강")
b.color = "파랑"
print(b.color)`.trim(),
    answer: 3,
    options: ["빨강", "Box", "파랑", "에러 발생"],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return self.name + ": " + self.sound

a = Animal("강아지", "멍멍")
print(a.speak())`.trim(),
    answer: 4,
    options: ["강아지", "멍멍", "name: sound", "강아지: 멍멍"],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

s1 = Student("지수", 90)
s2 = Student("민호", 80)
print(s1.score + s2.score)`.trim(),
    answer: 1,
    options: ["170", "90", "80", "에러 발생"],
  },
  {
    question: "다음 코드의 실행 결과로 올바른 것을 고르세요.",
    code: `
class Lamp:
    def __init__(self):
        self.on = False

    def toggle(self):
        self.on = not self.on

lamp = Lamp()
lamp.toggle()
lamp.toggle()
lamp.toggle()
print(lamp.on)`.trim(),
    answer: 2,
    options: ["False", "True", "None", "에러 발생"],
  },
];
