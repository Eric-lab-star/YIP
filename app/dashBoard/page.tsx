import { ObjectId } from "mongodb";
import { validateToken } from "../lib/auth/login"
import { readManyStudentFlat, readStudent } from "../lib/mongo/students";
import StudentsTable from "@/components/commons/table/StudentsTable";
import { Card, CardContent } from "@/components/ui/card";
import SignUpForm from "@/components/forms/signup/SignUpForm";

export const dynamic = 'force-dynamic';

export default async function Page() {
	const result = await validateToken()
	const id = result.success ? result.id : null

	if (!id) return <div>failed</div>;

	const student = await readStudent(new ObjectId(id))
	if (!student) return <div>user not found</div>
	if (student.role !== "admin") return <div>권한이 없습니다.</div>

	const students = await readManyStudentFlat()
	return (
		<div className="space-y-5 p-5">
			<SignUpForm />
			<Card className="w-full">
				<CardContent className="space-y-5">
					<StudentsTable students={students} />
				</CardContent>
			</Card>
		</div>

	)
}
