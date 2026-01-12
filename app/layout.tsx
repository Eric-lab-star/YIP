import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import AuthProvider, { userContext } from "@/components/commons/AuthProvider";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoginJWTPayload } from "./actions/loginAction";
import { notFound, redirect } from "next/navigation";

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

	const user: userContext = {
		loggedIn: false,
	}

	try {
		const store = await cookies()
		const token = store.get("token")

		if (token) {
			const verified = jwt.verify(token.value, process.env.JWT_SECRET!) as  LoginJWTPayload
			user.id = verified.id
			user.loggedIn = true
			user.name = verified.name
		}
	} catch(e) {
		console.log(e)
		redirect("/login")
	}

  return (
    <html lang="kr">
      <body
        className={`
					${kr.className} h-screen  select-none antialiased
					 lg:w-[1024px] mx-auto md:w-[768px] sm:w-[640px] w-[400px]   bg-zinc-100 `}
      >
				<AuthProvider userCtx={user}>
					{children}
					<Toaster icons={{error: <OctagonXIcon className="size-4 text-red-500"/>}}/>
				</AuthProvider>
      </body>
    </html>
  );
}
