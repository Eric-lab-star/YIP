import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
  return (
    <div className="p-10 mb-100">
      <Title my="m" size="h2" id={"keyboardInput"}>
        키보드 입력받기
      </Title>
      <Text>
        <Code>pygame.key.get_pressed()</Code>는 마치 피아노 건반 전체를 한 눈에
        찍은 사진과 같아서, 이 함수를 호출하는 순간 키보드의 모든 키가 지금 눌려
        있는지 아닌지를 True/False 목록으로 한꺼번에 돌려줍니다. 반환된 결과를{" "}
        <Code>keys</Code>라는 변수에 담아두면, 예를 들어{" "}
        <Code>keys[pygame.K_LEFT]</Code>처럼 특정 키의 이름을 인덱스로 넣어서 그
        키가 현재 눌려 있으면 <Code>True</Code>, 안 눌려 있으면{" "}
        <Code>False</Code>를 확인할 수 있습니다. 이 방식은{" "}
        <Code>pygame.KEYDOWN</Code> 이벤트와 달리 키를 꾹 누르고 있는 동안 매
        프레임마다 계속 반응하기 때문에, 캐릭터를 부드럽게 이동시키는 것처럼
        지속적인 입력이 필요한 상황에 적합합니다.
      </Text>
      <CodeBlockExplainSection
        code={`#main.py
....# 기존코드
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        keys = pygame.key.get_pressed() # <-- 새롭게 추가된 코드
        print(keys[pygame.K_w]) # <-- 새롭게 추가된 코드

        player_rect.center += direction * speed * dt
	....
			`}
        title={`pygame.key.get_pressed(): 연습`}
        des={
          <>
            <Code>keys = pygame.key.get_pressed()</Code>로 현재 키보드의 모든 키
            상태를 찍은 다음, 바로 아래 <Code>print(keys[pygame.K_w])</Code>는
            마치 "지금 이 순간 W키가 눌려 있나요?"라고 물어보는 것처럼 W키의
            상태를 콘솔에 출력해 주는데, W키를 누르고 있으면 <Code>True</Code>,
            누르지 않고 있으면 <Code>False</Code>가 출력됩니다.{" "}
          </>
        }
      />

      <CodeBlockExplainSection
        code={`#main.py
....# 기존코드
        keys = pygame.key.get_pressed()  # <-- 눌려져 있는 키 검사
        direction = pygame.Vector2(0, 0)  # <-- 정지 상태
        if keys[pygame.K_w]:  # <-- 위아래 이동
            direction.y = -1
        elif keys[pygame.K_s]:
            direction.y = 1

        if keys[pygame.K_d]:  # <-- 좌우 이동
            direction.x = 1
        elif keys[pygame.K_a]:
            direction.x = -1
        player_rect.center += direction * speed * dt  # <-- 위치 변경
	....
			`}
        title={`pygame.key.get_pressed(): 움직이기`}
        des={
          <>
            이 코드의 핵심은 매 프레임마다{" "}
            <Code>direction = pygame.Vector2(0, 0)</Code>으로 방향을 먼저 정지
            상태로 초기화한 뒤 키 입력을 확인하는 구조인데, 마치 매 순간 "나는
            지금 어디로 가야 하지?"를 새로 결정하는 것처럼 이전 프레임의 방향
            값이 남아있지 않아서 키에서 손을 떼는 순간 바로 멈추게 됩니다. W와
            S는 <Code>elif</Code>로 묶여 있고 D와 A도 별도의{" "}
            <Code>if/elif</Code>로 분리되어 있기 때문에, 이전 코드와 달리 W와
            D를 동시에 누르면 <Code>direction.y = -1</Code>과{" "}
            <Code>direction.x = 1</Code>이 함께 적용되어 대각선 이동이 가능하고,
            마지막 줄 <Code>player_rect.center += direction * speed * dt</Code>
            에서 방향에 속도와 델타타임을 곱해 실제 위치를 업데이트합니다.
          </>
        }
      />
      <CodeBlockExplainSection
        code={`#main.py
....# 기존코드
def main():
    running = True
    speed = 200
    direction = pygame.Vector2(0, 0)  # <-- 루프 밖에서 정의됨
    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        keys = pygame.key.get_pressed()
        direction.x = int(keys[pygame.K_d]) - int(keys[pygame.K_a])  # <-- 수정된 코드
        direction.y = int(keys[pygame.K_s]) - int(keys[pygame.K_w])  # <-- 수정된 코드
        player_rect.center += direction * speed * dt
	....
			`}
        title={`pygame.key.get_pressed(): 정돈된 코드`}
        des={
          <>
            이 코드는 이전처럼 <Code>if/elif</Code>를 여러 줄 쓰는 대신 수학
            계산 한 줄로 방향을 결정하는 방식인데,{" "}
            <Code>int(keys[pygame.K_d])</Code>는 눌리면 <Code>1</Code>, 안
            눌리면 <Code>0</Code>을 반환하는 성질을 이용해서 마치 오른쪽 힘과
            왼쪽 힘을 줄다리기 시키듯{" "}
            <Code>int(keys[pygame.K_d]) - int(keys[pygame.K_a])</Code>를
            계산하면 D만 누를 때는 <Code>1-0=1</Code>, A만 누를 때는{" "}
            <Code>0-1=-1</Code>, 둘 다 누를 때는 <Code>1-1=0</Code>이 되어
            자동으로 방향이 결정되고, y축도 같은 원리로 S와 W를 빼서 위아래
            방향을 한 줄로 처리할 수 있어서 코드가 훨씬 간결해집니다.
          </>
        }
      />

      <Title id={"check"} size="h2" my="m">
        코드 확인하기
      </Title>
      <div className="select-none">
        <CodeBlock
          code={`#main.py
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
    speed = 200
    direction = pygame.Vector2(0, 0)  # <-- 루프 밖에서 정의됨
    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        keys = pygame.key.get_pressed()
        direction.x = int(keys[pygame.K_d]) - int(keys[pygame.K_a])  # <-- 수정된 코드
        direction.y = int(keys[pygame.K_s]) - int(keys[pygame.K_w])  # <-- 수정된 코드
        player_rect.center += direction * speed * dt

        display_surface.blit(bg_surf, (0, 0))
        display_surface.blit(player_surf, player_rect)

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()

				`}
        />
      </div>
      <Title id={"normalization"} my="m">
        벡터 정규화{" "}
      </Title>
      <Text>
        정규화(normalize)란 벡터의 방향은 그대로 유지하면서 길이만 1로 맞추는
        작업인데, 이것이 왜 필요한지 이해하려면 대각선 이동 상황을 생각해보면
        됩니다. 예를 들어 D와 S를 동시에 누르면{" "}
        <Code>direction = Vector2(1, 1)</Code>이 되는데, 이 벡터의 실제 길이는
        피타고라스 정리에 의해 약 1.41로 상하좌우로만 이동할 때보다 41% 더
        빠르게 움직이게 됩니다. 마치 걸어갈 때 앞으로만 걷거나 옆으로만 걷는
        것과 대각선으로 걷는 것을 비교하면 같은 보폭이라도 대각선이 더 멀리
        이동하는 것처럼, 이 속도 불균형을 해결하기 위해{" "}
        <Code>direction.normalize()</Code>를 사용해서 벡터 길이를 1로 통일시키면
        어느 방향으로 이동하든 항상 같은 속도를 유지할 수 있습니다. 단, 길이가
        0인 벡터, 즉 아무 키도 누르지 않은 정지 상태에서{" "}
        <Code>normalize()</Code>를 호출하면 오류가 발생하기 때문에{" "}
        <Code>{`if direction.length() > 0:`}</Code>으로 먼저 확인한 뒤
        정규화해야 합니다
      </Text>
      <CodeBlockExplainSection
        code={`
...#기존 코드
        direction.y = int(keys[pygame.K_s]) - int(keys[pygame.K_w])
        if direction.length() > 0: # <--- 길이가 0 일 때만 정규화
            direction.normalize_ip() <-- 정규화 시킴
        player_rect.center += direction * speed * dt
...#기존 코드
				`}
        title="direction.normalize_ip(): 정규화"
        des={
          <>
            매 프레임마다 W, S, A, D 키 입력을 계산해 <Code>direction</Code>에
            저장한 뒤, <Code>{`direction.length() > 0`}</Code>으로 플레이어가
            실제로 움직이려는 상태인지 확인하고 맞다면{" "}
            <Code>normalize_ip()</Code>로 벡터 길이를 1로 통일시켜서 대각선 이동
            시 속도가 빨라지는 문제를 방지하고, 최종적으로{" "}
            <Code>direction * speed * dt</Code>를 현재 위치에 더해 플레이어를
            이동시킵니다.
          </>
        }
      />

      <Title id={"check2"} size="h2" my="m">
        코드 확인하기
      </Title>

      <div className="select-none">
        <CodeBlock
          code={`#main.py
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
    speed = 200
    direction = pygame.Vector2(0, 0)  # <-- 루프 밖에서 정의됨
    while running:
        dt = clock.tick(30) / 1000
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        keys = pygame.key.get_pressed()
        direction.x = int(keys[pygame.K_d]) - int(keys[pygame.K_a])  # <-- 수정된 코드
        direction.y = int(keys[pygame.K_s]) - int(keys[pygame.K_w])  # <-- 수정된 코드
        if direction.length() > 0:
            direction.normalize_ip()
        player_rect.center += direction * speed * dt

        display_surface.blit(bg_surf, (0, 0))
        display_surface.blit(player_surf, player_rect)

        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()
				`}
        />
      </div>
    </div>
  );
}
