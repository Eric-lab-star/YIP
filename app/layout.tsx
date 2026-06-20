import type { Metadata } from "next";
import "./styles/globals.css";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/commons/AppSideBar";
import Header from "@/components/commons/Header";

const SITE_URL = "https://yipcode.xyz";
const OG_IMAGE = "https://r2.kimkyungsub.com/YIP_logo_v0.0.1.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Brand variants are baked into the title/description so a search for
  // "YIP", "yipcode", or "yip코드" matches actual on-page text.
  title: {
    default: "YIP (yipcode, yip코드) | 상상이 현실이 되는 코딩 아카데미",
    template: "%s | YIP 코딩 아카데미",
  },
  description:
    "YIP(yipcode, yip코드)는 상상하는 것이 현실이 되는 코딩 아카데미입니다. 기계와 대화하는 언어를 배우는 곳 — Python과 Arduino로 나만의 프로젝트를 만들어보세요.",
  applicationName: "YIP",
  keywords: [
    "YIP",
    "yipcode",
    "yip코드",
    "입코드",
    "YIP 코딩",
    "코딩 학원",
    "코딩 아카데미",
    "파이썬",
    "Python",
    "아두이노",
    "Arduino",
    "어린이 코딩",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Site-ownership verification tokens. Naver Search Advisor issues the
  // `naver-site-verification` value when you register the site; set it via the
  // NAVER_SITE_VERIFICATION env var so the meta tag is emitted in <head>.
  verification: {
    other: {
      ...(process.env.NAVER_SITE_VERIFICATION
        ? { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION }
        : {}),
    },
  },
  openGraph: {
    title: "YIP (yipcode, yip코드) | 상상이 현실이 되는 코딩 아카데미",
    description:
      "상상하는 것이 현실이 되는 곳, 기계와 대화하는 언어를 배우는 곳. Python과 Arduino로 나만의 프로젝트를 만들어보세요.",
    url: SITE_URL,
    siteName: "YIP",
    locale: "ko_KR",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "YIP - 상상이 현실이 되는 코딩 아카데미",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YIP (yipcode, yip코드) | 상상이 현실이 되는 코딩 아카데미",
    description:
      "상상하는 것이 현실이 되는 곳, 기계와 대화하는 언어를 배우는 곳. Python과 Arduino로 나만의 프로젝트를 만들어보세요.",
    images: [OG_IMAGE],
  },
};

// WebSite structured data. `alternateName` is the strongest signal that
// "yipcode" / "yip코드" refer to this site, and `potentialAction` enables the
// Google sitelinks search box.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "WebSite"],
  "@id": `${SITE_URL}/#website`,
  name: "YIP",
  alternateName: ["yipcode", "yip코드", "YIP 코딩 아카데미", "입코드"],
  url: SITE_URL,
  logo: OG_IMAGE,
  description: "기계와 대화하는 언어를 배우는 코딩 아카데미",
  inLanguage: "ko-KR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Doodle design system: handwritten Korean + swashy display + mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&family=Delius+Swash+Caps&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex sm:justify-center antialiased">
        <SpeedInsights />
        <SidebarProvider defaultOpen={false}>
          <AppSideBar />
          <main className="w-full  flex flex-col ">
            <Header />
            <div className="xl:max-w-7xl lg:max-w-5xl w-full md:max-w-3xl sm:max-w-160 sm:min-w-100  sm:mx-auto ">
              {children}
            </div>
          </main>
        </SidebarProvider>
        <Toaster
          icons={{ error: <OctagonXIcon className="size-4 text-red-500" /> }}
        />
      </body>
    </html>
  );
}

//
