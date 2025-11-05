import dayLabelTV from "@/app/lib/tv/forms/dayLabelTV";
import inputTV from "@/app/lib/tv/forms/inputTV";
import { StudentDataRegister } from "@/types";
import { forwardRef } from "react";


/**
	* Day componet is used inside DayContainer Componet
	* Recieves register from react hook form.
	*/
const Day = forwardRef<HTMLInputElement, StudentDataRegister & {label: string}>(({label, ...register}, ref) => {
	return (
		<div className={dayLabelTV()}>
			<input id={label} value={label} hidden type="checkbox" ref={ref} className={inputTV({size: "l"})} {...register}/>
			<label htmlFor={label}>
				{label}
			</label>
		</div>

	)
});


export default Day;
