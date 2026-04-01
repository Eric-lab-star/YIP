import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function() {
	return (
		<div className="select-none p-5 mb-100">
			<Title my="l">Function Excercise Level 2</Title>

			<Title my="m" size="h2">1. 간단한 함수 만들기</Title>
			<Text> 매개변수를 사용하지 않는 간단한 함수 3개를 만들면서 연습을 해봅시다.</Text>
			<Text style="text-orange-600"> 복사 붙여넣기 사용하지 말고 손으로 한땀한땀 만드세요. </Text>
			<Title size="h3">예시</Title>
			<Title my="m" size="h3" weight="semi">1. 안녕하세요 함수</Title>
			<CodeBlock code={
				`
def say_hello():
    print("안녕하세요.")
`} />
			<Title my="m" size="h3" weight="semi">2. 상자 만들기 함수</Title>
			<CodeBlock code={
				`
def box():
    print("""
┌──────────────────┐
│                  │
│                  │
│                  │
└──────────────────┘
          """)
				`} />
			<Title my="m" size="h3" weight="semi">3. 작별 함수</Title>
			<CodeBlock code={
				`
def byebye():
    print(" byebye")
				`} />
			<Title my="m" size="h3" weight="semi">4. 하트함수</Title>
			<CodeBlock code={
				`
def love_me():
    print(" ❤️ " * 10)
				`} />

			<HorizontalLine />

			<Title my="m" size="h2">2. 매개변수가 있는 함수 만들기</Title>
			<Text> 매개변수가 있는 함수를 만들기 연습을 해봅시다. 아래의 코드는 예시입니다.</Text>
			<Text style="text-orange-600"> 복사 붙여넣기 사용하지 말고 손으로 한땀한땀 만드세요. </Text>

			<Title my="m" size="h3" weight="semi">1. 더하기 함수</Title>
			<CodeBlock code={
				`
def add(x, y):
    print(x + y)
				`} />
			<Title my="m" size="h3" weight="semi">2. 제목 함수</Title>
			<CodeBlock code={
				`
def title(width, text):
    print(text.strip().center(width, "="))
				`} />
			<Title my="m" size="h3" weight="semi">3. 사용자 만들기 함수 </Title>
			<CodeBlock code={
				`
def createUser(id, name):
    print(f"id: {id}, name: {name}")
				`} />
			<Title my="m" size="h3" weight="semi">4. 아이스 음료 만들기 함수</Title>
			<CodeBlock code={
				`
def ice_maker(drink):
    print(f"ice {drink}")
				`} />
			<Title my="m" size="h3" weight="semi">5. 하트 생성기 함수</Title>
			<CodeBlock code={
				`
def heart_maker(n):
    print(" ❤️ " * n)
				`} />

			<Title my="m" size="h3" weight="semi">6. 나무 만들기 함수</Title>
			<CodeBlock code={
				`
def createTree(num):
    for i in range(num):
        print((" * " * (i + 1)).center(40, " "))
				`} />

			<HorizontalLine />
			<Title my="m" size="h2">3. 값을 반환하는 함수 만들기</Title>
			<Text> 매개변수가 있는 함수를 만들기 연습을 해봅시다.</Text>
			<Text style="text-orange-600"> 복사 붙여넣기 사용하지 말고 손으로 한땀한땀 만드세요. </Text>
			<Title my="m" size="h3" weight="semi">1. 더하기 함수</Title>
			<CodeBlock code={
				`
def add(x, y):
    return x + y

result = add(5, 3)
				`} />

			<Title my="m" size="h3" weight="semi">2. 로그인 함수</Title>
			<CodeBlock code={
				`
def loggedIn(user):
    if user.state:
        return True
    else:
        return False
				`} />

			<Title my="m" size="h3" weight="semi">3. 별 만들기 함수</Title>
			<CodeBlock code={
				`
def createStar(num):
    return "*" * num
				`} />
			<Title my="m" size="h3" weight="semi">4. 평균 구하기 함수</Title>
			<CodeBlock code={
				`
def average(x):
    s = sum(range(x + 1))
    print(s / x)
				`} />
		</div>
	)
}
