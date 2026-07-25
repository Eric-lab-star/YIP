import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "To-Do App 실습 슬라이드",
	description:
		"배너와 표부터 명령어 처리까지 To-Do 앱을 단계별로 완성하는 실습 슬라이드",
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
