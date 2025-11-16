import { classDay, input } from "@/app/lib/tv/forms/FormStyles"
import { StudentData } from "@/types"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"

const week = [
	"mon",
	"tue",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const

export default function Week({classDay}: {classDay: number[]}) {
	
	return (
		<div className="flex space-y-3 flex-col w-full  ">
				{ classDay.map((d) => <Day d={d} key={d}/>) }
		</div>
	)
}

function Day({d} : {d : number;}) {

	return (
		<div className={classDay()}  key={d}>
			<div className="capitalize">{d}</div>
			<div className="flex space-x-2 items-center">
				<TimeInput d={d} label={"start"} />
				<div className="text-2xl"> ~ </div>
				<TimeInput d={d} label={"end"}/>
			</div>
		</div>
	)
}

function TimeInput({d, label}: {label: "start"|"end",d: typeof week[number]}) {
	const {register } = useFormContext<StudentData>()
	const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
		e.stopPropagation() 
	}

	const handleChange =(e: ChangeEvent<HTMLInputElement> ) => {
		const target = e.currentTarget;
		if (target.value.length > 2) {
			target.value = target.value.slice(0, 2);
		}
	}



	const {time}  = input()
	return <>
	
	<div className="relative">
		<input {...register(`classDays.${d}.${label}.h`, {max:24, min:0, onChange:(e) => handleChange(e)})} className={time()} onClick={(e) =>  handleInputClick(e)} type="number"/>
		<div className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">h</div>
	</div>
	
	<div className="relative">
		<input max={60} min={0} {...register(`classDays.${d}.${label}.m`, {max: 60, min: 0, onChange:(e) => handleChange(e) })} className={time()} onClick={(e) =>  handleInputClick(e)} type="number"/>
		<div className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">m</div>
	</div>
	</>
	
}

