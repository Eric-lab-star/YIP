import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "영어 대화 앱 (2부) 실습 슬라이드",
  description: "Streamlit 채팅 화면과 교정 기능을 직접 완성하는 실습 슬라이드",
};

export default function EnglishChat2TaskSlideLayout({
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
