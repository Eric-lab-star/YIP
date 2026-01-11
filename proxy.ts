import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
	const token = req.cookies.get("token")

	if (!token || token.value === "") {
		console.log("token or token value is wrong")
		console.log(`current token is ${token}: ${token?.value}`)
		return NextResponse.redirect(new URL("/login", req.url))
	}
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
