import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReactPlayer from "react-player";

export default function Page() {
	return (
		<div className="p-10">
			<Title>Space Shooter Demo</Title>
			<Text my="m" size="md">
				이번 시간에는 파이썬을 이용해서 게임을 만들어 볼 거예요.
			</Text>
			<Text my="m" >
				게임 플레이 방법은 간단해요. WASD로 우주선을 이동시키고, 스페이스바를 눌러 미사일을 발사할 수 있어요. 앞에서 날아오는 운석에 맞으면 게임이 종료됩니다.
			</Text>
			<Text>
				이 게임을 만들면서 우리는 다양한 주제를 학습하게 될 거예요. 파이썬의 기본 문법을 바탕으로 파이게임(Pygame)을 사용하는 방법을 알아보고, 객체 지향 프로그래밍(Object-Oriented Programming)의 기초가 되는 클래스와 객체의 개념을 익히게 돼요. 마지막으로 완성한 게임을 다른 사람과 공유하는 방법까지 배워 볼 거예요.
			</Text>
			<Text>
				처음 게임 프로그래밍을 시작하면 생소한 개념이 많이 나오기 때문에 어렵게 느껴질 수 있어요. 하지만 끝까지 완주한다면 큰 성취감과 함께, 상상하는 모든 것을 직접 만들 수 있겠다는 자신감을 얻게 될 거예요.
			</Text>
			<Button className="my-3" asChild>
				<Link href={"https://eric-lab-star.itch.io/space-shooter"} target="_blank">
					게임 다운로드
				</Link>
			</Button>

			<ReactPlayer
				src={`${process.env.R2_CUSTOM}/SpaceShooterPlay.mp4`}
				controls={false}
				className="rounded-3xl bg-black mx-auto"
				width="auto"
				height={"auto"}
				playing={true}
				loop={true}
			/>

		</div>
	)
}
