import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import DownloadBtn from "@/components/commons/DownloadBtn";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import TwoColumnDes from "@/components/commons/TwoColumnDes";
import Image from "next/image";

const displayImage = [
	{
		code: `#main.py
import pygame
from os.path import join  # <---새로운 코드 `,

		title: "join 라이브러리 가져오기",
		des: "프로젝트에 저장된 이미지의 위치를 알려주기 위해서는 os.path.join 라이브러리를 가져와야 해요. os.path.join 라이브러리는 파일의 위치를 알려주는 역할을 해요. join 라이브러리를 이용해서 이미지의 위치를 알려줄 거예요."
	},
	{
		code: `#main.py

DISPLAY_WIDTH, DISPLAY_HEIGHT = 1290, 720
display_surface = pygame.display.set_mode((DISPLAY_WIDTH, DISPLAY_HEIGHT))
pygame.display.set_caption("space shooter")

player_path = join("images", "player.png") #<-- 새로운 코드
player_surf = pygame.image.load(player_path).convert_alpha() #<-- 새로운 코드`,

		title: "이미지 가져오기",
		des: "join 라이브러리를 이용해서 이미지의 위치를 알려준 다음에 pygame.image.load 함수를 이용해서 이미지를 가져올 수 있어요. pygame.image.load 함수는 이미지의 위치를 알려주면 이미지를 가져오는 역할을 해요. convert_alpha()는 이미지를 투명하게 만들어주는 역할을 해요."
	},
	{
		code: `#main.py
display_surface.fill("gray")
display_surface.blit(player_surf, (100, 100)) #<--- 새로운 코드
 `,

		title: "이미지 그리기",
		des: "display_surface.blit 함수를 이용해서 이미지를 그릴 수 있어요. blit 함수는 이미지를 그리는 역할을 해요. blit 함수의 첫 번째 인자는 그릴 이미지이고, 두 번째 인자는 이미지가 그려질 위치에요. (100, 100)은 이미지가 그려질 위치를 나타내요. (0, 0)은 화면의 왼쪽 상단을 나타내고, (DISPLAY_WIDTH, DISPLAY_HEIGHT)는 화면의 오른쪽 하단을 나타내요."
	},
]


export default function PlayerSurf() {
	return (
		<div className="p-5 pb-100">
			<Title id="download" my="l" size="h2">우주선 이미지 다운로드 받기</Title>
			<Text my="m" >아래의 버튼을 클릭해서 이미지를 다운로드 받으세요. </Text>
			<DownloadBtn eager={true} label={"우주선 사진 받기"} fileKey={"spaceShooter/player.png"} />

			<Title my="m" size="h2">프로젝트 폴더에 이미지 저장하기</Title>
			<TwoColumn>
				<Image src={`${IMAGE_BASE_URL}/spaceShooter/plyaerImageLocation.png`} alt="이미지 저장 위치" width={150} height={150} className=" mx-auto min-w-sm rounded-lg" />
				<Text my="m">images 폴더를 만들고 image폴더 안에 다운로드 받은 사진을 저장하세요. vscode를 사용하는 경우 ctrl-o를 눌러서 다운로드 받은 파일을 열수 있어요. 또는 사진을 vscode 안으로 드래그 앤 드롭 방식으로 불러올 수 있어요. </Text>
			</TwoColumn>

			<Title id="image_surf"  my="m" size="h2">플레이어 이미지 그리는 코드 작성하기 </Title>
			{
				displayImage.map((item, index) => (
					<TwoColumn pb={false} key={index}>
						<CodeBlock code={item.code} />
						<TwoColumnDes
							title={`${index + 1}. ${item.title}`}
							des={item.des}
						/>
					</TwoColumn>
				))
			}

			<Title id="checkpoint1" my="m" size="h2">지금 까지 완성된 코드</Title>
			<CodeBlock select={false} code={`#main.py
import pygame
from os.path import join # <-- join 라이브러리 가져오기

pygame.init()

DISPLAY_WIDTH, DISPLAY_HEIGHT = 1290, 720
display_surface = pygame.display.set_mode((DISPLAY_WIDTH, DISPLAY_HEIGHT))
pygame.display.set_caption("space shooter") # <-- 게임 창 제목 설정

player_path = join("images", "player.png") # <-- 이미지 위치 알려주기
player_surf = pygame.image.load(player_path).convert_alpha() # <-- 이미지 가져오기


def main():
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        display_surface.fill("gray")
        display_surface.blit(player_surf, (100, 100)) # <-- 이미지 그리기
        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()
				`} />

			<Title id="practice" my="m" size="h2"> 연습하기 </Title>
			<Text my="l">원하는 플레이어 사진을 가져와서 게임에 넣어보기. 원하는 사진을 직접 찾아서 게임 속에 넣어보세요. 어디서 어떻게 찾아야 하는지 검색하는 것 부터 이미지 편집까지 스스로 해야 진정한 개발자에요. AI에게 이미지 생성을 부탁하는 것도 물론 가능하고, 직접 그려서 넣는 것도 가능해요. 하지만 아직은 코드에 집중하고 싶다면 아래의 이미지를 다운로드 받아서 코드를 작성해 보세요.</Text>
			<div className="flex flex-wrap gap-4">
				<DownloadBtn label={"보라 우주선"} fileKey={"spaceShooter/spaceship.png"} />
				<DownloadBtn label={"초록 우주선"} fileKey={"spaceShooter/ship_2.png"} />
				<DownloadBtn label={"파랑 우주선"} fileKey={"spaceShooter/ship_3.png"} />
			</div>

			<Title id="addingBG" my="l" size="h2">배경 추가하기</Title>
			<Text my="m">게임에 배경을 추가해 보세요. 배경을 추가하는 방법은 플레이어 이미지를 추가하는 방법과 똑같아요. 아래의 이미지를 다운로드 받아서 코드를 작성해 보세요.</Text>
			<DownloadBtn label={"우주 배경"} fileKey={"spaceShooter/background.png"} />
			<TwoColumn pb={false} >
				<CodeBlock code={
					`
bg_path = join("images", "background.png")
bg_surf = pygame.transform.scale( pygame.image.load(bg_path).convert_alpha(), (WINDOW_WIDTH, WINDOW_HEIGHT))
					`} />
				<TwoColumnDes
					title={`배경 추가하는 코드`}
					des={"이번 코드에서 사용되고 있는 pygame.transform.scale 함수는 이미지를 원하는 크기로 조절하는 역할을 해요. 배경 이미지는 화면 전체를 덮어야 하기 때문에 display_surface의 크기에 맞게 조절해주는 거예요."}
				/>
			</TwoColumn>
			<Title id="getFrect" my="m" size="h2"> Frect 이해하기 </Title>
			<Text>
게임에서 캐릭터를 화면 정중앙에 배치하고 싶을 때 좌표를 직접 입력하는 방식은 마치 방 안에 가구를 놓을 때 줄자로 일일이 재서 "왼쪽에서 375px, 위에서 275px"처럼 계산해서 넣는 것과 같아서, 화면 크기가 800x600이면 중심점이 (400, 300)이고 이미지 크기가 50x50이면 topleft 기준으로 (375, 275)를 직접 계산해야 하는 번거로움이 있고 화면 크기가 바뀌면 그 숫자를 전부 다시 계산해야 해요. 반면 <Code>get_frect(center=(400, 300))</Code>처럼 사용하면 "이 사각형의 중심을 (400, 300)에 맞춰줘"라고 말하는 것만으로 pygame이 이미지 크기를 보고 topleft 좌표를 알아서 계산해 주고, <Code>get_frect(midbottom=(400, 600))</Code>처럼 기준점을 자유롭게 바꿀 수 있어서 화면 하단 중앙, 우측 상단 같은 위치 지정이 직관적으로 가능하며, 나중에 이미지 크기가 바뀌어도 코드를 수정할 필요가 없어요.
			</Text>

			<div className="relative w-8/12 aspect-5/7 mx-auto">
				<Image 
				src={`${IMAGE_BASE_URL}/spaceShooter/pygame_ce_frect_explainer.svg`}
				alt="frec 설명 이미지"
				fill
				className="object-contain" 
				/>
			</div>
			<Text>
파이썬 게임에서 캐릭터를 움직일 때 일반 <Code>get_rect()</Code>는 마치 모눈종이 위에서만 이동하는 것처럼 위치값이 항상 정수(1, 2, 3...)로 딱딱 떨어져야 해서, 초당 2.5칸처럼 소수점이 필요한 속도로 움직이려 하면 매 프레임마다 소수점이 잘려 움직임이 끊겨 보이는 문제가 생겨요. 반면 pygame-ce의 <Code>get_frect()</Code>는 GPS 좌표처럼 <Code>x=150.75</Code>, <Code>y=230.3</Code> 같은 실수(float) 값을 그대로 저장할 수 있는 <Code>FRect</Code>를 반환해서, 느린 속도나 대각선 이동처럼 소수점이 생기는 상황에서도 위치가 매 프레임 정확하게 누적되어 훨씬 부드러운 움직임을 구현할 수 있어요. 사용법은 기존 <Code>get_rect()</Code>와 동일하게 <Code>image.get_frect(center=(x, y))</Code>처럼 키워드 인자로 초기 위치를 바로 지정할 수 있어요.
			</Text>
	<Text my="l">
		<Code>get_frect()</Code>의 인수는 마치 종이를 벽에 붙일 때 "왼쪽 위 모서리를 여기에 맞춰 붙여줘", "정중앙을 여기에 맞춰 붙여줘"처럼 사각형의 어느 기준점을 특정 위치에 고정할지 지정하는 키워드 인수들이에요. 자주 쓰이는 것들로는 사각형의 중심을 기준으로 하는 <Code>center=(x, y)</Code>, 좌측 상단을 기준으로 하는 <Code>topleft=(x, y)</Code>, 우측 상단의 <Code>topright=(x, y)</Code>, 좌측 하단의 <Code>bottomleft=(x, y)</Code>, 우측 하단의 <Code>bottomright=(x, y)</Code>가 있고, 각 변의 중간 지점을 기준으로 하는 <Code>midtop=(x, y)</Code>, <Code>midbottom=(x, y)</Code>, <Code>midleft=(x, y)</Code>, <Code>midright=(x, y)</Code>도 있어요. 단일 축만 지정하고 싶다면 <Code>centerx=x</Code>, <Code>centery=y</Code>처럼 x나 y 하나만 따로 설정하는 것도 가능하고, 가장 기본적인 <Code>x=값</Code>, <Code>y=값</Code>으로 좌측 상단 모서리의 좌표를 직접 지정할 수도 있어요.
	</Text>
		<Title id="fectCenter" my="m" size="h2">Frect를 사용해서 플레이어를 중앙에 배치하기</Title>
		<TwoColumn pb={false} >
			<CodeBlock code={
				`
player_path = join("images", "player.png")
player_surf = pygame.image.load(player_path).convert_alpha()
player_rect = player_surf.get_frect(center=(WINDOW_WIDTH/2, WINDOW_HEIGHT/2)) #<-- 새로운 코드
				`} />
			<TwoColumnDes
				title={`플레이어 중앙 배치하는 코드`}
				des={"get_frect() 함수를 사용해서 플레이어 이미지를 화면 중앙에 배치하는 코드예요. get_frect() 함수는 이미지의 크기를 보고 사각형의 크기를 자동으로 계산해 주고, center=(WINDOW_WIDTH/2, WINDOW_HEIGHT/2)처럼 키워드 인자로 중심점을 화면 중앙으로 지정해 주면, pygame이 알아서 topleft 좌표를 계산해서 player_rect에 저장해 줘요. 이렇게 하면 화면 크기가 바뀌어도 항상 플레이어가 중앙에 위치하게 돼요."}
			/>
		</TwoColumn>


		</div>
	)
}

