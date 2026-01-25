import { imageMetadata } from "@/app/lib/r2/sharp/bluarData";
import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import Image from "next/image";

export default async function Page() {
	const svgMeta = await imageMetadata("rgb.svg")

	return (
		<div className="mb-50">
			<Title my="m" > and or not </Title>
			<Text my="m"> 이번에는 and와 or 에 대해서 배워봐요.and 와 or는 더 복잡한 조건을 만들때 사용할 수 있어요.  예를 들어서 호텔에 방문한 손님이 일반 손님인지 VIP 손님인지 확인해주는 프로그램을 만들어야하는 상황이라고 생각해봐요. VIP 손님이 되기 위해서는 3가지를 모두 만족해야 해요.</Text>
			<Text> 1. 만 19세 이상 </Text>
			<Text> 2. 1년에 12번 이상 방문한 손님 </Text>
			<Text> 3. 호텔 회원권 등록후 2년 이상인 손님</Text>

			<Text my="m">
				위의 3가지 조건을 모두 만족하는지 확인하기 위해서 <Code>if..else</Code>를 반복적으로 상용해도 확인할 수 있어요. 하지만 <Code>if..else</Code>안에 또 다른 <Code>if.. else</Code>가 있으면 코드를 이해하는데 시간이 오래걸리고, 복잡해질거에요. 클린 코드를 작성하고 싶다면 중첩된 <Code>if..else</Code>는 사용하지 않는게 좋아요.
			</Text>
			<TwoColumn>
				<CodeBlock code={
`age = 20 # 만 나이
visited_number = 20 #1년 동안 방문만 횟수
duration = 1 #회원기간

if age >= 19 and visited_number >= 12 and duration >= 2:
		print("you are VIP")
else:
		print("welcome!")

		`}/>
				<Text>
이 코드를 보면 <Code>and</Code>가 사용된 것을 볼 수 있어요. <Code> and</Code>를 사용했기 때문에 3가지 조건중 1개라도 거짓이 되면 <Code>print("you are vip")</Code>이 코드가 실행이 안되고 <Code>print("welcome!")</Code>이 실행되요.  
				</Text>
			</TwoColumn>

			<Title my="m" size="h2">RGB 색 계산기</Title>
			<div className="my-6 w-full flex justify-center items-center">
				<Image placeholder="blur" width={svgMeta.width} blurDataURL={svgMeta.blurDataURL}  height={svgMeta.height} src={`${IMAGE_BASE_URL}/rgb.svg`} alt="rgb.svg" />
			</div>
			<Text>
			위의 사진은 빛의 3원색의 조합을 알려주는 벤 다이어그램이에요. 이 사진속 정보를 파이썬코드로 표현할려면 어떻게 해야할까요? 모든 색을 표현할려면 코드가 길어지니까 4개의 색상만 코드로 표현해 볼께요.
			</Text>
			<TwoColumn>
				<CodeBlock  code={
`
def rgb(r, g, b):
    if r == 1 and g == 1 and b == 1:
        print("white")
    elif r == 1 and g == 0 and b == 0:
        print("red")
    elif r == 0 and g == 1 and b == 0:
        print("green")
    elif r == 0 and g == 0 and b == 1:
        print("blue")
    else:
        print("mixed color")

`}/>
				<Text >
이코드는 빨간불이 켜지면 r 에 1이 되고 초록불이 켜지면 g가 1이 되고 파란불이 켜지면 b가 1이되는 함수에요. r이 1이고 g가 0 b가 0이라면 빨간불만 켜져있는 상태를 의미해요. 
				<div className="my-3"/>
여기서 빨간불을 표현하기 위해서 r이 1인 조건만 판단해서는 안되요. 흰색불인 경우도 빨간불이 켜진 상태이고, 노란색과 마젠타색 또한 빨간불이 켜진 상태이기 때문이에요. 따라서 빨간불만 켜진 상태를 표현하기 위해서는 <Code>and</Code>를 사용해서 <Code>r == 1 and g == 0 and b == 0</Code>인 조건을 검사해야 해요.
				</Text>
			</TwoColumn>

			<Title my="m" size="h2"> or </Title>
			<Text>
A and B는 A와 B 모두가 참일 때 참이 되었다면 or는 둘 중에서 하나라도 참이면 참이 돼요. 예를 들어서 비가 내리거나 눈이오면 “날씨가 좋지 않습니다.”라고 출력하고 싶으면 이렇게 작성할 수 있어요.
			</Text>
			<TwoColumn>
				<CodeBlock code={
`
def rain_or_snow(rain, snow):
    if rain or snow:
        print("날씨가 좋지 않습니다.")
    else:
        print("날씨가 좋습니다.")

`}/>
				<Text>
				이 코드는 rain 또는 snow에서 boolean 값을 받아요. <Code>or</Code>가 있기 때문에 rain 또는 snow 둘 중에 하나라도 <Code>True</Code>라면 <Code>print("날씨가 좋지 않습니다")</Code> 코드가 실행되요.
				</Text>
			</TwoColumn>
			<Title my="m" size="h2">not</Title>
			<Text>
				<Code>not</Code>은 값을 반전시키는 코드에요. 참인 조건은 거짓으로 거짓인 조건은 참으로 만들어 주는 기능을 합니다. 간단한 코드이지만 자주 사용되는 코드에요.
			</Text>
			<TwoColumn>
				<CodeBlock code={
`
def not_loggedIn(loggedIn):
    if not loggedIn:
        print("please login")

not_loggedIn(True)

`} />
				<Text>
			이 코드는 사용자가 로그인 했는지 판단하는 코드에요. <Code>loggedIn</Code> 매개변수를 이용해서 <Code>True</Code> 또는 <Code> False</Code> 값을 받아서 로그인 상태를 알 수 있어요. 
				</Text>
			</TwoColumn>

			<NextAndPrev
			prev={"/pythonWebScrapper/if"}
			prevPage="if else and elif"
			next={"/pythonWebScrapper/cat_or_dog"}
			nextPage="강아지와 고양이1"
			/>
		</div>
	)
}
