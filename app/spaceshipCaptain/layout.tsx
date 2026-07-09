import LessonPager from "@/components/commons/LessonPager";
import OnThisPage from "@/components/commons/OnThisPage";

// Same layout as tourOfPython — in-page TOC + prev/next pager aligned to the
// MDX content width (max-w-3xl px-6).
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
