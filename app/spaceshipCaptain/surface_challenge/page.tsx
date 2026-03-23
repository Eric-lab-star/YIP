import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

import Link from "next/link";

export default function SurfaceChallenge() {


	return (
		<div className="p-10 mb-100">
			<Title my="m">색 바꾸기 과제</Title>
			<Text my="m"> 아래의 코드와 지금까지 배운 것을 활용해서 아래의 4가지 과제를 완료하세요.</Text>
			<CodeBlock 
			code={
				`#main.py
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
    pygame.quit()
main()

				`}
			/>
			<Title> 과제 </Title>
			<Title size="h2">1. 창의 제목을 colors로 바꾸세요.</Title>
			<Title size="h2">2. display_surface의 색상이 계속해서 랜덤한 색으로 바뀌게 만드세요.</Title>
			<Title size="h2">3. surf의 위치를 화면 정중앙으로 옮기세요.</Title>
			<Title size="h2">4. surf의 색을 흰색으로 바꾸세요.</Title>

		</div>
	)
}
