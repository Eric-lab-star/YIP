"use server";

import { StudentData } from "@/types";
import { createStudent, updateStudent } from "../lib/mongo/students";
import studentSchema from "../lib/zod/studentSchema";
import { redirect } from "next/navigation";
import { WithId } from "mongodb";

/** 
* Action function which create new student doc on mongodb if formdata is valid.
* on insertion fail, function re
*/
export async function studentSignupFormAction (formdata: StudentData) {
	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success){
		return {success: false, errors: zodResult.error}
	} else {
		const {insertedId} = await createStudent(zodResult.data)
		redirect(`/students/${insertedId.toString()}`)
	}
}

export async function updateSignUpFormAction(formdata: WithId<StudentData>){
	console.log(formdata)
	
	const zodResult = studentSchema.safeParse(formdata)
		if (!zodResult.success){
			return {success: false, errors: zodResult.error}
	} else {
		await updateStudent(zodResult.data as WithId<StudentData>)
		redirect(`/students/${formdata._id.toString()}`)
	}

}
