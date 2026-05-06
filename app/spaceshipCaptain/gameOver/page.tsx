import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
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
		</div>
	);
}
