"use server";

import { revalidatePath } from "next/cache";
import { createStudent } from "../lib/mongo/students/students";
import { IStudentDoc } from "../lib/mongo/students/studentTypes";


export async function postStudentAction(msg: string){
	return `received ${msg} `
}
