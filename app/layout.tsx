import type { Metadata } from "next";
import "./globals.css";
import { notosansKorean } from "./stores/font";


export const metadata: Metadata = {
  title: "DDokDDok",
  description: "똑똑한 똑똑 코딩 ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
					${notosansKorean.className} antialiased
					bg-zinc-200 lg:w-[1280] mx-auto md:w-[1280] space-y-3 `}
      >
        {children}
      </body>
    </html>
  );
}
