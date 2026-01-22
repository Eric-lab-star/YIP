import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";

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
					${kr.className}  flex justify-center antialiased`}
      >
				<div className="lg:w-[1300px] md:w-[1000px] sm:w-[800px] w-[400px]  ">
					{children}
				</div>
					<Toaster icons={{error: <OctagonXIcon className="size-4 text-red-500"/>}}/>
      </body>
    </html>
  );
}

