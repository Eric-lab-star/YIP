"use server";

import { refresh } from "next/cache";
import { canModifyPost, deletePost, readPost } from "../lib/mongo/posts";
import { validateToken } from "../lib/auth/login";

export async function deletePostAction(id: string) {
	const auth = await validateToken();
	if (!auth.success) {
		return { ok: false as const, error: "Unauthorized" };
	}

	const post = await readPost(id);
	if (!post.ok) {
		return { ok: false as const, error: "Post not found" };
	}
	if (!canModifyPost(post.db, auth)) {
		return { ok: false as const, error: "Forbidden" };
	}

	await deletePost(id);
	refresh();
	return { ok: true as const };
}
