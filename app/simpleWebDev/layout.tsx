import LessonPager from "@/components/commons/LessonPager";
import OnThisPage from "@/components/commons/OnThisPage";

// Unlike tourOfPython / spaceshipCaptain / AIDeveloper, this section is not
// login-gated: it is absent from the proxy.ts matcher and already listed in
// sitemap.ts, matching /Algorithm's "leave it crawlable" strategy. So there is
// deliberately no requireAuth() here — adding one would 307 every search
// visitor to /login.
//
// RelatedProblems is omitted too: it maps chapter slugs onto judge problems,
// and Streamlit apps aren't judged.
export default function Layout({ children }: { children: React.ReactNode }) {
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
