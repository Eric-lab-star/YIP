"use client";

import { tv } from "tailwind-variants";
import { postStudent, responseType} from "./actions/students";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentData, studentSchema } from "./lib/zod/studentSchema";
import { StudentList } from "./lib/fetcher/students";
import { mutate } from "swr";



export default function Page() {
	const [isPending, startTransition ] = useTransition();
	const [serverResult, setServerResult] = useState<responseType>({})
	

	const { register, handleSubmit, formState:{errors}, reset  } = useForm<StudentData>({
		resolver: zodResolver(studentSchema)
	})

	const onSubmit = (data: StudentData) => {
		startTransition(async () => {
			const res = await postStudent(data)
			setServerResult(res)
			if (res.success) reset();
			mutate("/api/students")
		})
	}


	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}  className="bg-amber-100 pt-3 flex justify-center items-center space-y-1 flex-col">
				<input  placeholder="이름을 입력하세요"  className={"p-2 w-150 bg-amber-50"} {...register("name")}  />
				<div className="flex flex-wrap">
					<input placeholder="년"  className={"p-2 w-50 bg-amber-50"}  {...register("birthYear")}/>
					<input placeholder="월"  className={"p-2 w-50 bg-amber-50"} {...register("birthMonth")}/>
					<input placeholder="일" className={"p-2 w-50 bg-amber-50"}   { ...register("birthDate") }/>
				</div>
				<input placeholder="학교" className={"p-2 w-150 bg-amber-50 "}   {...register("school")} />
				<input type="submit" className="p-2 border-2 rounded-2xl"/>
			</form>
			<StudentList />
		</div>
	)
}

const inputStyle = tv({
	base: "p-2 bg-amber-50"
})



