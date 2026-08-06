import type { MetadataRoute } from "next";
import { listProblems } from "@/app/lib/mongo/problems";
import { AlgorithmCurriculum } from "@/utils/curriculum/Algorithm";
import { simpleWebDevCurriculum } from "@/utils/curriculum/simpleWebDev";

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

// Only genuinely public, crawlable pages belong here. Four of the five lesson
// curricula (/tourOfPython, /spaceshipCaptain, /AIDeveloper, /PublicDataViz)
// are login-gated in proxy.ts — an anonymous crawler is 307-redirected to
// /login — so listing them
// would just feed Google "page with redirect" errors. They're excluded here and
// disallowed in robots.ts. Other auth-gated routes (chat, dashBoard, editor,
// login, students, /problems/*/solutions, /problems/new) are excluded too.
//
// /Algorithm and /simpleWebDev are the exceptions: both are deliberately left
// ungated so their chapters can be found in search, so their pages belong in
// the sitemap. Both are derived from their curriculum below rather than listed
// by hand, so a new chapter is crawlable as soon as it is added.
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

  // Algorithm chapters. `goal` carries the explanation a search visitor is
  // looking for, so it outranks `task`, which is mostly links into /problems.
  const algorithmEntries: MetadataRoute.Sitemap = AlgorithmCurriculum.flatMap(
    ({ slug }) => [
      {
        url: `${SITE_URL}/Algorithm/${slug}/goal`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/Algorithm/${slug}/task`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ]
  );

  // simpleWebDev chapters. Unlike Algorithm there is no goal/task split — one
  // page per chapter — and the curriculum is grouped into 부, so this flattens
  // the parts before mapping.
  const simpleWebDevEntries: MetadataRoute.Sitemap = simpleWebDevCurriculum
    .flatMap(({ lessons }) => lessons)
    .map(({ slug }) => ({
      url: `${SITE_URL}/simpleWebDev/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

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

  return [
    ...staticEntries,
    ...algorithmEntries,
    ...simpleWebDevEntries,
    ...problemEntries,
  ];
}
