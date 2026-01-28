import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Origami } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<Link id="day_3" href="/pythonWebScrapper/day_3"> 
				<div className="flex items-center space-x-2">
					<Origami className="text-orange-400"/>
					<Title mx="x" weight="semi" size="h2">Day 3</Title>
				</div>
			</Link>
			<div className="my-3 flex flex-col">
				<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/loop"}>
					<Text weight="bold" my="m">📘 반복문 Loop</Text>
				 </Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/library"}>
					<Text  weight="bold" my="m"> 📙 파이썬 표준 라이블러리</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/numberGuessingGame"}>
					<Text  weight="bold" my="m"> 📕  숫자 맞추기 게임 만들기</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/fibonacci"}>
					<Text  weight="bold" my="m">📗  피보나치 수열 만들기</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/christmasTree"}>
					<Text  weight="bold" my="m"> 📙 도전!  크리스마스 트리 만들기</Text>
				</Link>
			</div>
		</div>

	)
}
