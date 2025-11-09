import useSWR from "swr";
import { WithId } from "mongodb";
import { StudentData } from "@/types";

async function studentFetcher(url: string){
	const response = await fetch(url);
	const json  =  await response.json();
	return json
}

type StudentTableType = WithId<StudentData>[]

export function StudentTable() {
	const {data, isLoading, error} = useSWR<StudentTableType>("/api/students", studentFetcher)
	if (isLoading) return <div>Loading</div>;
	if (error) {return <div>Error fetching data</div>}

	return <div>{ data && StudentRow(data) } </div>
}

function StudentRow(studentlist: StudentTableType) {
	return studentlist.map((s) => (
			<div className="space-x-3 flex p-2" key={s._id.toString()}>
				<div className="w-20 bg-amber-100 p-2">{s.name}</div>
				<div className="w-40 bg-amber-100 p-2">
					<span>{s.birthYear} 년 </span>
					<span>{s.birthMonth.toString().padStart(2, "0")} 월 </span>
					<span>{s.birthDate.toString().padStart(2, "0")} 일</span>
				</div>
				<div className="w-30 bg-amber-100 p-2 grid place-items-center">{s.school}</div>
				<div className="flex justify-center items-center">{s.classDays?.map((ds, i)=> <div className="w-20 bg-amber-100 p-2" key={i}>{ds}</div>)}</div>
		</div>
	))}
