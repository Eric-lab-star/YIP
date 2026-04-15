import type { Metadata } from "next";
import "./styles/globals.css";
import { IBM_Plex_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/commons/AppSideBar";
import Header from "@/components/commons/Header";

export const metadata: Metadata = {
	title: "YIP",
	description: "기계와 대화하는 언어를 배우는 곳",
	openGraph: {
		title: "YIP | 상상이 현실이 되는 코딩 아카데미",
		description:
			"상상하는 것이 현실이 되는 곳, 기계와 대화하는 언어를 배우는 곳. Python과 Arduino로 나만의 프로젝트를 만들어보세요.",
		url: "https://yipcode.xyz",
		siteName: "YIP",
		locale: "ko_KR",
		images: [
			{
				url: "https://r2.kimkyungsub.com/YIP_logo_v0.0.1.png",
				width: 1200,
				height: 630,
				alt: "YIP - 상상이 현실이 되는 코딩 아카데미",
				type: "image/png",
			},
		],
		type: "website",
	},
};

const kr = IBM_Plex_Sans_KR({
	weight: "400",
	style: "normal",
	subsets: ["latin", "latin-ext"],
	fallback: ["sans-serif", "arial", "system-ui"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="kr-ko">
			<body
				className={`${kr.className} flex sm:justify-center  antialiased`}
			>
				<SpeedInsights />
				<SidebarProvider defaultOpen={false} >
					<AppSideBar />
					<main className="w-full h-dvh flex flex-col ">
						<Header />
						<div className="xl:w-7xl lg:w-5xl md:w-3xl sm:w-160 mx-auto ">
							{children}
						</div>
					</main>
				</SidebarProvider>
				<Toaster
					icons={{ error: <OctagonXIcon className="size-4 text-red-500" /> }}
				/>
			</body>
		</html>
	);
}
