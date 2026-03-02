"use server";

import { refresh } from "next/cache";
import { deletePost } from "../lib/mongo/posts";

export async function deletePostAction(id:string) {
	await deletePost(id)
	refresh()
}
