import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "영어 대화 앱 (1부) 실습 슬라이드",
  description: "페르소나 설정과 대화 히스토리 유지를 직접 코딩하는 실습 슬라이드",
};

export default function EnglishChat1TaskSlideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden">
      {children}
    </div>
  );
}
