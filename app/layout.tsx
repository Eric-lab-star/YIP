import type { Metadata } from "next";
import "./styles/globals.css";
import { Toaster } from "sonner";
import { OctagonXIcon } from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/commons/AppSideBar";
import Header from "@/components/commons/Header";

export const metadata: Metadata = {
  title: "YIP",
  description: "기계와 대화하는 언어를 배우는 곳",
  openGraph: {
    title: "YIP | 상상이 현실이 되는 코딩 아카데미",
    description:
      "상상하는 것이 현실이 되는 곳, 기계와 대화하는 언어를 배우는 곳. Python과 Arduino로 나만의 프로젝트를 만들어보세요.",
    url: "https://yipcode.xyz",
    siteName: "YIP",
    locale: "ko_KR",
    images: [
      {
        url: "https://r2.kimkyungsub.com/YIP_logo_v0.0.1.png",
        width: 1200,
        height: 630,
        alt: "YIP - 상상이 현실이 되는 코딩 아카데미",
        type: "image/png",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr-ko">
      <head>
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
