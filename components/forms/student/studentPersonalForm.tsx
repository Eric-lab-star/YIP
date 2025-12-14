"use client";

import { form } from "@/app/lib/tv/forms/FormStyles";
import studentSchema, { DayType }  from "@/app/lib/zod/studentSchema";
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
import { useDaySelect } from "@/app/stores/classDayStore";
import { useEffect } from "react";

const mock = {
	name: "testname",
	birthYear: 2010,
	birthDate: 12,
	birthMonth: 1,
	school: "testSchool",
	studentPhoneNumber: ["010", "2344","2341"],
	guardianPhoneNumber: ["010", "0342", "1234"],
	classDays: [ 
		{id: uuidv4(), day: "mon" as DayType, start: {h: 12, m: 30}, end: {h: 14, m: 30}},
		{id: uuidv4(), day: "tue" as DayType, start: {h: 12, m: 30}, end: {h: 14, m: 30}},
	],
}

export default function StudentPersonalForm({defaultData}: {defaultData?: string}) {
	const currentData: StudentData = defaultData ? JSON.parse(defaultData): mock;
	const {selectables, initSelect} = useDaySelect();

	useEffect(()=>{
		if (currentData.classDays.length > 1) {
			const cds = currentData.classDays;
			initSelect(cds)
		}
	},[])

	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema),
		mode: "all",
		defaultValues: currentData
	})

	const { formState:{ isSubmitting }  } = stM

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


