import { imageMetadata } from "@/app/lib/r2/sharp/bluarData";

/** Get 10x10 image url which can be used as bluarDataURL
	*/
export async function GET(
	_req: Request,
	{params}: {params: Promise<{keys: string[]}>}
) {
	const {keys} = await params
	const {blurDataURL} = await imageMetadata(keys.join("/"))	
	return Response.json({blurDataURL})
}

