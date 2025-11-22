import { classDay, input } from "@/app/lib/tv/forms/FormStyles"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem, } from "@/components/ui/select"
import { StudentData } from "@/types"
import { Trash2 } from "lucide-react"
import { ChangeEvent, MouseEvent, useState } from "react"
import { useFormContext } from "react-hook-form"


export default function Week({deleteClassDay, classDay}: {deleteClassDay: (v:number) => void; classDay: number[]}) {

	return (
		<div className="flex space-y-3 flex-col w-full  ">
				{ classDay.map((d, i) => <ClassDaySelect id={d} key={d} deleteClassDay={deleteClassDay}/>) }
		</div>
	)
}

function ClassDaySelect({id, deleteClassDay}: {id: number; deleteClassDay: (v:number) => void}) {
	const [day, setDay] = useState<typeof days[number]>(days[0]);
	const handleDay = (d: typeof days[number]) => {
		setDay(d)
	}


	return (
		<div className={classDay()}>
			<div className="capitalize">
				<Selector handleDay={handleDay}  />
			</div>
			<div className="flex space-x-2 items-center">
				<TimeInput d={day} label={"start"} />
				<div className="text-2xl"> ~ </div>
				<TimeInput d={day} label={"end"}/>
			</div>
			<div onClick={() => deleteClassDay(id)} className="bg-amber-200 p-2 hover:bg-amber-400 rounded-lg"><Trash2 className="text-red-800"/></div>
		</div>
	)
}

const days = [
	"mon",
	"tue",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const

function Selector({handleDay}: {handleDay: (d: typeof days[number]) => void}) {
	return <>
		<Select onValueChange={handleDay}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="요일 변경" />
			</SelectTrigger>
			<SelectContent>
			{days.map((d)=> <SelectItem key={d} value={d}>{d.toUpperCase()}</SelectItem>) }
			</SelectContent>
	</Select>
	</>
}




function TimeInput({d, label}: {d:typeof days[number]; label: "start"|"end"}) {

	const {register, setFocus } = useFormContext<StudentData>()


	const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
		e.stopPropagation() 
	}

	const handleLableM = () => {
		setFocus(`classDays.${d}.${label}.m`)
	}

	const handleLableH = () => {
		setFocus(`classDays.${d}.${label}.h`)
	}

	const handleChange =(e: ChangeEvent<HTMLInputElement> ) => {
		const target = e.currentTarget;
		if (target.value.length > 2) {
			target.value = target.value.slice(0, 2);
		}
	}



	const {time}  = input()
	return <>
	
	<div className="relative">
		<input  {...register(`classDays.${d}.${label}.h`, { max:24, min:0, onChange:(e) => handleChange(e)})} className={time()} onClick={(e) =>  handleInputClick(e)} type="number"/>
		<div onClick={handleLableH} className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">h</div>
	</div>
	
	<div className="relative">
		<input max={60} min={0} {...register(`classDays.${d}.${label}.m`, {max: 60, min: 0, onChange:(e) => handleChange(e) })} className={time()} onClick={(e) =>  handleInputClick(e)} type="number"/>
		<div onClick={handleLableM}  className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">m</div>
	</div>
	</>
	
}

