"use server";

import { StudentData } from "@/types";
import { createStudent, deleteStudent, updateStudent } from "../lib/mongo/students";
import studentSchema from "../lib/zod/studentSchema";
import { redirect } from "next/navigation";
import { ObjectId, WithId } from "mongodb";

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
	
	const zodResult = studentSchema.safeParse(formdata)
		if (!zodResult.success){
			return {success: false, errors: zodResult.error}
	} else {
		await updateStudent(formdata)
		redirect(`/students/${formdata._id.toString()}`)
	}

}

export async function deletStudentAction(id: string) {
	await deleteStudent(new ObjectId(id))
	redirect(`/students`)
}
