import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2client } from "../r2/client";
import { getDB } from "../db";
import { imageMetadata } from "../r2/sharp/bluarData";

/** Upload function create collection of image metadata to mongodb
	* pdf format is not allowed.
	**/
export async function create() {
	const command = new ListObjectsV2Command({
		Bucket: process.env.R2_BUCKET,
		Prefix: "smartFactoryIntro/"
	})

	const {Contents} = await r2client.send(command)

	if (!Contents) throw new Error("r2 client command error");

	const db = await getDB();
	const coll = await db.createCollection("smartFactoryIntro")
	
	const docs = [];

	for (let i = 0; i < Contents.length; i++) {
		const {key, dataUrl, width, height} = await imageMetadata(Contents[i].Key!)
		const doc = {
			key,
			blurDataURL: dataUrl,
			width,
			height,
		}
		docs.push(doc)
	}
	const {insertedCount} = await coll.insertMany(docs) 
	console.log(`inserted ${insertedCount} items`);
}

export async function read() {
	const db = await getDB();	
	const coll = db.collection("smartFactoryIntro")
	const docs = await coll.find({}).toArray();
	return Response.json(docs)

}
