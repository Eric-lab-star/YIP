import { input, label } from "@/app/lib/tv/forms/FormStyles"
import { IBirthDayInput } from "@/types"

export function BirthDayInput ({field, register, name, rOption}: IBirthDayInput) {
	const { base } = input()
	const {onChange, max, min} = rOption
	return <>
			<div className="relative">
				<input id={name} {...register(name, {onChange, min, max, valueAsNumber: true})} placeholder="2010" 
				className={base({className: name === "birthYear" ? "w-30" : "w-18"})} />
				<label className={label({inset: "right"})} htmlFor={name} >{field}</label>
			</div>
	</>
}
