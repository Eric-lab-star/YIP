import { title } from "@/app/lib/tv/commons";

export default function Title({name}:{name: string}) {
	return (
		<div className={title()}>{name}</div>
	)
}
