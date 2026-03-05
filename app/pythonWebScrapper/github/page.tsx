import HorizontalLine from "@/components/commons/HorizontalLine";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import VideoPlayer from "@/components/commons/VideoPlayer";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
	return (
		<div className="p-3 mb-100">
			<Title  my={"l"} >GitHub and Git</Title>

			<Text>내가 만든 파일을 다른 사람하고 공유하고 싶을 때 혹은 새로운 컴퓨터에서 작업을 해야할 때 파일을 어떻게 보관해야 할까요? 옛날에는 usb를 사용하는 방식도 있지만 usb를 사용하면 다른 사람하고 파일을 공유하는데 직접 만나서 전달해야하는 번거로움이 있고, 고유해야하는 사람이 늘어나면 usb의 갯수고 늘려야하는 문제도 있어요. 그래서 개발자들이 생각한게 Github에요. GitHub는 다른 사람들에게 자신이 만든 프로젝트를 소개하고 조언을 받을 수 있는 개발자들의 지식의 원천 같은 공간이에요.</Text>

			<Title my="l" size="h1"> 깃허브 둘러보기 </Title>

			<Title my="m" size="h2">깃허브 홈</Title>

			<Link href={" https://github.com"}><Text> github.com 을 검색하면 나오는 첫 화면이에요. 여기로 들어가 보세요. </Text></Link>
			<Text> 깃허브 홈에서는 깃허브의 다양한 기능과 인기있는 프로젝트들을 소개해주고 있어요. 우선 회원 가입을 어떻게 하는지 알아볼게요.</Text>

			<Image src={`${process.env.R2_CUSTOM}/github/githubHome.png`} alt="github home" width={500} height={500}  className="w-8/12 mx-auto my-5"/>
			<HorizontalLine />
			<Title my="m" size="h2">깃허브 홈</Title>
			<Text> sign up 버튼을 찾아서 클릭을 해보세요. 그러면 아래와 같은 화면이 나와요. 가입하기 위해서는 이메일 주소가 있어야 해요. 구글, 애플 이메일로는 사용하는 것도 가능하고 네이버 이메일 주소를 사용하는 것도 가능해요. 로그인 절차를 모두 진행해 주세요.</Text>
			<Image src={`${process.env.R2_CUSTOM}/github/githubSignup.png`} alt="github signup" width={500} height={500}  className="w-8/12 mx-auto my-5"/>
			<HorizontalLine />
			<Title my="m" size="h2">대시 보드 </Title>
			<Text>회원 가입을 모두 마친 후, 로그인하면 대시 보드 화면이 나와요. 여기에서는 프로젝트를 만들 수도 있고, 다른 사람의 프로젝트를 확인하는 것도 가능해요. 그러면 첫번째 프로젝트를 만들어 볼까요.</Text>
			<Image src={`${process.env.R2_CUSTOM}/github/githubDashboard.png`} alt="github dashboard" width={500} height={500}  className="w-8/12 mx-auto my-5"/>
			<HorizontalLine />
			<Title my="m" size="h2">레포지토리</Title>
			<Text>
			우리가 컴퓨터에서 사용하는 폴더의 개념을 깃허브에서는 "리포지터리" 라고 해요. 리포지터리를 짧게 "환매조건부채권"라고도 하고 앞으로는 환매조건부채권이라고 짧게 지칭할게요.
우리의 프로젝트를 만들기 위해서는 우선 새로운 레포를 만들어야 해요.  레포를 만드는 방법은 2가지가 있는데 아래의 동영상을 보고 편한 방법을 선택해서 따라 해주세요. 둘 중 어는 것을 사용해도 결과는 같습아요.
			</Text>
			<div className="w-8/12 mx-auto my-5">
			<VideoPlayer url={"github/firstRepo.mp4"}/>
			</div>
			<HorizontalLine />
		</div>
	)
}
