import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { isTokenRevoked } from "../mongo/revocation";

const JWT_SECRET = process.env.JWT_SECRET!;

// Access-token lifetime. Was 20h; shortened to bound how long a leaked or
// no-longer-authorized token stays usable. Tunable without a code change via
// TOKEN_MAX_AGE_HOURS (default 6h). Login is low-friction (name + phone), so a
// shorter window costs little in re-logins. Revocation (below) covers the gap
// until a token naturally expires.
const TOKEN_MAX_AGE_HOURS = Number(process.env.TOKEN_MAX_AGE_HOURS ?? 6);
export const TokenMaxAge = Math.round(TOKEN_MAX_AGE_HOURS * 60 * 60);

export interface JwtPayloadUser {
	id: string;      // userId
	name: string;
	role: string;
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
			return { success: false }
		}
		if (token.value) {
			const result = jwt.verify(token.value, JWT_SECRET, {
				algorithms: ["HS256"],
			}) as JwtPayloadUser & { iat?: number }
			// Enforce the revocation list: a deleted/disabled user's still-valid
			// token is rejected here even though its signature checks out.
			if (await isTokenRevoked(result.id, result.iat)) {
				return { success: false }
			}
			return { ...result, success: true }
		}
		return { success: false }
	} catch (e) {
		console.log(e)
		return { success: false }
	}
}


export async function setLoginToken(userInfo: JwtPayloadUser) {

	const token = signAccessToken(userInfo)
	const cookieStore = await cookies()

	cookieStore.set("logInToken", token, {
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		sameSite: "lax",
		maxAge: TokenMaxAge
	})

}
