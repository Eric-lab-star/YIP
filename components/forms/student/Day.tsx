import { classDay } from "@/app/lib/tv/forms/FormStyles"
import { StudentData } from "@/types"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

export default function Day({day}: {day: string}) {
	const {register} = useFormContext<StudentData>()
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	return (
		<div>
			<label htmlFor={day} className={classDay({click})} onClick={handleClick} >{day}</label>
			<input id={day} className="hidden" type="checkbox" {...register("classDays")} />
		</div>
	)
}
