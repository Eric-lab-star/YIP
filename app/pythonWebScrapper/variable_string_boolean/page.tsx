import { imageMetadata } from "@/app/lib/r2/sharp/bluarData";
import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import CodeExplain from "@/components/commons/CodeExplain";
import ImageExplain from "@/components/commons/ImageExplain";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";
import Image from "next/image";
import Link from "next/link";



export default async function Page() {
	const stringErrorImageSrc = `${IMAGE_BASE_URL}/NameError.png`
	const explainVariable = `${IMAGE_BASE_URL}/explainVariables.png`
	const explainVariableMeta = await imageMetadata("explainVariables.png")


	return (
		<div className="space-y-5 mb-50">
			<Link id={"title"} href={"/pythonWebScrapper/variable_string_boolean#title"}>
				<Title> 변수, 문자열, 불리안 </Title>
			</Link>

			<Link id={"variable"} href={"/pythonWebScrapper/variable_string_boolean#variable"}>
				<Title weight="semi" size="h2"> 🦍 변수 - variable</Title>
			</Link>
			
			<div className="md:grid md:grid-cols-2">
				<CodeBlock code={
`
a = 2
` } />
				<Text my="s">
					변수는 데이터를 저장하는 이름표에요. 학교에서 기본적인 수학을 배운 사람이라면 왼쪽에 있는 코드에서 a의 값을 바로 알 수 있을 거예요. a의 값이 2라고 생각했다면 정답이에요.  a는 변수이며, a의 값은 2가 되는 거예요. 이 때 a를 변수 이름이라고 하고 2를 변수의 값이라고 해요.
				</Text>
			</div>

			<div className="md:grid md:grid-cols-2">
				<CodeBlock code={
`a = 2
b = 3
c = a + b
print(c) ` } />
				<Text my="s">
					변수 a, b, c를 만들었어요.  이 코드를 실행시키면 어떻게 되나요? a는 2 b는 3이기 때문에 c의 값은 5가 됩니다.
				</Text>
			</div>

			<TwoColumn>
				<CodeBlock code={
`a = 2
b = 3
c = a + b
a = 3
print(c) ` } />
				<div className="">
					<Text my="s">	
						파이썬 코드는 위에서부터 아래로 실행됩니다. 코드의 실행 순서는 결과에 아주 큰 영향을 줘요.  왼쪽 코드를 실행했을 때 어떤 결과가 나오나요?
					</Text>
					<div className="my-7"/>

					<Text my="s">
						a = 3으로 변경했지만, c의 값은 변경되지 않았어요. 변경되지 않은 이유는 <Code>a = 2</Code> 이라는 코드가 <Code>c = a + b</Code> 라는 코드보다 아래 있기 때문입니다. 한번 <Code>a = 3</ Code>코드를 <Code>c = a + b</Code> 코드 위에 작성하고 실행 결과를 비교해 보세요.
					</Text>
				</ div>
			</TwoColumn>
			<CodeExplain code={
`my age = 30 # 불가능 - 변수 이름에 공백이 있으면 안됨
my_age = 30 # 가능 - 공백 대신에 _ 밑줄을 넣어줌
10_age = 20 # 불가능 - 변수 이름에 숫자가 앞에 있으면 안됨
age_10 = 10 # 가능 - 숫자가 뒤에 오는 것은 가능함
@age_10 = 10 # 불가능 - 특수문자를 입력하면 안됨`}>
변수의 이름을 만들 때는 공백을 넣을 수 없어요, 대신에 공백이 필요한 경우 _ 밑줄을 단어 사이에 넣어요.  예를 들어 <Code>my_age</ Code>와 만들 수 있어요. 이런 방식을 snake_case라고 하며 파이썬 개발자의 약속이에요. <Code>myage</Code>, <Code>myAge</Code> 또는  <Code>my___________age</Code> 라고 적어도 프로그램에 오류는 없어요 하지만 보기 좋은 코드를 만들기 위해서 snake_case를 사용해요
			</CodeExplain>

			<div className={"flex justify-center items-center"}>
				<Image 
					className="w-[50%]"
					src={explainVariable} 
					alt="explains variables" 
					width={explainVariableMeta.width} 
					height={explainVariableMeta.height} 
					placeholder="blur" 
					blurDataURL={explainVariableMeta.blurDataURL}/>
			</div>





			<Link id="string" href={"/pythonWebScrapper/variable_string_boolean#string"}>
				<Title my="s" weight="semi" size="h2">🐘 문자열 - string </Title>
			</Link>
			<CodeExplain code={`food = apple # 오류!`}>
		숫자를 변수의 값으로 만드는 방법은 이제 알았어요. 이제 음식의 이름을 변수의 값으로 만들어 볼까요.
			<div className="my-1"/>
왼쪽에 있는 코드를 실행시키고 어떤 결과가 나왔나요?
			</CodeExplain>

			<ImageExplain src={stringErrorImageSrc}>
			<Code>NameError: name 'apple' is not defined</Code> 라는 오류 메시지가 나왔어요. 오류 메시지는 개발자들을 도와주는 도구에요.  오류가 나왔다고 실력이 없는 개발자라는 의미는 아니에요. 
			<div className="my-1"/>
			메시지를 해석해 보면 apple이 정의되지 않았다고 나와요. 현제 파이썬은 apple을 변수 이름으로 생각하고 있는 거예요.
		</ImageExplain>

		<CodeExplain code={
`food = "apple" # 문자열 사용
print(food)
`}>
			변수 이름이 아니라는 것을 파이썬에게 알려주려면, “ “ 따옴표로 감싸줘야 해요.이제 왼쪽에 있는 코드를 실행시켜 보세요. 오류가 사라진 것을 확인할 수 있을 거예요. 이제 변수에 문자를 변수 값으로 넣을 수 있게 되었네요.
		</CodeExplain>

		<CodeExplain code={
`year = "2026"
`}>
왼쪽에 `year` 에 `“2026”` 은 문자일까요, 숫자일까요?
	<div />
2026이 따옴표안에 있음으로 파이썬은 숫자로 이해합니다.
		</CodeExplain>

		<Link id="boolean" href={"/pythonWebScrapper/variable_string_boolean#boolean"}>
			<Title weight="semi" size="h2">🦁 불리안 boolean</Title>
		</Link>

		<CodeExplain code={
`# 파이썬 불리안
dead = False 
dead = false # 오류! 대문자로 입력해야 됨.
dead = "False" # 오류! 따옴표안에 있으면 문자열임.
`}>
			불리안은 참 혹은 거짓의 상태를 표현하는 값이에요. 이러한 값으로  게임에서 죽었는지 살았는지 나타낼 수 있어요. 
		</CodeExplain>

		<Link id="quizz" href={"/pythonWebScrapper/variable_string_boolean#quizz"}>
			<Title weight="semi" size="h2">❓ Quizz! 문제를 맞춰봐요!</Title>
		</Link>

		<QuizzWithOptions answer={3} question="1. 변수 a에 변수값으로 2를 지정하는 방법으로 올바른 것을 고르세요">
			<Option value={1}>1. a = 3</Option>
			<Option value={2}>2. A = 2</Option>
			<Option value={3}>3. a = 2</Option>
		</QuizzWithOptions >

		<QuizzWithOptions answer={1} question="2. snake_case 표기 방법으로 올바른 것을 고르세요.">
			<Option value={1}>1. red_apple</Option>
			<Option value={2}>2. redApple</Option>
			<Option value={3}>3. reapple</Option>
		</QuizzWithOptions >

		<QuizzWithOptions answer={3} question="3. 아래 코드의 실행결과로 알맞은 것을 고르세요.">
			<CodeBlock code={
`
five = 5
two = 2
result = five + two
print(result)
`}/>
			<Option value={1}>1. five</Option>
			<Option value={2}>2. 5</Option>
			<Option value={3}>3. 7</Option>
			<Option value={4}>4. seven</Option>
		</QuizzWithOptions >

		<QuizzWithOptions answer={4} question="4. 불리언 값을 고르세요.">
			<Option value={1}>1. true</Option>
			<Option value={2}>2. "true"</Option>
			<Option value={3}>3. false</Option>
			<Option value={4}>4. False</Option>
			<Option value={5}>5. "False"</Option>
		</QuizzWithOptions >

		<QuizzWithOptions answer={1} question="5. 문자열 값을 고르세요.">
			<Option value={1}>1. "2025"</Option>
			<Option value={2}>2. 20205</Option>
			<Option value={3}>3. False</Option>
			<Option value={4}>4. True</Option>
		</QuizzWithOptions >

			<NextAndPrev
			prev={"/pythonWebScrapper/pythonSandBox"}
			prevPage="Python SandBox.io 소개"
			next={"/pythonWebScrapper/functions"}
			nextPage="함수"
			/>
	</div>
)}
