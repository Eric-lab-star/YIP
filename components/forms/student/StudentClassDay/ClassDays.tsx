"use client";

import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { useDaySelect} from "@/app/stores/classDayStore";
import ClassDaySelect from "./ClassDaySelect";
import { useFormContext } from "react-hook-form";
import { StudentData } from "@/types";
import { v4 as uuidv4} from "uuid";

/**
* ClassDaySelect component wrapper
*/
export default function ClassDays() {
	const { selectables, addSelect, initSelect } = useDaySelect();
	const { watch } = useFormContext<StudentData>()

	console.log(selectables)

	const { button } = input();

	return (
		<div className={container({className: "my-3", layout: "classDay"})}>
			<div className={label()}>등원일</div>
			<div className="lg:col-span-4 space-y-3">
				<div className="flex space-y-3 flex-col w-full">
						{selectables.map(
							(v, i) => {
								return <ClassDaySelect id={v.id} key={i}/>
							})}
				</div>
				<div className={button({className: "flex justify-center items-center"})} onClick={()=> addSelect(uuidv4())}>
					<div className=" pr-3">등원일 추가</div>
				</div>
			</div>
		</div>
	)
}

