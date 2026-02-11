import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	console.log(req)
	const param = req.nextUrl.searchParams
	const link = param.get("url")


	return Response.json({
		success : 1,
		link,
		meta: {
			title: "this is name of site",
			description: "blah blah blah",
			image: {
				url: "https://codex.so/public/app/img/meta_img.png",
			}
		}
	})
}
