import { requireAuth } from "@/app/lib/auth/requireAuth";

// Reads cookies for the auth gate, so this subtree is never statically
// generated. Declared explicitly to skip the build-time prerender attempt.
export const dynamic = "force-dynamic";

/**
 * Auth gate for the chat section. The chat APIs authorize every call on their
 * own, but the page shell should not render for an unauthenticated visitor
 * either — `proxy.ts` alone is only a fast redirect, not a boundary.
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
	await requireAuth();
	return <>{children}</>;
}
