import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import Link from "next/link";

export default function Page(){
	return (
		<div className="mb-50">
			<Title my="x">input() type() int()</Title>
			<Link id="input" href={"/pythonWebScrapper/input_type_int#input"}>
				<Title my="m">input()</Title>
			</Link>
			<TwoColumn>
				<CodeBlock code={
`age = input("몇살이에요")
phonenumber = input("전화번호 뭐에요")
`}/>
				<Text>
<Code>input</ Code> 함수를 이용해서 사용자에게 질문을 할 수 있어요. 그리고 사용자가 답을 할 때까지 기다리고 답변을 변수에 저장 시킬 수 있어요.
	<div className="h-3"/>

<Code>input</Code> 함수는 <Code>print</ Code> 함수와 마찬가지로 <Code>built-int</Code> 함수에요. <Code>built-int</ Code> 함수는  나중에 더 자세하게 이야기하겠지만, 지금은 미리 만들어진 파이썬 프로그램에 항상 들어가는 함수라고 생각하세요.
				</Text>
			</TwoColumn>
			<Link id="type" href={"/pythonWebScrapper/input_type_int#type"}>
				<Title my="m">type()</Title>
			</Link>
			<Text>
"2024"는 문자열 2024는 숫자라고 했던 거 기억하나요? 파이썬은 이런 것들은 모두 타입(type)이라고 부르고 있어요. 파이썬은 이런 타입이 다르면 오류가 나기 때문에 어떤 타입을 확인하는 과정이 중요할 때가 있어요. 타입을 확인하기 위해서는<Code>type()</Code>를 사용해요.
			</Text>
			<TwoColumn>
				<CodeBlock code={
`age = type(20) # type에 20을 전달
print(age) # 20의 타입을 알려준다.
`}/>
				<Text>
<Code>type</Code>이라는 함수도 <Code>built-in</ Code>함수예요. 이 함수는 인수로 받은 값의 타입을 반환해요.
<div className="h-3"/>
			이 코드를 실행했을 때 어떤 결과가 나왔나요? <Code>{"<class 'int' >"}</Code> 이런 알 수 없는 영어 단어들이 나와도 겁먹지 않아도 돼요. <Code>class</Code>는 나중에 천천히 알아보도록 하고 지금은 그 다음에 오는 단어만 보면 돼요.
<div className="h-3"/>

우리가 일상생활에서 주로 사용하는 숫자는 모두 <Code>int</Code>라고 생각해도 좋아요. 
				</Text>
			</TwoColumn>
			<TwoColumn>
			<CodeBlock code={
	`age = input("age?: ")
	print(type(age))
					`}/>
				<Text>
이번에는 <Code>input()</Code>으로 받은 값의 타입을 확인 해볼까요?
<div className="h-3"/>
분명 숫자를 입력했는데 <Code>int</Code>라고 안 나오고, <Code>str</Code>이라고 나와요. <Code>str</Code>은 문자열이라는 의미에요. <Code>input</Code>은 항상 문자열 값만 반환해요. 그렇다면 <Code>int</Code>를 받고 싶을 때는 어떻게 해야 할까요.
					</Text>
			</TwoColumn>
			<Title my="m">int()</Title>
			
		</div>
	)
}
