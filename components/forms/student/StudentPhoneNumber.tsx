import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function PhoneNumber({who}: {who: "student" | "guardian"}) {
	const {setError, register,watch, formState:  { errors: { studentPhoneNumber: sPhoneNErr, guardianPhoneNUmber: gPhoneErr}},} = useFormContext<StudentData>();
	const { phone } = input();
	const schemaType = who === "student" ? "studentPhoneNumber" : "guardianPhoneNUmber"
	return (
		<div className={container()}>
			<label className={label()}> { who === "student" ? "학생" : "보호자"} 전화번호</label>
			<div className="flex space-x-2 items-center">
				<input placeholder="010" type="number"  className={phone({width: "s"})} {...register(`${schemaType}.0`)}/>
				<span> - </span>
				<input placeholder="0000" type="number" className={phone({width: "m"})} {...register(`${schemaType}.1`)}/>
				<span> - </span>
				<input placeholder="0000" type="number" className={phone({width: "m"})} {...register(`${schemaType}.2`)}/>
			</div>
			
			{who === "student" && sPhoneNErr && <div>{sPhoneNErr[0]?.message}</div>}
			{who === "student" && sPhoneNErr && <div>{sPhoneNErr[1]?.message}</div>}
			{who === "student" && sPhoneNErr && <div>{sPhoneNErr[2]?.message}</div>}

			{who === "guardian" && gPhoneErr && <div>{gPhoneErr.message}</div>}

			{who === "guardian" && gPhoneErr && <div>{gPhoneErr[0]?.message}</div>}
			{who === "guardian" && gPhoneErr && <div>{gPhoneErr[1]?.message}</div>}
			{who === "guardian" && gPhoneErr && <div>{gPhoneErr[2]?.message}</div>}
			{who === "guardian" && gPhoneErr && <div>{gPhoneErr.message}</div>}
		</div>
	)
}
