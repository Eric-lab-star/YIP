import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Code from "@/components/commons/Code";
import ToggleCodeBlock from "@/components/commons/table/ToggleBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import VideoPlayer from "@/components/commons/VideoPlayer";
import Link from "next/link";

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
			<Title my="m" size="h2">
				과제 해결을 위한 힌트
			</Title>
			<Text>
				이전 시간에 배운 Frect를 이용해서 우주선의 위치를 알아낼 수 있어요. 예를
				들어서 이전에 교재의
				<Link
					className="text-fuchsia-500 inline-block px-2"
					href="/spaceshipCaptain/playerSurf#moveFrect"
				>
					Move Rect
				</Link>
				을 보면 우주선을 좌우로 이동시키기 위해서 <Code>player_rect.right</Code>
				을 사용했어요. 이 방식하고 비슷하게
			</Text>
			<Text>
				<Code>player_rect.top</Code>
			</Text>
			<Text>
				<Code>player_rect.bottom</Code>
			</Text>
			<Text>
				<Code>player_rect.right</Code>
			</Text>
			<Text>
				<Code>player_rect.left</Code>
			</Text>
			<Text>
				를 사용할 수 있어요. 공식 문서에서 더 자세한 설명이 나와 있으니
				읽어보세요.
				<Link
					className="text-fuchsia-500"
					href="https://pyga.me/docs/ref/rect.html"
				>
					pyga.me에서 frect사용방법 확인하기
				</Link>
			</Text>
			<ToggleCodeBlock header={"코드 확인하기"} code={``} />
		</div>
	);
}
