import { readStudent } from "@/app/lib/mongo/students";
import { container } from "@/app/lib/tv/student/style";
import Title from "@/components/commons/Title";
import { Day } from "@/types";
import { Cake, Calendar1, Phone, School, School2, User } from "lucide-react";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

export default async function Page({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;

	if (!ObjectId.isValid(id)){
		return notFound()
	}

	const student = await readStudent(new ObjectId(id))
	if (!student) {
		return notFound()
	}
	const studentClass = Object.entries(student.classDays)

	return (
		<div>
			<Title name={"학생정보"} />
			<div className={container()}>
				<div className="flex  space-x-2">  <User className="w-5 relative top-0.5" /> <div>학생 이름</div>  </div>
				<div className="col-span-4">{student.name}</div>

				<div className="flex  space-x-2">  <School2 className="w-5 relative top-0.5" /> <div>학교</div>  </div>
				<div className="col-span-4">{student.school}</div>

				<div className="flex  space-x-2">  <Cake className="w-5 relative top-0.5" /> <div>생년월일</div>  </div>
				<div className="col-span-4">{student.birthYear}.{student.birthMonth.toString().padStart(2,"0")}.{student.birthDate.toString().padStart(2, "0")}</div>

				<div className="flex  space-x-2">  <Phone className="w-5 relative top-0.5" /> <div>학생 전화번호</div>  </div>
				<div className="col-span-4">
					<PhoneNumber pn={student.studentPhoneNumber} />
				</div>
				<div className="flex  space-x-2">  <Phone className="w-5 relative top-0.5" /> <div>보호자 전화번호</div>  </div>
				<div className="col-span-4"> 
					<PhoneNumber pn={student.guardianPhoneNumber} />
				</div>
				<div className="flex space-x-2">  <Calendar1 className="w-5 relative top-0.5" /> <div>등원시간 </div>  </div>
				<div className="grid grid-cols-subgrid col-span-3">
					<ClassDayTable studentClass={studentClass as [Day, time][]} />
				</div>
				<div className=""></div>
				<div className="bg-blue-300"></div>
			</div>
		</div>
	)
}

function PhoneNumber({pn}: {pn: [string, string, string]}) {
	return <>
		<span>{pn[0]}</span>
		<span> - </span>
		<span>{pn[1]}</span>
		<span> - </span>
		<span>{pn[2]}</span>
	</>
	
}

type time = {start: {h:number, m: number}, end: {h: number, m: number}}


const koreanWeek = {
	mon: "월요일",
	tue: "화요일",
	wed: "수요일",
	thur: "목요일",
	fri: "금요일",
	sat: "토요일",
	sun: "일요일",
} as const



function ClassDayTable( {studentClass}: { studentClass: [ Day, time ][]}){
	const field = [
		<div>등원 요일</div>,
		<div>시작</div>,
		<div>종료</div>,
	]

	studentClass.forEach((v,i) => {
		field.push( <div>{koreanWeek[v[0]]}</div>)
		field.push( <div>{v[1].start.h} : {v[1].start.m}</div>)
		field.push( <div>{v[1].end.h} : {v[1].end.m}</div>)
	})

	return <> { field.map((v,i)=> <div key={i}>{v}</div>) } </>
}
