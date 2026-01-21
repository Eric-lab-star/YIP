import { imageMetadata } from "@/app/lib/r2/sharp/bluarData";
import { IMAGE_BASE_URL} from "@/app/lib/r2/utils";
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import CodeExplain from "@/components/commons/CodeExplain";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Option } from "@/components/forms/quizz/Option";
import  QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
	const pythonFunctionJuice = `${IMAGE_BASE_URL}/pythonFunctionJuice.png`
	const pythonFunctionJuiceMeta = await imageMetadata("pythonFunctionJuice.png")
	const functionBody = `${IMAGE_BASE_URL}/pythonFunctionBody.png`
	const functionBodyMeta= await imageMetadata("pythonFunctionBody.png")
	return (
		<div className="mb-30">
			<Link id="title" href={"/pythonWebScrapper/functions#title"}>
				<Title my="m">함수 Function</Title>
			</Link>
			<Link id="create" href={"/pythonWebScrapper/functions#create"}>
				<Title  my="l" size="h2" weight="semi">함수를 만들자</Title>
			</Link>
			<Text>
이제부터 함수를 배워봐요. 함수는 영어로 function이라고 해요. 프로그래밍에서 사용되는 함수는 수학에서 사용된는 함수와 같은 점도 있고 다른 점도 있어요. 먼저 기본적인 함수의 작동 방식을 알아볼까요?
			</Text>
			<div className="flex justify-center">
				<Image 
					className="w-150 my-9"
					alt="python function juice" 
					src={pythonFunctionJuice}
					placeholder="blur"
					blurDataURL={pythonFunctionJuiceMeta.blurDataURL}
					width={pythonFunctionJuiceMeta.width}
					height={pythonFunctionJuiceMeta.height}
				/>
			</div>
			<Text my="l">
함수는 믹서기라고 생각하세요. 믹서기는에는 사과를 넣으면 항상 사과주스가 나와요. 함수도 마찬가지로 함수 안에 무언가를 넣었을 때 어떤 결과를 만드는 기능을 합니다. 지금까지 사용했던 <Code>print("hello")</Code>또한 함수에요. hello를 넣었을 때 hello가 출력되는 기능을 하고 있으니까요.
			</Text>

			<CodeExplain code={
`
def game_over():
	print("You are dead. Game over")
`}>
이제 함수를 만들어 봐요. 함수를 만드는 방법은 변수를 만드는 것하고 조금 달라요. 먼저 <Code>def</Code> 를 적어야 되요. <Code>def</Code> 다음에 함수의 이름을 적어요. 왼쪽에 <Code>game_over</Code> 는 함수 이름이에요. 꼭 <Code>game_over</Code> 라고 적지 않아도 되요. 이름은 자유롭게 바꾸어도 좋아요
			</CodeExplain>

			<CodeExplain code={
` # 올바른 작성방법
def get_year():
	#함수 몸통, function body
	print("2026")

# 잘 못된 작성 방법
# 1. def로 시작하지 않음
get_time():
	print(14)

#2. 콜론이 없음 
def say_name()
	print("rina")

#3. 바디에 공백이 없음 
def say_hello():
print("hello")

`}>
이름을 만든 다음에는 <Code>( )</Code> 괄호를 입력하고, <Code>:</Code> 콜론을 입력해야 되요. 
<Code>:</Code> 콜론을 작성한 다음, 밑에 줄 부터는 함수의 바디가 되는 부분이에요. 바디를 입력할 때는 탭을 한번 눌러야 되요. 
<div className="h-3" />
<Code>def</Code>는 영어 define 을 의미해요. 한국어로 정의하다라는 의미에요. 다시 말해 파이썬을 이용해서 “game_over를 정의해” 라고 컴퓨터에게 작성하고 있는 거에요.
			</CodeExplain>

			<Link id="simple_create" href={"/pythonWebScrapper/functions#simple_create"}>
				<Title weight="semi" size="h2">간단한 함수를 만드는 방법</Title>
			</Link>
			<Text my="m"> 1. <Code>def</Code>를 작성한다 </Text>
			<Text my="m"> 2. 한 칸을 띄우고 함수의 이름을 작성한다. </Text>
			<Text my="m"> 3. <Code>():</Code>를 작성한다.</Text>
			<Text my="m"> 4. 엔터키를 눌러서 다음 줄로 이동한다.</Text>
			<Text my="m"> 5. <Code>def</Code>하고 같은 세로줄에서 새로운 문자가 입력될 경우 탭을 눌러준다. 아니면 6번으로 이동</Text>
			<Text my="m"> 6. 함수가 실행될 때 실행될 코드를 작성한다.</Text>
			<div>
				
			</div>

			<CodeExplain code={
`#say_hello 함수
def say_hello():
	print("hello")

say_hello()
`}>
아래에 <Code>say_hello()</Code> 라고 입력하고 실행을 시켜봐요. 이제 함수가 실행되는 것을 확인할 수 있어요. 
<div className="h-2"/>
함수를 실행하기 위해서는 <Code>()</Code> 콜론이 함수 이름 뒤에 반드시 있어야 해요.  콜론이 없으면 함수가 실행되지 않아요.
			</CodeExplain>
			
			<Link id="why_create" href={"/pythonWebScrapper/functions#why_create"}>
				<Title weight="semi" my="l" size="h2"> 함수는 왜 만들까? </Title>
			</Link>
			<Text style="mb-2">
함수가 복잡하고 어렵다고 생각했나요. 하지만 놀랍게도 함수는 복잡하고 어려운 코드를 간단하고 읽기 편하게 하려고 만들어요. 함수는 믹서기와 같다고 했던 거 기억하나요? 만약 믹서기 없이 주스를 만든다고 생각을 해봐요. 1개 2개는 쉽게 만들 수 있어요. 하지만 매일 300개 혹은 500개를 만들어야 한다면 어떨까요? 이렇게 함수는 번거로운 일을 간단하게 도와주는 역할을 해요. 어려운 말로 "추상화"라고 해요. 영어로는 "abstraction"이라고 해요. 추상화 수준이 높을수록 복잡하고 어려운 코드는 사라지고 읽기 편하고 사용하기 쉬운 코드를 작성할 수 있게 되는 거예요.
			</Text>
			<Link target="_blank" href={"https://onestone-dev.tistory.com/3"} className="h-6 flex  text-blue-800"> 
				<Text weight="bold" style="hover:border-b border-b-blue-800">
					추상화 수준에 대해서 더 알고 싶다면? 여기를 클릭!
				</Text>
			</Link>

			<CodeExplain code={`
def paint_text():
	print("""
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur augue in neque placerat, at scelerisque ex sodales. Pellentesque feugiat lacus ut ante accumsan, sed consectetur urna vestibulum. In feugiat auctor nulla vitae tristique. Maecenas tincidunt diam mi, quis aliquet tortor bibendum in. Proin fringilla justo sit amet iaculis efficitur. Morbi et pulvinar purus, vitae volutpat arcu. Proin blandit sodales pretium. Quisque fringilla libero sit amet augue ultrices luctus. Curabitur nunc mauris, varius nec ante a, scelerisque accumsan tortor. Vivamus et accumsan magna, semper mattis neque. Praesent id urna eu sapien suscipit euismod at eget enim. Suspendisse non interdum leo.

Mauris quis purus eu enim porttitor pharetra. Etiam vitae diam eu tortor lobortis dignissim. Mauris et massa feugiat, lacinia nulla gravida, vestibulum lectus. Morbi tincidunt metus lectus. Praesent cursus vestibulum ornare. Suspendisse sed odio ut enim posuere mattis. Nullam tristique ipsum vel mauris rhoncus finibus. Nunc tincidunt, augue non pharetra sagittis, libero justo condimentum nisl, eget pellentesque odio dolor in mi. Sed accumsan ex ex, quis pulvinar mi lobortis nec. Sed porta nisl leo, sed luctus massa lacinia ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus turpis, finibus eu magna vel, molestie accumsan odio. Nam enim augue, rutrum et nisi id, convallis feugiat sem.

Pellentesque nibh ligula, condimentum at tristique nec, consequat ac purus. Aliquam vel convallis metus. Curabitur feugiat tellus neque, nec ultrices nisl vestibulum id. Donec pretium, lectus id imperdiet ullamcorper, nunc elit cursus dui, et volutpat urna sapien vitae felis. Mauris ac gravida metus. Sed eu arcu porttitor, feugiat odio non, aliquet neque. Aliquam dapibus dapibus ipsum. Aenean eleifend diam id bibendum ultricies. Integer non consectetur urna.

Donec non congue urna, a fringilla nisl. Phasellus condimentum eget arcu eu maximus. Nullam vitae ex efficitur, mattis tellus non, mattis est. Vestibulum vel nisl sit amet sapien eleifend pellentesque. Pellentesque quis ipsum ac nisi posuere ornare. Etiam quis porta quam. Vestibulum quis fringilla arcu, sed molestie metus. Suspendisse porta, arcu eu congue posuere, nulla odio dignissim dolor, ac interdum sem enim id ex. Curabitur scelerisque metus purus, nec accumsan justo convallis eu. Sed id mollis est. Nullam sed vestibulum quam.

Praesent commodo orci non velit pellentesque, sed mollis leo luctus. Nunc blandit hendrerit lectus a convallis. Aliquam fringilla sollicitudin libero sed lobortis. Donec mattis placerat eros, ut placerat lacus iaculis non. Vestibulum dignissim, lacus eget varius iaculis, leo libero ultricies arcu, sit amet laoreet velit lectus sit amet lectus. Suspendisse eleifend luctus suscipit. In odio tortor, porttitor sit amet risus eget, vestibulum vehicula augue. Proin et orci condimentum, sollicitudin augue et, auctor orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur justo diam, placerat in magna ac, pharetra sollicitudin quam.
	""")

paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
`}>
함수의 가장 기본적인 기능은 다시 사용하기 편하게 만들는 거에요. 지금은 함수가 간단하기 때문에 좋다고 못 느낄 수 있지만 100줄 200줄 넘어간다고 생각해보세요. 반복적으로 쓰면 손이 아플거에요. 대신 함수 바디에 넣어주면  편리하게 사용할 수 있게되요. 
<div className="h-3"/>
왼쪽에 있는 코드를 실행시켜 볼까요?
			</CodeExplain>

			<Link id="function_body" href={"/pythonWebScrapper/functions#function_body"}>
				<Title my="l" size="h2" weight="semi"> 함수의 몸체 - Function Body </Title>
			</Link>
			<Text my="m">
"함수 바디", "함수의 몸체", "몸통" 이런 용어가 나오는데 무슨 뜻일까요? 다시 믹서기 비유로 돌가가면, 믹서기의 내부는 함수의 몸통이라고 생각할 수 있어요. 믹서기의 내부와 외부는 플라스틱으로 구분해요. 그렇다면 함수의 내부와 외부는 어떻게 구분할 수 있을까요? 함수의 내부와 외부는 공백으로 구분해요.
			</Text>

			<CodeExplain code={
`def mixer():
	print("start")

def say_end():
	print("end")
`}>
왼쪽에는 두개의 함수가 정의되어 있어요.이 두 함수는 모두 올바르게 동작해요. <Code>print("start")</Code>의 p가 윗줄 <Code>def</Code>의 e와 같은 세로줄에 있다는 것이 중요합니다.
			</CodeExplain>
			<CodeExplain code={
`# 오류!
def say_start():
print("start")

def say_end():
print("end")
				`}>
여기 왼쪽에 있는 코드는 잘 못된 코드에요. 이유가 뭘까요?
<div className="h-3"/>
<Code>print</Code> 라는 단어 앞에 공백이 없기 때문이에요. 파이썬은 공백에 아주 민감한 언어예요. 탭을 한번 눌러서 공백을 만들 수도 있고 스페이스바를 눌러서 공백을 만들 수 있어요. 
<div className="h-3"/>
			</CodeExplain>

			<CodeExplain code={
`def say_start():
print("start")
`}>
또한 함수를 정의할 때는 반드시 함수 바디에 무언가 입력해야 되요.  함수 바디는 공백으로 시작하는데  공백으로 시작되는 함수 바디가 없기 때문에 오류가 생기는 거에요.
			</CodeExplain>
			<CodeExplain code={
`def say_start():
	pass
print("start")
` }>
함수 바디에 어떤 것도 넣고 싶지 않다면, pass 를 넣어도 좋아요.  pass 가 뭔지 이해가 아직 안 되겠지만 지금은 오류를 무시해주는 마법이라고 생각하세요
			</CodeExplain>
			<div>
				<Image 
					alt="function body"  
					width={functionBodyMeta.width}
					height={functionBodyMeta.height}
					src={functionBody}
				/>
			</div>

			<Link id="parameter" href={"/pythonWebScrapper/functions#parameter"}>
			<Title size="h2" my="l" weight="semi">매개변수와 인수 Parameter and Argument </Title>
			</Link>

			<CodeExplain code={
` print("hello")

`
}>이제 이 <Code> print() </Code> 함수는 아주 익숙해졌을 거에요. <Code>print</Code> 가 함수의 이름이라는 것을 알고 있고. <Code>"hello"</Code>가 문자열이라는 것도 알고 있어요. 하지만  괄호 내부에 문자열을 넣을려면 어떻게 해야 할 까요?
			</CodeExplain>
			<CodeExplain code={
`def plus_one(number):
	print(number + 1)

`}>
여기 왼쪽에 있는 함수에 새로운게 조금 추가 되어있어요. 이제는 괄호 안에 <Code>number</Code> 이라는 단어가 생겼네요. <Code>number</Code> 는 함수의 매개변수라고 하며 영어로는 <Code>parameter</Code>라고 불러요. 매개변수의 이름은 변수처럼 자유롭게 만들 수 있어요. 다시 말해 <Code>number</Code> 뿐만 아니라 <Code>num</Code> , <Code>x</Code> , <Code>y</Code> 등등 으로 바꾸어도 좋아요.  
			</CodeExplain>
			<CodeExplain code={
`def plus_one(number):
	print(number + 1)
number # 오류!
`
}>
매개변수는 함수 내부에서만 사용할 수 있어요. 함수 밖에서 number를 적으면 오류가 생깁니다. 
			</CodeExplain>
			<CodeExplain code={
`def plus_one(number):
	print(number + 1)

plus_one(10)
`
}>
만든 함수를 실행시킬려면 <Code>plus_one(10)</Code> 과 같이 괄호 내부에 값을 넣어야 되요. 여기서 10을 인수, 영어로 argument라고 해요. 
<div className="h-2"/>
하지만 argument와  parameter는 개발자들도 혼용해서 많이 사용하기 때문에 매개변수와 인수가 혼용되서 사용되고 있어요.
			</CodeExplain>
			<CodeExplain code={
`def greet(name):
	print("hello", name)

greet("python")
`
}>
매개변수를 이용하면, <Code>hello python</Code> 과 같은 문자를 출력할 수 있어요. 그런데 왼쪽 코드를 보면 <Code>print</Code> 함수가 “hello” 와 name 두가지 변수를 사용하고 있네요.
<div className="h-2"/>
어떻게하면 이렇게 만들 수 있을까요?  이번에는  함수가 변수2개를 사용할 수 있게 만들어 봐요.
			</CodeExplain>
			<CodeExplain code={
`def add(x, y):
	print(x + y)
	
add(10, 11)
`
}>
<Code>add</Code> 라는 함수의 괄호 안에 <Code>x</Code>, <Code>y</Code>를 작성했어요. 함수의 매개변수를 늘리고 싶을 때는 <Code>,</ Code>콤마를 사용해요. 
<div className="h-2" />
함수를 실행할 때는 <Code>add(10, 11)</Code>이렇게 작성해요. 10이 x의 위치에 있음으로 <Code>x</Code>는 <Code>10</Code>으로 바뀝니다. 같은 방식으로 <Code>11</Code>은 <Code>y</Code>의 위치에 있음으로 <Code>y</Code>는 <Code>11</Code>로 바뀌어서 <Code>print(10 + 11)</ Code>이 <Code>add</Code>함수 내부에서 실행되는 거예요.
			</CodeExplain>

			<CodeExplain code={
`def add(x, y):
	print(x + y)
	
add(10) # 오류!
`
			}>
이번에는 <Code>add(10)</ Code>이라고 작성하고 코드를 실행해 봐요. <Code>TypeError: add() missing 1 required argument: y on line 4</ Code>이런 식의 메시지가 나왔네요.
<div className="h-2"/>
<Code>add</Code> 함수를 정의할 때 매개변수 x와 y를 만들었기에 함수를 실행할 때도 <Code>x</Code>와 <Code>y</ Code>자리에 인수를 반드시 넣어주어야 해요. 
			</CodeExplain>
			<CodeExplain code={
`def add(x, y=10):
	print(x + y)

add(10)

`
			}>
매개변수 기본값을 설정해줌으로서 해결하는 방법도 가능해요. <Code>add</Code> 함수가 정의 될 때 매개변수 <Code>y</Code>의 자리에 <Code>y=10</Code> 이라고 작성했어요. 이렇게 작성하면, 함수가 실행 될 때, <Code>y</Code>가 전달 받을 인수가 없다면 <Code>y</Code>값을 <Code>10</Code>으로 정해줘요. 
<div className="h-2"/>

이런 방식을  default value for parameter 라고 하며, 한국어로 “매개변수에 기본값 설정하기”라고 해요.
			</CodeExplain>
			<CodeExplain code={
`def add_two(x):
	return x + 2

result = add_two(3)

print(result)
`
			}>
마지막으로 <Code>return</ Code>을 배워봐요.
<div className="h-2"/>
<Code>return</Code>을 통해서 함수로부터 새로운 값을 만들 수 있어요. 왼쪽의 <Code>add_two</ Code>함수에 어떤 숫자를 넣으면 2를 더해서 반환해주는 역할을 해요. <Code>add_two</ Code>에 3을 더했을 때 2가 나오게 되는 거에요.
<div className="h-2"/>
또한 <Code>return</Code>은 함수를 끝내는 역할을 하기 때문에 return 뒤오는 코드는 실행되지 않아요.
			</CodeExplain>

	
		<Link id="quizz" href={"/pythonWebScrapper/functions#quizz"}>
			<Title weight="semi" size="h2">❓ Quizz! 문제를 맞춰봐요!</Title>
		</Link>
		<QuizzWithOptions layout="grid" answer={2} question="1. 올바르게 작성된 함수 코드를 고르세요.">
			<Option value={1}> 
				<Text>A.</Text>
				<CodeBlock code={
`def get_year(): 
print("2026")`}/>
			</Option>
			<Option value={2}> 
				<Text>B.</Text>
				<CodeBlock code={
`def get_year():
	print("2026")`}/>
			</Option>
			<Option value={3}> 
				<Text>C.</Text>
				<CodeBlock code={
`get_year():
	print("2026")`}/>
			</Option>
			<Option value={4}> 
				<Text>D.</Text>
				<CodeBlock code={
`def get_year()
	print("2026")`}/>
			</Option>
		</QuizzWithOptions >

		<QuizzWithOptions answer={2} question="2. 아래 코드에 관한 설명으로 틀린 것을 고르세요." >
			<div className="flex justify-center">
				<div className="w-150 ">
					<CodeBlock code={
`def add(x, y):
	return x + y
add(10)
`}/>
				</div>
			</div>
			<Option value={1}>
				<Text>1. 함수의 이름은 add이다.</Text>
			</Option>
			<Option value={2}>
				<Text>2. x와 y는 함수의 매개변수이다.</Text>
			</Option>
			<Option value={3}>
				<Text>3. 함수를 실행하기 위해서는 <Code>add(13)</Code>이라고 작성해야된다.</Text>
			</Option>
			<Option value={4}>
				<Text>4. <Code>return x + y</Code>는 함수 내부에서 실행된는 코드이다.</Text>
			</Option>
		</QuizzWithOptions>

		<QuizzWithOptions answer={4} question="3. 함수를 만드는 이유에 관한 설명으로 틀린 것을 고르세요.">
			<Option value={1}>
				<Text>1. 함수를 사용하면 복잡한 코드를 다시 사용하기 편하게 만들어 준다.</Text>
			</Option>
			<Option value={2}>
				<Text>2. 함수의 추상화 수준을 높여준다.</Text>
			</Option>
			<Option value={3}>
				<Text>3. 함수를 사용하면 읽기 편한 코드를 만들 수 있다.</Text>
			</Option>
			<Option value={4}>
				<Text>4. 함수는 어렵기 때문에 사용하지 않는 것이 좋다.</Text>
			</Option>
		</QuizzWithOptions>

		<QuizzWithOptions answer={2} question="4. 함수의 매개변수와 인수에 관한 설명으로 틀린 것을 고르세요.">
			<Option value={1}>
				<Text> 1. 매개변수는 함수 내부에서만 사용되는 변수이다.</Text>
			</Option>
			<Option value={2}>
				<Text> 2. 매개변수는 함수 밖에서 사용 가능하다.</Text>
			</Option>
			<Option value={3}>
				<Text> 3. 함수 실행시 인수를 통해서 매개변수에 값을 전달 할 수 있다. </Text>
			</Option>
			<Option value={4}>
				<Text> 4. 매개변수가 정의된 함수에서 함수를 실행시, 매개변수가 사용할 값이 없다면 오류가 생길 수 있다. </Text>
			</Option>
			<Option value={5}>
				<Text> 5. 인수는 영어로 argument이다. </Text>
			</Option>
		</QuizzWithOptions>

		<QuizzWithOptions answer={3} question="5. 아래의 코드에 관한 설명으로 틀린 것을 고르세요.">
			<CodeBlock code={
`# 믹서기 함수
def blender(fruit="사과"):
	return fruit + " 주스"
	print("믹서기 함수 실행 종료")

juice = blender(grape)
print(juice)
`
}/>
			<Option value={1}>
				<Text>1. <Code>fruit</Code>는 <Code>blender</Code> 함수의 매개변수이다.</Text>
			</Option>
			<Option value={2}>
				<Text>2. <Code>print</Code>는 <Code>juice</Code>를 인수로 사용하고 있다.</Text>
			</Option>
			<Option value={3}>
				<Text>3. 이 코드는 오류가 없다.</Text>
			</Option>
			<Option value={4}>
				<Text>4. <Code>blender</Code> 함수의 안에 있는 <Code>print("믹서기 함수 실행 종료")</Code>는 실행되지 않는다.</Text>
			</Option>
			<Option value={5}>
				<Text>5. <Code>blender</Code> 함수 실행시 인수를 받지 않아도 실행시 오류가 없다.</Text>
			</Option>
		</QuizzWithOptions>


			<NextAndPrev
			prev={"/pythonWebScrapper/variable_string_boolean"}
			prevPage="변수, 문자열, 불리안"
			next={"/pythonWebScrapper/challenge_hello"}
			nextPage="도전! say_hello()"
			/>
		</div>
	)
}

