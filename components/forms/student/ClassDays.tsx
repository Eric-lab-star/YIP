"use client";

import { container, label } from "@/app/lib/tv/forms/FormStyles";
import { useState } from "react";
import Week from "./Day";




export default function ClassDays() {
	const [classDay, setClassDay] = useState([Date.now()]);
	const hanldeClick = (e: React.MouseEvent<HTMLDivElement>) => {
		setClassDay([...classDay, (Date.now())])
	}
	return (
		<div className={container({className: "my-3"})}>
			<div className={label()}>등원일</div>
			<div onClick={(e)=> hanldeClick(e)}>add</div>
			<Week classDay={classDay}/>
		</div>
	)
}
