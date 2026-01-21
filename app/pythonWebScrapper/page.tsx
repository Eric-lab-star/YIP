import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { LibraryBig, Rabbit, Snail } from "lucide-react";
import Link from "next/link";


export default async function Page(){

	return <div className="pb-50">
		<Title> Python Web Scrapper</Title>
		<Title my="m" size="h2" weight="semi">요구되는 사전 지식</Title>
		<Text>인터넷을 사용할 수 있는 사람이면 누구나</Text>
		<Title my="l" size="h2" weight="semi">🐍 파이썬이란 무엇인가</Title>
		<Text>
파이썬은  컴퓨터에게 말을 걸 수 있는 쉬운 언어예요.  우리가 한국어로 이야기하듯이, 컴퓨터와는 파이썬 말로 이야기해요.  일상생활로 비유하면 리모컨을 생각해 보세요. 버튼을 누르면 TV 가 켜지고, 채널이 바뀌죠? 파이썬은 컴퓨터 리모컨이에요. 우리가 버튼, 즉 코드를 입력하면 컴퓨터가 그대로 행동해요!
		</Text>

		<Title my="l" size="h2" weight="semi"> 파이썬으로 무엇을 할 수 있는가 </Title>
		<div className="px-3 space-y-2">
			<Text> 🧮 계산하기</Text>
			<Text>🎲 게임 만들기</Text>
			<Text>🎨 그림 그리기</Text>
			<Text>🤖 똑똑한 AI 만들기</Text>
		</div>

		<Title weight="semi" size="h2" my="l"> 왜 파이썬이 좋은가 </Title>
		<div className="px-3 space-y-2">
			<Text> 📖 글처럼 읽혀서 어렵지 않아요</Text>
			<Text> ✨ 짧게 써도 많은 일을 해요</Text>
			<Text> 🐤 처음 코딩 배우는 사람에게 딱 좋아요</Text>
		</div>

		<Title weight="semi" size="h2" my="l"> 파이썬이 예제 </Title>
		<CodeBlock code={
`# 파이썬으로 피보나치 수열의 n번째 숫자 구하기 
def fibonacci(n):
    a = 0
    b = 1
    
    # Check if n is less than 0
    if n < 0:
        print("Incorrect input")
        
    # Check if n is equal to 0
    elif n == 0:
        return 0
      
    # Check if n is equal to 1
    elif n == 1:
        return b
    else:
        for i in range(1, n):
            c = a + b
            a = b
            b = c
        return b

print(fibonacci(9)) `
		}/>

		<Title weight="semi" size="h2" my="l">시작하기 전 알아두기</Title>
		<div className="px-3 space-y-2">
			<Text>1. 🙅‍♂️ 파이썬을 깊게 다루는 강의가 아니다.</Text>
			<Text>2. 😴 초반에는 지루할 수 있다.</Text>
			<Text>3. ✔️ 필요한 것들만 배운다.</Text>
		</div>

		<Title weight="semi" size="h2" my="l">프로젝트를 완성하면서 파이썬을 배운다</Title>
		<div className="px-3 space-y-2">
			<Text>1. 🙅‍♂️  타이핑만 하지 않아서 좋아요</Text>
			<Text>2. 😴  문법만 배우지 않아서 재미있어요.</Text>
			<Text>3. ✔️  아두이노를 제어할 수 있어요.</Text>
		</div>

		<Text my="l">
			넓은 파이썬 세계를 한번에 배울 수는 없어요. 필요한 부분만 배울 거에요. 초반에는 이론적인 부분을 배우기 때문에 이것을 왜 배우지 의심할 수 있지만, 견디고 따라온다면 멋진 파이썬 프로그램을 만들 수 있게 될 거에요. 
		</Text>
		<div className="my-3 flex items-center space-x-2">
			<LibraryBig className="text-teal-600"/>
			<Title mx="x" weight="semi" size="h2">교육과정</Title>
		</div>

		<Link id="day_1" href="/pythonWebScrapper#day_1"> 
			<div className="flex items-center space-x-2">
				<Snail className="text-blue-300"/>
				<Title mx="x" weight="semi" size="h2">Day 1</Title>
			</div>
		</Link>
		<div className="flex flex-col">
			<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/pythonSandBox"}>
				<Text weight="bold" my="m"> 📕 Python SandBox.io 소개</Text>
			 </Link>
			<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/variable_string_boolean"}>
				<Text weight="bold"my="m" >📗 변수, 문자열, 불리안</Text>
			</Link>
			<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/functions"}>
				<Text weight="bold" my="m"> 📘 파이썬 함수</Text>
			</Link>
			<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/challenge_hello"}>
				<Text weight="bold" my="m"> 📙 도전! say_hello()</Text>
			 </Link>
			<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/challenge_arithmetic"}>
				<Text  weight="bold" my="m"> 📙 도전! 사칙연산</Text>
			</Link>
		</div>
		<div className="border-b-zinc-400 border-b border-dashed my-10"/>

		<Link id="day_2" href="/pythonWebScrapper#day_2"> 
			<div className="flex items-center space-x-2">
				<Rabbit className="text-red-300"/>
				<Title mx="x" weight="semi" size="h2">Day 2</Title>
			</div>
		</Link>
		<div className="flex flex-col">
			<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/input_type_int"}>
				<Text weight="bold" my="m"> 📘 input(), type(), int()</Text>
			</Link>
			<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/if"}>
				<Text weight="bold" my="m"> 📕 if, else and elif</Text>
			 </Link>
			<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/cat_or_dog"}>
				<Text weight="bold"my="m" >📗 고양이와 강아지</Text>
			</Link>
			<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/challenge_hello"}>
				<Text weight="bold" my="m"> 📙 도전! say_hello()</Text>
			 </Link>
			<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/challenge_arithmetic"}>
				<Text  weight="bold" my="m"> 📙 도전! 사칙연산</Text>
			</Link>
		</div>

	</div>
}
