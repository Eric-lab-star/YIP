"use server";
import { cookies } from "next/headers";
import * as z from "zod";

import { loginSchema } from "../lib/zod/loginSchema";
import { findStudent } from "../lib/mongo/students";
import { setLoginToken, validateToken } from "../lib/auth/login";
import { redirect } from "next/navigation";


export async function logoutAction() {
	const cookiesStore = await cookies();
	cookiesStore.set("logInToken","", {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax",
			maxAge: 0
	})
	redirect("/login")
}


interface LoginSuccess {
	success: true
	userInfo: {
		loggedIn: boolean;
		id: string;
		name: string;
	}
}

interface LoginFail {
	success: false
}

export async function loginVerfyAction() {
	const result = await validateToken()
	return result
}


/**
	*  loginAction creates user token 
	**/
export async function loginAction(data: z.infer<typeof loginSchema>): Promise<LoginSuccess | LoginFail> {

	try {
		const result = loginSchema.safeParse(data)
		if (!result.success) {
			return {
				success: false,
			} 
		}

		const student = await findStudent(data.name, data.phoneNumber)
		if (!student) {
			return {
				success: false,
			} 
		}

		const userInfo= {
			loggedIn: true,
			id: student._id.toString(),
			name: student.name,
		}

		await setLoginToken(userInfo)

		return {
			success: true,
			userInfo, 
		} 

	} catch(e) {
		return {
			success: false,
		} 
	}
}
