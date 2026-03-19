import { deletePost } from "@/app/lib/mongo/posts";
import { NextRequest } from "next/server";

export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	await deletePost(id)
}
