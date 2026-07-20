import { requireAuth } from "@/app/lib/auth/requireAuth";

// Reads cookies for the auth gate, so this subtree is never statically
// generated. Declared explicitly to skip the build-time prerender attempt.
export const dynamic = "force-dynamic";

/**
 * Auth gate for the whole AIDeveloper curriculum. Lesson content is gated, and
 * `proxy.ts` only performs a fast redirect — this is the boundary that actually
 * verifies the token's signature before any lesson renders.
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
	await requireAuth();
	return <>{children}</>;
}
