"use client";

import { studentSignupFormAction } from "@/app/actions/studentAction";
import { form, layout } from "@/app/lib/tv/forms/FormStyles";
import studentSchema from "@/app/lib/zod/studentSchema";
import Title from "@/components/commons/Title";
import { Day, StudentData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import StudentNameInput from "./StudentNameInput";
import PhoneNumber from "./StudentPhoneNumber";
import StudentBirthInput from "./StudentBirthInput";
import StudentSchool from "./StudentSchool";
import SubmitBtn from "@/components/commons/SubmitBtn";
import ClassDays from "./StudentClassDay/ClassDays";
import { useClassDays } from "@/app/stores/classDayStore";

export default function StudentPersonalForm({defaultData}: {defaultData?: string}) {

	const { addDay, days } = useClassDays();
	/**
	*stM = studentMethod
	*register StudentData to react hook form
	* */ 
	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema),
		mode: "all",
		defaultValues: defaultData ? JSON.parse(defaultData) : {}
	})

	const { reset, setError, watch, formState:{isSubmitting} } = stM

	
	const onSubmit = async (data: StudentData) => {
		const classDay = watch(`classDays`)
		for (const [d, t] of Object.entries(classDay)) {
			if (t.start.h == t.end.h) {
				setError(`classDays.${d as Day}`,{type: "time", message: "시작시간이 종료시간과 같을 수 없습니다."})
				return;
			}
			if (t.start.h > t.end.h) {
				setError(`classDays.${d as Day}`,{type: "time", message: "시작시간이 종료시간보다 빨라야 합니다."})
				return
			}
		}
		const result = await studentSignupFormAction(data)
		if (!result.success) {
			console.log(result.errors)
		} else {
			reset();
		}  
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


