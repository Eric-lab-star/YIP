"use client";

import { useEffect, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import studentSchema from "./lib/zod/studentSchema";
import { IActionRes, StudentData } from "@/types";
import StudentNameInput from "@/components/forms/student/StudentNameInput";
import { formtv, submittv } from "./lib/tv/forms/FormStyles";
import ClassDays from "@/components/forms/student/ClassDays";

/**
	* renders home
	*/
export default function Page() {
	const [_, startTransition ] = useTransition();
	const [serverResult, setServerResult] = useState<IActionRes>({})

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


// TODO: make readable code
// 1st try: 
// forwardRef 
// 	--> problem: nextjs renders twice which makes diffciult to devlop toggle 
// 	too many forwarding 
// 2nd try: passing register as prop
// nested input components is not subscribed to register
// 3rd try: using FormProvider

	return (
		<div>
		<FormProvider {...stM}>
			<form onSubmit={stM.handleSubmit(onSubmit)}  className={formtv()} >
				<StudentNameInput />		
				<ClassDays />
				<input className={submittv()} type="submit" />
			</form>
		</FormProvider>
		</div>
	)
}


