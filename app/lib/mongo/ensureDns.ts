import dns from "dns";
import { promisify } from "util";

// --- Why this file exists -------------------------------------------------
// On Windows, Node 24's bundled c-ares fails at mongodb+srv:// SRV lookups:
// `dns.resolveSrv` / `dns.resolveTxt` (raw c-ares) die with ECONNREFUSED,
// because c-ares either can't enumerate the OS resolvers (falls back to the
// dead default 127.0.0.1) or picks a dead VPN/virtual-adapter resolver first.
// Calling `dns.setServers()` does NOT repair the driver's SRV lookup — the
// driver's c-ares channel stays broken.
//
// Crucially, ordinary socket connects use getaddrinfo (the OS resolver), which
// works fine — that's why the rest of the app resolves hostnames normally.
// So the fix is to expand the SRV URI OURSELVES using a dedicated
// dns.Resolver with explicitly-set, probe-verified servers (that path works),
// then hand the driver a plain mongodb:// seed-list URI. The driver then does
// no SRV lookup and connects to the resolved hosts via getaddrinfo.
//
// This only rewrites on Windows; on Linux/Vercel the driver's native SRV
// handling is fine and the original URI is returned untouched.
// -------------------------------------------------------------------------

const PUBLIC_FALLBACKS = ["1.1.1.1", "8.8.8.8"];
const isIPv4 = (s: string) => /^\d{1,3}(\.\d{1,3}){3}$/.test(s);

/** Read every adapter's IPv4 DNS servers from the OS (Windows only). */
function osDnsServers(): string[] {
	try {
		const { execSync } = require("child_process") as typeof import("child_process");
		const out = execSync(
			'powershell -NoProfile -Command "(Get-DnsClientServerAddress -AddressFamily IPv4).ServerAddresses"',
			{ encoding: "utf8", timeout: 5000 }
		);
		return out
			.split(/\r?\n/)
			.map((s) => s.trim())
			.filter((s) => isIPv4(s) && s !== "127.0.0.1");
	} catch (e) {
		console.warn("[mongo] failed to read OS DNS servers:", e);
		return [];
	}
}

/** True if `server` answers an SRV query for `srvName` within `timeoutMs`. */
function probe(server: string, srvName: string, timeoutMs: number): Promise<boolean> {
	return new Promise((resolve) => {
		const r = new dns.Resolver({ timeout: timeoutMs, tries: 1 });
		r.setServers([server]);
		let settled = false;
		const done = (ok: boolean) => {
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

/** Probe candidate resolvers and return those that actually answer `srvName`,
 *  preferring OS resolvers, then public fallbacks. */
async function findWorkingServers(srvName: string): Promise<string[]> {
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

/**
 * On Windows, expand a mongodb+srv:// URI into a plain mongodb:// seed-list URI
 * (resolving SRV + TXT ourselves via a working resolver) so the driver never
 * performs the broken c-ares SRV lookup. Returns the URI unchanged on other
 * platforms, for non-srv URIs, or if resolution can't be completed.
 */
export async function resolveMongoUri(uri: string): Promise<string> {
	dns.setDefaultResultOrder("ipv4first");
	if (process.platform !== "win32") return uri;
	if (!uri.startsWith("mongodb+srv://")) return uri;

	// mongodb+srv://[creds@]host[/db][?query]
	const parsed = uri.match(/^mongodb\+srv:\/\/(?:([^@]+)@)?([^/?]+)([^?]*)?(?:\?(.*))?$/i);
	if (!parsed) return uri;
	const creds = parsed[1] ?? "";
	const host = parsed[2];
	const path = parsed[3] ?? "";
	const query = parsed[4] ?? "";

	const srvName = `_mongodb._tcp.${host}`;
	try {
		const servers = await findWorkingServers(srvName);
		if (servers.length === 0) {
			console.warn("[mongo] no DNS server answered SRV; leaving URI as-is");
			return uri;
		}

		const resolver = new dns.Resolver();
		resolver.setServers(servers);
		const resolveSrv = promisify(resolver.resolveSrv.bind(resolver));
		const resolveTxt = promisify(resolver.resolveTxt.bind(resolver));

		const srv = await resolveSrv(srvName);
		if (!srv.length) return uri;
		const hosts = srv.map((r) => `${r.name}:${r.port}`).join(",");

		// TXT carries authSource / replicaSet; optional.
		let txtParams = "";
		try {
			const txt = await resolveTxt(host);
			txtParams = txt.map((chunks) => chunks.join("")).join("&");
		} catch {
			/* no TXT record — fine */
		}

		// Param precedence: TXT defaults < srv-implied tls=true < user query.
		const params = new URLSearchParams(txtParams);
		if (!params.has("tls") && !params.has("ssl")) params.set("tls", "true");
		for (const [k, v] of new URLSearchParams(query)) params.set(k, v);

		const db = path.replace(/^\//, "");
		const seedlist = `mongodb://${creds ? creds + "@" : ""}${hosts}/${db}?${params.toString()}`;
		console.log("[mongo] expanded SRV to seed-list via", servers[0], "->", hosts);
		return seedlist;
	} catch (e) {
		console.warn("[mongo] SRV expansion failed; leaving URI as-is:", e);
		return uri;
	}
}
