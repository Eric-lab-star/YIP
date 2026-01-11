"use client";
import { container, label,input } from "@/app/lib/tv/forms/FormStyles";


export default function() {
	const {base} = input();
	const n = new Date(Date.now());
	return <form>
		<div className={container()}>
			<label className={label()}>날짜</label>
			<input autoComplete="off" placeholder="" className={base({width: "f"})} type="text" />
		</div>
	</form>
}
