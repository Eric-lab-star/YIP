import { getDB } from "./db";

interface Projects {
	name: string;
	levels: number;
	book: string;
	image: string;
}

const projectDB: Projects[] = [
	{
		name: "스마트 팩토리",
		levels: 5,
		book: "https://google.com",
		image: ""
	},
	{
		name: "레이저 터렛",
		levels: 3,
		book: "https://google.com",
		image: ""
	},
	{
		name: "계산기",
		levels: 4,
		book: "https://google.com",
		image: ""
	},
	{
		name: "아두보이",
		levels: 2,
		book: "https://google.com",
		image: ""
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
	const projects = db.collection("projects")
	return await projects.findOne({name})
}
