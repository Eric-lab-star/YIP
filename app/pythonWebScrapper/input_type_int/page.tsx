import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import Link from "next/link";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";
import { Option } from "@/components/forms/quizz/Option";
import NextAndPrev from "@/components/commons/NextAndPrev";


export default function Page(){
	return (
		<div className="mb-50">
			<Title my="x">input() type() int()</Title>
			<Link id="input" href={"/pythonWebScrapper/input_type_int#input"}>
				<Title my="m" size="h2">input()</Title>
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
				<Title my="m" size="h2">type()</Title>
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
			<Link href={"/pythonWebScrapper/input_type_int#int"} id="int">
				<Title my="m" size="h2">int()</Title>
			</Link>
			<TwoColumn>
				<CodeBlock code={
`age = int(input("age? :"))
print(type(age))
`}/>
				<Text>
					<Code>int</Code>값으로 바꾸고 싶을 때는 <Code>int()</Code>를 사용해요. 이 함수를 사용하면 "23" 와 같은 문자열을 입력 받았을 때 23과 같은 숫자로 바꾸어주는 기능을 해요.
				</Text>
			</TwoColumn>
			<TwoColumn>
				<CodeBlock code={
`
ValueError: invalid literal for int() with base 10: 'asfasfa'
`}/>
				<Text>하지만 숫자로 바꿀수 없는 문자열도 있어요. 예를 들면 사용자가 "helllo"와 같은 글자를 입력했을 경우에요. 이런 경우에 <Code>int()</Code>를 실행하면 어떤 결과가 나오는지 확인해보요.
					<div className="h-3"/>
				아마 ValueError라고 시작되는 문장을 찾을 수 있을 거예요. <Code>int</Code>는 정말로 바꿀수 없는 값을 받으면 이런 식으로 오류가 생겼다고 알려주면서 프로그램이 종료 되요. 이런 에러는 프로그램에 아주 치명적이에요. 그래서 에러를 잡아주는 코드를 넣어서 에러가 생기지 않게 에러를 잡아줄 거예요. 
					</Text>
			</TwoColumn>

			<Link href={"/pythonWebScrapper/input_type_int#try_catch"} id="try_catch">
				<Title my="m" size="h2">try...catch</Title>
			</Link>
			<TwoColumn >
				<CodeBlock code={
`try:
    age = int(input("age? :"))
    print(type(age))
except ValueError:
    print("숫자를 입력하세요")
`}/>
				<Text>
				에러를 잡아주기 위해서 <Code>try except</Code>를 추가했어요. <Code>try</Code>안에는 에러가 생길 수도 있는 코드를 넣어요. 지금은 <Code>int()</Code> 함수가 에러를 만들 수 있으니까. <Code>try</Code>안에 넣어줬어요. 그리고 이 코드에서 에러가 생기면 <Code>except</Code>안에 있는 코드가 실행되요.
					<div />
				<Code>except</Code> 다음에 오는 <Code>ValueError</Code> 코드는 지금 상황에서 넣지 않아도 잘 작동합니다. <Code>except ValueError</Code>는 에러의 종류가 <Code>ValueError</Code>인 경우에 실행하세요 라는 의미에요. 만일 <Code>ValueError</Code> 를 넣지 않으면 모든 에러 상황에 실행되요.
				</Text>
			</TwoColumn >

			<Title my="l" size="h2">퀴즈</Title>
			
			<QuizzWithOptions answer={2} question="다음 코드에 관한 설명으로 틀린 것을 고르세요.">
				<CodeBlock code={
`age = input("What is your name?: ")
print(age)
`}/>
				<Option value={1}>
					<Text>1. <Code>input()</Code>은 사용자가 입력할 때까지 기다린다. </Text>
				</Option>
				<Option value={2}>
					<Text>2. age의 타입은 숫자이다. </Text>
				</Option>
				<Option value={3}>
					<Text>3. age의 타입은 문자열이다. </Text>
				</Option>
				<Option value={4}>
					<Text>4. 사용자가 입력한 값은 age에 할당된다. </Text>
				</Option>
			</QuizzWithOptions>

			<QuizzWithOptions answer={3} question="다음 코드에 관한 설명으로 틀린 것을 고르세요.">
				<CodeBlock code={
`try:
    age = int(input("Enter your age: "))
    print("you are", age)
except ValueError:
    print("숫자를 입력하세요")
`}/>
				<Option value={1}>
					<Text>1.<Code>try..except</Code>는 프로그램 실행시 에러를 안전하게 처리할 수 있게해 준다.</Text>
				</Option>
				<Option value={2}>
					<Text>2. <Code>ValueError</Code>는 <Code>int()</Code>가 숫자로 바꿀 수 없는 값을 받을때 발생하는 에러이다.</Text>
				</Option>
				<Option value={3}>
					<Text>3. <Code>age</Code>의 타입은 문자열이다. </Text>
				</Option>
			</QuizzWithOptions>
			<NextAndPrev
			next="/pythonWebScrapper/if"
			nextPage="if, else, elif"
			prev="/pythonWebScrapper"
			prevPage="파이썬"
			/>
		</div>
	)
}
