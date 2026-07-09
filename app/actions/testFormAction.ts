"use server";

import { testFormType } from "@/types";
import { testFormSchema } from "../lib/zod/testFormSchema";
import { createForm } from "../lib/mongo/tests";
import { validateToken } from "../lib/auth/login";

export async function submitForm(data: testFormType){
	const auth = await validateToken()
	if (!auth.success) {
		return {pass: false}
	}
	const result = testFormSchema.safeParse(data)
	if (!result.success){
		return {pass: false}
	} else {
		// Persist only the validated fields, never the raw client object.
		await createForm(result.data)
		return {pass: true}
	}

}
