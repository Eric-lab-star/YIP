import * as z from "zod"
import { challengeSchema } from "../zod/challengeSchema";
import { getDB } from "./db";

export async function createChallege(
	data: z.infer< typeof challengeSchema>,
	name: "sayHello"
){
	try {
		const db = await getDB()
		const coll = db.collection<z.infer<typeof challengeSchema>>(name)
		await coll.insertOne(data)
		return true
	} catch(e) {
		console.log(e)
		return false
	}
}
