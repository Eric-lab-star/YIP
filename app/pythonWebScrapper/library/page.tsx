import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
	return (
		<div className="mb-50">
			<Title my="m"> 라이브러리 - Library </Title>
			<Text>
			지금까지 파이썬을 공부하면서 열심히 파이썬 코드를 만드느라 힘들지 않았나요? 이렇게 작은 프로그램을 만드는 것도 힘든데 더 큰 프로그램들은 어떻게 만드는 걸까요? 다행이 착한 프로그래머들은 자신이 불편하다고 느끼고 반복적으로 자주하는  일들은 모두 공유하는 문화가 있어요. 자신의 코드를 공유하는 것을 오픈소스라고해요. 그리고 공유된 코드가 더 발전하도록 도와주고 이용하는 사람들과 문화를 오픈소스 커뮤니티라고 해요. 개발자들이 서로서로 도와주기 때문에 프로그래밍이 이렇게 빠르게 발전할 수 있었어요.
			</Text>
			<Title my="m" size="h2">내장함수 - built-in</Title>
			내장함수는 파이썬을 처음 설치할 때 같이 설치되는 함수들이에요. 


			<Title size="h2">표준 라이브러리 - Standard Library</Title>

			<Title size="h2">외부 라이브러리 - PyPi</Title>
			<NextAndPrev 
			next="숫자 맞추기 게임 만들기"
			nextPage="numberGuessingGame"
			prev="loop"
			prevPage="반복문"
			/>

		</div>
	)
}
