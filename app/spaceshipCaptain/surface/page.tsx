
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import References from "@/components/commons/References";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

const moreLinks = [
	{
		label: "set_caption",
		src: "https://pyga.me/docs/ref/display.html#pygame.display.set_caption",
	},
	{
		label: "Surface.blit",
		src: "https://pyga.me/docs/ref/surface.html#pygame.Surface.blit",
	},
	{
		label: "Surface.fill",
		src: "https://pyga.me/docs/ref/surface.html#pygame.Surface.fill",
	},
]

export default function SurfacePage() {
	return (
		<div className="p-10 mb-100">
			<Title id={"display"} my="m" size="h2">pygame.display</Title>
			<Text>
<Code>pygame.display</Code>는 파이게임에서 화면 창과 관련된 모든 것을 담당하는 모듈로, 마치 TV 본체라고 생각하면 이해하기 쉬운데 TV를 켜고, 화면 크기를 설정하고, 화면에 영상을 뿌려주는 역할을 하는 것처럼 <Code>pygame.display</Code>도 창을 만들고, 제목을 붙이고, 화면을 새로 그려주는 기능들을 모아놓은 도구 모음이에요. 가장 자주 쓰이는 함수들로는 창을 생성하는 <Code>pygame.display.set_mode()</Code>, 창 상단에 제목을 붙이는 <Code>pygame.display.set_caption()</Code>, 그리고 매 프레임마다 화면 전체를 새로 갱신해 주는 <Code>pygame.display.flip()</Code>이 있는데, 특히 <Code>flip()</Code>은 그림을 다 그린 다음 도화지를 뒤집어서 완성된 그림을 보여주는 것과 같은 원리로 이걸 호출하지 않으면 화면에 아무것도 나타나지 않아요.
			</Text>

		<div id={"caption"}/>
		<CodeBlockExplainSection
		code={
			`#main.py
....# 기존코드
pygame.init()
WINDOW_WIDTH,  WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("pygame shooter") # <-- 창의 이름을 설정
def main():
	....# main 함수
			`}
		title={`display.set_caption()`}
		des={<>
<Code>pygame.display.set_caption("space shooter")</Code>는 게임 창 상단 제목 표시줄에 이름을 붙여주는 함수로, 마치 가게 간판처럼 창을 열었을 때 맨 위에 어떤 이름을 보여줄지 정하는 역할을 해요. 큰따옴표 안에 원하는 문자열을 넣으면 그게 그대로 창 제목이 되는데, 지금은 <Code>"space shooter"</Code>라고 넣었으니 창 상단에 "space shooter"라는 이름이 표시되고, 이 함수는 보통 창을 생성하는 <Code>pygame.display.set_mode()</Code> 바로 다음에 한 번만 호출하면 게임이 실행되는 내내 그 제목이 유지돼요.
			</>}
		/>	
		<div id={"flip"}/>
		<CodeBlockExplainSection 
		code={`#main.py
... #기존코드
	running = False
pygame.display.flip() # <-- 화면을 새로고침
pygame.quit()
			`}
		title={" pygame.display.flip()"}
		des={
			<>
<Code>pygame.display.flip()</Code>은 게임 화면을 실제로 눈에 보이게 출력해 주는 함수로, 마치 화가가 캔버스에 그림을 다 그린 후 관객에게 그림을 보여주기 위해 캔버스를 뒤집어 공개하는 것과 같은 원리인데, 파이게임은 실제로 보이는 화면과 뒤에서 그림을 그리는 화면 이렇게 두 개를 동시에 운영하는 더블 버퍼링 방식을 사용해서 뒤에서 완성된 그림을 <Code>flip()</Code>으로 앞으로 내보내는 구조예요. 만약 <Code>flip()</Code>을 게임 루프 안에서 호출하지 않으면 뒤에서 아무리 열심히 그림을 그려도 화면에는 아무것도 나타나지 않기 때문에, 반드시 매 프레임마다 한 번씩 호출해 줘야 해요.

			</>}
		/>
		
		<div id={"fill"}/>
		<CodeBlockExplainSection 
		code={`#main.py
...#기존 코드	
while running:
		for event in pygame.event.get():
				if event.type == pygame.QUIT:
						running = False

		display_surface.fill((250,250,0)) # <-- 화면 색상을 설정하는 코드 
		pygame.display.flip()
		`}
		title={"display_surface.fill()"}
		des={
			<>
<Code>display_surface.fill()</Code>은 게임 화면 전체를 하나의 색으로 채워주는 함수로, 마치 새 그림을 그리기 전에 도화지를 흰색이나 원하는 색으로 깔끔하게 덧칠하는 것과 같은 역할을 하는데, 괄호 안에는 <Code>(R, G, B)</Code> 형태의 튜플로 색을 지정하며 각각 빨강, 초록, 파랑의 값을 0부터 255 사이로 넣으면 돼요. 이 함수를 게임 루프 안에서 매 프레임마다 호출하는 이유는 이전 프레임에 그려진 그림이 그대로 남아있으면 캐릭터가 움직일 때 잔상이 남는 문제가 생기기 때문에, 새 프레임을 그리기 전에 항상 화면을 깨끗하게 지우는 용도로 사용해요.
			</>}
		/>
		
		<div id={"surface"}/>
		<CodeBlockExplainSection
		code={`#main.py
....#기존 코드
def main():
    running = True
    surf = pygame.Surface((100, 150)) #<--- 생성
    surf.fill("orange") #<-- 색상 설정
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        display_surface.fill((0,0,0))
        display_surface.blit(surf, (100,100)) # <-- 화면에 붙이기
        pygame.display.flip()
    pygame.quit()
			`}
		title={"pygame.Surface()"}
		des={
			<>
<Code>pygame.Surface()</Code>는 그림을 그릴 수 있는 새로운 도화지를 만들어주는 클래스로, 앞서 <Code>pygame.display.set_mode()</Code>로 만든 <Code>display_surface</Code>가 관객에게 보이는 무대 전체라면, <Code>pygame.Surface()</Code>로 만든 객체는 무대 위에 올려놓을 수 있는 작은 그림판 조각이라고 생각하면 이해하기 쉬운데, 예를 들어 캐릭터, 배경, 버튼 같은 요소들을 각각 별도의 <Code>Surface</Code>에 그린 다음 <Code>blit()</Code> 함수를 사용해서 메인 화면에 원하는 위치에 붙여넣는 방식으로 활용해요. 괄호 안에는 <Code>(가로, 세로)</Code> 형태의 튜플로 도화지 크기를 지정해요. 
			</>}
		/>

		<Title id="result" size="h2" my="m">결과 확인하기</Title>
		<div className="select-none">
			<CodeBlock 
		code={`#main.py
import pygame

pygame.init()
WINDOW_WIDTH,  WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("pygame shooter")

def main():
		running = True
		surf = pygame.Surface((100, 150))
		surf.fill("orange")
		while running:
				for event in pygame.event.get():
						if event.type == pygame.QUIT:
								running = False

				display_surface.fill((0,0,0))
				display_surface.blit(surf, (100,100))
				pygame.display.flip()
		pygame.quit() `}
			/>
		</div>

			<References moreLinks={moreLinks} />
		</div>
	)
}

