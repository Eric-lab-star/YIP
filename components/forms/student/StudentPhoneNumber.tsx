import { container, errorMessage, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldError, Merge, useFormContext } from "react-hook-form";
import * as z from "zod"
export default function PhoneNumber({who}: {who: "student" | "guardian"}) {
	const { register, formState:  { errors: { studentPhoneNumber: sPhoneErr, guardianPhoneNumber: gPhoneErr}},} = useFormContext<StudentData>();
	const { phone } = input();
	const schemaType = who === "student" ? "studentPhoneNumber" : "guardianPhoneNumber"



	const handleChange=(e: ChangeEvent<HTMLInputElement>, max: number ) => {
		const target = e.currentTarget;
		const schema = z.coerce.number<number>()
		const parsed = schema.safeParse(target.value.slice(-1))
		if ( parsed.error ) {
			target.value = target.value.slice(0, -1)
		};

		if (target.value.length >= max) {
			target.value = target.value.slice(0, max);
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const invalidKeys = ["e", "E", "+", "-"];
		if ( invalidKeys.includes( e.key ) ) {
			e.preventDefault( )
		}
	}

	return (
		<div className={container()}>
			<label className={label()}> { who === "student" ? "학생" : "보호자"} 전화번호</label>
			<div className="flex space-x-2 items-center">
				<input placeholder="010" type="number"  className={phone({width: "s"})} {...register(`${schemaType}.0`, {onChange : (e)=> handleChange(e, 3)})} onKeyDown={(e) => handleKeyDown(e)}/>
				<span> - </span>
				<input placeholder="0000" type="number" className={phone({width: "m"})} {...register(`${schemaType}.1`, {onChange : (e)=> handleChange(e, 4)})} onKeyDown={(e) => handleKeyDown(e)}/>
				<span> - </span>
				<input placeholder="0000" type="number" className={phone({width: "m"})} {...register(`${schemaType}.2`, {onChange : (e)=> handleChange(e, 4)})} onKeyDown={(e) => handleKeyDown(e)}/>
			</div>
			
			{who === "student" && sPhoneErr && <PhoneErrMsg phoneErr={sPhoneErr}/>}
			{who === "guardian" &&  gPhoneErr && <PhoneErrMsg phoneErr={gPhoneErr}/>}
		</div>
	)
}


function PhoneErrMsg({phoneErr}: {phoneErr: Merge<FieldError, [(FieldError | undefined)?, (FieldError | undefined)?, (FieldError | undefined)?]> }) {

	const [err, setErr] = useState("")
	useEffect(()=> {
		if (phoneErr[0]?.message) {
			setErr(phoneErr[0].message)
		} else if (phoneErr[1]?.message) {
			setErr(phoneErr[1].message)
		} else if (phoneErr[2]?.message){
			setErr(phoneErr[2].message)
		} 
	}, [phoneErr[0], phoneErr[1], phoneErr[2]])

	return <div className={errorMessage()}>{err}</div>
}



