"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

/**
 * Sections that render without the lesson sidebar. Kept next to the shell so
 * the server-rendered default and Header's per-navigation sync read the same
 * list instead of drifting apart.
 */
export const SIDEBAR_CLOSED_SECTIONS = new Set(["", "students", "login", "editor"]);

export function sidebarOpenFor(pathname: string) {
  return !SIDEBAR_CLOSED_SECTIONS.has(pathname.split("/")[1]);
}

/**
 * Wraps SidebarProvider so its initial open state is decided from the URL
 * during the very first render instead of being corrected afterwards.
 *
 * This is a client component, but it still renders on the server, and
 * `usePathname()` resolves there — including at build time for prerendered
 * routes — so no dynamic rendering is forced and `/` and `/Algorithm/*` keep
 * their static prerender.
 *
 * Why it matters: the root layout used to hard-code `defaultOpen={false}` and
 * Header's effect flipped it to open on lesson routes after hydration. The
 * sidebar is inline at desktop widths (288px), so that flip resized `main` from
 * full width to 1047px and reflowed the entire article — 12 repeated layout
 * shifts and the bulk of the 0.274 CLS measured on lesson pages. Server and
 * client now agree on the first paint, so there is nothing to correct.
 */
export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider defaultOpen={sidebarOpenFor(pathname)}>
      {children}
    </SidebarProvider>
  );
}
