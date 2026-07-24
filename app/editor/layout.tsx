import { requireAuth } from "@/app/lib/auth/requireAuth";

// Reads cookies for the auth gate, so this subtree is never statically
// generated. Declared explicitly to skip the build-time prerender attempt.
export const dynamic = "force-dynamic";

/**
 * Auth gate for the post editor. Post CRUD is separately ownership-checked in
 * `app/api/tiptab/*`; this stops the editor shell rendering for a visitor who
 * never authenticated.
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
	await requireAuth();
	return <>{children}</>;
}
