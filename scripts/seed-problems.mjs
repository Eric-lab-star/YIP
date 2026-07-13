// Seed a sample judge problem. Reads YIPDB_MONGODB_URI from the environment
// (or .env.local). Safe to re-run: upserts by slug.
//
//   node scripts/seed-problems.mjs

import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";
import dns from "node:dns";
import { promisify } from "node:util";
import { execSync } from "node:child_process";

// --- Windows SRV workaround (mirrors app/lib/mongo/ensureDns.ts) -----------
// On Windows, Node's bundled c-ares fails mongodb+srv:// SRV lookups
// (querySrv ECONNREFUSED), so the driver can't resolve the seed hosts. We
// expand the SRV URI ourselves via a working DNS resolver and hand the driver
// a plain mongodb:// seed-list. No-op on other platforms / non-srv URIs.
const PUBLIC_FALLBACKS = ["1.1.1.1", "8.8.8.8"];
const isIPv4 = (s) => /^\d{1,3}(\.\d{1,3}){3}$/.test(s);

function osDnsServers() {
	try {
		const out = execSync(
			'powershell -NoProfile -Command "(Get-DnsClientServerAddress -AddressFamily IPv4).ServerAddresses"',
			{ encoding: "utf8", timeout: 5000 }
		);
		return out
			.split(/\r?\n/)
			.map((s) => s.trim())
			.filter((s) => isIPv4(s) && s !== "127.0.0.1");
	} catch {
		return [];
	}
}

function probe(server, srvName, timeoutMs) {
	return new Promise((resolve) => {
		const r = new dns.Resolver({ timeout: timeoutMs, tries: 1 });
		r.setServers([server]);
		let settled = false;
		const done = (ok) => {
			if (settled) return;
			settled = true;
			resolve(ok);
		};
		const t = setTimeout(() => done(false), timeoutMs + 250);
		r.resolveSrv(srvName, (err, addrs) => {
			clearTimeout(t);
			done(!err && Array.isArray(addrs) && addrs.length > 0);
		});
	});
}

async function findWorkingServers(srvName) {
	const candidates = [
		...new Set(
			[...dns.getServers(), ...osDnsServers(), ...PUBLIC_FALLBACKS].filter(
				(s) => isIPv4(s) && s !== "127.0.0.1"
			)
		),
	];
	const results = await Promise.all(
		candidates.map(async (s) => ({ s, ok: await probe(s, srvName, 2000) }))
	);
	return results.filter((r) => r.ok).map((r) => r.s);
}

async function resolveMongoUri(uri) {
	dns.setDefaultResultOrder("ipv4first");
	if (process.platform !== "win32") return uri;
	if (!uri.startsWith("mongodb+srv://")) return uri;

	const parsed = uri.match(/^mongodb\+srv:\/\/(?:([^@]+)@)?([^/?]+)([^?]*)?(?:\?(.*))?$/i);
	if (!parsed) return uri;
	const creds = parsed[1] ?? "";
	const host = parsed[2];
	const path = parsed[3] ?? "";
	const query = parsed[4] ?? "";
	const srvName = `_mongodb._tcp.${host}`;

	try {
		const servers = await findWorkingServers(srvName);
		if (servers.length === 0) return uri;
		const resolver = new dns.Resolver();
		resolver.setServers(servers);
		const resolveSrv = promisify(resolver.resolveSrv.bind(resolver));
		const resolveTxt = promisify(resolver.resolveTxt.bind(resolver));

		const srv = await resolveSrv(srvName);
		if (!srv.length) return uri;
		const hosts = srv.map((r) => `${r.name}:${r.port}`).join(",");

		let txtParams = "";
		try {
			const txt = await resolveTxt(host);
			txtParams = txt.map((chunks) => chunks.join("")).join("&");
		} catch {
			/* no TXT record — fine */
		}

		const params = new URLSearchParams(txtParams);
		if (!params.has("tls") && !params.has("ssl")) params.set("tls", "true");
		for (const [k, v] of new URLSearchParams(query)) params.set(k, v);

		const db = path.replace(/^\//, "");
		console.log("[mongo] expanded SRV to seed-list via", servers[0], "->", hosts);
		return `mongodb://${creds ? creds + "@" : ""}${hosts}/${db}?${params.toString()}`;
	} catch {
		return uri;
	}
}

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

const client = new MongoClient(await resolveMongoUri(uri));
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
