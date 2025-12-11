"use client";

import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { useDaySelect} from "@/app/stores/classDayStore";
import ClassDaySelect from "./ClassDaySelect";
import { useFormContext } from "react-hook-form";
import { Day, StudentData } from "@/types";
import { useEffect } from "react";


/**
* ClassDaySelect component wrapper
*/
export default function ClassDays() {
	const { selectables, addSelect, initSelect } = useDaySelect();
	const { formState:{defaultValues} } = useFormContext<StudentData>()

	useEffect(() => {
		if (defaultValues?.classDays) {
			const df = Object.keys(defaultValues.classDays) as Day[]
			initSelect(df)
		}
	},[])

	const { button } = input();

	return (
		<div className={container({className: "my-3", layout: "classDay"})}>
			<div className={label()}>등원일</div>
			<div className="lg:col-span-4 space-y-3">
				<div className="flex space-y-3 flex-col w-full">
						{selectables.map(
							(v, i) => {
								return <ClassDaySelect day={v} key={i}/>
							})}
				</div>
				<div className={button({className: "flex justify-center items-center"})} onClick={()=> addSelect()}>
					<div className=" pr-3">등원일 추가</div>
				</div>
			</div>
		</div>
	)
}

