import { r2DeleteManyURLs } from "@/app/lib/r2/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	console.log("r2")
	const body:{keys: string[]} = await req.json()
	console.log("body", body.keys)
	const res = await r2DeleteManyURLs(body.keys)

	return res
}
