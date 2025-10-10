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

const projectDB: IProject[] = [
	{
		name: "스마트 팩토리",
		levels: 5,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: `
아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다.
	이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로
만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를 
소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
		color:  "#a823eb",
		goals: ["인공지능", "모터의 원리"],
	},
	{
		name: "레이저 터렛",
		levels: 3,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: `
아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다.
	이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로
만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를
소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
		color: "#2398eb",
		goals: ["서보 모터", "가변저항"],
	},
	{
		name: "계산기",
		levels: 4,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: `
아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다.
	이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로
만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를
소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
		color: "#5ea501",
		goals: ["텍트 스위치", "LCD"],
	},
	{
		name: "아두보이",
		levels: 2,
		book: "https://google.com",
		image: "",
		steps: 10,
		description: `
아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다.
	이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로
만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를
소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
		color: "#F54927",
		goals: ["회로", "아두이노의 이해"],
	},
];

export async function initProjects() {
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
