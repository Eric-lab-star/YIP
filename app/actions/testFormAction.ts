"use server";

import { testFormType } from "@/types";
import { testFormSchema } from "../lib/zod/testFormSchema";
import { createForm } from "../lib/mongo/tests";

export async function submitForm(data: testFormType){
	const result = testFormSchema.safeParse(data)
	if (!result.success){
		return {pass: false} 
	} else {
		await createForm(data)
		return {pass: true} 
	}

}
