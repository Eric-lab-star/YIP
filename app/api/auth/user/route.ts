import { validateToken } from "@/app/lib/auth/login";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const result = await validateToken()
	return Response.json(result)
}
