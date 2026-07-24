"use server";
import { cookies, headers } from "next/headers";
import * as z from "zod";

import { loginSchema } from "../lib/zod/loginSchema";
import { findStudent } from "../lib/mongo/students";
import { setLoginToken, validateToken } from "../lib/auth/login";
import {
  isLoginBlocked,
  recordLoginFailure,
  clearLoginAttempts,
} from "../lib/mongo/authRateLimit";

/**
 * Caller IP for rate-limiting. Behind Vercel's proxy `x-forwarded-for` is set
 * by the platform and cannot be spoofed by the client; the first entry is the
 * originating address. Falls back to a constant so a missing header degrades to
 * a shared bucket rather than to no limit at all.
 */
async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

export async function logoutAction() {
  const cookiesStore = await cookies();
  cookiesStore.set("logInToken", "", {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
  });
}

interface LoginSuccess {
  success: true;
  userInfo: {
    loggedIn: boolean;
    id: string;
    name: string;
    role: string;
  };
}

interface LoginFail {
  success: false;
  /** Set when the attempt was refused by the brute-force limiter, not by bad credentials. */
  rateLimited?: true;
  retryAfterSec?: number;
}

export async function loginVerfyAction() {
  const result = await validateToken();
  return result;
}

/**
 *  loginAction creates user token
 **/
export async function loginAction(
  data: z.infer<typeof loginSchema>,
): Promise<LoginSuccess | LoginFail> {
  try {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
      };
    }

    // Credentials are a name + phone number with no password, so this endpoint
    // must be throttled or the phone-number space is walkable. Checked before
    // touching the DB; only failures are counted, and a success clears them.
    const ip = await clientIp();
    const gate = await isLoginBlocked(ip, data.name);
    if (gate.blocked) {
      return {
        success: false,
        rateLimited: true,
        retryAfterSec: gate.retryAfterSec,
      };
    }

    const student = await findStudent(
      data.name,
      data.phoneNumber.replace(/-/g, ""),
    );

    if (!student) {
      await recordLoginFailure(ip, data.name);
      return {
        success: false,
      };
    }

    const userInfo = {
      loggedIn: true,
      id: student._id.toString(),
      name: student.name,
      role: student.role,
    };

    await clearLoginAttempts(ip, data.name);
    await setLoginToken(userInfo);

    return {
      success: true,
      userInfo,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
}
