import { inputtv } from "@/app/lib/tv/forms/FormStyles";
import { StudentData, StudentDataRegister } from "@/types";
import { useFormContext, UseFormRegister, UseFormReturn } from "react-hook-form";

export default function StudentNameInput() {
	const ctx = useFormContext<StudentData>();
	return (
		<div className={inputtv({size: "r"})}>
			<label>이름</label>
			<input {...ctx.register("name")} />
		</div>

	)
}
