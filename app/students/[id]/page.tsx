import { failPost, readPosts, successPost } from "@/app/lib/mongo/posts";
import { readStudent } from "@/app/lib/mongo/students";
import TILTable from "@/components/commons/table/TILTable";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import { ObjectId } from "mongodb";
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

	const posts = await readPosts({userId: student._id.toString()})
	const serial = getSerialized(posts)

	return (
		<div className="p-5">
			<Title my="m" size="h1"> 나의 공간 </Title>
			<div className="space-x-2 flex  items-center">
				<Title my="m" size="h2"> TIL - 기억보다 기록 </Title>
				<Button size={"sm"}>
					<Link href={"/editor"}> 글쓰기 </Link>
				</Button>
			</div>
			{
				serial &&  <TILTable posts={serial}/>
			}
		</div>
	)
}



function getSerialized(posts: successPost | failPost){
	if (!posts.ok) return null;
	const result = posts.db.map((p)=> ({id: p._id.toString(), title: p.title, createdAt: p.createdAt, }))
	return result
}
