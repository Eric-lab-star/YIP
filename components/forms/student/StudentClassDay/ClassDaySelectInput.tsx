import { Day } from "@/types";

import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem, } from "@/components/ui/select"
import { DaySelectable } from "@/app/stores/classDayStore";


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


export default function ClassDaySelectInput({handleDay, defaultD}: {defaultD: DaySelectable; handleDay: (d: Day) => void}) {
	return <div>
		<Select onValueChange={handleDay} defaultValue={defaultD}>
			<SelectTrigger className=" bg-background  border-1 hover:border-2 border-zinc-400 ">
				<SelectValue placeholder="등원일 선택" />
			</SelectTrigger>
			<SelectContent>
				{week.map((d)=> <SelectItem key={d} value={d}>{koreanWeek[d]}</SelectItem>)}
			</SelectContent>
	</Select>
	</div>
}
