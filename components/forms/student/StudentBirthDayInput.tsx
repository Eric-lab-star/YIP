import { input, label } from "@/app/lib/tv/forms/FormStyles"
import { IBirthDayInput } from "@/types"

export function BirthDayInput ({field, register, name, rOption}: IBirthDayInput) {
	const { base } = input()
	const {onChange, max, min, onBlur} = rOption
	return <>
			<div className="flex justify-center items-center space-x-1">
				<input autoComplete="off" id={name} {...register(name, {onBlur,onChange, min, max, valueAsNumber: true})} placeholder={name === "birthYear" ? "2025" : "01"} 
				className={base({className: name === "birthYear" ? "w-25" : "w-20"})} />
				<label className={label()} htmlFor={name} >{field}</label>
			</div>
	</>
}
