"use client";

import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { Plus } from "lucide-react";
import { useClassDays } from "@/app/stores/classDayStore";
import ClassDaySelect from "./ClassDaySelect";
import { tv } from "tailwind-variants";


/**
* ClassDaySelect component wrapper
*/
export default function ClassDays() {
	const { addDay, days } = useClassDays();
	const {button} = input({width: "f"});
	return (
		<div className={container({className: "my-3"})}>
			<div className={label()}>등원일</div>
			<div className="flex space-y-3 flex-col w-full">
					{ days.map((d) => <ClassDaySelect id={d} key={d}/>) }
			</div>
			<div className={button()} onClick={()=> addDay()}>
				<div className="pr-3">등원일 추가</div>
				<Plus /> 
			</div>
		</div>
	)
}

