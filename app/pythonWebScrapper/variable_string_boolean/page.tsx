import { googleCode300 } from "@/app/stores/font";
import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";



export default function Page() {
	return (
		<div className="space-y-5">
			<Title text="변수, 문자열, 불리안"/>

			<Title size="h2"  text="변수 - variable"/>
			
			<div className="grid grid-cols-2">
				<CodeBlock code={
`
a = 2

` } />
				<Text my="s" text="변수는 데이터를 저장하는 이름표에요. 학교에서 기본적인 수학을 배운 사람이라면 왼쪽에 있는 코드에서 a의 값을 바로 알 수 있을 거예요. a의 값이 2라고 생각했다면 정답이에요.  a는 변수이며, a의 값은 2가 되는 거예요. 이 때 a를 변수 이름이라고 하고 2를 변수의 값이라고 해요." />
			</div>

			<div className="grid grid-cols-2">
				<CodeBlock code={
`
a = 2
b = 3
c = a + b
print(c)

` } />
				<Text my="s" text="변수 a, b, c를 만들었어요.  이 코드를 실행시키면 어떻게 되나요? 

a는 2 b는 3이기 때문에 c의 값은 5가 됩니다." />
			</div>

			<div className="grid grid-cols-2">
				<CodeBlock code={
`
a = 2
b = 3
c = a + b
a = 3
print(c)
` } />
				<div className="">
					<Text my="s" text="파이썬 코드는 위에서부터 아래로 실행됩니다. 코드의 실행 순서는 결과에 아주 큰 영향을 줘요.  왼쪽 코드를 실행했을 때 어떤 결과가 나오나요?" />	
					<div className="my-7"/>

					<Text my="s" text="a = 3으로 변경했지만, c의 값은 변경되지 않았어요. 변경되지 않은 이유는 `a = 3`이라는 코드가 `c = a + b`라는 코드보다 아래 있기 때문입니다. 한번 `a = 3` 코드를 `c = a + b` 코드 위에 작성하고 실행 결과를 비교해 보세요" />
					<span className={`text-rose-300 bg-zinc-300 ${googleCode300.className }`}>a = 3</span>
				</ div>
			</div>

	</div>
)
}
