
import { S3Client } from "@aws-sdk/client-s3";
import { safe, unwrap } from "./results";

export const r2client = unwrap(safe(() => getClient()))

function getClient() {
	if (!process.env.R2_URL || !process.env.R2_ACCESS_KEY || !process.env.R2_SECRET_KEY) {
		throw new Error(
			`Error: required env variable is missing\n
			R2_URL \n R2_ACCESS_KEY \n R2_SECRET_KEY\n`
		)
	}
	const client  = new S3Client({ 
		region: "auto",
		endpoint: process.env.R2_URL!,
		credentials: {
			accessKeyId: process.env.R2_ACCESS_KEY!,
			secretAccessKey: process.env.R2_SECRET_KEY!,
		},
	})
	return client
}
