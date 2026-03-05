import { ObjectId } from "mongodb";
import { validateToken } from "../lib/auth/login"
import { readStudent } from "../lib/mongo/students";


export default async function Page() {
	const result = await validateToken()
	const id = result.success ? result.id : null

	if (!id) return <div>failed</div>;

	const student = await readStudent(new ObjectId(id))
	console.log(student)
	if (!student) return <div>user not found</div>
	return (
		<div>
		{student.role}
		</div>
	)


	
}
