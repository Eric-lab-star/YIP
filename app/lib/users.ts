import { ObjectId } from "mongodb";
import  { getDB } from "./mongo/db";

export interface IUser {
	name: string;
	image: string;
	role: "student" | "admin"
	password: string;
	age: number;
	phoneNumber: string;
	school: string;
	currentProj: ObjectId[];
	blogs: ObjectId[];
	attendence: ObjectId[];
	notes: ObjectId[];
	login: boolean;
	
}



const userDB: IUser[] = [
	{
		name: "김경섭",
		image: "",
		role: "student",
		password: "01062888587",
		age: 17,
		phoneNumber: "01062888587",
		school: "아름고등학교",
		currentProj: [],
		blogs: [],
		attendence: [],
		notes:[],
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

async function getUsersColl() {
	const db = await getDB();
	return db.collection("users");
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
		const users = db.collection<IUser>("users");
		const doc = await users.findOne({_id: new ObjectId(userId)});
		return doc
	} catch(e) {
		console.log(e);
	}
}

