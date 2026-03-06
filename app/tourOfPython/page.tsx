import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Link from "next/link";


export default async function Page(){

	return <div className="pb-50 ">

		<Title> Tour of Python </Title>
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


		<Title size="h2" my="l"> 파이썬으로 만든 대표적인 프로그램</Title>
		<Title size="h3" my="m"> 웹 서버 - Django</Title>
		<div className="my-3">
			<Text>1. 인스타그램</Text>
			<Text>2. 스포티파이</Text>
			<Text>3. DropBox</Text>
			<Text>4. 구글</Text>
			<Text>5. 페이스북</Text>
		</div>
		<Link href="https://cwn.kr/article/179564809806585">관련 뉴스보기</Link>

		<Title size="h3" my="l"> 게임 개발 - pygame </Title>
		<Title size="h3" my="l"> 파이썬으로 만든 대표적인 프로그램</Title>

	</div>
}
