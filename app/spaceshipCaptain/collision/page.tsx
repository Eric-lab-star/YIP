import Code from "@/components/commons/Code";
import CodeBlockExplainSection from "@/components/commons/CodeBlockExplainSection";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

export default function Page() {
  return (
    <div className="p-10 pb-100">
      <Title id="collision" size="h2" my="l">
        충돌처리하기
      </Title>
      <Text my="m">
        게임을 만들다 보면 화면 위의 물체들이 서로 부딪혔을 때 무언가 일어나게
        만들어야 하는 순간이 반드시 오는데, 예를 들어 미사일이 운석에 맞으면
        운석이 사라지거나, 플레이어가 운석에 닿으면 목숨이 줄어드는 것처럼
        게임의 핵심 규칙들이 모두 이 충돌 감지에서 시작됩니다. 그런데 pygame에서
        스프라이트들은 실제로 물리적으로 부딪히는 게 아니라 그냥 화면에 그려진
        그림일 뿐이기 때문에, 파이썬 코드가 직접 두 물체의 위치를 계산해서
        겹쳤는지 판단해줘야 합니다. pygame은 이 작업을 편하게 처리할 수 있도록
        충돌 감지 함수들을 미리 만들어 두었는데, 오늘은 그중에서 두 가지 상황을
        다룰 것입니다. 첫 번째는 미사일 그룹과 운석 그룹처럼 여러 물체와 여러
        물체가 동시에 충돌하는지 확인하는 방법이고, 두 번째는 플레이어 한 명이
        운석 그룹 전체와 충돌하는지 확인하는 방법으로, 같은 충돌 감지이지만
        상황에 따라 사용하는 함수와 방식이 달라집니다.
      </Text>
      <Title my="m" size="h2" id="spritecollide">
        플레이어와 운석 충돌 감지하기
      </Title>
      <CodeBlockExplainSection
        code={`
#...main.py의 기존 코드
    running = True
    direction = pygame.Vector2(0, 0)
    all_sprite_group = pygame.sprite.Group()
    meteor_sprite_group = pygame.sprite.Group()  # <-- 운석 그룹 생성하기
    Background(all_sprite_group)
#...main.py의 기존 코드
						`}
        title="운석 그룹 만들기"
        des={
          <>
            새로운 그룹을 만들어서 운석들을 관리해봅시다. main.py의 main함수
            안에 <Code>meteor_sprite_group = pygame.sprite.Group()</Code>를
            추가하세요. 이렇게 하면 나중에 플레이어와 운석이 충돌하는지 쉽게
            확인할 수 있습니다.
          </>
        }
      />
      <CodeBlockExplainSection
        code={``}
        title="운석 클래스에 그룹 추가하기"
        des={<> </>}
      />
    </div>
  );
}
