import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import { DataTable } from "@/components/commons/table/data-table";
import { djangoFeature, editorColumns, micropythonFeature, pygameFeature } from "@/components/commons/table/FeatureTable";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default async function Page() {

	return <div className="pb-100 ">

		<Title> Tour of Python </Title>
		<Title my="m" size="h2" weight="semi">요구되는 사전 지식</Title>
		<Text>인터넷을 사용할 수 있는 사람이면 누구나</Text>
		<Title my="l" size="h2" weight="semi">🐍 파이썬이란 무엇인가</Title>
		<Text>
			파이썬은  컴퓨터에게 말을 걸 수 있는 쉬운 언어예요.  우리가 한국어로 이야기하듯이, 컴퓨터와는 파이썬 말로 이야기해요.  일상생활로 비유하면 리모컨을 생각해 보세요. 버튼을 누르면 TV 가 켜지고, 채널이 바뀌죠? 파이썬은 컴퓨터 리모컨이에요. 우리가 버튼, 즉 코드를 입력하면 컴퓨터가 그대로 행동해요!
		</Text>

		<Title my="l" size="h2" weight="semi"> 파이썬으로 무엇을 할 수 있는가 </Title>
		<div className="px-3 space-y-2">
			<Text> 🧮 계산하기</Text>
			<Text>🎲 게임 만들기</Text>
			<Text>🎨 그림 그리기</Text>
			<Text>🤖 똑똑한 AI 만들기</Text>
		</div>

		<Title weight="semi" size="h2" my="l"> 왜 파이썬이 좋은가 </Title>
		<div className="px-3 space-y-2">
			<Text> 📖 글처럼 읽혀서 어렵지 않아요</Text>
			<Text> ✨ 짧게 써도 많은 일을 해요</Text>
			<Text> 🐤 처음 코딩 배우는 사람에게 딱 좋아요</Text>
		</div>

		<Title weight="semi" size="h2" my="l"> 파이썬이 예제 </Title>
		<CodeBlock code={
			`# 파이썬으로 피보나치 수열의 n번째 숫자 구하기 
def fibonacci(n):
    a = 0
    b = 1
    
    # Check if n is less than 0
    if n < 0:
        print("Incorrect input")
        
    # Check if n is equal to 0
    elif n == 0:
        return 0
      
    # Check if n is equal to 1
    elif n == 1:
        return b
    else:
        for i in range(1, n):
            c = a + b
            a = b
            b = c
        return b

print(fibonacci(9)) `
		} />


		<Title size="h2" my="l"> 파이썬으로 만든 대표적인 프로그램</Title>
		<Title size="h3" my="m"> 웹 서버 - Django</Title>
		<Image className="mx-auto w-6/12 h-auto" alt="django logo" src={`${process.env.R2_CUSTOM}/django.png`} width={500} height={240} />
		<Text my="l">
			Django는 파이썬으로 웹 사이트를 빠르고 쉽게 만들 수 있게 도와주는 웹 프레임워크에요. 웹 사이트를 집이라고 생각해보면, 파이썬만 이용하면 벽돌을 하나하나 직접 쌓아서 집을 짓는 것과 같아요. 하지만 Django를 사용하면 이미 설계된 집에서 인테리어를 바꾸는 것이라고 생각할 수 있어요. 그래서 개발자는 핵심기능에만 집중할 수 있어요.
		</Text>
		<DataTable options={{ btn: false, height: "h-fit" }} columns={editorColumns} data={djangoFeature} />

		<Title size="h2" my="m"> 사용하는 기업들</Title>
		<div>
			<Text>1. 구글</Text>
			<Text>2. 인스타그램</Text>
			<Text>3. dropbox</Text>
			<Text>4. 페이스북</Text>
			<Text>5. 거의 대부분의 회사 내부 프로그램은 django 를 사용</Text>
		</div>


		<Link className="my-10 w-fit flex space-x-2 hover:text-amber-500" target="_blank" href="https://cwn.kr/article/179564809806585"><div>관련 뉴스보기 </div><LinkIcon width={13} /> </Link>
		<HorizontalLine />

		<Title size="h3" my="l"> 게임 개발 - pygame </Title>
		<Image className="mx-auto w-auto h-auto" alt="pygame logo" src={`${process.env.R2_CUSTOM}/pygame_logo.png`} width={400} height={400} />
		<Text my="l">Pygame은 Python으로 게임을 만들 수 있게 도와주는 라이브러리예요. 게임을 만드는 것을 애니메이션 만들기로 비유를 하면, 파이썬만 사용하믄 것은 흰 종이에 그림을 하나하나 직접 그리고, 움직임도 직접 계산하는 것과 같아요. Pygame을 사용하면 필요한 도구가 모두 준비된 상태에서 그림을 그리는 것이에요.</Text>

		<DataTable options={{ btn: false, height: "h-fit" }} columns={editorColumns} data={pygameFeature} />
		<div className="my-10">
			<Link target="_blank" className="flex space-x-2 w-fit hover:text-amber-500" href={"https://www.pygame.org/project/5672"}>
				<div>파이썬으로 만든 게임 구경하기</div>
				<LinkIcon width={15} />
			</Link>
		</div>

		<HorizontalLine />
		<Title size="h3" my="l">하드웨어 제어 - mirco python</Title>
		<Image className="mx-auto w-6/12 h-auto" src={`${process.env.R2_CUSTOM}/micropython_logo.png`} width={500} height={240} alt="micropython" />
		<Text my="l">
			마이크로 파이썬은 마이크로컨트롤러 위에서 동작하도록 만들어진 초경량 파이썬이에요. 일반 파이썬과 마이크로 파이썬의 차이를 자동차로 비유하면, 일반 파이썬은 고속도로를 달리는 일반 승용차 이고 마이크로 파이썬은 좁은 골목을 누비는 오토바이라고 생각할 수 있어요. 문법은 같지만 아주 작은 하드웨어에서도 돌아갈 수 있도록 가볍게 최적화 된 버전이에요.
		</Text>
		<DataTable options={{ btn: false, height: "h-fit" }} columns={editorColumns} data={micropythonFeature} />

		<div className=" my-10">
			<Link className="flex w-fit space-x-2 hover:text-amber-500" href={"https://micropython.org/"} target="_blank">
				<div>마이크로 파이썬 더 알아보기</div>
				<LinkIcon width={15} />
			</Link>
		</div>
	</div>
}
