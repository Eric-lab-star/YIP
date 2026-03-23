
export default function Divider({className =""}:{className?: string}) {
	return (
		<div className={`h-4 w-full border-b-2 border-b-zinc-500 border-dashed ${className}`} />
	)
}
