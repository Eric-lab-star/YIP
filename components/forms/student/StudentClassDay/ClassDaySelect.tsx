
import { classDay } from "@/app/lib/tv/forms/FormStyles"
import { useClassDays } from "@/app/stores/classDayStore"
import { Day } from "@/types";
import { Trash2 } from "lucide-react"
import {  useState } from "react"
import ClassDaySelectInput from "./ClassDaySelectInput";
import ClassTimeInput from "./ClassTimeInput";

export default function ClassDaySelect({id}: {id: number}) {
	const deleteClassDay = useClassDays(state => state.deleteDay);
	const [day, setDay] = useState<Day>("mon");
	const handleDay = (d: Day) => {
		setDay(d)
	}

	return (
		<div className={classDay()}>
			<div className="capitalize">
				<ClassDaySelectInput handleDay={handleDay}  />
			</div>
			<div className="flex space-x-2 items-center">
				<ClassTimeInput d={day} label={"start"} />
				<div className="text-2xl"> ~ </div>
				<ClassTimeInput d={day} label={"end"}/>
			</div>
			<div onClick={() => deleteClassDay(id)} className="bg-amber-200 p-2 hover:bg-amber-400 rounded-lg"><Trash2 className="text-red-800"/></div>
		</div>
	)
}
