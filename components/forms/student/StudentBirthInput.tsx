import { container, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { BirthDayInput } from "./StudentBirthDayInput";

/** Renders 3 Inputs
* 1. birthday year
* 2. birthday month
* 3. birthday date
*/
export default function StudentBirthInput() {
	const {register}= useFormContext<StudentData>();

	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		if(target.name === "birthMonth" || target.name === "birthDate" &&  target.value.length > 2) {
			target.value = target.value.slice(0, 2);
		}
		if (target.name === "birthYear" && target.value.length > 4) {
			target.value = target.value.slice(0, 4)
		}
	}

	return <div className={container()}>
		<div className={label()}>생년월일</div>
		<div className="flex space-x-5 ">
			<BirthDayInput field="년" name="birthYear" register={register} rOption={{onChange:handleNumberChange, min: 1800}}/>
			<BirthDayInput field="월" name="birthMonth" register={register} rOption={{onChange:handleNumberChange, min: 1, max: 12}}/>
			<BirthDayInput field="일" name="birthDate" register={register} rOption={{onChange:handleNumberChange, min: 1, max: 31}}/>
		</div>
	</div>
}
