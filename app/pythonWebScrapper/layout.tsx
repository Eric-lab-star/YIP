import Image from "next/image"

export default async function Layout({children}:{children: React.ReactNode}) {
	return (
		<div>
			<Banner />
			<div className="z-10 relative top-[-20]">
				{children}
			</div>
		</div>
	)
	
}


function Banner() {
	return <div className="h-40 w-full bg-zinc-500 z-0 relative">
		{/* <Image alt="python banner" width={} height={} /> */}
	</div>
	
}
