import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Origami } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<Link id="day_3" href="/tourOfPython/day_3"> 
				<div className="flex items-center space-x-2">
					<Origami className="text-orange-400"/>
					<Title mx="x" weight="semi" size="h2">반복문</Title>
				</div>
			</Link>
			<div className="my-3 flex flex-col">
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/loop"}>
					<Text weight="bold" my="m">📘 반복문 Loop</Text>
				 </Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/library"}>
					<Text  weight="bold" my="m"> 📙 파이썬 표준 라이블러리</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/numberGuessingGame"}>
					<Text  weight="bold" my="m"> 📕  숫자 맞추기 게임 만들기</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/challenge_binary_search"}>
					<Text  weight="bold" my="m">📗 도전! 이진 탐색 알고리즘이란?</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/challenge_fibonacci"}>
					<Text  weight="bold" my="m"> 📙 도전! 피보나치 수열 이란?</Text>
				</Link>
			</div>
		</div>

	)
}
