import AuthProvider, { userContext }  from "@/components/commons/AuthProvider";
import Banner from "@/components/commons/Banner";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtPayloadUser } from "../actions/loginAction";
import Link from "next/link";
import SideBarWrapper from "@/components/commons/SideBar";


const JWT_SECRET = process.env.JWT_SECRET!;
export default async function Layout({children}:{children: React.ReactNode}) {
	console.info("pythonScrapper layout..")
	
	const userCtx: userContext = {
		loggedIn: false
	}

	try {
		const cookieStore = await cookies()
		const token = cookieStore.get("token")?.value
		console.info("pythonScrapper layout: verifying token...")
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
		<div className="flex ">
			<AuthProvider userCtx={userCtx}>
				<SideBarWrapper />
				<div>
					<Link href={"/pythonWebScrapper"} >
						<Banner id="pythonBannerBasic.png" />
					</Link>
					<div className="">
						{children}
					</div>
				</div>
			</AuthProvider>
		</div>
	)
	
}

