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
		<Link href={"/tourOfPython/tuple#indexing"} id="indexing"/>
		<TwoColumn pb={false}>
			<CodeBlock  code={
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
			}/>
			<TwoColumnDes title="1. 자료 읽는 방법" des={
				<>
파이썬 튜플에서 값을 읽는 방법은 마치 영화관 좌석 번호로 자리를 찾는 것과 똑같아서, <Code>movie = ("인터스텔라", 2014, "SF")</Code>라는 튜플이 있을 때 <Code>movie[0]</Code>은 0번 좌석인 "인터스텔라", <Code>movie[1]</Code>은 1번 좌석인 2014, <Code>movie[2]</Code>는 2번 좌석인 "SF"를 가져오는 방식으로 동작해요. 리스트와 마찬가지로 뒤에서부터 읽는 것도 가능해서 <Code>movie[-1]</Code>처럼 음수 인덱스를 사용하면 맨 마지막 값인 "SF"를 가져올 수 있고, 여러 값을 한 번에 잘라서 읽고 싶다면 <Code>movie[0:2]</Code>처럼 슬라이싱을 사용해서 0번부터 1번 좌석까지의 값을 한꺼번에 가져올 수도 있어요. 또한 앞서 보여드린 언패킹 방식처럼 <Code>title, year, genre = movie</Code>라고 쓰면 택배 상자를 열어서 물건을 각각의 선반에 올려놓듯이 튜플의 값들을 각각의 변수에 한 번에 담을 수도 있어요.
				</>}/>
		</TwoColumn>
		<TwoColumn>
			<CodeBlock  code={
`

`
			}/>
			<TwoColumnDes title="읽기" des={
				<>

				</>}/>
		</TwoColumn>
		<TwoColumn>
			<CodeBlock  code={
`

`
			}/>
			<TwoColumnDes title="읽기" des={
				<>

				</>}/>
		</TwoColumn>



			
		</div>
	)
}
