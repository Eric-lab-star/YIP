import { ObjectId } from "mongodb";
import { getDB } from "./db";

export interface Projects {
	name: string;
	levels: number;
	book: string;
	image: string;
	steps: number;
	description: string;
}

const projectDB: Projects[] = [
	{
		name: "스마트 팩토리",
		levels: 5,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: ""
	},
	{
		name: "레이저 터렛",
		levels: 3,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: "",
	},
	{
		name: "계산기",
		levels: 4,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: ""
	},
	{
		name: "아두보이",
		levels: 2,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: "",
	},
];

export async function initProjects() {
	const db = await getDB();
	const project = await db.listCollections({name: "projects"}).next();
	if (project) {
		db.collection("projects").drop();
	}
	return db.createCollection<Projects>("projects");
}

export async function mockProjects() {
	const project = await initProjects();
	const res = await project.insertMany(projectDB);
	console.log(`${res.insertedCount} documents were inserted to projects collection`);
}

export async function findOneProject(name: string) {
	const db = await getDB();
	const projects = db.collection<Projects>("projects")
	return await projects.findOne({name})
}



export async function findProjectById(id: ObjectId) {
	const db = await getDB();
	const projects = db.collection<Projects>("projects")
	return await projects.findOne({_id: id})
}

export async function findProject(ids: ObjectId[]) {
	const db = await getDB();
	const projects = db.collection<Projects>("projects")
	const result: Projects[] = [];
	for (const id of ids) {
		const prj = await projects.findOne({_id: id})
		if (prj) {
			result.push(prj)
		}
	}
	return result
}
