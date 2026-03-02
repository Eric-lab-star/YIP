import { deletePost } from "@/app/lib/mongo/posts";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
	const {id} = await params
	const result = await deletePost(id)
}
