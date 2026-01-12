import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import AuthProvider, { userContext } from "@/components/commons/AuthProvider";

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
					${kr.className} h-screen  select-none antialiased
					 lg:w-[1024px] mx-auto md:w-[768px] sm:w-[640px] w-[400px]   bg-zinc-100 `}
      >
					{children}
					<Toaster icons={{error: <OctagonXIcon className="size-4 text-red-500"/>}}/>
      </body>
    </html>
  );
}
