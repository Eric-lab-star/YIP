// One-time migration: encrypt existing student phone numbers at rest and attach
// a blind index for login lookup. Idempotent and safe to re-run — rows already
// encrypted are skipped.
//
// Requires the same two secrets the app uses, plus the DB URI:
//   PHONE_ENC_KEY    — 32 bytes as base64 or 64 hex chars (AES-256 key)
//   PHONE_INDEX_KEY  — any non-empty secret (HMAC key)
//   YIPDB_MONGODB_URI
//
// Read-only preview (no writes), then the real run:
//   node scripts/migrate-phone-encryption.mjs --dry-run
//   node scripts/migrate-phone-encryption.mjs
//
// IMPORTANT: deploy the application code that understands encrypted values
// BEFORE running this against production. The app is dual-mode (it reads legacy
// plaintext and encrypted rows both), so the safe order is: set the two keys in
// the environment, deploy, then run this migration.

import { MongoClient } from "mongodb";
import { createCipheriv, createHmac, randomBytes } from "node:crypto";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const ENC_PREFIX = "enc:v1:";
const DRY_RUN = process.argv.includes("--dry-run");

loadEnv();

function readEncKey() {
	const raw = process.env.PHONE_ENC_KEY;
	if (!raw) throw new Error("PHONE_ENC_KEY is not set");
	const key = /^[0-9a-fA-F]{64}$/.test(raw)
		? Buffer.from(raw, "hex")
		: Buffer.from(raw, "base64");
	if (key.length !== 32) {
		throw new Error("PHONE_ENC_KEY must decode to 32 bytes (base64 or 64 hex chars)");
	}
	return key;
}

const encKey = readEncKey();
const indexKey = process.env.PHONE_INDEX_KEY;
if (!indexKey) throw new Error("PHONE_INDEX_KEY is not set");

const normalize = (raw) => String(raw).replace(/\D/g, "");

function encryptPhone(raw) {
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", encKey, iv);
	const ct = Buffer.concat([cipher.update(normalize(raw), "utf8"), cipher.final()]);
	const tag = cipher.getAuthTag();
	return `${ENC_PREFIX}${iv.toString("base64")}:${tag.toString("base64")}:${ct.toString("base64")}`;
}

const phoneIndex = (raw) =>
	createHmac("sha256", indexKey).update(normalize(raw)).digest("hex");

async function main() {
	const uri = process.env.YIPDB_MONGODB_URI;
	if (!uri) throw new Error("YIPDB_MONGODB_URI is not set");

	const client = new MongoClient(await resolveMongoUri(uri));
	await client.connect();
	try {
		const students = client.db("yipDB").collection("students");

		// Lookup index for login (name + blind index). Non-unique: siblings may
		// legitimately share a guardian's number.
		await students.createIndex({ name: 1, phoneIndex: 1 });

		const all = await students.find({}).toArray();
		let migrated = 0;
		let skipped = 0;

		for (const s of all) {
			const phone = s.studentPhoneNumber;
			if (typeof phone !== "string" || phone.startsWith(ENC_PREFIX)) {
				skipped++;
				continue;
			}
			const update = {
				studentPhoneNumber: encryptPhone(phone),
				phoneIndex: phoneIndex(phone),
			};
			console.log(
				`${DRY_RUN ? "[dry-run] would migrate" : "migrating"} ${s._id} (${s.name ?? "?"})`
			);
			if (!DRY_RUN) {
				await students.updateOne({ _id: s._id }, { $set: update });
			}
			migrated++;
		}

		console.log(
			`\n${DRY_RUN ? "[dry-run] " : ""}done — ${migrated} migrated, ${skipped} already encrypted / skipped, ${all.length} total`
		);
	} finally {
		await client.close();
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
