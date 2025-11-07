"use client";
import { StudentDataRegister } from "@/types/hook-form";
import { forwardRef, useRef, useState } from "react"
import { day, dayContainertv, inputtv } from "@/app/lib/tv/forms/FormStyles";

const week = [
	"mon",
	"tues",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
];

const DayContainer = forwardRef<
HTMLInputElement, 
StudentDataRegister>((props, ref) => {
	return (
	<div className={dayContainertv()} >
		<Mon ref={ref} {...props}/>
	</div>
	)
})




const Mon = forwardRef<HTMLInputElement, StudentDataRegister>(
(props, ref) => {
	const [click, setClick] = useState(false);
	return <div className={day({click})} onClick={()=>setClick(!click)}>
	Mon 
	<input type="checkbox" hidden value="mon" ref={ref} {...props}/>
	</div>
}

) 

const Tue = () => {
	const [click, setClick] = useState(false);
	return <div className={day({click})} onClick={()=>setClick(!click)}>Tue</div>
}



				// <div key={w} onClick={() => console.log(w)} className={day({click:false})}>
				// 	<input id={w} value={w} hidden type="checkbox" ref={ref} className={inputtv({size: "l"})} {...props}/>
				// 	<label htmlFor={w}>
				// 	{w.toUpperCase()}
				// 	</label>
				// </div>


export default DayContainer;
