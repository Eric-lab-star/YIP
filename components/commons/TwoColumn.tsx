export default function TwoColumn({pb=true, children}: {pb?: boolean, children: React.ReactNode}) {
	return (
		<div className={`${pb && "border-b border-dashed border-b-zinc-400"}  py-5 md:grid md:grid-cols-2 `}>
			{children}
		</div>
	) 

}
