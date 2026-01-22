import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
	const token = req.cookies.get("token")
	console.info("middleware: requesting user token..")

	if (!token || token.value === "") {
		console.warn("token or token value is wrong")
		console.warn(`current token is ${token}: ${token?.value}`)
		return NextResponse.redirect(new URL("/login", req.url))
	}
	console.log("token: ", token)
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/pythonWebScrapper/:path*',
		'/mindmap/:path*',
		"/students/:path*",
		"/"
	]
}
