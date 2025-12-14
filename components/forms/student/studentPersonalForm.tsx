"use client";

import { form } from "@/app/lib/tv/forms/FormStyles";
import studentSchema, { DayType } from "@/app/lib/zod/studentSchema";
import { StudentData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import StudentNameInput from "./StudentNameInput";
import PhoneNumber from "./StudentPhoneNumber";
import StudentBirthInput from "./StudentBirthInput";
import StudentSchool from "./StudentSchool";
import SubmitBtn from "@/components/commons/SubmitBtn";
import ClassDays from "./StudentClassDay/ClassDays";
import {v4 as uuidv4} from "uuid";

export default function StudentPersonalForm({defaultData}: {defaultData?: string}) {
	const currentData = defaultData ? JSON.parse(defaultData) : {classDays: [{id: uuidv4() , day: "mon" as DayType, start: {h: "", m:""}, end: {h:"", m:""} }]};
	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema),
		mode: "all",
		defaultValues: currentData
	})

	const { watch, formState:{ isSubmitting }  } = stM

	console.log(
		watch("classDays"),
		"watch"
	)
	const onSubmit = async (data: StudentData) => {
		console.log(data, "student data")
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


