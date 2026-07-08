import type { MetadataRoute } from "next";

const SITE_URL = "https://yipcode.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Public, indexable content pages. Auth-gated routes (chat, dashBoard,
  // editor, login, students) are intentionally excluded.
  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [{ path: "/", changeFrequency: "weekly", priority: 1 }];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
