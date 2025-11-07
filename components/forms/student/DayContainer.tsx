"use client";
import { StudentData } from "@/types/hook-form";
import {  useState } from "react"
import { day, dayContainertv } from "@/app/lib/tv/forms/FormStyles";
import { UseFormRegister } from "react-hook-form";

const week = [
	"mon",
	"tues",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const;

const DayContainer = ({register}: {register: UseFormRegister<StudentData>}) => {
	return (
	<div className={dayContainertv()} >
	{
		week.map((d)=> <Day key={d} label={d}/>)
	}
	</div>
	)
}


const Day= ({label}: {label: typeof week[number]}) => {
	const [click, setClick] = useState(false);
	return <div className={day({click})} onClick={()=>setClick(!click)}>{label}</div>
}


export default DayContainer;
