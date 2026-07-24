"use client";

import { tourOfPythonPages } from "@/utils/curriculum/tourOfPython";
import { spaceshipCaptainPages } from "@/utils/curriculum/spaceshipCaptain";
import { simpleWebDevPages } from "@/utils/curriculum/simpleWebDev";
import type { LessonPage } from "@/utils/curriculum/pageSequence";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Each curriculum section registers its flat page sequence here. The pager
// picks the right one from the URL, so tourOfPython and spaceshipCaptain (and
// any future section) share identical prev/next behavior.
const SECTION_PAGES: Record<string, LessonPage[]> = {
  tourOfPython: tourOfPythonPages,
  spaceshipCaptain: spaceshipCaptainPages,
  simpleWebDev: simpleWebDevPages,
};

/**
 * Bottom-of-page previous/next navigation for lesson sections. The sequence is
 * derived from the section's sidebar curriculum, so it stays in sync
 * automatically. Renders nothing on pages that aren't part of a sequence.
 */
export default function LessonPager() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const section = pathname.split("/")[1];
  const pages = SECTION_PAGES[section];
  if (!pages) return null;

  const index = pages.findIndex((p) => p.url === pathname);
  if (index === -1) return null;

  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;

  const current = index + 1;
  const total = pages.length;
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mt-16 border-t pt-6">
      {/* Progress: how far through the section this lesson is. */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-amber-400 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-bold text-muted-foreground">
          {current} / {total}
        </span>
      </div>

      <nav
        aria-label="레슨 이동"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {prev ? (
        <Link
          href={prev.url}
          className="group flex flex-col rounded-xl border p-4 transition-colors hover:border-amber-400 hover:bg-accent"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            이전
          </span>
          <span className="mt-1 font-bold group-hover:text-amber-500">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={next.url}
          className="group flex flex-col rounded-xl border p-4 text-right transition-colors hover:border-amber-400 hover:bg-accent sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            다음
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1 font-bold group-hover:text-amber-500">
            {next.label}
          </span>
        </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
      </nav>
    </div>
  );
}
