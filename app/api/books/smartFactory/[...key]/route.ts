import { getSmartFactoryDoc } from "@/app/lib/books/smartFactory";
import { r2GetSignedURL } from "@/app/lib/r2/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	{params} : {params: Promise<{key: string[]}>}
) {
	const {key}= await params;
	
	if (!key) {
		return NextResponse.json({ error: "Missing Key"}, {status: 400});
	}

	const doc = getSmartFactoryDoc(key.join("/"))
	const presignedURL = r2GetSignedURL(key.join("/"))
	const result = await Promise.all([doc, presignedURL])

	if(!result[0]) {
		return NextResponse.json({error: "Missing Data"}, {status: 400})
	}

	return NextResponse.json({
		url:result[1],
		...result[0]
	})
}
