import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {

	const token = req.cookies.get("logInToken")?.value
	const { pathname }=  req.nextUrl
	switch (pathname) {
		case "/":
			return NextResponse.redirect(new URL("/pythonWebScrapper", req.url))
			break;
		case "/login":
			if (token) {
				return NextResponse.redirect(new URL("/", req.url))
			}
			break;
		default:
			if (!token) {
				return NextResponse.redirect(new URL("/login", req.url))
			}
			return NextResponse.next()
	}
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/pythonWebScrapper/:path*',
		"/login",
		"/",
	]
}
