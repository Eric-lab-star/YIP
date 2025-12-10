import Title from "@/components/commons/Title";
import { readManyStudent } from "../lib/mongo/students";
import Link from "next/link";

export default async function Page() {
	const students = await readManyStudent();
	return <div>
		<Title name={"Students"} />
		<div className="flex flex-col">
			{students.map(
				(v)=> (
					<Link key={v._id.toString()} href={`/students/${v._id.toString()}`} className="hover:bg-amber-200 flex space-x-1">
						<div> {v.name}</div> <div>{v.school}</div> 
					</Link>
				))}
		</div>
	
	</div>
}
