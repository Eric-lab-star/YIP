// Upload the 코딩냥이 mood portraits to R2 under `AIDeveloper/nyang/`.
//
// The images are generated with the kling CLI from the existing character art
// (see components/mdx/nyangMood.ts for what each mood is used for). This script
// only moves finished PNGs into the bucket that `r2.kimkyungsub.com` serves.
//
//   node scripts/upload-nyang-moods.mjs <dir>            # upload <dir>/*.png
//   node scripts/upload-nyang-moods.mjs <dir> --dry-run  # list, upload nothing
//
// File name (minus .png) is the mood key, case-insensitive: TEACH.png and
// teach.png both land at AIDeveloper/nyang/teach.png.

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { loadEnv } from "./lib/mongoUri.mjs";

const PREFIX = "AIDeveloper/nyang";
const MOODS = new Set([
	"welcome",
	"teach",
	"ask",
	"think",
	"discover",
	"cheer",
	"warn",
	"oops",
	"celebrate",
	"wrap",
]);

loadEnv();

const dir = process.argv[2];
const dryRun = process.argv.includes("--dry-run");

if (!dir) {
	console.error("usage: node scripts/upload-nyang-moods.mjs <dir> [--dry-run]");
	process.exit(1);
}

for (const key of ["R2_URL", "R2_ACCESS_KEY", "R2_SECRET_KEY", "R2_BUCKET"]) {
	if (!process.env[key]) {
		console.error(`missing env: ${key} (expected in .env.local)`);
		process.exit(1);
	}
}

const files = readdirSync(dir)
	.filter((f) => f.toLowerCase().endsWith(".png"))
	.sort();

if (files.length === 0) {
	console.error(`no .png files in ${dir}`);
	process.exit(1);
}

const unknown = files.filter(
	(f) => !MOODS.has(path.basename(f, path.extname(f)).toLowerCase())
);
if (unknown.length > 0) {
	console.error(`not a known mood name: ${unknown.join(", ")}`);
	console.error(`expected one of: ${[...MOODS].join(", ")}`);
	process.exit(1);
}

const client = new S3Client({
	region: "auto",
	endpoint: process.env.R2_URL,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY,
		secretAccessKey: process.env.R2_SECRET_KEY,
	},
});

let uploaded = 0;
for (const file of files) {
	const full = path.join(dir, file);
	const mood = path.basename(file, path.extname(file)).toLowerCase();
	const Key = `${PREFIX}/${mood}.png`;
	const size = (statSync(full).size / 1024 / 1024).toFixed(2);

	if (dryRun) {
		console.log(`would upload ${file} (${size} MB) -> ${Key}`);
		continue;
	}

	await client.send(
		new PutObjectCommand({
			Bucket: process.env.R2_BUCKET,
			Key,
			Body: readFileSync(full),
			ContentType: "image/png",
		})
	);
	uploaded++;
	console.log(`uploaded ${file} (${size} MB) -> ${Key}`);
}

console.log(
	dryRun
		? `\ndry run: ${files.length} file(s) would be uploaded to ${PREFIX}/`
		: `\ndone: ${uploaded} file(s) uploaded to ${PREFIX}/`
);
