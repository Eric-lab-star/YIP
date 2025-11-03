import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoginJWTPayload } from "../actions/loginAction";

export async function getUserFromCookie(){
		if (!process.env.JWT_SECRET) {
			throw new Error("server error: JWT SECRET is missing");
		}
		const cookiesStore = await cookies()
		const token = cookiesStore.get("token")?.value;
		if (token === "" || !token) {
			return null;
		}
		try {
			const decode =  jwt.verify(token, process.env.JWT_SECRET) as LoginJWTPayload;
			return decode
		} catch(e) {
			console.log(e)
			return null;
		}
}
