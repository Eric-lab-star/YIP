import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
	if (!req.cookies.has("token")) {
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
