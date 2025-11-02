"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { IStudentDoc } from "./lib/mongo/students/studentTypes";
import { tv } from "tailwind-variants";


export default function Page() {

	const { handleSubmit, register } = useForm<IStudentDoc>()

	const onSubmit: SubmitHandler<IStudentDoc> = (data) => console.log(data);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex w-100 space-y-1 flex-col">
				<input placeholder="이름을 입력하세요" defaultValue="김경섭" className={input()} {...register("name")} />
				<input placeholder="년" defaultValue="1997" className={input()} {...register("birthYear")}/>
				<input placeholder="월" defaultValue="09" className={input()} {...register("birthMonth")}/>
				<input placeholder="일" className={input()} defaultValue="12"  {...register("birthDate")}/>
				<input className={input()} placeholder="학교" defaultValue="종촌"  {...register("school")}/>
				<input type="submit" className="p-2 border-2 rounded-2xl"/>
			</form>
		</div>
	)
}

const input = tv({
	base: "p-2 bg-amber-50 "
})

