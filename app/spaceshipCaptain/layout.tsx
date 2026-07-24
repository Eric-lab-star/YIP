import LessonPager from "@/components/commons/LessonPager";
import OnThisPage from "@/components/commons/OnThisPage";
import { requireAuth } from "@/app/lib/auth/requireAuth";

// Reads cookies for the auth gate, so this subtree is never statically
// generated. Declared explicitly to skip the build-time prerender attempt.
export const dynamic = "force-dynamic";

// Same layout as tourOfPython — in-page TOC + prev/next pager aligned to the
// MDX content width (max-w-3xl px-6).
export default async function Layout({ children }: { children: React.ReactNode }) {
  // Lesson content is paid/gated — verify the token here, not just in proxy.ts.
  await requireAuth();

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-6 pt-8">
        <OnThisPage />
      </div>
      {children}
      <div className="mx-auto w-full max-w-3xl px-6 pb-16">
        <LessonPager />
      </div>
    </>
  );
}
