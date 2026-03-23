import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
      {
        source: '/game/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
      {
        // iframe을 사용하는 페이지 자체에도 적용
        source: "/game",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
	},
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
	},
  webpack: (config) => {
    config.watchOptions = {
			ignored: [`**/public/game/**`, `**/node_moduels/**`],
    }
    return config
  },
};


export default nextConfig;
