"use client";

import { loginAction, LoginActionRes } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

export type LoginInputs = {
	name: string,
	password: string,
}

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		setValue, 
		formState: { errors },
	} = useForm<LoginInputs>()
	const [loginErr, setLoginErr] = useState<string>()
	const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
		const res = await loginAction(data);
		if (res.login) {
			redirect("/")
		} else {
			setLoginErr(res.message)
		}
		setValue("name", "")
		setValue("password", "")
	}

	return (
			<div className="h-max p-3 bg-amber-50 rounded-md ">
				{loginErr && <div>{loginErr}</div>}
				<form method="get"  onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3 ">
					<input placeholder="이름" {...register("name", {required: true})} 
					className="border-b-2 border-zinc-400 p-2 focus:outline-hidden focus:border-b-indigo-400 focus:bg-indigo-200" />
					{errors.name && <div className="text-red-400"> 아이디 입력은 필수 입니다. </div> }
					<input placeholder="전화번호 또는 비밀번호" {...register("password", {required: true})}
					className="border-b-2 border-zinc-400 p-2 focus:outline-hidden focus:border-b-indigo-400 focus:bg-indigo-200"
					/>
					{errors.password && <div className="text-red-400"> 비밀번호 입력은 필수 입니다. </div> }
					<input 
					className="text-zinc-100 text-lg shadow-md h-10 bg-amber-500 w-full rounded-md hover:bg-amber-600" 
					type="submit" value={"로그인"} />
				</form>
			</div>
	)
}

