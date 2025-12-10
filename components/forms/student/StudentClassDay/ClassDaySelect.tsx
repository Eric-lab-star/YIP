'use client';
import { classDay, errorMessage } from "@/app/lib/tv/forms/FormStyles"
import { useClassDays } from "@/app/stores/classDayStore"
import { Day, StudentData } from "@/types";
import { Trash2 } from "lucide-react"
import {  useEffect, useState } from "react"
import ClassDaySelectInput from "./ClassDaySelectInput";
import ClassTimeInput from "./ClassTimeInput";
import { useFormContext } from "react-hook-form";

interface IClassDaySelectProp {
	id: number
}

export default function ClassDaySelect({ id }: IClassDaySelectProp) {

	const { unregister, formState: { errors: { classDays: classDaysError }, defaultValues  } } = useFormContext<StudentData>()
	
	const deleteClassDay = useClassDays( state => state.deleteDay );
	const days = useClassDays(state => state.days);
	const [ selectedDay, setDay ] = useState<Day | undefined>(undefined);
	const handleDay = ( d: Day ) => {
		if (selectedDay) {
			unregister( `classDays.${selectedDay}` )
		}
		setDay( d )
	}

	const handleDelete = ( ) => {
		deleteClassDay( id );
		if ( selectedDay ) {
			unregister(`classDays.${selectedDay}`);
		}
	}
	useEffect(() => {
	},[])


	return (
		<div className={ "w-full" }>
			<div className={classDay( )}>
				<div className={ "flex justify-center items-center lg:justify-start space-x-3 lg:col-span-2 " }>
					{ days.length > 1 && (
						<div onClick={( ) => handleDelete()} className={`bg-background p-2  border-zinc-500 hover:border-amber-300 border-b-2`}>
							<Trash2 className="text-red-800"/> 
						</div>
					) }
						<ClassDaySelectInput handleDay={handleDay}   />
					</div>
					{ selectedDay && <>
						<div className="flex space-x-2 items-center lg:col-span-2 ">
							<ClassTimeInput d={selectedDay} label={"start"} />
							<div className="text-2xl"> ~ </div>
							<ClassTimeInput d={selectedDay} label={"end"}/>
						</div>
					</>
					}

			<div className="min-w-30 lg:col-span-2 lg:col-start-6">
			{(classDaysError && classDaysError.type === "invalid_type") && <div className={ errorMessage( ) }> 등원일을 선택하세요 </div>}
			{ selectedDay && classDaysError && classDaysError[selectedDay] && <div className={ errorMessage( ) }> { classDaysError[selectedDay].message } </div> }
			{ selectedDay && classDaysError && classDaysError[selectedDay] && <div className={ errorMessage( ) }> { classDaysError[selectedDay].start?.h?.message } </div> }
			{ selectedDay && classDaysError && classDaysError[selectedDay] && <div className={ errorMessage( ) }> { classDaysError[selectedDay].start?.m?.message } </div> }
			{ selectedDay && classDaysError && classDaysError[selectedDay] && <div className={ errorMessage( ) }> { classDaysError[selectedDay].end?.h?.message } </div> }
			{ selectedDay && classDaysError && classDaysError[selectedDay] && <div className={ errorMessage( ) }> { classDaysError[selectedDay].end?.m?.message } </div> }
			</div>
			</div>
		</div>
	)
}

