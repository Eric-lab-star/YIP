
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Snail } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<Link id="day_1" href="/tourOfPython/git_and_github"> 
				<div className="flex items-center space-x-2">
					<Snail className="text-blue-300"/>
					<Title mx="x" weight="semi" size="h2">깃과 깃허브</Title>
				</div>
			</Link>
			<div className="my-3 flex flex-col">
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/git"}>
					<Text weight="bold"my="m" >📗 깃 시작하기</Text>
				</Link>

				<Link className="hover:bg-zinc-200" href={"/tourOfPython/github"}>
					<Text weight="bold" my="m"> 📕 깃 허브 시작하기</Text>
				 </Link>
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/functions"}>

					<Text weight="bold" my="m"> 📘 파이썬 함수</Text>
				</Link>
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/challenge_hello"}>
					<Text weight="bold" my="m"> 📙 도전! say_hello()</Text>
				 </Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/challenge_arithmetic"}>
					<Text  weight="bold" my="m"> 📙 도전! 사칙연산</Text>
				</Link>
			</div>
		</div>
	)	
}
