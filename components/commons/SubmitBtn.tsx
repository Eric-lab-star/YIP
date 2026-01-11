import { input } from "@/app/lib/tv/forms/FormStyles";

export default function SubmitBtn({isSubmitting, name}: {isSubmitting: boolean,name: string}) {
	const {button} = input({width: "f"})
	return (
		<div className="px-3">
			<button disabled={isSubmitting} className={button({diabled: isSubmitting})}>{isSubmitting ? "기다려주세요": name}</button>
		</div>
	)
}
