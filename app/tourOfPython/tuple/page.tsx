import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import TwoColumnDes from "@/components/commons/TwoColumnDes";
import Link from "next/link";

export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Link href="/tourOfPython/tuple#title" id="title">
				<Title my="m" size="h1"> 튜플 tuple </Title>
			</Link>
			<Text>
				C++나 Java에서는 여러 값을 묶어서 저장하려면 별도의 클래스나 구조체를 직접 만들어야 해서, 예를 들어 학생의 이름과 나이를 하나로 묶으려면 <Code>Student</Code> 클래스를 정의하고 생성자까지 작성해야 하는 번거로움이 있어요. 반면 파이썬의 튜플은 <Code>student = ("Alice", 15, 95.5)</Code>처럼 클래스 정의 없이 괄호 하나로 여러 값을 즉시 묶을 수 있는데, 마치 택배 상자에 물건을 넣고 테이프로 봉인하는 것과 같아서 한 번 포장하면 안의 내용물을 바꿀 수 없어요. 이 "수정 불가"라는 특성이 튜플의 핵심인데, C++의 <Code>const</Code>나 Java의 <Code>final</Code>처럼 값을 보호하는 역할을 하지만, 튜플은 별도의 키워드 없이 괄호만으로 그 불변성이 자동으로 적용된다는 점에서 훨씬 간결하고, 덕분에 파이썬은 튜플로 묶인 데이터가 절대 변하지 않는다는 것을 보장할 수 있어요.
			</Text>
			<CodeBlock code={
				`
# 파이썬 튜플 - 괄호만으로 즉시 생성, 수정 불가
student = ("Alice", 15, 95.5)
print(student[0])  # Alice
print(student[1])  # 15

# 튜플은 수정하려고 하면 오류 발생 (봉인된 택배 상자)
# student[0] = "Bob"  # TypeError: 'tuple' object does not support item assignment

# 여러 변수에 한 번에 언패킹도 가능
name, age, score = student
print(name)   # Alice
print(age)    # 15
print(score)  # 95.5
`
			} />

			<Title size="h2" my="l"> 튜플의 특징</Title>
			<Link href={"/tourOfPython/tuple#indexing"} id="indexing" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
movie = ("인터스텔라", 2014, "SF")

# 인덱스로 값 읽기 (0번부터 시작)
print(movie[0])   # 인터스텔라
print(movie[1])   # 2014
print(movie[2])   # SF

# 음수 인덱스로 뒤에서부터 읽기
print(movie[-1])  # SF  ← 맨 마지막 값
print(movie[-2])  # 2014 ← 뒤에서 두 번째 값

# 슬라이싱으로 여러 값 한 번에 읽기
print(movie[0:2]) # ('인터스텔라', 2014) ← 0번~1번까지

# 언패킹으로 각 변수에 담기
title, year, genre = movie
print(title)  # 인터스텔라
print(year)   # 2014
print(genre)  # SF
`
				} />
				<TwoColumnDes title="1. 자료 읽는 방법" des={
					<>
						파이썬 튜플에서 값을 읽는 방법은 마치 영화관 좌석 번호로 자리를 찾는 것과 똑같아서, <Code>movie = ("인터스텔라", 2014, "SF")</Code>라는 튜플이 있을 때 <Code>movie[0]</Code>은 0번 좌석인 "인터스텔라", <Code>movie[1]</Code>은 1번 좌석인 2014, <Code>movie[2]</Code>는 2번 좌석인 "SF"를 가져오는 방식으로 동작해요. 리스트와 마찬가지로 뒤에서부터 읽는 것도 가능해서 <Code>movie[-1]</Code>처럼 음수 인덱스를 사용하면 맨 마지막 값인 "SF"를 가져올 수 있고, 여러 값을 한 번에 잘라서 읽고 싶다면 <Code>movie[0:2]</Code>처럼 슬라이싱을 사용해서 0번부터 1번 좌석까지의 값을 한꺼번에 가져올 수도 있어요. 또한 앞서 보여드린 언패킹 방식처럼 <Code>title, year, genre = movie</Code>라고 쓰면 택배 상자를 열어서 물건을 각각의 선반에 올려놓듯이 튜플의 값들을 각각의 변수에 한 번에 담을 수도 있어요.
					</>} />
			</TwoColumn>

			<Link href={"/tourOfPython/tuple#plus"} id="plus" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
tuple1 = ("사과", "바나나")
tuple2 = ("딸기", "포도")

# 두 튜플 더하기
result = tuple1 + tuple2
print(result)   # ('사과', '바나나', '딸기', '포도')

# 기존 튜플은 변하지 않음
print(tuple1)   # ('사과', '바나나') ← 그대로 유지
print(tuple2)   # ('딸기', '포도')  ← 그대로 유지

# 튜플과 리스트는 더하기 불가
# tuple1 + ["수박"]  # TypeError 발생
`
				} />
				<TwoColumnDes title="2. 더하기" des={
					<>
						파이썬 튜플의 더하기 연산은 마치 두 개의 봉인된 택배 상자를 하나의 더 큰 새 상자에 합쳐서 다시 봉인하는 것과 같아서, <Code>tuple1 = ("사과", "바나나")</Code>와 <Code>tuple2 = ("딸기", "포도")</Code>가 있을 때 <Code>tuple1 + tuple2</Code>를 하면 <Code>("사과", "바나나", "딸기", "포도")</Code>라는 새로운 튜플이 만들어져요. 여기서 중요한 점은 원래의 두 상자는 그대로 유지되고 새로운 상자가 만들어지는 것처럼, 기존의 <Code>tuple1</Code>과 <Code>tuple2</Code>는 전혀 변하지 않고 결합된 결과만 새로운 튜플로 반환된다는 거예요. 단, 더하기 연산은 반드시 튜플끼리만 가능해서 <Code>("사과",) + ["바나나"]</Code>처럼 튜플과 리스트를 더하려고 하면 서로 다른 종류의 상자라 합칠 수 없다는 오류가 발생하니 주의해야 해요.
					</>} />
			</TwoColumn>

			<Link href={"/tourOfPython/tuple#repeat"} id="repeat" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
stamp = ("안녕", "반가워")

# 튜플 곱하기
result = stamp * 3
print(result)   # ('안녕', '반가워', '안녕', '반가워', '안녕', '반가워')

# 기존 튜플은 변하지 않음
print(stamp)    # ('안녕', '반가워') ← 그대로 유지

# 0을 곱하면 빈 튜플 반환
print(stamp * 0)   # ()

# 음수를 곱해도 빈 튜플 반환
print(stamp * -1)  # ()
`
				} />
				<TwoColumnDes title="3. 곱하기" des={
					<>
						파이썬 튜플의 곱하기 연산은 마치 도장을 여러 번 찍는 것과 같아서, <Code>stamp = ("안녕", "반가워")</Code>라는 튜플에 <Code>stamp * 3</Code>을 하면 같은 내용을 3번 찍은 것처럼 <Code>("안녕", "반가워", "안녕", "반가워", "안녕", "반가워")</Code>라는 새로운 튜플이 만들어져요. 더하기 연산과 마찬가지로 원본 튜플은 전혀 변하지 않고 새로운 튜플이 반환되는데, 이는 봉인된 도장 자체는 그대로 있고 찍힌 결과물만 새롭게 생성되는 것과 같아요. 주의할 점은 <Code>stamp * 0</Code>처럼 0을 곱하면 아무것도 찍히지 않은 것과 같아서 빈 튜플인 <Code>()</Code>가 반환되고, <Code>stamp * -1</Code>처럼 음수를 곱해도 동일하게 빈 튜플이 반환되니 참고해야 해요.
					</>} />
			</TwoColumn>

			<Link href={"/tourOfPython/tuple#len"} id="len" />
			<TwoColumn>
				<CodeBlock code={
					`
drawer = ("양말", "속옷", "티셔츠", "바지")

# 튜플의 길이 구하기
print(len(drawer))  # 4

# 빈 튜플의 길이
empty = ()
print(len(empty))   # 0

# 중첩 튜플의 길이 - 바깥쪽 칸 수만 셈
nested = ((1, 2), (3, 4), (5, 6))
print(len(nested))        # 3  ← 안쪽은 세지 않음
print(len(nested[0]))     # 2  ← 안쪽 튜플의 길이를 따로 구할 수 있음
`
				} />
				<TwoColumnDes title="4. 길이 구하기" des={
					<>
						파이썬에서 튜플의 길이를 구하는 방법은 마치 서랍장에 몇 칸이 있는지 세는 것과 같아서, <Code>drawer = ("양말", "속옷", "티셔츠", "바지")</Code>라는 튜플이 있을 때 <Code>len(drawer)</Code>를 사용하면 서랍장의 칸 수를 세어주듯이 튜플 안에 담긴 값의 개수인 <Code>4</Code>를 반환해줘요. 여기서 <Code>len()</Code>은 파이썬이 기본으로 제공하는 함수로, 튜플뿐만 아니라 리스트나 문자열에도 똑같이 사용할 수 있는 만능 자 같은 존재예요. 한 가지 주의할 점은 튜플 안에 튜플이 중첩되어 있을 때, 예를 들어 <Code>nested = ((1, 2), (3, 4), (5, 6))</Code>처럼 서랍장 안에 또 작은 서랍장이 들어있는 경우에는 안쪽 서랍장의 칸 수는 세지 않고 바깥쪽 서랍장의 칸 수인 <Code>3</Code>만 반환한다는 점을 기억해야 해요.
					</>} />
			</TwoColumn>
		</div>
	)
}
