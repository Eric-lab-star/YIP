import { getDB } from "./db";
import { IUser } from "./users";
import { IProject } from "./projects";
import { ObjectId } from "mongodb";

/**
* this function add 아두보이 project to 김경섭 
*  
	*
*
**/
export async function addProjToUser(){
	try {
		const db = await getDB();
		const arduboy = await db.collection<IProject>("projects").findOne({name: "아두보이"}, {projection:{_id: 1}})
		if (!arduboy) {
			throw new Error("Could not find arduboy")
		}
		const users = db.collection<IUser>("users")
		const user = await db.collection<IUser>("users").findOne({name: "김경섭"}, {projection: {_id: 1, currentProj: 1 }})
		if (!user) {
			throw new Error("Could not find user")
		}
		if (user && arduboy) {
			console.log("found user and arduboy");
		}

		const filter = {
			"_id": user._id,
		}

		// update user doc by setting currentProj array to arduboy._id
		const update = {
			$set: {currentProj: [arduboy._id]}
		}
		users.updateOne(filter,update)
		console.log(user)

	} catch(e) {
		console.log(e);
	}
}

interface joinedTable extends IUser {
	projectDetails?: IProject[]
}

export async function joinProjToUser(id: string) {
	try {
		const db = await getDB();
		const users = await db.collection<IUser>("users").aggregate<joinedTable>([
			{
				$match: {_id: new ObjectId(id)}
			},
			{
				$lookup: {
					from: "projects",
					localField: "currentProj",
					foreignField: "_id",
					as: "projectDetails"
				}
			}
		]).toArray()
		return users[0]
	} catch(e) {
		console.log(e)
	}
}
