import { StudentData } from "../zod/studentSchema";
import { getDB } from "./db";



export async function createStudent(student: StudentData){
	const db = await getDB();
	const students = db.collection<StudentData>("students")
	return await students.insertOne(student)
}

export async function readManyStudent(){
	const db = await getDB();
	const student = db.collection<StudentData>("students")
	return await student.find({}).toArray();
}
