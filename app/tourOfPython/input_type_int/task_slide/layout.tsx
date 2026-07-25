import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "input·type·int 실습 슬라이드",
	description: "입력을 받고 형을 바꾸고 오류를 잡아보는 실습 슬라이드",
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
