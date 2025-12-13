"use client";

import { studentSignupFormAction } from "@/app/actions/studentAction";
import { form } from "@/app/lib/tv/forms/FormStyles";
import studentSchema from "@/app/lib/zod/studentSchema";
import { StudentData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import StudentNameInput from "./StudentNameInput";
import PhoneNumber from "./StudentPhoneNumber";
import StudentBirthInput from "./StudentBirthInput";
import StudentSchool from "./StudentSchool";
import SubmitBtn from "@/components/commons/SubmitBtn";
import ClassDays from "./StudentClassDay/ClassDays";

export default function StudentPersonalForm({defaultData}: {defaultData?: string}) {
	const currentData = defaultData ? JSON.parse(defaultData) : {};
	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema),
		mode: "all",
		defaultValues: currentData
	})

	const { reset, setError, watch, formState:{isSubmitting} } = stM

	const onSubmit = async (data: StudentData) => {
		// const result = await studentSignupFormAction(data)
		// if (!result.success) {
		// 	console.log(result.errors)
		// } else {
		// 	reset();
		// }  
	}

	return (
			<FormProvider {...stM}>
				<form onSubmit={stM.handleSubmit(onSubmit)}  className={form()} >
					<div className="flex flex-col justify-between   space-y-3 ">
						<StudentNameInput />		
						<PhoneNumber who={"student"}/>
						<PhoneNumber who={"guardian"}/>
						<StudentBirthInput />
						<StudentSchool />
					</div>
					<ClassDays />
					<SubmitBtn isSubmitting={isSubmitting} name={"등록"} /> 
				</form>
			</FormProvider>
	)
}


