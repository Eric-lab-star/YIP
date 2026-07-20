import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Proxy (Next 16's middleware) runs on the Edge runtime, where `jsonwebtoken`
// is unavailable — hence `jose` for the signature check here, while server
// components keep using `validateToken` from app/lib/auth/login.
//
// This used to test only that a `logInToken` cookie *existed*, which meant any
// non-empty value (`document.cookie = "logInToken=x"`) walked straight past the
// gate. It now verifies the signature and expiry. The protected sections also
// call `requireAuth()` in their layouts, so a lapse here can no longer expose
// content on its own.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function hasValidSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("logInToken")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return true;
  } catch {
    // Bad signature, wrong algorithm, expired, or malformed.
    return false;
  }
}

export default async function proxy(req: NextRequest) {
  const loggedIn = await hasValidSession(req);
  const { pathname } = req.nextUrl;

  if (pathname === "/login") {
    // Only bounce away from the login page for a genuinely valid session,
    // otherwise a stale or forged cookie would lock the user out of logging in.
    return loggedIn
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next();
  }

  if (!loggedIn) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    // Clear the rejected cookie so the browser stops replaying it.
    response.cookies.delete("logInToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tourOfPython/:path*",
    "/spaceshipCaptain/:path*",
    "/AIDeveloper/:path*",
    "/login",
    "/chat/:path*",
    "/editor/:path*",
    "/students/:path*",
    "/dashBoard",
  ],
};
