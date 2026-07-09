"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

/**
 * "이 페이지에서" — an in-page table of contents for long lesson pages.
 * Our MDX anchors are `<span id="…" />` placed right before an h2/h3, so this
 * scans the rendered article for id'd elements and pairs them with the heading
 * text that follows. Renders a collapsed <details> box, and only on pages with
 * enough sections (>= 4) so short pages stay clean.
 */
export default function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) {
      setHeadings([]);
      return;
    }

    const found: Heading[] = [];
    article.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
      let heading: HTMLElement | null = null;
      const tag = el.tagName;
      if (tag === "H2" || tag === "H3") {
        heading = el;
      } else {
        const next = el.nextElementSibling as HTMLElement | null;
        if (next && (next.tagName === "H2" || next.tagName === "H3")) {
          heading = next;
        }
      }
      if (!heading || !el.id) return;
      const text = heading.textContent?.trim() ?? "";
      if (text) {
        found.push({ id: el.id, text, level: heading.tagName === "H2" ? 2 : 3 });
      }
    });
    setHeadings(found);
  }, [pathname]);

  if (headings.length < 4) return null;

  return (
    <details className="group my-6 rounded-xl border-2 border-[#263D5B] bg-[#FFFDF7] px-4 py-3 text-sm">
      <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-[#263D5B]">
        <span>📑 이 페이지에서</span>
        <span className="text-xs font-normal text-muted-foreground">
          ({headings.length})
        </span>
        <span className="ml-auto text-xs text-muted-foreground transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <ul className="mt-3 space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-[#263D5B]/80 hover:font-bold hover:text-amber-600"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
