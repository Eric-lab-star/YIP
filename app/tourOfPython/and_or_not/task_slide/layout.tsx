import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "and, or, not 실습 슬라이드",
	description:
		"VIP 판별부터 놀이기구 탑승 판별기까지 진행하는 실습 슬라이드",
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
