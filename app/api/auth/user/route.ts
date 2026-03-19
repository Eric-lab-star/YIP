import { validateToken } from "@/app/lib/auth/login";

export async function GET() {
	const result = await validateToken()
	return Response.json(result)
}
