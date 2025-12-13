"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Day, StudentData } from "@/types";
import StudentNameInput from "@/components/forms/student/StudentNameInput";
import ClassDays from "@/components/forms/student/StudentClassDay/ClassDays";
import Title from "@/components/commons/Title";
import StudentBirthInput from "@/components/forms/student/StudentBirthInput";
import StudentSchool from "@/components/forms/student/StudentSchool";
import SubmitBtn from "@/components/commons/SubmitBtn";
import PhoneNumber from "@/components/forms/student/StudentPhoneNumber";
import studentSchema from "../../lib/zod/studentSchema";
import { studentSignupFormAction } from "../../actions/studentAction";
import { form, layout } from "../../lib/tv/forms/FormStyles";

/**
* renders home
*/
export default function Page() {
	/**
	*stM = studentMethod
	*register StudentData to react hook form
	* */ 
	const stM = useForm<StudentData>({
		resolver: zodResolver(studentSchema),
		mode: "all",
		defaultValues: {
		}
	})

	const { reset, setError, watch, formState:{isSubmitting} } = stM

	
	const onSubmit = async (data: StudentData) => {
		const classDay = watch(`classDays`)
		// const result = await studentSignupFormAction(data)
		// if (!result.success) {
		// 	console.log(result.errors)
		// } else {
		// 	reset();
		// }  
	}



	return (
		<div	className={layout()} >
			<Title name="신규 등록" />
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
		</div>
	)
}


