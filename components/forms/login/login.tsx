"use client";

import { useForm } from "react-hook-form";

export default function Login(){
	const {register} = useForm()
		return (
		<form>
			<label>id</label>
			<input type="text" {...register("id")} />
		</form>
	)
	
}
