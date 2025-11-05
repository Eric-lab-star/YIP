import { inputTV } from "@/app/lib/tv/forms/inputTV"
import { StudentData } from "@/app/lib/zod/studentSchema"
import { forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"
import { tv } from "tailwind-variants"

export const DayInput = forwardRef<
HTMLInputElement, 
ReturnType<UseFormRegister<StudentData>>>((props, ref) => {
	return (
	<div className={dayContainer()} >
		<input id="mon" value={"MON"} hidden type="checkbox" ref={ref} className={inputTV({size: "l"})} {...props}/>
		<label className={dayLabel()} htmlFor="mon">
			mon
		</label>
		<input id="tue" value={"TUE"} type="checkbox" hidden ref={ref}  className={inputTV({size: "l"})}  {...props}/>
		<label className={dayLabel()} htmlFor="tue">
			tue
		</label>
		<div className=""></div>
	</div>
	)
})


const dayContainer = tv({
	base: "flex space-x-2"
})

const dayLabel = tv({
	base: "p-2 w-15 h-15 bg-slate-100 rounded-2xl select-none flex justify-center items-center text-zinc-100" 
})
