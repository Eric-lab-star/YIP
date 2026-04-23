import Title from "@/components/commons/Title";
import Text from "@/components/commons/Text";
import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import HorizontalLine from "@/components/commons/HorizontalLine";
import Image from "next/image";
import TwoColumn from "@/components/commons/TwoColumn";
import TwoColumnDes from "@/components/commons/TwoColumnDes";
import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
export default function Page() {
	return (
		<div className="p-10 pb-100">
			<Title id="intro" size="h2" my="l">
				모듈과 패키지
			</Title>
			<Text>
				모듈은 파이썬 코드가 담긴 하나의 .py 파일이고, 패키지는 그런 모듈들을
				폴더로 묶어놓은 것인데, 마치 요리책에 비유하자면 모듈은 "파스타 레시피
				페이지" 하나이고 패키지는 "이탈리안 요리책" 한 권 전체라고 볼 수 있어요.
				예를 들어 <Code>import math</Code>라고 하면 수학 관련 함수들이 담긴 모듈
				하나를 가져오는 것이고, <Code>from os.path import join</Code>처럼{" "}
				<Code>os</Code>라는 패키지 안의 <Code>path</Code>라는 모듈에서{" "}
				<Code>join</Code> 함수만 골라서 가져올 수도 있으며, 직접 만든 파일도
				같은 방식으로 <Code>import my_module</Code>처럼 불러올 수 있어서 코드를
				기능별로 파일에 나눠 관리하고 필요한 것만 가져다 쓸 수 있는 것이 모듈과
				패키지의 핵심입니다.
			</Text>

			<Title id="benefit" size="h2" my="l">
				패키지와 모듈 사용 이유
			</Title>

			<Text>
				코드를 하나의 파일에 모두 작성하면 마치 학교 사물함 하나에 교과서,
				체육복, 도시락, 우산을 전부 구겨넣는 것처럼 나중에 원하는 것을 찾기도
				힘들고 꺼내기도 불편해지는데, 파일을 기능별로 분리하면 "체육 시간엔 체육
				사물함만 열면 되는 것"처럼 <Code>player.py</Code>를 수정할 때 다른
				파일을 건드릴 필요가 없어서 유지보수가 쉬워지고, 같은{" "}
				<Code>player.py</Code>를 다른 프로젝트에서도 그대로 가져다 쓸 수 있는
				재사용성이 생기며, 팀으로 작업할 때도 A는 <Code>player.py</Code>, B는{" "}
				<Code>enemy.py</Code>를 각자 담당할 수 있어서 충돌 없이 협업이
				가능해집니다.
			</Text>
			<Title my="m" size="h3" id="benefitExample">
				예시
			</Title>
			<CodeBlock
				code={`
# 하나의 파일에 모두 작성 (나쁜 예)
main.py  ← 플레이어, 적, 총알, 배경, 점수판 코드가 전부 여기에...

# 기능별로 분리 (좋은 예)
main.py
entity/
├── __init__.py
├── player.py    ← 플레이어 관련 코드만
└── enemy.py     ← 적 관련 코드만
ui/
├── __init__.py
└── scoreboard.py  ← 점수판 관련 코드만
				`}
			/>
			<CodeBlock
				code={`
# main.py
from entity.player import Player
from entity.enemy import Enemy
from ui.scoreboard import Scoreboard

# 각 파일이 자기 역할만 담당하므로
# Player 버그 수정 → player.py만 열면 됨
# Enemy 추가 기능 → enemy.py만 열면 됨

				`}
			/>
			<HorizontalLine />
			<Title id="refactoring" size="h2" my="m">
				main.py 리팩토링하기
			</Title>
			<Text>
				리팩토링은 마치 방 청소와 같아서 방 안의 물건(기능)을 버리거나 새로 사는
				것이 아니라 어지럽게 놓여있던 물건들을 제자리에 정리하고 찾기 쉽게
				배치하는 작업인데, 코드에서도 동일하게 프로그램이 실행되는 결과는 전혀
				바꾸지 않으면서 코드의 구조를 더 읽기 쉽고 유지보수하기 좋게 개선하는
				모든 작업을 리팩토링이라고 하며, 대표적인 예로는 긴 함수를 작은 함수로
				쪼개기, 중복 코드를 하나로 합치기, 변수나 함수 이름을 더 명확하게
				바꾸기, 하나의 파일을 여러 모듈로 분리하기 등이 있습니다.
			</Text>
			<TwoColumn pb={false}>
				<div className="relative mx-auto w-80 h-64">
					<Image
						className="mx-auto"
						src={`${process.env.R2_CUSTOM}/spaceShooter/settings.png`}
						alt="settings.png file location"
						fill={true}
					/>
				</div>
				<TwoColumnDes
					title={"setttings.py 만들기"}
					des={"main.py 파일과 같은 위치에 settings.py 파일을 만드세요"}
				/>
			</TwoColumn>

			<CodeBlockExplainSection
				code={`#settings.py
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
				`}
				title="settings.py 파일 수정하기"
				des={
					<>
						settings.py 파일에 들어가서{" "}
						<Code>WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720</Code>을 입력하고
						저장하세요.
					</>
				}
			/>

			<CodeBlockExplainSection
				code={`#main.py 수정하기
import pygame
from settings import WINDOW_WIDTH, WINDOW_HEIGHT  # <-- 추가하기
from os.path import join `}
				title="settings.py import 하기"
				des={
					<>
						앞에서 만든 settings.py 모듈로 부터 창의 가로와 세로를 정해주는
						변수를 가져오는 코드를 작성해야 합니다. <Code>from settings </Code>
						는 settings.py 모듈을 의미하고 <Code>import</Code>는 가져온다는
						의미입니다. <Code>import</Code>뒤에는 settings.py 파일로 부터 가져올
						두 변수 <Code>WINDOW_WIDTH, WINDOW_HEIGHT </Code>를 입력합니다.{" "}
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`#main.py 수정하기
pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720  # <-- 이 부분을 찾아서 삭제하기
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")
					`}
				title="window_width, window_height 변수 삭제하기"
				des={
					<>
						이제 창의 가로세로는 setting.py에서 관리하며 settings.py에서 가져온{" "}
						<Code>WINDOW_WIDTH, WINDOW_HEIGHT</Code> 변수를 사용하기 때문에
						main.py에서 창의 가로세로를 정해주는 코드를 찾아서 삭제하세요. 이제
						창의 크기를 바꾸고 싶으면 main.py가 아니라 settings.py 파일만
						수정하면 됩니다.
					</>
				}
			/>
			<TwoColumn pb={false}>
				<div className="relative mx-auto w-75 h-64">
					<Image
						alt="player.py file location"
						src={`${process.env.R2_CUSTOM}/spaceShooter/playerClassFile.png`}
						fill={true}
					/>
				</div>
				<TwoColumnDes
					title="entity 폴더와 player.py 파일 만들기"
					des={
						<>
							이제는 player 클래스를 main.py 파일에서 분리해 줄 것 입니다.
							player 클래스는 entity 패키지를 만들어서 player.py 모듈에 정의해
							줄 것입니다.
						</>
					}
				/>
			</TwoColumn>
			<CodeBlockExplainSection
				code={`#entity/player.py 수정하기
import pygame
from os.path import join
from settings import WINDOW_WIDTH, WINDOW_HEIGHT


class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")
    speed: float = 100
    velocity: pygame.Vector2 = pygame.Vector2(0, 0)

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self, dt: float):
        keys = pygame.key.get_pressed()  # <-- 키 입력 받기
        self.velocity.x = int(keys[pygame.K_d]) - int(
            keys[pygame.K_a]
        )  # <-- 좌우방향 바꾸기
        self.velocity.y = int(keys[pygame.K_s]) - int(
            keys[pygame.K_w]
        )  # <-- 상하방향 바꾸기

        if self.velocity.length() > 0:
            self.velocity.normalize_ip()  # <-- 정규화

        self.rect.center += self.velocity * Player.speed * dt  # <-- 위치 업데이트
				`}
				title="player.py파일 수정하기"
				des={
					<>
						main.py에 정의되어 있던 player 클래스를 player.py 파일로 옮기고,
						player.py에서 settings.py에서 창의 가로세로를 가져와서 플레이어의
						초기 위치를 정해주는 코드를 작성하세요. 그리고 main.py에서는 player
						클래스를 가져와서 플레이어 객체를 만들어 보세요.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`#main.py
import pygame
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
from os.path import join
from entity.player import Player  # <-- 추가하기
				`}
				title="main.py에 Player 클래스 import 하기"
				des={
					<>
						이제 만들었던 패키지와 모듈에서 player 클래스를 가져와야 합니다.
						main.py 파일의 맨 위에 있는 import 구문에{" "}
						<Code>from entity.player import Player</Code>를 추가해서 player.py
						모듈에서 player 클래스를 가져오세요. 이제 main.py에서 player
						클래스를 사용할 수 있습니다.
					</>
				}
			/>

			<Title my="m" id="check" size="h2">
				코드 확인하기
			</Title>

			<ToggleCodeBlock
				header="main.py 확인하기"
				code={`
import pygame
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
from os.path import join
from entity.player import Player  # <-- 추가하기

pygame.init()
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")

bg_path = join("images", "background.png")
bg_surf = pygame.transform.scale(
    pygame.image.load(bg_path).convert_alpha(), (WINDOW_WIDTH, WINDOW_HEIGHT)
)

clock = pygame.time.Clock()


def main():
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()  # <-- sprite.Group 생성하기

    Player(all_sprite_group)  # <--- player 생성

    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        if direction.length() > 0:
            direction.normalize_ip()

        display_surface.fill("gray")

        all_sprite_group.update(dt)  # <-- 업데이트
        all_sprite_group.draw(display_surface)  # <--그리기

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()
				`}
			/>
			<ToggleCodeBlock
				header="settings.py 확인하기"
				code={`WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720`}
			/>
			<ToggleCodeBlock
				header="entity/player.py 확인하기"
				code={`
import pygame
from os.path import join
from settings import WINDOW_WIDTH, WINDOW_HEIGHT

class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")
    speed: float = 100
    velocity: pygame.Vector2 = pygame.Vector2(0, 0)

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self, dt: float):
        keys = pygame.key.get_pressed()  # <-- 키 입력 받기
        self.velocity.x = int(keys[pygame.K_d]) - int(
            keys[pygame.K_a]
        )  # <-- 좌우방향 바꾸기
        self.velocity.y = int(keys[pygame.K_s]) - int(
            keys[pygame.K_w]
        )  # <-- 상하방향 바꾸기

        if self.velocity.length() > 0:
            self.velocity.normalize_ip()  # <-- 정규화

        self.rect.center += self.velocity * Player.speed * dt  # <-- 위치 업데이트
				`}
			/>
		</div>
	);
}
