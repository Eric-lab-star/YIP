import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "seaborn 예쁜 그래프 직접 그리기 실습 슬라이드",
	description: "seaborn 예쁜 그래프 직접 그리기 실습 슬라이드",
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
