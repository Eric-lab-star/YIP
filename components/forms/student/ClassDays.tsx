"use client";

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
		<div>
			<div>등원일</div>
			<div className="w-150 grid grid-cols-7">
			{
				days.map((d)=> <Day day={d} key={d}/>)
			}
			</div>
		</div>
	)
}
