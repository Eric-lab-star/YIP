import og from "open-graph-scraper";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const param = req.nextUrl.searchParams
	const link = validateURL(param)
	if (!(typeof link == "string")) {
		return link
	}

	const {error, result} = await og({url: link})

	if (error) {
		return Response.json({
			success: 1,
			link,
		})
	}

	return Response.json({
		success : 1,
		link,
		meta: {
			title: result.ogTitle,
			description: result.ogDescription,
			image: result.ogImage && result.ogImage[0] 
		}
	})
}


function validateURL(param: URLSearchParams) {
	try {

		const link  = param.get("url")
		if (!link) {
			return Response.json({
				success: 0,
				error: "Missing URL",
			},{status: 400})
		}

		const url = new URL(link);
		if (!["http:", "https:"].includes(url.protocol)) {
			return Response.json({
				success: 0,
				error: "Invliad protocol",
			},{status: 400})
		}
		return link
	} catch(e) {
		return Response.json({
			success: 0,
			errro: "Invalid URL",
		},{status:400})
	}

}
