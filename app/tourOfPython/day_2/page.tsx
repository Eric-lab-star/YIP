import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Rabbit } from "lucide-react";
import Link from "next/link";

export default function Page(){
	return (
		<div>
			<Link id="day_2" href="/tourOfPython/day_2"> 
				<div className="flex items-center space-x-2">
					<Rabbit className="text-red-300"/>
					<Title mx="x" weight="semi" size="h2">조건문</Title>
				</div>
			</Link>
			<div className="my-3 flex flex-col">
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/input_type_int"}>
					<Text weight="bold" my="m"> 📘 input(), type(), int()</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/if"}>
					<Text weight="bold" my="m"> 📕 if, else and elif</Text>
				 </Link>
				<Link className="hover:bg-zinc-200" href={"/tourOfPython/and_or_not"}>
					<Text weight="bold" my="m"> 📕 and or not</Text>
				 </Link>
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/cat_or_dog"}>
					<Text weight="bold"my="m" >📗 고양이와 강아지1</Text>
				</Link>
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/cat_or_dog2"}>
					<Text weight="bold"my="m" >📗 고양이와 강아지2</Text>
				</Link>
				<Link  className="hover:bg-zinc-200" href={"/tourOfPython/if_challenge"}>
					<Text weight="bold"my="m" >📙 도전! 자율 주제</Text>
				</Link>
			</div>
		</div>
	)
}
