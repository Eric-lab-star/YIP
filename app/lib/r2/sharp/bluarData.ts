import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2client } from "../client";
import sharp from "sharp";

/** imageMetsadata function 
* uses sharp library to get meta data from r2 
	* 
	*/
export async function imageMetadata(key: string) {
	
	const command = new GetObjectCommand({
		Bucket: process.env.R2_BUCKET!,
		Key: key
	})
	const {Body} =  await r2client.send(command)

	if (!Body) throw new Error("r2 client command error");

	const arrayBuffer = await Body.transformToByteArray()
	
	const image = sharp(Buffer.from(arrayBuffer));

	const {width, height}= await image.metadata();
	const tinyImage = await image.resize(10, 10, {fit: "inside"}).toBuffer();
	const base64 = tinyImage.toString("base64")
	const blurDataURL= `data:image/*;base64,${base64}`
	return {
		key,
		blurDataURL,
		width,
		height,
	};
}
