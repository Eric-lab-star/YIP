import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "input·type·int 개념 강의 슬라이드",
	description: "사용자 입력과 자료형 변환, try..except를 설명하는 강의 슬라이드",
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
