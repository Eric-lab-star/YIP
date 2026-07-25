import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "연령대별 남녀 인구 비교하기 실습 슬라이드",
	description: "연령대별 남녀 인구 비교하기 실습 슬라이드",
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
