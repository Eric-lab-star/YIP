import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { HandFist } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div className="">
			<Link id="day_5" href="/pythonWebScrapper#day_5"> 
				<div className="flex items-center space-x-2">
					<HandFist className="text-red-400"/>
					<Title mx="x" weight="semi" size="h2">Day 5</Title>
				</div>
			</Link>
			<div className="my-5">
				<Title size="h2" my="m">Cli todo app</Title>
				<Title size="h2" my="m">배운점 정리하고 To-Do App 발표하기</Title>
			</div>
		</div>
	) 
}
