import { input } from "@/app/lib/tv/forms/FormStyles";
import { Day, StudentData } from "@/types"
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";

export default function ClassTimeInput({d, label}: {d:Day; label: "start"|"end"}) {

	const { register, setFocus, formState:{errors: {classDays: classDaysErr}}, clearErrors } = useFormContext<StudentData>()

	const handleLableM = () => {
		setFocus(`classDays.${d}.${label}.m`)
	}

	const handleLableH = () => {
		setFocus(`classDays.${d}.${label}.h`)
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

		if( classDaysErr && classDaysErr[d] && classDaysErr[d].type == "time") {
			clearErrors("classDays")
		} 

		if ( parsed.error ) {
			target.value = target.value.slice(0, -1)
		};

		if (target.value.length >= 2) {
			target.value = target.value.slice(0, 2);
			switch ( name ) {
				case `classDays.${d}.start.h`:
					setFocus( `classDays.${d}.start.m` )
					break;
				case `classDays.${d}.start.m`:
					setFocus( `classDays.${d}.end.h` )
					break;
				case `classDays.${d}.end.h`:
					setFocus( `classDays.${d}.end.m` )
					break;
			}
		}
	}

	const { time }  = input()
	return <>
	<div className="relative">
		<input onKeyDown={ ( e ) => handleKeyDown( e )}  {...register(`classDays.${d}.${label}.h`, { max:24, min:0, onChange:(e) => handleChange(e)})} className={time()} type="number"/>
		<div onClick={handleLableH} className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">h</div>
	</div>
	
	<div className="relative">
		<input onKeyDown={ ( e ) => handleKeyDown( e )}  {...register(`classDays.${d}.${label}.m`, {max: 60, min: 0, onChange:(e) => handleChange(e) })} className={time()} type="number"/>
		<div onClick={handleLableM}  className="absolute inset-y-0 h-10 text-zinc-600 flex justify-center items-center right-3">m</div>
	</div>
	</>
	
}

