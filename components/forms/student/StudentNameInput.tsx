import { container, input, label } from "@/app/lib/tv/forms/FormStyles";
import { StudentData } from "@/types";
import { useFormContext } from "react-hook-form";

export default function StudentNameInput() {
	const ctx = useFormContext<StudentData>();
	const {base} = input();
	return (
		<div className={container()}>
			<label className={label()}>이름</label>
			<input placeholder="김경섭" className={base({width: "f"})} {...ctx.register("name")} />
		</div>

	)
}
