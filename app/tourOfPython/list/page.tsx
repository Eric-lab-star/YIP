import CodeBlock from "@/components/commons/CodeBlock";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";

export default function Page() {
	return (
		<div className="p-5">
			<Title my="m" size="h1"> 리스트list [a, b, c] </Title>
			<Text>
지금까지 우리는 숫자랑 글자(문자열)에 대해서 배웠는데요, 숫자랑 글자만으로는 불편한 경우가 생겨요! 예를 들어 1부터 10까지 숫자 중에서 홀수만 모아보면 1, 3, 5, 7, 9가 되는데, 이걸 숫자나 글자로 표현하려면 너무 불편하겠죠? 마치 소풍 갈 때 가방 없이 김밥, 음료수, 과자를 손으로 들고 가는 것처럼요! 그래서 파이썬에는 여러 가지를 한 번에 담을 수 있는 가방 같은 것이 있는데, 그게 바로 오늘 배울 <Text weight="bold" style="inline-block" mx="x" size="sm">리스트(list)</Text>예요!
			</Text>
			<Title  my="l" size="h2">리스트 만드는 방법 </Title>
			<CodeBlock code={
`#리스트 만들기 
numbers = [1, 2, 3, 4, 5]
`
			}/>
			<Text my="l">
			리스트를 만들 때는 대괄호(`[]`)를 가방이라고 생각하면 돼요. 가방 안에 물건을 넣을 때 하나씩 쉼표(`,`)로 구분해서 넣어주면 끝이에요! 예를 들어 소풍 가방을 싼다면 `["김밥", "음료수", "과자"]` 이렇게 만들 수 있어요! 참 쉽죠? 
			</Text>

			<HorizontalLine />

			<Title my="l" size="h2">리스트의 특징</Title>
			<TwoColumn>


			<CodeBlock code={
`
any_list = [1, "안녕", True, 3.14]
`
			} />
			<Text>1. 여러 자료형을 한 번에 담을 수 있어요.</Text>
			</TwoColumn>

			<Title my="l" size="h3">2. 순서가 있어요.</Title>
			<CodeBlock code={
`
fruits = ["사과", "바나나", "딸기"]
print(fruits[0])   # 사과  ← 0번부터 시작!
print(fruits[1])   # 바나나
print(fruits[-1])  # 딸기  ← 뒤에서 첫 번째
`
			} />


			<Title my="l" size="h3">3. 값을 바꿀수 있어요.</Title>
			<CodeBlock code={
`
fruits = ["사과", "바나나", "딸기"]
fruits[0] = "포도"
print(fruits)  # ["포도", "바나나", "딸기"]

`
			} />

			<Title my="l" size="h3">1. 여러 자료형을 한 번에 담을 수 있어요.</Title>
			<CodeBlock code={
`

`
			} />


			<Title my="l" size="h3">1. 여러 자료형을 한 번에 담을 수 있어요.</Title>
			<CodeBlock code={
`

`
			} />
		</div>
	)

}
