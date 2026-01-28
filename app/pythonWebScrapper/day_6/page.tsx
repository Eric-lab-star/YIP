import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div >
			<Link id="day_6" href="/pythonWebScrapper/day_6"> 
				<div className=" flex items-center space-x-2">
					<PawPrint className="text-green-400"/>
					<Title mx="x" weight="semi" size="h2">Day 6</Title>
				</div>
			</Link>

			<div className="my-3 flex flex-col">
				<Link  className="hover:bg-zinc-200" href={"/pythonWebScrapper/streamlit_install"}>
					<Text weight="bold" my="m">📘 streamlit - pypi, venv </Text>
				 </Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/streamlit_concept"}>
					<Text  weight="bold" my="m"> 📙 streamlit - Basic Concept 구조와 이해</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/streamlit_caching"}>
					<Text  weight="bold" my="m"> 📕 streamlit - caching 캐싱</Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/streamlit_page"}>
					<Text  weight="bold" my="m">📗 streamlit - page 페이지 </Text>
				</Link>
				<Link className="hover:bg-zinc-200" href={"/pythonWebScrapper/streamlit_challenge"}>
					<Text  weight="bold" my="m"> 📙 과제 - 날 따라해봐요 이렇게</Text>
				</Link>
			</div>
		</div>
	)
}
