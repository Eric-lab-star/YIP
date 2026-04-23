import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import DownloadBtn from "@/components/commons/DownloadBtn";
import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Image from "next/image";

const howToMakeMissileClass = [
	{
		code: `#entity/missile.py
import pygame
from os.path import join

class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Missile.path).convert_alpha()
        self.rect = self.image.get_frect(center=(100, 100))

    def update(self, dt: float):
        pass
		`,
		title: "missile class",
		des: (
			<>
				이 코드는 게임에 등장할 미사일 객체를 만드는 설계도예요.
				<Code>Missile.path</Code>에 이미지 파일 경로를 저장해두고,
				<Code>init</Code>에서 <Code>super().__init__(group)</Code>으로
				스프라이트 그룹에 등록하면서 <Code>self.image</Code>로 겉모습을,
				<Code>self.rect</Code>로 화면 위 위치를 지정해요.
				<Code>update</Code>는 지금은 비어 있지만 나중에 미사일이 움직이는 로직을
				채워 넣을 자리예요.
			</>
		),
	},
	{
		code: `#main.py 파일 수정하기
from os.path import join
from entity.bg import Background
from entity.player import Player
from entity.missile import Missile # <-- 미사일 클래스 불러오기
#..... 기존에 있는 코드 생략
def main():
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()

    Background(all_sprite_group)

    Player(all_sprite_group)
    Missile(all_sprite_group) # <-- 추가하기

    while running:
#.... 기존에 있는 코드 생략
					`,
		title: "main.py에서 미사일 객체 만들기",
		des: (
			<>
				main.py 파일에서 미사일 객체를 만들고 프로그램을 실행시켜서 화면에
				미사일이 잘 나오는지 확인해보세요.
			</>
		),
	},
];

const howToFireMissile = [
	{
		code: `#entity/missile.py 수정하기
#...기존 미사일 코드
class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")
    speed: float = 200 # <-- 수정

    def __init__(self, group: pygame.sprite.Group, pos: pygame.Vector2):
        super().__init__(group)
        self.image = pygame.image.load(Missile.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(midbottom=(pos)) # <-- 수정

    def update(self, dt: float): # <-- 수정하기
        self.rect.centery -= dt * Missile.speed
        if self.rect.bottom < 0:
            self.kill()
				`,
		title: "미사일 클래스 수정하기",
		des: (
			<>
				미사일의 <Code>speed</Code> 속성을 추가해서 미사일이 움직이는 속도를
				지정해주고, <Code>init</Code>에서는 미사일이 생성될 때 위치를 받아서 그
				위치에서 미사일이 나오도록 수정해요. <Code>update</Code>에서는 매
				프레임마다 미사일이 위로 움직이도록 좌표를 업데이트하고, 화면 밖으로
				나가면 <Code>kill()</Code>로 제거되도록 해요.
			</>
		),
	},
	{
		code: `
import pygame
from os.path import join
from entity.missile import Missile # <-- 수정하기
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
					`,
		title: "player.py:  미사일 불러오기",
		des: (
			<>
				이제 player.py 파일에 Missile 클래스를 불러와서 player에서 미사일
				인스턴스를 생성할 수 있게 만들 거에요.
			</>
		),
	},
	{
		code: `
#... 기존 player.py 코드 생략
class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")
    speed: float = 200
    velocity: pygame.Vector2 = pygame.Vector2(0, 0)
    missile_cooldown: float = 200 #<-- 추가하기
    missile_timer: float = 0 #<--추가하기
#... 기존 player.py 코드 생략
					`,
		title: "player.py: 미사일 발사에 필요한 변수 추가하기",
		des: (
			<>
				미사일에 발사에 필요한 변수를 추가했어요. <Code>missile_cooldown</Code>{" "}
				미사일 너무 많이 발사하지 못하게 제한하는 변수이고{" "}
				<Code>missile_timer</Code>는 최근 미사일 발사 시간을 저장하는 변수에요.
			</>
		),
	},
	{
		code: `
#... 기존 player.py 코드 생략
    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )
        self.group: pygame.sprite.Group = group # <-- 추가하기
#... 기존 player.py 코드 생략
				`,
		title: "player 클래스 init 메서드 수정하기",
		des: (
			<>
				미사일에도 group을 전달하기 위해서 main.py파일에서 draw와 update
				메서드를 호출했을 때 미사일이 그려지도록 하기 위해서 group을 변수로
				설정해요.
			</>
		),
	},
	{
		code: `#player.py
#... 기존 player.py 코드 생략
    def update(self, dt: float):
        keys = pygame.key.get_pressed()
        self.velocity.x = int(keys[pygame.K_d]) - int(keys[pygame.K_a])
        self.velocity.y = int(keys[pygame.K_s]) - int(keys[pygame.K_w])

        if self.velocity.length() > 0:
            self.velocity.normalize_ip()

        self.rect.center += self.velocity * Player.speed * dt

        self.handleMissile() # <-- 추가하기
#... 기존 player.py 코드 생략
				`,
		title: "update 메서드 수정하기",
		des: (
			<>
				<Code>handleMissile</Code>이 메서드는 미사일과 관련된 일을 처리하는
				함수에요.{" "}
			</>
		),
	},
	{
		code: `#player.py
#... 기존 player.py 코드 생략
    def handleMissile(self):
        current_time = pygame.time.get_ticks()
        if current_time - Player.missile_timer > Player.missile_cooldown:
            self.spawn_missile()
#... 기존 player.py 코드 생략
				`,
		title: "handleMissile 메서드 추가하기",
		des: (
			<>
				이 메서드는 최근 미사일 발사시간과 현제 시간의 차이를 구해서 미사일
				쿨다운 시간보다 크다면 미사일을 발사한는 함수에요.
			</>
		),
	},
];

export default function Page() {
	return (
		<div className="p-10 pb-100">
			<Title my="l">미사일 클래스</Title>
			<Text my="m">
				미사일 클래스는 entity/missile.py 파일을 새로 만들어 작성합니다. 미사일
				이미지 또한 아래의 버튼을 클릭하고 images 폴더에 저장합니다.
			</Text>

			<DownloadBtn
				label={"미사일  이미지 저장하기"}
				fileKey="spaceShooter/missile.png"
				eager={true}
			/>
			{howToMakeMissileClass.map((item, index) => (<CodeBlockExplainSection key={index} title={item.title} des={item.des} code={item.code} />))}

			<Title my="l" size="h2">
				예상되는 결과
			</Title>
			<div className="relative w-full h-96">
				<Image
					src={`${process.env.R2_CUSTOM}/spaceShooter/missileResult100x100.png`}
					alt="expected result of game screen"
					fill={true}
				/>
			</div>

			<Title my="l" id="fireMissile" size="h2">
				미사일 발사하기
			</Title>
			<Text>
				미사일이 화면에 잘 나오는 것을 확인했다면 이제부터는 스페이스키를 눌렀을
				때 우주선에서 미사일이 나오도록 프로그래밍을 할거에요.
			</Text>
			{howToFireMissile.map((item, index) => (
				<CodeBlockExplainSection
					key={index}
					title={item.title}
					code={item.code}
					des={item.des}
				/>
			))}
			<Title id="check" size="h2">
				전체 코드 확인하기
			</Title>
			<ToggleCodeBlock
				header="main.py 코드 확인하기"
				code={`
import pygame
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
    main() `}
			/>
			<ToggleCodeBlock
				header="entity/missile.py 코드 확인하기"
				code={`
import pygame
from os.path import join


class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")
    speed: float = 200

    def __init__(self, group: pygame.sprite.Group, pos: pygame.Vector2):
        super().__init__(group)
        self.image = pygame.image.load(Missile.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(midbottom=(pos))

    def update(self, dt: float):
        self.rect.centery -= dt * Missile.speed
        if self.rect.bottom < 0:
            self.kill()
			`}
			/>
			<ToggleCodeBlock
				header="entity/player.py 코드 확인하기"
				code={`
import pygame
from os.path import join
from entity.missile import Missile  # <-- 수정하기
from settings import WINDOW_WIDTH, WINDOW_HEIGHT


class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")
    speed: float = 200
    velocity: pygame.Vector2 = pygame.Vector2(0, 0)
    missile_cooldown: float = 200
    missile_timer: float = 0

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )
        self.group: pygame.sprite.Group = group

    def spawn_missile(self):
        keys = pygame.key.get_just_pressed()
        if keys[pygame.K_SPACE]:
            Missile(self.group, pygame.Vector2(self.rect.midtop))
            Player.missile_timer = pygame.time.get_ticks()

    def handleMissile(self):
        current_time = pygame.time.get_ticks()
        if current_time - Player.missile_timer > Player.missile_cooldown:
            self.spawn_missile()

    def update(self, dt: float):
        keys = pygame.key.get_pressed()
        self.velocity.x = int(keys[pygame.K_d]) - int(keys[pygame.K_a])
        self.velocity.y = int(keys[pygame.K_s]) - int(keys[pygame.K_w])

        if self.velocity.length() > 0:
            self.velocity.normalize_ip()

        self.rect.center += self.velocity * Player.speed * dt

        self.handleMissile()
				`}
			/>
		</div>
	);
}
