import LessonPager from "@/components/commons/LessonPager";
import OnThisPage from "@/components/commons/OnThisPage";

// The MDX content already centers itself (mdx-components wrapper: max-w-3xl,
// px-6). This layout only adds the in-page TOC and prev/next pager in matching
// max-w-3xl px-6 containers so they align with the content on every screen.
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
