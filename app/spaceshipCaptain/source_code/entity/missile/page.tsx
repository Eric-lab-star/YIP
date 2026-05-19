import CodeBlock from "@/components/commons/CodeBlock.lazy";

export default function Page() {
  return (
    <div>
      <CodeBlock
        select={true}
        code={`
import pygame
from os.path import join
from settings import missile_sprite_group, all_sprite_group


class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")
    surf: pygame.Surface = pygame.image.load(path).convert_alpha()
    speed: float = 200

    def __init__(self, pos: pygame.Vector2):
        super().__init__(all_sprite_group, missile_sprite_group)
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
