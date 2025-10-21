import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2client } from "../../r2";
import sharp from "sharp";

export async function blurDataURL(key: string) {
	
	const command = new GetObjectCommand({
		Bucket: process.env.R2_BUCKET!,
		Key: key
	})


	const {Body, ContentType } =  await r2client.send(command)

	const arrayBuffer = await new Response( Body as any,).arrayBuffer();
	
	const buffer = Buffer.from(arrayBuffer);
	const tinyImage = await sharp(buffer).resize(10, 10, {fit: "inside"}).toBuffer();
	const base64 = tinyImage.toString("base64")
	const dataUrl = `data:image/*;base64,${base64}`
	
}
