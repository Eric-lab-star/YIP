import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function() {
	return (
		<div className="select-none p-5 mb-100">
			<Title my="l">Function Excercise Level 2</Title>

			<Title my="m" size="h2">1. 간단한 함수 만들기</Title>
			<Text> 매개변수를 사용하지 않는 간단한 함수 3개를 만들면서 연습을 해봅시다.</Text>
			<Title size="h3">예시</Title>
			<Title my="m" size="h3" weight="semi">1. 안녕하세요 함수</Title>
			<CodeBlock code={
				`
def say_hello():
    print("안녕하세요.")
`}/>
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
				`}/>
			<Title my="m" size="h3" weight="semi">3. 작별 함수</Title>
			<CodeBlock code={
				`
def byebye():
    print(" byebye")
				`}/>
			<Title my="m" size="h3" weight="semi">4. 하트함수</Title>
			<CodeBlock code={
				`
def love_me():
    print(" ❤️ " * 10)
				`}/>

			<Title my="m" size="h2">2. 매개변수가 있는 함수 만들기</Title>

			<Title my="m" size="h2">3. 매개변수가 있는 함수 만들기</Title>

			<Title my="m" size="h2">4. 값을 반환하는 함수 만들기</Title>
		</div>
	)
}
