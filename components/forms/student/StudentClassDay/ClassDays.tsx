"use client";

import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import ClassDaySelect from "./ClassDaySelect";
import { v4 as uuidv4} from "uuid";
import { useFormContext } from "react-hook-form";
import { StudentData } from "@/types";
import { useDaySelect } from "@/app/stores/classDayStore";
import { useEffect } from "react";

/**
* ClassDaySelect component wrapper
*/
export default function ClassDays() {
	const { register } = useFormContext<StudentData>()
	const { button } = input();
	const {selectables, addSelect} = useDaySelect();

	useEffect(()=>{
		if(selectables.length < 1){
			const id = uuidv4()
			register(`classDays.${selectables.length}.id`, {value: id})
			addSelect(id)
		}
	},[])

	const addClassDays = () => {
		const id = uuidv4()
		register(`classDays.${selectables.length}.id`, {value: id})
		addSelect(id)
	}


	return (
		<div className={container({className: "my-3", layout: "classDay"})}>
			<div className={label()}>등원일</div>
			<div className="lg:col-span-4 space-y-3">
				<div className="flex space-y-3 flex-col w-full">
						{selectables.map(
							(v, i) => {
								return <ClassDaySelect value={v}  key={i}/>
							})}
				</div>
				<div className={button({className: "flex justify-center items-center"})} onClick={addClassDays}>
					<div className=" pr-3">등원일 추가</div>
				</div>
			</div>
		</div>
	)
}

