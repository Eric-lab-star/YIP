"use client";

import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { useDaySelect} from "@/app/stores/classDayStore";
import ClassDaySelect from "./ClassDaySelect";
import { v4 as uuidv4} from "uuid";
import { useFormContext } from "react-hook-form";
import { StudentData } from "@/types";
import { useEffect } from "react";

/**
* ClassDaySelect component wrapper
*/
export default function ClassDays() {
	const { selectables, addSelect } = useDaySelect();
	const { register } = useFormContext<StudentData>()
	const { button } = input();

	useEffect(()=> {
		register(`classDays.0.id`, {value: selectables[0].id})
	},[])


	const handleAdd = () => {
		const id = uuidv4()
		addSelect(id)
		register(`classDays.${selectables.length}.id`, {value: id})
	}

	console.log(selectables, "selectable")

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
				<div className={button({className: "flex justify-center items-center"})} onClick={handleAdd}>
					<div className=" pr-3">등원일 추가</div>
				</div>
			</div>
		</div>
	)
}

