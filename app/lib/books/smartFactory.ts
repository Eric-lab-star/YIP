import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2client } from "../r2";
import { getDB } from "../db";

/** Upload function upload r2 image key and blur data url to mongodb
	*
	**/
export async function upload() {
	const command = new ListObjectsV2Command({
		Bucket: process.env.R2_BUCKET,
		Prefix: "smartFactoryIntro/"
	})

	const {Contents} = await r2client.send(command)


	if (!Contents) return;

	const db = await getDB();
	const coll = await db.createCollection("smartFactoryIntro")
	
	const docs = [];

	for (let i = 0; i < Contents.length; i++) {
		const doc = {
			key: Contents[i].Key,
		}
		docs.push(doc)
	}
	const {insertedCount} = await coll.insertMany(docs) 
	console.log(insertedCount);
}
