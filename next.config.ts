import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
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
	}
};


export default nextConfig;
