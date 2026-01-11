
import { r2client } from "@/app/lib/r2/client";
import { GetObjectCommand } from "@aws-sdk/client-s3";

/** Get image from r2 using r2 key
	*/
export async function GET(
	_req: Request,
	{params}: {params: Promise<{Keys: string[]}>}
) {
	const {Keys} = await params

	const command = new GetObjectCommand({
		Bucket: process.env.R2_BUCKET!,
		Key: Keys.join("/")
	})


	const {Body, ContentType } =  await r2client.send(command)


	return new Response(
		Body as ReadableStream,
		{ headers: {
			"Content-Type": ContentType || "image/*",
			"Cache-Control": "s-maxage=86400, stale-while-revalidate",
		}}
	);
}

