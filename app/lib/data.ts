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
		const blogs = yipDB.collection("blogs")
		const blogsDoc = {
			name: "Arduboy",
			difficulty: "3",
			description: "this is intermediate course."
		}

	} catch {
		await client.close();
	}
}

