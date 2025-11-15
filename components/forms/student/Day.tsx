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

export default function Week() {
	const {control } = useFormContext<StudentData>()


	return (
		<div className="flex space-y-3 flex-col w-full  ">
				{ week.map((d) => <Controller control={control} name={"classDays"} key={d} render={ ({field: {value}})=> <Day d={d} value={value}  key={d}/>} />) }
		</div>
	)
}

function Day({d, value } : {d : typeof week[number]; value: StudentData["classDays"]}) {

	const [click, setClick] = useState(false);
	const handleClick = ()=> {
		setClick(!click);
		value[d] = !value[d];
	
	}

	return (
		<div id={d} className={classDay({click})}  onClick={()=> handleClick()}  key={d}>
			<div className="capitalize">{d}</div>
			{
				click &&
			<div className="flex space-x-2 items-center">
				<TimeInput />
				<div className="text-2xl"> ~ </div>
				<TimeInput />
			</div>

			}
		</div>
	)
}

function TimeInput() {
	const [t, setT] = useState("");

	const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
		e.stopPropagation() 
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setT(e.currentTarget.value);
	}
	const {time}  = input()
	return <input className={time()} onClick={(e) =>  handleInputClick(e)} type="time" onChange={(e)=> handleChange(e)}  value={t}/>
}

