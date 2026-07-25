import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "pandas 실습 (1) 슬라이드",
	description: "pandas 실습 (1) 슬라이드",
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
