// Shared bootstrap for the seed scripts: read .env.local, and work around
// Windows' inability to resolve Atlas SRV records by expanding the
// `mongodb+srv://` URI into a plain `mongodb://` host list ourselves.
//
// scripts/seed-problems.mjs and scripts/seed-simple-problems.mjs each carry
// their own inline copy of this. They are left as they are — they work, and
// re-running them rewrites live problems, so they are not worth disturbing to
// prove a refactor. New scripts should import from here instead of adding a
// third copy.

import { readFileSync } from "node:fs";
import dns from "node:dns";
import { promisify } from "node:util";
import { execSync } from "node:child_process";

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
			if (!settled) {
				settled = true;
				resolve(ok);
			}
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

/** Populate process.env from .env.local for values not already set. */
export function loadEnv() {
	if (process.env.YIPDB_MONGODB_URI) return;
	try {
		const raw = readFileSync(new URL("../../.env.local", import.meta.url), "utf-8");
		for (const line of raw.split("\n")) {
			const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
			if (m && !process.env[m[1]]) {
				process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
			}
		}
	} catch {}
}

/** Expand mongodb+srv:// to mongodb:// on Windows; pass through elsewhere. */
export async function resolveMongoUri(uri) {
	dns.setDefaultResultOrder("ipv4first");
	if (process.platform !== "win32") return uri;
	if (!uri.startsWith("mongodb+srv://")) return uri;
	const parsed = uri.match(
		/^mongodb\+srv:\/\/(?:([^@]+)@)?([^/?]+)([^?]*)?(?:\?(.*))?$/i
	);
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
			txtParams = txt.map((c) => c.join("")).join("&");
		} catch {}
		const params = new URLSearchParams(txtParams);
		if (!params.has("tls") && !params.has("ssl")) params.set("tls", "true");
		for (const [k, v] of new URLSearchParams(query)) params.set(k, v);
		return `mongodb://${creds ? creds + "@" : ""}${hosts}/${path.replace(/^\//, "")}?${params.toString()}`;
	} catch {
		return uri;
	}
}
