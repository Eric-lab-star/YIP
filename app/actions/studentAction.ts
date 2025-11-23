"use server";

import { StudentData } from "@/types";
import { createStudent } from "../lib/mongo/students";
import studentSchema from "../lib/zod/studentSchema";

/** 
* Action function which create new student doc on mongodb if formdata is valid.
*/
export async function postStudent(formdata: StudentData) {
	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success){
		return {success: false, errors: zodResult.error}
	} else {
		await createStudent(zodResult.data)
		return {success: true}
	}
}

