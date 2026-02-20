import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
export const TokenMaxAge = 60 * 60 * 20;

export interface JwtPayloadUser {
  id: string;      // userId
  name: string;
};


export function signAccessToken(payload: JwtPayloadUser) {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: TokenMaxAge, // access token은 짧게
  });
}

export interface ValidationSuccess extends JwtPayloadUser {
	success: true,
}

export interface ValidationFail {
	success: false,
}

export async function validateToken(): Promise<ValidationFail | ValidationSuccess> {
	try {
		const cookiesStore = await cookies();
		const token = cookiesStore.get("logInToken");
		if (!token) {
			return {success: false}
		}
		if (token.value) {
			 const result =  jwt.verify(token.value, JWT_SECRET) as JwtPayloadUser 
			return {...result, success: true} 
		}
		return {success: false}
	} catch(e) {
		return {success: false}
	}
}


export async function setLoginToken(userInfo:  JwtPayloadUser ) {
	
		const token = signAccessToken(userInfo)
		const cookieStore = await cookies()

		cookieStore.set("logInToken", token, {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax",
			maxAge: TokenMaxAge 
		})
	
}
