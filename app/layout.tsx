import type { Metadata } from "next";
import "./globals.css";
import { orbit } from "./stores/font";


export const metadata: Metadata = {
  title: "Academia",
  description: "Learn code with arduino",
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
					${orbit.className} antialiased
					lg:bg-zinc-200 lg:w-[1000px] mx-auto md:w-[900px] md:bg-zinc-400 sm:bg-zinc-600 min-w-[400px] bg-zinc-200 space-y-3 `}
      >
        {children}
      </body>
    </html>
  );
}
