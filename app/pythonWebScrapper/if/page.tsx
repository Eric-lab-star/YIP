import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import Link from "next/link";

export default function Page(){
	return (
		<div className="mb-32">
			<Title my="m">if, else, elif</Title>
			<Link id="why"href="/pythonWebScrapper/if#why">
				<Title my="m" size="h2" weight="bold">if 문을 왜 사용할까?</Title>
			</Link>
			<Text>
“비가 오면 우산을 가져간다”, “숙제를 다 했으면 게임을 한다”, 혹은 “불이 빨간색이면 멈춘다”와 같이 선택을 하는 순간에 if 문을 사용해요.  컴퓨터는 스스로 판단을 하지 못하기 때문에 사람이 “이런 상황에서는 이렇게 해”라고 알려줘야 해요. 
			</Text>

			<TwoColumn>
				<CodeBlock code={
`if light == "red":
	print("stop")
					`}/>
				<Text>예를 들어서 “신호등이 빨간색이면 앞으로 가”라고 컴퓨터에게 알려주고 싶으면 이렇게 작성하면 되요.</Text>
			</TwoColumn>
			<TwoColumn>
				<CodeBlock code={
`if 조건:
	## 조건이 참일 경우 실행될 코드
`}/>
				<div>
					<Text>if문 작성는 이렇게 해요.</Text>
					<Text>1. if를 입력한다.</Text>
					<Text>2. 한 칸을 띄우고 조건을 작성한다.</Text>
					<Text>3. 조건 다음에 <Code>:</Code> 콜론을 작성한다</Text>
					<Text>4. 다음줄로 이동한다.</Text>
					<Text>5. 들여쓰기를 한다.</Text>
					<Text>6. 조건이 참일 때 실행할 코드를 작성한다.</Text>
				</div>
			</TwoColumn>
			<Link id="else"href="/pythonWebScrapper/if#else">
				<Title my="m" size="h2" weight="bold">else</Title>
			</Link>
			<Text>
이번에는 신분증 검사를 하는 상황이라고 가정해 봐요. 19세 이상이면 어른이고 19미만이면 미성년자이니까. 2가지 상황에 알맞는 코드가 필요하겠네요.  이런 상황에서는 else를 사용할 수 있어요.
			</Text>
			<TwoColumn>
				<CodeBlock code={
`if age < 19:
	print("당신은 미성년자입니다.")
else:
	print("당신은 어른입니다.")
`}/>
				<Text>
<Code>else</ Code>안에서는 if 조건이 거짓인 상황에서 실행되는 코드를 작성해 줘야해요. <Code>else</Code> 다음에 오는 콜론을 잊어버리지 마세요. <Code>else</Code> 안에서 작성되는 코드라는 것을 컴퓨터에게 알려줄 때는 들여쓰기를 해야 되요.
				</Text>
			</TwoColumn>

			<Link id="elif"href="/pythonWebScrapper/if#elif">
				<Title my="m" size="h2" weight="bold">elif</Title>
			</Link>
			<Text>
세상을 두가지 상황으로 구분할 수 있을까요? 학생의 성적을 A, B, C, D로 분류해야한는 상황이라면 어떻게 해야할까요. 이런 상황에서는 <Code>elif</Code>를 사용할 수 있어요. 
			</Text>
			<TwoColumn>
				<CodeBlock code={
`def grades(score):
    if score > 90:
        print("A")
    elif score > 80:
        print("B")
    elif score > 70:
        print("C")
    else:
        print("D")
`}/>
				<Text>elif는 다양한 상황에  대응 가능한 코드를 작성하도록 도와줘요.점수에 따라서 등급을 매길 때, 혹은 나이에 따라서 좌석이 달라질 때와 같은 상황에 자주 사용됩니다. 하지만  elif를 사용할 때 주의 할 점이 있어요. </Text>
			</TwoColumn>

			<TwoColumn>
				<CodeBlock code={
`def grades(score):
    if score < 90:
        print("1")
    elif score < 80:
        print("2")
    elif score < 70:
        print("3")
    else:
        print("4")

grades(70)
`}/>
				<Text>
위에서 조건문이 참이 된다면 다른 조건은 실행하지 않아요. 예를 들어서 여기 있는 score를 볼까요. 90보다 작은 숫자를 넣으면 가장 첫번째 if 에서 1을 출력하고 함수가 종료되요. 다른 elif나 else를 검사하지 않아요. 점수가 75점이나 80이나 모두 score는 90보다 작다는 조건이 참이 되게 함으로 print("1")이 실행하게되고. 다른 조건은 실행되지 않아요.
			</Text>
			</TwoColumn> 
		</div>
	)
}
