import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Academia",
  description: "Learn code with arduino",
};


const kr = Noto_Sans_KR({weight: "300", style: "normal"})
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body
        className={`
					${kr.className} select-none antialiased
					 lg:w-[1024px] mx-auto md:w-[768px] sm:w-[640px] w-[400px]   bg-zinc-100 space-y-3 `}
      >
        {children}
				<Toaster/>
      </body>
    </html>
  );
}
