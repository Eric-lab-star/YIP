"use client";

import Title from "@/components/commons/Title";
import { testFormType } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import { submitForm } from "../actions/testFormAction";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { testFormSchema } from "../lib/zod/testFormSchema";



export default function Page(){
	const {register, handleSubmit} = useForm<testFormType>({
		resolver: zodResolver(testFormSchema)
	})
	const [serverErr, setServerErr] = useState<boolean|null>(null)
	const onSubmit: SubmitHandler<testFormType> = async (data) => {
		const reaction = await submitForm(data)
		if (!reaction.pass){
			setServerErr(false)
		}
	}




	return (
		<div>
			<Title> Form Practice </Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col my-3">
					<label className="text-lg font-bold">id</label>
					<input className={style()} {...register("id")}/>
				</div>
			</form>
			<div>{serverErr && "somthing went wrong"}</div>
		</div>
	)
}



const style = tv({
	base: "border-b-gray-600  border-b",
	variants: {
	}

})
