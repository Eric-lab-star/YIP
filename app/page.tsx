"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import studentSchema from "./lib/zod/studentSchema";
import { StudentData } from "@/types";
import StudentNameInput from "@/components/forms/student/StudentNameInput";
import { form, layout } from "./lib/tv/forms/FormStyles";
import ClassDays from "@/components/forms/student/ClassDays";
import Title from "@/components/commons/Title";
import StudentBirthInput from "@/components/forms/student/StudentBirthInput";
import StudentSchool from "@/components/forms/student/StudentSchool";
import SubmitBtn from "@/components/commons/SubmitBtn";

/**
* renders home
*/
export default function Page() {

	/**
		* stM = studentMethod
		* */ 
	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema)
	})
	
	const onSubmit = (data: StudentData) => {
		console.log("filled data")
		console.log(data);
	}

	useEffect(()=> {
		if(stM.formState.errors) {
			console.log("missing data:")
			console.log(stM.formState.errors);
		} else {
			console.log("no errors in form")
		} 
	},[stM.formState.errors])


/** TODO: Make validation 
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


