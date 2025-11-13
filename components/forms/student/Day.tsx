import { classDay } from "@/app/lib/tv/forms/FormStyles"
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
		<div className="flex w-full justify-between items-center">
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
	return <div id={d} className={classDay({click})}  onClick={()=> handleClick()}  key={d}> {d}</div>
}
