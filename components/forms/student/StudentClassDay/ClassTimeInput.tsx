"use client";
import { input } from "@/app/lib/tv/forms/FormStyles";
import { ClassDayItemsType } from "@/app/lib/zod/studentSchema";
import { useDaySelect } from "@/app/stores/classDayStore";
import { StudentData } from "@/types"
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";

export default function ClassTimeInput({d, label}: {d:ClassDayItemsType; label: "start"|"end"}) {

	const {register, setFocus, formState:{errors: {classDays: classDaysErr}}, clearErrors } = useFormContext<StudentData>()
	const { getIndexof } = useDaySelect();
	const [index, setIndex] = useState(getIndexof(d))
	useEffect(()=> {
		setIndex(getIndexof(d))
	},[])



	const handleLableM = () => {
		setFocus(`classDays.${index}.${label}.m`)
	}

	const handleLableH = () => {
		setFocus(`classDays.${index}.${label}.h`)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const invalidKeys = ["e", "E", "+", "-"];
		if ( invalidKeys.includes( e.key ) ) {
			e.preventDefault( )
		}
	}

	const handleChange =(e: ChangeEvent<HTMLInputElement> ) => {
		const target = e.currentTarget;
		const name = target.name;
		const schema = z.coerce.number<number>()
		const parsed = schema.safeParse(target.value.slice(-1))

		if( classDaysErr && classDaysErr[index] && classDaysErr[index].type == "time") {
			clearErrors("classDays")
		} 

		if ( parsed.error ) {
			target.value = target.value.slice(0, -1)
		};

		if (target.value.length >= 2) {
			target.value = target.value.slice(0, 2);
			switch ( name ) {
				case `classDays.${index}.start.h`:
					setFocus( `classDays.${index}.start.m` )
					break;
				case `classDays.${index}.start.m`:
					setFocus( `classDays.${index}.end.h` )
					break;
				case `classDays.${index}.end.h`:
					setFocus( `classDays.${index}.end.m` )
					break;
			}
		}
	}

	const { time }  = input()
	return <>
	<div className="relative">
		<input onKeyDown={ ( e ) => handleKeyDown( e )}  {...register(`classDays.${index}.${label}.h`, { max:24, min:0, onChange:(e) => handleChange(e)})} className={time()} type="number"/>
		<div onClick={handleLableH} className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">h</div>
	</div>
	
	<div className="relative">
		<input onKeyDown={ ( e ) => handleKeyDown( e )}  {...register(`classDays.${index}.${label}.m`, {max: 60, min: 0, onChange:(e) => handleChange(e) })} className={time()} type="number"/>
		<div onClick={handleLableM}  className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">m</div>
	</div>
	</>
}

