import { container, input, label } from "@/app/lib/tv/forms/FormStyles";

export default function StudentSchool() {
	const {base} = input({width:"s"});
	return <div className={container()}>
		<label className={label()}>학교</label>
		<input className={base()}/>
	</div>
}
