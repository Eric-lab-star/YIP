import { readStudent } from "@/app/lib/mongo/students";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";



export default async function Page({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;

	if (!ObjectId.isValid(id)){
		return notFound()
	}

	const student = await readStudent(new ObjectId(id))
	if (!student) {
		return notFound()
	}

	return (
		<div className="p-5">
			<Title my="m" size="h1"> 나의 공간 </Title>
			<div className="space-x-2 flex  items-center">
				<Title my="m" size="h2"> TIL - 기억보다 기록 </Title>
				<Button size={"sm"}> 글쓰기</Button>

			</div>
			<Section />
			<Title my="m" size="h2"> 과제 </Title>
			<Section />
			<Title my="m" size="h2"> 발표영상 </Title>
			<Section />
		</div>
	)
}

const mockList = Array(10).fill(0);

function Section() {
	return (
		<div className="h-100 mx-20 bg-zinc-300 overflow-y-auto space-y-1">
		{mockList.map( (v,i) => <ListItems key={i}/>) }
		</div>
	)
}



function ListItems() {
	return (
		<div className="h-10 bg-zinc-400 flex">
			<div> 1</div>
			<div> title </div>
			<div> 2025-02-03 </div>
		</div>
	)
}
