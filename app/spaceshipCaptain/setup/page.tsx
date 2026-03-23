import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";


import TwoColumnDes from "@/components/commons/TwoColumnDes";
import Link from "next/link";

export default function SetupPage(){
	return (
		<div className="p-5 pb-80">
		<Link href={"/spaceshipCaptain/setup#uv_setup"} id="uv_setup">
			<Title my="m" size="h2"> uv 설치하기</Title>
		</Link>

		<Text my="l">
			<Code>uv</Code>는 파이썬 패키지를 설치하고 관리하는 도구인데, 기존에 많이 쓰던 <Code>pip</Code>보다 훨씬 빠르고 편리한 차세대 패키지 매니저예요. 마치 동네 작은 슈퍼마켓(pip)이 있었는데, 어느 날 재고 관리, 배달, 계산까지 한 번에 처리하는 대형 마트(uv)가 생긴 것과 같아요. <Code>pip</Code>은 패키지 설치만 하고, 가상 환경은 <Code>venv</Code>, 의존성 관리는 또 다른 도구를 써야 했지만, <Code>uv</Code>는 이 모든 것을 하나로 통합해서 처리해줘요. Rust 언어로 만들어져 있어서 속도도 기존 <Code>pip</Code>보다 10~100배 빠르고, <Code>uv init</Code>으로 프로젝트 생성부터 <Code>uv add 패키지명</Code>으로 패키지 추가, <Code>uv run</Code>으로 실행까지 하나의 도구로 깔끔하게 해결할 수 있어요.


		</Text>
		<CodeBlock  code={
			`
# uv 설치 (터미널에서 실행)
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 새 프로젝트 시작
uv init my_project
cd my_project

# 가상환경 자동 생성 후 스크립트 실행
uv run main.py

# 기존 pip 사용자라면 이렇게도 사용 가능
uv pip install requests
			`} />

		<Title my="l" size="h2"> 프로젝트 만들기</Title>

		<Link href={"/spaceshipCaptain/setup#uv_init"} id="uv_init"/>
		<TwoColumn pb={false}>
		<CodeBlock code={`
uv init my_project

# 생성되는 폴더 구조
# my_project/
# ├── main.py            ← 시작점 파이썬 파일
# ├── pyproject.toml     ← 프로젝트 설정 및 패키지 정보
# ├── .python-version    ← 파이썬 버전 명시
# └── .gitignore         ← git 제외 파일 목록

# 현재 폴더에 바로 초기화하고 싶다면
uv init .

# 생성된 프로젝트로 이동 후 실행
cd my_project
uv run main.py
		`}
		/>
		<TwoColumnDes title="1. uv init space_shooter" 
		des={<>
<Code>uv init</Code>은 새로운 파이썬 프로젝트를 시작할 때 필요한 기본 구조를 자동으로 만들어주는 명령어인데, 마치 새 집에 이사하기 전에 방, 주방, 화장실 같은 기본 구조를 미리 설계해주는 건축 설계도와 같아요. <Code>uv init 프로젝트명</Code>을 실행하면 프로젝트 폴더 안에 <Code>pyproject.toml</Code>(프로젝트 정보와 의존성을 기록하는 파일), <Code>main.py</Code>(시작점이 되는 파이썬 파일), <Code>.python-version</Code>(사용할 파이썬 버전 기록 파일), <Code>.gitignore</Code>(git에 올리지 않을 파일 목록) 같은 파일들을 한 번에 자동으로 생성해줘요. 기존에는 프로젝트를 시작할 때마다 이 파일들을 하나하나 직접 만들어야 했지만, <Code>uv init</Code> 명령어 하나로 깔끔하게 준비된 프로젝트 공간을 바로 사용할 수 있어요.
		</>}/>
		</TwoColumn>
		
		<Link href={"/spaceshipCaptain/setup#pygame-ce"} id="pygame-ce"/>
		<TwoColumn pb={false}>
		<CodeBlock code={`
# pygame-ce 패키지 추가
uv add pygame-ce

# 설치 후 pyproject.toml 에 자동으로 기록됨
# [project]
# dependencies = [
#     "pygame-ce>=2.5.3",   ← 이렇게 자동으로 추가됨
# ]

# 다른 컴퓨터에서 같은 환경 재현할 때
uv sync
		`}
		/>

		<TwoColumnDes title="2. uv add pygame-ce" 
		des={<>
<Code>uv add pygame-ce</Code>는 파이썬 게임 개발 라이브러리인 <Code>pygame-ce</Code>를 현재 프로젝트에 추가하는 명령어인데, 마치 새로 지은 집(프로젝트)에 게임방 가구(라이브러리)를 배달 주문하는 것과 같아요. 명령어를 실행하면 <Code>uv</Code>가 자동으로 패키지를 다운로드해서 설치하고, <Code>pyproject.toml</Code> 파일의 의존성 목록에도 <Code>pygame-ce</Code>를 기록해줘서 나중에 다른 컴퓨터에서 같은 프로젝트를 열더라도 <Code>uv sync</Code> 한 번이면 똑같은 환경을 그대로 재현할 수 있어요. 참고로 <Code>pygame-ce</Code>는 기존 <Code>pygame</Code>을 더 활발하게 유지보수하고 개선한 커뮤니티 에디션(ce = Community Edition)으로, 더 빠른 업데이트와 버그 수정이 이루어지고 있어서 새 프로젝트라면 <Code>pygame-ce</Code>를 사용하는 것이 더 좋은 선택이에요.
		</>}/>
		</TwoColumn>


		<Title size="h2" my="m"> pygame 프로젝트 준비하기</Title>
		<Text my="m">main.py 파일에 아래의 코드를 작성해 주세요.</Text>

		<Link href="/spaceshipCaptain/setup#pygame-init" id={"pygame-init"}/>
		<TwoColumn pb={false}>
			<CodeBlock code={` import pygame `}/>
			<TwoColumnDes title="import pygame" des={
				<>
					pygame이라는 도구함을 현제 파일로 가져오는 코드예요. 
				</>}>
			</TwoColumnDes>
		</TwoColumn>

		<TwoColumn pb={false}>
			<CodeBlock code={`pygame.init()`}/>
			<TwoColumnDes title="pygame.init()" des={
				<>
				pygame의 모든 모듈을 준비 상태로 만드는 명령어예요. 빵을 굽기전에 오븐을 예열 하는 것 처첨 이것도 게임을 만들기 위한 준비상태로 만들어 줘요. 
					</>}/>
		</TwoColumn>

		<Link href="/spaceshipCaptain/setup#display_surface" id={"display_surface"}/>
		<TwoColumn pb={false}>
			<CodeBlock code={`
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
				`}/>
			<TwoColumnDes title={"pygame.display.set_mode"} des={
				<>
파이게임(pygame)으로 게임을 만들 때 가장 먼저 해야 할 일은 게임이 펼쳐질 화면 창을 만드는 것인데, 이건 마치 그림을 그리기 전에 도화지 크기를 정하는 것과 같아요. <Code>WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720</Code>은 도화지의 가로 길이를 1280픽셀, 세로 길이를 720픽셀로 정하는 것이고, 이렇게 두 변수를 한 줄에 동시에 값을 넣는 방식을 파이썬의 다중 할당(tuple unpacking) 이라고 해요. 그 다음 <Code>pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))</Code>는 실제로 그 크기의 창을 화면에 띄우는 명령인데, 여기서 소괄호 안에 소괄호가 한 번 더 들어가는 이유는 <Code>set_mode()</Code>가 받는 인자가 <Code>(가로, 세로)</Code> 형태의 튜플 이기 때문이에요. 그리고 반환된 결과를 <Code>display_surface</Code>라는 변수에 저장해 두는데, 이 변수가 앞으로 캐릭터나 배경 등 모든 것을 그려 넣을 도화지 역할을 하게 돼요.
				</>}/>
		</TwoColumn>

		<Link href="/spaceshipCaptain/setup#while-setup" id={"while-setup"}/>
		<CodeBlockExplainSection
		code={
			`
def main():
	running = True
	while running:
			pass
	pygame.quit()

			`}
		title={"while 루프 만들기"}
		des={<>
파이게임으로 만든 게임은 마치 TV처럼 꺼지기 전까지 계속 화면을 보여줘야 하기 때문에, 게임의 핵심 동작을 하나의 함수로 묶어서 관리하는 것이 일반적인데 여기서 <Code>def main():</Code>이 바로 그 게임 전체를 책임지는 중심 함수예요. 그 안의 <Code>running = True</Code>는 "게임을 계속 실행할 것인가"를 나타내는 스위치 역할로, 이 스위치가 켜져 있는 동안 <Code>while running:</Code> 반복문이 계속 돌아가면서 게임을 살아있게 유지해요. 지금은 반복문 안에 <Code>pass</Code>만 있는데, <Code>pass</Code>는 "아직 아무것도 안 하지만 일단 자리만 잡아 둘게"라는 의미로 나중에 이 자리에 키보드 입력 처리, 화면 그리기 같은 코드가 채워질 예정이에요. 마지막으로 <Code>running</Code>이 <Code>False</Code>가 되어 반복문을 빠져나오면 <Code>pygame.quit()</Code>이 실행되면서 파이게임이 사용하던 모든 자원을 깔끔하게 반납하고 종료하는데, 이건 마치 도서관에서 책을 다 읽고 나서 반드시 반납을 해야 하는 것과 같아요.
			</>}
		/>

	<Link href="/spaceshipCaptain/setup#event" id={"event"}/>
	<CodeBlockExplainSection 
	code={
	`
def main():
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
    pygame.quit()
	`}
	title={"pygame.event.get()"}
	des={
	<>
파이게임에서 <Code>pygame.event.get()</Code>은 마치 회사 민원 접수함처럼 사용자가 키보드를 누르거나 마우스를 클릭하거나 창을 닫으려 할 때 발생하는 모든 사건(이벤트)들을 리스트로 모아서 한꺼번에 꺼내주는 함수인데, <Code>for event in pygame.event.get():</Code>은 그 접수함 안에 쌓인 사건들을 하나씩 꺼내서 확인하는 반복문이에요. 꺼낸 사건이 <Code>event.type == pygame.QUIT</Code>, 즉 사용자가 창의 X 버튼을 눌러 종료를 요청한 사건인지 확인하고, 맞다면 <Code>running = False</Code>로 게임 루프 스위치를 꺼서 프로그램이 종료될 수 있도록 신호를 보내는 구조예요.
	</>}
	/>
	<Link href={"/spaceshipCaptain/setup#result"} id={"result"}>
		<Title size="h2" my="l">결과확인</Title>
	</Link>
	<CodeBlock
	code={`
import pygame

pygame.init()
WINDOW_WIDTH,  WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
def main():
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
    pygame.quit()


if __name__ == "__main__":
    main()
		`}/>
		</div>

	)
}
