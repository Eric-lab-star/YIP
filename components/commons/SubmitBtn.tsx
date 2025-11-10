import { submit } from "@/app/lib/tv/forms/FormStyles";

export default function SubmitBtn() {
	return (
		<div className="px-3">
			<input className={submit()} type="submit" />
		</div>
	)
}
