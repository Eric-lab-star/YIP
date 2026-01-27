import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";

export default function Page(){
	return (
		<div>
			<Title my="m">반복문 Loop</Title>
			<Text>
한번 농부가 되었다고 상상을 해봐요. 밭에 당근을 심을려고 모든 준비를 끝낸 상태에요. 당근 심기 작업 순서는 3 단계로 이루어져있어요. 
			</Text>
			<div className="my-3">
				<Text>
					1. 당에 구멍을 판다
				</Text>
				<Text>
					2. 당근 씨앗을 심는다.
				</Text>
				<Text>
					3. 물을 뿌린다.
				</Text>
			</div>
			<Text>
				정말 간단하네요. 하지만 안 좋은 소식은 심어야 할 당근이 256개라는 거예요. 사람이라면 오늘 못 끝내지만, 컴퓨터라면 가능하지 않을까요? 컴퓨터는 이런 반복적인 작업을 매우 잘해요. 컴퓨터는 이런 반복적인 작업을 빠르게 해낼 수 있는 최적의 도구예요. 여러분들의 자주하는 게임이나 동영상은 화면을 1초에 60번 이상 새로 그리고 있답니다.
			</Text>

			<Title size="h2" my="m"> 기본구조 </Title>
			<Text>
			같은 작업을 여러번 반복해서 하는 코드를 반복문이라고 해요. 파이썬에는 다양한 반복문이 있는데 그 중에서 2가지만 배울거예요. 하나는 <Code>while</Code>이고 다른 하나는 <Code>for.. in</Code>이에요.
			</Text>
			<Title size="h3" my="m">while </Title>
			<TwoColumn>
				<CodeBlock code={
`
count = 3
while count < 0:
	print(count)
	count = count - 1
`}/>
				<Text>
				먼저 확인할 것은 <Code>while</Code>이에요. <Code>while</Code> 코드 다음에는 조건을 입력해요. 그리고 입력한 조건이 참이면 계속 <Code>while</Code>을 실행하고, 거짓이면 <Code>while</Code> 코드 실행을 종료해요.
					<div className="h-3"/>
이 코드를 위에서부터 살펴보면 <Code>count</Code>의 값이 처음에 3이에요. 그 다음에 <Code>while</Code>문을 컴퓨터가 읽게됩니다. <Code>while</Code> 뒤에 오는 조건이 참이면, <Code>while</Code>내부에 있는 실행문을 실행합니다. 현제 count의 값이 3임으로 <Code>{"count < 0"}</Code> 이 값이 참이 됩니다. 조건이 참임으로 <Code>while</Code> 내부의 코드가 조건이 거짓일 때 까지 실행됩니다.
				</Text>
			</TwoColumn>
			<Title size="h3" my="m">for ... in</Title>
			<TwoColumn>
				<CodeBlock code={
`
for i in range(0, 4):
    print(i)
`}/>
				<Text>
				다음에 배워볼 루프는 <Code>for ..in</Code> 루프에요. <Code>range()</Code>는 0에서 부터 5 이전까지의 숫자의 범위를 의미해요. 그래서 <Code>for i in range(0, 5)</Code>를 한국어로 번역하면, "0에서 5 사이의 변수 i에 대해서" 라는 의미에요. 만약 변수 i가 0에서 5사이의 숫자가 아니라면 루프 내부의 코드를 실행하지않아요.
<div className="h-3"/>
<Code> for ... in </Code> 또한 다양한 곳에서 많이 사용되요. 다양한 곳에서 사용될 수 있기 때문에 잘 알아두세요.
				</Text>
			</TwoColumn>
			<Title size="h2" my="m"> 강제종료 - break </Title>
			<Text>
			이제 앞에서 배운 <Code>while</Code> 또는 <Code>for .. in</Code> 루프를 사용해서 당근을 빠르게 심을 수 있겠네요. 하지만 만약에 땅을 파다가 금이 나오거나, 물이 부족해지면 어떻게 해야할까요?  정지를 하고 다른 일을 해야할 상황이 생길 수 도 있는데 이런 상황에서 어떻게 해야 할까요? 이런 상황에서는 <Code>break</Code>

			</Text>

			<Title size="h2" my="m"> 스킵 - continue </Title>
			<Title size="h2" my="m"> 무한루프 </Title>
			<Title size="h2" my="m"> else </Title>
		</div>
	)
}
