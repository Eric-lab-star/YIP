import { readPosts } from "@/app/lib/mongo/posts";
import { readStudent } from "@/app/lib/mongo/students";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import { ObjectId, WithId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";



export default async function Page({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;

	if (!ObjectId.isValid(id)){
		return notFound()
	}

	// param  검증
	const student = await readStudent(new ObjectId(id))
	if (!student) {
		return notFound()
	}

	return (
		<div className="p-5">
			<Title my="m" size="h1"> 나의 공간 </Title>
			<div className="space-x-2 flex  items-center">
				<Title my="m" size="h2"> TIL - 기억보다 기록 </Title>
				<Button size={"sm"}>
					<Link href={"/editor"}> 글쓰기 </Link>
				</Button>
			</div>
			<Section id={id}/>
		</div>
	)
}


async function Section({id}: {id: string}) {
	const posts = await readPosts({userId: id})
	if(!posts.ok) {
		console.log(posts)
		return <div> 없음 </div>
	}

	return (
		<div className="h-100 mx-20 bg-zinc-300 overflow-y-auto space-y-1">
		{posts.db.map((v,i) => <ListItems key={i} index={i} content={v}/>) }
		</div>
	)
}

function ListItems({content, index}:{content: WithId<{title: string; createdAt: Date}>; index: number}) {
	const date = new Date(content.createdAt)

	return (
		<Link href={`/editor/${content._id.toString()}`} className="h-10 bg-zinc-400 flex">
			<div>{index + 1}</div>
			<div>{content.title}</div>
			<div>{date.toLocaleDateString("ko-KR")}</div>
		</Link>
	)
}
