import { validateToken } from "@/app/lib/auth/login";
import { createPost } from "@/app/lib/mongo/posts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const result = await validateToken()
		if(!result.success) {
			return result;
		}
		const formData  = await req.formData()
		const title = formData.get("title")
		const content = formData.get("content")
		if (!title || !content)  {
			return Response.json({
				ok: false,
				error: "title or content is missing"
			})
		}
		const response = await createPost({userId:result.id, title: String(title), content: JSON.parse(String(content))})
		return Response.json(response)

	} catch(e) {
		return Response.json({
			ok: false,
			error: "server error"
		})

	}
	
	
}
