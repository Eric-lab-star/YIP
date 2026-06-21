import { validateToken } from "@/app/lib/auth/login";
import { r2client } from "@/app/lib/r2/client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_: NextRequest,
	{params}: {params: Promise<{key: string[]}>}
) {
	const auth = await validateToken()
	if (!auth.success) {
		return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 })
	}

	const { key }= await params
	const joinedKey = key.join("/")

	// Per-user objects live under `tiptab/<userId>/` — a non-admin may only sign
	// URLs for their own. Prevents arbitrary cross-user reads of the bucket.
	if (
		auth.role !== "admin" &&
		joinedKey.startsWith("tiptab/") &&
		!joinedKey.startsWith(`tiptab/${auth.id}/`)
	) {
		return NextResponse.json({ error: "Forbidden", ok: false }, { status: 403 })
	}

	try {
		const command = new GetObjectCommand({
			Bucket: process.env.R2_BUCKET!,
			Key: joinedKey,
			ResponseContentDisposition: `attachment; filename="${encodeURIComponent(key[key.length - 1] ?? "download")}"`
		})

		const presignedUrl = await getSignedUrl(r2client, command, {
			expiresIn: 60
		})

		return NextResponse.json({url: presignedUrl, ok: true});

	} catch (error) {
		console.log("presigned URL 생성오류", error)
		return NextResponse.json({
			error: "URL 생성중 오류가 발생했습니다. ",
			ok:false,
		}, {status: 500})
	}
	
}
