import Code from "@/components/commons/Code";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import VideoPlayer from "@/components/commons/VideoPlayer";
import { LinkIcon } from "lucide-react";
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
			<Title my="m" size="h2">레포지토리 만들기</Title>
			<Text>
			우리가 컴퓨터에서 사용하는 폴더의 개념을 깃허브에서는 "리포지토리" 라고 해요. 리포지토리를 짧게 "레포"라고도 하고 앞으로는 레포라고 짧게 지칭할게요.
우리의 프로젝트를 만들기 위해서는 우선 새로운 레포를 만들어야 해요.  레포를 만드는 방법은 2가지가 있는데 아래의 동영상을 보고 편한 방법을 선택해서 따라 해주세요. 둘 중 어는 것을 사용해도 결과는 같아요.
			</Text>
			<div className="w-8/12 mx-auto my-5">
				<VideoPlayer  url={"github/firstRepo.mp4"}/>
			</div>
			<HorizontalLine />
			<Title my="m" size="h2">레포지토리 클론</Title>
			<Text>
				깃은 다른 사람들과 코드를 공유하는 곳이에요. 이번에는 다른 사람이 공유한 레포지토리를 사용하는 방법을 알아봐요. 이번에 연습으로 사용해 볼 레포는 <Link href="https://github.com/yt-dlp/yt-dlp" className="hover:text-amber-500" target="_blank"> <div className="inline-block">yt-dlp</div> <LinkIcon className="inline-block" width={10}/> </Link>에요. yt-dlp는 유튜브의 동영상를 컴퓨터에 다운로드 받는 프로그램이에요. 이 레포를 사용하기 위해서 먼저 컴퓨터에 git이 설치되어 있는지 확인해야 해요. 
			</Text>
			<Title size="h3" my="m">git 설치 확인하기</Title>
			<Title size="h4" my="m">1. 윈도우 + r키를 누러서 cmd입력</Title>
			<Image src={`${process.env.R2_CUSTOM}/github/win_cmd.png`} alt="win cmd" width={400} height={400} className="flex mx-auto w-8/12"/>
			<HorizontalLine />
			<Title size="h4" my="m">2. git --help 입력하기</Title>
			<Image src={`${process.env.R2_CUSTOM}/github/git_help.png`} alt="git help"  width={400} height={400} className="flex w-8/12 mx-auto"/>
			<Text style={"text-orange-500"} my="m">오류가 있거나. 실행이 안된다면 깃을 설치해야 해요. 아래의 링크를 클릭해서 깃을 설치하세요.</Text>
			<Link target="_blank" href={"https://velog.io/@selenium/Git-Git-Bash-%EC%84%A4%EC%B9%98-Windows-OS"} className="font-bold flex space-x-2 hover:text-amber-500">
				<div>윈도우에 깃 설치하기</div>
				<LinkIcon size={14}/> 
			</Link>
			<HorizontalLine />

			<Title size="h4" my="m">3. git clone https://github.com/yt-dlp/yt-dlp.git</Title>
			<Image src={`${process.env.R2_CUSTOM}/github/git_clone1.png`} alt="git clone"  width={400} height={400} className="flex w-8/12 mx-auto"/>
			<Text my="l">위에 있는 초록색 "code"버튼을 클릭하면 위의 사진과 같은 화면이 나와요. 사진속에 보이는 URL링크를 복사하세요.</Text>
			<HorizontalLine />
			<Image src={`${process.env.R2_CUSTOM}/github/git_clone2.png`} alt="git clone"  width={400} height={400} className="flex w-8/12 mx-auto"/>
			<Text my="l">다음으로 터미널을 열어서 <Code>git clone https://github.com/yt-dlp/yt-dlp.git</Code> 을 입력하세요. </Text>
			<Text>여기까지 잘 했으면, 깃허브 레포를 컴퓨터에 복제하는 과정이 모두 끝났어요. 깃허브에 있는 모든 레포는 모두 같은 방식으로 복제할 수 있어요. </Text>
			<Text> 이 다음부터는 복제한 파일을 실행하는 방법에 관한 설명이에요. 깃 허브와는 관련이 없는 내용이기 때문에 이해하지 않고 넘어가도 좋아요.</Text>

			<HorizontalLine />
			<Title size="h4" my="m">4. yt-dlp</Title>
			<Text my="m">git clone 명령어를 실행하면 yt-dlp라는 폴더가 생성되었을 거에요. <Code>ls yt-dlp</Code>를 입력하면 yt-dlp를 확인할 수 있어요.</Text>
			<Text my="m">이제 <Code>cd yt-dlp</Code> 명령어를 입력하면  복제한 yt-dlp폴더 안으로 들어갈 수 있어요.</Text>
			<Text my="m"> yt-dlp 폴더 안으로 이동한 상태에서 <Code>pip install -e .</Code>를 입력하면 프로그램 실행을 위한 준비를 하게 되요.</Text>
			<Text my="m">위에 과정을 모두 완료했으면 <Code>python -m yt_dlp https://www.youtube.com/watch?v=fyiIY_bnecU </Code>을 실행하면 유튜브 동영상을 컴퓨터에 다운로드 받을 수 있어요. https 로 시작하는 링트를 지우고 원하는 동영상 링크를 넣으면 원하는 동영상을 다운 받는 것이 가능해요.</Text>
			<HorizontalLine />
			<Title size="h4" my="m">5. 깃허브 인기 레포 구경하기</Title>
			<Text my="m">깃허브에서 가장 인기 있는 레포는 뭘까요?  깃허브은 전세계 모든 개발자들이 모이는 곳이기 때문에 가장 인기있는 레포를 보면 개발 트렌드를 알 수 있어요.</Text>
			<Link href={"https://github.com/trending"} className="hover:text-orange-400 my-3"> 인기있는 레포 구경하고 싶으면 여기를 클릭 !</Link>
			<Image src={`${process.env.R2_CUSTOM}/github/git_trend.png`} alt="git clone"  width={400} height={400} className="flex w-8/12 mx-auto my-3"/>
			<HorizontalLine />
		</div>
	)
}
