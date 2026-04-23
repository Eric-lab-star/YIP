import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import DownloadBtn from "@/components/commons/DownloadBtn";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
  return (
    <div className="p-10 pb-100">
      <Title my="l">미사일 클래스</Title>
      <Text my="m">
        미사일 클래스는 entity/missile.py 파일을 새로 만들어 작성합니다. 레이저
        이미지 또한 아래의 버튼을 클릭하고 images 폴더에 저장합니다.
      </Text>

      <DownloadBtn
        label={"미사일  이미지 저장하기"}
        fileKey="spaceShooter/missile.png"
        eager={true}
      />

      <CodeBlockExplainSection
        code={`#entity/missile.py
import pygame
from os.path import join

class Missile(pygame.sprite.Sprite):
    path: str = join("images", "missile.png")

    def __init__(self, group: pygame.sprite.Group):
        super().__init__(group)
        self.image = pygame.image.load(Missile.path).convert_alpha()
        self.rect = self.image.get_frect(center=(100, 100))

    def update(self, dt: float):
        pass
		`}
        title="missile class"
        des={
          <>
            이 코드는 게임에 등장할 미사일 객체를 만드는 설계도예요.
            <Code>Missile.path</Code>에 이미지 파일 경로를 저장해두고,
            <Code>init</Code>에서 <Code>super().__init__(group)</Code>으로
            스프라이트 그룹에 등록하면서 <Code>self.image</Code>로 겉모습을,
            <Code>self.rect</Code>로 화면 위 위치를 지정해요.
            <Code>update</Code>는 지금은 비어 있지만 나중에 미사일이 움직이는
            로직을 채워 넣을 자리예요.
          </>
        }
      />
      <CodeBlockExplainSection
        code={`#main.py 파일 수정하기
from os.path import join
from entity.bg import Background
from entity.player import Player
from entity.missile import Missile # <-- 미사일 클래스 불러오기
#..... 기존에 있는 코드 생략
def main():
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()

    Background(all_sprite_group)

    Player(all_sprite_group)
    Missile(all_sprite_group) # <-- 추가하기

    while running:
#.... 기존에 있는 코드 생략
					`}
        title="main.py에서 미사일 객체 만들기"
        des={
          <>
            main.py 파일에서 미사일 객체를 만들고 프로그램을 실행시켜서 화면에
            미사일이 잘 나오는지 확인해보세요.
          </>
        }
      />
    </div>
  );
}
