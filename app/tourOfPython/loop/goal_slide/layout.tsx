import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "반복문 개념 강의 슬라이드",
	description:
		"while 과 for...in, break · continue · 무한루프를 설명하는 강의 슬라이드",
};

export default function GoalSlideLayout({
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
