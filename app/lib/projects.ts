import { ObjectId } from "mongodb";
import { getDB } from "./db";

export interface IProject {
	name: string;
	levels: number;
	book: string;
	image: string;
	steps: number;
	description: string;
	color: string;
	goals: string[];
}

const projectDB: IProject[] = [ ];

async function initProjects() {
	const db = await getDB();
	const project = await db.listCollections({name: "projects"}).next();
	if (project) {
		db.collection("projects").drop();
	}
	return db.createCollection<IProject>("projects");
}

export async function mockProjects() {
	const project = await initProjects();
	const res = await project.insertMany(projectDB);
	console.log(`${res.insertedCount} documents were inserted to projects collection`);
}

export async function findOneProject(name: string) {
	const db = await getDB();
	const projects = db.collection<IProject>("projects")
	return await projects.findOne({name})
}

export async function findProjectById(id: ObjectId) {
	const db = await getDB();
	const projects = db.collection<IProject>("projects")
	return await projects.findOne({_id: id})
}

export async function findProject(ids: ObjectId[]) {
	const db = await getDB();
	const projects = db.collection<IProject>("projects")
	const result: IProject[] = [];
	for (const id of ids) {
		const prj = await projects.findOne({_id: id})
		if (prj) {
			result.push(prj)
		}
	}
	return result
}
