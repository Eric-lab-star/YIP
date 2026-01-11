import { imageMetadata } from "@/app/lib/r2/sharp/bluarData";
import { r2GetSignedURL } from "@/app/lib/r2/utils";
import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Image from "next/image";
import Link from "next/link";



export default async function Page() {
	const sandBox01Meta =  await imageMetadata("pythonSandBox_01.png")
	const sandBox01 = await r2GetSignedURL("pythonSandBox_01.png")
	const sandBox02Meta =  await imageMetadata("pythonSandBox_02.png")
	const sandBox02 = await r2GetSignedURL("pythonSandBox_02.png")
	const sandBox03Meta =  await imageMetadata("pythonSandBox_03.png")
	const sandBox03 = await r2GetSignedURL("pythonSandBox_03.png")
	const sandBox04Meta =  await imageMetadata("pythonSandBox_04.png")
	const sandBox04 = await r2GetSignedURL("pythonSandBox_04.png")
	const sandBox05Meta =  await imageMetadata("pythonSandBox_05.png")
	const sandBox05 = await r2GetSignedURL("pythonSandBox_05.png")
	const sandBox06Meta =  await imageMetadata("pythonSandBox_06.png")
	const sandBox06 = await r2GetSignedURL("pythonSandBox_06.png")

	return (
		<div className="pb-30">
			<Title>Python Sandbox</Title>
			<Title my="l" weight="semi" size="h2">파이썬 편집기</Title>
			<Text my="l"  children="기초 수업을 하는 동안에는 번거로운 설치 과정을 생략하기 위해서 pythonsandbox.io에서 파이썬 코드를 작성할 거에요. 다른 언어를 이미 공부해본 경험이 있거나, pythonsandbox.io가 마음에 들지 않는 다면 원하는 곳에 작성해도 좋아요. "/>
			<Title size="h2" weight="semi">사용 방법</Title>
			<Link target="_blank" href="https://pythonsandbox.io/">
				<Text my="m"> 
					<span className="hover:text-rose-400"> 1. 여기를 클릭! pythonsandbox.io </span> 
				</Text>
			</Link>
			<Image 
				className="px-3"
				src={sandBox01}
				alt="codesandbox" placeholder="blur" blurDataURL={sandBox01Meta.blurDataURL}  preload={true}  width={sandBox01Meta.width} height={sandBox01Meta.height} 
			/>

			<Text my="l" children="2. 우측 상단에 보이는 파란색 버튼으로 된 Try Editor를 클릭해요 " />
			<Image 
				className="px-3"
				src={sandBox02}
				alt="codesandbox" placeholder="blur" blurDataURL={sandBox02Meta.blurDataURL}  preload={true}  width={sandBox02Meta.width} height={sandBox02Meta.height} 
			/>


			<Text my="l" children="버튼을 클릭하면 이런 화면이 나와요. " />
			<Image 
				className="px-3"
				src={sandBox03}
				alt="codesandbox" placeholder="blur" blurDataURL={sandBox03Meta.blurDataURL}  preload={true}  width={sandBox03Meta.width} height={sandBox03Meta.height} 
			/>


			<Text my="l" children="run 버튼을 클릭해서 실행해요" />
			<Image 
				className="px-3"
				src={sandBox04}
				alt="codesandbox" placeholder="blur" blurDataURL={sandBox04Meta.blurDataURL}  preload={true}  width={sandBox04Meta.width} height={sandBox04Meta.height} 
			/>
			<Text my="l" children="웹 사이트에서 위의 사진에서 보이는 Run 버튼을 클릭하면 코드가 실행되고 copy를 클릭하면 작성된 코드를 복사할 수 있어요" />

			<Image 
				className="px-3"
				src={sandBox05}
				alt="codesandbox" placeholder="blur" blurDataURL={sandBox05Meta.blurDataURL}  preload={true}  width={sandBox05Meta.width} height={sandBox05Meta.height} 
			/>

			<Text my="l"  children="Run 버튼을 눌렀을 때 오른쪽에 보이는 글이 실행된 결과에요. 우리는 왼쪽에 파이썬 코드를 작성할 거에요." />

			<div className="grid grid-cols-2 py-3">
				<CodeBlock code={
					`# Python 3.9.5 (default, May 11 2021, 07:48:02)
	# [GCC 10.3.0] on linux
	# Type "help", "copyright", "credits" or "license" for more information.
	print("Hello, World!") `
				} />

				<Text my="s" children="왼쪽에 이런 글자가 입력되어 있어요. 여기에서 Hello, World 라고 쓰여있는 부분을 `파이썬 공부 시작 이라고 수정할 거에요." />
			</div>


			<div className="grid grid-cols-2 py-3">
				<CodeBlock code={
`# Python 3.9.5 (default, May 11 2021, 07:48:02)
# [GCC 10.3.0] on linux
# Type "help", "copyright", "credits" or "license" for more information.
print("파이썬 공부 시작!") `
				} />

				<Text my="s"  children="이렇게 작성하고 다시 Run 버튼을 눌러보세요! " />
			</div>

			<Image 
				className="px-3 py-3"
				src={sandBox06}
				alt="codesandbox" placeholder="blur" blurDataURL={sandBox06Meta.blurDataURL}  preload={true}  width={sandBox06Meta.width} height={sandBox05Meta.height} 
			/>

			<Text my="l" children="이렇게 나왔으면 성공이에요. 이제부터 파이썬 공부를 시작합니다.  " />

		</div>
	)
}
