
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Title from "@/components/commons/Title";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";


export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Title>리스트 연습하기 Level 1</Title>
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
		question: "다음 중 빈 리스트를 만드는 올바른 방법은?",
		answer: 1,
		options: [`a = []`, `a = ()`, `a ={}`, `a = list(0)`]
	},
	{
		question: "다음 코드의 출력 결과는? ",
		code: `foods =["사과", "바나나", "딸기"]\nprint(nums[1])`,
		answer: 2,
		options: [`"사과"`, `"바나나"`, `"딸기"`, `"에러 발생"`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `nums =[10, 20, 30, 40, 50]\nprint(nums[-2])`,
		answer: 3,
		options: [`20`, `30`, `40`, `50`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
a = [1,2,3]
a.ppend([4,5])
print(len(a))`.trim(),
		answer: 2,
		options: [`3`, `4`, `5`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
colors = ["빨강", "초록", "파랑", "노랑", "보라"]
print(colors[1:4]) `.trim(),
		answer: 2,
		options: [`["빨강", "초록", "파랑",]`, `["초록", "파랑", "노랑"]`, `["초록", "파랑", "노랑", "보라"]`, `["빨강", "초록", "파랑", "노랑"]`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
a = [3, 1, 4, 1, 5]
a.sort()
print(a)`.trim(),
		answer: 2,
		options: [`[5, 4, 3, 1, 1]`, `[1, 1, 3, 4, 5]`, `[3, 1, 4, 1, 5]`, `에러 발생`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
a = [1, 2, 3]
b = a
b.append(4)
print(a)`.trim(),
		answer: 2,
		options: [`[1, 2, 3]`, `[1, 2, 3, 4]`, `[4]`, `에러 발생`]
	},
	{
		question: "다음 중 리스트에서 요소를 제거하는 방법이 아닌 것은?",
		answer: 4,
		options: [`de a[0]`, `a.remove(값)`, `a.pop()`, `a.delete(0)`]
	},
	{
		question: "다음 코드의 출력 결과는?",
		code: `
a = [1, 2, 3]
b = [4, 5]
print(a + b) `.trim(),
		answer: 1,
		options: [`[1, 2, 3, 4, 5]`, `[5, 7]`, `[[1, 2, 3],[4, 5]]`, `에러발생`]
	},
	{
		question: "리스트에 여러 요소를 한꺼번에 추가하려면 어떤 메서드를 사용해야 할까요?",
		answer: 2,
		options: [`append()`, `extend()`, `insert()`, `add()`]
	},
]
