
import { imageMetadata } from "@/app/lib/r2/sharp/bluarData"
import { IMAGE_BASE_URL } from "@/app/lib/r2/utils"
import Image from "next/image"

export default async function Banner({id}:{id:string}) {
	const meta = await imageMetadata(id)

	return (
		<div className="overflow-hidden h-45 sm:h-45  w-full bg-zinc-400">
		<Image
			preload={true}
			className="h-45"
			placeholder="blur"
			blurDataURL={meta.blurDataURL} 
			src={`${IMAGE_BASE_URL}/${id}`}
			alt="python banner"
			width={meta.width} height={meta.height} />
	</div>
	)
	
}


