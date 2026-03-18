import { readStudent } from "@/app/lib/mongo/students";
import SignUpForm from "@/components/forms/signup/SignUpForm";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	if (!ObjectId.isValid(id)) {
		return notFound()
	}

	// param  검증
	const student = await readStudent(new ObjectId(id))
	if (!student) {
		return notFound()
	}
	return (
		<div className="space-y-5 p-5">
			<SignUpForm studentData={{ ...student, _id: student._id.toString() }} />
		</div>
	)
}
