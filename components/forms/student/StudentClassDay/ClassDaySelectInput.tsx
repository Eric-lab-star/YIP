import { Day } from "@/types";

import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem, } from "@/components/ui/select"


const week = [
	"mon",
	"tue",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const


export default function ClassDaySelectInput({handleDay}: {handleDay: (d: Day) => void}) {
	return <>
		<Select onValueChange={handleDay}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="요일 변경" />
			</SelectTrigger>
			<SelectContent>
			{week.map((d)=> <SelectItem key={d} value={d}>{d.toUpperCase()}</SelectItem>) }
			</SelectContent>
	</Select>
	</>
}
