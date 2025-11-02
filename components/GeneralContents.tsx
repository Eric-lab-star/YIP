import { getDB } from "@/app/lib/mongo/db"
import Curriculum from "./Curriculum";

export default async function GeneralContents() {
	return(
		<div className="lg:col-span-4  flex flex-col gap-3">
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

