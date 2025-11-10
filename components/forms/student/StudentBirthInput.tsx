import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

export default function StudentBirthInput() {
	const {register}= useFormContext<StudentData>();
	const {base} = input();
	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.currentTarget.value.length > 2) {
			e.currentTarget.value = e.currentTarget.value.slice(0, 2);
		}
	}

	return <div className={container()}>
		<div className={label()}>생년월일</div>
		<div className="flex space-x-5 ">
			<div className="relative">
				<input id="year" {...register("birthYear")} placeholder="2010" 
				className={base({className: "w-30"})} />
				<label className={label({inset: "right"})} htmlFor="year">년</label>
			</div>
			<div className="relative">
				<input id="month"  {...register("birthMonth", {onChange: handleNumberChange})} placeholder="10" className={base({className: "w-18 "})} min={1} max={31} type="number" />
				<label className={label({inset: "right"})} htmlFor="month">월</label>
			</div>
			<div className="relative">
				<input id="date" {...register("birthDate")} placeholder="12" className={base({className: "w-18"})}/>
				<label className={label({inset: "right"}) } htmlFor="date">일</label>
			</div>
		</div>
	</div>
}
