import { StudentData } from "@/types"
import { useFormContext } from "react-hook-form"

export default function Day({day}: {day: string}) {
	const {register} = useFormContext<StudentData>()
	return <div> {day}
	<input type="checkbox" {...register("classDays")} />
	</div>
}
