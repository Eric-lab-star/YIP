import { submit } from "@/app/lib/tv/forms/FormStyles";

export default function SubmitBtn({name}: {name: string}) {
	return (
		<div className="px-3">
			<button className={submit()}>{name}</button>
		</div>
	)
}
