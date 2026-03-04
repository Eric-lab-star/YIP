import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Snail } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<Link id="day_1" href="/pythonWebScrapper/day_1"> 
				<div className="flex items-center space-x-2">
					<Snail className="text-blue-300"/>
					<Title mx="x" weight="semi" size="h2">변수와 함수</Title>
				</div>
			</Link>
			<div className="my-3 flex flex-col">
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/helloworld"}>
					<Text weight="bold" my="m"> 📕 파이썬 에디터 소개 hello world</Text>
				 </Link>
				<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/variable_string_boolean"}>
					<Text weight="bold"my="m" >📗 변수, 문자열, 불리안</Text>
				</Link>
				<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/functions"}>
					<Text weight="bold" my="m"> 📘 파이썬 함수</Text>
				</Link>
				<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/challenge_hello"}>
					<Text weight="bold" my="m"> 📙 도전! say_hello()</Text>
				 </Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/challenge_arithmetic"}>
					<Text  weight="bold" my="m"> 📙 도전! 사칙연산</Text>
				</Link>
			</div>
		</div>
	)	
}
