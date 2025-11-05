import useSWR from "swr";
import { WithId } from "mongodb";
import { StudentData } from "@/types";

async function studentFetcher(url: string){
	const response = await fetch(url);
	const json: WithId<StudentData>[] =  await response.json();
	return json
}

export function StudentList() {
	const {data, isLoading, error} = useSWR("/api/students", studentFetcher)
	if (error) {return <div>Error fetching data</div>}
	if (isLoading) return <div>Loading</div>;

	return <div>{
		data ? data.map((s) => {
			return <div className="space-x-3 flex p-2" key={s._id.toString()}>
				<div className="w-20 bg-amber-100 p-2">{s.name}</div>
				<div className="w-40 bg-amber-100 p-2">
					<span>{s.birthYear} 년 </span>
					<span>{s.birthMonth.toString().padStart(2, "0")} 월 </span>
					<span>{s.birthDate.toString().padStart(2, "0")} 일</span>
				</div>
				<div className="w-30 bg-amber-100 p-2">{s.school}</div>
				<div>{s.attendence?.map((ds, i)=> <div key={i}>{ds}</div>)}</div>
				</div>
		}) : <div>Data is NotFound</div>
	} </div>
}
