
import { imageMetadata } from "@/app/lib/r2/sharp/bluarData"
import { r2GetSignedURL } from "@/app/lib/r2/utils"
import Image from "next/image"

export default async function Banner({id}:{id:string}) {
	const pythonBanner = await r2GetSignedURL(id)
	const meta = await imageMetadata(id)
	return <div className="overflow-hidden max-h-80 w-full bg-zinc-500 z-0 relative">
		<Image className="h-80" placeholder="blur" blurDataURL={meta.blurDataURL} src={pythonBanner} alt="python banner" width={meta.width} height={meta.height} />
	</div>
	
}
