import Howto from "@/components/codesandbox/Howto";
import CodeBlock from "@/components/commons/CodeBlock";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import ChallengForm from "@/components/forms/challenge/ChallengeForm";

export default async function Page() {
	
	return (
		<div className="mb-30">
			<Title my="m">첫번째 과제 - 안녕! 내 이름은() </Title>
			<Text> 지금까지 다양한 파이썬 문법들을 배워봤어요. 이제 재미있는 프로그램을 만들면서 몸 좀 풀어 볼까요? </Text>
			<Title my="m" weight="semi" size="h2">과제 목표 </Title>
			<Text>함수를 실행했을 때, 인사말을 이름과 함께 출력하는 프로그램을 만들어 보세요.</Text>
			<div />
			<Title weight="semi" my="m" size="h2">예시</Title>
			<CodeBlock code={`
def say_hello(name):
	# 인사말하는 코드

say_hello("정국")
## 실행결과
## "안녕하세요 저는 정국입니다!" 
				`}/>
			<Title my="m" weight="semi" size="h2">조건</Title>
			<Text>1. 매개변수를 이용해서 이름을 만들어야 해요.</Text>
			

			<Text>2. 함수를 실행할 때, 인수가 없어도 오류없이 작동해야 해요.</Text>
			<Howto />
			<ChallengForm  challenge="sayHello"/>
			<NextAndPrev
				prev="/pythonWebScrapper/functions"
				prevPage="함수"
				next="/pythonWebScrapper/challenge_arithmetic"
				nextPage="도전! 사칙연산"
			/>

		</div>
	)
}
