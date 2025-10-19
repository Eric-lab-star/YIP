import { getR2Client } from "@/app/lib/r2";
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const r2 = getR2Client()
	if (!r2) {
		return NextResponse.json({error: "r2 client error"}, {status: 400})
	}
	const formdata =  await req.formData();
	const file = formdata.get("file") as File;

	if (!file) return NextResponse.json({error: "No filev provided"}, {status: 400});
	const arrayBuffer = await file.arrayBuffer();
	const fileName = file.name;

	const r2obj = new PutObjectCommand({
		Bucket: "yip-images",
		Key: fileName,
		Body: Buffer.from(arrayBuffer),
		ContentType: file.type,
	})

	await r2.send(r2obj);

	if (!process.env.R2_PUBLIC_URL) {
		return NextResponse.json({error: "r2 url error"})
	}

	return NextResponse.json({url: `${process.env.R2_PUBLIC_URL}/${fileName}`})
}


export async function GET() {
	const r2 = getR2Client();
	if (!r2) return; 
	const {Body, ContentType} = await r2.send(
		new GetObjectCommand({
			Bucket: process.env.R2_BUCKET,
			Key: "Box3.png"
		})
	)

	const stream = Body as ReadableStream

	console.log(stream)

	return Response.json({message: "ok"})
}

