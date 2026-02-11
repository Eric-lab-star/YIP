import { getDB } from "./db";
import { BodySchemaType } from "../zod/editorSchema";


export async function createPost({content}: {content: BodySchemaType["content"]}){
	try {
		const db = await getDB()
		const result = await db.collection("posts").insertOne({
			content,
			createdAt: new Date(),
			updatedAt: new Date()
		})
		return {ok: true, id: String(result.insertedId)}
	} catch(e) {
		return {ok: false, error: e}
	}
	
}
