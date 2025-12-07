import { input, submit } from "@/app/lib/tv/forms/FormStyles";

export default function SubmitBtn({name}: {name: string}) {
	const {button} = input({width: "f"})
	return (
		<div className="px-3">
			<button className={button()}>{name}</button>
		</div>
	)
}
