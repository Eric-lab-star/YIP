"use client";

import Title from "@/components/commons/Title";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";


type input = {
}

export default function Page(){
	const {register, handleSubmit} = useForm()
	const onSubmit: SubmitHandler<input> = () => {
		
	}
	return (
		<div>
			<Title> Form Practice </Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col my-3">
					<label className="text-lg font-bold">id</label>
					<input className={style()} {...register("id", {required: true})}/>
				</div>
			</form>
		</div>
	)
}

const style = tv({
	base: "border-b-gray-600  border-b",
	variants: {
	}
})
