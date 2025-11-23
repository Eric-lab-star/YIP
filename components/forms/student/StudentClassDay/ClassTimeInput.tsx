import { input } from "@/app/lib/tv/forms/FormStyles";
import { Day, StudentData } from "@/types"
import { ChangeEvent, MouseEvent } from "react";
import { useFormContext } from "react-hook-form";

export default function ClassTimeInput({d, label}: {d:Day; label: "start"|"end"}) {

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

