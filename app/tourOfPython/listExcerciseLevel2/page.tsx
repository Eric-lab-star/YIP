
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Title from "@/components/commons/Title";

export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Title>리스트 연습하기 Level 2</Title>

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

interface IQuestion {
	question: string;
	code: string;
	des: string;
}

const questions: IQuestion[] = [
	{
		question: "문제 1. 리스트 만들기",
		des: "좋아하는 과일 3개를 리스트로 만들고, 리스트 전체를 출력하세요.",
		code: `출력: ['사과', '바나나', '딸기']`
	},
	{
		question: "문제 2. 리스트 요소 꺼내기",
		des: "아래 리스트에서 '우유'만 꺼내서 출력하세요. 인덱싱을 사용해야 합니다.",
		code: `cart = ["빵", "우유", "계란", "치즈"]

출력: 우유`
	},
	{
		question: "문제 3. 마지막 요소 꺼내기",
		des: "아래 리스트에서 음수 인덱스를 사용하여 마지막 요소를 출력하세요.",
		code: `nums = [10, 20, 30, 40, 50]

출력: 50`
	},
	{
		question: "문제 4. 요소 추가하기",
		des: "아래 리스트에 '포도'를 맨 뒤에 추가한 후 리스트 전체를 출력하세요. append()를 사용해야 합니다.",
		code: `fruits = ["사과", "바나나"]

출력: ['사과', '바나나', '포도']`
	},
	{
		question: "문제 5. 원하는 위치에 삽입하기",
		des: "아래 리스트의 인덱스 1 위치에 '딸기'를 삽입한 후 리스트 전체를 출력하세요. insert()를 사용해야 합니다.",
		code: `fruits = ["사과", "바나나", "포도"]

출력: ['사과', '딸기', '바나나', '포도']`
	},
	{
		question: "문제 6. 요소 삭제하기",
		des: "아래 리스트에서 '바나나'를 삭제한 후 리스트 전체를 출력하세요. remove()를 사용해야 합니다.",
		code: `fruits = ["사과", "바나나", "딸기", "포도"]

출력: ['사과', '딸기', '포도']`
	},
	{
		question: "문제 7. 리스트 길이 구하기",
		des: "아래 리스트에 몇 개의 요소가 있는지 출력하세요. len()을 사용해야 합니다.",
		code: `students = ["김철수", "이영희", "박민수", "정수아", "홍길동"]

출력: 학생 수: 5명`
	},
	{
		question: "문제 8. 슬라이싱",
		des: "아래 리스트에서 슬라이싱을 사용하여 인덱스 1부터 3까지의 요소를 꺼내서 출력하세요.",
		code: `colors = ["빨강", "주황", "노랑", "초록", "파랑"]

출력: ['주황', '노랑', '초록']`
	},
	{
		question: "문제 9. 리스트 정렬",
		des: "아래 리스트를 오름차순으로 정렬한 후 출력하세요. sort()를 사용해야 합니다.",
		code: `scores = [85, 42, 97, 63, 71]

출력: [42, 63, 71, 85, 97]`
	},
	{
		question: "문제 10. 최댓값, 최솟값 구하기",
		des: "아래 리스트에서 가장 큰 값과 가장 작은 값을 각각 출력하세요. max()와 min()을 사용해야 합니다.",
		code: `temps = [3, -2, 7, 15, 0, -5, 12]

출력:
최고 기온: 15
최저 기온: -5`
	},
	{
		question: "문제 11. 요소 존재 확인",
		des: "사용자로부터 과일 이름을 입력받아, 아래 리스트에 있으면 '있습니다', 없으면 '없습니다'를 출력하세요. in 키워드를 사용해야 합니다.",
		code: `fruits = ["사과", "바나나", "딸기", "포도", "수박"]

입력: 딸기
출력: 딸기는 목록에 있습니다.

입력: 망고
출력: 망고는 목록에 없습니다.`
	},
	{
		question: "문제 12. 리스트 합치기",
		des: "아래 두 리스트를 하나로 합친 후 출력하세요. + 연산자를 사용해야 합니다.",
		code: `front = ["김철수", "이영희"]
back = ["박민수", "정수아"]

출력: ['김철수', '이영희', '박민수', '정수아']`
	},
	{
		question: "문제 13. 리스트와 반복문",
		des: "아래 리스트의 모든 요소를 for문을 사용하여 한 줄에 하나씩 출력하세요.",
		code: `menu = ["짜장면", "짬뽕", "볶음밥", "탕수육"]

출력:
짜장면
짬뽕
볶음밥
탕수육`
	},
	{
		question: "문제 14. 합계와 평균 구하기",
		des: "아래 리스트의 합계와 평균을 구하여 출력하세요. sum()과 len()을 사용해야 합니다.",
		code: `scores = [80, 90, 75, 85, 100]

출력:
합계: 430
평균: 86.0`
	},
	{
		question: "문제 15. 짝수만 골라내기",
		des: "아래 리스트에서 짝수만 골라 새로운 리스트를 만들고 출력하세요. for문과 if문, append()를 사용해야 합니다.",
		code: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

출력: [2, 4, 6, 8, 10]`
	},
]

