import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.YIPDB_MONGODB_URI!;

const client = new MongoClient(uri, {
	serverApi : {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

export async function run() {
	try {
		await client.connect();

		const yipDB = client.db("yipDB");
		const names =  yipDB.listCollections({}, {nameOnly: true});
		for await (const doc of names) {
			console.log(doc);
		}
		yipDB.collection("users").drop();
		const newnames =  yipDB.listCollections({}, {nameOnly: true});
		for await (const doc of newnames) {
			console.log(doc);
		}
	} catch {
		await client.close();
	}
}

