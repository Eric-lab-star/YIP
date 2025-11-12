import { StudentData } from "@/types"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

const week = [
	"mon",
	"tues",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const

export default function Day() {
	const {register} = useFormContext<StudentData>()
	return (
		<div>
			<select multiple {...register("classDays", {required: true})}>
				<option value={""} selected={true} >등원일 선택</option>
				{week.map((d) => <option value={d} key={d}>{d}</option>)}
			</select >
		</div>
	)
}

