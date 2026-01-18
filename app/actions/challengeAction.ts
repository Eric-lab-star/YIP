"use server";

import { challenges, createChallege, findChallenge } from "../lib/mongo/challenge";
import { challengeSchema } from "../lib/zod/challengeSchema";
import * as z from "zod"

export async function challengeAction(
	data: z.infer<typeof challengeSchema>,
	name: challenges
){
	const result = challengeSchema.safeParse(data)
	if (!result.success){
		return false
	}
	const saved = await createChallege(data, name)
	return saved
	
}

export async function findChallengeAction(
	userId: string,
	name: challenges
){
	return await findChallenge(userId, name)
}
