import { readManyStudent } from "@/app/lib/mongo/students";
import { NextResponse } from "next/server";

export async function GET(){
	const manyStudents = await readManyStudent()

	return NextResponse.json(manyStudents)
}
