"use client";

import { container, label } from "@/app/lib/tv/forms/FormStyles";
import { useState } from "react";
import Week from "./Week";
import { Plus } from "lucide-react";




export default function ClassDays() {
	const [classDay, setClassDay] = useState([Date.now()]);
	const deleteClassDay = (value:number ) => {
		const tmp = classDay.filter((v) => v != value)
		setClassDay(tmp)
	}
	const hanldeClick = (e: React.MouseEvent<HTMLDivElement>) => {
		setClassDay([...classDay, (Date.now())])
	}
	return (
		<div className={container({className: "my-3"})}>
			<div className={label()}>등원일</div>
			<Week deleteClassDay={deleteClassDay} classDay={classDay}/>
			<div className="p-2  hover:bg-amber-300 flex justify-center items-center bg-amber-200 rounded-xl" onClick={(e)=> hanldeClick(e)}><Plus className="text-amber-400" /> </div>
		</div>
	)
}
