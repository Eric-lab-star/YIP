import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { useFormContext } from "react-hook-form";

export default function StudentBirthInput() {
	const {register }= useFormContext<StudentData>();
	const {birth} = input();

	return <div className={container()}>
		<div className={label()}>생년월일</div>
		<div className="flex space-x-5 ">
			<div className="relative">
				<input id="year" {...register("birthYear")} placeholder="2010" 
				className={birth({className: "w-30"})} />
				<label className={label({inset: "right"})} htmlFor="year">년</label>
			</div>
			<div className="relative">
				<input id="month" {...register("birthMonth")} placeholder="10" className={birth({className: "w-15"})} />
				<label className={label({inset: "right"})} htmlFor="month">월</label>
			</div>
			<div className="relative">
				<input id="date" {...register("birthDate")} placeholder="12" className={birth({className: "w-15"})}/>
				<label className={label({inset: "right"}) } htmlFor="date">일</label>
			</div>
		</div>
	</div>
}
