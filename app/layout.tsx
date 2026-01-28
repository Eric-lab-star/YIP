import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import LayoutContextWrapper from "@/components/commons/LayoutContexWrapper";

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
					${kr.className} bg-zinc-100 flex sm:justify-center  antialiased`}
      >
					<LayoutContextWrapper>
						{children}
					</LayoutContextWrapper>
					<Toaster icons={{error: <OctagonXIcon className="size-4 text-red-500"/>}}/>
      </body>
    </html>
  );
}

