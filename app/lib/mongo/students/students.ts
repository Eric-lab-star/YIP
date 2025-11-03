import { getDB, initCollection } from "../db";
import { IStudentDoc } from "./studentTypes";



export async function createStudent(student: IStudentDoc){
	const db = await getDB();
	const students = await initCollection(db, "students")
	return await students.insertOne(student)

}
