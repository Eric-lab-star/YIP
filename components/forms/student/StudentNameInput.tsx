import { container, errorMessage, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

export default function StudentNameInput() {
	const {register, formState: {errors: {name: nameError}},} = useFormContext<StudentData>();
	const {base} = input();
	const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const isLetter = isNaN(Number(target.value.slice(-1)))
		if (!isLetter) {
			target.value = target.value.slice(0,-1)
		}
	}
	const formHookProp = {...register("name", {
			required: "필수 항목입니다",
			validate: (v) => /^[a-zA-Z]*$/.test(v) || "Only letters allowed",
			onChange: (e) => {handlechange(e)}
		})}

	return (
		<div className={container()}>
			<label className={label()}>이름</label>
			<input autoComplete="off" placeholder="김경섭" className={base({width: "f"})} {...formHookProp} type="text" />
			{nameError && <div className={errorMessage({className: "lg:col-start-4 lg:col-span-2 h-full lg:flex lg:items-center "})}>{nameError.message}</div>}
		</div>
	)
}


