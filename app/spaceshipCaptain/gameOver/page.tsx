import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import DownloadBtn from "@/components/commons/DownloadBtn";
import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

const gameStop = [
	{
		code: `
#... 기존코드 생략함
def main():
    running = True
    #   ┌───── 추가하기
    game_over = False
    direction = pygame.Vector2(0, 0)
    bg = Background()
    player = Player()
    meteor_event = pygame.event.custom_type()
    #   ┌───── 추가하기
    if not game_over:
        pygame.time.set_timer(meteor_event, 400)
#... 기존코드를 생략함
		`,
		title: "main 함수에 game_over 상태 추가하기",
		des: (
			<>
				현재 상태에서는 우주선이 운석과 충돌하면 게임이 바로 종료되도록
				프로그래밍되어 있어요. 이런 방식이라면 게임이 너무 자주 종료되므로 다른
				방식으로 수정해볼 거예요. 우선 충돌하면 우주선과 운석이 사라지도록
				수정할 거예요. <Code>main.py</Code>의 main 함수를 수정해 주세요. 지금
				수정하는 부분에서는 게임이 시작될 때 운석이 생성되는 타이머가 설정되어
				있는데, 게임이 끝났을 때는 타이머가 멈추도록 수정해 주세요.
			</>
		),
	},
	{
		code: `
#... 기존코드 생략함
        #   ┌───── 추가하기
        if not game_over:
            all_sprite_group.update(dt)
            if pygame.sprite.spritecollide(player, meteor_sprite_group, False):
                game_over = True

            all_sprite_group.draw(display_surface)
        else:
            display_surface.blit(bg.image)
            player.kill()
            meteor_sprite_group.empty()
#... 기존코드를 생략함
		`,
		title: "game_over 상태에 따른 화면 수정하기",
		des: (
			<>
				다음으로는 게임이 끝났을 때 화면에 우주선과 운석이 사라지도록 수정해 볼
				거예요. 그리고 게임이 끝났을 때 배경화면만 보이도록 수정해 주세요.
				지금은 게임이 끝나도 배경화면과 우주선, 운석이 모두 보이는 상태로
				유지되고 있어요. 게임이 끝났을 때는 배경화면만 보이도록 수정해 주세요.
			</>
		),
	},
];

const HUDClass = [
	{
		code: `#entity/hud.py
import pygame

class Hud(pygame.sprite.Sprite):
    def __init__(self):
        pass
    def update(self, dt: float):
        pass
		`,
		title: "Hud 클래스 만들기",
		des: <>먼저 가장 기본적인 뼈대가 되는 클래스를 작성합니다.</>,
	},
	{
		code: `
import pygame
# ┌──── 추가하기
from settings import all_sprite_group

class Hud(pygame.sprite.Sprite):
    def __init__(self):
#        ┌──── 추가하기
        super().__init__(all_sprite_group)

    def update(self, dt: float):
        pass
		`,
		title: "상속받고 그룹에 추가하기",
		des: (
			<>
				<Code>from settings import all_sprite_group</Code> 부분은 마치 학교에서
				반 배정표를 가져오는 것과 같아요. <Code>settings.py</Code>라는 파일에
				미리 만들어 둔 <Code>all_sprite_group</Code>이라는 스프라이트 그룹을 이
				파일로 불러오는 거예요. 그리고{" "}
				<Code>super().init(all_sprite_group)</Code>은 부모 클래스인{" "}
				<Code>pygame.sprite.Sprite</Code>의 초기화 메서드를 호출하면서, 동시에{" "}
				<Code>Hud</Code> 객체를 <Code>all_sprite_group</Code>에 자동으로
				등록하는 역할을 해요. 마치 신입사원이 입사할 때 회사 명단에 자기 이름을
				올리는 것처럼, <Code>Hud</Code> 스프라이트가 생성되는 순간 그룹에
				합류하게 되는 거예요.
			</>
		),
	},
	{
		code: `
import pygame
from settings import (
    all_sprite_group,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
)


class Hud(pygame.sprite.Sprite):
    font = pygame.font.Font(size=100)

    def __init__(self):
        super().__init__(all_sprite_group)
        self.image: pygame.Surface = Hud.font.render("Game Over", True, "white")
        self.rect = self.image.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))

    def update(self, dt: float):
        pass
		`,
		title: "게임 오버 텍스트 띄우기",
		des: (
			<>
				<Code>font = pygame.font.Font(size=100)</Code>은 클래스 변수로 선언된
				폰트 객체로, 마치 학교에서 공용 프린터 한 대를 반 전체가 함께 쓰듯이{" "}
				<Code>Hud</Code>의 모든 인스턴스가 동일한 폰트를 공유해요.{" "}
				<Code>self.image</Code>는{" "}
				<Code>Hud.font.render("Game Over", True, "white")</Code>를 통해 텍스트를
				하나의 이미지, 즉 <Code>pygame.Surface</Code>로 구워내는 것인데, 마치
				도장을 종이에 찍듯이 문자열을 픽셀로 변환해서 화면에 그릴 수 있는 형태로
				만드는 거예요. 그리고 <Code>self.rect</Code>는{" "}
				<Code>get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))</Code>를
				사용해서 이미지의 중심점을 화면 정중앙에 맞추는데, 액자를 벽 한가운데에
				걸 때 액자의 중심을 기준으로 위치를 잡는 것과 같은 원리예요.
			</>
		),
	},
	{
		code: `
import pygame

from settings import (
    all_sprite_group,
    meteor_sprite_group,
    missile_sprite_group,
    display_surface,
)
from entity.bg import Background
from entity.player import Player
from entity.meteor import Meteor
# ┌─ 추가하기
from entity.hud import Hud

clock = pygame.time.Clock()
		`,
		title: "main.py 수정하기",
		des: (
			<>
				다음으로 <Code>main.py</Code>파일에 Hud 클래스를 불러와서 게임이 끝났을
				때 화면에 띄우도록 수정해 볼 거예요.
				<Code>from entity.hud import Hud</Code> 부분을 추가해서{" "}
				<Code>main.py</Code>에서 Hud를 사용할 수 있게 만드는 과정이에요.
			</>
		),
	},
	{
		code: `
#... 생략된 기존의 main.py 코드
def main():
    running = True
    game_over = False
    direction = pygame.Vector2(0, 0)
    bg = Background()
    player = Player()
    hud = Hud()  # <--- 추가
    meteor_event = pygame.event.custom_type()
    if not game_over:
        pygame.time.set_timer(meteor_event, 400)
#... 생략된 기존의 main.py 코드
		`,
		title: "Hud 클래스 인스턴스 만들기",
		des: (
			<>
				화면에 글자를 띄우기 위해서 Hud 인스턴스를 생성해야합니다. 여기까지
				완성했다면 프로그램을 실행시켜서 문제없는지 확인을 해보세요.
			</>
		),
	},
];

const gameOverCondition = [
	{
		code: `
#                       ┌─ 추가하기
def __init__(self, msg=""):
		super().__init__(all_sprite_group)
		#                                       ┌─ 추가하기
		self.image: pygame.Surface = Hud.font.render(msg, True, "white")
		self.rect: pygame.FRect = self.image.get_frect(
				center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
		)
		`,
		title: "hud.py: init 함수 수정하기",
		des: (
			<>
				hud.py 파일의 init함수를 수정합니다. 이렇게 수정을 하면 Hud 인스턴스를
				만들때 글자가 나오지 않게 할 수 있습니다. 하지만 self.image에 필요한
				surface를 만드는 것은 가능하게 만들 수 있습니다.
			</>
		),
	},
	{
		code: `
#                   ┌─ 추가하기
def draw(self, msg: str):
		#                                         ┌─ 추가하기
		self.image: pygame.Surface = Hud.font.render(msg, True, "white")
		self.rect: pygame.FRect = self.image.get_frect(
				center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
		)
		`,
		title: "hud.py: draw 함수 만들기",
		des: (
			<>
				다음으로는 draw 함수를 만들어 볼 거예요. 이 함수는 Hud 클래스의
				인스턴스가 화면에 글자를 띄우도록 하는 역할을 해요. draw 함수는 msg라는
				문자열을 매개변수로 받아서, 그 문자열을 화면에 띄울 수 있는 이미지로
				변환하는 역할을 해요. 이렇게 하면 게임이 끝났을 때 draw 함수를 호출해서
				"Game Over"라는 글자가 화면에 보이도록 할 수 있어요.
			</>
		),
	},
	{
		code: `

# ... 생략된 기존 코드
if not game_over:
		all_sprite_group.update(dt)
		if pygame.sprite.spritecollide(player, meteor_sprite_group, False):
				game_over = True
		all_sprite_group.draw(display_surface)
else:
		display_surface.blit(bg.image)
		#   ┌───── 추가하기
		hud.draw("Game Over")
		#   ┌───── 추가하기
		display_surface.blit(hud.image, hud.rect)

		player.kill()
		meteor_sprite_group.empty()
# ... 생략된 기존 코드
		`,
		title: "main,py 파일 수정하기",
		des: (
			<>
				main.py 파일의 main 함수에서 게임이 끝났을 때 화면에 글자가 보이도록
				수정해 볼 거예요. <Code>if...else </Code> 구문에서
				<Code>game_over</Code>가 참일 경우, hud.draw 함수와 display_surface.blit
				함수가 실행되도록 만들어주세요.
			</>
		),
	},
];

const checkpoint1 = [
	{
		code: `
import pygame

from settings import (
    all_sprite_group,
    meteor_sprite_group,
    missile_sprite_group,
    display_surface,
)
from entity.bg import Background
from entity.player import Player
from entity.meteor import Meteor
from entity.hud import Hud

clock = pygame.time.Clock()


def main():
    running = True
    game_over = False
    direction = pygame.Vector2(0, 0)
    bg = Background()
    hud = Hud()
    player = Player()
    meteor_event = pygame.event.custom_type()
    if not game_over:
        pygame.time.set_timer(meteor_event, 400)

    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event:
                Meteor.spawn(3)
        if direction.length() > 0:
            direction.normalize_ip()

        pygame.sprite.groupcollide(
            meteor_sprite_group, missile_sprite_group, True, True
        )

        if not game_over:
            all_sprite_group.update(dt)
            if pygame.sprite.spritecollide(player, meteor_sprite_group, False):
                game_over = True
            all_sprite_group.draw(display_surface)
        else:
            display_surface.blit(bg.image)
            #   ┌───── 추가하기
            hud.draw("Game Over")
            #   ┌───── 추가하기
            display_surface.blit(hud.image, hud.rect)

            player.kill()
            meteor_sprite_group.empty()

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()
		`,
		header: "main.py",
	},
	{
		code: `
import pygame
from settings import (
    all_sprite_group,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
)


class Hud(pygame.sprite.Sprite):
    font = pygame.font.Font(size=100)

    #                       ┌─ 추가하기
    def __init__(self, msg=""):
        super().__init__(all_sprite_group)
        #                                       ┌─ 추가하기
        self.image: pygame.Surface = Hud.font.render(msg, True, "white")
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    #                   ┌─ 추가하기
    def draw(self, msg: str):
        #                                         ┌─ 추가하기
        self.image: pygame.Surface = Hud.font.render(msg, True, "white")
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self, dt: float):

        pass
		`,
		header: "entity/hud.py",
	},
];

const galmuriFont = [
	{
		code: `
# entity/hud.py
#.... 기존 코드 생략
class Hud(pygame.sprite.Sprite):
    #   ┌─ 추가하기
    font_path = join("images", "Galmuri9.ttf")
    #                           ┌─ 추가하기
    font = pygame.font.Font(font_path, size=100)

    def __init__(self, msg=""):
        super().__init__(all_sprite_group)
        self.image: pygame.Surface = Hud.font.render(msg, True, "white")
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def draw(self, msg: str):
        self.image: pygame.Surface = Hud.font.render(msg, True, "white")
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self, dt: float):
        pass
#.... 기존 코드 생략
		`,
		title: "폰트 바꾸기",
		des: (
			<>
				entity/hud.py 파일에서 Hud 클래스를 수정해서 폰트를 바꾸기를 해볼께요.
				우선 위에서 갈무리 폰트를 다운 받아서, images 폴더에 넣어주세요. 그 다음
				폰트 파일이 저장된 장소를 프로그램에게 알려주기 위해서
				<Code>font_path = join("images", "Galmuri9.ttf")</Code>를 입력해서
				클래스 변수로 설정하세요. 이제 Font 객체를 만들 때,{" "}
				<Code>pygame.font.Font(font_path, size=100)</Code> 로 수정해서
				폰트파일을 사용하도록 만들어주세요. 이렇게 수정을 하면 화면에 나오는
				글자가 갈무리 폰트로 바뀌어서 보이게 될 거예요.
			</>
		),
	},
];

const restartCode = [
	{
		code: `
#entity/player.py
#... 기존 코드 생략

class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")
    speed: float = 300
    velocity: pygame.Vector2 = pygame.Vector2(0, 0)
    missile_cooldown: float = 200
    missile_timer: float = 0

#... 기존 코드 생략
    #   ┌─ 추가하기
    def reset(self):
        self.rect.center = pygame.Vector2(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        all_sprite_group.add(self)

#... 기존 코드 생략
		`,
		title: "entity/player.py: reset 함수 만들기",
		des: (
			<>
				player 클래스에 reset 메소드를 추가하세요. <Code>reset</Code> 메소드는
				플레이어의 위치를 중앙으로 옮기고, 플레이어를
				<Code>all_sprite_group</Code>에 다시 추가하는 역할을 해요. 이렇게 하면
				게임이 끝났을 때 플레이어가 사라졌다가, 다시 시작할 때 중앙에서
				나타나도록 만들 수 있어요.
			</>
		),
	},
	{
		code: `
#... 기존 코드 생략

def main():
#... 기존 코드 생략
    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            #   ┌─ 추가하기
            elif event.type == meteor_event:
                Meteor.spawn(3)
            #   ┌─ 추가하기
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_r:
                if game_over:
                    all_sprite_group.add(bg)
                    player.reset()
                    hud.kill()
                    game_over = False
#... 기존 코드 생략
		`,
		title: "r 키를 눌렀을 때 게임 재시작하기",
		des: (
			<>
				r 키를 눌렀을 때 게임을 재시작하려면 r가 눌렸는지 감지를 해야합니다.
				지금가지 배웠던 <Code>pygame.key.get_just_presses()</Code>를 사용해하는
				것도 가능하지만 이번에는 다른 방법으로 감지하는 방법을 사용해 볼거에요.{" "}
				<Code>event.type</Code>로 <Code>KEYDOWN</Code> 이벤트를 감지해서 r키의
				눌림을 판단할 거에요. 그리고 r키가 눌렸다면 <Code>game_over</Code>가
				참인지 확인해서 게임이 끝난 상태에서만 재시작이 가능하도록 만들어주세요.
				게임이 재시작될 때는 배경화면과 플레이어를 다시 화면에 추가하고, hud는
				제거하는 방식으로 구현할 수 있어요.
			</>
		),
	},
	{
		code: `
# main.py 의 main 함수
		# 이벤트 루푸 아님
        if not game_over:
            all_sprite_group.update(dt)
            if pygame.sprite.spritecollide(player, meteor_sprite_group, False):
                game_over = True
            all_sprite_group.draw(display_surface)

        else:
            #   ┌─ 추가하기
            all_sprite_group.empty()
            #   ┌─ 추가하기
            meteor_sprite_group.empty()
            #   ┌─ 추가하기
            missile_sprite_group.empty()
            display_surface.blit(bg.image)
            hud.draw("Game Over")
            display_surface.blit(hud.image, hud.rect)
		`,
		title: "game_over 상태에서 스프라이트 그룹 초기화하기",
		des: (
			<>
				game_over 상태에서는 화면에 우주선과 운석이 보이지 않도록 스프라이트
				그룹을 초기화하는 코드를 추가해 주세요.{" "}
				<Code>all_sprite_group.empty()</Code>로 모든 스프라이트를 제거하고,{" "}
				<Code>meteor_sprite_group.empty()</Code>와{" "}
				<Code>missile_sprite_group.empty()</Code>로 운석과 미사일 그룹도
				초기화해 주세요. 이렇게 하면 게임이 끝났을 때 화면이 깔끔하게 정리되고,
				다시 시작할 때 새로운 게임이 시작되는 느낌을 줄 수 있어요.
			</>
		),
	},
];

const checkpoint2 = [
	{
		code: `
import pygame

from settings import (
    all_sprite_group,
    meteor_sprite_group,
    missile_sprite_group,
    display_surface,
)
from entity.bg import Background
from entity.player import Player
from entity.meteor import Meteor
from entity.hud import Hud

clock = pygame.time.Clock()


def main():
    running = True
    game_over = False
    direction = pygame.Vector2(0, 0)
    bg = Background()
    hud = Hud()
    player = Player()
    meteor_event = pygame.event.custom_type()
    if not game_over:
        pygame.time.set_timer(meteor_event, 400)

    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            #   ┌─ 추가하기
            elif event.type == meteor_event:
                Meteor.spawn(3)
            #   ┌─ 추가하기
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_r:
                if game_over:
                    all_sprite_group.add(bg)
                    player.reset()
                    hud.kill()
                    game_over = False

        if direction.length() > 0:
            direction.normalize_ip()

        pygame.sprite.groupcollide(
            meteor_sprite_group, missile_sprite_group, True, True
        )

        if not game_over:
            all_sprite_group.update(dt)
            if pygame.sprite.spritecollide(player, meteor_sprite_group, False):
                game_over = True
            all_sprite_group.draw(display_surface)

        else:
            #   ┌─ 추가하기
            all_sprite_group.empty()
            meteor_sprite_group.empty()
            missile_sprite_group.empty()
            display_surface.blit(bg.image)
            hud.draw("Game Over")
            display_surface.blit(hud.image, hud.rect)

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()

		`,
		header: `main.py`,
	},
	{
		code: `
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

    def __init__(self):
        super().__init__(all_sprite_group)
        self.image: pygame.Surface = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def spawn_missile(self):
        keys = pygame.key.get_just_pressed()
        if keys[pygame.K_SPACE]:
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
        self.rect.clamp_ip(pygame.Rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT))

        self.handleMissile()

    #   ┌─ 추가하기
    def reset(self):
        self.rect.center = pygame.Vector2(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        all_sprite_group.add(self)
		`,
		header: "entity/player.py",
	},
];

export default function Page() {
	return (
		<div className="pb-100 p-10">
			<Title id="gameOver" my="m">
				게임 오버
			</Title>
			<Text my="m">
				이번에는 우주선이 운석과 충돌했을 때 게임이 끝났다는 것을 알려주는 UI를
				만들어볼 거예요. 그리고 다시 시작하기 버튼을 누르면 게임이 처음부터 다시
				시작되도록 만들어볼게요. 이전 시간에 작성한 코드에 이어서 작성해야
				하므로, 코드가 없다면 이전 페이지로 돌아가서 코드를 다시 작성해야
				합니다.
			</Text>
			{gameStop.map((v, i) => (
				<CodeBlockExplainSection
					code={v.code}
					title={v.title}
					des={v.des}
					key={i}
				/>
			))}
			<Title id="hud" my="m" size="h2">
				HUD 클래스 만들기
			</Title>
			<Text my="m">
				이제는 화면에 게임이 종료되었다는 글자를 넣어볼 거에요. HUD란 화면에
				보이는 글자를 의미합니다.
			</Text>
			{HUDClass.map((v, i) => (
				<CodeBlockExplainSection
					code={v.code}
					title={v.title}
					des={v.des}
					key={i}
				/>
			))}
			<Title my="m" size="h2" id="conditional">
				게임 종료 표시하기
			</Title>
			<Text>
				화면에 글자를 표시하기까지는 잘 구현이 되었어요. 이제는 이 기능을 조금
				변형시켜서 게임이 종료되었을 때 게임이 끝났다는 글자가 나오도록
				프로그램밍을 해볼 차례에요.
			</Text>
			{gameOverCondition.map((v, i) => (
				<CodeBlockExplainSection
					code={v.code}
					title={v.title}
					des={v.des}
					key={i}
				/>
			))}
			<Title size="h3" id="checkpoint1">
				코드 확인하기
			</Title>
			{checkpoint1.map((v, i) => (
				<ToggleCodeBlock header={v.header} code={v.code} key={i} />
			))}

			<Title id="uploadFont" my="m" size="h3">
				폰트 변경하기
			</Title>
			<Text my="m">
				화면에 나오는 글자를 더 멋있게 만들어 주기 위해서 폰트를 변경시킬
				차례에요. 그리고 한국어를 지원하는 폰트를 사용해서 한글을 화면에 그려볼
				것 입니다.
			</Text>
			<DownloadBtn
				eager={false}
				label="갈무리 폰트"
				fileKey="spaceShooter/Galmuri9.ttf"
			/>
			{galmuriFont.map((v, i) => (
				<CodeBlockExplainSection
					code={v.code}
					title={v.title}
					des={v.des}
					key={i}
				/>
			))}
			<Title size="h2" id="restart">
				게임 재시작하기
			</Title>
			{restartCode.map((v, i) => (
				<CodeBlockExplainSection
					code={v.code}
					title={v.title}
					des={v.des}
					key={i}
				/>
			))}
			<Title id="checkpoint2" size="h2">
				코드 확인하기2
			</Title>
			{checkpoint2.map((v, i) => (
				<ToggleCodeBlock header={v.header} code={v.code} key={i} />
			))}
		</div>
	);
}
