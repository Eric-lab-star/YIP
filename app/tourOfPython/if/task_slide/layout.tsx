import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "조건문 실습 슬라이드",
	description: "미성년자 판별부터 자유 주제 프로그램까지 진행하는 실습 슬라이드",
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
