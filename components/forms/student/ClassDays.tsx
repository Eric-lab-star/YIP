"use client";

import { container, label } from "@/app/lib/tv/forms/FormStyles";
import Day from "./Day";

const days = [
	"mon",
	"tues",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const;

export default function ClassDays() {
	return (
		<div className={container({className: "my-3"})}>
			<div className={label()}>등원일</div>
			<div className="flex justify-between">{
				days.map((d)=> <Day day={d} key={d}/>)}
			</div>
		</div>
	)
}
