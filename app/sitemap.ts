import type { MetadataRoute } from "next";
import { listProblems } from "@/app/lib/mongo/problems";

const SITE_URL = "https://yipcode.xyz";

// Re-generate at most once an hour so newly published problems appear without a
// redeploy. The static content routes below rarely change; the DB-driven
// problem pages are the reason this needs to refresh.
export const revalidate = 3600;

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// Only genuinely public, crawlable pages belong here. The lesson curricula
// (/tourOfPython, /spaceshipCaptain, /AIDeveloper) are login-gated in proxy.ts
// — an anonymous crawler is 307-redirected to /login — so listing them would
// just feed Google "page with redirect" errors. They're excluded here and
// disallowed in robots.ts. Other auth-gated routes (chat, dashBoard, editor,
// login, students, /problems/*/solutions, /problems/new) are excluded too.
const STATIC_ROUTES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/Algorithm", changeFrequency: "weekly", priority: 0.8 },
  { path: "/simpleWebDev", changeFrequency: "weekly", priority: 0.8 },
  { path: "/problems", changeFrequency: "weekly", priority: 0.8 },
  { path: "/games/vamsurlike", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  // Problem detail pages are public and live in MongoDB. Failing to reach the
  // DB (e.g. during a build without network) shouldn't break the whole sitemap.
  let problemEntries: MetadataRoute.Sitemap = [];
  try {
    const problems = await listProblems();
    problemEntries = problems.map((p) => ({
      url: `${SITE_URL}/problems/${p.slug}`,
      lastModified: p.updatedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    problemEntries = [];
  }

  return [...staticEntries, ...problemEntries];
}
