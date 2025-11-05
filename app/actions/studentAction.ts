"use server";

import { StudentData } from "@/types";
import { createStudent } from "../lib/mongo/students";
import studentSchema from "../lib/zod/studentSchema";


export async function postStudent(formdata: StudentData) {
	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success){
		return {success: false, errors: zodResult.error}
	} else {
		await createStudent(zodResult.data)
		return {success: true}
	}
}

