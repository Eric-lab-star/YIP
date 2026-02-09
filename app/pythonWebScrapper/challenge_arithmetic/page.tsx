import Howto from "@/components/codesandbox/Howto";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import ChallengForm from "@/components/forms/challenge/ChallengeForm";

export default function Page() {
	return (
		<div className="mb-20">
			<Title my="m" size="h1"> 사칙연산 계산함수 만들기 </Title>
			<Title my="m" size="h2"> 과제의 목표</Title>
			<Text>
두 번째 도전 과제를 해볼까요? 이번에는 계산기를 만들어볼 거예요. 복잡한 기능은 만들지 않고, 사칙연산이 가능한 계산기를 만들거예요. 사칙연산은 덧셈, 곱샘, 뺄셈, 나눗셈을 의미해요. 
			</Text>
			<Title my="m" size="h2">달성 조건</Title>
			<Text> 1.더하기, 나누기 곱하기, 빼기 기능을 하는 함수 4개를 모두 만들어야 해요. </Text>
			<Text>2. 연산을 수행하는 함수는 결과 값을 반환 해야 해요. </Text>
			<Text>3. 2개 이상의 매개변수를 사용해야 해요.</Text>
			<CodeBlock code={`
print("계산기 version 0.1.0")

def add(x, y):
	# 더하기 
    pass
def subtract(x, y):
	# 빼기 
    pass
def divided(x, y):
	# 나누기
    pass
def multiply(x, y):
	# 곱하기
    pass

print("20 + 10 = ", add(20,10))
print("20 - 10 = ", subtract(20,10))
print("20 / 10 = ", divided(20,10))
print("20 * 10 = ", multiply(20,10))
				`}/>
			<Howto/>
			<ChallengForm challenge="basicCal"/>
			<NextAndPrev 
				next="/pythonWebScrapper"
				nextPage="파이썬"
				prev="/pythonWebScrapper/challenge_hello"
				prevPage="도전! say_hello()"
			/>
		</div>
	)
}
