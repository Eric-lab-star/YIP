import { redirect } from "next/navigation";
import { validateToken, type ValidationSuccess } from "./login";

/**
 * Server-side gate for a protected section. Verifies the JWT's *signature* (not
 * merely the cookie's presence) and redirects to /login when it doesn't hold.
 *
 * `proxy.ts` also gates these routes, but a middleware redirect is only ever a
 * fast path — it must not be the sole boundary. Calling this in a section's
 * `layout.tsx` means the content cannot render without a valid token, whatever
 * happens upstream.
 *
 * Note this makes the subtree dynamic (it reads cookies). That is intended:
 * gated content must not be statically generated and served from cache.
 */
export async function requireAuth(): Promise<ValidationSuccess> {
	const auth = await validateToken();
	if (!auth.success) {
		redirect("/login");
	}
	return auth;
}

/** As `requireAuth`, but additionally requires the `admin` role. */
export async function requireAdmin(): Promise<ValidationSuccess> {
	const auth = await requireAuth();
	if (auth.role !== "admin") {
		redirect("/");
	}
	return auth;
}
