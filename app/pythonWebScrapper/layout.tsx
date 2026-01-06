import Image from "next/image"
import { r2GetSignedURL } from "../lib/r2/utils"
import { imageMetadata } from "../lib/r2/sharp/bluarData"

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


async function Banner() {
	const pythonBanner = await r2GetSignedURL("pythonBanner.png")
	const meta = await imageMetadata("pythonBanner.png")
	return <div className="overflow-hidden max-h-80 w-full bg-zinc-500 z-0 relative">
		<Image className="h-80" placeholder="blur" blurDataURL={meta.blurDataURL} src={pythonBanner} alt="python banner" width={meta.width} height={meta.height} />
	</div>
	
}
