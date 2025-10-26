import { smartFactoryCollection } from "@/app/lib/books/smartFactory";
import { r2GetSignedURL } from "@/app/lib/r2/utils";
import { toSafeNumber } from "@/app/lib/utils/wait";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const start = searchParams.get("start");
	const end  = searchParams.get("end");

	if (!start || !end) {
		return NextResponse.json({ error: "Missing requried search params"}, {status: 400});
	}

	const safeStart = toSafeNumber(start)
	const safeEnd = toSafeNumber(end)

	if (!safeStart || !safeEnd) {
		return NextResponse.json({ error: "start and end is not a valid number"}, {status: 400});
	}

	const docs = (await smartFactoryCollection()).slice(safeStart, safeEnd)
	const imageurl = await Promise.all(
		docs.map((doc) => {
			return r2GetSignedURL(doc.key)
		})
	)

	const res = docs.map((doc, i) => {
		return {url: imageurl[i], ...doc}
	})
	return NextResponse.json(res)
}


