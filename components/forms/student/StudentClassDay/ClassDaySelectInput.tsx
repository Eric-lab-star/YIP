"use client";

import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem, } from "@/components/ui/select"
import { ClassDayItemsType, DayType } from "@/app/lib/zod/studentSchema";

import { useDaySelect } from "@/app/stores/classDayStore"
import { Controller, useController, useFormContext } from "react-hook-form";
import { StudentData } from "@/types";
import { useEffect } from "react";

const week = [
	"mon",
	"tue",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const

const koreanWeek = {
	mon: "월요일",
	tue: "화요일",
	wed: "수요일",
	thur: "목요일",
	fri: "금요일",
	sat: "토요일",
	sun: "일요일",
} as const


export default function ClassDaySelectInput({defaultV}: {defaultV: ClassDayItemsType}) {
	const { getIndexof, updateSelect } = useDaySelect();
	const { control} = useFormContext<StudentData>()
	const id = getIndexof(defaultV)

	return <Controller control={control} defaultValue={defaultV.day} name={`classDays.${id}.day`} 
	render={({field: {onChange }}) => (
	<div>
		<Select defaultValue={defaultV.day} onValueChange={(s) => { onChange(s); updateSelect({id: defaultV.id, day: s as DayType }); }} >
			<SelectTrigger className=" bg-background  border-1 hover:border-2 border-zinc-400 ">
				<SelectValue placeholder="등원일 선택" />
			</SelectTrigger>
			<SelectContent>
				{week.map((d)=> <SelectItem key={d} value={d}>{koreanWeek[d]}</SelectItem>)}
			</SelectContent>
	</Select>
	</div>
	)}
	/>

}
