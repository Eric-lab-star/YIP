import { r2client } from "@/app/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";




export async function GET(
	req: Request,
	{params}: {params: Promise<{Key: string}>}
) {
	const {Key} = await params
	const command = new GetObjectCommand({
		Bucket: process.env.R2_BUCKET!,
		Key
	})
	const {Body, ContentType } =  await r2client.send(command)
	return new Response(
		Body as ReadableStream,
		{ headers: {
			"Content-Type": ContentType || "image/*"
		}}
	);
}

