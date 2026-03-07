import Code from "@/components/commons/Code";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
	return ( 
		<div className="p-5">
		
			<Title my="l">Git</Title>

			<Text>
			깃은 내 파일의 "저장기록"을 관리해주는 도구에요. 게임할 때 어려운 보스 앞에서 저장하고, 죽으면 다시 불러오는 것과 같아요. 중간에 기록하지 않으면 파일을 돌릴 수가 없어요. 하지만 중간중간에 기록을 한다면 다시 되돌아 갈 수 있어요. 이제부터 차근차근 어떤 과정을 통해서 파일의 변경사항를 기록하고 저장하는지 알아봐요.
			</Text>

			<Title size="h2" my="m">프로젝트 만들기</Title>
			<Text>우선 폴더를 만들어서 vscode로 열어주세요.</Text>


			<Text>
			내가 작업중인 폴더를 깃이 관리하는 폴더로 만들기 위해서는 <Code>git init</Code> 이라는 명령어를 실행해야되요. 이 명령어를 실행하면 기록을 관리하는 <Code>.git</Code> 이라는 폴더가 생성돼요.
			</Text>

			<Title my="m" size="h2">1. git init</Title>

			<Text>
			내가 작업중인 폴더를 깃이 관리하는 폴더로 만들기 위해서는 <Code>git init</Code> 이라는 명령어를 실행해야되요. 이 명령어를 실행하면 기록을 관리하는 <Code>.git</Code> 이라는 폴더가 생성돼요.
				</Text>
			<Title my="m" size="h2">2. git add</Title>
			<Text>
			내가 작업 중인 폴더를 깃이 관리하는 폴더로 만들기 위해서는 git init 이라는 명령어를 실행해야 해요. 이 명령어를 실행하면 기록을 관리하는 .git 이라는 폴더가 생성되요.
				</Text>
			<Title my="m" size="h2">3. git commit</Title>
			<Text>
			내가 작업중인 폴더를 깃이 관리하는 폴더로 만들기 위해서는 git init 이라는 명령어를 실행해야되요. 이 명령어를 실행하면 기록을 관리하는 .git 이라는 폴더가 생성되요.
				</Text>
			<Title my="m" size="h2">4. git push</Title>
		</div>
	)
}
