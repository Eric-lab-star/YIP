import CodeBlock from "@/components/commons/CodeBlock.lazy";
export default function Page() {
  return (
    <div>
      <CodeBlock
        select={true}
        code={`
#settings.py
import pygame

WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
pygame.init()
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("space shooter")


all_sprite_group = pygame.sprite.Group()
meteor_sprite_group = pygame.sprite.Group()
missile_sprite_group = pygame.sprite.Group()
			`}
      />
    </div>
  );
}
