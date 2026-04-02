
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Title from "@/components/commons/Title";


export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Title>튜플 연습하기 Level 2</Title>
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
		question: "문제 1. 튜플 만들기",
		des: "좋아하는 색깔 3개를 튜플로 만들고, 튜플 전체를 출력하세요.",
		code: `출력: ('빨강', '파랑', '초록')`
	},
	{
		question: "문제 2. 요소가 하나인 튜플 만들기",
		des: "숫자 42 하나만 들어있는 튜플을 만들고, type()으로 타입을 확인하여 출력하세요. 주의: 요소가 하나일 때 쉼표를 빼면 튜플이 아닙니다!",
		code: `출력:
(42,)
<class 'tuple'>`
	},
	{
		question: "문제 3. 튜플 요소 꺼내기",
		des: "아래 튜플에서 '바나나'만 꺼내서 출력하세요. 인덱싱을 사용해야 합니다.",
		code: `fruits = ("사과", "바나나", "딸기", "포도")

출력: 바나나`
	},
	{
		question: "문제 4. 음수 인덱스 사용하기",
		des: "아래 튜플에서 음수 인덱스를 사용하여 마지막 요소를 출력하세요.",
		code: `nums = (10, 20, 30, 40, 50)

출력: 50`
	},
	{
		question: "문제 5. 튜플 슬라이싱",
		des: "아래 튜플에서 슬라이싱을 사용하여 인덱스 1부터 3까지의 요소를 꺼내서 출력하세요.",
		code: `days = ("월", "화", "수", "목", "금")

출력: ('화', '수', '목')`
	},
	{
		question: "문제 6. 튜플 길이 구하기",
		des: "아래 튜플에 몇 개의 요소가 있는지 출력하세요. len()을 사용해야 합니다.",
		code: `animals = ("강아지", "고양이", "토끼", "햄스터", "앵무새", "거북이")

출력: 동물 수: 6마리`
	},
	{
		question: "문제 7. 튜플 언패킹",
		des: "아래 튜플의 값을 각각 name, age, city 변수에 언패킹하여 저장한 후 출력하세요.",
		code: `info = ("김철수", 15, "대전")

출력:
이름: 김철수
나이: 15
도시: 대전`
	},
	{
		question: "문제 8. 튜플에서 특정 값 개수 세기",
		des: "아래 튜플에서 숫자 3이 몇 번 등장하는지 출력하세요. count()를 사용해야 합니다.",
		code: `nums = (1, 3, 2, 3, 4, 3, 5)

출력: 3의 개수: 3개`
	},
	{
		question: "문제 9. 튜플에서 값의 위치 찾기",
		des: "아래 튜플에서 '수박'이 몇 번째 인덱스에 있는지 출력하세요. index()를 사용해야 합니다.",
		code: `fruits = ("사과", "바나나", "수박", "포도", "딸기")

출력: 수박의 위치: 2`
	},
	{
		question: "문제 10. 튜플 합치기",
		des: "아래 두 튜플을 하나로 합쳐서 출력하세요. + 연산자를 사용해야 합니다.",
		code: `front = ("국어", "영어")
back = ("수학", "과학")

출력: ('국어', '영어', '수학', '과학')`
	},
	{
		question: "문제 11. 요소 존재 확인",
		des: "사용자로부터 요일을 입력받아, 아래 튜플에 있으면 '평일입니다', 없으면 '평일이 아닙니다'를 출력하세요. in 키워드를 사용해야 합니다.",
		code: `weekdays = ("월", "화", "수", "목", "금")

입력: 수
출력: 수요일은 평일입니다.

입력: 토
출력: 토요일은 평일이 아닙니다.`
	},
	{
		question: "문제 12. 튜플과 반복문",
		des: "아래 튜플의 모든 요소를 for문을 사용하여 번호와 함께 한 줄에 하나씩 출력하세요.",
		code: `menu = ("아메리카노", "카페라떼", "녹차", "스무디")

출력:
1. 아메리카노
2. 카페라떼
3. 녹차
4. 스무디`
	},
	{
		question: "문제 13. 튜플의 최댓값, 최솟값",
		des: "아래 튜플에서 가장 큰 값과 가장 작은 값을 각각 출력하세요. max()와 min()을 사용해야 합니다.",
		code: `scores = (72, 85, 91, 68, 77)

출력:
최고 점수: 91
최저 점수: 68`
	},
	{
		question: "문제 14. 튜플을 리스트로 변환하기",
		des: "아래 튜플을 리스트로 변환한 후 '포도'를 추가하고, 다시 튜플로 변환하여 출력하세요. list()와 tuple()을 사용해야 합니다.",
		code: `fruits = ("사과", "바나나", "딸기")

출력: ('사과', '바나나', '딸기', '포도')`
	},
	{
		question: "문제 15. 학생 정보 튜플 활용",
		des: "아래 학생 정보 튜플들이 리스트에 담겨 있습니다. for문을 사용하여 각 학생의 이름과 점수를 출력하고, 점수가 80점 이상이면 '합격', 미만이면 '불합격'을 함께 표시하세요.",
		code: `students = [
    ("김철수", 85),
    ("이영희", 72),
    ("박민수", 91),
    ("정수아", 68)
]

출력:
김철수 - 85점 - 합격
이영희 - 72점 - 불합격
박민수 - 91점 - 합격
정수아 - 68점 - 불합격`
	},
]
