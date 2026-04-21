import Title from "@/components/commons/Title";
import Text from "@/components/commons/Text";
import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
export default function Page() {
  return (
    <div className="p-10 pb-100">
      <Title id="spriteClass" my="m" size="h2">
        Sprite Class
      </Title>
      <Text>
        <Code>pygame.sprite.Sprite</Code>는 게임에 등장하는 캐릭터나 아이템 같은
        개별 객체를 만들기 위한 틀(부모 클래스)이고,{" "}
        <Code>pygame.sprite.Group()</Code>은 그 객체들을 한데 모아 관리하는
        바구니라고 생각하면 됩니다. 비유하자면 <Code>Sprite</Code>는 회사의
        "직원 명함 양식"이고, <Code>Group</Code>은 그 명함들을 전부 꽂아두는
        "명함첩"이에요. 직원 한 명 한 명은 <Code>Sprite</Code>를 상속받아
        자신만의 이미지(<Code>self.image</Code>)와 위치(<Code>self.rect</Code>
        )를 가지며, 명함첩인 <Code>Group</Code>에 넣어두면{" "}
        <Code>group.update()</Code> 한 줄로 모든 직원의 상태를 한 번에 갱신하고,{" "}
        <Code>group.draw(screen)</Code> 한 줄로 화면에 전부 그려낼 수 있어서
        객체가 수십 개가 되어도 반복문 없이 깔끔하게 관리할 수 있습니다.
      </Text>

      <Title my="m" size="h2" id="definePlayerClass">
        Sprite 클래스를 이용해서 우주선 만들기
      </Title>
      <CodeBlockExplainSection
        code={`#main.py
... #기존코드
pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")


class Player(pygame.sprite.Sprite): # <-- 새롭게 추가된 코드
    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)

    def update(self):
        pass

				`}
        title="player 클래스 정의하기"
        des={
          <>
            <Code>Player</Code> 클래스는 <Code>pygame.sprite.Sprite</Code>를
            상속받아 만든 게임 캐릭터 틀이며,{" "}
            <Code>super().__init__(group)</Code>을 통해 객체가 생성되는 순간
            자동으로 <Code>group</Code>에 등록되고, <Code>update()</Code>의{" "}
            <Code>pass</Code>는 나중에 이동이나 애니메이션 같은 로직을 채워 넣을
            빈 자리를 표시해 둔 것입니다.
          </>
        }
      />

      <CodeBlockExplainSection
        code={`
class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png") # <--  추가

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha() # <--  추가
        self.rect: pygame.FRect = self.image.get_frect( # <--  추가
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self):
        pass

				`}
        title="self.image와 self.rect 정의하기"
        des={
          <>
            새롭게 추가된 세 줄은 플레이어 이미지를 불러와서 화면에 배치하는
            코드로, <Code>path</Code>는 불러올 이미지 파일의 경로를 클래스
            변수로 저장해 둔 것이고,{" "}
            <Code>pygame.image.load(Player.path).convert_alpha()</Code>는 해당
            경로의 PNG 이미지를 불러오면서 투명도(알파 채널)를 처리하는 것이며,{" "}
            <Code>get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))</Code>
            는 이미지의 중심점을 화면 정중앙에 배치하는 코드입니다. 여기서{" "}
            <Code>FRect</Code>는 기존 <Code>Rect</Code>와 달리 소수점 좌표를
            지원해서 더 부드러운 움직임을 구현할 수 있습니다.
          </>
        }
      />
      <Title my="m" id={"check1"} size="h2">
        중간 점검
      </Title>
      <ToggleCodeBlock
        header="코드 확인하기"
        code={`
import pygame
from os.path import join

pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")


class Player(pygame.sprite.Sprite): # <-- player 클래스 정의
    path: str = join("images", "player.png")

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha() # <-- image
        self.rect: pygame.FRect = self.image.get_frect(  # <-- rect
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2) # <-- 위치
        )

    def update(self):
        pass


bg_path = join("images", "background.png")
bg_surf = pygame.transform.scale(
    pygame.image.load(bg_path).convert_alpha(), (WINDOW_WIDTH, WINDOW_HEIGHT)
)

clock = pygame.time.Clock()

def main():
    running = True
    all_sprite_group = pygame.sprite.Group() # <-- sprite.Group 생성하기

    Player(all_sprite_group) # <--- player 생성

    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        display_surface.fill("gray")
        all_sprite_group.update() #<-- 업데이트
        all_sprite_group.draw(display_surface) #<--그리기

        pygame.display.flip()
    pygame.quit()

if __name__ == "__main__":
    main()
				`}
      />
      <Title size="h2" my="l" id="updatePlayerClass">
        플레이어 이동시키기
      </Title>
      <CodeBlockExplainSection
        code={`
class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self, dt: float):
        self.rect.y -= 40 * dt  # <-- 위로 움직이게 만듬
				`}
        title="플레이어 업데이트하기 def update() "
        des={
          <>
            <Code>update(self, dt: float)</Code>는 게임 루프가 한 번 돌 때마다
            자동으로 호출되는 메서드로, 마치 시계 초침이 1초마다 한 칸씩
            움직이듯 매 프레임마다 플레이어의 상태를 갱신하는 역할을 합니다.
            여기서 <Code>dt</Code>는 이전 프레임과 현재 프레임 사이의 시간
            간격(델타 타임)으로, 컴퓨터 성능에 상관없이 항상 일정한 속도로
            움직이게 해주는 값이며, <Code>self.rect.y -= 40 * dt</Code>는 매
            프레임마다 플레이어를 위쪽으로 조금씩 이동시킵니다.
          </>
        }
      />
      <CodeBlockExplainSection
        code={`
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
				`}
        title="main 함수 수정하기"
        des={
          <>
            <Code>all_sprite_group.update(dt)</Code>는 그룹 안에 있는 모든
            스프라이트의 <Code>update(dt)</Code>를 한 번에 호출하는데,{" "}
            <Code>Player</Code>도 이 그룹 안에 있기 때문에 매 프레임마다{" "}
            <Code>Player.update(dt)</Code>가 자동으로 실행되어{" "}
            <Code>self.rect.y -= 40 * dt</Code>로 플레이어가 위로 이동하게 되고,{" "}
            <Code>all_sprite_group.draw(display_surface)</Code>는 그룹 안 모든
            스프라이트의 <Code>self.image</Code>를 <Code>self.rect</Code> 위치에
            그려주기 때문에 <Code>Player</Code>가 가진 플레이어 이미지가 갱신된
            위치에 화면에 출력됩니다.
          </>
        }
      />

      <Title id="check2" my="m" size="h2">
        중간점검 2
      </Title>
      <ToggleCodeBlock
        header={"코드 확인하기"}
        code={`
import pygame
from os.path import join

pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")


class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self, dt: float):
        self.rect.y -= 40 * dt  # <-- 위로 움직이게 만듬


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
      <Title id="keyboardInput" my="m" size="h2">
        키보드 입력으로 플레이어 이동시키기
      </Title>

      <CodeBlockExplainSection
        code={`
class Player(pygame.sprite.Sprite):
    path: str = join("images", "player.png")
    speed: float = 100 # <--- 속도
    velocity: pygame.Vector2 = pygame.Vector2(0, 0) # <--- 방향

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Player.path).convert_alpha()
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )

    def update(self, dt: float):
        pass

				`}
        title="속도와 방향 변수 추가하기"
        des={
          <>
            <Code>speed</Code>와 <Code>velocity</Code>는 둘 다 플레이어의
            움직임과 관련된 클래스 변수인데, 역할이 서로 달라요. speed는
            자동차의 속도계처럼 "얼마나 빠르게 움직일 수 있는가"를 나타내는 숫자
            하나이고, velocity는 내비게이션처럼 "어느 방향으로, 얼마나 빠르게
            이동할지"를 x와 y 두 축으로 함께 나타내는 값이에요.{" "}
          </>
        }
      />

      <CodeBlockExplainSection
        code={`
# main.py의 플레이어 클래스 정의 부분
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
        title="update 메서드 수정하기"
        des={
          <>
            <Code>pygame.key.get_pressed()</Code>는 마치 키보드 전체를 찍은
            사진처럼 현재 눌려있는 모든 키의 상태를 한 번에 담아오고,{" "}
            <Code>int(keys[pygame.K_d]) - int(keys[pygame.K_a])</Code>는
            오른쪽(D)이 눌리면 1, 왼쪽(A)이 눌리면 -1, 둘 다 안 눌리거나 둘 다
            눌리면 0이 되는 방식으로 좌우 방향을 숫자로 표현하며, 상하 방향도
            같은 원리로 <Code>K_s</Code>와 <Code>K_w</Code>로 계산합니다.{" "}
            <Code>normalize_ip()</Code>는 대각선으로 이동할 때 생기는 문제를
            해결하는데, 예를 들어 오른쪽과 아래쪽을 동시에 누르면 벡터 길이가 약
            1.41이 되어 대각선 이동이 상하좌우보다 빨라지기 때문에 이를 길이 1로
            맞춰주는 정규화 과정이며, 마지막으로{" "}
            <Code>self.rect.center += self.velocity * Player.speed * dt</Code>는
            방향 벡터에 속도와 델타 타임을 곱해 프레임 속도와 무관하게 일정한
            속도로 플레이어 위치를 업데이트합니다.
          </>
        }
      />
      <Title id="check3" size="h2" my="m">
        코드 확인하기
      </Title>
      <ToggleCodeBlock
        code={`
import pygame
from os.path import join

pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")

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
        header="코드 확인하기"
      />
    </div>
  );
}
