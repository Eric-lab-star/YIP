import { Db, MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

if(!process.env.YIPDB_MONGODB_URI) {
	throw new Error("YIPDB_MONGODB_URI is not defined")
}

const uri = process.env.YIPDB_MONGODB_URI;
const options: MongoClientOptions = {
	maxPoolSize: 10,
	serverApi : {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
};


let client: MongoClient;
let clientPromise: Promise<MongoClient>;


if(process.env.NODE_ENV === "development"){
 if (!global._mongoClientPromise) {
 	client = new MongoClient(uri, options);
	attachDatabasePool(client);
 	global._mongoClientPromise = client.connect();
 }
 clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	attachDatabasePool(client);
	clientPromise = client.connect();
}




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
		console.log("deleted previous collection")
	}
	return await db.createCollection(name)
}

 export default clientPromise;

