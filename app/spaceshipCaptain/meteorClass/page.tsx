import Code from "@/components/commons/Code";
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
];

export default function Page() {
	return (
		<div className="p-10 pb-100">
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
			<Title size="h2" my="m" id="createMeteorClass">
				운석 클래스 만들기
			</Title>
			<Text>
				지금까지 배워왔던 대로 운석 클래스를 만들어서 게임화면에 잘 나오는지
				확인하세요.
			</Text>
			<div className="relative aspect-video mx-30">
				<Image
					src={`${process.env.R2_CUSTOM}/spaceShooter/meteorResult1.png`}
					alt="image of meteor inserted to display window"
					fill={true}
				/>
			</div>
			{howToMakeMeteorClass.map((item, index) => (
				<ToggleCodeBlock key={index} header={item.header} code={item.code} />
			))}
			<Title id="move" my="m" size="h2">
				운석 이동시키기
			</Title>
			<CodeBlockExplainSection
				code={`
#... 기존의 Meteor 클래스 코드
    def __init__(self, group: pygame.sprite.Group): # <-- 수정하기
        super().__init__(group)
        self.image = pygame.image.load(Meteor.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0)) # <-- 위치 설정
        )
        self.speed: float = random.randint(300, 500) # <-- 비행속도
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1) # <-- 비행 방향
#... 기존의 Meteor 클래스 코드
		`}
				title="__init__ 메서드 변경하기"
				des={
					<>
						이 코드에서는 운석의 속도, 방향, 위치를 정해주는 변수를 설정하고
						있어요. 이 값들은 모두 랜덤으로 설정되어서 매번 다른 위치에서 다른
						속도로 운석이 날아오게 됩니다.
					</>
				}
			/>

			<CodeBlockExplainSection
				code={`
#... 기존의 meteor 클래스 코드
    def update(self, dt: float):
        self.rect.center += self.direction * dt * self.speed
        if self.rect.top > WINDOW_HEIGHT:
            self.kill()
#... 기존의 meteor 클래스 코드
				`}
				title="update 메서드 작성하기"
				des={
					<>
						이 코드는 운석의 중심 좌표를 매 프레임 마다 변경시켜주는 코드입니다.
						운석이 화면 아래로 완전히 사라지면 kill() 메서드를 이용해서
						제거해줍니다.
					</>
				}
			/>

			<Title id="spawn" my="m" size="h2">
				운석 생성 이벤트
			</Title>
			<Text>
				운석이 한 개만 있으면 재미없어요. 게임의 재미을 위해서 운석이 여러개
				날아오게 만들어 봅시다.
			</Text>
			<CodeBlockExplainSection
				code={`
#... 기존의 meteor 클래스 코드
    @classmethod
    def spawn(cls, group: pygame.sprite.Group, n: int):
        if n <= 0:
            raise ValueError("n must be greater than 0")
        for _ in range(n):
            Meteor(group)
#... 기존의 meteor 클래스 코드
					`}
				title="spawn 클래스 메서드 작성하기"
				des={
					<>
						이 코드는 운석을 한 번에 여러 개 만들어내는 공장 같은 메서드예요.{" "}
						<Code>@classmethod</Code>는 Meteor 인스턴스를 먼저 만들지 않아도
						Meteor 클래스에서 바로 호출할 수 있게 해주는 표시인데, 마치 붕어빵
						하나를 사지 않아도 붕어빵 가게 주인에게 "5개 주세요"라고 바로 주문할
						수 있는 것과 비슷해요. <Code>spawn</Code> 메서드는 스프라이트
						그룹(group)과 만들 개수(n)를 받아서, n이 0 이하라면 "그 개수로는
						만들 수 없어요"라고 ValueError를 던지고, 그렇지 않으면 for
						반복문으로 n번 동안 Meteor 객체를 새로 만들어서 자동으로 group에
						넣어줘요. 덕분에 게임 화면에 운석 여러 개를 단 한 줄로 우르르 쏟아낼
						수 있는 아주 편리한 기능이 된답니다
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
#... 기존의 main.py 코드
    Background(all_sprite_group)
    Player(all_sprite_group)
    Meteor.spawn(all_sprite_group, 10) #<--수정하기
#... 기존의 main.py 코드
				`}
				title="main.py 파일에서 테스트하기"
				des={
					<>
						spawn 메서드를 이용해서 한 번에 10개의 운석을 만들어보세요. 게임
						화면에 운석이 여러 개 날아오는 것을 확인할 수 있을 거예요.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
#... 기존의 main.py 코드
    Meteor.spawn(all_sprite_group, 10)
    meteor_event = pygame.event.custom_type() # <-- 커스텀 이벤트 만들기
    pygame.time.set_timer(meteor_event, 400) # <-- 0.4초마다 meteor_event 이벤트 발생시키기

    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event: # <-- 이벤트가 발생할 때마다 운석 3개 생성하기
                Meteor.spawn(all_sprite_group, 3)
#... 기존의 main.py 코드
				`}
				title="event 만드기"
				des={
					<>
						이 코드는 일정한 시간마다 자동으로 무언가를 반복해서 발생시키는
						타이머 기능을 만드는 과정이에요. 먼저
						<Code>pygame.event.custom_type()</Code>은 파이게임이 기본으로
						제공하는 이벤트(QUIT, KEYDOWN 같은 것들) 말고 내가 직접 "운석 등장
						이벤트"라는 새로운 종류의 이벤트를 만드는 건데, 마치 학교 시간표에
						없던 "간식 시간"이라는 새 시간을 내가 직접 만들어서 등록하는 것과
						비슷해요. 그다음{" "}
						<Code>pygame.time.set_timer(meteor_event, 400)</Code>은 방금 만든 이
						이벤트를 400밀리초(0.4초)마다 자동으로 울리도록 알람을 맞추는 역할을
						해요. 마치 전자레인지에 "0.4초마다 삐 소리 내줘"라고 예약을 걸어두는
						느낌이에요. 마지막으로 게임 루프 안의{" "}
						<Code>if event.type == meteor_event</Code>는 이벤트 큐에서 "아, 방금
						울린 게 우리가 만든 운석 이벤트구나"하고 알아차리는 부분이에요. 이
						세 줄 덕분에 게임이 돌아가는 동안 0.4초마다 운석 3개가 하늘에서
						자동으로 떨어지는 장면을 연출할 수 있답니다.
					</>
				}
			/>
			<Title id="check1" size="h2" my="m">
				중간점검
			</Title>
			<ToggleCodeBlock
				header="main.py 전체 코드"
				code={`
import pygame
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
from entity.meteor import Meteor  # <-- 추가
from entity.player import Player
from entity.bg import Background

pygame.init()
display_surface = pygame.display.set_mode(
    (WINDOW_WIDTH, WINDOW_HEIGHT),
)
pygame.display.set_caption("space shooter")


clock = pygame.time.Clock()


def main():
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()
    Background(all_sprite_group)
    Player(all_sprite_group)
    meteor_event = pygame.event.custom_type()  # <-- 운석 이벤트
    pygame.time.set_timer(meteor_event, 400)  # <-- 타이머 설정

    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event:  # <-- 이벤트 발생 시 운석 생성
                Meteor.spawn(all_sprite_group, 3)

        if direction.length() > 0:
            direction.normalize_ip()

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
				header="entity/meteor.py 전체 코드"
				code={`
from os.path import join
import random
import pygame
from settings import WINDOW_HEIGHT, WINDOW_WIDTH


class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")

    def __init__(self, group: pygame.sprite.Group):
        self._layer = 1
        super().__init__(group)
        self.image = pygame.image.load(Meteor.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0))
        )
        self.speed: float = random.randint(300, 500)
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1)

    @classmethod
    def spawn(cls, group: pygame.sprite.Group, n: int):
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
			<Title id="surfOptimization" size="h2" my="l">
				최적화 시키기
			</Title>
			<Text>
				운석 객체가 하나 생길 때마다 <Code>pygame.image.load()</Code>가
				실행되면서 컴퓨터 하드디스크에서 같은 이미지 파일을 계속 다시 읽어오게
				되는데, 이건 마치 붕어빵을 하나 구울 때마다 밀가루를 사러 마트에
				다녀오는 것과 비슷해요. 운석 100개를 만들면 똑같은 meteor.png 파일을
				하드디스크에서 100번 꺼내 읽게 되고, 디스크에서 파일을 읽는 작업은
				메모리에서 꺼내는 것보다 훨씬 느리기 때문에 게임이 버벅거리는 원인이 될
				수 있어요. 또한 같은 이미지인데도 메모리에 똑같은 사본이 여러 개
				올라가서 메모리도 낭비하게 돼요. 그래서 이미지는 클래스 속성으로 딱 한
				번만 불러와 두고, 모든 운석 인스턴스가 그 하나의 이미지를 공유해서
				사용하도록 만드는 게 훨씬 효율적인 방법이에요. 마치 밀가루를 한 포대
				사와서 모든 붕어빵을 그걸로 굽는 것처럼요.
			</Text>
			<CodeBlockExplainSection
				code={`
#... 기존의 Meteor 클래스 코드
class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha() # <-- 클래스 변수 추가

    def __init__(self, group: pygame.sprite.Group):
        self._layer = 1
        super().__init__(group)
        self.image = Meteor.surf # <-- 수정하기
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0))
        )
        self.speed: float = random.randint(300, 500)
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1)
#... 기존의 Meteor 클래스 코드
					`}
				title="meteor 클래스 최적화하기"
				des={
					<>
						클래스 속성(<Code>path</Code>, <Code>surf</Code>)에 적힌 코드는
						파이썬이 <Code>class Meteor:</Code> 라는 클래스 정의문을 처음 읽는
						순간, 즉 해당 파일이 <Code>import</Code>되거나 실행되는 바로 그때 딱
						한 번만 실행돼요. 마치 빵집이 문을 여는 아침에 주인이 반죽을 미리
						만들어두는 것과 비슷해요. 손님(Meteor 인스턴스)이 한 명도 오지
						않았고 <Code>init</Code>이 호출되지도 않았지만, 클래스라는 "빵집
						자체"가 세워지는 순간에 <Code>pygame.image.load()</Code>가 실행돼서
						이미지가 메모리에 올라가는 거예요
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
import pygame
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
from entity.player import Player
from entity.bg import Background

pygame.init()
display_surface = pygame.display.set_mode(
    (WINDOW_WIDTH, WINDOW_HEIGHT),
)

from entity.meteor import Meteor  # <-- 위치 수정하기
					`}
				title="main.py 파일에서 import 위치 수정하기"
				des={
					<>
						파이썬에서 <Code>import</Code>는 단순히 파일을 "가져오기"만 하는 게
						아니라 그 파일 안의 코드를 위에서부터 아래로 실제로 실행하는
						동작이에요. 마치 요리책을 펼치는 순간 그 자리에서 바로 레시피대로
						요리가 시작되는 것과 같아요. 그래서 main.py에서 Meteor를 import 하는
						순간 meteor.py 안에 있는 클래스 속성{" "}
						<Code>surf = pygame.image.load(path).convert_alpha()</Code>도 즉시
						실행돼요. 그런데 <Code>convert_alpha()</Code>는{" "}
						<Code>pygame.display.set_mode()</Code>로 화면이 먼저 만들어져 있어야
						제대로 작동하기 때문에, 만약 import 문을 화면 초기화 코드보다 위에
						적으면 아직 화면이 없는 상태에서 이미지를 불러오려다가 에러가 나요.
						그래서 main.py에서는 pygame 초기화 코드를 먼저 실행한 뒤에 Meteor
						클래스를 import 해야 안전하답니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
import pygame
from os.path import join


class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha() # <-- 추가
    speed: float = 200

    def __init__(self, group: pygame.sprite.Group, pos: pygame.Vector2):
        super().__init__(group)
        self.image = Missile.surf # <-- 변경
        self.rect: pygame.FRect = self.image.get_frect(midbottom=(pos))

    def update(self, dt: float):
        self.rect.centery -= dt * Missile.speed
        if self.rect.bottom < 0:
            self.kill()
				`}
				title="missile 클래스 최적화하기"
				des={
					<>
						미사일 클래스도 운석 클래스를 최적화 했던 방식 그대로 최적화를
						진행합니다.
					</>
				}
			/>
			<CodeBlockExplainSection
				code={`
import pygame
from settings import WINDOW_WIDTH, WINDOW_HEIGHT
from entity.bg import Background

pygame.init()
display_surface = pygame.display.set_mode(
    (WINDOW_WIDTH, WINDOW_HEIGHT),
)

from entity.player import Player # <-- 위치수정
from entity.meteor import Meteor  
#... 기존의 main.py 코드
				`}
				title="main.py 파일에서 import 위치 수정하기"
				des={
					<>
						위에서 운석 클래스를 최적화하면서 <Code>main.py</Code>에서 Meteor를
						import 하는 위치를 화면 초기화 코드 아래로 옮겼는데, Player 클래스도
						마찬가지로 최적화가 필요한 상태예요. Player 클래스의 이미지도
						<Code>pygame.display.set_mode()</Code> 이후에 불러와야 하니까,
						<Code>main.py</Code>에서 Player를 import 하는 위치도 화면 초기화
						코드 아래로 옮겨주세요
					</>
				}
			/>
			<Title id="finalCode" my="l" size="h2">
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
    Background(all_sprite_group)
    Player(all_sprite_group)
    meteor_event = pygame.event.custom_type()  # <-- 운석 이벤트
    pygame.time.set_timer(meteor_event, 400)  # <-- 타이머 설정

    while running:
        dt = clock.tick(60) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == meteor_event:  # <-- 이벤트 발생 시 운석 생성
                Meteor.spawn(all_sprite_group, 3)

        if direction.length() > 0:
            direction.normalize_ip()

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
import pygame
from settings import WINDOW_HEIGHT, WINDOW_WIDTH


class Meteor(pygame.sprite.Sprite):
    path: str = join("images", "meteor.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()

    def __init__(self, group: pygame.sprite.Group):
        self._layer = 1
        super().__init__(group)
        self.image = Meteor.surf
        self.rect: pygame.FRect = self.image.get_frect(
            center=(random.randint(0, WINDOW_WIDTH), random.randint(-100, 0))
        )
        self.speed: float = random.randint(300, 500)
        self.direction: pygame.Vector2 = pygame.Vector2(random.randint(-1, 1), 1)

    @classmethod
    def spawn(cls, group: pygame.sprite.Group, n: int):
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
			<ToggleCodeBlock
				header="entity/missile.py"
				code={`
import pygame
from os.path import join


class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()
    speed: float = 200

    def __init__(self, group: pygame.sprite.Group, pos: pygame.Vector2):
        super().__init__(group)
        self.image = Missile.surf
        self.rect: pygame.FRect = self.image.get_frect(midbottom=(pos))

    def update(self, dt: float):
        self.rect.centery -= dt * Missile.speed
        if self.rect.bottom < 0:
            self.kill()
				`}
			/>
		</div>
	);
}
