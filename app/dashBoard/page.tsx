import { ObjectId } from "mongodb";
import { validateToken } from "../lib/auth/login"
import { readManyStudent, readManyStudentFlat, readStudent } from "../lib/mongo/students";
import StudentsTable from "@/components/commons/table/StudentsTable";


export default async function Page() {
	const result = await validateToken()
	const id = result.success ? result.id : null

	if (!id) return <div>failed</div>;

	const student = await readStudent(new ObjectId(id))
	if (!student) return <div>user not found</div>
	if (student.role !== "admin") return <div>권한이 없습니다.</div>

	const students = await readManyStudentFlat()
	return (
		<div className="p-5">
			<StudentsTable students={students} />
		</div>
	)



}
