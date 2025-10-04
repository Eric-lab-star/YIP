import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
	try {
		const data  = await req.json();
		console.log(data);
		return Response.json({
			message: "login successful",
		},{
			status: 200,
		});
	} catch (error){
		return Response.json({error: "something went wrong", status: 500});
	}
}
