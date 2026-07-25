import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "streamlit 나만의 데이터 앱 완성하기 실습 슬라이드",
	description: "streamlit 나만의 데이터 앱 완성하기 실습 슬라이드",
};

export default function TaskSlideLayout({
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
