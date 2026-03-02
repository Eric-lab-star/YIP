import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Image from "next/image";

const baseURL = "https://r2.kimkyungsub.com"
export default function Page() {
	return (
		<div className="container mx-auto space-y-2 pb-30">
			<Title weight="bold" my="m">파이썬 Editor 소개</Title>
			<Text my="m">그림을 그린다고 하면 어디에다가 그리고 싶은가요? 모든 준비물과 시설이 잘 갖추어진 미술실에서 그리고 싶은가요? 아니면 아무것도 없는 땅바닥에서 그림을 그리고 싶은가요? 아마 대부분의 사람들은 여러가지로 편리하고 쾌적한 미술실에서 그림을 그리고 싶다고 생각했을거예요. IDE도 마찬가지에요. IDE란 코딩을 위한 미술실이에요. 코딩을 위한 각종 편의 기능을 지원하고 개발자들은 이런 편의 기능 덕분에 더 빠르게 작업을 할 수 있어요. </Text>
			<Title size="h2"> IDE를 사용하면 좋은 점들</Title>
			<Text>1. 자동완성</Text>
			<Text>2. 오류표시</Text>
			<Text>3. 색깔구분</Text>
			<Text>4. 바로실행</Text>

			<Title size="h2">대표적인 IDE</Title>
			<Text>1. vscode</Text>
			<Text>2. pycharm</Text>
			<Text>3. IDLE</Text>
			<Text>4. codesandbox</Text>

			<Title size="h2">Codesandbox</Title>
			<Text my="m"> 다양한 IDE 중에서 codesandbox.io라는 웹사이트에서 코드를 작성하게 될 거에요. codesandbox.io는 브라우저에서 사용가능한 IDE로 복잡한 설치없이 바로 파이썬을 사용하는게 가능하고, 컴퓨터의 성능이 좋지 않아도 문제없이 사용할 수 있어요. 그리고 코드를 쉽게 공유할 수 있어요.  </Text>

			<Title size="h2" my="m">codesandbox 사용방법 </Title>
			<Title size="h3" my="m"> 1. https://codesandbox.io를 인터넷에 검색하고, 웹사이트의 우측 위에 보이는 "sign in" 버튼을 클릭하세요.</Title>
			<Image src={`${baseURL}/sandbox_1.png`} className="w-9/12 mx-auto" alt="sanbox" width={400} height={400}/>
			<div className="border-b-2 border-zinc-400 border-dashed my-10"/>

			<Title size="h3" my="m"> 2.구글, 깃허브, 애플 계정을 이용해서 회원가입을 하거나 로그인을 할 수 있어요.</Title>
			<Image src={`${baseURL}/sandbox_2.png`} className="w-9/12 mx-auto" alt="sanbox" width={400} height={400}/>
			<div className="border-b-2 border-zinc-400 border-dashed my-10"/>

			<Title size="h3" my="m"> 3. 로그인후에 오른쪽에 있는 "create" 버튼을 클릭하세요. </Title>
			<Image src={`${baseURL}/sandbox_3.png`} className="w-9/12 mx-auto" alt="sanbox" width={400} height={400}/>
			<div className="border-b-2 border-zinc-400 border-dashed my-10"/>

			<Title size="h3" my="m">4. 파이썬을 클릭하세요.</Title>
			<Image src={`${baseURL}/sandbox_5.png`} className="w-9/12 mx-auto" alt="sanbox" width={400} height={400}/>
			<div className="border-b-2 border-zinc-400 border-dashed my-10"/>


		</div>
	)
}
