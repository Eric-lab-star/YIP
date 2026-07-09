// Seed a sample judge problem. Reads YIPDB_MONGODB_URI from the environment
// (or .env.local). Safe to re-run: upserts by slug.
//
//   node scripts/seed-problems.mjs

import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";

function loadEnv() {
	if (process.env.YIPDB_MONGODB_URI) return;
	try {
		const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
		for (const line of raw.split("\n")) {
			const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
			if (m && !process.env[m[1]]) {
				process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
			}
		}
	} catch {
		// no .env.local — rely on the process environment
	}
}

loadEnv();

const uri = process.env.YIPDB_MONGODB_URI;
if (!uri) {
	console.error("YIPDB_MONGODB_URI is not set");
	process.exit(1);
}

const now = new Date();

// A trivial stdin/stdout problem: read "a b", print their sum. Works in every
// language because Judge0 compares stdout to expected_output directly.
const twoSum = {
	slug: "two-sum-stdin",
	title: "두 수의 합",
	description: [
		"# 두 수의 합",
		"",
		"공백으로 구분된 두 정수 `a`와 `b`가 한 줄로 주어집니다.",
		"두 수의 합을 출력하세요.",
		"",
		"## 입력",
		"`a b` (−10^9 ≤ a, b ≤ 10^9)",
		"",
		"## 출력",
		"`a + b`",
		"",
		"## 예시",
		"```",
		"입력: 3 5",
		"출력: 8",
		"```",
	].join("\n"),
	difficulty: "easy",
	languages: ["python", "javascript", "cpp", "java", "go"],
	starterCode: {
		python: "a, b = map(int, input().split())\nprint(a + b)\n",
		javascript:
			"const [a, b] = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number);\nconsole.log(a + b);\n",
		cpp: "#include <iostream>\nint main(){ long long a,b; std::cin>>a>>b; std::cout<<a+b<<std::endl; }\n",
		java: "import java.util.*;\npublic class Main{ public static void main(String[] a){ Scanner s=new Scanner(System.in); System.out.println(s.nextLong()+s.nextLong()); } }\n",
		go: "package main\nimport \"fmt\"\nfunc main(){ var a,b int64; fmt.Scan(&a,&b); fmt.Println(a+b) }\n",
	},
	testcases: [
		{ stdin: "3 5\n", expectedOutput: "8\n", hidden: false },
		{ stdin: "0 0\n", expectedOutput: "0\n", hidden: false },
		{ stdin: "-4 10\n", expectedOutput: "6\n", hidden: true },
		{ stdin: "1000000000 1000000000\n", expectedOutput: "2000000000\n", hidden: true },
	],
	timeLimit: 5,
	memoryLimit: 256000,
	createdBy: "seed",
};

const client = new MongoClient(uri);
try {
	await client.connect();
	const db = client.db("yipDB");
	const col = db.collection("problems");
	await col.createIndex({ slug: 1 }, { unique: true });
	await col.updateOne(
		{ slug: twoSum.slug },
		{ $set: { ...twoSum, updatedAt: now }, $setOnInsert: { createdAt: now } },
		{ upsert: true }
	);
	console.log(`Seeded problem: ${twoSum.slug}`);
} finally {
	await client.close();
}
