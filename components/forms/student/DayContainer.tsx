"use client";
import { StudentDataRegister } from "@/types/hook-form";
import { forwardRef } from "react"
import { tv } from "tailwind-variants"
import Day from "./Day";

const DayContainer = forwardRef<
HTMLInputElement, 
StudentDataRegister>((props, ref) => {
	return (
	<div className={dayContainerTV()} >
		<Day label="mon" ref={ref} {...props} />
		<div className=""></div>
	</div>
	)
})



const dayContainerTV= tv({
	base: "flex space-x-2"
})


export default DayContainer;
