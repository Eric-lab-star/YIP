"use server";

import { createStudent } from "../lib/mongo/students";
import { StudentData, studentSchema } from "../lib/zod/studentSchema";

export interface responseType {
	success?: boolean,
	errors?: Error,
}


export async function postStudent(formdata: StudentData) {
	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success){
		return {success: false, errors: zodResult.error}
	} else {
		await createStudent(zodResult.data)
		return {success: true}
	}
}

