'use client';
import { classDay } from "@/app/lib/tv/forms/FormStyles"
import { useDaySelect } from "@/app/stores/classDayStore"
import { StudentData } from "@/types";
import { Trash2 } from "lucide-react"
import ClassDaySelectInput from "./ClassDaySelectInput";
import { useFormContext } from "react-hook-form";
import { ClassDayItemsType, DayType } from "@/app/lib/zod/studentSchema";


export default function ClassDaySelect({ id }: {id: ClassDayItemsType["id"]}) {

	const { formState: { errors: { classDays: classDaysError }  }} = useFormContext<StudentData>()

	const {updateSelect, selectables, deleteSelect}= useDaySelect();


	const handleDay = ( d: DayType) => {
		updateSelect({id, day: d} )
	}

	const handleDelete = ( ) => {
		if (selectables.length <= 1 ) {
			return;
		}
		deleteSelect(id);
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
						<ClassDaySelectInput  handleDay={handleDay}   />
					</div>
						<div className="flex space-x-2 items-center lg:col-span-2 ">
							{/* <ClassTimeInput d={findSelect(id)!} label={"start"} /> */}
							<div className="text-2xl"> ~ </div>
							{/* <ClassTimeInput d={findSelect(id)!} label={"end"}/> */}
						</div>
			<div className="min-w-30 lg:col-span-2 lg:col-start-6">
			</div>
			</div>
		</div>
	)
}

