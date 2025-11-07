"use client";

import { postStudent } from "./actions/studentAction";
import { useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import studentSchema from "./lib/zod/studentSchema";
import { StudentTable } from "../components/SWR/students";
import { mutate } from "swr";
import DayContainer  from "@/components/forms/student/DayContainer";
import { IActionRes, StudentData } from "@/types";
import StudentFormName from "@/components/forms/student/StudentFormName";
import { day, formtv, inputtv, submittv } from "./lib/tv/forms/FormStyles";

/**
	* renders home
	*/
export default function Page() {
	const [_, startTransition ] = useTransition();
	const [serverResult, setServerResult] = useState<IActionRes>({})

	const { register,watch, handleSubmit, formState:{errors}, reset  } = useForm<StudentData>({
		resolver: zodResolver(studentSchema)
	})
	
	const onSubmit = (data: StudentData) => {
		console.log(data);
		// startTransition(async () => {
		// 	const res = await postStudent(data)
		// 	setServerResult(res)
		// 	if (res.success) {
		// 		reset();
		// 		mutate("/api/students")
		// 	}
		// })
	}

	const [click, setClick] = useState<string[]>([""]);
	const handleClick  = () => {
		setClick(["mon"])
	}
// TODO: make readable code
// 1st try: 
// forwardRef 
// 	--> problem: nextjs renders twice which makes diffciult to devlop toggle 
	// 	too many forwarding 
// 	

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}  className={formtv()} >
				<StudentFormName register={register} label="name" />
				<div className="grid-cols-3">
					<input placeholder="년"  className={inputtv({size: "s", insert: false})}  {...register("birthYear", {required: true})}/>
					<input placeholder="월"  className={inputtv({size: "s", insert: false})} {...register("birthMonth", {required:true })}/>
					<input placeholder="일" className={inputtv({size: "s", insert: false})}   { ...register("birthDate", {required: true}) }/>
				</div>

				<DayContainer register={register}/>
				<input placeholder="학교" className={inputtv({size: "l"})}    {...register("school", {required: "학교를 입력하세요"})} />
				<input type="submit" defaultValue={"제출"} className={submittv()} />
			</form>
			<StudentTable />

		</div>
	)
}



