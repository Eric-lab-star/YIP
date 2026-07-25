import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "리스트 개념 강의 슬라이드",
	description: "리스트를 만들고 번호로 꺼내고 메소드로 다루는 법을 설명하는 강의 슬라이드",
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
