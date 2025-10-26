import { Db, MongoClient, ServerApiVersion } from "mongodb";

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


/**
	* getDB function waits for client connection and return db
* */
export async function getDB() {
	const client = await clientPromise
	const db = client.db("yipDB");
	return db
}

/**
	* isExists function returns null if collection does not
* exist.
	*/
export async function isExists(db:Db, name: string ){
	const exists = await db.listCollections({name}).next();
	return exists
}

/**
	* initCollection drops collection if already exists else creates one
	*/
export async function initCollection(db: Db, name: string) {
	const exists = await isExists(db, name);
	if (exists) {
		await db.collection(name).drop();
		console.log("delted previous collection")
	}
	return await db.createCollection(name)
}

 export default clientPromise;

