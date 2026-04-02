import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Title from "@/components/commons/Title";

export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Title>딕셔너리 연습하기 Level 2</Title>
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
		question: "문제 1. 딕셔너리 만들기",
		des: "자신의 이름, 나이, 도시를 담은 딕셔너리를 만들고 전체를 출력하세요.",
		code: `출력: {'name': '김철수', 'age': 15, 'city': '대전'}`
	},
	{
		question: "문제 2. 값 꺼내기",
		des: "아래 딕셔너리에서 'apple'의 값만 꺼내서 출력하세요. 키를 사용하여 접근해야 합니다.",
		code: `fruits = {"apple": 3, "banana": 5, "grape": 8}

출력: 3`
	},
	{
		question: "문제 3. 값 수정하기",
		des: "아래 딕셔너리에서 'score'의 값을 95로 수정한 후 딕셔너리 전체를 출력하세요.",
		code: `student = {"name": "이영희", "score": 80}

출력: {'name': '이영희', 'score': 95}`
	},
	{
		question: "문제 4. 새 항목 추가하기",
		des: "아래 딕셔너리에 'email' 키와 값 'kim@test.com'을 추가한 후 전체를 출력하세요.",
		code: `user = {"name": "김철수", "age": 15}

출력: {'name': '김철수', 'age': 15, 'email': 'kim@test.com'}`
	},
	{
		question: "문제 5. 안전하게 값 꺼내기",
		des: "아래 딕셔너리에서 'score' 키의 값을 get()으로 꺼내세요. 키가 없으면 0을 반환하도록 기본값을 설정하세요.",
		code: `d = {"name": "박민수"}

출력: 0`
	},
	{
		question: "문제 6. 키 목록 출력하기",
		des: "아래 딕셔너리의 모든 키를 리스트로 변환하여 출력하세요. keys()를 사용해야 합니다.",
		code: `menu = {"아메리카노": 4000, "카페라떼": 4500, "녹차": 3500}

출력: ['아메리카노', '카페라떼', '녹차']`
	},
	{
		question: "문제 7. 값 목록 출력하기",
		des: "아래 딕셔너리의 모든 값을 리스트로 변환하여 출력하세요. values()를 사용해야 합니다.",
		code: `scores = {"국어": 85, "영어": 92, "수학": 78}

출력: [85, 92, 78]`
	},
	{
		question: "문제 8. 항목 삭제하기",
		des: "아래 딕셔너리에서 'banana' 항목을 삭제한 후 딕셔너리 전체를 출력하세요. del을 사용해야 합니다.",
		code: `fruits = {"apple": 3, "banana": 5, "grape": 8}

출력: {'apple': 3, 'grape': 8}`
	},
	{
		question: "문제 9. 키 존재 확인하기",
		des: "사용자로부터 과목명을 입력받아, 아래 딕셔너리에 있으면 점수를 출력하고 없으면 '없는 과목입니다.'를 출력하세요. in 키워드를 사용해야 합니다.",
		code: `scores = {"국어": 85, "영어": 92, "수학": 78}

입력: 영어
출력: 영어 점수: 92점

입력: 체육
출력: 없는 과목입니다.`
	},
	{
		question: "문제 10. 딕셔너리 반복하기",
		des: "아래 딕셔너리를 for문과 items()를 사용하여 키와 값을 함께 한 줄씩 출력하세요.",
		code: `menu = {"아메리카노": 4000, "카페라떼": 4500, "녹차": 3500}

출력:
아메리카노 : 4000원
카페라떼 : 4500원
녹차 : 3500원`
	},
	{
		question: "문제 11. pop()으로 항목 꺼내기",
		des: "아래 딕셔너리에서 pop()을 사용하여 'age' 항목을 꺼낸 후, 꺼낸 값과 남은 딕셔너리를 출력하세요.",
		code: `person = {"name": "정수아", "age": 15, "city": "서울"}

출력:
꺼낸 값: 15
남은 딕셔너리: {'name': '정수아', 'city': '서울'}`
	},
	{
		question: "문제 12. 딕셔너리 합치기",
		des: "아래 두 딕셔너리를 update()를 사용하여 하나로 합친 후 전체를 출력하세요.",
		code: `info1 = {"name": "김철수", "age": 15}
info2 = {"city": "대전", "score": 88}

출력: {'name': '김철수', 'age': 15, 'city': '대전', 'score': 88}`
	},
	{
		question: "문제 13. 값의 합계 구하기",
		des: "아래 딕셔너리의 모든 점수의 합계와 평균을 구하여 출력하세요. values()를 사용해야 합니다.",
		code: `scores = {"국어": 85, "영어": 92, "수학": 78, "과학": 88}

출력:
총점: 343점
평균: 85.75점`
	},
	{
		question: "문제 14. 딕셔너리 길이 구하기",
		des: "사용자로부터 단어와 뜻을 3번 입력받아 딕셔너리에 저장하고, 저장된 단어 수를 출력하세요. len()을 사용해야 합니다.",
		code: `입력:
apple 사과
banana 바나나
grape 포도

출력:
{'apple': '사과', 'banana': '바나나', 'grape': '포도'}
저장된 단어 수: 3개`
	},
	{
		question: "문제 15. 딕셔너리 활용 성적표",
		des: "아래 학생 성적 딕셔너리 리스트를 for문과 items()를 활용하여 각 학생의 과목별 점수와 평균을 출력하세요.",
		code: `students = [
    {"name": "김철수", "scores": {"국어": 85, "영어": 90, "수학": 80}},
    {"name": "이영희", "scores": {"국어": 78, "영어": 88, "수학": 95}},
]

출력:
김철수
  국어: 85점
  영어: 90점
  수학: 80점
  평균: 85.0점

이영희
  국어: 78점
  영어: 88점
  수학: 95점
  평균: 87.0점`
	},
]
