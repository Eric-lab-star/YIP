"use server";

import { challenges, createChallege, findChallenge, isChallengeName } from "../lib/mongo/challenge";
import { challengeSchema } from "../lib/zod/challengeSchema";
import { validateToken } from "../lib/auth/login";
import * as z from "zod"

export async function challengeAction(
	data: z.infer<typeof challengeSchema>,
	name: challenges
){
	const auth = await validateToken()
	if (!auth.success) {
		return false
	}
	// Reject arbitrary collection names — only known challenges are writable.
	if (!isChallengeName(name)) {
		return false
	}
	const result = challengeSchema.safeParse(data)
	if (!result.success){
		return false
	}
	// Bind the write to the authenticated session, never the client-supplied id.
	const saved = await createChallege(
		{ ...result.data, userId: auth.id, name: auth.name },
		name
	)
	return saved

}

export async function findChallengeAction(
	userId: string,
	name: challenges
){
	const auth = await validateToken()
	if (!auth.success) {
		return { submitted: false }
	}
	if (!isChallengeName(name)) {
		return { submitted: false }
	}
	// A user may only read their own submission (admins may read any).
	const targetId = auth.role === "admin" ? userId : auth.id
	return await findChallenge(targetId, name)
}
