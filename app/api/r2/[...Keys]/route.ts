
import { r2client } from "@/app/lib/r2";
import { delay } from "@/app/lib/utils/wait";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
	req: Request,
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

