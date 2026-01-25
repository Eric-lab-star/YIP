import Howto from "@/components/codesandbox/Howto";
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import ChallengForm from "@/components/forms/challenge/ChallengeForm";

export default function Page(){
	return(
		<div className="mb-50">
			<Title my="m">자율 주제!!!</Title>

			<Title my="m" size="h2"> 과제의 목표</Title>
			<Text>
			이번 과제는 <Code>if..elif...else</Code>를 이용한 프로그램을 만드는 자율 프로젝트 과제에요. 창의성과 상상력을 최대한 끄집어 내어서 프로그램을 개발해 보세요. 아무리 생각해도 어떻게 시작해야할지 모르겠다면 이런 주제는 어떤가요?
			</Text>
			<Text>
			<Text> 1. 단어 맞추기 </Text>
			<Text> 2. 수학 퀴즈 </Text>
			<Text> 3. 미성년자 판별 프로그램 </Text>
			<Text> 4. 아주 간단한 MBTI 검사 </Text>
			<Text> 5. 오늘 저녁 매뉴 추천 </Text>
		</Text>
			<Title my="m" size="h2">통과 조건</Title>
			<Text>1. <Code>if ..elif ..else</Code> 와 같은 조건문 사용 </Text>
			<Text>2. <Code>input</Code>함수를 사용해서 사용자가 프로그램에 값을 입력할 수 있어야함</Text>
			<CodeBlock code={`
# 자율주제

def math_quizz():
	print("수학 문제를 모두 맞춰라!")
	print("1 + 1 의 계산 결과로 알맞은 것은?")
	print("1. 2")
	print("2. 3")
	print("3. 3")
	ans = input("답: ).trim();
	if ans == "1":
			pass
	elif ans == "2": 
		pass
				`}/>
			<Howto/>
			<ChallengForm challenge="ifChallenge"/>
			<NextAndPrev 
				next="/pythonWebScrapper"
				nextPage="파이썬"
				prev="/pythonWebScrapper/cat_or_dog2"
				prevPage="고양이 또는 강아지 2"
			/>
			

		</div>
	)
}
