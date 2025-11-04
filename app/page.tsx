"use client";

import { tv } from "tailwind-variants";
import { postStudent, responseType} from "./actions/students";
import { forwardRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentData, studentSchema } from "./lib/zod/studentSchema";
import { StudentList } from "./lib/fetcher/students";
import { mutate } from "swr";



export default function Page() {
	const [isPending, startTransition ] = useTransition();
	const [serverResult, setServerResult] = useState<responseType>({})

	const { watch, register, handleSubmit, formState:{errors}, reset  } = useForm<StudentData>({
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

	console.log(
		watch("attendence")
	)


	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}  className={formStyle()} >
				<input  placeholder="이름을 입력하세요"  className={inputStyle({size: "l"})} {...register("name", {required: true})}  />
				<div className="flex flex-wrap">
					<input placeholder="년"  className={inputStyle({size: "s"})}  {...register("birthYear", {required: true})}/>
					<input placeholder="월"  className={inputStyle({size: "s"})} {...register("birthMonth", {required:true })}/>
					<input placeholder="일" className={inputStyle({size: "s"})}   { ...register("birthDate", {required: true}) }/>
				</div>
				<DayInput {...register("attendence")}/>
				<input placeholder="학교" className={inputStyle({size: "l"})}    {...register("school", {required: "학교를 입력하세요"})} />
				<input type="submit" defaultValue={"제출"} className={submitStyle()} />
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


const DayInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>( (props, ref) => {
	return (
	<div className="flex space-x-2">
		<input id="mon" value={"MON"} hidden type="checkbox" ref={ref} className={inputStyle({size: "l"})} {...props}/>
		<label className="p-2 w-20 h-20 bg-slate-100 rounded-2xl select-none flex justify-center items-center" htmlFor="mon">
			mon
		</label>
		<input id="TUE" value={"TUE"} type="checkbox" hidden  className={inputStyle({size: "l"})} {...props}/>
		<label className="p-2 w-20 h-20 bg-slate-100 rounded-2xl select-none flex justify-center items-center" htmlFor="TUE">
			tue
		</label>
	</div>
	)
})




const submitStyle = tv({
	base: "w-150 shadow-2xl  p-2 bg-amber-50 mb-2 rounded-2xl"
})

const inputStyle = tv({
	base: "p-2 bg-amber-50",
	variants: {
		size: {
			s: "w-50",
			r: "w-100",
			l: "w-150"
		}
	}
})

const formStyle = tv({
	base: "bg-amber-100 pt-3 flex justify-center items-center space-y-1 flex-col"
})



