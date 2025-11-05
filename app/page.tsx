"use client";

import { postStudent, responseType} from "./actions/students";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentData, studentSchema } from "./lib/zod/studentSchema";
import { StudentList } from "../components/SWR/students";
import { mutate } from "swr";
import { inputTV } from "./lib/tv/forms/inputTV";
import { submitTV } from "./lib/tv/forms/submitTV";
import { formTV } from "./lib/tv/forms/formTV";
import { DayInput } from "@/components/forms/student/days";



export default function Page() {
	const [isPending, startTransition ] = useTransition();
	const [serverResult, setServerResult] = useState<responseType>({})

	const { watch, register, handleSubmit, formState:{errors}, reset  } = useForm<StudentData>({
		resolver: zodResolver(studentSchema)
	})

	const onSubmit = (data: StudentData) => {
		startTransition(async () => {
			const res = await postStudent(data)
			setServerResult(res)
			if (res.success) {
				reset();
				mutate("/api/students")
			}
		})
	}

	console.log(
		watch("attendence")
	)


	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}  className={formTV()} >
				<input  placeholder="이름을 입력하세요"  className={inputTV({size: "l"})} {...register("name", {required: true})}  />
				<div className="flex flex-wrap">
					<input placeholder="년"  className={inputTV({size: "s"})}  {...register("birthYear", {required: true})}/>
					<input placeholder="월"  className={inputTV({size: "s"})} {...register("birthMonth", {required:true })}/>
					<input placeholder="일" className={inputTV({size: "s"})}   { ...register("birthDate", {required: true}) }/>
				</div>
				<DayInput {...register("attendence")}/>
				<input placeholder="학교" className={inputTV({size: "l"})}    {...register("school", {required: "학교를 입력하세요"})} />
				<input type="submit" defaultValue={"제출"} className={submitTV()} />
			{serverResult.errors && <div>{serverResult.errors.toString()}</div>}
			{errors.name && <div>이름을 입력하세요</div>}
			{errors.birthYear && <div>생년월일을 확인하세요</div>}
			{errors.birthMonth && <div>생년월일을 확인하세요</div>}
			{errors.birthDate && <div>생년월일을 확인하세요</div>}
			{errors.school && <div>학교를 입력하세요</div>}
			{errors.attendence && <div>{errors.attendence.message}</div>}
			</form>
			<StudentList />
		</div>
	)
}

