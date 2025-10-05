import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.YIPDB_MONGODB_URI!;
const options = {
	serverApi : {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
};


let client: MongoClient;

 if (!global._mongoClientPromise) {
 	client = new MongoClient(uri, options);
 	global._mongoClientPromise = client.connect();
 }

 const clientPromise = global._mongoClientPromise;


export async function getDB() {
	const client = await clientPromise
	const db = client.db("yipDB");
	return db
}

 export default clientPromise;

