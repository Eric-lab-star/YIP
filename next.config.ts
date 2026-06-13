import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import dns from "dns";
dns.setDefaultResultOrder('ipv4first');
const nextConfig: NextConfig = {
	env: {},
	reactStrictMode: false,
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
