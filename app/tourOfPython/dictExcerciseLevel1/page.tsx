import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Title from "@/components/commons/Title";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";

export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Title>딕셔너리 연습하기 Level 1</Title>
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
		question: "다음 중 딕셔너리를 올바르게 만드는 방법은?",
		answer: 2,
		options: [
			`d = [1: "a", 2: "b"]`,
			`d = {1: "a", 2: "b"}`,
			`d = (1: "a", 2: "b")`,
			`d = <1: "a", 2: "b">`
		]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"name": "철수", "age": 13}
print(d["name"])`.trim(),
		answer: 1,
		options: [`철수`, `13`, `name`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"x": 10, "y": 20}
d["x"] = 99
print(d["x"])`.trim(),
		answer: 3,
		options: [`10`, `20`, `99`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"a": 1, "b": 2}
print(d["c"])`.trim(),
		answer: 4,
		options: [`None`, `0`, `c`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"a": 1, "b": 2}
print(d.get("c", 0))`.trim(),
		answer: 2,
		options: [`에러 발생`, `0`, `None`, `c`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"name": "영희", "score": 100}
print(list(d.keys()))`.trim(),
		answer: 1,
		options: [
			`['name', 'score']`,
			`['영희', 100]`,
			`[('name', '영희'), ('score', 100)]`,
			`에러 발생`
		]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"a": 1, "b": 2, "c": 3}
del d["b"]
print(len(d))`.trim(),
		answer: 2,
		options: [`1`, `2`, `3`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"apple": 3, "banana": 5}
print("banana" in d)`.trim(),
		answer: 2,
		options: [`False`, `True`, `5`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"a": 1, "b": 2}
d["c"] = 3
print(len(d))`.trim(),
		answer: 3,
		options: [`1`, `2`, `3`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
d = {"x": 10, "y": 20, "z": 30}
total = 0
for v in d.values():
    total += v
print(total)`.trim(),
		answer: 4,
		options: [`10`, `20`, `30`, `60`]
	},
]
