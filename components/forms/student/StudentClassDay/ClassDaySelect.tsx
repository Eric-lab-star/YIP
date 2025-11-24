
import { classDay, errorMessage } from "@/app/lib/tv/forms/FormStyles"
import { useClassDays } from "@/app/stores/classDayStore"
import { Day, StudentData } from "@/types";
import { Trash2 } from "lucide-react"
import {  useState } from "react"
import ClassDaySelectInput from "./ClassDaySelectInput";
import ClassTimeInput from "./ClassTimeInput";
import { useFormContext } from "react-hook-form";

interface IClassDaySelectProp {
	id: number
}

export default function ClassDaySelect({ id }: IClassDaySelectProp) {
	const { unregister, formState: { errors: { classDays: classDaysError } } } = useFormContext<StudentData>()
	const deleteClassDay = useClassDays( state => state.deleteDay );
	const [ day, setDay ] = useState<Day | undefined>(undefined);
	const handleDay = ( d: Day ) => {
		if (day) {
			unregister( `classDays.${day}` )
		}
		setDay( d )
	}
	console.log(classDaysError)

	const handleDelete = ( ) => {
		deleteClassDay( id );
		if ( day ) {
			unregister(`classDays.${day}`);
		}
	}
	return (
		<div className={ "w-full px-3" }>
			<div className={classDay( )}>
			<div className={ "flex justify-center items-center space-x-3" }>
				<div onClick={( ) => handleDelete()} className="bg-amber-200 p-2 hover:bg-amber-400 rounded-lg">
				<Trash2 className="text-red-800"/>
				</div>
				<ClassDaySelectInput handleDay={handleDay}  />
			</div>
				{ day && <>
				<div className="flex space-x-2 items-center">
					<ClassTimeInput d={day} label={"start"} />
					<div className="text-2xl"> ~ </div>
					<ClassTimeInput d={day} label={"end"}/>
				</div>
				</>
				}
			</div>
			{classDaysError && <div className={ errorMessage( ) }> 등원일을 선택하세요 </div>}
			{ day && classDaysError && classDaysError[day] && <div className={ errorMessage( ) }> { classDaysError[day].start?.h?.message } </div> }
			{ day && classDaysError && classDaysError[day] && <div className={ errorMessage( ) }> { classDaysError[day].start?.m?.message } </div> }
			{ day && classDaysError && classDaysError[day] && <div className={ errorMessage( ) }> { classDaysError[day].end?.h?.message } </div> }
			{ day && classDaysError && classDaysError[day] && <div className={ errorMessage( ) }> { classDaysError[day].end?.m?.message } </div> }
		</div>
	)
}
