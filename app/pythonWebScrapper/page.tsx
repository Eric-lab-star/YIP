import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { LibraryBig, Snail } from "lucide-react";
import Link from "next/link";


export default function Page(){
	return <div className="pb-50">
		<Title size="h1" text="Python Web Scrapper" />
		<Title size="h2" weight="semi" text="요구되는 사전 지식" />
		<Text  text="인터넷을 사용할 수 있는 사람이면 누구나" />
		<Title my="l" size="h2" weight="semi" text="🐍 파이썬이란 무엇인가" />
		<Text
		text=" 
파이썬은  컴퓨터에게 말을 걸 수 있는 쉬운 언어예요.  우리가 한국어로 이야기하듯이, 컴퓨터와는 파이썬 말로 이야기해요.  일상생활로 비유하면 리모컨을 생각해 보세요. 버튼을 누르면 TV 가 켜지고, 채널이 바뀌죠? 파이썬은 컴퓨터 리모컨이에요. 우리가 버튼, 즉 코드를 입력하면 컴퓨터가 그대로 행동해요!
		" />
		<Title my="l" size="h2" weight="semi" text="파이썬으로 무엇을 할 수 있는가" />
		<div className="px-3 space-y-2">
			<Text text="🧮 계산하기" />
			<Text text="🎲 게임 만들기" />
			<Text text="🎨 그림 그리기" />
			<Text text="🤖 똑똑한 AI 만들기" />
		</div>

		<Title text="왜 파이썬이 좋은가" weight="semi" size="h2" my="l"/>
		<div className="px-3 space-y-2">
			<Text text="📖 글처럼 읽혀서 어렵지 않아요" />
			<Text text="✨ 짧게 써도 많은 일을 해요" />
			<Text text="🐤 처음 코딩 배우는 사람에게 딱 좋아요" />
		</div>
		<CodeBlock code={
` #파이썬으로 "hello"를 출력하는 코드
def say_hello():
	print("hello") `
		}/>

		<Title text="시작하기 전 알아두기" weight="semi" size="h2" my="l"/>
		<div className="px-3 space-y-2">
			<Text text="1. 🙅‍♂️ 파이썬을 깊게 다루는 강의가 아니다." />
			<Text text="2. 😴 초반에는 지루할 수 있다." />
			<Text text="3. ✔️ 필요한 것들만 배운다." />
		</div>
		<Text my="l" text="넓은 파이썬 세계를 한번에 배울 수는 없어요. 필요한 부분만 배울 거에요. 초반에는 이론적인 부분을 배우기 때문에 이것을 왜 배우지 의심할 수 있지만, 견디고 따라온다면 멋진 파이썬 프로그램을 만들 수 있게 될 거에요. "/>
		<div className="flex items-center space-x-2">
			<LibraryBig className="text-teal-600"/>
			<Title mx="x" weight="semi" size="h2" text="교육과정" />
		</div>

		<div className="flex items-center space-x-2">
			<Snail className="text-blue-300"/>
			<Title mx="x" weight="semi" size="h2" text="Day 1" />
		</div>
		<div className="flex flex-col">
			<Link href={"/pythonWebScrapper/pythonSandBox"}>
				<Text weight="bold" text=" 📕 Python SandBox.io 소개" />
			 </Link>
			<Link href={"/pythonWebScrapper/variable_string_boolean"}>
				<Text weight="bold" text="📗 변수, 문자열, 불리안" />
			</Link>
			<Link href={"/pythonWebScrapper/functions"}>
				<Text weight="bold" text=" 📘 파이썬 함수" />
			</Link>
			<Link href={"/pythonWebScrapper/challenge_hello"}>
				<Text weight="bold" text=" 📙 도전! say_hello()" />
			 </Link>
			<Link href={"/pythonWebScrapper/challenge_arithmetic"}>
				<Text weight="bold" text=" 📙 도전! 사칙연산" />
			</Link>
		</div>



	</div>
}
