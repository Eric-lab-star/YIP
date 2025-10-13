import { getDB } from "./db";

export interface IsmartFactoryDoc {
	name: string;
	page: number;
	description: string;
	src: string;
}

async function initSmartFactory() {
	const db = await getDB();
	const project = await db.listCollections({name: "smartFactory"}).next();
	if (project) {
		db.collection("smartFactory").drop();
	}
	return db.createCollection<IsmartFactoryDoc>("smartFactory");
}

export async function insertSmartFactory() {
	const sf = await initSmartFactory()
	console.log("Initiallized smartFactory collection")
	try {
		const  db: IsmartFactoryDoc[] = [];
		for (let i = 0; i < 133; i++ ) {
			const formattedNum= (i).toString().padStart(3, "0");
			db.push({
				name: `smartFactory_${formattedNum}`,
				page: i,
				src: `/smartFactory/smartFactory_${formattedNum}.webp`,
				description: formattedNum
			});
		}
		const {insertedCount} = await sf.insertMany(db)
		console.log(`Inserted ${insertedCount} docs to smartFactory collection`)
	} catch (error) {
		console.log("Error while inserting")
	}
}
