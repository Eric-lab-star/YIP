
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Title from "@/components/commons/Title";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";


export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Title>튜플 연습하기 Level 1</Title>
			{
				questions.map((q, i) => (
					<QuizzWithOptions key={i} answer={q.answer} question={`${i + 1}. ${q.question}`}>
						{q.code && <CodeBlock code={q.code} />}
						{q.options.map((option, j) => <Option key={j} value={j + 1}>{option}</Option>)}
					</QuizzWithOptions>
				))
			}

		</div>
	)
}

interface IQuestion {
	question: string;
	answer: number;
	code?: string;
	options: string[];
}

const questions: IQuestion[] = [
	{
		question: "다음 중 튜플을 올바르게 만드는 방법은?",
		answer: 2,
		options: [`a = [1, 2, 3]`, `a = (1, 2, 3)`, `a = {1, 2, 3}`, `a = <1, 2, 3>`]
	},
	{
		question: "다음 중 요소가 하나인 튜플을 올바르게 만드는 방법은?",
		answer: 3,
		options: [`a = (1)`, `a = tuple[1]`, `a = (1,)`, `a = (,1)`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
t = (10, 20, 30, 40, 50)
print(t[2])`.trim(),
		answer: 2,
		options: [`20`, `30`, `40`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
t = (10, 20, 30)
t[0] = 99
print(t)`.trim(),
		answer: 4,
		options: [`(99, 20, 30)`, `(10, 20, 30)`, `(99, 10, 20, 30)`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
t = ("a", "b", "c", "d", "e")
print(t[1:4])`.trim(),
		answer: 2,
		options: [`("a", "b", "c")`, `("b", "c", "d")`, `("b", "c", "d", "e")`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
a, b, c = (10, 20, 30)
print(b)`.trim(),
		answer: 2,
		options: [`10`, `20`, `30`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
t = (1, 2, 3, 2, 4, 2)
print(t.count(2))`.trim(),
		answer: 3,
		options: [`1`, `2`, `3`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
t = (5, 10, 15, 20)
print(type(t))`.trim(),
		answer: 3,
		options: [`<class 'list'>`, `<class 'set'>`, `<class 'tuple'>`, `<class 'dict'>`]
	},
	{
		question: "튜플과 리스트의 가장 큰 차이점은?",
		answer: 1,
		options: [`튜플은 수정이 불가능하다`, `튜플은 인덱싱이 안 된다`, `튜플은 반복문에 사용할 수 없다`, `튜플은 숫자만 저장할 수 있다`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
t1 = (1, 2)
t2 = (3, 4)
print(t1 + t2)`.trim(),
		answer: 1,
		options: [`(1, 2, 3, 4)`, `(4, 6)`, `((1, 2), (3, 4))`, `에러 발생`]
	},
]
