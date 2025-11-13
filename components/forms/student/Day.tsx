import { classDay, input } from "@/app/lib/tv/forms/FormStyles"
import { StudentData } from "@/types"
import { MouseEvent, useEffect, useState } from "react"
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

	const handleInputClick = (e: MouseEvent) => {
		e.stopPropagation() 
	}
	const {time}  = input()
	return (
		<div id={d} className={classDay({click})}  onClick={()=> handleClick()}  key={d}>
			<div className="capitalize">{d}</div>
			{
				click &&
			<div className="flex space-x-2 items-center">
				<input onClick={(e) => handleInputClick(e)} className={time()}  type="number" placeholder="14:00" />
				<div className="text-2xl"> ~ </div>
				<input className={time()} onClick={(e) =>  handleInputClick(e)} type="number" placeholder="16:00" />
			</div>

			}
		</div>
	)

}
