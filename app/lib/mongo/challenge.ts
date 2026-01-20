import * as z from "zod"
import { challengeSchema } from "../zod/challengeSchema";
import { getDB } from "./db";

export type challenges = "sayHello" | "basicCal"

export async function createChallege(
	data: z.infer< typeof challengeSchema>,
	name: challenges
){
	try {
		const db = await getDB()
		const coll = db.collection<z.infer<typeof challengeSchema>>(name)
		await coll.updateOne(
			{userId: data.userId },
			{$set: {link: data.link}, $setOnInsert: {userId: data.userId, name:data.name}},
			{upsert: true}
		)
		return true
	} catch(e) {
		return false
	}
}

export async function findChallenge(
	userId: string,
	name: challenges
){
	try {
		const db = await getDB()
		const coll = db.collection<z.infer<typeof challengeSchema>>(name)
		const doc = await coll.findOne({userId: userId})
		if (!doc) {
			return {submitted: false }
		} else {
			return {submitted: true, link: doc.link}
		}

	} catch(e) {
		return {submitted: false}
	}
}



