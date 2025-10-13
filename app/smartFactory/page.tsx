import { getDB } from "../lib/db"
import { IsmartFactoryDoc } from "../lib/smartFactory";

export default async function page( ) {
	const db = await getDB();
	const smartFactory = await db.collection<IsmartFactoryDoc>("smartFactory")
	.find(
		{},
		{
			projection: {
				name: 1
			}
		}).toArray();
		console.log(smartFactory)
	return <div>{
		smartFactory.map((doc) => <div key={doc.name}>{doc.name}</div>)
	}</div>
}
