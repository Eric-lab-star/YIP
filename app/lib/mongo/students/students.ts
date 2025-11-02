import { getDB, initCollection } from "../db";
import { IStudentDoc } from "./studentTypes";



export async function createStudents(student: IStudentDoc){
	const db = await getDB();
	const students = await initCollection(db, "students")
	students.insertOne(student)

}
