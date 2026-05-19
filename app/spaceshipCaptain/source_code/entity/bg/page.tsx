import CodeBlock from "@/components/commons/CodeBlock.lazy";

export default function Page() {
  return (
    <div>
      <CodeBlock
        select={true}
        code={`
import pygame
from os.path import join
from settings import WINDOW_WIDTH, WINDOW_HEIGHT, all_sprite_group


class Background(pygame.sprite.Sprite):
    path: str = join("images", "background.png")
    speed: float = 100
    velocity: pygame.Vector2 = pygame.Vector2(0, 0)

    def __init__(self):
        super().__init__(all_sprite_group)
        self.image: pygame.Surface = pygame.transform.scale(
            pygame.image.load(Background.path).convert_alpha(),
            (WINDOW_WIDTH, WINDOW_HEIGHT),
        )
        self.rect = self.image.get_frect()

    def update(self, dt: float):
        pass

				`}
      />
    </div>
  );
}
