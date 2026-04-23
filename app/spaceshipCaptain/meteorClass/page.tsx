import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import DownloadBtn from "@/components/commons/DownloadBtn";
import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Image from "next/image";

const howToMakeMeteorClass = [
	{
		code: `
import pygame
from entity.meteor import Meteor  # <-- 추가
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
from entity.player import Player
from entity.bg import Background

pygame.init()
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")

clock = pygame.time.Clock()


def main():
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()
    Background(all_sprite_group)
    Meteor(all_sprite_group)  # <-- 추가
    Player(all_sprite_group)
    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        if direction.length() > 0:
            direction.normalize_ip()

        display_surface.fill("gray")

        all_sprite_group.update(dt)
        all_sprite_group.draw(display_surface)

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()
			`,
		header: "main.py 코드 확인하기",
	},
	{
		code: `
from os.path import join
import pygame


class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Meteor.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(center=(100, 100))

    def update(self, dt: float):
        pass
			`,
		header: "entity/meteor.py 코드 확인하기",
	},

]

export default function Page() {
	return <div className="p-10 pb-100">
		<Title>운석 클래스</Title>
		<Text my="m">
			운석 클래스는 entity/meteor.py 파일을 새로 만들어 작성합니다. 운석
			이미지 또한 아래의 버튼을 클릭하고 images 폴더에 저장합니다.
		</Text>

		<DownloadBtn
			label={"운석 이미지 저장하기"}
			fileKey="spaceShooter/meteor.png"
			eager={true}
		/>
		<Title size="h2" my="m" id="createMeteorClass">운석 클래스 만들기</Title>
		<Text>지금까지 배워왔던 대로 운석 클래스를 만들어서 게임화면에 잘 나오는지 확인하세요.</Text>
		<div className="relative w-full h-96">
			<Image src={`${process.env.R2_CUSTOM}/spaceShooter/meteorResult1.png`} alt="image of meteor inserted to display window" fill={true} />
		</div>
		{howToMakeMeteorClass.map((item, index) => (<ToggleCodeBlock key={index} header={item.header} code={item.code} />))}
		<Title id="move" my="m" size="h2">운석 이동시키기</Title>
		<CodeBlockExplainSection code="" title="" des="" />
	</div>
}
