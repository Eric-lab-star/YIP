import { getDB } from "@/app/lib/db";
import { IUser } from "@/app/lib/users";
import { NextRequest } from "next/server";

interface loginRequest {
	name: string;
	password: string;
}

export interface loginResponse {
	message: string;
	userId: string;
	error: string| undefined;
}

export async function POST(req: NextRequest){
	try {
		const data  = (await req.json()) as loginRequest;
		const db = await getDB();
		const user = await db.collection<IUser>("users").findOne({name: data.name});
		if (user && user.password === data.password) {
			return Response.json({
				message: "login successful",
				userId: user._id.toString(),
			},{
				status: 200,
			});
		} else {
			return Response.json({
				message: "login fail",
				userId: "",
			}, {status: 200})
		}

	} catch (error){
		return Response.json({error: "something went wrong", status: 500});
	}
}
