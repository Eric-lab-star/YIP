"use client";

import { container, label } from "@/app/lib/tv/forms/FormStyles";
import { useState } from "react";
import Week from "./Week";
import { Plus } from "lucide-react";
import { useClassDays } from "@/app/stores/classDayStore";




export default function ClassDays() {
	//const [classDay, setClassDay] = useState([Date.now()]);
	const addDay = useClassDays((state) => state.addDay);
	


	return (
		<div className={container({className: "my-3"})}>
			<div className={label()}>등원일</div>
			<Week />
			<div className="p-2  hover:bg-amber-300 flex justify-center items-center bg-amber-200 rounded-xl" onClick={()=> addDay()}><Plus className="text-amber-400" /> </div>
		</div>
	)
}
