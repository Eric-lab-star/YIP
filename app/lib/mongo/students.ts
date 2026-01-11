import { StudentData } from "@/types";
import { getDB } from "./db";
import { ObjectId, WithId } from "mongodb";

/**
* calls mongodb and create new student doc
* */
export async function createStudent(student: StudentData){
	const db = await getDB();
	const students = db.collection<StudentData>("students")

	return await students.insertOne(student);
}



// update Studnent
export async function updateStudent(student: WithId<StudentData>){
	const {_id, ...withoutId} =  student;
	const db = await getDB();
	const students = db.collection<StudentData>("students")
	await students.updateOne({_id: new ObjectId(_id)}, {$set: withoutId}, {upsert: false});
	return student._id
}

/**
* calls mongodb and get all students doc
*/
export async function readManyStudent(){
	const db = await getDB();
	const student = db.collection<StudentData>("students")
	return await student.find({}).toArray();
}

export async function readStudent(id: ObjectId){
	try {
		const db = await getDB();
		const student = db.collection<StudentData>("students")
		return student.findOne({_id: new ObjectId(id)})
	} catch(error){
		console.log(error)
		return null
	}
}

export async function findStudent(name: string, phoneNumber: string){
	try {
		const db = await getDB();
		const student = db.collection<StudentData>("students")
		return student.findOne({
			name,
			studentPhoneNumber:[
				phoneNumber.slice(0,3),
				phoneNumber.slice(3,7),
				phoneNumber.slice(7,11),
			]})
	} catch(err){
		console.log(err)
		return null
	}

}


export async function deleteStudent(id: ObjectId){
	try{
		const db = await getDB();
		const student = db.collection<StudentData>("students")
		student.deleteOne({_id: id})
	} catch(err) {
		console.log(err)
		return null
	}
}
