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
    title: "main.py 수정하기",
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
    title: "main.py 수정하기",
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
    </div>
  );
}
