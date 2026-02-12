import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import LayoutContextWrapper from "@/components/commons/LayoutContexWrapper";
import AuthProvider, { userContext } from "@/components/commons/AuthProvider";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtPayloadUser } from "./actions/loginAction";


const JWT_SECRET = process.env.JWT_SECRET!;

const userCtx: userContext = {
	loggedIn: false
}

export const metadata: Metadata = {
  title: "YIP 코딩",
  description: "기계와 대화하는 언어를 배우는 곳",
};

const kr = Noto_Sans_KR({weight: "300", style: "normal"})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

	try {
		const cookieStore = await cookies()
		const token = cookieStore.get("token")?.value
		if (token) {
			const user = jwt.verify(token, JWT_SECRET) as JwtPayloadUser 
			userCtx.id = user.id
			userCtx.loggedIn = true
			userCtx.name = user.name
		} else{
			redirect("/login")
		}
	} catch(e) {
		redirect("/login")
	}

  return (
    <html lang="kr">
      <body
        className={`
					${kr.className} bg-zinc-100 flex sm:justify-center  antialiased`}
      >
				<AuthProvider userCtx={userCtx}>
					<LayoutContextWrapper>
						{children}
					</LayoutContextWrapper>
				</AuthProvider>
				<Toaster icons={{error: <OctagonXIcon className="size-4 text-red-500"/>}}/>
      </body>
    </html>
  );
}

