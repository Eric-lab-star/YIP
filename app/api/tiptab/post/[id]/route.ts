import { canModifyPost, deletePost, readPost } from "@/app/lib/mongo/posts";
import { validateToken } from "@/app/lib/auth/login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const auth = await validateToken()
	if (!auth.success) {
		return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
	}

	const { id } = await params

	const post = await readPost(id)
	if (!post.ok) {
		return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 })
	}
	if (!canModifyPost(post.db, auth)) {
		return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 })
	}

	await deletePost(id)
	return NextResponse.json({ ok: true })
}
