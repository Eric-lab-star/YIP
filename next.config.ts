import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import dns from "dns";
dns.setDefaultResultOrder('ipv4first');

// Node 24's bundled c-ares can fail to enumerate DNS servers on Windows (e.g.
// with two active adapters) and falls back to its hardcoded default 127.0.0.1,
// where nothing listens — every mongodb+srv:// SRV lookup then dies with
// ECONNREFUSED. When we detect that dead default, pull the machine's real
// resolvers from the OS and hand them to c-ares. No hardcoded IPs, so it keeps
// working on any network.
if (process.platform === "win32" && dns.getServers().join() === "127.0.0.1") {
	try {
		const { execSync } = require("child_process") as typeof import("child_process");
		const out = execSync(
			'powershell -NoProfile -Command "(Get-DnsClientServerAddress -AddressFamily IPv4).ServerAddresses"',
			{ encoding: "utf8", timeout: 5000 }
		);
		const servers = [
			...new Set(
				out
					.split(/\r?\n/)
					.map((s) => s.trim())
					.filter((s) => /^\d{1,3}(\.\d{1,3}){3}$/.test(s) && s !== "127.0.0.1")
			),
		];
		if (servers.length > 0) {
			dns.setServers(servers);
			console.log("[next.config] c-ares fell back to 127.0.0.1; using OS DNS:", servers);
		}
	} catch (e) {
		console.warn("[next.config] failed to read OS DNS servers:", e);
	}
}
const nextConfig: NextConfig = {
	env: {},
	reactStrictMode: false,
	// Rewrite barrel-file imports (e.g. `import { X } from "lucide-react"`) to
	// deep per-module imports so each route only bundles the icons/components it
	// actually uses instead of pulling the whole package. lucide-react is used
	// across nearly every page; the Radix primitives and date-fns benefit too.
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"radix-ui",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-select",
			"@radix-ui/react-popover",
			"date-fns",
		],
	},
	// Let .md / .mdx files under app/ be treated as routes (e.g. noteBook/goal/page.mdx)
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'yip-images.ed1e8d8002bf58058e6e7f5bb887c868.r2.cloudflarestorage.com',
				port: '',
				pathname: '**/*',
			},
			new URL('https://pub-4507544ab1a54f5a999f046097091e6c.r2.dev/**'),
			new URL('https://r2.kimkyungsub.com/**')
		]
	},
};

// Pass remark plugins as serializable string names — required because Next 16
// runs on Turbopack, which serializes the config and can't take function refs.
const withMDX = createMDX({
	options: {
		remarkPlugins: [['remark-gfm']],
	},
});

export default withMDX(nextConfig);
