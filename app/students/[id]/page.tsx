import { readStudent } from "@/app/lib/mongo/students";
import { container } from "@/app/lib/tv/student/style";
import Title from "@/components/commons/Title";
import ClassHistory from "@/components/forms/classHistory/ClassHistory";
import StudentDeleteBTN from "@/components/forms/student/StudentDeleteBtn";
import { StudentData } from "@/types";
import { ArrowLeft, Cake, Calendar1, Phone, School2, SquarePen, User } from "lucide-react";
import { ObjectId } from "mongodb";
import Link from "next/link";
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

	return (
		<div>
			<Title name={"학생정보"} />
			
			<Link href={"/students"} >
				<div className="flex items-center justify-center space-x-1 mb-3 w-26 p-2 bg-background border-2 border-b-amber-400">
				<ArrowLeft className="size-4"/>
				<div> 돌아가기 </div>
				</div>
			</Link>
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
					<ClassDayTable studentClass={student.classDays} />
				</div>
				<div className=""></div>
				<div className="bg-blue-300"></div>
			</div>
			<div className="flex justify-between">

				<Link href={`/students/update/${id}`}>
				<div className="text-center flex justify-center items-center space-x-1 p-2 bg-background border-b-amber-200 border-2">
					<SquarePen className="size-4.5"/>
					<div> 수정하기</div>
				</div>
				</Link>
				<StudentDeleteBTN id={id}/>
			</div>
			<div className=" my-3 border-b border-dashed border-b-black h-2"></div>
			<div className="text-xl"> 수업 정보</div>
			<ClassHistory />
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

const koreanWeek = {
	mon: "월요일",
	tue: "화요일",
	wed: "수요일",
	thur: "목요일",
	fri: "금요일",
	sat: "토요일",
	sun: "일요일",
} as const



function ClassDayTable( {studentClass}: { studentClass: StudentData["classDays"]}){
	const field = [
		<div>등원 요일</div>,
		<div>시작</div>,
		<div>종료</div>,
	]

	studentClass.forEach((v) => {
		field.push( <div>{koreanWeek[`${v.day}`]}</div>)
		field.push( <div>{v.start.h} : {v.start.m}</div>)
		field.push( <div>{v.end.h} : {v.end.m}</div>)
	})

	return <> { field.map((v,i)=> <div key={i}>{v}</div>) } </>
}
