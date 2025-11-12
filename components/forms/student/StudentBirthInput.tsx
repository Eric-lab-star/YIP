import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData, StudentDataRegister } from "@/types";
import { ChangeEvent } from "react";
import { useFormContext, UseFormRegister, UseFormReturn } from "react-hook-form";

/** Renders 3 Inputs
* 1. birthday year
* 2. birthday month
* 3. birthday date
*/
export default function StudentBirthInput() {
	const {register}= useFormContext<StudentData>();
	const {base} = input();

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
			{/* <div className="relative">  */}
			{/* 	<input id="month"  {...register("birthMonth", {onChange: handleNumberChange, max: 12, min: 1, valueAsNumber: true})} placeholder="10" className={base({className: "w-18 "})} min={1} max={31} type="number" /> */}
			{/* 	<label className={label({inset: "right"})} htmlFor="month">월</label> */}
			{/* </div> */}

		{/* date */}
			<div className="relative">
				<input id="date" {...register("birthDate",{onChange: handleNumberChange, max: 0, min: 31, valueAsNumber: true} )} placeholder="12" className={base({className: "w-18"})}/>
				<label className={label({inset: "right"}) } htmlFor="date">일</label>
			</div>
		</div>
	</div>
}

interface Roption{
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	max?: number;
	min?: number
}

type BdName  = "birthYear" | "birthMonth" | "birthDate";

interface IBirthDayInput {
	field: string;
	register: UseFormRegister<StudentData>;
	name: BdName;
	rOption: Roption; 
}

function BirthDayInput ({field, register, name, rOption}: IBirthDayInput) {
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
