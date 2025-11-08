import { inputtv } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { useFormContext } from "react-hook-form";

export default function StudentNameInput() {
	const ctx = useFormContext<StudentData>();
	return (
		<div className={inputtv({size: "r"})}>
			<label>이름</label>
			<input {...ctx.register("name")} />
		</div>

	)
}
