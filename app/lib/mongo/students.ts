import { StudentData } from "@/types";
import { getDB } from "./db";

/*
	* calls mongodb and create new student doc
	* */
export async function createStudent(student: StudentData){
	const db = await getDB();
	const students = db.collection<StudentData>("students")
	return await students.insertOne(student)
}
/*
	* calls mongodb and get all students doc
	*/
export async function readManyStudent(){
	const db = await getDB();
	const student = db.collection<StudentData>("students")
	return await student.find({}).toArray();
}
