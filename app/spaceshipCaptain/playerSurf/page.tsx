import CodeBlock from "@/components/commons/CodeBlock.lazy";
import DownloadBtn from "@/components/commons/DownloadBtn";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import TwoColumnDes from "@/components/commons/TwoColumnDes";
import Image from "next/image";



export default function PlayerSurf() {
	return (
		<div className="p-5 pb-100">
			<Title my="l" size="h2">우주선 이미지 다운로드 받기</Title>
			<Text my="m" >아래의 버튼을 클릭해서 이미지를 다운로드 받으세요. </Text>
			<DownloadBtn label={"우주선 사진 받기"} fileKey={"spaceShooter/player.png"} />

			<Title my="m" size="h2">프로젝트 폴더에 이미지 저장하기</Title>
			<TwoColumn>
				<Image src={`${process.env.R2_CUSTOM!}/spaceShooter/plyaerImageLocation.png`} alt="이미지 저장 위치" width={150} height={150} className=" mx-auto min-w-sm rounded-lg" />
				<Text my="m">images 폴더를 만들고 image폴더 안에 다운로드 받은 사진을 저장하세요. vscode를 사용하는 경우 ctrl-o를 눌러서 다운로드 받은 파일을 열수 있어요. 또는 사진을 vscode 안으로 드래그 앤 드롭 방식으로 불러올 수 있어요. </Text>
			</TwoColumn>

			<Title my="m" size="h2">플레이어 이미지 그리는 코드 작성하기 </Title>
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

			<Title my="m" size="h2">지금 까지 완성된 코드</Title>
			<CodeBlock code={`#main.py
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

			<Title my="m" size="h2"> 연습하기 </Title>
			<Text my="l">원하는 플레이어 사진을 가져와서 게임에 넣어보기. 원하는 사진을 직접 찾아서 게임 속에 넣어보세요. 어디서 어떻게 찾아야 하는지 검색하는 것 부터 이미지 편집까지 스스로 해야 진정한 개발자에요. AI에게 이미지 생성을 부탁하는 것도 물론 가능하고, 직접 그려서 넣는 것도 가능해요. 하지만 아직은 코드에 집중하고 싶다면 아래의 이미지를 다운로드 받아서 코드를 작성해 보세요.</Text>
			<div className="flex flex-wrap gap-4">
				<DownloadBtn label={"보라 우주선"} fileKey={"spaceShooter/spaceship.png"} />
				<DownloadBtn label={"초록 우주선"} fileKey={"spaceShooter/ship_2.png"} />
				<DownloadBtn label={"파랑 우주선"} fileKey={"spaceShooter/ship_3.png"} />
			</div>

		</div>
	)
}

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
