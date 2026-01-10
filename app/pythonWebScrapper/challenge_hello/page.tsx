import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Code } from "mongodb";
import Link from "next/link";

export default function Page() {
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
			<Title my="m" weight="semi" size="h2">제출 방법</Title>
			<Link target="_blank" href={"https://codesandbox.io/"}>
				<Text>1. 여기를 클릭해서 코드샌드박스로 이동! https://codesandbox.io </Text>
			</Link>
			<Text>2. 우측 상단에 signin 버튼 클릭!</Text>
			<Text>3. 구글, 깃허브, 애플 계정으로 로그인.</Text>
			<Text>4. 우측 상단에 create 버튼 클릭!</Text>
			<Text>5. python 검색! </Text>
			<Text>6. 가장 왼쪽에 있는 python 클릭 </Text>
			<Text>7. create Devbox 클릭 </Text>
			<Text>8. 왼쪽에서 main.py 클릭 </Text>
			<Text>9. 중앙에 있는 시작버튼 누르면 코드가 실행됩니다. </Text>

		</div>
	)
}
