"use server";

import { StudentData } from "@/types";
import { createStudent, deleteStudent, updateStudent } from "../lib/mongo/students";
import studentSchema from "../lib/zod/studentSchema";
import { validateToken } from "../lib/auth/login";
import { revokeUserTokens } from "../lib/mongo/revocation";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

/** Student records hold PII — every mutation requires an admin session. */
async function isAdmin() {
	const auth = await validateToken();
	return auth.success && auth.role === "admin";
}

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
	if (!(await isAdmin())) {
		return { success: false, errors: new Error("권한이 없습니다.") }
	}
	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success) {
		return { success: false, errors: zodResult.error }
	}
	const newStudent = await createStudent({ ...zodResult.data, studentPhoneNumber: zodResult.data.studentPhoneNumber.replace(/-/g, "") })
	revalidatePath(".")
	return { success: true, created: newStudent.insertedId.toString() }
}

export async function updateStudentAction(formdata: { _id: string } & StudentData) {
	if (!(await isAdmin())) {
		return { success: false, errors: new Error("권한이 없습니다.") }
	}
	const zodResult = studentSchema.safeParse(formdata)
	if (!zodResult.success) {
		return { success: false, errors: zodResult.error }
	} else {
		// Persist only the validated fields (drops unknown keys) and normalize the
		// phone number the same way create does, so login lookups stay consistent.
		await updateStudent({
			...zodResult.data,
			studentPhoneNumber: zodResult.data.studentPhoneNumber.replace(/-/g, ""),
			_id: formdata._id,
		})
		return { success: true }
	}

}

export async function deleteStudentAction(id: string) {
	if (!(await isAdmin())) {
		return { success: false as const, errors: new Error("권한이 없습니다.") }
	}
	await deleteStudent(new ObjectId(id))
	// Invalidate any session the deleted student still holds, so a live token
	// can't outlive the account until it expires on its own.
	await revokeUserTokens(id)
	revalidatePath(".")
	return { success: true as const }
}
