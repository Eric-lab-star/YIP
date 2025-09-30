"use client";
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
	userId: string,
	password: string,
}

export default function AccountInfo() {
	const {
		register,
		handleSubmit,
		watch, 
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

	console.log(watch("userId")); // watch input value by passing the name of it
	
	return(
		<div className={`lg:col-span-2 lg:order-last md:order-first rounded-md p-2 md:mb-3
			lg:mb-0 bg-amber-50`}>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input placeholder="이름" {...register("userId")} />
					<input placeholder="전화번호 또는 비밀번호 " {...register("password", {required: true})} />
					{errors.password && <span>Password is required</span> }
					<input className="block" type="submit" defaultValue={"로그인"}/>
				</form>

			</div>
		</div>
	)
}
