import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2client } from "../r2";

/** Upload function upload r2 image key and blur data url to mongodb
	*
	**/
export async function upload() {
	const command = new ListObjectsV2Command({
		Bucket: process.env.R2_BUCKET,
		Prefix: "smartFactoryIntro/"
	})

	const {Contents} = await r2client.send(command)
	console.log(Contents)
}
