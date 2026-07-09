import { validateToken } from "@/app/lib/auth/login";
import { compressImage } from "@/app/lib/r2/sharp/bluarData";
import { IMAGE_BASE_URL, r2PostURL } from "@/app/lib/r2/utils";
import { NextRequest, NextResponse } from "next/server"

// Reject oversized uploads before buffering them into memory.
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

export async function GET() {
	return Response.json({
		image: "image"
	})
}

export async function POST(req: NextRequest) {
	try {
		const auth = await validateToken()
		if (!auth.success) {
			return NextResponse.json(
				{ success: 0, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		// Namespace the object by the authenticated user — never trust a
		// client-supplied userId, which would allow writing into any namespace.
		const userId = auth.id

		const formData = await req.formData()
		const file = formData.get("image")

		if (!(file instanceof File)) {
			return NextResponse.json(
				{ success: 0, error: "No file field 'image' in form-data" },
				{ status: 400 }
			);
		}

		if (!file.type.startsWith("image/")) {
			return NextResponse.json(
				{ success: 0, error: "Only image files are allowed" },
				{ status: 400 }
			);
		}

		if (file.size > MAX_UPLOAD_BYTES) {
			return NextResponse.json(
				{ success: 0, error: "Image too large (max 10MB)" },
				{ status: 413 }
			);
		}

		const bytes = Buffer.from(await file.arrayBuffer());

		// compressImage always re-encodes to WebP, so the key extension and stored
		// ContentType are derived from the output — never from the client filename
		// or client-supplied MIME type.
		const image = await compressImage(bytes)

		const key = `tiptab/${userId}/${crypto.randomUUID()}.webp`

		await r2PostURL({ Key: key, Body: image, ContentType: "image/webp" })

		const url = `${IMAGE_BASE_URL}/${key}`

		return Response.json({
			success: 1,
			file: { url }
		})


	} catch (e) {
		console.log(e)
		return Response.json({
			success: 0,
			error: "Upload failed"
		}, { status: 400 })
	}

}

