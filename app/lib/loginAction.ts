"use server";
import { cookies } from "next/headers";
import { getDB } from "../lib/mongo/db";
import { IUser } from "../lib/users";
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


export async function loginAction(formData: LoginInputs): Promise<LoginActionRes>{
	try {
		const userId = formData.name
		const password = formData.password
		const db = await getDB();
		const user = await db.collection<IUser>("users").findOne({name: userId});

		if (!process.env.JWT_SECRET) {
			throw new Error("server error: JWT SECRET is missing");
		}

		if (!user) {
			return {
				login: false,
				message: "잘못된 이름입니다."
			}
		}

		if (user.password !== password ) {
			return {
				login: false,
				message: "비밀번호 오류입니다."
			}
		}

		if (user && (user.password == password)) {
			const cookiesStore = await cookies()
			const token = jwt.sign(
				{
					userId: user._id.toString(),
					name: user.name,
					image: user.image,
				},
				process.env.JWT_SECRET,
				{expiresIn: "2h", algorithm: "HS256"}
			);
			cookiesStore.set("token", token)
			console.log("login success");
			return {
				login: true,
				message: "login success"
			}
		} else {
			console.log("login fail");
			return {
				login: false,
				message: "login failed"
			} 
		}
	} catch(e) {
		console.log("error");
		return {
			login: false,
			message: `${e}`
		}
	}
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
