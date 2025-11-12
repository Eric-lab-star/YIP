import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { useFormContext } from "react-hook-form";

export default function StudentSchool() {
	const {base} = input({width:"f"});
	const { register } = useFormContext<StudentData>()
	return <div className={container()}>
		<label className={label()}>학교</label>
		<input placeholder="대한초등학교" {...register("school")} className={base()}/>
	</div>
}
