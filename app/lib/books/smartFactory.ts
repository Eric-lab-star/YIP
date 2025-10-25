import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2client } from "../r2/client";
import { getDB, initCollection } from "../db";
import { imageMetadata } from "../r2/sharp/bluarData";

/** Upload function create collection of image metadata to mongodb
	* pdf format is not allowed. collection contains a documents of 
	* key, blurdata, width, and height 
	*
	**/
export async function createSmartFactoryCollection() {
	const command = new ListObjectsV2Command({
		Bucket: process.env.R2_BUCKET,
		Prefix: "smartFactoryIntro/"
	})

	const {Contents} = await r2client.send(command)

	if (!Contents) throw new Error("r2 client command error");

	const db = await getDB();
	const coll = await initCollection(db, "smartFactoryIntro")
	const docs = await Promise.all(
		Contents.map(async (item) => {
			return await imageMetadata(item.Key!)
		})
	)
	const {insertedCount} = await coll.insertMany(docs) 
	console.log(`inserted ${insertedCount} items`);
}



export async function read() {
	const db = await getDB();	
	const coll = db.collection("smartFactoryIntro")
	const docs = await coll.find().toArray();
	return Response.json(docs)

}
