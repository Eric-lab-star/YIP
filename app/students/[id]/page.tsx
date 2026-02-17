import { readStudent } from "@/app/lib/mongo/students";
import Title from "@/components/commons/Title";
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

	return (
		<div className="p-5">
			<Title my="m" size="h1"> 나의 공간 </Title>
			<Title my="m" size="h2"> TIL - 기억보다 기록 </Title>
			<Title my="m" size="h2"> 과제 </Title>
			<Title my="m" size="h2"> 발표영상 </Title>
		</div>

	)
}

