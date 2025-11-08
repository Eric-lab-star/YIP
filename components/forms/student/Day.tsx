import { StudentData } from "@/types";
import { useState } from "react";
import { useFormContext } from "react-hook-form";


export default function Day({day}:{day: string}) {
	const [check, setCheck] = useState(false)
	const handleClick = () => {
		setCheck(!check)
	}
	const ctx = useFormContext<StudentData>()
	return <>
		<label onClick={handleClick} className={`select-none w-15  h-15 grid place-items-center ${check ? "bg-amber-200 text-zinc-400" : "bg-zinc-500 text-amber-200"}`} htmlFor={day}>{day}
		</label>
		<input type="checkbox" hidden {...ctx.register("classDays")} id={day}/>
		</>
}
