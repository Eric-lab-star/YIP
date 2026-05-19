import CodeBlock from "@/components/commons/CodeBlock.lazy";

export default function Page() {
  return (
    <div>
      <CodeBlock
        select={true}
        code={`
import pygame
from settings import all_sprite_group, WINDOW_HEIGHT, WINDOW_WIDTH, display_surface
from os.path import join


class Hud(pygame.sprite.Sprite):
    font_path = join("images", "Galmuri9.ttf")
    font = pygame.font.Font(font_path, size=100)

    def __init__(self, msg=""):
        super().__init__(all_sprite_group)
        self.image: pygame.Surface = Hud.font.render(msg, True, "white")
        self.rect = self.image.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))

    def draw(self, msg: str):
        self.image: pygame.Surface = Hud.font.render(msg, True, "white")
        self.rect: pygame.FRect = self.image.get_frect(
            center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
        )
        display_surface.blit(self.image, self.rect)

    def update(self, dt: float):
        pass
				`}
      />
    </div>
  );
}
