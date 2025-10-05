import { ObjectId, WithId } from "mongodb";
import  { getDB } from "./db";
import { findProjectById } from "./projects";

export interface Users {
	name: string;
	password: string;
	age: number;
	phoneNumber: string;
	school: string;
	currentProj: ObjectId[];
	attendence: Date;
	login: boolean;
}

const userDB: Users[] = [
	{
		name: "김경섭",
		password: "010628888587",
		age: 17,
		phoneNumber: "01062888587",
		school: "아름고등학교",
		currentProj: [],
		attendence: new Date(Date.now()),
		login: false,
	}
];


async function initUsers() {
	const db = await getDB();
	const users = await db.listCollections({name: "users"}).next();
	if (users) {
		db.collection("users").drop();
	}
	return db.createCollection("users");
}

export async function mockUser() {
	try {
		const users = await initUsers()
		const res = await users.insertMany(userDB)
		console.log(`${res.insertedCount} documents were inserted to users collection`);
	} catch(e) {
		console.log(e);
	}
}


export async function getUserData(userId: string) {
	try {
		const db = await getDB(); 
		const users = db.collection<Users>("users");
		const doc = await users.findOne({_id: new ObjectId(userId)});
		return doc
	} catch(e) {
		console.log(e);
	}
}

export async function getCurrentProject(user: WithId<Users>) {
	try {
		const currentProj = await findProjectById(user.currentProj[0])
		return currentProj
	}catch(e) {
		console.log(e)
	}
}

