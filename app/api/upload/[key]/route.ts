import { getR2Client } from "@/app/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
) {

	const r2 = getR2Client();

	if (!r2) return; 

		const command = new GetObjectCommand({
			Bucket: process.env.R2_BUCKET,
			Key: "Box3.png"
		})

	const url = await getSignedUrl(r2, command,{expiresIn: 60 * 5})

	return NextResponse.json({"url": url})
}

