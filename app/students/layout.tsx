import { requireAuth } from "@/app/lib/auth/requireAuth";

// Reads cookies for the auth gate, so this subtree is never statically
// generated. Declared explicitly to skip the build-time prerender attempt.
export const dynamic = "force-dynamic";

/**
 * Auth gate for student records (PII). `students/[id]/page.tsx` additionally
 * checks what the caller may see; this ensures an unauthenticated request never
 * reaches that page at all.
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
	await requireAuth();
	return <>{children}</>;
}
