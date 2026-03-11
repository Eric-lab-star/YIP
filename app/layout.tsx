import type { Metadata } from "next";
import "./globals.css";

import { IBM_Plex_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import LayoutContextWrapper from "@/components/commons/LayoutContexWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "YIP",
  description: "기계와 대화하는 언어를 배우는 곳",
  openGraph: {
    title: "YIP",
    description: `
		상상하는 것이 현실이 되는 곳,
		기계와 대화하는 언어를 배우는 곳,
		YIP!
		`,
    url: "https://yipcode.xyz",
    siteName: "YIP",
    images: [
      {
        url: "https://r2.kimkyungsub.com/YIP_logo_v0.0.1.png",  // 미리보기 이미지
        width: 1200,
        height: 630,
        alt: "상상만하면 이루어진다.",
      },
    ],
    type: "website",
  },
};

const kr = IBM_Plex_Sans_KR(
	{
		weight: "400",
		style: "normal",
		subsets: ['latin', 'latin-ext'],
		fallback: ["sans-serif", "arial", "system-ui"],
	})


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="kr">
      <body className={`${kr.className} bg-zinc-100 flex sm:justify-center  antialiased`} >
					<SpeedInsights/>
					<LayoutContextWrapper>
						{children}
					</LayoutContextWrapper>
				<Toaster icons={{error: <OctagonXIcon className="size-4 text-red-500"/>}}/>
      </body>
    </html>
  );
}

