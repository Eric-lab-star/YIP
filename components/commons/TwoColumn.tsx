export default function TwoColumn({children}: {children: React.ReactNode}) {
	return (
		<div className="md:grid md:grid-cols-2">
			{children}
		</div>
	) 

}
