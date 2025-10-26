import { getSmartFactoryDoc } from "@/app/lib/books/smartFactory";
import { r2Get } from "@/app/lib/r2/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const key = searchParams.get("key");
	if (!key) {
		return NextResponse.json({ error: "Missing Key"}, {status: 400});
	}

	const doc = getSmartFactoryDoc(key)
	const presignedURL = r2Get(key)
	const result = await Promise.all([doc, presignedURL])

	if(!result[0]) {
		return NextResponse.json({error: "Missing Data"}, {status: 400})
	}

	return NextResponse.json({
		url:result[1],
		...result[0]
	})
}
