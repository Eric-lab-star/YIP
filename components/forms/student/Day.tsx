import { day, inputtv } from "@/app/lib/tv/forms/FormStyles";
import { StudentDataRegister } from "@/types";
import { forwardRef, useState } from "react";


/**
	* Day componet is used inside DayContainer Componet
	* Recieves register from react hook form.
	*/
const Day = forwardRef<HTMLInputElement, StudentDataRegister & {label: string, key: string}>(({label, key, ...register}, ref) => {

	const [click, setClick] = useState(false)
	const handleClick = () =>{
		console.log(label)
	}
	const tv = day({click})
	return (
		<div key={key} onClick={() => handleClick()} className={tv}>
			<input id={label} value={label} hidden type="checkbox" ref={ref} className={inputtv({size: "l"})} {...register}/>
			<label htmlFor={label}>
				{label}
			</label>
		</div>

	)
});


export default Day;
