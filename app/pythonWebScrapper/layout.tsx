import AuthProvider, { userContext }  from "@/components/commons/AuthProvider";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtPayloadUser } from "../actions/loginAction";


const JWT_SECRET = process.env.JWT_SECRET!;
export default async function Layout({children}:{children: React.ReactNode}) {
	const userCtx: userContext = {
		loggedIn: false
	}

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
		<div className="p-5">
			<AuthProvider userCtx={userCtx}>
				<div>
					{children}
				</div>
			</AuthProvider>
		</div>
	)
}

