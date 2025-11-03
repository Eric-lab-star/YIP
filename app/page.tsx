"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { IStudentDoc } from "./lib/mongo/students/studentTypes";
import { tv } from "tailwind-variants";
import { postStudentAction } from "./actions/userAction";
import { useState, useTransition } from "react";


export default function Page() {
	const [isPending, startTransition] = useTransition();
	const [objID, setObjID] = useState("");

	const { handleSubmit, register } = useForm<IStudentDoc>()
	const onSubmit: SubmitHandler<IStudentDoc> = async (data: IStudentDoc) =>{
			const msg =  await postStudentAction("hello")
			console.log(msg)

	}


	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex w-100 space-y-1 flex-col">
				<input placeholder="이름을 입력하세요" defaultValue="김경섭" className={inputStyle()} {...register("name")} />
				<input placeholder="년" defaultValue="1997" className={inputStyle()} {...register("birthYear")}/>
				<input placeholder="월" defaultValue="09" className={inputStyle()} {...register("birthMonth")}/>
				<input placeholder="일" className={inputStyle()} defaultValue="12"  {...register("birthDate")}/>
				<input className={inputStyle()} placeholder="학교" defaultValue="종촌"  {...register("school")}/>
				<input defaultValue={isPending ? "pending": "submit"} type="submit" className="p-2 border-2 rounded-2xl"/>
			</form>
			<div className="p-2 bg-amber-100">
				<span>uploaded</span> <span>{objID}</span>
			</div>
		</div>
	)
}

const inputStyle = tv({
	base: "p-2 bg-amber-50"
})

