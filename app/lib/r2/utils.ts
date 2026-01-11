import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2client } from "./client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const HOUR = 3600

export async function r2GetSignedURL(key: string) {
	const command = new GetObjectCommand({
		Bucket: process.env.R2_BUCKET!,
		Key: key
	})
	const url = await getSignedUrl(r2client, command, { expiresIn: HOUR * 4})
	return url

}
