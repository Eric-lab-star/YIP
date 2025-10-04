import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try{
		const res = await req.json();	
		return Response.json({name:"kim"});
	} catch(err) {
		return Response.json({err: err},{status: 500})
	}
}

export async function GET(req: NextRequest) {
	try {
		return Response.json({name: "Hello users"})
	} catch(err) {
		
	}
}
