import type { MetadataRoute } from "next";

const SITE_URL = "https://yipcode.xyz";

export default function robots(): MetadataRoute.Robots {
  // Keep auth-gated and non-content routes out of the index.
  const disallow = ["/api/", "/login", "/chat", "/dashBoard", "/editor", "/students"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Naver's crawler. Listed explicitly so it's unambiguously welcomed.
      { userAgent: "Yeti", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
