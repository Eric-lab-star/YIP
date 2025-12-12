'use client';
import { classDay, errorMessage } from "@/app/lib/tv/forms/FormStyles"
import { DaySelectable, useDaySelect } from "@/app/stores/classDayStore"
import { Day, StudentData } from "@/types";
import { Trash2 } from "lucide-react"
import { useState } from "react"
import ClassDaySelectInput from "./ClassDaySelectInput";
import ClassTimeInput from "./ClassTimeInput";
import { useFormContext } from "react-hook-form";


export default function ClassDaySelect({ day }: {day: DaySelectable}) {

	const { unregister, formState: { errors: { classDays: classDaysError }  }} = useFormContext<StudentData>()
	const {selectables, deleteSelect}= useDaySelect();
	const [ selectedDay, setDay ] = useState<DaySelectable>(day);


	const handleDay = ( d: Day ) => {
		if (selectedDay) {
			// unregister( `classDays.${selectedDay}` )
		}
		setDay( d )
	}

	const handleDelete = ( ) => {
		if ( selectedDay ) {
			deleteSelect( selectedDay );
		// unregister(`classDays.${selectedDay}`);
		}
	}


	return (
		<div className={ "w-full" }>
			<div className={classDay( )}>
				<div className={ "flex justify-center items-center lg:justify-start space-x-3 lg:col-span-2 " }>
					{ selectables.length > 1 && (
						<div onClick={( ) => handleDelete()} className={`bg-background p-2  border-zinc-500 hover:border-amber-300 border-b-2`}>
							<Trash2 className="text-red-800"/> 
						</div>
					) }
						<ClassDaySelectInput defaultD={day}  handleDay={handleDay}   />
					</div>
					{ selectedDay && <>
						<div className="flex space-x-2 items-center lg:col-span-2 ">
							<ClassTimeInput d={selectedDay} label={"start"} />
							<div className="text-2xl"> ~ </div>
							<ClassTimeInput d={selectedDay} label={"end"}/>
						</div>
					</> }
			<div className="min-w-30 lg:col-span-2 lg:col-start-6">
			</div>
			</div>
		</div>
	)
}

