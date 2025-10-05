"use server";
import { cookies } from "next/headers";
import { LoginInputs } from "../(landing)/components/LoginForm";
import { getDB } from "./db";
import { Users } from "./users";
import jwt, { JwtPayload } from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export interface LoginJWTPayload extends JwtPayload {
	userId: string;
	name: string;
	iamge: string;
}


export async function loginAction(formData: LoginInputs){
	try {
		const userId = formData.name
		const password = formData.password
		const db = await getDB();
		const user = await db.collection<Users>("users").findOne({name: userId});

		if (!process.env.JWT_SECRET) {
			throw new Error("server error: JWT SECRET is missing");
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
			return true
		} else {
			console.log("login fail");
			return  false
		}
	} catch(e) {
		console.log("error");
		return false
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
