import * as z from "zod"
import { challengeSchema } from "../zod/challengeSchema";
import { getDB } from "./db";

export type challenges = "sayHello" | "basicCal" | "ifChallenge"

/** Runtime whitelist of allowed challenge collections. */
export const CHALLENGE_NAMES: readonly challenges[] = ["sayHello", "basicCal", "ifChallenge"] as const

/** Type guard used to reject arbitrary collection names at the trust boundary. */
export function isChallengeName(name: unknown): name is challenges {
	return typeof name === "string" && (CHALLENGE_NAMES as readonly string[]).includes(name)
}

export async function createChallege(
	data: z.infer<typeof challengeSchema>,
	name: challenges
) {
	try {
		const db = await getDB()
		const coll = db.collection<z.infer<typeof challengeSchema>>(name)
		await coll.updateOne(
			{ userId: data.userId },
			{ $set: { link: data.link }, $setOnInsert: { userId: data.userId, name: data.name } },
			{ upsert: true }
		)
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

export async function findChallenge(
	userId: string,
	name: challenges
) {
	try {
		const db = await getDB()
		const coll = db.collection<z.infer<typeof challengeSchema>>(name)
		const doc = await coll.findOne({ userId: userId })
		if (!doc) {
			return { submitted: false }
		} else {
			return { submitted: true, link: doc.link }
		}

	} catch (e) {
		console.log(e)
		return { submitted: false }
	}
}



