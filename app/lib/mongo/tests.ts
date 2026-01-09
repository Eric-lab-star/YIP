import { testFormType } from "@/types";
import { getDB } from "./db";

export async function createForm(testData: testFormType) {
	const db = await getDB();
	const coll = db.collection<testFormType>("testForm")
	try {
		await coll.insertOne(testData)
	} catch(e){
		throw(e)
	}
}
