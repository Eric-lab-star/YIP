import { createPost } from "@/app/lib/mongo/posts";
import { BodySchema } from "@/app/lib/zod/editorSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const json = await req.json()
		const parsed = BodySchema.safeParse(json)

		if (!parsed.success) {
			return NextResponse.json({
				error: "Invalid Body"
			}, {status: 400})
		}

		const res = await createPost({content: parsed.data.content})
		if (!res.ok) {
			return Response.json({
				ok: false,
				error: "Save failed"
			})
		}
		return  Response.json({
			ok: true,
			id: res.id
		})
	} catch(e) {
		return Response.json({
			ok: false,
			error: "server error"
		})

	}
	
	
}
