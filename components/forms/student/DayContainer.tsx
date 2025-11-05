"use client";
import { StudentDataRegister } from "@/types/hook-form";
import { forwardRef } from "react"
import Day from "./Day";
import dayContainerTV from "@/app/lib/tv/forms/dayContainerTV";

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
	<div className={dayContainerTV()} >
		{week.map((w) => <Day key={w} label={w.toUpperCase()} {...props} ref={ref}/>) }
	</div>
	)
})





export default DayContainer;
