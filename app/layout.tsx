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
					${orbit.className} select-none antialiased
					 lg:w-[1024px] mx-auto md:w-[768px] sm:w-[640px] w-[400px]   bg-zinc-200 space-y-3 `}
      >
        {children}
      </body>
    </html>
  );
}
