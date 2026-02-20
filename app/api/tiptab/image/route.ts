import { compressImage } from "@/app/lib/r2/sharp/bluarData";
import { IMAGE_BASE_URL, r2PostURL } from "@/app/lib/r2/utils";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	return Response.json({	
		image: "image"
	})
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get("image")
		const userId = formData.get("userId")


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

		const bytes = Buffer.from(await file.arrayBuffer());

		const image = await compressImage(bytes)

		const ext = (file.name.split(".").pop() || "png").toLocaleLowerCase()
		const key = `tiptab/${userId}/${crypto.randomUUID()}.${ext}`

		await r2PostURL({Key: key, Body: image, ContentType: file.type})

		const url = `${IMAGE_BASE_URL}/${key}`

		return Response.json({
			success: 1,
			file: {url}
		})


	} catch(e){
		return Response.json({
			success: 0,
			error: "Upload failed"
		}, {status: 400})
	}

}

