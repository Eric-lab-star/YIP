import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Link from "next/link";

export default function Page() {
	return (
		<div className="p-5">
			<Link href="/tourOfPython/todo/#title" id="title">
				<Title> To-Do App 만들기</Title>
			</Link>
			<Text> </Text>
			
		</div>
	)
}
