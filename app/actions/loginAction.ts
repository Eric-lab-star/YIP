"use server";
import { cookies } from "next/headers";

import jwt, { JwtPayload } from "jsonwebtoken";

export interface LoginJWTPayload extends JwtPayload {
	userId: string;
	name: string;
	iamge: string;
}


export interface LoginActionRes {
	login: boolean;
	message: string;
}



export async function validateLogin() {
	try {
		const cookiesStore = await cookies();
		const token = cookiesStore.get("token")?.value;
		if (!process.env.JWT_SECRET) {
			throw new Error("Server error, JWT token is missing");
		}
		if (token) {
			const payload = jwt.verify(token, process.env.JWT_SECRET) as LoginJWTPayload
			return payload
		}
	} catch(e) {
		console.log(e);
	}
}

export async function logoutAction() {
	const cookiesStore = await cookies();
	cookiesStore.delete("token")
}
