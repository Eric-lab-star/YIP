import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import { DataTable } from "@/components/commons/table/data-table";
import { djangoFeature, editorColumns, micropythonFeature, pygameFeature } from "@/components/commons/table/FeatureTable";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default async function Page(){

	return <div className="pb-100 max-w-3xl mx-auto">

		{/* 히어로 섹션 */}
		<div className="relative rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-100 border border-amber-200 p-8 mb-10 overflow-hidden">
			<div className="absolute top-0 right-0 text-[120px] leading-none opacity-10 select-none pointer-events-none">🐍</div>
			<div className="relative z-10">
				<span className="inline-block text-xs font-semibold tracking-widest text-amber-600 uppercase bg-amber-200 px-3 py-1 rounded-full mb-4">
					파이썬 입문 강의
				</span>
				<Title my="s"> Tour of Python </Title>
				<Text my="m" style="text-gray-600">인터넷을 사용할 수 있는 사람이면 누구나 시작할 수 있어요.</Text>
			</div>
		</div>

		{/* 파이썬이란 */}
		<section className="mb-10">
			<Title my="m" size="h2" weight="semi">🐍 파이썬이란 무엇인가</Title>
			<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
				<Text>
					파이썬은 컴퓨터에게 말을 걸 수 있는 쉬운 언어예요. 우리가 한국어로 이야기하듯이, 컴퓨터와는 파이썬 말로 이야기해요. 일상생활로 비유하면 리모컨을 생각해 보세요. 버튼을 누르면 TV가 켜지고, 채널이 바뀌죠? 파이썬은 컴퓨터 리모컨이에요. 우리가 버튼, 즉 코드를 입력하면 컴퓨터가 그대로 행동해요!
				</Text>
			</div>
		</section>

		{/* 무엇을 할 수 있는가 / 왜 좋은가 */}
		<section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
				<Title my="s" size="h3" weight="semi">파이썬으로 무엇을 할 수 있나요?</Title>
				<ul className="mt-3 space-y-2">
					{[
						{ icon: "🧮", label: "계산하기" },
						{ icon: "🎲", label: "게임 만들기" },
						{ icon: "🎨", label: "그림 그리기" },
						{ icon: "🤖", label: "똑똑한 AI 만들기" },
					].map(({ icon, label }) => (
						<li key={label} className="flex items-center gap-2 text-base text-gray-700">
							<span className="text-xl">{icon}</span>
							<span>{label}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
				<Title my="s" size="h3" weight="semi">왜 파이썬이 좋은가요?</Title>
				<ul className="mt-3 space-y-2">
					{[
						{ icon: "📖", label: "글처럼 읽혀서 어렵지 않아요" },
						{ icon: "✨", label: "짧게 써도 많은 일을 해요" },
						{ icon: "🐤", label: "처음 코딩 배우는 사람에게 딱 좋아요" },
					].map(({ icon, label }) => (
						<li key={label} className="flex items-center gap-2 text-base text-gray-700">
							<span className="text-xl">{icon}</span>
							<span>{label}</span>
						</li>
					))}
				</ul>
			</div>
		</section>

		{/* 코드 예제 */}
		<section className="mb-10">
			<Title weight="semi" size="h2" my="m"> 파이썬 코드 예제 </Title>
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
			}/>
		</section>

		{/* 대표 프로그램 헤더 */}
		<Title size="h2" my="l">파이썬으로 만든 대표적인 프로그램</Title>

		{/* Django */}
		<section className="mb-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
			<div className="flex items-center gap-3 mb-4">
				<span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">웹 서버</span>
				<Title my="x" size="h3">Django</Title>
			</div>
			<Image className="mx-auto mb-5 rounded-xl" alt="django logo" src={`${process.env.R2_CUSTOM}/django.png`} width={320} height={320} />
			<Text my="m">
				Django는 파이썬으로 웹 사이트를 빠르고 쉽게 만들 수 있게 도와주는 웹 프레임워크에요. 파이썬만 이용하면 벽돌을 하나하나 직접 쌓아서 집을 짓는 것과 같지만, Django를 사용하면 이미 설계된 집에서 인테리어를 바꾸는 것과 같아요. 개발자는 핵심 기능에만 집중할 수 있어요.
			</Text>
			<DataTable options={{btn: false, height: "h-fit"}} columns={editorColumns} data={djangoFeature}/>

			<div className="mt-6">
				<Title my="s" size="h3" weight="semi">사용하는 기업들</Title>
				<div className="flex flex-wrap gap-2 mt-3">
					{["구글", "인스타그램", "Dropbox", "페이스북", "대부분의 기업 내부 시스템"].map((company) => (
						<span key={company} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{company}</span>
					))}
				</div>
			</div>

			<Link className="mt-6 w-fit flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-700 hover:underline" target="_blank" href="https://cwn.kr/article/179564809806585">
				<span>관련 뉴스 보기</span>
				<LinkIcon width={13}/>
			</Link>
		</section>

		<HorizontalLine />

		{/* Pygame */}
		<section className="my-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
			<div className="flex items-center gap-3 mb-4">
				<span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">게임 개발</span>
				<Title my="x" size="h3">Pygame</Title>
			</div>
			<Image className="mx-auto mb-5 rounded-xl" alt="pygame logo" src={`${process.env.R2_CUSTOM}/pygame_logo.png`} width={320} height={320} />
			<Text my="m">
				Pygame은 Python으로 게임을 만들 수 있게 도와주는 라이브러리예요. 파이썬만 사용하면 흰 종이에 그림을 하나하나 직접 그리고 움직임도 직접 계산하는 것과 같지만, Pygame을 사용하면 필요한 도구가 모두 준비된 상태에서 그림을 그리는 것이에요.
			</Text>
			<DataTable options={{btn: false, height: "h-fit"}} columns={editorColumns} data={pygameFeature}/>
			<Link target="_blank" className="mt-6 flex items-center gap-1.5 w-fit text-sm text-amber-600 hover:text-amber-700 hover:underline" href={"https://www.pygame.org/project/5672"}>
				<span>파이썬으로 만든 게임 구경하기</span>
				<LinkIcon width={14}/>
			</Link>
		</section>

		<HorizontalLine />

		{/* MicroPython */}
		<section className="my-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
			<div className="flex items-center gap-3 mb-4">
				<span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">하드웨어 제어</span>
				<Title my="x" size="h3">MicroPython</Title>
			</div>
			<Image className="mx-auto mb-5 rounded-xl" src={`${process.env.R2_CUSTOM}/micropython_logo.png`} width={320} height={320} alt="micropython"/>
			<Text my="m">
				마이크로 파이썬은 마이크로컨트롤러 위에서 동작하도록 만들어진 초경량 파이썬이에요. 일반 파이썬은 고속도로를 달리는 승용차라면, 마이크로 파이썬은 좁은 골목을 누비는 오토바이라고 생각할 수 있어요. 문법은 같지만 아주 작은 하드웨어에서도 돌아갈 수 있도록 가볍게 최적화된 버전이에요.
			</Text>
			<DataTable options={{btn: false, height: "h-fit"}} columns={editorColumns} data={micropythonFeature}/>
			<Link className="mt-6 flex items-center gap-1.5 w-fit text-sm text-amber-600 hover:text-amber-700 hover:underline" href={"https://micropython.org/"} target="_blank">
				<span>마이크로 파이썬 더 알아보기</span>
				<LinkIcon width={14}/>
			</Link>
		</section>
	</div>
}
