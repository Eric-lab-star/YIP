import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
	return (
		<div className="p-10 pb-100">
			<Title id="bgClass" my="l">
				배경 클래스 만들기
			</Title>
			<Text my="m">
				앞에서 배웠던 player 클래스와 비슷하게 배경을 담당하는 Background
				클래스를 만들어볼까요? 배경은 게임 화면 전체를 덮는 이미지이기 때문에,
				player처럼 움직이는 것이 아니라 화면에 고정되어 있기만 하면 됩니다.
			</Text>
			<Title id="hint" size="h2" my="l">
				문제 해결을 위한 힌트
			</Title>
			<Text my="m">1. entity 패키지 안에 bg.py 모듈을 만드세요.</Text>
			<Text my="m">2. update 메소드에서 dt 매개변수를 만들어야합니다.</Text>
			<Text my="m">3. player 클래스와 거의 비슷하게 만들면 됩니다.</Text>
			<ToggleCodeBlock
				header="코드 확인하기"
				code={`#entity/bg.py
import pygame
from os.path import join
from settings import WINDOW_WIDTH, WINDOW_HEIGHT

class Background(pygame.sprite.Sprite):
    path: str = join("images", "background.png")

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.transform.scale(
            pygame.image.load(Background.path).convert_alpha(),
            (WINDOW_WIDTH, WINDOW_HEIGHT),
        )
        self.rect = self.image.get_frect()

    def update(self, dt: float):
        pass
				`}
			/>
		</div>
	);
}
