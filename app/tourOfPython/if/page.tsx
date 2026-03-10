import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";
import Link from "next/link";

export default function Page(){
	return (
		<div className="pb-32 max-w-3xl mx-auto">

			{/* Hero Section */}
			<div className="relative rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 p-8 mb-10 overflow-hidden">
				<div className="absolute top-0 right-0 text-[120px] leading-none opacity-10 select-none pointer-events-none">⚡</div>
				<div className="relative z-10">
					<span className="inline-block text-xs font-semibold tracking-widest text-amber-600 uppercase bg-amber-200 px-3 py-1 rounded-full mb-4">
						조건문
					</span>
					<Title my="s">if, else, elif</Title>
					<Text my="m" style="text-gray-600">코드가 스스로 판단하게 만드는 방법을 배워봐요.</Text>
				</div>
			</div>

			{/* if 문을 왜 사용할까? */}
			<section className="mb-10">
				<Link id="why" href="/tourOfPython/if#why">
					<div className="flex items-center gap-3 mb-4">
						<span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">조건문</span>
						<Title my="x" size="h2" weight="bold">if 문을 왜 사용할까?</Title>
					</div>
				</Link>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4">
					<Text>
						"비가 오면 우산을 가져간다", "숙제를 다 했으면 게임을 한다", 혹은 "불이 빨간색이면 멈춘다"와 같이 선택을 하는 순간에 if 문을 사용해요.  컴퓨터는 스스로 판단을 하지 못하기 때문에 사람이 "이런 상황에서는 이렇게 해"라고 알려줘야 해요.
					</Text>
				</div>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4">
					<TwoColumn pb={false}>
						<CodeBlock code={
`if light == "red":
	print("stop")
					`}/>
						<Text>예를 들어서 "신호등이 빨간색이면 앞으로 가"라고 컴퓨터에 알려주고 싶으면 이렇게 작성하면 돼요.</Text>
					</TwoColumn>
				</div>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
					<TwoColumn pb={false}>
						<CodeBlock code={
`if 조건:
	## 조건이 참일 경우 실행될 코드
`}/>
						<div>
							<Text><Code>if</Code>문 작성는 이렇게 해요.</Text>
							<div className="mt-3 space-y-2">
								<div className="flex items-start gap-2.5">
									<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
									<Text my="x">if를 입력한다.</Text>
								</div>
								<div className="flex items-start gap-2.5">
									<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
									<Text my="x">한 칸을 띄우고 조건을 작성한다.</Text>
								</div>
								<div className="flex items-start gap-2.5">
									<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
									<Text my="x">조건 다음에 <Code>:</Code> 콜론을 작성한다</Text>
								</div>
								<div className="flex items-start gap-2.5">
									<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">4</span>
									<Text my="x">다음줄로 이동한다.</Text>
								</div>
								<div className="flex items-start gap-2.5">
									<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">5</span>
									<Text my="x">들여쓰기를 한다.</Text>
								</div>
								<div className="flex items-start gap-2.5">
									<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">6</span>
									<Text my="x">조건이 참일 때 실행할 코드를 작성한다.</Text>
								</div>
							</div>
						</div>
					</TwoColumn>
				</div>
			</section>

			{/* else */}
			<section className="mb-10">
				<Link id="else" href="/tourOfPython/if#else">
					<div className="flex items-center gap-3 mb-4">
						<span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">선택 실행</span>
						<Title my="x" size="h2" weight="bold">else</Title>
					</div>
				</Link>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4">
					<Text>
						이번에는 신분증 검사를 하는 상황이라고 가정해 봐요. 19세 이상이면 어른이고 19세 미만이면 미성년자이니까, 2가지 상황에 알맞은 코드가 필요하겠네요. 이런 상황에서는 else를 사용할 수 있어요.
					</Text>
				</div>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4">
					<TwoColumn pb={false}>
						<CodeBlock code={
`if age < 19:
	print("당신은 미성년자입니다.")
else:
	print("당신은 어른입니다.")
`}/>
						<Text>
							<Code>else</Code>안에서는 if 조건이 거짓인 상황에서 실행되는 코드를 작성해 줘야해요. <Code>else</Code> 다음에 오는 콜론을 잊어버리지 마세요. <Code>else</Code> 안에서 작성되는 코드라는 것을 컴퓨터에게 알려줄 때는 들여쓰기를 해야 되요.
						</Text>
					</TwoColumn>
				</div>

				{/* 연습과제 */}
				<div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
					<span className="inline-block bg-amber-200 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">연습과제</span>
					<TwoColumn pb={false}>
						<CodeBlock code={
`if age < 19:
	print("당신은 미성년자입니다.")
else:
	print("당신은 어른입니다.")
`}/>
						<div className="space-y-2">
							<div className="flex items-start gap-2.5">
								<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
								<Text my="x"><Code>age</Code> 의 값을 <Code>input()</Code> 으로 받으세요.</Text>
							</div>
							<div className="flex items-start gap-2.5">
								<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
								<Text my="x"><Code>age</Code> 의 형태를 <Code>int</Code>형으로 바꾸세요</Text>
							</div>
							<div className="flex items-start gap-2.5">
								<span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
								<Text my="x"><Code>age</Code>의 값이 19일 때 "당신은 미성년자입니다"가 나오게 만드세요.</Text>
							</div>
						</div>
					</TwoColumn>
				</div>
			</section>

			{/* elif */}
			<section className="mb-10">
				<Link id="elif" href="/tourOfPython/if#elif">
					<div className="flex items-center gap-3 mb-4">
						<span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">다중 조건</span>
						<Title my="x" size="h2" weight="bold">elif</Title>
					</div>
				</Link>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4">
					<Text>
						세상을 두가지 상황으로 구분할 수 있을까요? 학생의 성적을 A, B, C, D로 분류해야한는 상황이라면 어떻게 해야할까요. 이런 상황에서는 <Code>elif</Code>를 사용할 수 있어요.
					</Text>
				</div>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4">
					<TwoColumn pb={false}>
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
				</div>
				<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4">
					<TwoColumn pb={false}>
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
							파이썬이 <Code>if...elif...elif..else</Code> 와 같은 조건문을 판단할 때, 한번 참인 조건을 발견하면 다른 조건문은 판단하지 않아요. 예를 들어서 여기 있는 <Code> score</Code>를 볼까요. 90보다 작은 숫자를 넣으면 가장 첫번째 <Code>if</Code>에서 1을 출력하고 함수가 종료되요. 다른 <Code>elif</Code>나 <Code>else</Code>를 검사하지 않아요. 점수가 75점이나 80이나 모두 <Code>score</Code>는 90보다 작다는 조건이 참이 되게 함으로 <Code>print("1")</Code>이 실행하게되고. 다른 조건은 실행되지 않아요.
						</Text>
					</TwoColumn>
				</div>

				{/* 연습문제 */}
				<div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
					<span className="inline-block bg-amber-200 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">연습문제</span>
					<TwoColumn pb={false}>
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
						<Text>
							1. 이 함수를 실행시켜서 90점일경우 A가 나오게 만드세요.
						</Text>
					</TwoColumn>
				</div>
			</section>

			{/* 퀴즈 */}
			<section className="mb-10">
				<Link href={"/tourOfPython/if#quizz"} id="quizz">
					<div className="flex items-center gap-3 mb-6">
						<span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">퀴즈</span>
						<Title my="x" size="h2">퀴즈</Title>
					</div>
				</Link>
				<div className="space-y-6">
					<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
						<QuizzWithOptions answer={3} question="1.다음 코드에 관한 설명으로 틀린 것을 고르세요">
							<CodeBlock code={
`#if else 연습문제
user_input = int(input("당신은 몇살 입니까?\\n"))

if user_input > 19:
    print("당신은 미성년자가 아닙니다.")
else:
    print("당신은 미성년가가 맞습니다.")

			`}/>
							<Option value={1}>
								<Text>1. 사용자의 입력을 user_input으로 받을 수 있다. </Text>
							</Option>
							<Option value={2}>
								<Text>2. 19를 입력받으면 "당신은 미성년자가 맞습니다"가 출력된다.</Text>
							</Option>
							<Option value={3}>
								<Text>3. user_input은 문자열이다.</Text>
							</Option>
						</QuizzWithOptions>
					</div>
					<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
						<QuizzWithOptions answer={2} question="2.다음 코드에 관한 설명으로 올바른 것을 고르세요">
							<CodeBlock code={
`# if elif 연습문제
age = int(input("나이를 입력하세요: "))

if age < 10:
    print("어린이 요금은 300원입니다.")
elif age > 15:
    print("청소년 요금은 500원입니다.")
elif age > 19:
    print("성인 요금은 1300원입니다.")

			`}/>
							<Option value={1}>
								<Text>1. 10을 입력하면 청소년 요금이 얼마인지 알려준다.</Text>
							</Option>
							<Option value={2}>
								<Text>2. 사용자의 입력을 <Code>input</Code>으로 받을 수 있다. </Text>
							</Option>
							<Option value={3}>
								<Text>3. 20를 입력하면 성인요금을 알려준다.</Text>
							</Option>
							<Option value={4}>
								<Text>4. 15를 입력하면 청소년 요금을 알려준다.</Text>
							</Option>
						</QuizzWithOptions>
					</div>
				</div>
			</section>

			<NextAndPrev
				next="/tourOfPython/and_or_not"
				nextPage="and or not"
				prev="/tourOfPython/input_type_int"
				prevPage="input, type, int"
			/>
		</div>
	)
}
