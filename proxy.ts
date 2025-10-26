import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
	const token = req.cookies.get("token")
	if (!token || token.value === "") {
		console.log("token or token value is wrong")
		console.log(`current token is ${token}: ${token?.value}`)
		return NextResponse.redirect(new URL("/home", req.url))
	}
}

export const config = {
	matcher: [
		'/books/:path*',
		'/mindmap/:path*',
		'/report/:path*',
		'/todo/:path*',
	]
}
