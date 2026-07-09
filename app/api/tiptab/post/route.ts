import { validateToken } from "@/app/lib/auth/login";
import { canModifyPost, createPost, readPost, updatePost } from "@/app/lib/mongo/posts";
import { NextRequest } from "next/server";

// Bounds on stored post fields so a single write can't inflate document size.
const MAX_TITLE_LENGTH = 300;
const MAX_CONTENT_LENGTH = 200_000;

export async function POST(req: NextRequest) {
	try {
		const result = await validateToken()
		if (!result.success) {
			return Response.json(result);
		}
		const formData = await req.formData()
		const title = formData.get("title")
		const content = formData.get("content")
		const postId = formData.get("postId")

		if (!title || !content) {
			return Response.json({
				ok: false,
				error: "title or content is missing"
			})
		}

		if (title.toString().length > MAX_TITLE_LENGTH || content.toString().length > MAX_CONTENT_LENGTH) {
			return Response.json({
				ok: false,
				error: "title or content is too long"
			}, { status: 413 })
		}

		if (postId) {
			// Only the author (or an admin) may overwrite an existing post.
			const existing = await readPost(postId.toString())
			if (!existing.ok) {
				return Response.json({ ok: false, error: "post not found" }, { status: 404 })
			}
			if (!canModifyPost(existing.db, result)) {
				return Response.json({ ok: false, error: "Forbidden" }, { status: 403 })
			}
			const updated = await updatePost(
				postId.toString(), title.toString(), JSON.parse(content.toString())
			)
			return Response.json(updated)
		}

		const response = await createPost({ userId: result.id, title: String(title), content: JSON.parse(String(content)) })
		return Response.json(response)

	} catch (e) {
		console.log(e)
		return Response.json({
			ok: false,
			error: "server error"
		})
	}
}
