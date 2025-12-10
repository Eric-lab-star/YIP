import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'yip-images.ed1e8d8002bf58058e6e7f5bb887c868.r2.cloudflarestorage.com',
				port: '',
				pathname: '**/*',
			},
		]
	}
};


export default nextConfig;
