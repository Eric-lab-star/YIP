import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import { Code2, Link2 } from "lucide-react";
import Link from "next/link";

export default function Page(){
	return (
		<div>
			<Title my="m" size="h1"> 숫자 맞히기 게임 </Title>
			<Text my="m">
			이번에는 숫자 맞추기 게임을 만들어 볼 거예요. 지금까지 배운 것들을 활용해서 이렇게 재미있는 게임을 만들 수 있다는 점에 놀라지 않을 수 없을 거예요. 게임 방식은 아주 간단해요. 컴퓨터가 생각하고 있는 랜덤한 숫자를 사용자가 알아맞히면 되는 간단한 게임이에요. 3회 안에 정답을 입력하면 사용자가 승리하고 3회를 넘어가면 컴퓨터의 승리예요.
			</Text>
			<Title my="m" size="h2"> 활용할 지식 모음 </Title>
			<Title my="x" size="h3">알고 있는 것</Title>
				<div className="px-1">
					<Text> 1. 내장 함수 <Code> print</Code> </Text>
					<Text> 2. 표준 라이브러리  <Code> random</Code> </Text>
					<Text> 3. 반복문  <Code> while </Code> </Text>
					<Text> 4. 조건문 <Code> if...elif...else</Code> </Text>
					<Text> 5. 변수 만들기</Text>
				</div>
			<Title my="x" size="h3">새롭게 배울 것</Title>
				<Text mx="m">1. 예외 처리 <Code>try...except</Code></Text>
			<div className="border-dashed border-zinc-200 border-1 my-3"/>
			<Title my="m" size="h2"> 게임 환영 타이틀 만들기 </Title>
			<TwoColumn>
			<CodeBlock code={
`# main.py
def main():
	print("number guessing game") # 게임 타이틀
main() # main 함수 호출
`}/>
			<Text> <Code>main()</Code> 내부에 게임관련 중요한 로직을 만들거예요. <Code>print()</Code>는 게임이 실행 될 때 어떤 게임인지 알려주는 제목이에요. 간단 하지만 의미는 확실하게 전달 할 수 있을 것 같아요. </Text>
			</TwoColumn>
			<Title my="m" size="h2"> while 루프 만들기  </Title>
			<TwoColumn>
			<CodeBlock code={
`# main.py
def main():
	print("number guessing game")
	chances = 3
	attempts = 0
	while attempts < chances:
		input("guess my number: ")
		attempts += 1

main()

`}/>
			<Text> 코드가 위에서 아래로 한 번만 실행돼서는 안 되겠네요. <Code>while</Code>을 넣어서 게임이 반복되게 만들어요. 하지만 무한히 반복되면 안 되고 종료되는 조건이 필요해 보여요. 이 게임은 기회가 3번뿐임으로 시도 횟수가 3을 넘어가면 반복을 종료하게 만드는 건 어떨까요.
				<div className="my-3"/>
				그리고 매번 시도할 때 마다 변수 <Code>attemps</Code>에 1을 더해주면 몇번 시도했는지 알 수 있겠네요.
			</Text>
			</TwoColumn>

			<TwoColumn>
			<CodeBlock code={
`# main.py
def main():
    print("number guessing game")
    chances = 3
    attempts = 0
    while attempts < chances:  # while 조건
        input("guess my number: ")
        attempts += 1
    else: # while 조건이 거짓일 때만 실행 됨
        print("you lose")

main()
`}/>
			<Text>
			3번의 기회를 모두 사용했다면 <Code>attempts</Code>가 3이 돼요. 이렇게 되면, <Code>while</Code> 반복문 실행 조건이 참이 되지 않기 때문에 반복문이 종료되고 else로 넘어가게 돼요. 결국 <Code>print("you lose")</Code>가 실행이 되는 것이에요.
					<div className="my-2"/>
				이제 기본적인 틀이 만들어졌어요. 여기에 사용자가 입력한 값이  컴퓨터가 생각하고 있는 숫자와 같은지 확인하는 코드만 만들면 게임 완성이에요.
			</Text>
			</TwoColumn>

			<Title size="h2" my="m">랜덤 숫자 생성하기 </Title>
			<TwoColumn>
			<CodeBlock code={
`#main.py
import random  # <-- 라이브러리 가져오기

def main():
    print("number guessing game")
    answer = random.randint(1, 11) # < -- 난수 생성
    chances = 3
    attempts = 0
    while attempts < chances:
        user_input = int(input("guess my number: ")) # <--- int형으로 바꾸기
        attempts += 1
    else:
        print("you lose")

main()
`}/>
			<Text>
				우선, 랜덤 숫자를 만들기 위해서는 <Code>import random</Code>을 사용해서 라이브러리를 가져와요. 그리고 1에서 10 사이의 랜덤한 숫자를 만들기 위해서 <Code>random.randint(1, 11)</Code>코드를 입력할 거예요. 
					<div className="my-1"/>
				또한 숫자를 알아맞히는 게임이기 때문에 사용자가 입력한 값을 int 형으로 바꿔줄 거예요. 이제 프로그램을 실행시키고 숫자를 입력하지 않고 엔트를 누르면 이상한 메시지가 나오면서 프로그램이 종료되는 것을 알 수 있어요. 

				
			</Text>
			</TwoColumn>

			<Title size="h2" my="m">예외 처리하기</Title>
			<TwoColumn>
			<CodeBlock code={
`#main.py
import random  

def main():
    print("number guessing game")
    answer = random.randint(1, 11) 
    chances = 3
    attempts = 0
    while attempts < chances:
        try: # <-- 예외를 잡는 코드
            user_input = int(input("guess my number: ")) # <-- int 예외 발생
            attempts += 1
        except ValueError: # <-- ValueError 발생하면 실행
            print("Invalid input. Only numbers are allowed")
    else:
        print("you lose")

main()
`}/>
			<Text>
			<Code>int</Code> 함수는 내장함수에요. 이 함수는 문자열을 int 형으로 바꿔주는 역할을 할 수 있어요. 하지만 숫자로 바꿀 수 없는 문자열도 있어요. 예를 들어 "안녕"이라는 단어는 숫자로 바꿀수 없어요. 이렇게 예외가 발생하면 프로그램이 종료가 되기 때문에 예외를 잡아주는 코드가 필요해요. 
				<div className="my-2"/>
			예외를 잡아주는 코드는 <Code>try...except</Code>에요. <Code>try</Code> 내부에서 예외가 발생했으면 코드의 흐름이 <Code>except</Code>로 이동하게 돼요. <Code>except</Code>에서 반복을 종료하지 않으면 다시 반복문으로 이동하게 되어요.
				<div className="my-1"/>
			</Text>
			</TwoColumn>

			<Title size="h2" my="m">정답인가요? 아닌가요?</Title>
			<TwoColumn>
			<CodeBlock code={
`#main.py
def main():
    print("number guessing game")
    answer = random.randint(1, 11)
    chances = 3
    attempts = 0
    while attempts < chances:
        try:
            user_input = int(input("guess my number: ")) 
            if isCorrect(answer, user_input): # <--- 정답 확인 코드
                break # <--- 정답이면 반복 중단
            else:
                attempts += 1 # <-- 오답이면 시도횟수 증가
        except ValueError:
            print("숫자를 입력하세요")
    else:
        print("you lose")

main()
`}/>
			<Text>
			미리 알려주면, 이 코드는 아직 완성되지 않은 코드에요.
				<div className="my-2"/>
			정답을 확인하는 코드는 <Code>isCorrect</Code> 함수에서 할 거예요. 만약 정답이면 <Code>isCorrect </Code> 는 <Code>True</Code>를 반환하고 거짓이면, <Code>False</Code> 를 반환할거예요. 
				<div className="my-2"/> 
			<Code>isCorrect</Code> 함수는 <Code>main</Code> 밖에 만들 거예요. 이렇게 함수를 분리하는 이유는 함수의 가독성을 높이기 위해서예요. 모든 코드를 한 곳에 작성하면 너무 길어지기 때문에 마치 코드가 스파게티처럼 보이게되요. 코드가 어떻게 흘러가는지 알수 없는 상태가 되어버리는 거예요.
				<div className="my-3"/>
				<Link className="w-fit flex items-center text-orange-400 hover:text-blue-500" href={"https://namu.wiki/w/%EC%8A%A4%ED%8C%8C%EA%B2%8C%ED%8B%B0%20%EC%BD%94%EB%93%9C"}> 
					스파게티 코드 더 알아보기 <Link2 />
				</Link>
				<div className="my-3"/>
				스파게티 코드를 막기 위해서는 하나의 함수에 한 가지 역할만 지정하세요. 또한 코드가 길어지면 함수를 분리하세요. 
			</Text>
			</TwoColumn>


			<Title size="h2" my="m">isCorrect() 함수 구현하기</Title>
			<TwoColumn>
			<CodeBlock code={
`#main.py
def isCorrect(answer, user_input):
    if user_input > answer:
        print(f"{user_input} 보다 작은 수입니다.")
        return False
    elif user_input < answer:
        print(f"{user_input} 보다 큰 수입니다.")
        return False
    elif user_input == answer:
        print("정답입니다.")
        return True
`}/>
			<Text>
			<Code>isCorrect()</Code> 함수는 <Code>main</Code>함수 밖에 어디에도 작성해도 문제없어요. 하지만 <Code>main</Code> 호출 이전에 작성해야 돼요. 
			<div />
			</Text>
			</TwoColumn>
			<Title my="l"> 전체 코드 확인하기 </Title>
			<CodeBlock code={
`# main.py 
import random

def isCorrect(answer, user_input):
    """
    사용자가 입력한 답과 정답을 비교하는 함수. 정답일 경우 True를 반환하고
    다른 모든 경우에는 False를 반환한다.
    """
    if user_input > answer:
        print(f"{user_input} 보다 작은 수입니다.")
        return False
    elif user_input < answer:
        print(f"{user_input} 보다 큰 수입니다.")
        return False
    elif user_input == answer:
        print("정답입니다.")
        return True

def main():
    """
    실제 게임 로직이 진행되는 함수
    """
    print("number guessing game")
    answer = random.randint(1, 11) 
    chances = 3 
    attempts = 0
    while attempts < chances: # 루프 종료 조건
        try: # int에서 발생하는 예외를 처리하기 위한 try 블록
            user_input = int(input("guess my number: ")) #  input은 문자열 값을 반환하기 때문에 int형으로 변경해줌 
            if isCorrect(answer, user_input): # <--- 정답 확인 코드
                break # <--- 정답이면 반복 중단
            else:
                attempts += 1 # <-- 오답이면 시도횟수 증가
        except ValueError: # 예외 발생시 실행되는 블록
            print("숫자를 입력하세요")
    else:
        print("you lose")

main()
`}/>

			<NextAndPrev
			prev="loop"
			prevPage="반복문 loop"
			next="challenge_binary_search"
			nextPage="도전과제 - 이진탐색"
			/>
		</div>
	)
}


