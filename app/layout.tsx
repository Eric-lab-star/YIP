import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
					${geistSans.variable} ${geistMono.variable} antialiased
					bg-zinc-200 lg:w-[1280] mx-auto md:w-[1280] space-y-3 `}
      >
        {children}
      </body>
    </html>
  );
}
