import { readStudent } from "@/app/lib/mongo/students"
import Title from "@/components/commons/Title"
import StudentPersonalForm from "@/components/forms/student/studentPersonalForm"
import { ObjectId } from "mongodb"
import { notFound } from "next/navigation"

export default async function Page({params}: {params: Promise<{id: string}>}){
	const {id} = await params
	if (!ObjectId.isValid(id)) {
		notFound()
	}
	const student = await readStudent(new ObjectId(id))
	const json = JSON.stringify(student)
	return (
		<div className="w-full">
			<Title name="정보 수정" />
			<StudentPersonalForm defaultData={json} />
		</div>
	)
}
