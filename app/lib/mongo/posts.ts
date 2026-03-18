import { ObjectId } from "mongodb";
import { getDB } from "./db";


export async function createPost({ userId, title, content }: { userId: string; title: string; content: JSON }) {
	try {
		const db = await getDB()
		const result = await db.collection("posts").insertOne({
			userId,
			title,
			content,
			createdAt: new Date(),
			updatedAt: new Date()
		})
		return { ok: true, id: String(result.insertedId) }
	} catch (e) {
		return { ok: false, error: e }
	}
}

export async function updatePost(id: string, title: string, content: JSON): Promise<{ ok: true; message: string } | { ok: false; message: Error }> {
	try {
		const db = await getDB()
		const result = await db.collection("posts").updateOne({
			_id: new ObjectId(id)
		}, {
			$set: {
				title,
				content,
			}
		})
		if (!result) {
			return {
				ok: false,
				message: new Error("document not found")
			}
		}

		return {
			ok: true,
			message: "success"
		}
	} catch (e) {
		return {
			ok: false,
			message: new Error(e as string)
		}
	}
}

export interface successPost {
	ok: true,
	db: post[]
}
export interface failPost {
	ok: false,
	error: Error
}

export interface post {
	userId: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	content: JSON;
	_id: ObjectId;
}


export async function deletePost(id: string) {
	try {
		const db = await getDB()
		const result = await db.collection("posts").deleteOne({ _id: new ObjectId(id) })
		return {
			ok: true,
		}
	} catch (e) {
		console.log(e)
		return { ok: false }
	}

}

export async function readPosts({ userId }: { userId: string }): Promise<successPost | failPost> {
	try {
		const db = await getDB()
		const posts = await db.collection("posts")
			.find({ userId })
			.sort({ createdAt: -1 })
			.project<post>({ content: 0, updatedAt: 0 })
			.toArray()
		return { ok: true, db: posts }
	} catch (e) {
		console.log(e)
		const error = new Error("find error")
		return { ok: false, error }
	}
}

export async function readPost(id: string): Promise<{ ok: false, error: Error } | { ok: true, db: post }> {
	try {
		const db = await getDB()
		const post = await db.collection<post>("posts").findOne({ _id: new ObjectId(id) })
		if (!post) {
			return {
				ok: false,
				error: new Error("post not found")
			}
		}
		return { ok: true, db: post }
	} catch (e) {
		console.log(e)
		const error = new Error("find error")
		return { ok: false, error }
	}
}
