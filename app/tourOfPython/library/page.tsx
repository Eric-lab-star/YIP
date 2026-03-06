import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import { Link2 } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div className="mb-50">
			<Title my="m"> 라이브러리 - Library </Title>
			<Text>
			지금까지 파이썬을 공부하면서 열심히 파이썬 코드를 만드느라 힘들지 않았나요? 이렇게 작은 프로그램을 만드는 것도 힘든데 더 큰 프로그램들은 어떻게 만드는 걸까요? 다행이 착한 프로그래머들은 자신이 불편하다고 느끼고 반복적으로 자주하는  일들은 모두 공유하는 문화가 있어요. 자신의 코드를 공유하는 것을 오픈소스라고해요. 그리고 공유된 코드가 더 발전하도록 도와주고 이용하는 사람들과 문화를 오픈소스 커뮤니티라고 해요. 개발자들이 서로서로 도와주기 때문에 프로그래밍이 이렇게 빠르게 발전할 수 있었어요.
			</Text>
			<Title my="m" size="h2">내장함수 - built-in</Title>
			<Text>
			내장함수는 파이썬을 처음 설치할 때 같이 설치되는 함수들이에요. 내장함수는 파이썬을 설치할 때 같이 설치되는 미리 만들어진 함수들이에요. 비유하자면 잘 만들어진 바퀴, 연필, 샤프 심 같은 것들이에요. 만약 그림을 그리려고 하는데 매번 연필부터 만들어야 한다면 상상만 해도 정말 끔찍할 것 같아요. 연필은 미리 만들어진 것을 가져다 사용하고 내가 상상하는 것들은 내가 스스로 그리는 게 더 현명한 방법이겠어요. 정리하면 내장함수는 미리 만들어진 함수라고 이해하는게 좋겠네요. 
				<div className="my-1"/>
				<Link className="text-orange-500 hover:text-blue-500 " href={"https://docs.python.org/3/library/functions.html"} target="_blank">
					<div className=" flex items-center"> 더 많은 내장 함수 구경하기 <Link2 /> </div>
				</Link>
			</Text>
			<Title my="m" size="h2">input</Title>
			<Text>
			지금까지 계속 사용했던 <Code>input</Code>이 대표적인 내장함수에요. 이 함수는 키보드로 글자를 입력 받는 함수에요. 공식문서를 읽어보면 <Code>input(prompt, /)</Code> 이렇게 나와있어요. 여기에서 prompt는 입력 안내 문구가 들어가는 공간이에요.  
			</Text>
			<TwoColumn >
				<CodeBlock code={
`name = input("what is your name ")
`}/>
				<Text>
				"what is your name "이라는 문구를 출력해서 키보드에 무엇을 입력해야 하는지 알려주고 있어요. 키보드로 입력했다면 name이라는 변수에 저장이 돼요. 사용자는 엔터를 입력하지만 name이라는 변수에는 엔터는 저장이 되지 않아요. 엔터키를 누루면 줄바꿈 기호가 입력되는데, 이 기호를 때고 변수에 저장을 해요. 마지막으로 변수에 저장되는 값은 항상 문자열이에요. 
				</Text>
				
			</TwoColumn>
			<Title my="m" size="h2" >int, float</Title>
			<TwoColumn>
				<CodeBlock code={
`age = int("12") 
pi  = float("3.14")
`}/>
				<Text>
				<Code>int</Code> 와 <Code>float</Code>은 문자열 12를 int형 12로 바꾸어주고 문자열 3.14를 float형 3.14로 바꾸어 주고 있어요. 이런 식으로 형태를 변환하지 않으면 올바른 계산을 할 수가 없어요. 
				</Text>
			</TwoColumn>

			<Title my="m" size="h2" >len</Title>
			<TwoColumn>
				<CodeBlock code={
`len("hello")
`}/>
				<Text>
				<Code>len</Code>함수를 사용하면 문자열의 길이를 알수 있어요. 지금은 배우지 안았지만, 문자열 뿐만 아니라. 리스트의 길이도 나타낼 수 있어요. 
				</Text>
			</TwoColumn>
			
			<Title my="m" size="h2" >range</Title>
			<TwoColumn>
				<CodeBlock code={
`for i in range(5):
		print(i)
`}/>
				<Text>
				<Code>range</Code>는 for 루프를 사용할 때 범위를 만들어 주는 역할을 해요. <Code>range(5)</Code> 이렇게 5가 들어가면 0, 1, 2, 3, 4까지의 수의 범위를 의미하고 5는 포함하지 않아요. 
				</Text>
			</TwoColumn>

			<Title my="m" size="h2" >max, min</Title>
			<TwoColumn>
				<CodeBlock code={
`max(3, 10, 7)
min([5, 2, 9])
`}/>
				<Text>
				<Code>min</Code>은 가장 작은 수를 찾을 때 사용하고, <Code>max</Code>는 가장 큰수를 찾을 때 사용해요.
				</Text>
			</TwoColumn>

			<Title my="m" size="h2">표준 라이브러리 사용하기 </Title>
			<Text>
표준 라이브러리는 내장함수 처럼 파이썬을 설피할 때 같이 설치되는 미리 만들어진 함수들이에요. 하지만 몇가지 차이점이 있어요. 표준 라이브러리의 종류와 크기는 내장함수와 비교해서 더 크기 때문에 사용하고 싶은 것만 골라서 사용하도록 되어 있어요. 마치 도서관에서 원하는 책만 가져와서 읽어보는 것이라고 생각해볼 수 있어요.
				<div className="my-1"/>
				<Link className="text-orange-500 hover:text-blue-500 " href={"https://docs.python.org/3/library/index.html"} target="_blank">
					<div className=" flex items-center"> 더 많은 내장 표준라이브러리 구경하기 <Link2 /> </div>
				</Link>
			</Text>
			<Text>
종류가 너무 많고 다양하기 때문에 여기 있는 모든 함수와 사용방법을 외우지 않아요. 하지만 어떻게 가져오는지 알아둘 필요는 있어요.
			</Text>
			<div className="mb-4"/>

			<CodeBlock code={
`import random 

def get_rnd():
    return random.randint(0, 10)

def main():
    a = get_rnd()
    b = get_rnd()
    c = get_rnd()
    d = get_rnd()

    print(a, b, c, d)
`}/>
			<Text>
			먼저 가장 위에 있는 <Code>import</Code>라는 생소한 코드가 있어요. 이 코드를 입력해야 라이브러리로부터 함수를 가져올 수 있어요. 지금은 <Code>import random</Code> 이라고 입력을 했기 때문에 <Code>random</Code>을 가져오게 돼요.
			</Text>
			<div className="my-5"/>

			<TwoColumn>
			<CodeBlock code={
`def get_rnd():
	 return random.randint(0, 10)
`} />
			<Text>
			이제 가져온 라이브러리에서 특정한 함수를 사용하고 싶으면, 라이브러이 이름 뒤에 점을 붙여서 가져올 수 있어요. <Code>random.randint(0, 10)</Code> 이렇게 함수를 사용 할 수 있어요. 
			<div className="my-1" />
			이제 모든 코드를 작성하고 프로그램을 실행 시켜보면 프로그램이 실행 될 때 마다 출력되는 숫자가 달라지는 것을 볼수 있어요.
			</Text>
			</TwoColumn>

			<NextAndPrev 
			next="numberGuessingGame"
			nextPage="숫자 맞히기 게임"
			prev="loop"
			prevPage="반복문"
			/>

		</div>
	)
}
