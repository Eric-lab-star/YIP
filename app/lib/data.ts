import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.YIPDB_MONGODB_URI!;

interface Users {
	name: string;
	age: number;
	phoneNumber: string;
	school: string;
}

const db: Users[] = [
	{
		name: "kim",
		age: 33,
		phoneNumber: "01230192312",
		school: "sdfsdf",
	},
	{
		name: "kim",
		age: 33,
		phoneNumber: "01230192312",
		school: "sdfsdf",
	},
	{
		name: "kim",
		age: 33,
		phoneNumber: "01230192312",
		school: "sdfsdf",
	},
	{
		name: "kim",
		age: 33,
		phoneNumber: "01230192312",
		school: "sdfsdf",
	},
	{
		name: "kim",
		age: 33,
		phoneNumber: "01230192312",
		school: "sdfsdf",
	},
];

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
		const users = yipDB.collection<Users>("users");
		const result = await users.insertMany(db);
		const ids = result.insertedIds;
		for ( const id of Object.values(ids)) {
			console.log(`Inserted a document with id ${id}`);
		}

	} catch {
		await client.close();
	}
}

