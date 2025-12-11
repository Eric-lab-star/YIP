'use client';
import { classDay, errorMessage } from "@/app/lib/tv/forms/FormStyles"
import { useDaySelect } from "@/app/stores/classDayStore"
import { Day, StudentData } from "@/types";
import { Trash2 } from "lucide-react"
import {  useEffect, useState } from "react"
import ClassDaySelectInput from "./ClassDaySelectInput";
import ClassTimeInput from "./ClassTimeInput";
import { useFormContext } from "react-hook-form";

interface IClassDaySelectProp {
	day: Day 
}

export default function ClassDaySelect({ day }: IClassDaySelectProp) {

	const { unregister, formState: { defaultValues, errors: { classDays: classDaysError }  }} = useFormContext<StudentData>()
	
	const {selectables, deleteSelect}= useDaySelect();
	const [ selectedDay, setDay ] = useState<Day | undefined>(undefined);
	useEffect(()=> {
		if (defaultValues && defaultValues.classDays) {
			setDay(day)
		}
	},[])
	const handleDay = ( d: Day ) => {
		if (selectedDay) {
			unregister( `classDays.${selectedDay}` )
		}
		setDay( d )
	}

	const handleDelete = ( ) => {
		deleteSelect( day );
		if ( selectedDay ) {
			unregister(`classDays.${selectedDay}`);
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
						<ClassDaySelectInput defaultD={selectedDay}  handleDay={handleDay}   />
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

