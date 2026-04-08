import { r2DeleteManyURLs } from "@/app/lib/r2/utils";
import { NextRequest } from "next/server";

/**
	* delete many r2 files
*/
export async function POST(req: NextRequest) {
	const body:{keys: string[]} = await req.json()
	const res = await r2DeleteManyURLs(body.keys)
	return res
}




