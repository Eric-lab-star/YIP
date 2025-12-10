"use client";

import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { useClassDays } from "@/app/stores/classDayStore";
import ClassDaySelect from "./ClassDaySelect";


/**
* ClassDaySelect component wrapper
*/
export default function ClassDays() {
	const { addDay, days } = useClassDays();


	const {button} = input();
	return (
		<div className={container({className: "my-3", layout: "classDay"})}>
			<div className={label()}>등원일</div>
			<div className="lg:col-span-4 space-y-3">
				<div className="flex space-y-3 flex-col w-full">
						{ days.map((d) => <ClassDaySelect id={d} key={d}/>) }
				</div>
				<div className={button({className: "flex justify-center items-center"})} onClick={()=> addDay()}>
					<div className=" pr-3">등원일 추가</div>
				</div>
			</div>
		</div>
	)
}

