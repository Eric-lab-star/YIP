import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Pyramid } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<Link id="day_4" href="/tourOfPython/day_4"> 
				<div className="flex items-center space-x-2">
					<Pyramid className="text-violet-400"/>
					<Title mx="x" weight="semi" size="h2">자료구조</Title>
				</div>
			</Link>
			<div className="my-3 flex flex-col">
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/list"}>
					<Text weight="bold" my="m">📘 리스트list [a, b, c]</Text>
				 </Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/tuple"}>
					<Text  weight="bold" my="m"> 📙 튜플tuple (a, b, c)</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/dictionary"}>
					<Text  weight="bold" my="m"> 📕 딕셔너리dictionary {`{ age = 12 }`}</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/twoSum"}>
					<Text  weight="bold" my="m">📗 과제 Two Sum </Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/PascalTriangle"}>
					<Text  weight="bold" my="m"> 📙 과제 Pascal's Triangle</Text>
				</Link>
			</div>
		</div>
	)
}
