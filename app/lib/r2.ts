import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

export function getR2Client() {
	try {
		if(!process.env.R2_SECRET_KEY || !process.env.R2_ACCESS_KEY || !process.env.R2_SECRET_KEY){
			throw new Error("Failed to get env")
		}

		const r2  = new S3Client({
			region: "auto",
			endpoint:process.env.R2_URL,
			credentials: {
				accessKeyId:process.env.R2_ACCESS_KEY,
				secretAccessKey:process.env.R2_SECRET_KEY,
			},
		});
		return r2;
	} catch(e) {
		console.log(e);
	}
}
