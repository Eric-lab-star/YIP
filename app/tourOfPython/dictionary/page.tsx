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
			<Link href="/tourOfPython/dictionary#title" id="title">
				<Title my="m" size="h1"> 딕셔너리 dictionary </Title>
			</Link>
			<Text>
				파이썬의 딕셔너리는 마치 실제 사전과 똑같은 구조로 동작하는데, 실제 사전에서 "사과"라는 단어를 찾으면 "apple"이라는 뜻이 나오듯이 딕셔너리도 <Code>{`{"사과: "apple", "바나나": "banana"}`}</Code>처럼 모든 값이 키(key)와 값(value)의 쌍으로 이루어져 있어요. 리스트나 튜플은 <Code>fruits[0]</Code>처럼 숫자 번호로 값을 찾아야 하지만, 딕셔너리는 <Code>fruits["사과"]</Code>처럼 의미 있는 단어로 값을 바로 찾을 수 있어서 훨씬 직관적이고, 마치 전화번호부에서 번호 순서로 찾는 것이 아니라 이름으로 바로 찾는 것과 같아요. 딕셔너리의 키는 중복될 수 없어서 사전에 같은 단어가 두 번 나올 수 없는 것처럼 <Code>{`{"사과": "apple", "사과": "과일"}`}</Code>이라고 작성하면 나중에 작성한 값인 "과일"만 남게 되고, 값은 문자열뿐만 아니라 숫자, 리스트, 심지어 또 다른 딕셔너리까지 무엇이든 담을 수 있어요.
			</Text>
			<Link id="create" href="/tourOfPython/dictionary#create" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
# 방법 1 - 중괄호로 바로 생성
person1 = {"이름": "Alice", "나이": 15, "성적": 95.5}
print(person1)  # {'이름': 'Alice', '나이': 15, '성적': 95.5}

# 방법 2 - 빈 딕셔너리 후 하나씩 추가
person2 = {}
person2["이름"] = "Bob"
person2["나이"] = 16
person2["성적"] = 88.0
print(person2)  # {'이름': 'Bob', '나이': 16, '성적': 88.0}

# 방법 3 - dict() 함수로 생성
person3 = dict(이름="Charlie", 나이=17, 성적=92.0)
print(person3)  # {'이름': 'Charlie', '나이': 17, '성적': 92.0}

# dict() 함수로 빈 딕셔너리 생성
empty = dict()
print(empty)    # {}
					`} />
				<TwoColumnDes title="1. 만들기" des={
					<>
						파이썬에서 딕셔너리를 만드는 방법은 크게 세 가지가 있는데, 첫 번째는 가장 흔하게 사용하는 방법으로 마치 명함을 직접 손으로 작성하듯이 중괄호 안에 <Code>person = {`{"이름": "Alice", "나이": 15}`}</Code>처럼 키와 값을 콜론으로 연결해서 바로 작성하는 방법이고, 두 번째는 빈 명함을 먼저 만들어 놓고 나중에 내용을 채우듯이 <Code>{`person = {}`}</Code>로 빈 딕셔너리를 먼저 만든 다음 <Code>person["이름"] = "Alice"</Code>처럼 하나씩 추가하는 방법이에요. 세 번째는 <Code>dict()</Code>라는 파이썬 내장 함수를 사용하는 방법으로 <Code>person = dict(이름="Alice", 나이=15)</Code>처럼 작성할 수 있는데, 이 방법은 콜론과 따옴표 없이 좀 더 간결하게 작성할 수 있지만 키 이름에 공백이나 특수문자를 사용할 수 없다는 제한이 있어요.
					</>} />
			</TwoColumn>

			<Link id="add" href="/tourOfPython/dictionary#add" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
person = {"이름": "Alice", "나이": 15}

# 방법 1 - 대괄호로 하나씩 추가
person["전화번호"] = "010-1234-5678"
person["주소"] = "서울시"
print(person)  # {'이름': 'Alice', '나이': 15, '전화번호': '010-1234-5678', '주소': '서울시'}

# 방법 2 - update()로 여러 개 한 번에 추가
person.update({"학교": "파이썬중학교", "성적": 95.5})
print(person)  # {'이름': 'Alice', '나이': 15, '전화번호': '010-1234-5678', '주소': '서울시', '학교': '파이썬중학교', '성적': 95.5}

# 이미 존재하는 키는 값이 덮어씌워짐
person["나이"] = 16
print(person["나이"])  # 16 ← 기존 15에서 16으로 변경됨
				`} />
				<TwoColumnDes title="2. 추가하기" des={
					<>
						파이썬 딕셔너리에 새로운 항목을 추가하는 방법은 크게 두 가지가 있는데, 첫 번째는 마치 기존 명함에 새로운 정보를 펜으로 직접 써넣듯이 <Code>{`person["전화번호"] = "010-1234-5678"`}</Code>처럼 딕셔너리에 없던 새로운 키를 대괄호 안에 작성하고 값을 할당하면 자동으로 추가되는 방법이고, 두 번째는 <Code>update()</Code> 함수를 사용하는 방법으로 마치 두 개의 명함에 적힌 정보를 하나의 명함으로 합치듯이 <Code>{`person.update({"전화번호": "010-1234-5678", "주소": "서울시"})`}</Code>처럼 여러 개의 키와 값을 한 번에 추가할 수 있어요. 여기서 주의할 점은 두 방법 모두 이미 존재하는 키를 사용하면 추가가 아니라 기존 값이 덮어씌워지는데, 이는 명함에 이미 적혀있는 전화번호 위에 새 번호를 덮어 쓰는 것과 같아서 기존 값이 사라지니 항상 키가 이미 존재하는지 확인하는 습관을 가지는 것이 좋아요.
					</>} />
			</TwoColumn>


			<Link id="delete" href="/tourOfPython/dictionary#delete" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
person = {"이름": "Alice", "나이": 15, "전화번호": "010-1234-5678", "주소": "서울시"}

# 방법 1 - del 키워드로 삭제
del person["전화번호"]
print(person)  # {'이름': 'Alice', '나이': 15, '주소': '서울시'}

# 방법 2 - pop()으로 삭제하면서 값 반환
deleted_age = person.pop("나이")
print(deleted_age)  # 15 ← 삭제된 값이 반환됨
print(person)       # {'이름': 'Alice', '주소': '서울시'}

# pop()에 기본값 지정 - 없는 키도 오류 없이 처리
result = person.pop("없는키", "존재하지 않는 키")
print(result)  # 존재하지 않는 키

# 방법 3 - clear()로 전체 삭제
person.clear()
print(person)  # {} ← 빈 딕셔너리
				`} />
				<TwoColumnDes title="3. 삭제하기" des={
					<>
						파이썬 딕셔너리에서 값을 삭제하는 방법은 크게 세 가지가 있는데, 첫 번째는 마치 명함에서 필요 없는 정보를 지우개로 지우듯이 <Code>del person["전화번호"]</Code>처럼 <Code>del</Code> 키워드를 사용해서 특정 키와 값을 삭제하는 방법이고, 두 번째는 <Code>pop()</Code> 함수를 사용하는 방법으로 <Code>person.pop("나이")</Code>처럼 작성하면 해당 키와 값을 삭제하면서 동시에 삭제된 값을 반환해주는데, 이는 서랍에서 물건을 꺼내면서 꺼낸 물건이 손에 쥐어지는 것과 같아서 삭제한 값을 나중에 활용할 수 있어요. 세 번째는 <Code>clear()</Code> 함수를 사용하는 방법으로 <Code>person.clear()</Code>처럼 작성하면 명함의 모든 내용을 한 번에 지워서 빈 명함으로 만드는 것처럼 딕셔너리의 모든 키와 값을 한 번에 삭제할 수 있는데, <Code>del</Code> 키워드로 없는 키를 삭제하려고 하면 오류가 발생하지만 <Code>pop()</Code> 함수는 <Code>person.pop("없는키", "기본값")</Code>처럼 두 번째 인자로 기본값을 지정하면 오류 없이 기본값을 반환해줘서 더 안전하게 사용할 수 있어요
					</>} />
			</TwoColumn>

			<Title size="h2">딕셔너리 메소드</Title>

			<Link id="keys" href="/tourOfPython/dictionary#keys" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
person = {"이름": "Alice", "나이": 15, "학교": "파이썬중학교"}

# keys()로 키 목록 가져오기
print(person.keys())        # dict_keys(['이름', '나이', '학교'])

# 리스트로 변환하기
keys_list = list(person.keys())
print(keys_list)            # ['이름', '나이', '학교']

# 반복문과 함께 사용하기
for key in person.keys():
    print(key)              # 이름, 나이, 학교 순서로 출력

# 특정 키가 존재하는지 확인하기
print("이름" in person.keys())   # True
print("전화번호" in person.keys()) # False
				`} />
				<TwoColumnDes title="1. keys()" des={
					<>
						파이썬 딕셔너리의 <Code>keys()</Code>는 마치 서랍장에 붙어있는 라벨들만 모아서 보여주는 것과 같아서, <Code>person = {`{"이름": "Alice", "나이": 15, "학교": "파이썬중학교"}`}</Code>라는 딕셔너리에서 <Code>person.keys()</Code>를 호출하면 값은 제외하고 라벨에 해당하는 키들만 모은 <Code>{`dict_keys(["이름", "나이", "학교"])`}</Code>를 반환해줘요. 반환된 결과가 리스트처럼 생겼지만 <Code>dict_keys</Code>라는 별도의 타입이기 때문에, 리스트처럼 사용하고 싶다면 <Code>{`list(person.keys())`}</Code>처럼 <Code>list()</Code>로 감싸서 변환해야 하고, <Code>keys()</Code>는 주로 딕셔너리의 모든 키를 하나씩 살펴볼 때 <Code>{`for key in person.keys()`}</Code>처럼 반복문과 함께 사용하거나 특정 키가 딕셔너리에 존재하는지 확인할 때 <Code>{`"이름" in person.keys()`}</Code>처럼 활용하는 경우가 많아요.
					</>} />
			</TwoColumn>

			<Link id="values" href="/tourOfPython/dictionary#values" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
scores = {"수학": 90, "영어": 85, "과학": 92}

# values()로 값만 가져오기
print(scores.values())        # dict_values([90, 85, 92])

# 리스트로 변환
print(list(scores.values()))  # [90, 85, 92]

# for문으로 값 하나씩 출력
for score in scores.values():
    print(score)  # 90, 85, 92 순서대로 출력

# 딕셔너리 값이 변경되면 자동으로 반영됨
scores["수학"] = 100
print(list(scores.values()))  # [100, 85, 92] ← 수학 점수가 바뀜

# 합계와 평균 구하기
total = sum(scores.values())
average = total / len(scores)
print(total)    # 277
print(average)  # 92.33...
				`} />
				<TwoColumnDes title="2. values()" des={
					<>
						파이썬 딕셔너리의 <Code>values()</Code>는 마치 학교 성적표에서 과목 이름은 제외하고 점수만 쭉 뽑아보는 것과 같아서, <Code>scores = {`{"수학": 90, "영어": 85, "과학": 92}`}</Code>라는 딕셔너리에서 <Code>scores.values()</Code>를 호출하면 키인 "수학", "영어", "과학"은 제외하고 값인 <Code>90, 85, 92</Code>만 모아서 반환해줘요. 반환되는 결과는 리스트처럼 보이지만 실제로는 <Code>dict_values([90, 85, 92])</Code>라는 특별한 형태로 반환되는데, 이를 리스트로 변환하고 싶다면 <Code>list(scores.values())</Code>처럼 <Code>list()</Code>로 감싸주면 되고, 딕셔너리의 값이 변경되면 <Code>values()</Code>의 결과도 자동으로 함께 업데이트되는 특징이 있어서 항상 최신 값을 반영해줘요. 또한 <Code>for</Code>문과 함께 사용하면 성적표의 점수를 하나씩 꺼내보듯이 딕셔너리의 모든 값을 순서대로 처리할 수 있어서 합계나 평균을 구할 때 유용하게 활용할 수 있어요.
					</>} />
			</TwoColumn>
			<Link id="items" href="/tourOfPython/dictionary#items" />

			<TwoColumn pb={false}>
				<CodeBlock code={
					`
scores = {"수학": 90, "영어": 85, "과학": 92}

# items()로 키와 값을 쌍으로 가져오기
print(scores.items())        # dict_items([('수학', 90), ('영어', 85), ('과학', 92)])

# 리스트로 변환
print(list(scores.items()))  # [('수학', 90), ('영어', 85), ('과학', 92)]

# for문으로 키와 값을 동시에 사용하기
for subject, score in scores.items():
    print(subject, ":", score)
# 수학 : 90
# 영어 : 85
# 과학 : 92

# 딕셔너리 값이 변경되면 자동으로 반영됨
scores["수학"] = 100
print(list(scores.items()))  # [('수학', 100), ('영어', 85), ('과학', 92)] ← 수학 점수가 바뀜

# 활용 예시 - 90점 이상인 과목만 출력
for subject, score in scores.items():
    if score >= 90:
        print(subject)  # 수학, 과학
				`} />
				<TwoColumnDes title="3. items()" des={
					<>
						파이썬 딕셔너리의 <Code>items()</Code>는 마치 성적표에서 과목 이름과 점수를 한 쌍으로 묶어서 보여주는 것과 같아서, <Code>scores = {`{"수학": 90, "영어": 85, "과학": 92}`}</Code>라는 딕셔너리에서 <Code>scores.items()</Code>를 호출하면 <Code>dict_items([("수학", 90), ("영어", 85), ("과학", 92)])</Code>처럼 키와 값이 튜플로 묶인 형태로 반환되는데, 앞서 배운 <Code>values()</Code>가 점수만 뽑아오는 것과 달리 <Code>items()</Code>는 과목 이름과 점수를 항상 함께 가져온다는 점이 가장 큰 차이점이에요. 이 <Code>items()</Code>가 가장 빛을 발하는 순간은 <Code>for</Code>문과 함께 사용할 때인데, <Code>for subject, score in scores.items()</Code>처럼 언패킹을 활용하면 성적표를 한 줄씩 읽으면서 과목 이름과 점수를 동시에 사용할 수 있어서, 키만 사용하는 <Code>keys()</Code>나 값만 사용하는 <Code>values()</Code>보다 실제 코딩에서 훨씬 자주 활용되는 유용한 함수예요.
					</>} />
			</TwoColumn>
			<Link id="clear" href="/tourOfPython/dictionary#clear" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
person = {"이름": "Alice", "나이": 15, "성적": 95.5}

# clear()로 딕셔너리 내용 모두 삭제
person.clear()
print(person)       # {} ← 빈 딕셔너리만 남음

# 딕셔너리 자체는 살아있어서 다시 사용 가능
person["이름"] = "Bob"
print(person)       # {'이름': 'Bob'}

# del과의 차이점
person2 = {"이름": "Charlie", "나이": 17}
del person2         # 딕셔너리 자체를 삭제
# print(person2)    # NameError: name 'person2' is not defined ← 오류 발생

# 활용 예시 - 장바구니 비우기
cart = {"사과": 3, "바나나": 2, "딸기": 5}
print(cart)         # {'사과': 3, '바나나': 2, '딸기': 5}
cart.clear()
print(cart)         # {} ← 장바구니가 비워짐
				`} />
				<TwoColumnDes title="4. clear()" des={
					<>
						파이썬 딕셔너리의 <Code>clear()</Code>는 마치 화이트보드에 적힌 내용을 지우개로 한 번에 싹 지우는 것과 같아서, <Code>{`person = {"이름": "Alice", "나이": 15, "성적": 95.5}`}</Code>라는 딕셔너리에 <Code>person.clear()</Code>를 호출하면 화이트보드의 내용은 모두 지워지지만 화이트보드 자체는 그대로 남아있듯이 딕셔너리 안의 모든 키와 값은 삭제되고 빈 딕셔너리인 <Code>{`{}`}</Code>만 남게 되는데, 이 점이 <Code>del person</Code>과의 가장 큰 차이점으로 <Code>del</Code>은 화이트보드 자체를 없애버려서 이후에 <Code>person</Code>을 사용하면 오류가 발생하지만 <Code>clear()</Code>는 화이트보드는 그대로 유지되어 이후에도 계속 딕셔너리로 사용할 수 있어요. 따라서 딕셔너리를 완전히 없애고 싶은 것이 아니라 내용만 비우고 새로 채워 넣고 싶을 때 <Code>clear()</Code>를 사용하는 것이 가장 적합해요
					</>} />
			</TwoColumn>

			<Link id="get" href="/tourOfPython/dictionary#get" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
student = {"name": "Alice", "age": 20}

# 키가 있는 경우
print(student.get("name"))          # Alice

# 키가 없는 경우 → None 반환 (오류 없음)
print(student.get("grade"))         # None

# 키가 없는 경우 → 기본값 반환
print(student.get("grade", "정보 없음"))  # 정보 없음

# 대괄호 방식은 키가 없으면 오류 발생
# print(student["grade"])  # KeyError 발생

				`} />
				<TwoColumnDes title="5. get()" des={
					<>
						파이썬 딕셔너리의 <Code>get()</Code> 메서드는 마치 도서관에서 책을 찾을 때와 비슷해요. 일반적으로 딕셔너리에서 값을 꺼낼 때 <Code>student["grade"]</Code> 처럼 대괄호를 사용하면, 해당 키가 없을 경우 프로그램이 바로 오류를 내면서 멈춰버려요. 하지만 <Code>get()</Code>을 사용하면 <Code>student.get("grade")</Code> 처럼 키가 없어도 오류 대신 <Code>None</Code>을 반환하고 프로그램은 계속 실행돼요. 더 나아가 <Code>student.get("grade", "정보 없음")</Code> 처럼 두 번째 인자로 기본값을 설정하면, 키가 없을 때 <Code>None</Code> 대신 원하는 값을 대신 돌려줘서 훨씬 안전하게 딕셔너리를 다룰 수 있어요.
					</>} />
			</TwoColumn>

			<Link id="in" href="/tourOfPython/dictionary#in" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
library = {"파이썬": "A구역", "자바": "B구역", "C++": "C구역"}

# 키 검색 - 기본적으로 키만 검색
print("파이썬" in library)       # True  ← 키가 존재함
print("루비" in library)         # False ← 키가 존재하지 않음

# 값 검색 - values()와 함께 사용
print("A구역" in library.values())  # True  ← 값이 존재함
print("D구역" in library.values())  # False ← 값이 존재하지 않음

# 키와 값 동시 검색 - items()와 함께 사용
print(("파이썬", "A구역") in library.items())  # True
print(("파이썬", "B구역") in library.items())  # False

# not in - 존재하지 않는지 확인
print("루비" not in library)     # True ← 키가 없음

# 활용 예시 - 키가 없을 때만 추가하기
if "루비" not in library:
    library["루비"] = "D구역"
print(library)  # {'파이썬': 'A구역', '자바': 'B구역', 'C++': 'C구역', '루비': 'D구역'}
				`} />
				<TwoColumnDes title="6. in" des={
					<>
						파이썬 딕셔너리의 <Code>in</Code>은 마치 도서관에서 특정 책이 있는지 확인하는 것과 같아서, <Code>{`library = {"파이썬": "A구역", "자바": "B구역", "C++": "C구역"}`}</Code>라는 딕셔너리에서 <Code>"파이썬" in library</Code>를 사용하면 도서관에 "파이썬" 책이 있는지 확인하듯이 해당 키가 딕셔너리에 존재하는지 확인해서 <Code>True</Code> 또는 <Code>False</Code>로 반환해주는데, 기본적으로 <Code>in</Code>은 키만 검색한다는 점이 중요해요. 값을 검색하고 싶다면 앞서 배운 <Code>values()</Code>와 함께 <Code>"A구역" in library.values()</Code>처럼 사용해야 하고, 키와 값을 동시에 검색하고 싶다면 <Code>("파이썬", "A구역") in library.items()</Code>처럼 <Code>items()</Code>와 함께 사용할 수 있어요. 또한 <Code>not in</Code>을 사용하면 반대로 해당 키가 딕셔너리에 없는지 확인할 수 있어서, 새로운 키를 추가하기 전에 이미 존재하는지 먼저 확인하는 용도로 매우 유용하게 활용할 수 있어요.
					</>} />
			</TwoColumn>

			<Link id="pop" href="/tourOfPython/dictionary#pop" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
student = {"name": "Alice", "age": 20, "grade": "A"}

# pop()은 값을 꺼내면서 동시에 딕셔너리에서 제거
removed_value = student.pop("age")
print(removed_value)  # 20
print(student)        # {"name": "Alice", "grade": "A"} ← age가 사라짐

# 존재하지 않는 키에 기본값 설정
result = student.pop("score", "없음")
print(result)         # 없음 ← 오류 없이 기본값 반환

# 기본값 없이 존재하지 않는 키를 pop하면 오류 발생
# student.pop("score")  # KeyError 발생
				`} />
				<TwoColumnDes title="7. pop()" des={
					<>
						파이썬 딕셔너리의 <Code>pop()</Code> 메서드는 마치 사물함에서 물건을 꺼내면서 동시에 그 자리를 비우는 것과 같아요. 일반 딕셔너리에서 <Code>del student["age"]</Code> 처럼 특정 키를 삭제할 수 있지만, 삭제된 값이 무엇이었는지는 알 수 없어요. 반면 <Code>student.pop("age")</Code> 를 사용하면 해당 키를 딕셔너리에서 제거하면서 동시에 그 값을 반환해줘서, 꺼낸 값을 변수에 저장하거나 바로 활용할 수 있어요. 또한 <Code>get()</Code> 처럼 두 번째 인자로 기본값을 설정할 수 있어서 <Code>student.pop("grade", "없음")</Code> 처럼 존재하지 않는 키를 꺼내려 할 때 오류 없이 기본값을 반환하도록 안전하게 처리할 수 있어요.
					</>} />
			</TwoColumn>

		</div>
	)
}
