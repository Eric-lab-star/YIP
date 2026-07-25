import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "반복문 실습 슬라이드",
	description:
		"1부터 10까지 세기부터 모래시계 그리기까지 진행하는 실습 슬라이드",
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
