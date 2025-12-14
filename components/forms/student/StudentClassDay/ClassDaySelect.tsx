'use client';
import { classDay, errorMessage } from "@/app/lib/tv/forms/FormStyles"
import { useDaySelect } from "@/app/stores/classDayStore"
import { Trash2 } from "lucide-react"
import ClassDaySelectInput from "./ClassDaySelectInput";
import { ClassDayItemsType } from "@/app/lib/zod/studentSchema";
import ClassTimeInput from "./ClassTimeInput";
import { useFormContext } from "react-hook-form";
import { StudentData } from "@/types";


export default function ClassDaySelect({value}: {value: ClassDayItemsType}) {

	const { selectables, deleteSelect, getIndexof } = useDaySelect();
	const {formState:{errors}, unregister } = useFormContext<StudentData>()

	const handleTrash = ( ) => {
		if (selectables.length <= 1 ) {
			return;
		}
		deleteSelect(value.id);
		unregister(`classDays.${getIndexof(value)}`);
	}

	return (
		<div className={ "w-full" } >
			<div className={classDay( )}>
				<div className={ "flex justify-center items-center lg:justify-start space-x-3 lg:col-span-2 " }>
					{selectables.length > 1 && (
						<div onClick={( ) => handleTrash()} className={`bg-background p-2  border-zinc-500 hover:border-amber-300 border-b-2`}>
							<Trash2 className="text-red-800"/> 
						</div>
					)}
						<ClassDaySelectInput  key={value.id} defaultV={value}   />
					</div>
						<div className="flex space-x-2 items-center lg:col-span-2 ">
							<ClassTimeInput d={value} label={"start"} />
							<div className="text-2xl"> ~ </div>
							<ClassTimeInput d={value} label={"end"}/>
						</div>
			
			<div className="min-w-30 lg:col-span-2 lg:col-start-6">
			{
				errors && errors.classDays && errors.classDays[getIndexof(value)] && <div className={errorMessage()}>{errors.classDays[getIndexof(value)]?.message}</div>
			}
			</div>
			</div>
		</div>
	)
}

