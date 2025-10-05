"use server";
import { LoginInputs } from "../(landing)/components/LoginForm";
import { getDB } from "./db";
import { Users } from "./users";

export async function loginAction(formData: LoginInputs){
	try {
		const userId = formData.name
		const password = formData.password
		const db = await getDB();
		const user = await db.collection<Users>("users").findOne({name: userId});

		if (user && (user.password == password)) {
			console.log("login success");
			return {
				message: "login success",
				auth: true,
				userId: user._id.toString()
			} 
		} else {
			console.log("login fail");
			return  {
				message: "login fail",
				auth: false,
				userId: ""
			}
		}
	} catch(e) {
		console.log(e)
	}

}
