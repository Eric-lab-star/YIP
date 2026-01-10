"use server";
import { cookies } from "next/headers";
import * as z from "zod";

import jwt, { JwtPayload } from "jsonwebtoken";
import { loginSchema } from "../lib/zod/loginSchema";
import { findStudent } from "../lib/mongo/students";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface LoginJWTPayload extends JwtPayload {
	userId: string;
	name: string;
	iamge: string;
}


export interface LoginActionRes {
	login: boolean;
	message: string;
}

export async function validateToken() {
	try {
		const cookiesStore = await cookies();
		const token = cookiesStore.get("token")?.value;
		if (!process.env.JWT_SECRET) {
			throw new Error("Server error, JWT token is missing");
		}
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET) as LoginJWTPayload
			return true 
		}
	} catch(e) {
		return false
	}
}

export async function logoutAction() {
	const cookiesStore = await cookies();
	cookiesStore.delete("token")
}

export type JwtPayloadUser = {
  id: string;      // userId
  name: string;
	phoneNumber: string;
};

function signAccessToken(payload: JwtPayloadUser) {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m", // access token은 짧게
  });
}

function signRefreshToken(payload: Pick<JwtPayloadUser, "id">) {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "4h",
  });
}



export async function loginAction(data: z.infer<typeof loginSchema>){


	try {
		const result = loginSchema.safeParse(data)
		if (!result.success) {
			return false
		}
		const student = await findStudent(data.name, data.phoneNumber)
		if (!student) {
			return false
		}

		const token = signAccessToken({id: student._id.toString(), name: student.name, phoneNumber: student.studentPhoneNumber.join("")})
		const cookieStore = await cookies()
		cookieStore.set("token", token)

		return true

	} catch(e) {
		
	}
}
