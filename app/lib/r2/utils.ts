import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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

interface postUrl {
	Key: string,
	Body: any,
	ContentType: string
}

export async function r2PostURL({
	Key, Body, ContentType,
}: postUrl){
	const command = new PutObjectCommand({
		Bucket: process.env.R2_BUCKET!,
		Key,
		Body,
		ContentType
	})
	await r2client.send(command)
}

export const IMAGE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://r2.kimkyungsub.com"
    : "https://pub-4507544ab1a54f5a999f046097091e6c.r2.dev"

	
