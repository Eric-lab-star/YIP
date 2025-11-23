"use client";

import { container, label } from "@/app/lib/tv/forms/FormStyles";
import { Plus } from "lucide-react";
import { useClassDays } from "@/app/stores/classDayStore";
import ClassDaySelect from "./ClassDaySelect";
import { tv } from "tailwind-variants";


/**
* ClassDaySelect component wrapper
*/
export default function ClassDays() {
	const {addDay, days} = useClassDays((state) => state);
	return (
		<div className={container({className: "my-3"})}>
			<div className={label()}>등원일</div>
			<div className="flex space-y-3 flex-col w-full">
					{ days.map((d) => <ClassDaySelect id={d} key={d}/>) }
			</div>
			<div className={button()} onClick={()=> addDay()}><Plus className="text-amber-400" /> </div>
		</div>
	)
}

const button = tv({
	base: "p-2  hover:bg-amber-300 flex justify-center items-center bg-amber-200 rounded-xl" 
})
