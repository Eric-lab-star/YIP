"use client";

import { container, label } from "@/app/lib/tv/forms/FormStyles";
import Day from "./Day";


export default function ClassDays() {
	return (
		<div className={container({className: "my-3"})}>
			<div className={label()}>등원일</div>
			<Day />
		</div>
	)
}
