import Banner from "@/components/commons/Banner";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const JWT_SECRET = process.env.JWT_SECRET!;

export default async function Layout({children}:{children: React.ReactNode}) {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get("token")?.value
		if (token) {
			jwt.verify(token, JWT_SECRET)
		}
	} catch(e) {
//		redirect("/login")
	}


	return (
		<div>
			<Banner id="pythonBannerBasic.png" />
			<div className="z-10 relative top-[-20]">
				{children}
			</div>
		</div>
	)
	
}


