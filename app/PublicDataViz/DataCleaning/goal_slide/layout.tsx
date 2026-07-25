import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "빈 값과 중복 정리하기 개념 강의 슬라이드",
	description: "빈 값과 중복 정리하기 개념 강의 슬라이드",
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
