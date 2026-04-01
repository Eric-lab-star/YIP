import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Title from "@/components/commons/Title";

export default function() {
	return (
		<div className="select-none p-5 mb-100">
			<Title>조건문과 타입 Level 2</Title>
			{questions.map((q, i) => (
				<div key={i}>
					<Title my="m" size="h2">{q.question}</Title>
					<Title my="m" size="h3" weight="semi">{q.des}</Title>
					<CodeBlock code={q.code} />
					<HorizontalLine />
				</div>
			))}
		</div>
	)
}

const questions = [
	{
		question: "문제 1. 양수, 음수, 0 판별기",
		des: "사용자로부터 숫자를 입력받아, 그 숫자가 양수인지, 음수인지, 0인지 출력하는 프로그램을 작성하세요.",
		code: `입력: -5
출력: 음수입니다.`
	},
	{
		question: "문제 2. 학점 계산기",
		des: "점수를 입력받아 아래 기준에 맞게 학점을 출력하세요.",
		code: `
90점 이상 → A
80점 이상 → B
70점 이상 → C
60점 이상 → D
60점 미만 → F

입력: 85
출력: B학점입니다. `
	},
	{
		question: "문제 3. 홀짝 판별기",
		des: "숫자를 입력받아 짝수인지 홀수인지 출력하세요. 단, % 연산자를 사용해야 합니다.",
		code: `입력: 7
출력: 홀수입니다.`
	},
	{
		question: "문제 4. 로그인 시스템",
		des: "아래 조건을 만족하는 간단한 로그인 프로그램을 작성하세요.",
		code: `정답 아이디: "python"
정답 비밀번호: "1234"

아이디와 비밀번호가 모두 맞으면 → "로그인 성공"
아이디는 맞지만 비밀번호가 틀리면 → "비밀번호가 틀렸습니다."
아이디가 틀리면 → "존재하지 않는 아이디입니다."`
	},

]
