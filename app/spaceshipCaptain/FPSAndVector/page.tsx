import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
	return (
		<div className="p-10 mb-100">
			<Title my="m" size="h2" id={"vector"}>Vector</Title>
			<Text size="sm">pygame에서 벡터는 위치나 방향을 나타내는 화살표라고 생각하면 됩니다. 마치 보물 지도에서 "출발점에서 오른쪽으로 5걸음, 위로 3걸음 가세요"라고 적힌 것처럼, 벡터는 x와 y 두 개의 숫자로 방향과 거리를 동시에 표현합니다. 예를 들어 <Code>pygame.Vector2(5, 3)</Code>은 오른쪽으로 5, 위로 3만큼 이동하라는 의미인데, 이것은 캐릭터의 위치가 될 수도 있고 캐릭터가 움직이는 속도가 될 수도 있습니다. 특히 벡터의 장점은 계산이 편리하다는 건데, <Code>위치 = 위치 + 속도</Code>처럼 두 벡터를 더하면 자동으로 x끼리, y끼리 더해지고, <Code>속도.normalize()</Code>를 쓰면 방향은 유지하면서 크기를 1로 만들어주는 등 게임에서 자주 쓰는 계산들을 간단하게 처리할 수 있습니다. x와 y를 따로따로 관리하는 대신 하나의 벡터로 묶어서 관리하면 코드가 훨씬 깔끔하고 수학적 계산도 쉬워집니다.</Text>


			<CodeBlockExplainSection
				code={
					`#main.py
....# 기존코드
player_path = join("images", "player.png")
player_surf = pygame.image.load(player_path).convert_alpha()
pos = pygame.Vector2(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2) # <---새롭게 변경된 부분
player_rect = player_surf.get_frect(center=(pos))
	....
			`}
				title={`pygame.Vector2: 위치 `}
				des={<>
					이 코드에서는 기존에 입력받은 위치를 x와 y로 따로 관리하던 것을 <Code>pygame.Vector2()</Code>를 사용해서 하나의 벡터로 묶어서 관리하도록 변경한 부분입니다. <Code>pygame.Vector2(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)</Code>는 화면의 중앙을 나타내는 벡터를 생성하는 코드로, x값은 화면 너비의 절반, y값은 화면 높이의 절반이 됩니다. 이렇게 하면 나중에 위치를 업데이트할 때도 벡터 연산을 활용할 수 있어서 코드가 훨씬 깔끔해지고 직관적으로 이해하기 쉬워집니다.
				</>}
			/>

			<CodeBlockExplainSection
				code={
					`#main.py
....# 기존코드
def main():
    running = True
    speed = pygame.Vector2(2, 1) # <-- 새롭게 추가된 부분
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        player_rect.center += speed # <-- 새롭게 변경된 부분
        display_surface.blit(bg_surf, (0, 0))
        display_surface.blit(player_surf, player_rect)

        pygame.display.flip()
    pygame.quit()
	....
			`}
				title={`pygame.Vector2: 속도 `}
				des={<>
					이 코드에서는 speed라는 벡터를 새롭게 추가해서 캐릭터가 매 프레임마다 오른쪽으로 2, 아래로 1씩 이동하도록 설정한 부분입니다. <Code>speed = pygame.Vector2(2, 1)</Code>는 이동 속도를 나타내는 벡터를 생성하는 코드로, x값이 2이므로 오른쪽으로 2만큼, y값이 1이므로 아래로 1만큼 이동하라는 의미입니다. 그리고 <Code>player_rect.center += speed</Code>는 현재 위치에 speed 벡터를 더해서 캐릭터의 위치를 업데이트하는 코드로, 벡터 연산 덕분에 x와 y가 자동으로 더해져서 코드가 훨씬 간결해지고 이해하기 쉬워집니다.
				</>}
			/>

			<Title my="m" size="h2" id={"FPS"}>FPS</Title>
			<Text size="sm" >
				FPS는 Frames Per Second의 약자로 "1초에 화면을 몇 번 그리는가"를 나타내는 숫자입니다. 마치 플립북(손가락으로 빠르게 넘기는 만화책)을 생각해보면, 1초에 60장을 넘기면 부드럽게 움직이지만 1초에 10장만 넘기면 뚝뚝 끊기는 것처럼, 게임도 FPS가 높을수록 움직임이 자연스럽고 낮을수록 버벅거립니다. pygame에서는 <Code>clock.tick(60)</Code>을 사용해서 게임이 초당 60프레임으로 실행되도록 속도를 제한하는데, 이렇게 하지 않으면 고성능 컴퓨터에서는 게임이 엄청 빠르게 돌아가고 저성능 컴퓨터에서는 느리게 돌아가는 문제가 생깁니다. 일반적으로 60 FPS면 사람 눈에 매우 부드럽게 보이고, 30 FPS는 플레이 가능하지만 약간 버벅거리며, 15 FPS 이하는 게임이 느리게 느껴집니다.
			</Text>

			<CodeBlockExplainSection
				code={
					`#main.py
....# 기존코드
clock = pygame.time.Clock()
	....
			`}
				title={`pygame.time.Clock() `}
				des={<>
					이 코드는 파이게임에서 시간을 관리하는 Clock 객체를 생성하는 부분입니다. <Code>pygame.time.Clock()</Code>는 게임 루프의 실행 속도를 제어하는 데 사용되는 객체로, 이 객체를 사용해서 게임이 초당 몇 프레임으				 이 객체를 사용해서 게임이 초당 몇 프레임으로 실행될지를 설정할 수 있습니다.
				</>}
			/>


			<CodeBlockExplainSection
				code={
					`#main.py
....# 기존코드
def main():
    running = True
    speed = pygame.Vector2(20, 10)
    while running:
        dt = clock.tick(30) / 1000 # <-- 새롭게 추가된 부분
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        player_rect.center += speed * dt # <-- 새롭게 변경된 부분
        display_surface.blit(bg_surf, (0, 0))
        display_surface.blit(player_surf, player_rect)

        pygame.display.flip()
    pygame.quit()
	....
			`}
				title={`clock.tick(30) / 1000 `}
				des={<>
					이 코드는 FPS를 30으로 제한하면서 dt라는 변수에 프레임 간의 시간 간격을 초 단위로 저장하는 부분입니다. <Code>clock.tick(30)</Code>은 게임이 초당 30프레임으로 실행되도록 속도를 제한하는 함수로, 이 함수는 실제로 지난 프레임과 현재 프레임 사이의 시간을 밀리초 단위로 반환합니다. 그래서 <Code>/ 1000</Code>을 해서 초 단위로 변환한 값을 dt에 저장하는데, 이렇게 하면 프레임 속도가 달라져도 캐릭터가 일정한 속도로 움직이도록 만들 수 있습니다. 예를 들어 <Code>player_rect.center += speed * dt</Code>는 speed 벡터에 dt를 곱해서 실제 이동 거리를 계산하는 코드로, FPS가 높아지면 dt가 작아지고 FPS가 낮아지면 dt가 커지기 때문에 캐릭터의 이동 속도가 일정하게 유지됩니다.
				</>}
			/>
			<Title id={"check"} my="m" size="h2">확인하기</Title>
			<CodeBlock code={`#main.py
import pygame
from os.path import join

pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

player_path = join("images", "player.png")
player_surf = pygame.image.load(player_path).convert_alpha()
pos = pygame.Vector2(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
player_rect = player_surf.get_frect(center=(pos))

bg_path = join("images", "background.png")
bg_surf = pygame.transform.scale(
    pygame.image.load(bg_path).convert_alpha(), (WINDOW_WIDTH, WINDOW_HEIGHT)
)

pygame.display.set_caption("space shooter")

clock = pygame.time.Clock()

def main():
    running = True
    speed = pygame.Vector2(20, 10)
    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        player_rect.center += speed * dt
        display_surface.blit(bg_surf, (0, 0))
        display_surface.blit(player_surf, player_rect)

        pygame.display.flip()
    pygame.quit()

if __name__ == "__main__":
    main()
				`} />

		</div>
	)
}
