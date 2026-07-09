export default function Loading() {
	const ink = "#263D5B"
	const paper = "#FFFDF7"
	return (
		<div
			className="min-h-screen flex items-center justify-center px-5 py-12"
			style={{
				backgroundColor: paper,
				backgroundImage: `radial-gradient(${ink}14 1.4px, transparent 1.4px)`,
				backgroundSize: "24px 24px",
			}}
		>
			<div
				className="w-full max-w-md bg-white p-8 sm:p-10 animate-pulse"
				style={{
					border: `2.5px solid ${ink}`,
					borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
					rotate: "-1deg",
				}}
			>
				<div className="flex flex-col items-center mb-8">
					<div className="w-20 h-20 rounded-full bg-zinc-200" />
					<div className="mt-4 w-28 h-8 rounded bg-zinc-200" />
					<div className="mt-5 w-64 h-5 rounded bg-zinc-200" />
				</div>
				<div className="space-y-6">
					<div className="w-full h-14 rounded-lg bg-zinc-200" />
					<div className="w-full h-14 rounded-lg bg-zinc-200" />
					<div className="w-full h-14 rounded-lg bg-zinc-300" />
				</div>
			</div>
		</div>
	)
}
