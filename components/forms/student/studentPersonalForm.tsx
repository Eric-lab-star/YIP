"use client";

import { form } from "@/app/lib/tv/forms/FormStyles";
import studentSchema  from "@/app/lib/zod/studentSchema";
import { StudentData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import StudentNameInput from "./StudentNameInput";
import PhoneNumber from "./StudentPhoneNumber";
import StudentBirthInput from "./StudentBirthInput";
import StudentSchool from "./StudentSchool";
import SubmitBtn from "@/components/commons/SubmitBtn";
import ClassDays from "./StudentClassDay/ClassDays";
import { useDaySelect } from "@/app/stores/classDayStore";
import { useEffect } from "react";
import { studentSignupFormAction, updateSignUpFormAction } from "@/app/actions/studentAction";
import { WithId } from "mongodb";


export default function StudentPersonalForm({type, defaultData}: {type: "수정하기" |"등록하기" ,defaultData?: string}) {
	const currentData: WithId<StudentData> = defaultData ? JSON.parse(defaultData): {};
	const { initSelect } = useDaySelect();


	useEffect(()=>{
		if (currentData.classDays && currentData.classDays.length > 1) {
			const cds = currentData.classDays;
			initSelect(cds)
		}
	},[])

	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema),
		mode: "all",
		defaultValues: currentData
	})

	const { formState:{errors, isSubmitting }, setError, watch, reset  } = stM

	const onSubmit = async (data: StudentData) => {
		const classDays = watch("classDays")
		let stop;
		classDays.forEach(
			(v,i) => {
				if ((v.start.m == 0 && v.start.h == 0) || (v.end.m == 0 && v.end.h == 0) ) {
					setError(`classDays.${i}`, {message: "시간을 설정해주세요", type: "custom"})
					stop = true;
					return;
				}
				if ((v.start.h > v.end.h) ) {
					setError(`classDays.${i}`, {message: "시간을 설정해주세요", type: "custom"})
					stop = true;
					return;
				}
			}
		)
		if (stop) {
			return
		}

		if (errors.classDays) {
			console.log(errors.classDays);
			return;
		};

		console.log(errors)

		
		switch (type) {
			case "등록하기": {
				const res = await studentSignupFormAction(data)
				if (!res.success) {
					console.log(res.errors)
					return;
				}
			}
				break;
			case "수정하기": {
				const res = await updateSignUpFormAction({...currentData, ...data})
				if (!res.success) {
					console.log(res.errors)
					return;
				}
			}
				break;
			default:
				break;
		}

		reset();
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
				<SubmitBtn isSubmitting={isSubmitting} name={type} /> 
			</form>
		</FormProvider>
	)
}


