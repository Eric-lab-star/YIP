import Title from "@/components/commons/Title";
import { readManyStudent } from "../lib/mongo/students";
import Link from "next/link";

const koreanWeek = {
	mon: "월",
	tue: "화",
	wed: "수",
	thur: "목",
	fri: "금",
	sat: "토",
	sun: "일",
} as const
export default async function Page() {
	const students = await readManyStudent();

	return <div>
		<Title name={"Students"} />
			<Link href={"/students/create"}  >
				<div className={"p-2 bg-background border-2 border-b-amber-600 hover:bg-accent w-20"}>
					신규등록
				</div>
			</Link>
		<div className="">
			<div className="w-full h-10 text-lg border-b-zinc-700 border-2  flex items-center space-x-1">
				<div className="w-24">ID</div> <div className="w-24">이름</div>  <div className="w-24"> 등원일</div> <div className="w-24">진도</div>
			</div>
				{students.map(
					(v)=> (
						<Link key={v._id.toString()} href={`/students/${v._id.toString()}`} className="w-full h-10 text-lg hover:bg-amber-200 flex items-center space-x-1">
							<div className={"w-24"}>{v._id.toString().slice(0,7)}</div>
							<div className="w-24"> {v.name}</div>
							<div className="w-24">{
								v.classDays.map(
									(d,i) => <span className="px-1" key={d.day}>{koreanWeek[`${d.day}`]}{(i != v.classDays.length - 1) && "," }</span>
								)}
							</div> 
						</Link>
					))}
		</div>
	</div>
}
