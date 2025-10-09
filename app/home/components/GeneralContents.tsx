import { getDB } from "@/app/lib/db"
import Curriculum from "./Curriculum"
import ProjTabCard from "./ProjTabCard"
import { IProjects as IProjects } from "@/app/lib/projects";

export default async function GeneralContents() {
	const db = await getDB();
	const projectLists: IProjects[] = await db.collection<IProjects>("projects")
	.find({}, {projection: {_id: 0}})
	.toArray();
	return(
		<div className="lg:col-span-4  flex flex-col gap-3">
			<ProjTabCard projectLists={projectLists}/>
			<Curriculum />
			<Champions />
		</div>
	)
}






function  Champions() {
	return(
		<div className="p-3 rounded-md bg-amber-50 h-96 ">
			학생들 발표 영상/ 제작 | 수업 사진 
		</div>
	)
}

