import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
	return (
		<div>
			<Title my="m"> 이진 탐색 알고리즘이란? </Title>
			<Text my="m">
				알고리즘이라는 단어를 들어본적 있나요? 알고리즘이란 어떤 문제를 해결하는 방법을 의미해요. 알고리즘도 다양한 분야가 있는데 그 중에서 탐색 알고리즘의 한 종류인 이진 탐색 알고리즘을 연구해보는게 이번 과제에요.
			</Text>

			<NextAndPrev
			next="challenge_fibonacci"
			nextPage="도전! 피보나치 수열 만들기"
			prev="numberGuessingGame"
			prevPage="숫자 맞히기 게임"
			/>
		</div>
	)
}
