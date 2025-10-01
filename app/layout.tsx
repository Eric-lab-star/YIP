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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
					${geistSans.variable} ${geistMono.variable} antialiased
					bg-zinc-200 lg:w-screen lg:px-15 md:w-screen space-y-3 `}
      >
        {children}
      </body>
    </html>
  );
}
