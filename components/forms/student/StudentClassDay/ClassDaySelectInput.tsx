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

const koreanWeek = {
	mon: "월요일",
	tue: "화요일",
	wed: "수요일",
	thur: "목요일",
	fri: "금요일",
	sat: "토요일",
	sun: "일요일",
} as const


export default function ClassDaySelectInput({handleDay}: {handleDay: (d: Day) => void}) {
	return <>
		<Select onValueChange={handleDay}>
			<SelectTrigger className="w-[130px]">
				<SelectValue placeholder="등원일 선택" />
			</SelectTrigger>
			<SelectContent>
			{week.map((d)=> <SelectItem key={d} value={d}>{koreanWeek[d]}</SelectItem>) }
			</SelectContent>
	</Select>
	</>
}
