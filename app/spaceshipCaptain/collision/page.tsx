import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import VideoPlayer from "@/components/commons/VideoPlayer";

export default function Page() {
	return (
		<div className="p-10 pb-100">
			<Title id="collision" size="h2" my="l">
				충돌처리하기
			</Title>
			<Text my="m">
				게임을 만들다 보면 화면 위의 물체들이 서로 부딪혔을 때 무언가 일어나게
				만들어야 하는 순간이 반드시 오는데, 예를 들어 미사일이 운석에 맞으면
				운석이 사라지거나, 플레이어가 운석에 닿으면 목숨이 줄어드는 것처럼
				게임의 핵심 규칙들이 모두 이 충돌 감지에서 시작됩니다. 그런데 pygame에서
				스프라이트들은 실제로 물리적으로 부딪히는 게 아니라 그냥 화면에 그려진
				그림일 뿐이기 때문에, 파이썬 코드가 직접 두 물체의 위치를 계산해서
				겹쳤는지 판단해줘야 합니다. pygame은 이 작업을 편하게 처리할 수 있도록
				충돌 감지 함수들을 미리 만들어 두었는데, 오늘은 그중에서 두 가지 상황을
				다룰 것입니다. 첫 번째는 미사일 그룹과 운석 그룹처럼 여러 물체와 여러
				물체가 동시에 충돌하는지 확인하는 방법이고, 두 번째는 플레이어 한 명이
				운석 그룹 전체와 충돌하는지 확인하는 방법으로, 같은 충돌 감지이지만
				상황에 따라 사용하는 함수와 방식이 달라집니다.
			</Text>
			<Title my="m" size="h2" id="spritecollide">
				플레이어와 운석 충돌 확인하기
			</Title>
			<CodeBlockExplainSection
				code={`
#...main.py의 기존 코드
def main():
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()
    meteor_sprite_group = pygame.sprite.Group()  # <-- 운석 그룹 생성하기
    Background(all_sprite_group)
    player = Player(all_sprite_group)
    meteor_event = pygame.event.custom_type()
    pygame.time.set_timer(meteor_event, 400)
#...main.py의 기존 코드
						`}
				title="운석 그룹 만들기"
				des={
					<>
						새로운 그룹을 만들어서 운석들을 관리해봅시다. main.py의 main함수
						안에 <Code>meteor_sprite_group = pygame.sprite.Group()</Code>를
						추가하세요. 이렇게 하면 나중에 플레이어와 운석이 충돌하는지 쉽게
						확인할 수 있습니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
#...main.py의 기존 코드
    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event:
                Meteor.spawn(
                    (all_sprite_group, meteor_sprite_group), 3
                )  # <--- 추가하기
#...main.py의 기존 코드
				`}
				title="운석에 그룹 추가하기"
				des={
					<>
						<Code>Meteor</Code>인스턴스를 생성할 때 위에서 새롭게 만든{" "}
						<Code>meteor_sprite_group</Code>와 <Code>all_sprite_group</Code>를
						모두 넣어서 생성합니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
#... meteor.py의 기존 코드
    def __init__(
        self, group: Tuple[pygame.sprite.Group, pygame.sprite.Group]
    ):  # <-- 수정하기
        self._layer = 1
        super().__init__(group)
        self.image = Meteor.surf
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0))
        )
        self.speed: float = random.randint(300, 500)
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1)

    @classmethod
    def spawn(
        cls, group: Tuple[pygame.sprite.Group, pygame.sprite.Group], n: int
    ):  # <-- 수정하기
        if n <= 0:
            raise ValueError("n must be greater than 0")
        for _ in range(n):
            Meteor(group)
#... meteor.py의 기존 코드
				`}
				title="Meteor 클래스 수정하기"
				des={
					<>
						그룹을 튜플의 형태로 넣어주기 때문에 클래스에서{" "}
						<Code>__init__</Code>가 정의된 부분에서 <Code>group</Code>의 형태를
						튜플로 바꿔줘야합니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
from os.path import join
import random
from typing import Tuple  # <-- 추가하기
import pygame
from settings import WINDOW_HEIGHT, WINDOW_WIDTH
#... meteor.py의 기존 코드
				`}
				title="운석 클래스 수정하기"
				des={
					<>
						meteor.py 파일의 가장 위에 <Code>from typing import Tuple</Code>를
						추가합니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
#...main.py의 기존 코드
        if direction.length() > 0:
            direction.normalize_ip()

        collision = pygame.sprite.spritecollide(player, meteor_sprite_group, False) # <-- 추가하기
        print(collision) # <-- 추가하기

        display_surface.fill("gray")

#...main.py의 기존 코드
					`}
				title="pygame.sprite.spritecollide()로 충돌 확인하기"
				des={
					<>
						플레이어와 운석이 충돌하는지 확인하려면, main.py의 main함수 안에서{" "}
						<Code>pygame.sprite.spritecollide()</Code> 함수를 사용하면 됩니다.
						이 함수는 첫 번째 인자로 충돌을 확인할 스프라이트(여기서는
						플레이어)를 받고, 두 번째 인자로 충돌을 확인할 스프라이트
						그룹(여기서는 운석 그룹)을 받습니다. 세 번째 인자는 충돌이
						감지되었을 때 해당 스프라이트를 그룹에서 제거할지 여부를 나타내는데,
						여기서는 아직 제거하지 않을 것이므로 <Code>False</Code>로
						설정합니다. 이 코드를 추가한 후 게임을 실행하면, 플레이어가 운석과
						충돌할 때마다 콘솔에 충돌한 운석들의 리스트가 출력되는 것을 볼 수
						있습니다.
					</>
				}
			/>

			<Title id="collisionResult" my="m" size="h2">
				예상되는 결과
			</Title>
			<VideoPlayer
				src={`${process.env.R2_CUSTOM}/spaceShooter/collisionResult.mp4`}
			/>
			<Text>
				플레이어와 운석이 충돌 할 때 위의 영상처럼 어떤 글자가 출력되어야
				합니다.
			</Text>

			<Title id="quit" my="m" size="h2">
				운석과 충돌할 때 게임 종료하기
			</Title>
			<CodeBlockExplainSection
				code={`
#...main.py의 기존 코드
        if pygame.sprite.spritecollide(
            player, meteor_sprite_group, False
        ):  # <-- 추가하기
            running = False  # <-- 추가하기
#...main.py의 기존 코드
				`}
				title="조건문을 이용해서 종료시키기"
				des={
					<>
						pygame.sprite.spritecollide() 함수는 충돌이 감지되면 충돌한
						스프라이트들의 리스트를 반환하기 때문에, 이 함수를 조건문에 바로
						사용할 수 있습니다. 만약 플레이어가 운석과 충돌하면,{" "}
						<Code>running</Code> 변수를 <Code>False</Code>로 설정해서 게임
						루프가 종료되도록 만들어봅시다.
					</>
				}
			/>
			<Title my="m" size="h2">
				코드 확인하기
			</Title>

			<ToggleCodeBlock
				header="main.py"
				code={`
import pygame
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
from entity.bg import Background

pygame.init()
display_surface = pygame.display.set_mode(
    (WINDOW_WIDTH, WINDOW_HEIGHT),
)

from entity.player import Player
from entity.meteor import Meteor  # <-- 추가

pygame.display.set_caption("space shooter")


clock = pygame.time.Clock()


def main():
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()
    meteor_sprite_group = pygame.sprite.Group()
    Background(all_sprite_group)
    player = Player(all_sprite_group)
    meteor_event = pygame.event.custom_type()
    pygame.time.set_timer(meteor_event, 400)

    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event:
                Meteor.spawn(
                    (all_sprite_group, meteor_sprite_group), 3
                )  # <--- 추가하기

        if direction.length() > 0:
            direction.normalize_ip()

        if pygame.sprite.spritecollide(
            player, meteor_sprite_group, False
        ):  # <-- 추가하기
            running = False  # <-- 추가하기

        display_surface.fill("gray")

        all_sprite_group.update(dt)
        all_sprite_group.draw(display_surface)

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()

				`}
			/>
			<ToggleCodeBlock
				header="entity/meteor.py"
				code={`
from os.path import join
import random
from typing import Tuple  # <-- 추가하기
import pygame
from settings import WINDOW_HEIGHT, WINDOW_WIDTH


class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()

    def __init__(
        self, group: Tuple[pygame.sprite.Group, pygame.sprite.Group]
    ):  # <-- 수정하기
        self._layer = 1
        super().__init__(group)
        self.image = Meteor.surf
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0))
        )
        self.speed: float = random.randint(300, 500)
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1)

    @classmethod
    def spawn(
        cls, group: Tuple[pygame.sprite.Group, pygame.sprite.Group], n: int
    ):  # <-- 수정하기
        if n <= 0:
            raise ValueError("n must be greater than 0")
        for _ in range(n):
            Meteor(group)

    def update(self, dt: float):
        self.rect.center += self.direction * dt * self.speed
        if self.rect.top > WINDOW_HEIGHT:
            self.kill()
				`}
			/>

			<Title id="missileCollision" my="m" size="h2">
				미사일과 운석 충돌
			</Title>
			<Text>
				미사일과 운석의 충돌을 감지하기 위해서는 미사일 클래스에 새로운
				스프라이트 그룹을 전달해야합니다. 하지만 미사일 인스턴스는 플레이어
				클래스에서 생성되고 있음으로 미사일 클래스에 새로운 스프라이트 그룹을
				전달하기 위해서는 플레이어 클래스를 한번 거쳐서 미사일 클래스에 전달을
				해야합니다. 이 방식을 사용하면 코드가 많이 더러워 짐으로 코드를 깔끔하게
				유지하기 위해서 코드 리팩토링 작업을 진행합니다.
			</Text>
			<CodeBlockExplainSection
				code={`
# settings.py 코드
import pygame

WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720


all_sprite_group = pygame.sprite.Group() # <-- 추가
meteor_sprite_group = pygame.sprite.Group() # <-- 추가
missile_sprite_group = pygame.sprite.Group() # <-- 추가
				`}
				title={"settings.py 수정하기"}
				des={
					<>
						main.py 파일에서 만들었던 <Code>all_sprite_group</Code> 와{" "}
						<Code>meteor_sprite_group</Code>를 settings.py 파일로 가져오고{" "}
						<Code>missile_sprite_group</Code>를 추가합니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
# main.py 파일 수정하기
from settings import (
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    all_sprite_group,  # <-- 추가하기
    meteor_sprite_group,  # <-- 추가하기
    missile_sprite_group,  # <-- 추가하기
)
				`}
				title={"main.py 파일 수정하기"}
				des={
					<>
						settings.py에서 새롭게 만든 그룹들을 main.py로 가져옵니다. 이렇게
						하면 main.py에서 그룹들을 따로 만들 필요가 없어집니다. main.py에서
						그룹들을 제거하는 것도 잊지 마세요.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
# ...main.py의 기존 코드
def main():
    running = True
    direction = pygame.Vector2(0, 0)
    Background()  # <-- 수정
    player = Player()  # <-- 수정
    meteor_event = pygame.event.custom_type()
    pygame.time.set_timer(meteor_event, 400)

    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event:
                Meteor.spawn(3)  # <-- 수정
# ...main.py의 기존 코드
				`}
				title={"def main() 함수 수정하기"}
				des={
					<>
						이제 인스턴스를 생성할 때 그룹을 main.py 파일에서 넘겨주지 않고 바로
						클래스에 넣어줄 것이기 때문에 코드를 수정해야합니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`

# ...main.py의 main 함수 while 루프안 코드
        # ┌───── 추가하기
        pygame.sprite.groupcollide(
            meteor_sprite_group, missile_sprite_group, True, True
        )
# ...main.py의 main 함수 while 루프안 코드

				`}
				title={"def main() 함수에 미사일과 운석 충돌 감지 코드 추가하기"}
				des={
					<>
						pygame에서 두 스프라이트 그룹의 충돌을 감지하기 위해서는
						pygame.sprite.groupcollide함수를 사용해야 합니다. 충돌은 매 프레임
						마다 감지해야하기 때문에 while 루프 안에 코드를 추가해야합니다. 이
						함수는 첫 번째 인자로 충돌을 확인할 스프라이트 그룹(여기서는 운석
						그룹)을 받고, 두 번째 인자로 충돌을 확인할 스프라이트 그룹(여기서는
						미사일 그룹)을 받습니다. 세 번째와 네 번째 인자는 충돌이 감지되었을
						때 해당 스프라이트를 그룹에서 제거할지 여부를 나타내는데, 여기서는
						충돌이 감지되면 운석과 미사일 모두 제거되도록 <Code>True</Code>로
						설정합니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
import pygame
from os.path import join
#                                          추가 하기 ─────┐
from settings import WINDOW_WIDTH, WINDOW_HEIGHT, all_sprite_group


class Background(pygame.sprite.Sprite):
    path: str = join("images", "background.png")

#    수정하기 ─────┐
    def __init__(self):
#          수정하기 ─────┐
        super().__init__(all_sprite_group)
        self.image = pygame.transform.scale(
            pygame.image.load(Background.path).convert_alpha(),
            (WINDOW_WIDTH, WINDOW_HEIGHT),
        )
        self.rect = self.image.get_frect()

    def update(self, dt: float):
        pass

				`}
				title={"Background 클래스 수정하기"}
				des={
					<>
						기존에 group을 설정하는 방식을 모두 수정해야 합니다. 이제 Background
						클래스의 인스턴스를 만들 때 그룹을 인수로 넣지 않아도 됩니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
from os.path import join
import random
import pygame

#                                   수정하기 ─────┐
from settings import WINDOW_HEIGHT, WINDOW_WIDTH, all_sprite_group, meteor_sprite_group


class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()

    #    수정하기 ─────┐
    def __init__(self):
        #    수정하기 ─────┐
        super().__init__(all_sprite_group, meteor_sprite_group)
        self.image = Meteor.surf
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0))
        )
        self.speed: float = random.randint(300, 500)
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1)

    @classmethod
    def spawn(cls, n: int):  # <-- 수정하기
        if n <= 0:
            raise ValueError("n must be greater than 0")
        for _ in range(n):
            Meteor()

    def update(self, dt: float):
        self.rect.center += self.direction * dt * self.speed
        if self.rect.top > WINDOW_HEIGHT:
            self.kill()
				`}
				title="Meteor 클래스 수정하기"
				des={
					<>
						운석 클래스 또한 인스턴스를 생성할 때 그룹을 전달할 필요가 없게
						수정을 합니다.
					</>
				}
			/>

			<CodeBlockExplainSection
				title={"Player 클래스 수정하기"}
				des={
					<>
						Player 클래스에서는 Missile 인스턴스를 생성하는 부분 또한 있음으로
						두 부분다 수정해야합니다. 또한 파일의 상단에 settings.py에서 새롭게
						만든 그룹들을 가져오는 것도 잊지 마세요.
					</>
				}
				code={`
#... Player 클래스 기존 코드
    # 수정하기 ─────┐
    def __init__(self):
        #       수정하기 ─────┐
        super().__init__(all_sprite_group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def spawn_missile(self):
        keys = pygame.key.get_just_pressed()
        if keys[pygame.K_SPACE]:
            # 수정하기 ─────┐
            Missile(pygame.Vector2(self.rect.midtop))
            Player.missile_timer = pygame.time.get_ticks()
#... Player 클래스 기존 코드
					`}
			/>
			<CodeBlockExplainSection
				code={`
import pygame
from os.path import join

# 수정하기 ─────┐
from settings import all_sprite_group, missile_sprite_group


class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()
    speed: float = 200

    # 수정하기 ─────┐
    def __init__(
        self,
        pos: pygame.Vector2,
    ):
        # 수정하기 ─────┐
        super().__init__(all_sprite_group, missile_sprite_group)
        self.image = Missile.surf
        self.rect: pygame.FRect = self.image.get_frect(midbottom=(pos))

    def update(self, dt: float):
        self.rect.centery -= dt * Missile.speed
        if self.rect.bottom < 0:
            self.kill()
				`}
				title="Missile 클래스 수정하기"
				des={
					<>
						Missile 클래스 또한 인스턴스를 만들때 그룹을 인수로 받을 필요없게
						하기 위해서 수정을 합니다.
					</>
				}
			/>
			<Title my="m" size="h2" id="check">
				코드 확인하기{" "}
			</Title>
			<ToggleCodeBlock
				header="main.py"
				code={`
import pygame

#
from settings import (
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    all_sprite_group,  # <-- 추가하기
    meteor_sprite_group,  # <-- 추가하기
    missile_sprite_group,  # <-- 추가하기
)
from entity.bg import Background

pygame.init()
display_surface = pygame.display.set_mode(
    (WINDOW_WIDTH, WINDOW_HEIGHT),
)

from entity.player import Player
from entity.meteor import Meteor


pygame.display.set_caption("space shooter")


clock = pygame.time.Clock()


def main():
    running = True
    direction = pygame.Vector2(0, 0)
    Background()  # <-- 수정
    player = Player()  # <-- 수정
    meteor_event = pygame.event.custom_type()
    pygame.time.set_timer(meteor_event, 400)

    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event:
                Meteor.spawn(3)  # <-- 수정
        if direction.length() > 0:
            direction.normalize_ip()

        if pygame.sprite.spritecollide(player, meteor_sprite_group, False):
            running = False
        # ┌───── 추가하기
        pygame.sprite.groupcollide(
            meteor_sprite_group, missile_sprite_group, True, True
        )

        display_surface.fill("gray")

        all_sprite_group.update(dt)
        all_sprite_group.draw(display_surface)

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()
				`}
			/>
			<ToggleCodeBlock
				header="settings.py"
				code={`
import pygame

WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720


all_sprite_group = pygame.sprite.Group()
meteor_sprite_group = pygame.sprite.Group()
missile_sprite_group = pygame.sprite.Group()
				`}
			/>
			<ToggleCodeBlock
				header="entity/player.py"
				code={`
import pygame
from os.path import join
from entity.missile import Missile
from settings import WINDOW_WIDTH, WINDOW_HEIGHT, all_sprite_group


class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")
    speed: float = 300
    velocity: pygame.Vector2 = pygame.Vector2(0, 0)
    missile_cooldown: float = 200
    missile_timer: float = 0

    # 수정하기 ─────┐
    def __init__(self):
        #       수정하기 ─────┐
        super().__init__(all_sprite_group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def spawn_missile(self):
        keys = pygame.key.get_just_pressed()
        if keys[pygame.K_SPACE]:
            # 수정하기 ─────┐
            Missile(pygame.Vector2(self.rect.midtop))
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
			<ToggleCodeBlock
				header="entity/bg.py"
				code={`
import pygame
from os.path import join
from settings import WINDOW_WIDTH, WINDOW_HEIGHT, all_sprite_group


class Background(pygame.sprite.Sprite):
    path: str = join("images", "background.png")

    def __init__(self):
        super().__init__(all_sprite_group)
        self.image = pygame.transform.scale(
            pygame.image.load(Background.path).convert_alpha(),
            (WINDOW_WIDTH, WINDOW_HEIGHT),
        )
        self.rect = self.image.get_frect()

    def update(self, dt: float):
        pass
				`}
			/>
			<ToggleCodeBlock
				header="entity/meteor.py"
				code={`
from os.path import join
import random
import pygame

#                                   수정하기 ─────┐
from settings import WINDOW_HEIGHT, WINDOW_WIDTH, all_sprite_group, meteor_sprite_group


class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()

    #    수정하기 ─────┐
    def __init__(self):
        #    수정하기 ─────┐
        super().__init__(all_sprite_group, meteor_sprite_group)
        self.image = Meteor.surf
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0))
        )
        self.speed: float = random.randint(300, 500)
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1)

    @classmethod
    def spawn(cls, n: int):  # <-- 수정하기
        if n <= 0:
            raise ValueError("n must be greater than 0")
        for _ in range(n):
            Meteor()

    def update(self, dt: float):
        self.rect.center += self.direction * dt * self.speed
        if self.rect.top > WINDOW_HEIGHT:
            self.kill()
				`}
			/>
			<ToggleCodeBlock
				header="entity/missile.py"
				code={`
import pygame
from os.path import join

# 수정하기 ─────┐
from settings import all_sprite_group, missile_sprite_group


class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()
    speed: float = 200

    # 수정하기 ─────┐
    def __init__(
        self,
        pos: pygame.Vector2,
    ):
        # 수정하기 ─────┐
        super().__init__(all_sprite_group, missile_sprite_group)
        self.image = Missile.surf
        self.rect: pygame.FRect = self.image.get_frect(midbottom=(pos))

    def update(self, dt: float):
        self.rect.centery -= dt * Missile.speed
        if self.rect.bottom < 0:
            self.kill()

				`}
			/>
			<Title size="h2" my="l" id="finalResult">
				결과확인하기
			</Title>
			<VideoPlayer
				src={`${process.env.R2_CUSTOM}/spaceShooter/collisionFinalResult.mp4`}
			/>
		</div>
	);
}
