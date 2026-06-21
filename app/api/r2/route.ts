import { validateToken } from "@/app/lib/auth/login";
import { r2DeleteManyURLs } from "@/app/lib/r2/utils";
import { NextRequest, NextResponse } from "next/server";

/**
	* delete many r2 files. Requires auth; non-admins may only delete objects
	* under their own `tiptab/<userId>/` prefix to prevent destroying other
	* users' assets.
*/
export async function POST(req: NextRequest) {
	const auth = await validateToken();
	if (!auth.success) {
		return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
	}

	const body: { keys: string[] } = await req.json();
	if (!Array.isArray(body.keys)) {
		return NextResponse.json({ ok: false, error: "Invalid keys" }, { status: 400 });
	}

	const prefix = `tiptab/${auth.id}/`;
	const allowed =
		auth.role === "admin" ||
		body.keys.every((k) => typeof k === "string" && k.startsWith(prefix));
	if (!allowed) {
		return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
	}

	const res = await r2DeleteManyURLs(body.keys);
	return res;
}
