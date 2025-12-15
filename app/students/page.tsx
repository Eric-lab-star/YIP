import Title from "@/components/commons/Title";
import { readManyStudent } from "../lib/mongo/students";
import Link from "next/link";

export default async function Page() {
	const students = await readManyStudent();
	const table = [
	];

	students.forEach(
		(v,i) => {
		}
	)
	return <div>
		<Title name={"Students"} />

		<Link href={"/students/create"} >신규등록</Link>
		<div className="grid grid-cols-4">
				<div>id</div> <div>이름</div>  <div> 등원일</div> <div>진도</div>
				{students.map(
					(v)=> (
						<Link key={v._id.toString()} href={`/students/${v._id.toString()}`} className="hover:bg-amber-200 flex space-x-1">
							<div>{v._id.toString().slice(0,7)}</div> <div> {v.name}</div> <div>{v.school}</div> 
						</Link>
					))}
		</div>
	</div>
}
