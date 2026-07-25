import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "튜플 개념 강의 슬라이드",
	description: "튜플이 리스트와 무엇이 다른지, 읽기와 언패킹을 설명하는 강의 슬라이드",
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
