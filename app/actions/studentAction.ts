"use server";

import { StudentData } from "@/types";
import { createStudent, deleteStudent, updateStudent } from "../lib/mongo/students";
import studentSchema from "../lib/zod/studentSchema";
import { ObjectId, WithId } from "mongodb";
import { revalidatePath } from "next/cache";

/** 
* Action function which create new student doc on mongodb if formdata is valid.
* on insertion fail, function re
*/

interface studentCreateActionSuccess {
	success: true, created: string
}


interface studentCreateActionFail {
	success: false, errors: Error
}

export async function studentCreateAction(formdata: StudentData): Promise<studentCreateActionFail | studentCreateActionSuccess> {
	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success) {
		return { success: false, errors: zodResult.error }
	}
	const newStudent = await createStudent({ ...zodResult.data, studentPhoneNumber: zodResult.data.studentPhoneNumber.replace(/-/g, "") })
	revalidatePath(".")
	return { success: true, created: newStudent.insertedId.toString() }
}

export async function updateStudentAction(formdata: WithId<StudentData>) {

	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success) {
		return { success: false, errors: zodResult.error }
	} else {
		await updateStudent(formdata)
		return { success: true }
	}

}

export async function deleteStudentAction(id: string) {
	await deleteStudent(new ObjectId(id))
	revalidatePath(".")
}
