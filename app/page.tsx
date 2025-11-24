"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import studentSchema from "./lib/zod/studentSchema";
import { StudentData } from "@/types";
import StudentNameInput from "@/components/forms/student/StudentNameInput";
import { form, layout } from "./lib/tv/forms/FormStyles";
import ClassDays from "@/components/forms/student/StudentClassDay/ClassDays";
import Title from "@/components/commons/Title";
import StudentBirthInput from "@/components/forms/student/StudentBirthInput";
import StudentSchool from "@/components/forms/student/StudentSchool";
import SubmitBtn from "@/components/commons/SubmitBtn";
import { postStudent } from "./actions/studentAction";

/**
* renders home
*/
export default function Page() {
	/**
		* stM = studentMethod
		* */ 
	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema),
	})
	
	const onSubmit = async (data: StudentData) => {
		console.log(`postiing data ${data}`)
		const result = await postStudent(data)
		if (!result.success) {
			console.log(result.errors)
		} 
	}



/** TODO: form validation 
*/
	return (
		<div	className={layout()} >
			<Title name="학생정보" />
			<FormProvider {...stM}>
				<form onSubmit={stM.handleSubmit(onSubmit)}  className={form()} >
					<div className="flex flex-col justify-between  sm:flex-row space-y-3 ">
						<StudentNameInput />		
						<StudentBirthInput />
						<StudentSchool />
					</div>
					<ClassDays />
					<SubmitBtn />
				</form>
			</FormProvider>
		</div>
	)
}


