import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import VideoPlayer from "@/components/commons/VideoPlayer";

export default function Page() {
  return (
    <div className="p-10 mb-100">
      <Title size="h2"> 우주선 이동시키기 과제 </Title>
      <Text my="m">
        현제 우리가 작성한 코드는 우주선이 좌우로만 이동하다가 벽을 만나면
        방향을 바꾸도록 프로그래밍 되어있어요. 우리는 여기에서 한 단계 더
        발전시켜볼거예요. 이제는 x, y 모든 방향으로 이동하게 만들고 어떤 벽이든
        벽을 만나면 방향을 반대로 바꿔줄 거예요.
      </Text>
      <VideoPlayer
        src={`${IMAGE_BASE_URL}/spaceShooter/moveSpaceShipChallengeVideo.mov`}
      />
    </div>
  );
}
