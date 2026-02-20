import { readPost } from "@/app/lib/mongo/posts";
import TipTab from "@/components/editor/TipTab";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

export default async function Page({params}: {params: Promise<{id: string}>}) {
	const {id} = await params;

	if (!ObjectId.isValid(id)){
		return notFound()
	}
	const post = await readPost(id)
	console.log(id)

	console.log(post)
	if (!post.ok) {
		return notFound()
	}
	return (
		<div className="p-5">
			<TipTab content={post.db?.content!}/>
		</div>
	)
}
