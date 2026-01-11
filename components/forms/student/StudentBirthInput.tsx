import { container, errorMessage, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { BirthDayInput } from "./StudentBirthDayInput";


/**
	* renders birthday
	*/
export default function StudentBirthInput() {
	const {setFocus, register, formState: {errors: {birthDate, birthMonth, birthYear,}}}= useFormContext<StudentData>();

	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget;

		const isLetter = isNaN(Number(target.value.slice(-1)))
		if ( isLetter ) {
			target.value = target.value.slice(0,-1)
			return
		}
		
		if ( (target.name === "birthMonth" || target.name === "birthDate") &&  target.value.length >= 2 ) {
			target.value = target.value.slice(0, 2);
			if (target.name === "birthMonth") {
				setFocus("birthDate")
			}
		}

		if (target.name === "birthYear" && target.value.length >= 4) {
			target.value = target.value.slice(0, 4)
			setFocus("birthMonth")
		}
	}

	return <div className={container()}>
		<div className={label()}>생년월일</div>
		<div className=" lg:col-span-2 flex lg:justify-between lg:items-center space-x-5 ">
			<BirthDayInput field="년" name="birthYear" register={register}  rOption={{onChange:handleNumberChange, min: 1800}}/>
			<BirthDayInput  field="월" name="birthMonth" register={register}  rOption={{onChange:handleNumberChange, min: 1, max: 12,}}/>
			<BirthDayInput field="일" name="birthDate" register={register}  rOption={{onChange:handleNumberChange, min: 1, max: 31,}}/>
		</div>
		<li className={errorMessage({layout: "multi", className:"list-none"})}>
			{birthYear && <ul>{birthYear.message}</ul>}
			{birthMonth && <ul>{birthMonth.message}</ul>}
			{birthDate && <ul>{birthDate.message}</ul>}
		</li>
	</div>

}
