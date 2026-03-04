import { ObjectId } from "mongodb";
import { getDB } from "./db";


export async function createPost({userId, title, content}: {userId: string; title: string; content: JSON}){
	try {
		const db = await getDB()
		const result = await db.collection("posts").insertOne({
			userId,
			title,
			content,
			createdAt: new Date(),
			updatedAt: new Date()
		})
		return {ok: true, id: String(result.insertedId)}
	} catch(e) {
		return {ok: false, error: e}
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



export async function readPosts({userId}: {userId: string}): Promise<successPost | failPost> {
	try {
		const db = await getDB()
		const posts = await db.collection("posts")
		.find({userId})
		.project<post>({content: 0, updatedAt:0})
		.toArray()
		return {ok: true, db: posts}
	} catch(e) {
		const error = new Error("find error")
		return {ok: false, error}
	}
}

export async function readPost(id: string) {
	try {
		const db = await getDB()
		const post = await db.collection<post>("posts").findOne({_id: new ObjectId(id)})
		if (!post) {
			return {
				ok: false,
				error: "post not found"
			}
		}
		return {ok: true, db: post}
	} catch(e) {
		const error = new Error("find error")
		return {ok: false, error}
	}
}
