import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "변수·문자열·불리언 실습 슬라이드",
	description: "변수를 만들고 문자열과 불리언을 직접 다뤄보는 실습 슬라이드",
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
